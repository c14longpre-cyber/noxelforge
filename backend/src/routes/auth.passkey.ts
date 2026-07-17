import { Router, type Request, type Response } from "express";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { getSupabase } from "../lib/supabaseClient";
import { upsertUser, findUserById } from "../services/userStore";
import { createSession } from "../services/session";

const router = Router();
const COOKIE_NAME = process.env.FORGE_SESSION_COOKIE_NAME || "forge_session";
const IS_PROD = process.env.NODE_ENV === "production";
const RP_NAME = "NOXEL Forge";
const RP_ID = IS_PROD ? "noxelforge.com" : "localhost";
const ORIGIN = IS_PROD ? ["https://noxelforge.com", "https://www.noxelforge.com"] : ["http://localhost:5173"];

const COOKIE_OPTS = IS_PROD
  ? { httpOnly: true, sameSite: "none" as const, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }
  : { httpOnly: true, sameSite: "lax" as const, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 };

router.post("/register/start", async (req: Request, res: Response) => {
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
    await supabase.from("passkey_challenges").insert({
      challenge: options.challenge,
      user_id: email,
      type: "registration",
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    });

    return res.json({ ok: true, options: options });
  } catch (err: any) {
    console.error("[passkey/register/start]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.post("/register/finish", async (req: Request, res: Response) => {
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
      .single();

    const challengeRow = challengeResult.data;
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

    await supabase.from("passkey_challenges").delete().eq("id", challengeRow.id);

    const user = await upsertUser(email, name || email.split("@")[0], email, "passkey", null);

    await supabase.from("passkeys").insert({
      user_id: user.id,
      credential_id: cred.id,
      public_key: Buffer.from(cred.publicKey).toString("base64"),
      counter: cred.counter,
      device_type: verification.registrationInfo.credentialDeviceType,
      backed_up: verification.registrationInfo.credentialBackedUp,
      transports: credential.response?.transports || [],
    });

    const session = createSession(user.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);
    return res.json({ ok: true, user: user });
  } catch (err: any) {
    console.error("[passkey/register/finish]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

router.post("/login/start", async (req: Request, res: Response) => {
  try {
    const options = await generateAuthenticationOptions({ rpID: RP_ID, userVerification: "preferred" });

    const supabase = getSupabase();
    await supabase.from("passkey_challenges").insert({
      challenge: options.challenge,
      type: "authentication",
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    });

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
      .single();

    const passkey = passkeyResult.data;
    if (!passkey) return res.status(400).json({ ok: false, error: "Passkey not found" });

    const challengeResult = await supabase
      .from("passkey_challenges")
      .select("*")
      .eq("type", "authentication")
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const challengeRow = challengeResult.data;
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

    await supabase
      .from("passkeys")
      .update({ counter: verification.authenticationInfo.newCounter, last_used_at: new Date().toISOString() })
      .eq("credential_id", credential.id);

    await supabase.from("passkey_challenges").delete().eq("id", challengeRow.id);

    const user = await findUserById(passkey.user_id);
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });

    const session = createSession(user.id);
    res.cookie(COOKIE_NAME, session, COOKIE_OPTS);
    return res.json({ ok: true, user: user });
  } catch (err: any) {
    console.error("[passkey/login/finish]", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;
