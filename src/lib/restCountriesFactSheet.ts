import type { CountryFactSheet } from "@/data/countryFacts";

/** Natural Earth / globe labels that REST Countries matches better under another query. */
const GLOBE_TO_REST_QUERY: Record<string, string> = {
  "United States of America": "United States",
  "Dem. Rep. Congo": "Democratic Republic of the Congo",
  Russia: "Russian Federation",
  "Czech Republic": "Czechia",
  Congo: "Republic of the Congo",
  "Ivory Coast": "Côte d'Ivoire",
  Swaziland: "Eswatini",
  "East Timor": "Timor-Leste",
  "S. Sudan": "South Sudan",
  "N. Cyprus": "Cyprus",
  "W. Sahara": "Western Sahara",
};

type RestCurrency = { name: string; symbol?: string };

export type RestCountryV3 = {
  name: { common: string; official: string };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  languages?: Record<string, string>;
  currencies?: Record<string, RestCurrency>;
  area?: number;
  flags?: { alt?: string };
  landlocked?: boolean;
};

export function resolveRestCountriesQuery(globeName: string): string {
  return GLOBE_TO_REST_QUERY[globeName] ?? globeName;
}

export function formatPopulationApprox(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  if (n >= 1_000_000_000) return `~${(n / 1_000_000_000).toFixed(2)} billion`;
  if (n >= 1_000_000) return `~${(n / 1_000_000).toFixed(1)} million`;
  if (n >= 10_000) return `~${Math.round(n / 1000)} thousand`;
  return `~${n.toLocaleString()}`;
}

export function formatLanguages(l?: Record<string, string>): string {
  if (!l || Object.keys(l).length === 0) return "—";
  return Object.values(l).join("; ");
}

export function formatCurrencies(c?: Record<string, RestCurrency>): string {
  if (!c || Object.keys(c).length === 0) return "—";
  return Object.entries(c)
    .map(([code, v]) => `${code} (${v.name}${v.symbol ? `, ${v.symbol}` : ""})`)
    .join("; ");
}

export function pickBestRestCountry(
  requestedGlobeName: string,
  items: RestCountryV3[],
): RestCountryV3 {
  if (items.length === 1) return items[0];
  const q = requestedGlobeName.trim().toLowerCase();
  const exact = items.find(
    (c) =>
      c.name.common.toLowerCase() === q ||
      c.name.official.toLowerCase() === q,
  );
  if (exact) return exact;
  const includes = items.find(
    (c) =>
      c.name.common.toLowerCase().includes(q) ||
      q.includes(c.name.common.toLowerCase()),
  );
  return includes ?? items[0];
}

export function restCountryToFactSheet(d: RestCountryV3): CountryFactSheet {
  const capital = d.capital?.[0] ?? "—";
  const region = [d.subregion, d.region].filter(Boolean).join(" · ") || "—";
  const population = formatPopulationApprox(d.population);
  const languages = formatLanguages(d.languages);
  const currency = formatCurrencies(d.currencies);

  let fact =
    d.flags?.alt?.replace(/\s+/g, " ").trim() ||
    (d.area
      ? `${d.name.common} covers about ${d.area.toLocaleString()} km² in ${d.region}${d.subregion ? ` (${d.subregion})` : ""}.`
      : `${d.name.common} is part of ${d.subregion ?? d.region}.`);

  if (fact.length > 420) {
    fact = `${fact.slice(0, 417)}…`;
  }

  return {
    capital,
    region,
    population,
    languages,
    currency,
    fact,
  };
}
