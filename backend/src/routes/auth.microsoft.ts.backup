import { Router, type Request, type Response } from "express";
import crypto from "crypto";
import { upsertUser } from "../services/userStore";
import { createSession } from "../services/session";

const router = Router();
const COOKIE_NAME = process.env.FORGE_SESSION_COOKIE_NAME || "forge_session";
const IS_PROD = process.env.NODE_ENV === "production";
const FRONTEND_URL = IS_PROD ? (process.env.FRONTEND_URL || "https://noxelforge.com") : "http://localhost:5173";
const BACKEND_URL = IS_PROD
  ? (process.env.BACKEND_PUBLIC_URL || "https://noxelforge-production.up.railway.app")
  : ("http://localhost:" + (process.env.PORT || 3001));

const COOKIE_OPTS = IS_PROD
  ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
  : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 };

const REDIRECT_URI = BACKEND_URL + "/api/auth/microsoft/callback";

async function readJsonSafe(res: globalThis.Response) {
  const raw = await res.text();
  try { return JSON.parse(raw); } catch { return { raw: raw }; }
}

router.get("/microsoft/start", (req: Request, res: Response) => {
  try {
    const clientId = process.env.MICROSOFT_CLIENT_ID;
    if (!clientId) return res.status(500).json({ ok: false, error: "Missing MICROSOFT_CLIENT_ID" });

    const state = crypto.randomBytes(24).toString("hex");
    res.cookie("ms_oauth_state", state, IS_PROD
      ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 10 * 60 * 1000 }
      : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 10 * 60 * 1000 });

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: REDIRECT_URI,
      scope: "openid profile email User.Read",
      state: state,
      response_mode: "query",
    });

    return res.redirect("https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" + params.toString());
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
});

router.get("/microsoft/callback", async (req: Request, res: Response) => {
  try {
    const code = String(req.query.code || "");
    const returnedState = String(req.query.state || "");
    const savedState = String((req as any).cookies?.ms_oauth_state || "");
    const errorParam = String(req.query.error || "");

    if (errorParam) return res.redirect(FRONTEND_URL + "/forge?auth_error=microsoft_cancelled");
    if (!code) return res.redirect(FRONTEND_URL + "/forge?auth_error=missing_code");
    if (!returnedState || returnedState !== savedState) return res.redirect(FRONTEND_URL + "/forge?auth_error=invalid_state");

    res.clearCookie("ms_oauth_state");

    const clientId = process.env.MICROSOFT_CLIENT_ID;
    const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
    if (!clientId || !clientSecret) return res.redirect(FRONTEND_URL + "/forge?auth_error=missing_env");

    const tokenRes = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
    });

    const tokenJson = await readJsonSafe(tokenRes);
    if (!tokenRes.ok || !tokenJson.access_token) {
      console.error("[auth/microsoft/token]", JSON.stringify(tokenJson));
      return res.redirect(FRONTEND_URL + "/forge?auth_error=token_failed");
    }

    const userRes = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: { Authorization: "Bearer " + tokenJson.access_token, Accept: "application/json" },
    });
    const userJson = await readJsonSafe(userRes);
    if (!userRes.ok || !userJson.id) return res.redirect(FRONTEND_URL + "/forge?auth_error=profile_failed");

    const email = userJson.mail || userJson.userPrincipalName || ("ms_" + userJson.id + "@noxelforge.local");
    const name = userJson.displayName || userJson.givenName || "MicrosoftUser";

    const user = await upsertUser(email, name, userJson.id, "microsoft", null);
    const session = createSession(user.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);

    return res.redirect(FRONTEND_URL + "/forge?auth_success=microsoft");
  } catch (error) {
    console.error("[auth/microsoft/callback]", error);
    return res.redirect(FRONTEND_URL + "/forge?auth_error=server_error");
  }
});

export default router;
