import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const IS_DEV = import.meta.env.DEV;
const STORAGE_KEY = "nxl_forge_user";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  provider: string;
  tier: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function devWarn(msg: string, detail?: unknown) {
  if (IS_DEV) console.warn("[AuthStore] " + msg, detail ?? "");
}

function readStored(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function writeStored(user: AuthUser) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {}
}

function clearStored() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE + "/api/auth/me", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Not authenticated");
      const json = await res.json();
      if (json.ok && json.user) {
        setUser(json.user);
        writeStored(json.user);
      } else {
        throw new Error("No user in response");
      }
    } catch {
      const stored = readStored();
      setUser(stored);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authSuccess = params.get("auth_success");
    const authError = params.get("auth_error");
    if (authSuccess) {
      window.history.replaceState({}, "", window.location.pathname);
      void refreshAuth();
    } else if (authError) {
      window.history.replaceState({}, "", window.location.pathname);
      devWarn("OAuth error: " + authError);
    }
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
    setUser(json.user);
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

export function useAuthStore(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthStore must be inside <AuthProvider>");
  return ctx;
}
