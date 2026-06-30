import fs from "fs";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const RETRY_LANGS: Record<string, string> = {
  pa: "Punjabi", am: "Amharic", ti: "Tigrinya", my: "Burmese", lo: "Lao",
  dv: "Dhivehi", dz: "Dzongkha", ne: "Nepali", km: "Khmer", si: "Sinhala", ta: "Tamil"
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
  const promptText = "Translate all string VALUES in this JSON to " + name + " (" + code + "). Keep all keys unchanged. Keep \"NOXEL Forge\", \"NOXEL\", \"Alfred\" as brand names unchanged. CRITICAL: escape any quotes or special characters properly so the output is 100% valid JSON. Return ONLY valid JSON, no markdown, no explanation, no code fences.\n\n" + JSON.stringify(EN_JSON, null, 2);

  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 3000,
    messages: [{ role: "user", content: promptText }]
  });
  const text = (msg.content[0] as any).text.replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

async function main() {
  const results: Record<string, any> = {};
  for (const [code, name] of Object.entries(RETRY_LANGS)) {
    try {
      console.log("Retrying " + code + " (" + name + ")...");
      results[code] = await translateLang(code, name);
      console.log("OK " + code);
    } catch (err: any) {
      console.error("FAIL " + code + ": " + err.message);
    }
  }

  let output = "\n// RETRY translations\n\n";
  for (const [code, data] of Object.entries(results)) {
    output += "const " + code + ": ForgeTranslations = " + JSON.stringify(data, null, 2).replace(/"([a-zA-Z]+)":/g, '$1:') + ";\n\n";
  }
  fs.appendFileSync("scripts/forge_translations_generated.ts", output, "utf-8");
  console.log("DONE retry - appended to scripts/forge_translations_generated.ts");
}

main();
