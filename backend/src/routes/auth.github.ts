import { Router, type Request, type Response } from "express";
import crypto from "crypto";
import { upsertUser } from "../services/userStore";
import { createSession } from "../services/session";

const router = Router();
const COOKIE_NAME = process.env.FORGE_SESSION_COOKIE_NAME || "forge_session";
const IS_PROD = process.env.NODE_ENV === "production";
const FRONTEND_URL = IS_PROD ? (process.env.FRONTEND_URL || "https://noxelforge.com") : "http://localhost:5173";

const COOKIE_OPTS = IS_PROD
  ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
  : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 };

async function readJsonSafe(res: globalThis.Response) {
  const raw = await res.text();
  try { return JSON.parse(raw); } catch { return { raw }; }
}

router.get("/github/start", (req: Request, res: Response) => {
  try {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) return res.status(500).json({ ok: false, error: "Missing GITHUB_CLIENT_ID" });

    const state = crypto.randomBytes(24).toString("hex");
    res.cookie("gh_oauth_state", state, IS_PROD
      ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 10 * 60 * 1000 }
      : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 10 * 60 * 1000 });

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: process.env.GITHUB_REDIRECT_URI || "https://api.noxelforge.com/api/auth/github/callback",
      scope: "user:email read:user",
      state,
    });

    return res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
});

router.get("/github/callback", async (req: Request, res: Response) => {
  try {
    const code = String(req.query.code || "");
    const returnedState = String(req.query.state || "");
    const savedState = String((req as any).cookies?.gh_oauth_state || "");
    const errorParam = String(req.query.error || "");

    if (errorParam) return res.redirect(`${FRONTEND_URL}/forge?auth_error=github_cancelled`);
    if (!code) return res.redirect(`${FRONTEND_URL}/forge?auth_error=missing_code`);
    if (!returnedState || returnedState !== savedState) return res.redirect(`${FRONTEND_URL}/forge?auth_error=invalid_state`);

    res.clearCookie("gh_oauth_state");

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    if (!clientId || !clientSecret) return res.redirect(`${FRONTEND_URL}/forge?auth_error=missing_env`);

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const tokenJson = await readJsonSafe(tokenRes);
    if (!tokenRes.ok || !tokenJson.access_token) return res.redirect(`${FRONTEND_URL}/forge?auth_error=token_failed`);

    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenJson.access_token}`, Accept: "application/json" },
    });
    const userJson = await readJsonSafe(userRes);
    if (!userRes.ok || !userJson.id) return res.redirect(`${FRONTEND_URL}/forge?auth_error=profile_failed`);

    let email = userJson.email || "";
    if (!email) {
      const emailRes = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${tokenJson.access_token}`, Accept: "application/json" },
      });
      const emails = await readJsonSafe(emailRes);
      if (Array.isArray(emails)) {
        const primary = emails.find((e: any) => e.primary && e.verified);
        email = primary?.email || emails[0]?.email || `gh_${userJson.id}@noxelforge.local`;
      }
    }

    const name = userJson.name || userJson.login || "GitHub User";
    const avatarUrl = userJson.avatar_url || null;

    const user = await upsertUser(email, name, String(userJson.id), "github", avatarUrl);
    const session = createSession(user.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);

    return res.redirect(`${FRONTEND_URL}/forge?auth_success=github`);
  } catch (error) {
    console.error("[auth/github/callback]", error);
    return res.redirect(`${FRONTEND_URL}/forge?auth_error=server_error`);
  }
});

export default router;
