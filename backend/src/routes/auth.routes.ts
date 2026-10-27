import { Router, type Request, type Response } from "express";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import { createSession, verifySession, signerJeton, verifierJeton } from "../services/session";
import { connecterOuCreer, findUserById, findUserByEmail, findUserByProvider, toPublicUser, EmailDejaUtilise } from "../services/userStore";
import { sendSignupConfirmationEmail } from "../services/emailService";
import { authLimiter, emailIpLimiter, emailRecipientLimiter } from "../middleware/authLimiter";

const router = Router();
const COOKIE_NAME = process.env.FORGE_SESSION_COOKIE_NAME || "forge_session";
const IS_PROD = process.env.NODE_ENV === "production";

const FRONTEND_URL = IS_PROD ? (process.env.FRONTEND_URL || "https://noxelforge.com") : "http://localhost:5173";
const BACKEND_URL = IS_PROD
  ? (process.env.BACKEND_PUBLIC_URL || "https://api.noxelforge.com")
  : ("http://localhost:" + (process.env.PORT || 3001));

const COOKIE_OPTS = IS_PROD
  ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
  : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 };

router.post("/google", async (req: Request, res: Response) => {
  try {
    const { token } = req.body as { token?: string };
    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    if (!clientId) return res.status(500).json({ ok: false, error: "Missing GOOGLE_CLIENT_ID" });
    if (!token) return res.status(400).json({ ok: false, error: "Missing Google token" });

    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({ idToken: token, audience: clientId });
    const payload = ticket.getPayload();
    if (!payload) return res.status(401).json({ ok: false, error: "Invalid Google token" });

    const email = payload.email || "";
    const name = payload.name || "";
    const googleId = payload.sub || "";
    const avatarUrl = payload.picture || null;
    if (!email || !googleId) return res.status(401).json({ ok: false, error: "Incomplete Google payload" });

    // Google vouches for the address only when email_verified is true
    const user = await connecterOuCreer({ email, name, providerId: googleId, provider: "google", avatarUrl, emailVerified: payload.email_verified === true });
    const session = createSession(user.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);
    return res.json({ ok: true, user: toPublicUser(user) });
  } catch (error) {
    if (error instanceof EmailDejaUtilise) return res.status(409).json({ ok: false, code: "email_in_use", error: error.message });
    console.error("[auth/google]", error);
    return res.status(500).json({ ok: false, error: "Google authentication failed" });
  }
});

router.get("/me", async (req: Request, res: Response) => {
  try {
    const sessionId = req.cookies?.[COOKIE_NAME];
    if (!sessionId) return res.status(401).json({ ok: false, error: "No session" });

    const payload = verifySession(sessionId);
    if (!payload) return res.status(401).json({ ok: false, error: "Invalid session" });

    const user = await findUserById(payload.userId);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });

    return res.json({ ok: true, user: toPublicUser(user) });
  } catch (error) {
    console.error("[auth/me]", error);
    return res.status(500).json({ ok: false, error: "Session error" });
  }
});

router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, IS_PROD ? { sameSite: "none", secure: true } : {});
  return res.json({ ok: true });
});

// POST /api/auth/register — the account is created only when the link e-mailed to the address is opened
// (the old route created it at once, and attached the session to the existing account of that e-mail).
// The password hash travels in a signed, 24-hour token: nothing is stored before the confirmation.
router.post("/register", authLimiter, emailIpLimiter, emailRecipientLimiter, async (req: Request, res: Response) => {
  try {
    const { email: rawEmail, password, name, lang } = req.body as { email?: string; password?: string; name?: string; lang?: string };
    const email = String(rawEmail ?? "").trim().toLowerCase();
    if (!email || !email.includes("@") || !password) return res.status(400).json({ ok: false, error: "Email and password required" });
    if (password.length < 6) return res.status(400).json({ ok: false, error: "Password must be at least 6 characters" });
    if (password.length > 200) return res.status(400).json({ ok: false, error: "Password too long" });

    if (await findUserByEmail(email)) {
      return res.status(409).json({ ok: false, code: "email_in_use", error: "An account already exists for this email. Please sign in instead." });
    }
    const hash = await bcrypt.hash(password, 12);
    const token = signerJeton({ email, name: (name || "").slice(0, 80), kind: "password", ph: hash }, "signup", "24h");
    const sent = await sendSignupConfirmationEmail(email, `${BACKEND_URL}/api/auth/register/verify?token=${encodeURIComponent(token)}`, lang || "en");
    if (!sent) return res.status(500).json({ ok: false, error: "Could not send the confirmation e-mail. Please try again later." });
    return res.json({ ok: true, pending: true, message: "Check your inbox: open the link we sent to create your account." });
  } catch (err: any) {
    console.error("[auth/register]", err?.message ?? err);
    return res.status(500).json({ ok: false, error: "Registration failed" });
  }
});

// GET /api/auth/register/verify?token= — creates the confirmed account and opens the session
router.get("/register/verify", async (req: Request, res: Response) => {
  const t = verifierJeton<{ email: string; name: string; kind: string; ph: string }>(String(req.query.token || ""), "signup");
  if (!t || t.kind !== "password") return res.redirect(FRONTEND_URL + "/forge?auth_error=invalid_token");
  try {
    // Opened twice (or pre-opened by a mail scanner): the account made from THIS token signs in again
    const deja = await findUserByProvider(t.ph, "email");
    const user = deja ?? await connecterOuCreer({ email: t.email, name: t.name, provider: "email", providerId: t.ph, emailVerified: false });
    res.cookie(COOKIE_NAME, createSession(user.id), COOKIE_OPTS);
    return res.redirect(FRONTEND_URL + "/forge/dashboard?auth_success=register");
  } catch (err) {
    if (err instanceof EmailDejaUtilise) return res.redirect(FRONTEND_URL + "/forge?auth_error=email_in_use");
    console.error("[auth/register/verify]", err);
    return res.redirect(FRONTEND_URL + "/forge?auth_error=server_error");
  }
});

router.post("/login", authLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ ok: false, error: "Email and password required" });

    const found = await findUserByEmail(email);
    if (!found) return res.status(401).json({ ok: false, error: "Invalid email or password" });
    if (found.provider !== "email") return res.status(401).json({ ok: false, error: "This account uses " + found.provider + " login" });

    const valid = await bcrypt.compare(password, found.password_hash || "");
    if (!valid) return res.status(401).json({ ok: false, error: "Invalid email or password" });

    const session = createSession(found.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);
    return res.json({ ok: true, user: toPublicUser(found) });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
