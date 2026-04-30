"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { GlobeMethods } from "react-globe.gl";
import worldAtlas from "world-atlas/countries-50m.json";
import {
  COUNTRY_ALIASES,
  GLOBE_COUNTRIES,
  isVisitedCountry,
  travelStats,
} from "@/data/travelData";
import type { CountryDetails } from "@/data/travelData";
import { CountryDetailsPanel } from "./CountryDetailsPanel";
import { TravelStats } from "./TravelStats";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <div className="globe-loader">Preparing the globe...</div>,
});

type CountryFeature = Feature<Geometry, { name: string }>;

const normalizeCountryName = (name: string) => COUNTRY_ALIASES[name] ?? name;

const isUnitedStates = (countryName: string) =>
  normalizeCountryName(countryName) === "United States";

const getFeatureCentroid = (country: object) => {
  const [lng, lat] = geoCentroid(country as CountryFeature);
  return { lat, lng };
};

export function TravelGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [hoveredCountry, setHoveredCountry] = useState<CountryFeature | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryDetails | null>(null);

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

  const handleCountryClick = useCallback(
    (country: object) => {
      const name = getCountryName(country);
      const visited = isVisitedCountry(name);

      setSelectedCountry({
        name,
        status: visited ? "Visited" : "Not yet visited",
        isUnitedStates: isUnitedStates(name),
      });
    },
    [getCountryName],
  );

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

  return (
    <section className="travel-section" aria-labelledby="travel-heading">
      <div className="travel-shell" onClick={() => setSelectedCountry(null)}>
        <div className="travel-intro">
          <p className="eyebrow">Travel Globe</p>
          <h1 id="travel-heading">Where I&apos;ve Been</h1>
          <p className="travel-subtitle">
            A visual snapshot of the places I&apos;ve explored so far.
          </p>
        </div>

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
            <Globe
              ref={globeRef}
              width={Math.min(
                760,
                typeof window === "undefined" ? 760 : window.innerWidth - 32,
              )}
              height={Math.min(
                640,
                typeof window === "undefined" ? 640 : window.innerWidth * 0.95,
              )}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl=""
              showAtmosphere
              atmosphereColor="#6d8fb6"
              atmosphereAltitude={0.16}
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
              htmlLat={(country: object) => {
                const feature = country as CountryFeature;
                return feature.properties.name === "United States of America" ? 39 : 18;
              }}
              htmlLng={(country: object) => {
                const feature = country as CountryFeature;
                return feature.properties.name === "United States of America" ? -98 : 10;
              }}
              htmlElement={(country: object) => {
                const name = getCountryName(country);
                const tooltip = document.createElement("div");
                tooltip.className = "country-tooltip";
                tooltip.textContent = `${name}${isVisitedCountry(name) ? " · Visited" : ""}`;
                return tooltip;
              }}
            />
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

        <p className="visited-list-label">Quick select a visited destination</p>
        <div className="visited-list" aria-label="Visited countries">
          {GLOBE_COUNTRIES.map((country) => (
            <button
              type="button"
              key={country}
              className="visited-chip"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedCountry({
                  name: country,
                  status: "Visited",
                  isUnitedStates: country === "United States",
                });
              }}
            >
              {country}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
