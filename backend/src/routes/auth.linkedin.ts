import { Router, type Request, type Response } from "express";
import crypto from "crypto";
import { upsertUser } from "../services/userStore";
import { createSession } from "../services/session";

const router = Router();
const COOKIE_NAME = process.env.FORGE_SESSION_COOKIE_NAME || "forge_session";
const IS_PROD = process.env.NODE_ENV === "production";

const COOKIE_OPTS = IS_PROD
  ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
  : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 };

function getFrontendUrl() {
  return IS_PROD ? (process.env.FRONTEND_URL || "https://noxelforge.com") : "http://localhost:5173";
}

async function readJsonSafe(res: globalThis.Response) {
  const raw = await res.text();
  try { return JSON.parse(raw); } catch { return { raw }; }
}

function buildLinkedInAuthorizeUrl(state: string) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI?.startsWith("http")
    ? process.env.LINKEDIN_REDIRECT_URI
    : "https://api.noxelforge.com/api/auth/linkedin/callback";
  const scope = process.env.LINKEDIN_SCOPE || "openid profile email";
  if (!clientId) throw new Error("Missing LINKEDIN_CLIENT_ID");
  const params = new URLSearchParams({ response_type: "code", client_id: clientId, redirect_uri: redirectUri!, scope, state });
  return { url: `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}` };
}

function startLinkedInAuth(res: Response) {
  const state = crypto.randomBytes(24).toString("hex");
  const { url } = buildLinkedInAuthorizeUrl(state);
  res.cookie("linkedin_oauth_state", state, IS_PROD
    ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 10 * 60 * 1000 }
    : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 10 * 60 * 1000 });
  return res.redirect(url);
}

router.get("/linkedin/start", (_req, res) => {
  try { return startLinkedInAuth(res); }
  catch (e) { return res.status(500).json({ ok: false, error: String(e) }); }
});

router.get("/linkedin", (_req, res) => {
  try { return startLinkedInAuth(res); }
  catch (e) { return res.status(500).json({ ok: false, error: String(e) }); }
});

router.get("/linkedin/callback", async (req: Request, res: Response) => {
  const frontendUrl = getFrontendUrl();
  try {
    const code = String(req.query.code || "");
    const returnedState = String(req.query.state || "");
    const savedState = String((req as any).cookies?.linkedin_oauth_state || "");
    const errorParam = String(req.query.error || "");

    if (errorParam) return res.redirect(`${frontendUrl}/forge?auth_error=linkedin_cancelled`);
    if (!code) return res.redirect(`${frontendUrl}/forge?auth_error=missing_code`);
    if (!returnedState || returnedState !== savedState) return res.redirect(`${frontendUrl}/forge?auth_error=invalid_state`);

    res.clearCookie("linkedin_oauth_state");

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI?.startsWith("http")
      ? process.env.LINKEDIN_REDIRECT_URI
      : "https://api.noxelforge.com/api/auth/linkedin/callback";

    if (!clientId || !clientSecret || !redirectUri) return res.redirect(`${frontendUrl}/forge?auth_error=missing_env`);

    const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: new URLSearchParams({ grant_type: "authorization_code", code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri }).toString(),
    });

    const tokenJson = await readJsonSafe(tokenRes);
    if (!tokenRes.ok || !tokenJson.access_token) return res.redirect(`${frontendUrl}/forge?auth_error=token_failed`);

    const userRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenJson.access_token}`, Accept: "application/json" },
    });

    const userJson = await readJsonSafe(userRes);
    if (!userRes.ok || !userJson.sub) return res.redirect(`${frontendUrl}/forge?auth_error=profile_failed`);

    const name = userJson.name || [userJson.given_name || "", userJson.family_name || ""].join(" ").trim() || "LinkedIn User";
    const email = userJson.email || "";
    const avatarUrl = userJson.picture || null;

    const user = await upsertUser(email, name, userJson.sub, "linkedin", avatarUrl);
    const session = createSession(user.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);

    return res.redirect(`${frontendUrl}/forge?auth_success=linkedin`);
  } catch (error) {
    console.error("[auth/linkedin/callback]", error);
    return res.redirect(`${frontendUrl}/forge?auth_error=server_error`);
  }
});

export default router;
