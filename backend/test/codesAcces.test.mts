// Codes d'accès : durée, fin d'offre, refus (logique pure, code compilé)
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const c = require("../dist/lib/codesAcces.js");

test("durée des codes", () => {
  assert.equal(c.joursAcces("1week"), 7);
  assert.equal(c.joursAcces("1month"), 30);
  assert.equal(c.joursAcces("1year"), 365);
  assert.equal(c.joursAcces("lifetime"), null);
});

test("fin d'offre : retour au forfait d'avant, sans fin = jamais", () => {
  const maintenant = new Date("2026-12-20T00:00:00Z");
  assert.equal(c.tierEffectif({ tier: "diamond", tier_expires_at: "2026-12-17T00:00:00Z", tier_after_expiry: "silver" }, maintenant), "silver");
  assert.equal(c.tierEffectif({ tier: "diamond", tier_expires_at: "2026-12-30T00:00:00Z", tier_after_expiry: "silver" }, maintenant), "diamond");
  assert.equal(c.tierEffectif({ tier: "diamond", tier_expires_at: null }, maintenant), "diamond");
  assert.equal(c.tierEffectif({ tier: "diamond", tier_expires_at: "2026-12-17T00:00:00Z", tier_after_expiry: null }, maintenant), "bronze");
});

test("refus : autre site, déjà utilisé, expiré, ne baisse jamais un compte", () => {
  const ok = { product: "forge", tier: "diamond", is_used: false, expires_at: null };
  assert.equal(c.verifierCode(ok, "forge", "bronze"), null);
  assert.equal(c.verifierCode({ ...ok, product: "seo" }, "forge", "bronze"), "invalide");
  assert.equal(c.verifierCode({ ...ok, product: null }, "forge", "bronze"), "invalide");
  assert.equal(c.verifierCode(null, "forge", "bronze"), "invalide");
  assert.equal(c.verifierCode({ ...ok, is_used: true }, "forge", "bronze"), "deja_utilise");
  assert.equal(c.verifierCode({ ...ok, expires_at: "2020-01-01T00:00:00Z" }, "forge", "bronze"), "expire");
  assert.equal(c.verifierCode(ok, "forge", "diamond"), "deja_ce_forfait");
  assert.equal(c.verifierCode({ ...ok, tier: "gold" }, "forge", "platinum"), "deja_ce_forfait");
});

test("format des codes", () => {
  assert.match(c.nouveauCode("NXF"), /^NXF-[0-9A-F]{6}-[0-9A-F]{6}$/);
  assert.equal(c.normaliserCode("  nxf-abc123-def456 "), "NXF-ABC123-DEF456");
});
