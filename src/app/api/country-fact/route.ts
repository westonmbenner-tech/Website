import type { CountryFactSheet } from "@/data/countryFacts";
import { lookupCountryFactSheet } from "@/data/countryFacts";
import {
  pickBestRestCountry,
  resolveRestCountriesQuery,
  restCountryToFactSheet,
  type RestCountryV3,
} from "@/lib/restCountriesFactSheet";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

async function fetchFromRestCountries(name: string): Promise<CountryFactSheet | null> {
  const query = resolveRestCountriesQuery(name);
  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}?fullText=false`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      const alt = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`;
      const res2 = await fetch(alt, {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 * 60 * 24 },
      });
      if (!res2.ok) return null;
      const data2 = (await res2.json()) as RestCountryV3[];
      if (!Array.isArray(data2) || data2.length === 0) return null;
      const picked2 = pickBestRestCountry(name, data2);
      return restCountryToFactSheet(picked2);
    }
    return null;
  }

  const data = (await res.json()) as RestCountryV3[];
  if (!Array.isArray(data) || data.length === 0) return null;
  const picked = pickBestRestCountry(name, data);
  return restCountryToFactSheet(picked);
}

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name")?.trim();
  if (!name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }

  const curated = lookupCountryFactSheet(name);
  if (curated) {
    return NextResponse.json(curated);
  }

  try {
    const remote = await fetchFromRestCountries(name);
    if (!remote) {
      return NextResponse.json(
        { error: "No fact sheet found for this country." },
        { status: 404 },
      );
    }
    return NextResponse.json(remote);
  } catch {
    return NextResponse.json(
      { error: "Could not load country data right now." },
      { status: 502 },
    );
  }
}
