import fs from "fs";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const DONE = new Set(["en","fr","es"]);

const LANGUAGES: Record<string,string> = {
  af:"Afrikaans",am:"Amharic",ar:"Arabic",ay:"Aymara",az:"Azerbaijani",be:"Belarusian",bg:"Bulgarian",
  bi:"Bislama",bn:"Bengali",bs:"Bosnian",ca:"Catalan",ch:"Chamorro",cs:"Czech",da:"Danish",de:"German",
  dv:"Dhivehi",dz:"Dzongkha",el:"Greek",et:"Estonian",eu:"Basque",fa:"Persian",ff:"Fula",fi:"Finnish",
  fj:"Fijian",fo:"Faroese",ga:"Irish",gl:"Galician",gn:"Guarani",gv:"Manx",he:"Hebrew",hi:"Hindi",
  hr:"Croatian",ht:"Haitian Creole",hu:"Hungarian",hy:"Armenian",id:"Indonesian",is:"Icelandic",
  it:"Italian",ja:"Japanese",ka:"Georgian",kg:"Kongo",kk:"Kazakh",kl:"Greenlandic",km:"Khmer",
  ko:"Korean",ku:"Kurdish",ky:"Kyrgyz",la:"Latin",lb:"Luxembourgish",ln:"Lingala",lo:"Lao",
  lt:"Lithuanian",lu:"Luba-Katanga",lv:"Latvian",mg:"Malagasy",mh:"Marshallese",mi:"Maori",
  mk:"Macedonian",mn:"Mongolian",ms:"Malay",mt:"Maltese",my:"Burmese",na:"Nauruan",nb:"Norwegian Bokmal",
  nd:"North Ndebele",ne:"Nepali",nl:"Dutch",nn:"Norwegian Nynorsk",no:"Norwegian",nr:"South Ndebele",
  ny:"Chichewa",oc:"Occitan",pa:"Punjabi",pl:"Polish",ps:"Pashto",pt:"Portuguese",qu:"Quechua",
  rn:"Kirundi",ro:"Romanian",ru:"Russian",rw:"Kinyarwanda",sg:"Sango",si:"Sinhala",sk:"Slovak",
  sl:"Slovenian",sm:"Samoan",sn:"Shona",so:"Somali",sq:"Albanian",sr:"Serbian",ss:"Swati",st:"Sotho",
  sv:"Swedish",sw:"Swahili",ta:"Tamil",tg:"Tajik",th:"Thai",ti:"Tigrinya",tk:"Turkmen",tl:"Filipino",
  tn:"Tswana",to:"Tongan",tr:"Turkish",ts:"Tsonga",uk:"Ukrainian",ur:"Urdu",uz:"Uzbek",ve:"Venda",
  vi:"Vietnamese",xh:"Xhosa",zh:"Chinese",zu:"Zulu"
};

const EN_JSON = {
  nav: { submit: 'Submit', dashboard: 'Dashboard', pricing: 'Pricing', badges: 'Badges' },
  hero: { kicker: 'NOXEL Forge - Backlink Exchange Ecosystem', title: 'Forge your', titleAccent: 'authority', subtitle: 'Exchange backlinks with verified sites filtered by Alfred. Quality guaranteed, spam impossible. Give one, get one.', ctaSubmit: 'Submit my site', ctaDashboard: 'My Dashboard' },
  stats: { forgePoints: 'Forge Points', forgePointsDesc: 'Earn points on every exchange', giveOne: 'Give one, get one', giveOneDesc: 'You give a backlink, you get one back', alfredFilters: 'Alfred filters', alfredFiltersDesc: 'Zero spam, zero generic content' },
  trust: { kicker: 'Trust Score Forge', subtitle: 'Every site receives a score out of 100 based on 6 quality signals' },
  directory: { kicker: 'Directory', title: 'Verified Forge Sites', empty: 'The directory is empty for now', emptyDesc: 'Be the first to submit your site.', loading: 'Loading directory...', previous: 'Previous', next: 'Next' },
  submit: { alfredTitle: 'Alfred reviews every submission', alfredDesc: 'Every submission is scanned and reviewed by Alfred before publication. Quality guaranteed, spam impossible.', urlLabel: 'Site URL', urlHint: 'HTTPS required. Must contain a link to noxelseo.com or noxelforge.com', titleLabel: 'Title', nicheLabel: 'Niche', descLabel: 'Short description', contentLabel: 'Main content', contentHint: 'optional, helps Alfred analyze better', submitBtn: 'Submit to NOXEL Forge', analyzing: 'Analyzing...' },
  pricing: { kicker: 'NOXEL Forge Pricing', title: 'Build your', titleAccent: 'authority network', subtitle: 'Display the NOXEL badge on your site and unlock exclusive discounts on every tier.', monthly: 'Monthly', annual: 'Annual', badgeToggle: 'I display the NOXEL badge, unlock discount', badgeApplied: 'Badge discount applied', mostPopular: 'Most popular', perMonth: '/mo', getStarted: 'Get started free', badgeInfoTitle: 'How to unlock badge discounts', badgeInfoDesc: 'Display any badge in the footer of your site. Alfred scans your footer on every submission.' },
  badge: { kicker: 'Display on your site', title: 'NOXEL Forge', titleAccent: 'Badges', subtitle: 'Copy and paste any badge in your site footer.', copy: 'Copy snippet', copied: 'Copied!', infoTitle: 'How badge discounts work', infoDesc: 'Place any badge in the footer of your site, site-wide. Alfred scans your footer on every submission. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%.' },
  cta: { kicker: 'Ready to forge?', title: 'Join NOXEL Forge', subtitle: 'Start building your verified backlink network today.' }
};

async function translateLang(code: string, name: string) {
  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [{
      role: "user",
      content: `Translate all string VALUES in this JSON to ${name} (${code}). Keep all keys unchanged. Keep "NOXEL Forge", "NOXEL", "Alfred" as brand names unchanged. Return ONLY valid JSON, no markdown, no explanation, no code fences.\n\n${JSON.stringify(EN_JSON, null, 2)}`
    }]
  });
  const text = (msg.content[0] as any).text.replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

async function processChunk(langs: [string,string][], results: Record<string, any>) {
  for (const [code, name] of langs) {
    if (DONE.has(code)) continue;
    try {
      console.log(`Translating ${code} (${name})...`);
      results[code] = await translateLang(code, name);
      console.log(`OK ${code}`);
    } catch (err: any) {
      console.error(`FAIL ${code}: ${err.message}`);
    }
  }
}

async function main() {
  const langs = Object.entries(LANGUAGES).filter(([code]) => !DONE.has(code));
  console.log(`Translating ${langs.length} languages in 10 parallel workers...`);
  const results: Record<string, any> = {};
  const chunkSize = Math.ceil(langs.length / 10);
  const chunks: [string,string][][] = [];
  for (let i = 0; i < langs.length; i += chunkSize) {
    chunks.push(langs.slice(i, i + chunkSize) as [string,string][]);
  }
  await Promise.all(chunks.map(chunk => processChunk(chunk, results)));

  let output = "// AUTO-GENERATED translations to paste into forge.translations.ts\n\n";
  for (const [code, data] of Object.entries(results)) {
    output += `const ${code.replace('-','_')}: ForgeTranslations = ${JSON.stringify(data, null, 2).replace(/"([a-zA-Z]+)":/g, '$1:')};\n\n`;
  }
  output += `// Add to FORGE_TRANSLATIONS object:\n// ${Object.keys(results).map(c => `${c}`).join(', ')}\n`;

  fs.writeFileSync("scripts/forge_translations_generated.ts", output, "utf-8");
  console.log("DONE - check scripts/forge_translations_generated.ts");
}

main();
