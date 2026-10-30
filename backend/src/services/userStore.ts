// NOXEL Forge — User Store (shared public.users table with NOXEL SEO)
import { getSupabase } from "../lib/supabaseClient";
import { must } from "../lib/supabaseCheck";

export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  provider: string;
  providerId: string;
  tier: string;
  createdAt: string;
  password_hash?: string;
};

function toUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    avatarUrl: row.avatar_url ?? null,
    provider: row.provider,
    providerId: row.provider_id,
    tier: row.tier ?? "bronze",
    createdAt: row.created_at,
    password_hash: row.provider_id,
  };
}

export type PublicUser = Omit<User, "password_hash" | "providerId">;

// Ce qui peut partir vers le navigateur : jamais le hash du mot de passe ni provider_id
// (qui contient ce hash pour les comptes courriel).
export function toPublicUser(user: User): PublicUser {
  const { password_hash: _hash, providerId: _providerId, ...rest } = user;
  return rest;
}

export async function findUserById(id: string): Promise<User | null> {
  const supabase = getSupabase();
  const data = must(await supabase.from("users").select("*").eq("id", id).maybeSingle(), 'users select');
  return data ? toUser(data) : null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const supabase = getSupabase();
  const data = must(await supabase
    .from("users")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle(), "users select");
  return data ? toUser(data) : null;
}

export async function findUserByProvider(providerId: string, provider = "google"): Promise<User | null> {
  const supabase = getSupabase();
  const data = must(await supabase
    .from("users")
    .select("*")
    .eq("provider", provider)
    .eq("provider_id", providerId)
    .maybeSingle(), "users select");
  return data ? toUser(data) : null;
}

// ─── Sign-in: find or create the account of a login ─────────────────────────
// public.users is shared with NOXEL SEO. A login is attached to an EXISTING account only when the
// provider vouches for the e-mail (emailVerified) and that account was itself created with a proven
// e-mail. The former upsertUser handed back the account of any e-mail as soon as the insert collided
// on it, so registering a passkey (or a password, or a Microsoft account) with someone else's e-mail
// opened a session on their account.

export class EmailDejaUtilise extends Error {
  constructor(public provider: string) {
    super(`An account already exists for this e-mail (sign-in method: ${provider}).`);
  }
}

// Accounts whose e-mail was proven when they were created (Google, confirmed e-mail/password or magic
// link, GitHub verified address, LinkedIn verified address, confirmed passkey sign-up). Microsoft only
// gives an unverified "mail" field: such an account is never merged with another login.
export const FOURNISSEURS_PROUVES = new Set(["google", "email", "github", "linkedin", "passkey"]);

export interface Connexion {
  email: string;
  name: string;
  provider: string;
  providerId: string;
  avatarUrl?: string | null;
  emailVerified: boolean;
}

/** Decides what a login does, without touching the database (unit-tested). */
export function deciderConnexion(c: Pick<Connexion, "emailVerified">, parFournisseur: User | null, parEmail: User | null):
  { action: "existant"; user: User } | { action: "creer" } | { action: "refuser"; provider: string } {
  if (parFournisseur) return { action: "existant", user: parFournisseur };
  if (!parEmail) return { action: "creer" };
  if (c.emailVerified && FOURNISSEURS_PROUVES.has(parEmail.provider)) return { action: "existant", user: parEmail };
  return { action: "refuser", provider: parEmail.provider };
}

export async function connecterOuCreer(c: Connexion): Promise<User> {
  const supabase = getSupabase();
  const email = c.email.trim().toLowerCase();
  if (!email) throw new Error("E-mail missing from the sign-in provider");
  const parFournisseur = await findUserByProvider(c.providerId, c.provider);
  const parEmail = parFournisseur ? null : await findUserByEmail(email);
  const d = deciderConnexion(c, parFournisseur, parEmail);
  if (d.action === "refuser") throw new EmailDejaUtilise(d.provider);
  if (d.action === "existant") {
    // Name and avatar refreshed for this provider's own account only; the e-mail never changes here
    if (parFournisseur && (c.name || c.avatarUrl)) {
      must(await supabase.from("users").update({
        ...(c.name ? { name: c.name } : {}), ...(c.avatarUrl ? { avatar_url: c.avatarUrl } : {}),
      }).eq("id", d.user.id), "users update");
    }
    return d.user;
  }
  const { data, error } = await supabase.from("users").insert({
    email, name: c.name || email.split("@")[0], avatar_url: c.avatarUrl ?? null, provider: c.provider, provider_id: c.providerId,
  }).select().single();
  if (error || !data) {
    // Lost a race against another sign-in with the same e-mail: never fall back on that account
    const autre = await findUserByEmail(email);
    if (autre) throw new EmailDejaUtilise(autre.provider);
    throw new Error(error?.message || "users insert failed");
  }
  return toUser(data);
}
