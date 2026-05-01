declare module "world-atlas/countries-50m.json" {
  const value: import("topojson-specification").Topology<{
    countries: import("topojson-specification").GeometryCollection;
    land: import("topojson-specification").GeometryCollection;
  }>;
  export default value;
}

declare module "us-atlas/states-10m.json" {
  const value: import("topojson-specification").Topology<{
    states: import("topojson-specification").GeometryCollection;
    nation: import("topojson-specification").GeometryCollection;
  }>;
  export default value;
}
