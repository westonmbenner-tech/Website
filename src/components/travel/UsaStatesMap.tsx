"use client";

import { useCallback, useMemo, useState } from "react";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import statesTopology from "us-atlas/states-10m.json";
import {
  normalizedVisitedStates,
  STATE_TOTAL,
} from "@/data/travelData";

type StateProperties = {
  name: string;
};

type StateFeature = Feature<Geometry, StateProperties>;

const stateCollection = feature(
  statesTopology,
  statesTopology.objects.states,
) as unknown as FeatureCollection<Geometry, StateProperties>;

const stateBorders = mesh(
  statesTopology,
  statesTopology.objects.states,
  (a, b) => a !== b,
) as unknown as Geometry;

const projection = geoAlbersUsa().fitSize([960, 600], stateCollection);
const path = geoPath(projection);

type UsaStatesMapProps = {
  isPanel?: boolean;
};

export function UsaStatesMap({ isPanel = false }: UsaStatesMapProps) {
  const [activeState, setActiveState] = useState<string | null>(null);

  const allStateNames = useMemo(() => {
    const names = stateCollection.features.map((f) => f.properties.name);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b));
  }, []);

  const announceState = useCallback((name: string) => {
    setActiveState(name);
  }, []);

  return (
    <div className={isPanel ? "usa-map usa-map--panel" : "usa-map"}>
      <div className="usa-map__header">
        <div>
          <p className="eyebrow">United States</p>
          <h3>{STATE_TOTAL} states visited</h3>
        </div>
        <span>
          {STATE_TOTAL} of 50
        </span>
      </div>

      <div
        className="usa-map__namebar"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeState ? (
          <p className="usa-map__namebar-text">
            <span className="usa-map__namebar-title">{activeState}</span>
            <span className="usa-map__namebar-meta">
              {normalizedVisitedStates.has(activeState)
                ? "Visited"
                : "Not yet visited"}
            </span>
          </p>
        ) : (
          <p className="usa-map__namebar-text usa-map__namebar-text--hint">
            Tap the map or a state name below to hear it called out here.
          </p>
        )}
      </div>

      <svg
        aria-label={`United States map with ${STATE_TOTAL} visited states highlighted; tap a state for its name`}
        className="usa-map__svg"
        role="img"
        viewBox="0 0 960 600"
      >
        <defs>
          <filter id="stateGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {stateCollection.features.map((state: StateFeature) => {
          const name = state.properties.name;
          const visited = normalizedVisitedStates.has(name);
          const d = path(state);
          const isActive = activeState === name;

          if (!d) {
            return null;
          }

          return (
            <path
              className={`usa-map__state ${visited ? "is-visited" : ""} ${isActive ? "is-active" : ""}`}
              d={d}
              key={name}
              role="button"
              tabIndex={0}
              aria-label={`${name}, ${visited ? "visited" : "not yet visited"}. Tap to show name in the bar above.`}
              aria-pressed={isActive}
              onClick={() => announceState(name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  announceState(name);
                }
              }}
            />
          );
        })}
        <path className="usa-map__borders" d={path(stateBorders) ?? ""} />
      </svg>

      <p className="usa-map__namebars-label" id="usa-map-namebars-label">
        States (tap for name)
      </p>
      <div
        className="usa-map__namebars"
        role="group"
        aria-labelledby="usa-map-namebars-label"
      >
        {allStateNames.map((name) => {
          const visited = normalizedVisitedStates.has(name);
          const isActive = activeState === name;
          return (
            <button
              key={name}
              type="button"
              className={`usa-map__namebar-chip ${visited ? "is-visited" : ""} ${isActive ? "is-active" : ""}`}
              aria-pressed={isActive}
              aria-label={`${name}, ${visited ? "visited" : "not yet visited"}. Show in name bar.`}
              onClick={() => announceState(name)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
