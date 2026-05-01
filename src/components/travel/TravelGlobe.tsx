"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GlobeMethods } from "react-globe.gl";
import worldAtlas from "world-atlas/countries-50m.json";
import { lookupCountryFactSheet } from "@/data/countryFacts";
import {
  COUNTRY_ALIASES,
  isVisitedCountry,
  travelStats,
} from "@/data/travelData";
import type { CountryFactSheet } from "@/data/countryFacts";
import type { CountryDetails } from "@/data/travelData";
import { CountryDetailsPanel } from "./CountryDetailsPanel";
import { TravelStats } from "./TravelStats";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <div className="globe-loader">Preparing the globe...</div>,
});

type CountryFeature = Feature<Geometry, { name: string }>;

const getResponsiveGlobeSize = (embedded: boolean) => {
  if (typeof window === "undefined") {
    return { width: embedded ? 560 : 760, height: embedded ? 480 : 640 };
  }

  const width = window.innerWidth;
  if (embedded) {
    if (width < 680) {
      return {
        width: Math.max(280, width - 48),
        height: Math.max(380, width * 0.95),
      };
    }
    return {
      width: Math.min(640, width - 80),
      height: 480,
    };
  }

  if (width < 680) {
    return {
      width: Math.max(320, width - 32),
      height: Math.max(460, width * 1.05),
    };
  }

  if (width < 980) {
    return {
      width: Math.min(760, width - 64),
      height: 620,
    };
  }

  return {
    width: Math.min(760, width - 520),
    height: 640,
  };
};

const normalizeCountryName = (name: string) => COUNTRY_ALIASES[name] ?? name;

const isUnitedStates = (countryName: string) =>
  normalizeCountryName(countryName) === "United States";

const getFeatureCentroid = (country: object) => {
  const [lng, lat] = geoCentroid(country as CountryFeature);
  return { lat, lng };
};

type TravelGlobeProps = {
  /** Compact layout when shown inside another section (e.g. About). */
  embedded?: boolean;
};

export function TravelGlobe({ embedded = false }: TravelGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const globeViewportRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryFeature | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryDetails | null>(null);
  const [globeSize, setGlobeSize] = useState(() => getResponsiveGlobeSize(embedded));
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  const countries = useMemo(() => {
    const topology = worldAtlas;
    const collection = feature(
      topology,
      topology.objects.countries,
    ) as unknown as FeatureCollection<Geometry, { name: string }>;

    return collection.features.filter((country) => country.properties?.name);
  }, []);

  const getCountryName = useCallback((country: object) => {
    const feature = country as CountryFeature;
    return normalizeCountryName(feature.properties.name);
  }, []);

  const getPolygonColor = useCallback(
    (country: object) => {
      const name = getCountryName(country);
      const isHovered = hoveredCountry && getCountryName(hoveredCountry) === name;

      if (isUnitedStates(name)) {
        return isHovered ? "rgba(125, 190, 215, 0.9)" : "rgba(99, 168, 197, 0.72)";
      }

      if (isVisitedCountry(name)) {
        return isHovered ? "rgba(134, 161, 229, 0.88)" : "rgba(91, 125, 199, 0.68)";
      }

      return isHovered ? "rgba(90, 101, 120, 0.74)" : "rgba(43, 49, 60, 0.66)";
    },
    [getCountryName, hoveredCountry],
  );

  const buildCountrySelection = useCallback((name: string): CountryDetails => {
    const visited = isVisitedCountry(name);
    const curated = lookupCountryFactSheet(name);
    return {
      name,
      status: visited ? "Visited" : "Not yet visited",
      isUnitedStates: isUnitedStates(name),
      facts: curated,
      factsLoading: !curated,
      factsError: undefined,
    };
  }, []);

  const handleCountryClick = useCallback(
    (country: object) => {
      const name = getCountryName(country);
      setSelectedCountry(buildCountrySelection(name));
    },
    [getCountryName, buildCountrySelection],
  );

  useEffect(() => {
    if (!selectedCountry?.factsLoading) return;
    const name = selectedCountry.name;
    const ac = new AbortController();

    const run = async () => {
      try {
        const res = await fetch(
          `/api/country-fact?name=${encodeURIComponent(name)}`,
          { signal: ac.signal },
        );
        const data = (await res.json()) as CountryFactSheet & { error?: string };
        if (!res.ok) {
          setSelectedCountry((prev) =>
            prev && prev.name === name
              ? {
                  ...prev,
                  factsLoading: false,
                  factsError:
                    typeof data.error === "string"
                      ? data.error
                      : "Could not load facts.",
                }
              : prev,
          );
          return;
        }
        setSelectedCountry((prev) =>
          prev && prev.name === name
            ? {
                ...prev,
                factsLoading: false,
                factsError: undefined,
                facts: data,
              }
            : prev,
        );
      } catch {
        if (ac.signal.aborted) return;
        setSelectedCountry((prev) =>
          prev && prev.name === name
            ? {
                ...prev,
                factsLoading: false,
                factsError: "Could not load facts.",
              }
            : prev,
        );
      }
    };

    void run();
    return () => ac.abort();
  }, [selectedCountry?.name, selectedCountry?.factsLoading]);

  useEffect(() => {
    const controls = globeRef.current?.controls();
    if (!controls) {
      return;
    }

    controls.autoRotate = true;
    controls.autoRotateSpeed = hoveredCountry ? 0.18 : 0.48;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.55;
    controls.enablePan = false;
  }, [hoveredCountry]);

  useEffect(() => {
    globeRef.current?.pointOfView({ lat: 24, lng: -22, altitude: 1.85 }, 900);
  }, []);

  useEffect(() => {
    if (!embedded) {
      const updateSize = () => {
        setGlobeSize(getResponsiveGlobeSize(false));
      };
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }

    const el = globeViewportRef.current;
    if (!el) return undefined;

    const measure = () => {
      const cw = el.clientWidth;
      const usable = Math.max(cw, 200);
      const w = Math.max(180, Math.floor(usable - 24));
      const h = Math.min(520, Math.max(260, Math.round(w * 0.9)));
      setGlobeSize({ width: w, height: h });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [embedded]);

  return (
    <section
      className={
        embedded ? "travel-section travel-section--embedded" : "travel-section"
      }
      aria-label="Interactive map of countries visited"
    >
      <div className="travel-shell" onClick={() => setSelectedCountry(null)}>
        <TravelStats stats={travelStats} />

        <div className="travel-stage">
          <div
            className="globe-card"
            onMouseEnter={() => {
              const controls = globeRef.current?.controls();
              if (controls) controls.autoRotateSpeed = 0.16;
            }}
            onMouseLeave={() => {
              setHoveredCountry(null);
              const controls = globeRef.current?.controls();
              if (controls) controls.autoRotateSpeed = 0.48;
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="globe-aura" />
            <div ref={globeViewportRef} className="globe-viewport">
              <Globe
                ref={globeRef}
                width={globeSize.width}
                height={globeSize.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl=""
                showAtmosphere
                atmosphereColor="#6d8fb6"
                atmosphereAltitude={0.16}
                onGlobeReady={() => setIsGlobeReady(true)}
                polygonsData={countries}
                polygonCapColor={getPolygonColor}
                polygonSideColor={() => "rgba(8, 12, 20, 0.72)"}
                polygonStrokeColor={() => "rgba(208, 220, 232, 0.16)"}
                polygonAltitude={(country: object) =>
                  hoveredCountry && getCountryName(country) === getCountryName(hoveredCountry)
                    ? 0.018
                    : isVisitedCountry(getCountryName(country))
                      ? 0.01
                      : 0.004
                }
                onPolygonHover={(country: object | null) =>
                  setHoveredCountry((country as CountryFeature | null) ?? null)
                }
                onPolygonClick={handleCountryClick}
                polygonsTransitionDuration={180}
                htmlElementsData={hoveredCountry ? [hoveredCountry] : []}
                htmlLat={(country: object) => getFeatureCentroid(country).lat}
                htmlLng={(country: object) => getFeatureCentroid(country).lng}
                htmlElement={(country: object) => {
                  const name = getCountryName(country);
                  const tooltip = document.createElement("div");
                  tooltip.className = "country-tooltip";
                  tooltip.textContent = `${name}${isVisitedCountry(name) ? " · Visited" : ""}`;
                  return tooltip;
                }}
              />
            </div>
            {!isGlobeReady ? <div className="globe-loader">Preparing the globe...</div> : null}
            <div className="globe-footer">
              <span>Click and drag to explore</span>
              <div className="legend" aria-label="Travel globe legend">
                <span>
                  <i className="legend-swatch legend-visited" /> Visited
                </span>
                <span>
                  <i className="legend-swatch legend-unvisited" /> Not yet visited
                </span>
              </div>
            </div>
          </div>

          <CountryDetailsPanel
            selection={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        </div>
      </div>
    </section>
  );
}
