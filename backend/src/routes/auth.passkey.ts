import { Router, type Request, type Response } from "express";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { getSupabase } from "../lib/supabaseClient";
import { connecterOuCreer, findUserById, findUserByEmail, findUserByProvider, toPublicUser, EmailDejaUtilise } from "../services/userStore";
import { verifySession, signerJeton, verifierJeton } from "../services/session";
import { sendSignupConfirmationEmail } from "../services/emailService";
import { authLimiter, emailIpLimiter, emailRecipientLimiter } from "../middleware/authLimiter";
import { createSession } from "../services/session";
import { must } from "../lib/supabaseCheck";

const router = Router();
const COOKIE_NAME = process.env.FORGE_SESSION_COOKIE_NAME || "forge_session";
const IS_PROD = process.env.NODE_ENV === "production";
const RP_NAME = "NOXEL Forge";
const RP_ID = IS_PROD ? "noxelforge.com" : "localhost";
const ORIGIN = IS_PROD ? ["https://noxelforge.com", "https://www.noxelforge.com"] : ["http://localhost:5173"];

const FRONTEND_URL = IS_PROD ? (process.env.FRONTEND_URL || "https://noxelforge.com") : "http://localhost:5173";
const BACKEND_URL = IS_PROD
  ? (process.env.BACKEND_PUBLIC_URL || "https://api.noxelforge.com")
  : ("http://localhost:" + (process.env.PORT || 3001));

type PasskeyNeuve = { id: string; publicKey: string; counter: number; deviceType: string; backedUp: boolean; transports: string[] };

async function enregistrerPasskey(userId: string, p: PasskeyNeuve) {
  must(await getSupabase().from("passkeys").insert({
    user_id: userId, credential_id: p.id, public_key: p.publicKey, counter: p.counter,
    device_type: p.deviceType, backed_up: p.backedUp, transports: p.transports,
  }), "passkeys insert");
}

const COOKIE_OPTS = IS_PROD
  ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
  : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 };

router.post("/register/start", authLimiter, async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body as { email?: string; name?: string };
    if (!email) return res.status(400).json({ ok: false, error: "Email required" });

    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID: RP_ID,
      userName: email,
      userDisplayName: name || email,
      attestationType: "none",
      authenticatorSelection: { residentKey: "preferred", userVerification: "preferred" },
    });

    const supabase = getSupabase();
    must(await supabase.from("passkey_challenges").insert({
      challenge: options.challenge,
      user_id: email,
      type: "registration",
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    }), "passkey_challenges insert");

    return res.json({ ok: true, options: options });
  } catch (err: any) {
    console.error("[passkey/register/start]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.post("/register/finish", authLimiter, emailIpLimiter, emailRecipientLimiter, async (req: Request, res: Response) => {
  try {
    const { email, name, credential } = req.body;
    if (!email || !credential) return res.status(400).json({ ok: false, error: "Missing fields" });

    const supabase = getSupabase();
    const challengeResult = await supabase
      .from("passkey_challenges")
      .select("*")
      .eq("user_id", email)
      .eq("type", "registration")
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const challengeRow = must(challengeResult, "passkey_challenges select");
    if (!challengeRow) return res.status(400).json({ ok: false, error: "Challenge expired or not found" });

    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: challengeRow.challenge,
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
    });

    if (!verification.verified || !verification.registrationInfo) {
      return res.status(400).json({ ok: false, error: "Verification failed" });
    }

    const cred = verification.registrationInfo.credential;

    must(await supabase.from("passkey_challenges").delete().eq("id", challengeRow.id), 'passkey_challenges delete');

    const neuve: PasskeyNeuve = {
      id: cred.id, publicKey: Buffer.from(cred.publicKey).toString("base64"), counter: cred.counter,
      deviceType: verification.registrationInfo.credentialDeviceType, backedUp: verification.registrationInfo.credentialBackedUp,
      transports: credential.response?.transports || [],
    };
    const adresse = String(email).trim().toLowerCase();
    const existant = await findUserByEmail(adresse);

    if (existant) {
      // Adding a passkey to an existing account needs that account's own session: the e-mail alone
      // used to be enough to attach a new passkey to anyone's account and sign in as them
      const session = verifySession((req as any).cookies?.[COOKIE_NAME] ?? "");
      if (session?.userId !== existant.id) {
        return res.status(409).json({ ok: false, code: "email_in_use", error: "An account already exists for this email. Sign in with your usual method first, then add a passkey." });
      }
      await enregistrerPasskey(existant.id, neuve);
      return res.json({ ok: true, user: toPublicUser(existant) });
    }

    // New account: created only once the address is confirmed by the link e-mailed below
    const token = signerJeton({ email: adresse, name: String(name || "").slice(0, 80), kind: "passkey", pk: neuve }, "signup", "24h");
    const sent = await sendSignupConfirmationEmail(adresse, `${BACKEND_URL}/api/auth/passkey/register/verify?token=${encodeURIComponent(token)}`, String(req.body?.lang || "en"));
    if (!sent) return res.status(500).json({ ok: false, error: "Could not send the confirmation e-mail. Please try again later." });
    return res.json({ ok: true, pending: true, message: "Check your inbox: open the link we sent to create your account. Your passkey will work right after." });
  } catch (err: any) {
    console.error("[passkey/register/finish]", err);
    return res.status(500).json({ ok: false, error: "Passkey registration failed" });
  }
});

// GET /api/auth/passkey/register/verify?token= — creates the confirmed account with its passkey
router.get("/register/verify", async (req: Request, res: Response) => {
  const t = verifierJeton<{ email: string; name: string; kind: string; pk: PasskeyNeuve }>(String(req.query.token || ""), "signup");
  if (!t || t.kind !== "passkey" || !t.pk?.id) return res.redirect(FRONTEND_URL + "/forge?auth_error=invalid_token");
  try {
    const supabase = getSupabase();
    const dejaCle = must(await supabase.from("passkeys").select("user_id").eq("credential_id", t.pk.id).maybeSingle(), "passkeys select");
    let user;
    if (dejaCle) {
      // Link opened twice (or by a mail scanner): the account made from this passkey signs in again
      user = await findUserById(dejaCle.user_id);
    } else {
      user = (await findUserByProvider(t.email, "passkey"))
        ?? await connecterOuCreer({ email: t.email, name: t.name, provider: "passkey", providerId: t.email, emailVerified: false });
      await enregistrerPasskey(user.id, t.pk);
    }
    if (!user) return res.redirect(FRONTEND_URL + "/forge?auth_error=server_error");
    res.cookie(COOKIE_NAME, createSession(user.id), COOKIE_OPTS);
    return res.redirect(FRONTEND_URL + "/forge/dashboard?auth_success=passkey");
  } catch (err) {
    if (err instanceof EmailDejaUtilise) return res.redirect(FRONTEND_URL + "/forge?auth_error=email_in_use");
    console.error("[passkey/register/verify]", err);
    return res.redirect(FRONTEND_URL + "/forge?auth_error=server_error");
  }
});

router.post("/login/start", authLimiter, async (req: Request, res: Response) => {
  try {
    const options = await generateAuthenticationOptions({ rpID: RP_ID, userVerification: "preferred" });

    const supabase = getSupabase();
    must(await supabase.from("passkey_challenges").insert({
      challenge: options.challenge,
      type: "authentication",
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    }), "passkey_challenges insert");

    return res.json({ ok: true, options: options });
  } catch (err: any) {
    console.error("[passkey/login/start]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.post("/login/finish", async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ ok: false, error: "Missing credential" });

    const supabase = getSupabase();
    const passkeyResult = await supabase
      .from("passkeys")
      .select("*")
      .eq("credential_id", credential.id)
      .maybeSingle();

    const passkey = must(passkeyResult, "passkeys select");
    if (!passkey) return res.status(400).json({ ok: false, error: "Passkey not found" });

    const challengeResult = await supabase
      .from("passkey_challenges")
      .select("*")
      .eq("type", "authentication")
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const challengeRow = must(challengeResult, "passkey_challenges select");
    if (!challengeRow) return res.status(400).json({ ok: false, error: "Challenge expired" });

    const publicKeyBuffer = Buffer.from(passkey.public_key, "base64");

    const verification = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge: challengeRow.challenge,
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
      credential: {
        id: passkey.credential_id,
        publicKey: new Uint8Array(publicKeyBuffer),
        counter: passkey.counter,
        transports: passkey.transports,
      },
    });

    if (!verification.verified) return res.status(400).json({ ok: false, error: "Verification failed" });

    must(await supabase
      .from("passkeys")
      .update({ counter: verification.authenticationInfo.newCounter, last_used_at: new Date().toISOString() })
      .eq("credential_id", credential.id), "passkeys update");

    must(await supabase.from("passkey_challenges").delete().eq("id", challengeRow.id), 'passkey_challenges delete');

    const user = await findUserById(passkey.user_id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });

    const session = createSession(user.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);
    return res.json({ ok: true, user: toPublicUser(user) });
  } catch (err: any) {
    console.error("[passkey/login/finish]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
