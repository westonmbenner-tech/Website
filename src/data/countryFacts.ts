/**
 * Fact sheets for the travel globe detail panel (display-only approximations).
 * Keys match normalized globe names (see travelData visitedCountries + United States).
 */
export type CountryFactSheet = {
  capital: string;
  region: string;
  population: string;
  languages: string;
  currency: string;
  fact: string;
};

const COUNTRY_FACTS: Record<string, CountryFactSheet> = {
  Australia: {
    capital: "Canberra",
    region: "Oceania",
    population: "~27.2 million",
    languages:
      "English (de facto national language); many Indigenous languages also spoken",
    currency: "Australian dollar (AUD)",
    fact: "Australia is home to the Great Barrier Reef, the world’s largest coral reef system.",
  },
  Austria: {
    capital: "Vienna",
    region: "Central Europe",
    population: "~9.2 million",
    languages:
      "German (official); regional minority languages include Hungarian, Slovene, and Croatian",
    currency: "Euro (EUR)",
    fact: "Vienna was the center of the Habsburg Empire and remains famous for classical music, coffeehouses, and imperial architecture.",
  },
  Bahamas: {
    capital: "Nassau",
    region: "Caribbean",
    population: "~400,000",
    languages: "English (official); Bahamian Creole widely spoken",
    currency: "Bahamian dollar (BSD)",
    fact: "The Bahamas consists of more than 700 islands and cays, though only a fraction are inhabited.",
  },
  Belgium: {
    capital: "Brussels",
    region: "Western Europe",
    population: "~11.8 million",
    languages: "Dutch, French, and German (official)",
    currency: "Euro (EUR)",
    fact: "Brussels hosts major institutions of both the European Union and NATO.",
  },
  Bulgaria: {
    capital: "Sofia",
    region: "Southeastern Europe",
    population: "~6.4 million",
    languages: "Bulgarian (official)",
    currency: "Bulgarian lev (BGN)",
    fact: "Bulgaria uses the Cyrillic alphabet, whose early development is closely tied to the medieval Bulgarian cultural sphere.",
  },
  Canada: {
    capital: "Ottawa",
    region: "North America",
    population: "~41.5 million",
    languages: "English and French (official); many Indigenous languages",
    currency: "Canadian dollar (CAD)",
    fact: "Canada has the world’s longest coastline.",
  },
  China: {
    capital: "Beijing",
    region: "East Asia",
    population: "~1.41 billion",
    languages:
      "Standard Chinese/Mandarin (official); many regional languages and dialects",
    currency: "Renminbi / yuan (CNY)",
    fact: "China’s written civilization stretches back more than three thousand years, with oracle bone inscriptions among its earliest surviving records.",
  },
  "Costa Rica": {
    capital: "San José",
    region: "Central America",
    population: "~5.3 million",
    languages: "Spanish (official)",
    currency: "Costa Rican colón (CRC)",
    fact: "Costa Rica abolished its standing army in 1948 and has invested heavily in education, conservation, and public institutions.",
  },
  Czechia: {
    capital: "Prague",
    region: "Central Europe",
    population: "~10.9 million",
    languages: "Czech (official)",
    currency: "Czech koruna (CZK)",
    fact: "Prague’s historic center is known for Gothic, Baroque, and medieval architecture, including Charles Bridge and Prague Castle.",
  },
  Denmark: {
    capital: "Copenhagen",
    region: "Northern Europe",
    population: "~6.0 million",
    languages: "Danish (official)",
    currency: "Danish krone (DKK)",
    fact: "Denmark is often associated with hygge, a cultural idea of comfort, coziness, and everyday well-being.",
  },
  Ecuador: {
    capital: "Quito",
    region: "South America",
    population: "~18.0 million",
    languages:
      "Spanish (official); Quechua and other Indigenous languages recognized",
    currency: "United States dollar (USD)",
    fact: "Ecuador is named for the equator, which runs through the country just north of Quito.",
  },
  France: {
    capital: "Paris",
    region: "Western Europe",
    population: "~68.6 million",
    languages:
      "French (official); regional languages include Breton, Occitan, Alsatian, Corsican, and others",
    currency: "Euro (EUR)",
    fact: "France is the world’s most visited country by international tourist arrivals in many recent years.",
  },
  Germany: {
    capital: "Berlin",
    region: "Central Europe",
    population: "~84.5 million",
    languages: "German (official)",
    currency: "Euro (EUR)",
    fact: "Germany has Europe’s largest economy and is known for engineering, manufacturing, and influential scientific traditions.",
  },
  Greece: {
    capital: "Athens",
    region: "Southeastern Europe",
    population: "~10.4 million",
    languages: "Greek (official)",
    currency: "Euro (EUR)",
    fact: "Athens is often associated with the origins of democracy, philosophy, drama, and classical architecture.",
  },
  Hungary: {
    capital: "Budapest",
    region: "Central Europe",
    population: "~9.6 million",
    languages: "Hungarian/Magyar (official)",
    currency: "Hungarian forint (HUF)",
    fact: "Hungarian is a Uralic language, making it linguistically distinct from most neighboring Indo-European languages.",
  },
  Iceland: {
    capital: "Reykjavík",
    region: "North Atlantic / Northern Europe",
    population: "~390,000",
    languages: "Icelandic (official)",
    currency: "Icelandic króna (ISK)",
    fact: "Iceland sits on the Mid-Atlantic Ridge, making it one of the most volcanically active countries in the world.",
  },
  India: {
    capital: "New Delhi",
    region: "South Asia",
    population: "~1.46 billion",
    languages:
      "Hindi and English used by the Union government; 22 scheduled languages recognized",
    currency: "Indian rupee (INR)",
    fact: "India is the world’s most populous country and one of the most linguistically diverse large democracies.",
  },
  Indonesia: {
    capital: "Jakarta",
    region: "Southeast Asia",
    population: "~283.5 million",
    languages:
      "Indonesian/Bahasa Indonesia (official); hundreds of local languages",
    currency: "Indonesian rupiah (IDR)",
    fact: "Indonesia is the world’s largest archipelagic state, with thousands of islands stretching across the equator.",
  },
  Ireland: {
    capital: "Dublin",
    region: "Western Europe",
    population: "~5.4 million",
    languages: "Irish and English (official)",
    currency: "Euro (EUR)",
    fact: "Ireland has a rich literary tradition, with writers such as James Joyce, W. B. Yeats, Samuel Beckett, and Seamus Heaney.",
  },
  Italy: {
    capital: "Rome",
    region: "Southern Europe",
    population: "~58.9 million",
    languages:
      "Italian (official); regional languages and minority languages also spoken",
    currency: "Euro (EUR)",
    fact: "Rome contains Vatican City, an independent city-state and the center of the Roman Catholic Church.",
  },
  Jamaica: {
    capital: "Kingston",
    region: "Caribbean",
    population: "~2.8 million",
    languages: "English (official); Jamaican Patois widely spoken",
    currency: "Jamaican dollar (JMD)",
    fact: "Jamaica is the birthplace of reggae music and was home to Bob Marley.",
  },
  Japan: {
    capital: "Tokyo",
    region: "East Asia",
    population: "~123.8 million",
    languages: "Japanese (official/de facto)",
    currency: "Japanese yen (JPY)",
    fact: "Tokyo is one of the world’s largest metropolitan areas and a major global center for technology, finance, and culture.",
  },
  Liechtenstein: {
    capital: "Vaduz",
    region: "Central Europe",
    population: "~40,000",
    languages: "German (official)",
    currency: "Swiss franc (CHF)",
    fact: "Liechtenstein is one of the world’s smallest countries and is doubly landlocked, bordered by Switzerland and Austria.",
  },
  Luxembourg: {
    capital: "Luxembourg City",
    region: "Western Europe",
    population: "~680,000",
    languages: "Luxembourgish, French, and German (official)",
    currency: "Euro (EUR)",
    fact: "Luxembourg is a major European financial center and one of the EU’s founding members.",
  },
  Malaysia: {
    capital:
      "Kuala Lumpur; Putrajaya is the federal administrative center",
    region: "Southeast Asia",
    population: "~35.5 million",
    languages:
      "Malay/Bahasa Malaysia (official); English, Chinese languages, Tamil, and others widely used",
    currency: "Malaysian ringgit (MYR)",
    fact: "Malaysia is split between Peninsular Malaysia and Malaysian Borneo, giving it both mainland and island geography.",
  },
  Mexico: {
    capital: "Mexico City",
    region: "North America",
    population: "~131.9 million",
    languages:
      "Spanish (de facto national language); dozens of Indigenous languages recognized",
    currency: "Mexican peso (MXN)",
    fact: "Mexico City is built on the site of Tenochtitlan, the former Aztec capital.",
  },
  Netherlands: {
    capital: "Amsterdam; The Hague is the seat of government",
    region: "Western Europe",
    population: "~18.0 million",
    languages: "Dutch (official); Frisian official in Friesland",
    currency: "Euro (EUR)",
    fact: "A large share of the Netherlands lies at or below sea level, protected by dikes, canals, and advanced water-management systems.",
  },
  "New Zealand": {
    capital: "Wellington",
    region: "Oceania",
    population: "~5.3 million",
    languages:
      "English, Māori, and New Zealand Sign Language (official)",
    currency: "New Zealand dollar (NZD)",
    fact: "New Zealand’s Māori name is Aotearoa, often translated as “land of the long white cloud.”",
  },
  Norway: {
    capital: "Oslo",
    region: "Northern Europe",
    population: "~5.6 million",
    languages:
      "Norwegian (Bokmål and Nynorsk); Sámi languages official in some areas",
    currency: "Norwegian krone (NOK)",
    fact: "Norway is famous for fjords carved by glaciers along its rugged coastline.",
  },
  Peru: {
    capital: "Lima",
    region: "South America",
    population: "~34.4 million",
    languages: "Spanish, Quechua, and Aymara official where predominant",
    currency: "Peruvian sol (PEN)",
    fact: "Peru is home to Machu Picchu, the Inca citadel high in the Andes.",
  },
  Portugal: {
    capital: "Lisbon",
    region: "Southern Europe",
    population: "~10.6 million",
    languages: "Portuguese (official)",
    currency: "Euro (EUR)",
    fact: "Portugal’s Age of Exploration helped create one of the first global maritime empires.",
  },
  Qatar: {
    capital: "Doha",
    region: "Middle East / Western Asia",
    population: "~3.1 million",
    languages: "Arabic (official); English widely used",
    currency: "Qatari riyal (QAR)",
    fact: "Qatar hosted the 2022 FIFA World Cup, the first World Cup held in the Arab world.",
  },
  "South Korea": {
    capital: "Seoul",
    region: "East Asia",
    population: "~51.7 million",
    languages: "Korean (official)",
    currency: "South Korean won (KRW)",
    fact: "South Korea is a global leader in semiconductors, consumer electronics, shipbuilding, and pop culture exports.",
  },
  "Saint Kitts and Nevis": {
    capital: "Basseterre",
    region: "Caribbean",
    population: "~48,000",
    languages: "English (official); Saint Kitts Creole widely spoken",
    currency: "East Caribbean dollar (XCD)",
    fact: "Saint Kitts and Nevis is the smallest sovereign state in the Western Hemisphere by both area and population.",
  },
  "Saint Lucia": {
    capital: "Castries",
    region: "Caribbean",
    population: "~180,000",
    languages:
      "English (official); Saint Lucian Creole French/Kwéyòl widely spoken",
    currency: "East Caribbean dollar (XCD)",
    fact: "Saint Lucia is known for the Pitons, two dramatic volcanic peaks that are a UNESCO World Heritage Site.",
  },
  Singapore: {
    capital: "Singapore",
    region: "Southeast Asia",
    population: "~6.0 million",
    languages:
      "English, Malay, Mandarin Chinese, and Tamil (official)",
    currency: "Singapore dollar (SGD)",
    fact: "Singapore is a city-state and one of the world’s busiest port and aviation hubs.",
  },
  Slovakia: {
    capital: "Bratislava",
    region: "Central Europe",
    population: "~5.4 million",
    languages: "Slovak (official)",
    currency: "Euro (EUR)",
    fact: "Bratislava is one of the few world capitals located near the borders of two other countries: Austria and Hungary.",
  },
  "South Africa": {
    capital:
      "Pretoria (executive), Cape Town (legislative), Bloemfontein (judicial)",
    region: "Southern Africa",
    population: "~64.0 million",
    languages:
      "12 official languages, including Zulu, Xhosa, Afrikaans, English, and others",
    currency: "South African rand (ZAR)",
    fact: "South Africa has three capitals, reflecting the distribution of executive, legislative, and judicial functions.",
  },
  Spain: {
    capital: "Madrid",
    region: "Southern Europe",
    population: "~48.8 million",
    languages:
      "Spanish/Castilian (official nationwide); Catalan, Galician, Basque, and others official regionally",
    currency: "Euro (EUR)",
    fact: "Spain’s regional diversity is reflected in distinct languages, cuisines, and architectural traditions.",
  },
  Sweden: {
    capital: "Stockholm",
    region: "Northern Europe",
    population: "~10.6 million",
    languages:
      "Swedish (official); recognized minority languages include Finnish, Meänkieli, Sámi, Romani, and Yiddish",
    currency: "Swedish krona (SEK)",
    fact: "Sweden is known for strong design traditions, social welfare institutions, and major global companies in music, tech, and engineering.",
  },
  Switzerland: {
    capital: "Bern",
    region: "Central Europe",
    population: "~9.0 million",
    languages: "German, French, Italian, and Romansh (official)",
    currency: "Swiss franc (CHF)",
    fact: "Switzerland’s federal system and multilingual culture reflect its highly decentralized cantonal structure.",
  },
  Thailand: {
    capital: "Bangkok",
    region: "Southeast Asia",
    population: "~71.9 million",
    languages: "Thai (official)",
    currency: "Thai baht (THB)",
    fact: "Thailand is the only Southeast Asian country that was never formally colonized by a European power.",
  },
  "Trinidad and Tobago": {
    capital: "Port of Spain",
    region: "Caribbean",
    population: "~1.5 million",
    languages:
      "English (official); Trinidadian and Tobagonian Creoles widely spoken",
    currency: "Trinidad and Tobago dollar (TTD)",
    fact: "Trinidad and Tobago is the birthplace of the steelpan, one of the only major acoustic instruments invented in the 20th century.",
  },
  Turkey: {
    capital: "Ankara",
    region: "Transcontinental: Southeastern Europe and Western Asia",
    population: "~85.7 million",
    languages: "Turkish (official)",
    currency: "Turkish lira (TRY)",
    fact: "Istanbul is the only major city in the world that spans two continents, Europe and Asia.",
  },
  "United Kingdom": {
    capital: "London",
    region: "Northwestern Europe",
    population: "~69.1 million",
    languages:
      "English (de facto); Welsh, Scottish Gaelic, Irish, and other languages have official or protected status in parts of the UK",
    currency: "Pound sterling (GBP)",
    fact: "The United Kingdom is made up of England, Scotland, Wales, and Northern Ireland.",
  },
  "United States": {
    capital: "Washington, D.C.",
    region: "North America",
    population: "~340 million",
    languages:
      "English (primary nationally); Spanish and many others widely spoken",
    currency: "United States dollar (USD)",
    fact: "The U.S. spans the third-largest land area of any country and includes diverse biomes from Arctic tundra to tropical islands.",
  },
  Zambia: {
    capital: "Lusaka",
    region: "Southern Africa",
    population: "~21.9 million",
    languages:
      "English (official); Bemba, Nyanja, Tonga, Lozi, and others widely spoken",
    currency: "Zambian kwacha (ZMW)",
    fact: "Zambia shares Victoria Falls, one of the world’s largest waterfalls, with Zimbabwe.",
  },
  Zimbabwe: {
    capital: "Harare",
    region: "Southern Africa",
    population: "~17.0 million",
    languages:
      "16 official languages, including Shona, Ndebele, and English",
    currency:
      "Zimbabwe Gold (ZiG) and other legal tender arrangements have been used recently",
    fact: "Great Zimbabwe, a medieval stone city, gave the modern country its name.",
  },
};

export function lookupCountryFactSheet(
  normalizedCountryName: string,
): CountryFactSheet | undefined {
  return COUNTRY_FACTS[normalizedCountryName];
}
