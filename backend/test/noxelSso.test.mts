// NOXEL SSO : jeton signé, 60 s, usage unique, un seul site, chemin de retour sûr
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const s = require("../dist/lib/noxelSso.js");
const SECRET = "x".repeat(40);

test("un jeton valide ouvre le site visé, une seule fois", () => {
  const vus = new Map();
  const t = s.signerPassage({ uid: "u1", email: "A@B.ca", de: "seo", vers: "forge" }, SECRET);
  const r = s.verifierPassage(t, "forge", SECRET, vus);
  assert.deepEqual(r, { ok: true, uid: "u1", email: "a@b.ca", de: "seo" });
  assert.deepEqual(s.verifierPassage(t, "forge", SECRET, vus), { ok: false, raison: "deja_utilise" });
});

test("refus : autre site, autre secret, modifié, expiré, déchets", () => {
  const t = s.signerPassage({ uid: "u1", email: "a@b.ca", de: "seo", vers: "forge" }, SECRET, Date.now());
  assert.equal(s.verifierPassage(t, "spectra", SECRET, new Map()).raison, "mauvais_site");
  assert.equal(s.verifierPassage(t, "forge", "y".repeat(40), new Map()).raison, "signature");
  const [corps, sig] = t.split(".");
  const autre = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(corps, "base64url").toString()), uid: "u2" })).toString("base64url");
  assert.equal(s.verifierPassage(`${autre}.${sig}`, "forge", SECRET, new Map()).raison, "signature");
  const vieux = s.signerPassage({ uid: "u1", email: "a@b.ca", de: "seo", vers: "forge" }, SECRET, Date.now() - 120_000);
  assert.equal(s.verifierPassage(vieux, "forge", SECRET, new Map()).raison, "expire");
  for (const x of [undefined, "", "abc", "a.b.c", 42]) assert.equal(s.verifierPassage(x, "forge", SECRET, new Map()).ok, false);
});

test("chemin de retour : jamais vers un autre domaine", () => {
  assert.equal(s.cheminSur("/forge/admin"), "/forge/admin");
  for (const x of ["//evil.com", "https://evil.com", "/\\evil.com", "evil", "", null, "/a\nb"]) assert.equal(s.cheminSur(x, "/d"), "/d");
});

test("page d'arrivée : jeton en nxsso, ancre gardée, sans jeton = simple ouverture", () => {
  assert.equal(s.adresseArrivee("forge", "/forge/dashboard", null, {}), "https://noxelforge.com/forge/dashboard");
  assert.equal(s.adresseArrivee("seo", "/app?x=1#top", "a.b", {}), "https://www.noxelseo.com/app?x=1&nxsso=a.b#top");
  assert.equal(s.adresseArrivee("spectra", "/", "a.b", {}), "https://app.noxelspectra.com/?nxsso=a.b");
});

test("secret : absent ou trop court = pas de passage", () => {
  assert.equal(s.secretSso({}), null);
  assert.equal(s.secretSso({ NOXEL_SSO_SECRET: "court" }), null);
  assert.equal(s.secretSso({ NOXEL_SSO_SECRET: SECRET }), SECRET);
});
