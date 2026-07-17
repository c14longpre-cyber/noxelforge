import { Router, type Request, type Response } from "express";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import { createSession, verifySession } from "../services/session";
import { upsertUser, findUserById, findUserByEmail } from "../services/userStore";

const router = Router();
const COOKIE_NAME = process.env.FORGE_SESSION_COOKIE_NAME || "forge_session";
const IS_PROD = process.env.NODE_ENV === "production";

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

    const user = await upsertUser(email, name, googleId, "google", avatarUrl);
    const session = createSession(user.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);
    return res.json({ ok: true, user });
  } catch (error) {
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

    return res.json({ ok: true, user });
  } catch (error) {
    console.error("[auth/me]", error);
    return res.status(500).json({ ok: false, error: "Session error" });
  }
});

router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, IS_PROD ? { sameSite: "none", secure: true } : {});
  return res.json({ ok: true });
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body as { email?: string; password?: string; name?: string };
    if (!email || !password) return res.status(400).json({ ok: false, error: "Email and password required" });
    if (password.length < 6) return res.status(400).json({ ok: false, error: "Password must be at least 6 characters" });

    const existing = await findUserByEmail(email);
    if (existing && existing.provider !== "email") {
      return res.status(400).json({ ok: false, error: "This email is already registered with " + existing.provider });
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await upsertUser(email, name || email.split("@")[0], hash, "email", null);
    const session = createSession(user.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);
    return res.json({ ok: true, user });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
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
    return res.json({ ok: true, user: found });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
