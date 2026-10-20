// Trust Score sources: RDAP (age), sitemap/RSS (frequency), Alfred (content), success and failure cases.
// Every network call goes through a fake fetch: nothing leaves the machine.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { collecterAgeDomaine, candidatsRdap } = require("../dist/services/forge/signals/rdap.js");
const { collecterFrequence, extraireDatesFlux } = require("../dist/services/forge/signals/frequence.js");
const { collecterContenu, extraireTexteVisible, lireQualite } = require("../dist/services/forge/signals/contenu.js");

const NOW = new Date("2026-10-20T12:00:00Z");
const now = () => NOW;

type Route = { status?: number; body?: string; throws?: string };
function fakeFetch(routes: Record<string, Route>) {
  const calls: string[] = [];
  const fn = (async (url: string) => {
    calls.push(String(url));
    const r = routes[String(url)];
    if (!r) return new Response("not found", { status: 404 });
    if (r.throws) throw new Error(r.throws);
    return new Response(r.body ?? "", { status: r.status ?? 200 });
  }) as any;
  return { fn, calls };
}
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86400000).toISOString();

// ─── RDAP ───────────────────────────────────────────────────────────────────
const rdap = (date: string) => JSON.stringify({ events: [{ eventAction: "last changed", eventDate: "2026-01-01T00:00:00Z" }, { eventAction: "registration", eventDate: date }] });

test("RDAP: age in years from the registration event", async () => {
  const { fn } = fakeFetch({ "https://rdap.org/domain/exemple.ca": { body: rdap("2016-10-20T12:00:00Z") } });
  const s = await collecterAgeDomaine("exemple.ca", { fetchImpl: fn, now });
  assert.equal(s.source, "rdap");
  assert.ok(Math.abs(s.valeur - 10) < 0.01, `valeur ${s.valeur}`);
  assert.equal(s.collecte_at, NOW.toISOString());
  assert.equal(s.raison, undefined);
});

test("RDAP: a subdomain unknown to the registry falls back to the registered domain", async () => {
  assert.deepEqual(candidatsRdap("blog.exemple.ca"), ["blog.exemple.ca", "exemple.ca"]);
  const { fn, calls } = fakeFetch({ "https://rdap.org/domain/exemple.ca": { body: rdap("2020-10-20T12:00:00Z") } });
  const s = await collecterAgeDomaine("blog.exemple.ca", { fetchImpl: fn, now });
  assert.ok(Math.abs(s.valeur - 6) < 0.01);
  assert.equal(calls.length, 2);
});

test("RDAP failures: value null with a reason, never an invented age", async () => {
  const cas: [Record<string, Route>, RegExp][] = [
    [{}, /inconnu/],
    [{ "https://rdap.org/domain/exemple.ca": { status: 503 } }, /HTTP 503/],
    [{ "https://rdap.org/domain/exemple.ca": { throws: "ECONNRESET" } }, /Inaccessible/],
    [{ "https://rdap.org/domain/exemple.ca": { body: "<html>" } }, /illisible/],
    [{ "https://rdap.org/domain/exemple.ca": { body: JSON.stringify({ events: [] }) } }, /date d'enregistrement/],
  ];
  for (const [routes, re] of cas) {
    const s = await collecterAgeDomaine("exemple.ca", { fetchImpl: fakeFetch(routes).fn, now });
    assert.equal(s.valeur, null);
    assert.equal(s.source, "rdap");
    assert.match(s.raison, re);
  }
});

// ─── Frequency: sitemap.xml, then RSS ───────────────────────────────────────
const sitemap = (dates: string[]) => `<?xml version="1.0"?><urlset>${dates.map((d, i) => `<url><loc>https://exemple.ca/p${i}</loc><lastmod>${d}</lastmod></url>`).join("")}</urlset>`;

test("frequency: sitemap lastmod dates in the last 90 days, per month", async () => {
  const dates = [daysAgo(1), daysAgo(10), daysAgo(40), daysAgo(80), daysAgo(89), daysAgo(200)]; // 5 recent
  const { fn } = fakeFetch({ "https://exemple.ca/sitemap.xml": { body: sitemap(dates) } });
  const s = await collecterFrequence("exemple.ca", { fetchImpl: fn, now });
  assert.equal(s.source, "sitemap");
  assert.equal(s.valeur, 1.67); // 5 posts / 3 months
});

test("frequency: a sitemap index is followed on the member's host only", async () => {
  const index = `<sitemapindex><sitemap><loc>https://www.exemple.ca/posts.xml</loc></sitemap><sitemap><loc>https://ailleurs.com/x.xml</loc></sitemap></sitemapindex>`;
  const { fn, calls } = fakeFetch({
    "https://exemple.ca/sitemap.xml": { body: index },
    "https://www.exemple.ca/posts.xml": { body: sitemap([daysAgo(2), daysAgo(3), daysAgo(4)]) },
  });
  const s = await collecterFrequence("exemple.ca", { fetchImpl: fn, now });
  assert.equal(s.valeur, 1);
  assert.ok(!calls.includes("https://ailleurs.com/x.xml"), "foreign host never fetched");
});

test("frequency: no dated sitemap -> RSS feed, source rss", async () => {
  const rss = `<rss><channel><item><pubDate>${new Date(daysAgo(5)).toUTCString()}</pubDate></item><item><pubDate>${new Date(daysAgo(20)).toUTCString()}</pubDate></item><item><pubDate>${new Date(daysAgo(60)).toUTCString()}</pubDate></item></channel></rss>`;
  const { fn } = fakeFetch({
    "https://exemple.ca/sitemap.xml": { body: "<urlset><url><loc>https://exemple.ca/</loc></url></urlset>" },
    "https://exemple.ca/rss.xml": { body: rss },
  });
  const s = await collecterFrequence("exemple.ca", { fetchImpl: fn, now });
  assert.equal(s.source, "rss");
  assert.equal(s.valeur, 1);
});

test("frequency: Atom entries count, not the feed's own <updated>", () => {
  const atom = `<feed><updated>${daysAgo(0)}</updated><entry><updated>${daysAgo(3)}</updated></entry></feed>`;
  assert.equal(extraireDatesFlux(atom).length, 1);
});

test("frequency: neither sitemap nor feed -> null with both reasons", async () => {
  const s = await collecterFrequence("exemple.ca", { fetchImpl: fakeFetch({}).fn, now });
  assert.equal(s.valeur, null);
  assert.match(s.raison, /sitemap\.xml HTTP 404/);
  assert.match(s.raison, /aucun flux RSS\/Atom/);
});

// ─── Content: Alfred ────────────────────────────────────────────────────────
const longText = "Guide complet du plein air au Québec. ".repeat(20);
const page = `<html><head><style>.x{}</style><script>var a="donne 100"</script></head><body><h1>Titre</h1><p>${longText}</p></body></html>`;

test("content: visible text only (no script/style), then Alfred's 0-100 rating", async () => {
  assert.ok(!extraireTexteVisible(page).includes("donne 100"));
  let vu = "";
  const s = await collecterContenu("exemple.ca", {
    fetchImpl: fakeFetch({ "https://exemple.ca/": { body: page } }).fn, now,
    evaluer: async (texte: string) => { vu = texte; return 72; },
  });
  assert.deepEqual(s, { valeur: 72, source: "alfred", collecte_at: NOW.toISOString() });
  assert.ok(vu.startsWith("Titre Guide complet"));
});

test("content failures: unreachable page, too little text, Alfred error -> null with a reason", async () => {
  const jamais = async () => { throw new Error("must not be called"); };
  let s = await collecterContenu("exemple.ca", { fetchImpl: fakeFetch({}).fn, now, evaluer: jamais });
  assert.equal(s.valeur, null); assert.match(s.raison, /HTTP 404/);
  s = await collecterContenu("exemple.ca", { fetchImpl: fakeFetch({ "https://exemple.ca/": { body: "<p>Bonjour</p>" } }).fn, now, evaluer: jamais });
  assert.equal(s.valeur, null); assert.match(s.raison, /Pas assez de texte/);
  s = await collecterContenu("exemple.ca", { fetchImpl: fakeFetch({ "https://exemple.ca/": { body: page } }).fn, now, evaluer: async () => { throw new Error("overloaded"); } });
  assert.equal(s.valeur, null); assert.match(s.raison, /Alfred indisponible \(overloaded\)/);
});

test("content: Alfred's answer must be a number in [0, 100], otherwise it is refused", () => {
  assert.equal(lireQualite('{"qualite": 64, "raison": "ok"}'), 64);
  assert.equal(lireQualite('```json\n{"qualite": 80.4}\n```'), 80);
  for (const bad of ['{"qualite": 140}', '{"qualite": -1}', '{"qualite": "90"}', '{}', "pas du json"])
    assert.throws(() => lireQualite(bad), undefined, bad);
});
