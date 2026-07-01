export type IndigenousLanguage = {
  code?: string;
  label: string;
  endonym?: string;
};

export type IndigenousNation = {
  id: string;
  name: string;
  endonym?: string;
  languages?: IndigenousLanguage[];
  notes?: string;
};

export type IndigenousByISO2 = Record<string, IndigenousNation[]>;

export const INDIGENOUS_BY_ISO2: IndigenousByISO2 = {
  CA: [
    {
      id: "ca-inuit",
      name: "Inuit",
      endonym: "ᐃᓄᐃᑦ",
      languages: [
        { code: "iu", label: "Inuktitut", endonym: "ᐃᓄᒃᑎᑐᑦ" },
        { label: "Inuinnaqtun" },
      ],
    },
    {
      id: "ca-cree",
      name: "Cree",
      languages: [{ label: "Cree", endonym: "Nēhiyawēwin" }],
    },
    {
      id: "ca-anishinaabe",
      name: "Anishinaabe",
      languages: [{ label: "Ojibwe", endonym: "Anishinaabemowin" }],
    },
    {
      id: "ca-haudenosaunee",
      name: "Haudenosaunee",
      languages: [{ label: "Mohawk", endonym: "Kanien'kéha" }],
    },
  ],
  US: [
    {
      id: "us-navajo",
      name: "Navajo Nation",
      endonym: "Diné",
      languages: [{ code: "nv", label: "Navajo", endonym: "Diné bizaad" }],
    },
    {
      id: "us-cherokee",
      name: "Cherokee",
      languages: [{ label: "Cherokee", endonym: "ᏣᎳᎩ" }],
    },
    {
      id: "us-lakota",
      name: "Lakota",
      languages: [{ label: "Lakota", endonym: "Lakȟótiyapi" }],
    },
  ],
  MX: [
    { id: "mx-nahua", name: "Nahua", languages: [{ label: "Nahuatl", endonym: "Nāhuatl" }] },
    { id: "mx-maya", name: "Maya", languages: [{ label: "Yucatec Maya", endonym: "Maaya t'aan" }] },
    { id: "mx-mixtec", name: "Mixtec", languages: [{ label: "Mixtec", endonym: "Tu'un Savi" }] },
  ],
  BR: [
    { id: "br-guarani", name: "Guarani", languages: [{ label: "Guarani", endonym: "Avañe'ẽ" }] },
    { id: "br-yanomami", name: "Yanomami", languages: [{ label: "Yanomami" }] },
  ],
  PE: [
    { id: "pe-quechua", name: "Quechua peoples", languages: [{ label: "Quechua", endonym: "Runa Simi" }] },
    { id: "pe-aymara", name: "Aymara", languages: [{ label: "Aymara", endonym: "Aymar aru" }] },
  ],
  AU: [
    { id: "au-aboriginal", name: "Aboriginal and Torres Strait Islander peoples", notes: "Multiple nations & languages." },
    { id: "au-pitjantjatjara", name: "Pitjantjatjara", languages: [{ label: "Pitjantjatjara" }] },
  ],
  NZ: [
    { id: "nz-maori", name: "Māori", endonym: "Māori", languages: [{ code: "mi", label: "Māori", endonym: "Te Reo Māori" }] },
  ],
  NO: [
    { id: "no-sami", name: "Sámi", endonym: "Sámit", languages: [{ label: "Northern Sámi", endonym: "Davvisámegiella" }] },
  ],
  FI: [
    { id: "fi-sami", name: "Sámi", endonym: "Sámit", languages: [{ label: "Northern Sámi", endonym: "Davvisámegiella" }] },
  ],
  ET: [
    { id: "et-oromo", name: "Oromo", languages: [{ label: "Afaan Oromo" }] },
    { id: "et-amhara", name: "Amhara", languages: [{ label: "Amharic", endonym: "አማርኛ" }] },
  ],
  KE: [
    { id: "ke-maasai", name: "Maasai", languages: [{ label: "Maa" }] },
    { id: "ke-swahili", name: "Swahili", languages: [{ code: "sw", label: "Swahili", endonym: "Kiswahili" }] },
  ],
  CN: [
    { id: "cn-tibetan", name: "Tibetan", languages: [{ label: "Tibetan", endonym: "བོད་སྐད་" }] },
    { id: "cn-uyghur", name: "Uyghur", languages: [{ label: "Uyghur", endonym: "ئۇيغۇرچە" }] },
  ],
  IN: [
    { id: "in-santali", name: "Santali", languages: [{ label: "Santali", endonym: "ᱥᱟᱱᱛᱟᱲᱤ" }] },
    { id: "in-kashmiri", name: "Kashmiri", languages: [{ label: "Kashmiri", endonym: "कॉशुर / کٲشُر" }] },
  ],
};

export function getIndigenousLanguagesLabel(iso2?: string | null): string {
  if (!iso2) return "—";
  const key = iso2.toUpperCase();
  const nations = INDIGENOUS_BY_ISO2[key];
  if (!nations || nations.length === 0) return "—";
  const langs = nations
    .flatMap((n) => n.languages ?? [])
    .map((l) => (l.endonym ? `${l.label} (${l.endonym})` : l.label));
  const unique = Array.from(new Set(langs));
  return unique.length ? unique.join(", ") : "—";
}
