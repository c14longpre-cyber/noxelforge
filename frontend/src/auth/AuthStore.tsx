import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext, type AuthContextValue, type AuthUser } from "./authContext";

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const IS_DEV = import.meta.env.DEV;
const STORAGE_KEY = "nxl_forge_user";

function devWarn(msg: string, detail?: unknown) {
  if (IS_DEV) console.warn("[AuthStore] " + msg, detail ?? "");
}

// Ne garder que les champs publics, quoi que renvoie l'API.
function pickUser(u: AuthUser): AuthUser {
  return { id: u.id, email: u.email, name: u.name, avatarUrl: u.avatarUrl ?? null, provider: u.provider, tier: u.tier };
}

function readStored(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = pickUser(JSON.parse(raw));
    // Purge les anciennes copies qui contenaient password_hash / providerId.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  } catch {
    return null;
  }
}

function writeStored(user: AuthUser) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pickUser(user)));
  } catch { /* storage blocked (private mode): the session cookie still works */ }
}

function clearStored() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* storage blocked: nothing to clear */ }
}

// Session from the API (cookie), else the copy kept in localStorage; never touches React state
async function lireSession(): Promise<AuthUser | null> {
  try {
    const res = await fetch(API_BASE + "/api/auth/me", {
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Not authenticated");
    const json = await res.json();
    if (!json.ok || !json.user) throw new Error("No user in response");
    writeStored(json.user);
    return pickUser(json.user);
  } catch {
    return readStored();
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    setLoading(true);
    setUser(await lireSession());
    setLoading(false);
  }, []);

  // loading starts true: the first read only sets state once the answer is there
  useEffect(() => {
    let actif = true;
    lireSession().then((u) => {
      if (!actif) return;
      setUser(u);
      setLoading(false);
    });
    return () => { actif = false; };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authSuccess = params.get("auth_success");
    const authError = params.get("auth_error");
    // The mount effect above already reads the session set by the OAuth redirect: only clean the URL here
    if (authSuccess || authError) window.history.replaceState({}, "", window.location.pathname);
    if (authError) devWarn("OAuth error: " + authError);
  }, []);

  const loginWithGoogle = useCallback(async (idToken: string) => {
    const res = await fetch(API_BASE + "/api/auth/google", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ token: idToken }),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error || "Google auth failed");
    setUser(pickUser(json.user));
    writeStored(json.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(API_BASE + "/api/auth/logout", { method: "POST", credentials: "include" });
    } catch (e) {
      devWarn("Logout failed", e);
    }
    clearStored();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: !!user, loading, loginWithGoogle, logout, refreshAuth }),
    [user, loading, loginWithGoogle, logout, refreshAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
