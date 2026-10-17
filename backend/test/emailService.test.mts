// Magic link email: sender from EMAIL_FROM, clean failure without RESEND_API_KEY — run with: npm test
// emailService reads its env when it loads, so each case runs in its own Node process
// (compiled dist, Resend replaced by a fake that records what it is asked to send).
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const backend = fileURLToPath(new URL("..", import.meta.url));

const script = `
  const resend = require("resend");
  const sent = [];
  resend.Resend = class { constructor(key) { this.emails = { send: async (msg) => { sent.push({ key, from: msg.from, to: msg.to }); return { data: { id: "em_1" }, error: null }; } }; } };
  const { sendMagicLinkEmail } = require("./dist/services/emailService.js");
  (async () => {
    const ok1 = await sendMagicLinkEmail("a@test", "https://x/verify?token=1");
    const ok2 = await sendMagicLinkEmail("b@test", "https://x/verify?token=2");
    console.log("RESULT " + JSON.stringify({ ok1, ok2, sent }));
  })();
`;

function run(env: Record<string, string | undefined>) {
  const cleanEnv = { ...process.env };
  delete cleanEnv.RESEND_API_KEY;
  delete cleanEnv.EMAIL_FROM;
  const r = spawnSync(process.execPath, ["-e", script], { cwd: backend, env: { ...cleanEnv, ...env }, encoding: "utf8" });
  const line = r.stdout.split("\n").find((l) => l.startsWith("RESULT "));
  assert.ok(line, `no result, stderr: ${r.stderr}`);
  return { result: JSON.parse(line.slice(7)), stderr: r.stderr };
}

test("without RESEND_API_KEY: one startup warning, sends fail cleanly (false), Resend never called", () => {
  const { result, stderr } = run({});
  assert.equal(result.ok1, false);
  assert.equal(result.ok2, false);
  assert.deepEqual(result.sent, []);
  assert.equal(stderr.split("RESEND_API_KEY is not set: magic link emails are disabled").length - 1, 1, "warned once");
  assert.ok(!stderr.includes("Missing API key"), "no Resend constructor crash");
});

test("default sender is NOXEL Forge <noreply@noxelseo.com>", () => {
  const { result } = run({ RESEND_API_KEY: "re_test" });
  assert.equal(result.ok1, true);
  assert.deepEqual(result.sent[0], { key: "re_test", from: "NOXEL Forge <noreply@noxelseo.com>", to: "a@test" });
});

test("EMAIL_FROM overrides the sender", () => {
  const { result } = run({ RESEND_API_KEY: "re_test", EMAIL_FROM: "NOXEL Forge <hello@noxelforge.com>" });
  assert.equal(result.sent[0].from, "NOXEL Forge <hello@noxelforge.com>");
});
