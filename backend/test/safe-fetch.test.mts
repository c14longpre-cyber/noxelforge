// Member-supplied URLs never reach private / local addresses — runs against the compiled code
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

process.env.FORGE_JWT_SECRET = "test-secret";
const require = createRequire(import.meta.url);
const { safeFetch, fetchSur, isBlockedFetchError } = require("../dist/lib/safeFetch.js");
const { normaliserDomaine } = require("../dist/services/forge/trustScorePublic.js");
const { recupererTexte } = require("../dist/services/forge/signals/http.js");

test("private, local and metadata addresses are refused before any request", async () => {
  for (const u of ["http://127.0.0.1/", "http://localhost/", "http://169.254.169.254/latest/meta-data/", "http://10.0.0.5/", "http://[::1]/", "http://user:pw@exemple.ca/", "http://exemple.ca:6379/"]) {
    await assert.rejects(safeFetch(u), (e: unknown) => isBlockedFetchError(e), u);
    await assert.rejects(fetchSur(u), (e: unknown) => isBlockedFetchError(e), u);
  }
});

test("the collectors use the safe fetch by default", async () => {
  const r = await recupererTexte("http://169.254.169.254/latest/meta-data/");
  assert.equal(r.ok, false);
});

test("an IP address is not a member site", () => {
  assert.equal(normaliserDomaine("http://169.254.169.254"), null);
  assert.equal(normaliserDomaine("10.0.0.1"), null);
  assert.equal(normaliserDomaine("https://www.Exemple.ca/page"), "exemple.ca");
});
