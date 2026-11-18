// Alfred: verdict read even when wrapped in prose, model list with a current fallback
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

process.env.FORGE_JWT_SECRET ??= "test-secret";
process.env.ANTHROPIC_API_KEY ??= "test";
const require = createRequire(import.meta.url);
const alfred = require("../dist/services/forge/alfred.forge.service.js");

test("lireVerdict reads plain, fenced and prose-wrapped JSON", () => {
  assert.equal(alfred.lireVerdict('{"verdict":"approuve","score":80}').verdict, "approuve");
  assert.equal(alfred.lireVerdict('```json\n{"verdict":"rejete"}\n```').verdict, "rejete");
  assert.equal(alfred.lireVerdict('Voici mon analyse : {"verdict":"approuve","score":70} Bonne journée.').score, 70);
  assert.throws(() => alfred.lireVerdict("pas de json"));
});

test("modelesAlfred uses ALFRED_MODEL first and keeps a current fallback", () => {
  const before = process.env.ALFRED_MODEL;
  process.env.ALFRED_MODEL = "claude-test-1";
  assert.deepEqual(alfred.modelesAlfred(), ["claude-test-1", "claude-sonnet-5-5"]);
  delete process.env.ALFRED_MODEL;
  assert.equal(alfred.modelesAlfred()[0], "claude-sonnet-4-6");
  if (before !== undefined) process.env.ALFRED_MODEL = before;
});

test("Alfred prompt: a pending Trust Score is shown as pending, never 0", () => {
  const msg = alfred.construireMessageAlfred({
    userId: "u", urlSoumise: "https://exemple.ca/", titre: "Mon outil", niche: "SEO",
    trustScore: null, tierForge: "diamond", ageCompteDays: 0, scanComplete: false, badgeInstalle: false,
  });
  assert.ok(msg.includes("en attente de vérification"));
  assert.ok(!msg.includes("0/100"));
});
