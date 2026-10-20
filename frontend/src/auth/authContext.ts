import { createContext, useContext } from "react";

// Context and hook live apart from AuthProvider so AuthStore.tsx only exports a component (fast refresh)
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  provider: string;
  tier: string;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuthStore(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthStore must be inside <AuthProvider>");
  return ctx;
}
