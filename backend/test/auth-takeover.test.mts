// Sign-in never hands over someone else's account — runs against the compiled code (npm test builds first)
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

process.env.FORGE_JWT_SECRET = "test-secret";

const require = createRequire(import.meta.url);
const { deciderConnexion } = require("../dist/services/userStore.js");
const { signerJeton, verifierJeton, verifySession, createSession } = require("../dist/services/session.js");

const compte = (provider: string) => ({ id: "u1", email: "victime@exemple.ca", name: "V", avatarUrl: null, provider, providerId: "x", tier: "bronze", createdAt: "" });

test("an unverified e-mail never opens an existing account (passkey, password, Microsoft)", () => {
  for (const p of ["google", "email", "passkey", "github", "microsoft"]) {
    assert.deepEqual(deciderConnexion({ emailVerified: false }, null, compte(p)), { action: "refuser", provider: p });
  }
});

test("a verified e-mail signs in to a proven account, never to a Microsoft one", () => {
  assert.equal(deciderConnexion({ emailVerified: true }, null, compte("google")).action, "existant");
  assert.equal(deciderConnexion({ emailVerified: true }, null, compte("email")).action, "existant");
  assert.deepEqual(deciderConnexion({ emailVerified: true }, null, compte("microsoft")), { action: "refuser", provider: "microsoft" });
});

test("the same provider account signs in; a new e-mail creates an account", () => {
  assert.equal(deciderConnexion({ emailVerified: false }, compte("microsoft"), null).action, "existant");
  assert.equal(deciderConnexion({ emailVerified: false }, null, null).action, "creer");
});

test("a sign-up confirmation token is never accepted as a session, and keeps its purpose", () => {
  const t = signerJeton({ email: "a@b.ca", kind: "password", ph: "h" }, "signup", "1h");
  assert.equal(verifySession(t), null);
  assert.equal(verifierJeton(t, "signup")?.email, "a@b.ca");
  assert.equal(verifierJeton(t, "other"), null);
  assert.equal(verifierJeton(createSession("u1"), "signup"), null);
  assert.equal(verifySession(createSession("u1"))?.userId, "u1");
});
