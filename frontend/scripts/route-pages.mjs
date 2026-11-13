/**
 * Pages publiques de NOXEL FORGE servies avec leur propre <head>.
 *
 * Sans ce fichier, /forge/pricing, /forge/partners, /forge/submit et /forge/badge
 * recevaient index.html : titre de l'accueil et canonique vers l'accueil. Le
 * composant CanonicalUpdater (App.tsx) corrige la canonique après le démarrage
 * de React, mais un robot qui lit le HTML brut ne le voit pas.
 *
 * Après `vite build`, `node scripts/route-pages.mjs` écrit dist/forge/<page>.html
 * à partir de dist/index.html (mêmes scripts et styles hachés) avec titre,
 * description, canonique, og:*, twitter:*, fil d'Ariane et texte de secours
 * propres à la page. vercel.json réécrit /forge/<page> vers ce fichier.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://noxelforge.com";

export const ROUTE_PAGES = [
  {
    route: "forge/pricing",
    title: "NOXEL FORGE Pricing — Bronze free, Silver to Diamond in CAD",
    description:
      "NOXEL FORGE plans: Bronze is free, Silver $20, Gold $40, Platinum $60 and Diamond $80 CAD per month, or 17% less billed yearly. 14-day refund.",
    crumb: "Pricing",
    body: `
        <h1>NOXEL FORGE pricing: one free plan and four paid tiers in Canadian dollars</h1>
        <p>NOXEL FORGE pricing starts with Bronze, a free plan to browse the directory of verified partners. Paid tiers unlock submissions, the Alfred review and backlink exchanges with members of a close niche.</p>
        <ul>
          <li>Bronze — free: directory access, view all NOXEL FORGE partners, NOXEL badge (display only).</li>
          <li>Silver — $20 CAD per month or $199 per year: submit your site, Alfred review, Forge Points, 10% badge discount.</li>
          <li>Gold — $40 CAD per month or $399 per year: priority Alfred review, 1.5x Forge Points, 15% badge discount, verified partner badge.</li>
          <li>Platinum — $60 CAD per month or $599 per year: VIP Alfred review, 2x Forge Points, 20% badge discount, advanced placement.</li>
          <li>Diamond — $80 CAD per month or $799 per year: elite Alfred review, 3x Forge Points, 25% badge discount, featured listing.</li>
        </ul>
        <p>Prices are in Canadian dollars. Yearly billing saves about 17%. A member who displays the NOXEL FORGE or NOXEL SEO badge on their site gets the badge discount of their tier. A subscription cancelled within 14 days of its start is refunded automatically, and plan changes, cancellation, cards and invoices are handled in the Stripe customer portal.</p>
        <p>Bronze members can browse but cannot propose or accept an exchange: exchanges start at Silver. Every exchange is verified by the server on both sites before it counts.</p>
        <nav><a href="/forge">NOXEL FORGE home</a> · <a href="/forge/partners">Verified partners</a> · <a href="/forge/badge">NOXEL FORGE badge</a> · <a href="/forge/submit">Submit your site</a></nav>`,
  },
  {
    route: "forge/partners",
    title: "NOXEL FORGE Partners — directory of verified backlink partners",
    description:
      "Browse NOXEL FORGE partners: sites with a proven domain and a reviewed submission, filtered by niche, ready for verified backlink exchanges.",
    crumb: "Partners",
    body: `
        <h1>NOXEL FORGE partners: the directory of verified backlink partners</h1>
        <p>The NOXEL FORGE partners directory lists member sites that proved they own their domain and passed the Alfred review. Filter it by niche (SEO, marketing, AI, e-commerce, web development, business, design, finance, health, education) to find partners close to your topic.</p>
        <p>Signed-in members also get recommendations from the NOXEL FORGE matchmaking engine, which compares niches, Trust Scores, recent activity and freshness, and can propose an exchange in one click. An exchange counts only when the server has found a link to the partner on a page of each member's own domain.</p>
        <p>A site appears in the directory only while its domain is proven by a meta tag, a file or a DNS record, and while its NOXEL FORGE badge is verified. Sites that break the exchange guidelines are removed.</p>
        <nav><a href="/forge">NOXEL FORGE home</a> · <a href="/forge/pricing">Pricing</a> · <a href="/forge/submit">Submit your site</a> · <a href="/forge/badge">NOXEL FORGE badge</a></nav>`,
  },
  {
    route: "forge/submit",
    title: "Submit your site to NOXEL FORGE — reviewed by Alfred",
    description:
      "Submit a page of your proven domain to NOXEL FORGE. Alfred reviews content quality and niche relevance before it joins the partner directory.",
    crumb: "Submit",
    body: `
        <h1>Submit your site to NOXEL FORGE</h1>
        <p>Submitting your site to NOXEL FORGE puts one page of your domain in front of the partner network. Alfred, the NOXEL FORGE reviewer, checks content quality, niche relevance and the exchange guidelines before the page joins the directory.</p>
        <p>The submitted page must belong to your proven domain: prove ownership once with a meta tag, a file in /.well-known/ or a DNS TXT record. Site submission with the Alfred review is included from the Silver plan; Bronze members can browse the directory for free.</p>
        <nav><a href="/forge">NOXEL FORGE home</a> · <a href="/forge/pricing">Pricing</a> · <a href="/forge/partners">Verified partners</a> · <a href="/forge/badge">NOXEL FORGE badge</a></nav>`,
  },
  {
    route: "forge/badge",
    title: "NOXEL FORGE Badge — show your verified membership",
    description:
      "Install the NOXEL FORGE badge on your site: it shows your verified membership, keeps you listed in the directory and unlocks the badge discount.",
    crumb: "Badge",
    body: `
        <h1>The NOXEL FORGE badge</h1>
        <p>The NOXEL FORGE badge shows visitors that your site is a verified member of the NOXEL FORGE network. While the badge is detected, your site stays public in the partner directory, and paid plans get a 10% to 25% badge discount.</p>
        <p>NOXEL checks every badge on the 1st and the 15th of the month. If a badge is missing, a 7-day grace period starts and the site is checked every day; after that the badge is suspended until it is detected again.</p>
        <nav><a href="/forge">NOXEL FORGE home</a> · <a href="/forge/pricing">Pricing</a> · <a href="/forge/partners">Verified partners</a> · <a href="/forge/submit">Submit your site</a></nav>`,
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function setAttr(html, re, value, label) {
  if (!re.test(html)) throw new Error(`route-pages: ${label} introuvable dans index.html`);
  return html.replace(re, (_m, a, b) => `${a}${value}${b}`);
}

export function renderRoute(indexHtml, page) {
  const url = `${ORIGIN}/${page.route}`;
  let html = indexHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = setAttr(html, /(<link rel="canonical" href=")[^"]*(")/, url, "canonical");
  html = setAttr(html, /(<meta name="description" content=")[^"]*(")/, esc(page.description), "description");
  html = setAttr(html, /(<meta property="og:title" content=")[^"]*(")/, esc(page.title), "og:title");
  html = setAttr(html, /(<meta property="og:description" content=")[^"]*(")/, esc(page.description), "og:description");
  html = setAttr(html, /(<meta property="og:url" content=")[^"]*(")/, url, "og:url");
  html = setAttr(html, /(<meta name="twitter:title" content=")[^"]*(")/, esc(page.title), "twitter:title");
  html = setAttr(html, /(<meta name="twitter:description" content=")[^"]*(")/, esc(page.description), "twitter:description");
  html = html.replace(
    /("@type": "BreadcrumbList",\s*"itemListElement": \[)[\s\S]*?(\])/,
    `$1\n        {"@type": "ListItem", "position": 1, "name": "NOXEL FORGE", "item": "${ORIGIN}/forge"},\n        {"@type": "ListItem", "position": 2, "name": "${page.crumb}", "item": "${url}"}\n      $2`
  );
  // La FAQ de l'accueil ne décrit pas cette page : JSON-LD et section retirés.
  html = html.replace(/\s*<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "FAQPage"[\s\S]*?<\/script>/, "");
  const fallbackRe = /(<div id="root">\s*<div [^>]*>)[\s\S]*?(<\/div>\s*<\/div>\s*(?:<script type="module"|<\/body>))/;
  if (!fallbackRe.test(html)) throw new Error("route-pages: texte de secours introuvable");
  html = html.replace(fallbackRe, `$1${page.body}\n      $2`);
  return html;
}

export function writeRoutePages(dist) {
  const indexHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  for (const page of ROUTE_PAGES) {
    const out = path.join(dist, `${page.route}.html`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, renderRoute(indexHtml, page));
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
  writeRoutePages(dist);
  console.log(`route-pages : ${ROUTE_PAGES.map((p) => `/${p.route}`).join(", ")} écrites dans dist/`);
}
