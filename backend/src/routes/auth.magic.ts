import { Router, type Request, type Response } from "express";
import crypto from "crypto";
import { getSupabase } from "../lib/supabaseClient";
import { connecterOuCreer, EmailDejaUtilise } from "../services/userStore";
import { emailIpLimiter, emailRecipientLimiter } from "../middleware/authLimiter";
import { createSession } from "../services/session";
import { sendMagicLinkEmail } from "../services/emailService";
import { must } from "../lib/supabaseCheck";

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

router.post("/request", emailIpLimiter, emailRecipientLimiter, async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email?: string };
    if (!email || !email.includes("@")) {
      return res.status(400).json({ ok: false, error: "Valid email required" });
    }

    const supabase = getSupabase();
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    must(await supabase.from("magic_links").insert({
      email: email.toLowerCase(),
      token: token,
      expires_at: expiresAt.toISOString(),
    }), "magic_links insert");

    const magicUrl = BACKEND_URL + "/api/auth/magic/verify?token=" + token;
    const emailSent = await sendMagicLinkEmail(email, magicUrl);

    if (!emailSent) {
      return res.status(500).json({ ok: false, error: "Failed to send magic link email. Please try again later or use another sign-in method." });
    }

    return res.json({ ok: true, message: "Magic link sent" });
  } catch (err: any) {
    console.error("[magic/request]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.get("/verify", async (req: Request, res: Response) => {
  const token = String(req.query.token || "");
  if (!token) return res.redirect(FRONTEND_URL + "/forge?auth_error=missing_token");

  try {
    const supabase = getSupabase();
    const result = await supabase
      .from("magic_links")
      .select("*")
      .eq("token", token)
      .is("used_at", null)
      .maybeSingle();

    // A database error goes to the catch (server_error), not to "invalid token"
    const link = must(result, "magic_links select");

    if (!link) return res.redirect(FRONTEND_URL + "/forge?auth_error=invalid_token");
    if (new Date(link.expires_at) < new Date()) return res.redirect(FRONTEND_URL + "/forge?auth_error=token_expired");

    must(await supabase.from("magic_links").update({ used_at: new Date().toISOString() }).eq("token", token), 'magic_links update');

    const name = link.email.split("@")[0];
    // The link proves the address: it may sign in to the existing account of that e-mail
    const user = await connecterOuCreer({ email: link.email, name, provider: "email", providerId: link.email, emailVerified: true });
    const session = createSession(user.id);

    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);
    return res.redirect(FRONTEND_URL + "/forge?auth_success=magic");
  } catch (err: any) {
    if (err instanceof EmailDejaUtilise) return res.redirect(FRONTEND_URL + "/forge?auth_error=email_in_use");
    console.error("[magic/verify]", err);
    return res.redirect(FRONTEND_URL + "/forge?auth_error=server_error");
  }
});

export default router;

