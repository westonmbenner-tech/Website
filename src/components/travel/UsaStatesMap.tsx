"use client";

import type { Feature, FeatureCollection, Geometry } from "geojson";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import statesTopology from "us-atlas/states-10m.json";
import {
  normalizedVisitedStates,
  STATE_TOTAL,
  visitedStates,
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
  return (
    <div className={isPanel ? "usa-map usa-map--panel" : "usa-map"}>
      <div className="usa-map__header">
        <div>
          <p className="eyebrow">United States</p>
          <h3>{STATE_TOTAL} states visited</h3>
        </div>
        <span>Click USA on the globe</span>
      </div>

      <svg
        aria-label={`United States map with ${STATE_TOTAL} visited states highlighted`}
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

          if (!d) {
            return null;
          }

          return (
            <path
              aria-label={`${name}${visited ? ", visited" : ""}`}
              className={visited ? "usa-map__state is-visited" : "usa-map__state"}
              d={d}
              key={name}
              tabIndex={0}
            >
              <title>
                {name}
                {visited ? " - Visited" : " - Not yet visited"}
              </title>
            </path>
          );
        })}
        <path className="usa-map__borders" d={path(stateBorders) ?? ""} />
      </svg>

      <div className="usa-map__states-list" aria-label="Visited U.S. states">
        {visitedStates.map((state) => (
          <span key={state}>{state}</span>
        ))}
      </div>
    </div>
  );
}
