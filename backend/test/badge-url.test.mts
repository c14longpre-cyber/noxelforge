// The badge check must open the member's site even when the address was typed without https://
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

process.env.FORGE_JWT_SECRET ??= "test-secret";
process.env.ANTHROPIC_API_KEY ??= "test";
const require = createRequire(import.meta.url);
const badgeChecker = require("../dist/services/forge/badgeChecker.service.js");

test("urlAVerifier adds https:// to a bare domain and keeps a full URL", () => {
  assert.equal(badgeChecker.urlAVerifier("noxelseo.com"), "https://noxelseo.com");
  assert.equal(badgeChecker.urlAVerifier(" www.example.ca/ "), "https://www.example.ca/");
  assert.equal(badgeChecker.urlAVerifier("https://example.com/page"), "https://example.com/page");
  assert.equal(badgeChecker.urlAVerifier("http://example.com"), "http://example.com");
});

test("verifierBadgeSurSite fetches https://<domain> when given a bare domain", async () => {
  const seen: string[] = [];
  const original = badgeChecker.badgeDeps.fetch;
  badgeChecker.badgeDeps.fetch = async (u: string) => {
    seen.push(String(u));
    return new Response('<a href="https://www.noxelseo.com/clients?domain=x">badge</a>', { status: 200 });
  };
  try {
    assert.equal(await badgeChecker.verifierBadgeSurSite("noxelseo.com"), true);
    assert.deepEqual(seen, ["https://noxelseo.com"]);
  } finally {
    badgeChecker.badgeDeps.fetch = original;
  }
});
