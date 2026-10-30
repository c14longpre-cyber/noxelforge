// Proof of domain ownership — runs against the compiled code (npm test builds first)
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

process.env.FORGE_JWT_SECRET = "test-secret";
const require = createRequire(import.meta.url);
const { jetonDomaine, metaContientJeton, verifierPropriete, FICHIER } = require("../dist/services/forge/domainOwnership.js");

const J = jetonDomaine("u1", "exemple.ca");
const page = (body: string, status = 200) => new Response(body, { status, headers: { "content-type": "text/html" } });

test("the token depends on the member and the domain, and cannot be guessed", () => {
  assert.match(J, /^nxf-[0-9a-f]{32}$/);
  assert.notEqual(J, jetonDomaine("u2", "exemple.ca"));
  assert.notEqual(J, jetonDomaine("u1", "autre.ca"));
  assert.equal(J, jetonDomaine("u1", "exemple.ca"));
});

test("the meta tag is read whatever the attribute order", () => {
  assert.ok(metaContientJeton(`<meta name="noxel-forge-verification" content="${J}">`, J));
  assert.ok(metaContientJeton(`<META content='${J}' NAME='noxel-forge-verification' />`, J));
  assert.ok(!metaContientJeton(`<meta name="noxel-forge-verification" content="nxf-other">`, J));
  assert.ok(!metaContientJeton(`<p>noxel-forge-verification ${J}</p>`, J), "plain text is not a proof");
});

test("proof by meta tag, by file, by DNS; nothing → refused with reasons", async () => {
  const noDns = async () => { throw new Error("ENODATA"); };
  const meta = await verifierPropriete("exemple.ca", J, { fetchImpl: (async () => page(`<meta name="noxel-forge-verification" content="${J}">`)) as any, resolveTxt: noDns });
  assert.deepEqual(meta, { ok: true, methode: "meta" });

  const fichier = await verifierPropriete("exemple.ca", J, {
    fetchImpl: (async (u: string) => (String(u).endsWith(FICHIER) ? page(J + "\n") : page("<html></html>"))) as any, resolveTxt: noDns,
  });
  assert.deepEqual(fichier, { ok: true, methode: "fichier" });

  const dnsOk = await verifierPropriete("exemple.ca", J, {
    fetchImpl: (async () => page("", 404)) as any, resolveTxt: async () => [["noxel-forge-verification=", J]],
  });
  assert.deepEqual(dnsOk, { ok: true, methode: "dns" });

  const rien = await verifierPropriete("exemple.ca", J, { fetchImpl: (async () => page("<html></html>")) as any, resolveTxt: noDns });
  assert.equal(rien.ok, false);
  assert.match(rien.raison, /meta/);
});
