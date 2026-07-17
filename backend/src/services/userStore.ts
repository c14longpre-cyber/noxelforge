// NOXEL Forge — User Store (shared public.users table with NOXEL SEO)
import { getSupabase } from "../lib/supabaseClient";

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

export async function findUserById(id: string): Promise<User | null> {
  const supabase = getSupabase();
  const { data } = await supabase.from("users").select("*").eq("id", id).single();
  return data ? toUser(data) : null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email.toLowerCase())
    .single();
  return data ? toUser(data) : null;
}

export async function findUserByProvider(providerId: string, provider = "google"): Promise<User | null> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("provider", provider)
    .eq("provider_id", providerId)
    .single();
  return data ? toUser(data) : null;
}

export async function upsertUser(
  email: string,
  name: string,
  providerId: string,
  provider = "google",
  avatarUrl: string | null = null
): Promise<User> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        email: email.toLowerCase(),
        name,
        avatar_url: avatarUrl,
        provider,
        provider_id: providerId,
      },
      { onConflict: "provider,provider_id" }
    )
    .select()
    .single();

  if (error || !data) {
    const { data: ex } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();
    if (ex) return toUser(ex);
    throw new Error(error?.message || "upsert failed");
  }
  return toUser(data);
}
