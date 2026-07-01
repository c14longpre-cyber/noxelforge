export type CountryId = string;

export interface CountrySubdivisionInfo {
  iso: string;
  code: string;
  name: string;
  type?: string;
  flag?: string;
}

export interface CountryLanguageInfo {
  code?: string;
  name: string;
  nativeName?: string;
  official?: boolean;
  indigenous?: boolean;
}

export interface CountryInfo {
  id: CountryId;
  name: string;
  officialName?: string;
  capital?: string;
  iso2: string;
  iso3?: string;
  isoNumeric?: string;
  domain?: string;
  region?: string;
  subregion?: string;
  currency?: string;
  currencyCode?: string;
  currencySymbol?: string;
  flag?: string;
  officialLanguages?: string[];
  indigenousLanguages?: string[];
  languages?: CountryLanguageInfo[];
  subdivisions?: CountrySubdivisionInfo[];
  aliases?: string[];
}

export const COUNTRY_DATA: Record<CountryId, CountryInfo> = {
  ca: {
    id: "ca", name: "Canada", officialName: "Canada", capital: "Ottawa",
    currency: "$ (CAD)", currencyCode: "CAD", currencySymbol: "$",
    region: "Americas", subregion: "Northern America",
    iso2: "CA", iso3: "CAN", isoNumeric: "124", domain: ".ca",
    flag: "https://flagcdn.com/w160/ca.png",
    officialLanguages: ["English", "French"],
    indigenousLanguages: ["Inuktitut", "Cree", "Ojibwe", "Mohawk"],
    languages: [
      { code: "en", name: "English", nativeName: "English", official: true },
      { code: "fr", name: "French", nativeName: "Français", official: true },
      { code: "iu", name: "Inuktitut", nativeName: "ᐃᓄᒃᑎᑐᑦ", indigenous: true },
      { code: "cr", name: "Cree", nativeName: "Nēhiyawēwin", indigenous: true },
      { code: "oj", name: "Ojibwe", nativeName: "Anishinaabemowin", indigenous: true },
    ],
    subdivisions: [
      { iso: "CA-QC", code: "QC", name: "Quebec", type: "province", flag: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg" },
      { iso: "CA-ON", code: "ON", name: "Ontario", type: "province", flag: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Ontario.svg" },
      { iso: "CA-BC", code: "BC", name: "British Columbia", type: "province", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_British_Columbia.svg" },
      { iso: "CA-AB", code: "AB", name: "Alberta", type: "province", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Flag_of_Alberta.svg" },
      { iso: "CA-NU", code: "NU", name: "Nunavut", type: "territory", flag: "https://upload.wikimedia.org/wikipedia/commons/9/90/Flag_of_Nunavut.svg" },
    ],
    aliases: ["CA"],
  },
  us: {
    id: "us", name: "United States", officialName: "United States of America", capital: "Washington, D.C.",
    currency: "$ (USD)", currencyCode: "USD", currencySymbol: "$",
    region: "Americas", subregion: "Northern America",
    iso2: "US", iso3: "USA", isoNumeric: "840", domain: ".us",
    flag: "https://flagcdn.com/w160/us.png",
    officialLanguages: ["English"],
    indigenousLanguages: ["Navajo", "Cherokee", "Lakota"],
    languages: [
      { code: "en", name: "English", nativeName: "English", official: true },
      { code: "es", name: "Spanish", nativeName: "Español" },
      { code: "nv", name: "Navajo", nativeName: "Diné bizaad", indigenous: true },
    ],
    subdivisions: [
      { iso: "US-CA", code: "CA", name: "California", type: "state", flag: "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg" },
      { iso: "US-TX", code: "TX", name: "Texas", type: "state", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg" },
      { iso: "US-NY", code: "NY", name: "New York", type: "state", flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_New_York.svg" },
      { iso: "US-FL", code: "FL", name: "Florida", type: "state", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg" },
    ],
    aliases: ["USA", "US"],
  },
  fr: {
    id: "fr", name: "France", officialName: "French Republic", capital: "Paris",
    currency: "€ (EUR)", currencyCode: "EUR", currencySymbol: "€",
    region: "Europe", subregion: "Western Europe",
    iso2: "FR", iso3: "FRA", isoNumeric: "250", domain: ".fr",
    flag: "https://flagcdn.com/w160/fr.png",
    officialLanguages: ["French"],
    indigenousLanguages: [],
    languages: [{ code: "fr", name: "French", nativeName: "Français", official: true }],
    subdivisions: [
      { iso: "FR-IDF", code: "IDF", name: "Île-de-France", type: "region", flag: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_Ile-de-France.svg" },
      { iso: "FR-PAC", code: "PAC", name: "Provence-Alpes-Côte d'Azur", type: "region", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Provence-Alpes-Cote_d%27Azur.svg" },
      { iso: "FR-BRE", code: "BRE", name: "Brittany", type: "region", flag: "https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Brittany_%28Gwenn_ha_du%29.svg" },
    ],
    aliases: ["FR"],
  },
  mx: {
    id: "mx", name: "Mexico", officialName: "United Mexican States", capital: "Mexico City",
    currency: "$ (MXN)", currencyCode: "MXN", currencySymbol: "$",
    region: "Americas", subregion: "North America",
    iso2: "MX", iso3: "MEX", isoNumeric: "484", domain: ".mx",
    flag: "https://flagcdn.com/w160/mx.png",
    officialLanguages: ["Spanish"],
    indigenousLanguages: ["Nahuatl", "Yucatec Maya", "Mixtec"],
    languages: [
      { code: "es", name: "Spanish", nativeName: "Español", official: true },
      { name: "Nahuatl", nativeName: "Nāhuatl", indigenous: true },
    ],
    aliases: ["MX"],
  },
  br: {
    id: "br", name: "Brazil", officialName: "Federative Republic of Brazil", capital: "Brasília",
    currency: "R$ (BRL)", currencyCode: "BRL", currencySymbol: "R$",
    region: "Americas", subregion: "South America",
    iso2: "BR", iso3: "BRA", isoNumeric: "076", domain: ".br",
    flag: "https://flagcdn.com/w160/br.png",
    officialLanguages: ["Portuguese"],
    indigenousLanguages: ["Guarani", "Yanomami"],
    languages: [{ code: "pt", name: "Portuguese", nativeName: "Português", official: true }],
    aliases: ["BR", "Brasil"],
  },
  pe: {
    id: "pe", name: "Peru", officialName: "Republic of Peru", capital: "Lima",
    currency: "S/. (PEN)", currencyCode: "PEN", currencySymbol: "S/.",
    region: "Americas", subregion: "South America",
    iso2: "PE", iso3: "PER", isoNumeric: "604", domain: ".pe",
    flag: "https://flagcdn.com/w160/pe.png",
    officialLanguages: ["Spanish"],
    indigenousLanguages: ["Quechua", "Aymara"],
    languages: [
      { code: "es", name: "Spanish", nativeName: "Español", official: true },
      { code: "qu", name: "Quechua", nativeName: "Runa Simi", indigenous: true },
    ],
    aliases: ["PE"],
  },
  es: {
    id: "es", name: "Spain", officialName: "Kingdom of Spain", capital: "Madrid",
    currency: "€ (EUR)", currencyCode: "EUR", currencySymbol: "€",
    region: "Europe", subregion: "Southern Europe",
    iso2: "ES", iso3: "ESP", isoNumeric: "724", domain: ".es",
    flag: "https://flagcdn.com/w160/es.png",
    officialLanguages: ["Spanish"],
    indigenousLanguages: [],
    languages: [{ code: "es", name: "Spanish", nativeName: "Español", official: true }],
    aliases: ["ES"],
  },
  de: {
    id: "de", name: "Germany", officialName: "Federal Republic of Germany", capital: "Berlin",
    currency: "€ (EUR)", currencyCode: "EUR", currencySymbol: "€",
    region: "Europe", subregion: "Western Europe",
    iso2: "DE", iso3: "DEU", isoNumeric: "276", domain: ".de",
    flag: "https://flagcdn.com/w160/de.png",
    officialLanguages: ["German"],
    indigenousLanguages: [],
    languages: [{ code: "de", name: "German", nativeName: "Deutsch", official: true }],
    aliases: ["DE"],
  },
  it: {
    id: "it", name: "Italy", officialName: "Italian Republic", capital: "Rome",
    currency: "€ (EUR)", currencyCode: "EUR", currencySymbol: "€",
    region: "Europe", subregion: "Southern Europe",
    iso2: "IT", iso3: "ITA", isoNumeric: "380", domain: ".it",
    flag: "https://flagcdn.com/w160/it.png",
    officialLanguages: ["Italian"],
    indigenousLanguages: [],
    languages: [{ code: "it", name: "Italian", nativeName: "Italiano", official: true }],
    aliases: ["IT"],
  },
  pt: {
    id: "pt", name: "Portugal", officialName: "Portuguese Republic", capital: "Lisbon",
    currency: "€ (EUR)", currencyCode: "EUR", currencySymbol: "€",
    region: "Europe", subregion: "Southern Europe",
    iso2: "PT", iso3: "PRT", isoNumeric: "620", domain: ".pt",
    flag: "https://flagcdn.com/w160/pt.png",
    officialLanguages: ["Portuguese"],
    indigenousLanguages: [],
    languages: [{ code: "pt", name: "Portuguese", nativeName: "Português", official: true }],
    aliases: ["PT"],
  },
  nl: {
    id: "nl", name: "Netherlands", officialName: "Kingdom of the Netherlands", capital: "Amsterdam",
    currency: "€ (EUR)", currencyCode: "EUR", currencySymbol: "€",
    region: "Europe", subregion: "Western Europe",
    iso2: "NL", iso3: "NLD", isoNumeric: "528", domain: ".nl",
    flag: "https://flagcdn.com/w160/nl.png",
    officialLanguages: ["Dutch"],
    indigenousLanguages: [],
    languages: [{ code: "nl", name: "Dutch", nativeName: "Nederlands", official: true }],
    aliases: ["NL"],
  },
  jp: {
    id: "jp", name: "Japan", officialName: "Japan", capital: "Tokyo",
    currency: "¥ (JPY)", currencyCode: "JPY", currencySymbol: "¥",
    region: "Asia", subregion: "Eastern Asia",
    iso2: "JP", iso3: "JPN", isoNumeric: "392", domain: ".jp",
    flag: "https://flagcdn.com/w160/jp.png",
    officialLanguages: ["Japanese"],
    indigenousLanguages: ["Ainu"],
    languages: [
      { code: "ja", name: "Japanese", nativeName: "日本語", official: true },
      { name: "Ainu", nativeName: "Aynu Itak", indigenous: true },
    ],
    aliases: ["JP"],
  },
  cn: {
    id: "cn", name: "China", officialName: "People's Republic of China", capital: "Beijing",
    currency: "¥ (CNY)", currencyCode: "CNY", currencySymbol: "¥",
    region: "Asia", subregion: "Eastern Asia",
    iso2: "CN", iso3: "CHN", isoNumeric: "156", domain: ".cn",
    flag: "https://flagcdn.com/w160/cn.png",
    officialLanguages: ["Chinese"],
    indigenousLanguages: ["Tibetan", "Uyghur"],
    languages: [{ code: "zh", name: "Chinese", nativeName: "中文", official: true }],
    aliases: ["CN"],
  },
  in: {
    id: "in", name: "India", officialName: "Republic of India", capital: "New Delhi",
    currency: "₹ (INR)", currencyCode: "INR", currencySymbol: "₹",
    region: "Asia", subregion: "Southern Asia",
    iso2: "IN", iso3: "IND", isoNumeric: "356", domain: ".in",
    flag: "https://flagcdn.com/w160/in.png",
    officialLanguages: ["Hindi", "English"],
    indigenousLanguages: ["Santali", "Kashmiri"],
    languages: [
      { code: "hi", name: "Hindi", nativeName: "हिन्दी", official: true },
      { code: "en", name: "English", nativeName: "English", official: true },
    ],
    aliases: ["IN"],
  },
  au: {
    id: "au", name: "Australia", officialName: "Commonwealth of Australia", capital: "Canberra",
    currency: "$ (AUD)", currencyCode: "AUD", currencySymbol: "$",
    region: "Oceania", subregion: "Australia and New Zealand",
    iso2: "AU", iso3: "AUS", isoNumeric: "036", domain: ".au",
    flag: "https://flagcdn.com/w160/au.png",
    officialLanguages: ["English"],
    indigenousLanguages: ["Aboriginal languages", "Pitjantjatjara"],
    languages: [{ code: "en", name: "English", nativeName: "English", official: true }],
    aliases: ["AU"],
  },
  nz: {
    id: "nz", name: "New Zealand", officialName: "New Zealand", capital: "Wellington",
    currency: "$ (NZD)", currencyCode: "NZD", currencySymbol: "$",
    region: "Oceania", subregion: "Australia and New Zealand",
    iso2: "NZ", iso3: "NZL", isoNumeric: "554", domain: ".nz",
    flag: "https://flagcdn.com/w160/nz.png",
    officialLanguages: ["English", "Māori"],
    indigenousLanguages: ["Māori"],
    languages: [
      { code: "en", name: "English", nativeName: "English", official: true },
      { code: "mi", name: "Māori", nativeName: "Te Reo Māori", official: true, indigenous: true },
    ],
    aliases: ["NZ"],
  },
  sa: {
    id: "sa", name: "Saudi Arabia", officialName: "Kingdom of Saudi Arabia", capital: "Riyadh",
    currency: "﷼ (SAR)", currencyCode: "SAR", currencySymbol: "﷼",
    region: "Asia", subregion: "Western Asia",
    iso2: "SA", iso3: "SAU", isoNumeric: "682", domain: ".sa",
    flag: "https://flagcdn.com/w160/sa.png",
    officialLanguages: ["Arabic"],
    indigenousLanguages: [],
    languages: [{ code: "ar", name: "Arabic", nativeName: "العربية", official: true }],
    aliases: ["SA"],
  },
  no: {
    id: "no", name: "Norway", officialName: "Kingdom of Norway", capital: "Oslo",
    currency: "kr (NOK)", currencyCode: "NOK", currencySymbol: "kr",
    region: "Europe", subregion: "Northern Europe",
    iso2: "NO", iso3: "NOR", isoNumeric: "578", domain: ".no",
    flag: "https://flagcdn.com/w160/no.png",
    officialLanguages: ["Norwegian"],
    indigenousLanguages: ["Northern Sámi"],
    languages: [
      { code: "no", name: "Norwegian", nativeName: "Norsk", official: true },
      { name: "Northern Sámi", nativeName: "Davvisámegiella", indigenous: true },
    ],
    aliases: ["NO"],
  },
  fi: {
    id: "fi", name: "Finland", officialName: "Republic of Finland", capital: "Helsinki",
    currency: "€ (EUR)", currencyCode: "EUR", currencySymbol: "€",
    region: "Europe", subregion: "Northern Europe",
    iso2: "FI", iso3: "FIN", isoNumeric: "246", domain: ".fi",
    flag: "https://flagcdn.com/w160/fi.png",
    officialLanguages: ["Finnish", "Swedish"],
    indigenousLanguages: ["Northern Sámi"],
    languages: [
      { code: "fi", name: "Finnish", nativeName: "Suomi", official: true },
      { name: "Northern Sámi", nativeName: "Davvisámegiella", indigenous: true },
    ],
    aliases: ["FI"],
  },
  et: {
    id: "et", name: "Ethiopia", officialName: "Federal Democratic Republic of Ethiopia", capital: "Addis Ababa",
    currency: "Br (ETB)", currencyCode: "ETB", currencySymbol: "Br",
    region: "Africa", subregion: "Eastern Africa",
    iso2: "ET", iso3: "ETH", isoNumeric: "231", domain: ".et",
    flag: "https://flagcdn.com/w160/et.png",
    officialLanguages: ["Amharic"],
    indigenousLanguages: ["Oromo"],
    languages: [{ code: "am", name: "Amharic", nativeName: "አማርኛ", official: true }],
    aliases: ["ET"],
  },
  ke: {
    id: "ke", name: "Kenya", officialName: "Republic of Kenya", capital: "Nairobi",
    currency: "KSh (KES)", currencyCode: "KES", currencySymbol: "KSh",
    region: "Africa", subregion: "Eastern Africa",
    iso2: "KE", iso3: "KEN", isoNumeric: "404", domain: ".ke",
    flag: "https://flagcdn.com/w160/ke.png",
    officialLanguages: ["English", "Swahili"],
    indigenousLanguages: ["Maa"],
    languages: [
      { code: "en", name: "English", nativeName: "English", official: true },
      { code: "sw", name: "Swahili", nativeName: "Kiswahili", official: true },
    ],
    aliases: ["KE"],
  },
};

export function getCountryById(id?: string | null): CountryInfo | null {
  if (!id) return null;
  return COUNTRY_DATA[id.toLowerCase()] || null;
}

export function getCountryByISO2(iso2?: string | null): CountryInfo | null {
  if (!iso2) return null;
  const key = iso2.toLowerCase();
  return COUNTRY_DATA[key] || null;
}

export function getCountryPrimaryLanguage(country?: CountryInfo | null): string | null {
  if (!country) return null;
  return country.officialLanguages?.[0] || country.languages?.[0]?.name || null;
}

export const ALL_COUNTRIES: CountryInfo[] = Object.values(COUNTRY_DATA).sort((a, b) =>
  a.name.localeCompare(b.name)
);
