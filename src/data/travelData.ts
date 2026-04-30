export interface TravelStat {
  label: string;
  value: number;
}

export interface TravelCountry {
  name: string;
  visited: boolean;
  isUnitedStates?: boolean;
}

export interface TravelState {
  name: string;
  visited: boolean;
}

export interface CountryDetails {
  name: string;
  status: "Visited" | "Not yet visited";
  isUnitedStates: boolean;
}

export const visitedCountries = [
  "Australia",
  "Austria",
  "Bahamas",
  "Belgium",
  "Bulgaria",
  "Canada",
  "China",
  "Costa Rica",
  "Czechia",
  "Denmark",
  "Ecuador",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Ireland",
  "Italy",
  "Jamaica",
  "Japan",
  "Liechtenstein",
  "Luxembourg",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Peru",
  "Portugal",
  "Qatar",
  "South Korea",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Singapore",
  "Slovakia",
  "South Africa",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Trinidad and Tobago",
  "Turkey",
  "United Kingdom",
  "Zambia",
  "Zimbabwe",
] as const;

export const visitedStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Hawaii",
  "Illinois",
  "Kentucky",
  "Louisiana",
  "Maryland",
  "Massachusetts",
  "Mississippi",
  "Missouri",
  "Nevada",
  "New Jersey",
  "New Mexico",
  "New York",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Tennessee",
  "Texas",
  "Utah",
  "Virginia",
  "Washington",
] as const;

export const travelStats: TravelStat[] = [
  {
    label: "Countries",
    value: 47,
  },
  {
    label: "U.S. States",
    value: 29,
  },
];

export const COUNTRY_TOTAL = 47;
export const STATE_TOTAL = 29;

export const COUNTRY_ALIASES: Record<string, string> = {
  "St. Kitts and Nevis": "Saint Kitts and Nevis",
  "United States of America": "United States",
};

export const unitedStatesAtlasName = "United States of America";

export const GLOBE_COUNTRIES = [...visitedCountries, "United States"] as const;

const visitedCountrySet = new Set<string>([
  ...visitedCountries,
  ...Object.values(COUNTRY_ALIASES),
  "United States",
  unitedStatesAtlasName,
]);

export const normalizedVisitedStates: ReadonlySet<string> = new Set(visitedStates);

export const isVisitedCountry = (countryName: string) =>
  visitedCountrySet.has(COUNTRY_ALIASES[countryName] ?? countryName);
