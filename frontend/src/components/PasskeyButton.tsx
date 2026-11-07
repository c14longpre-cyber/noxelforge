import { useState } from "react";
import { startRegistration, startAuthentication } from "@simplewebauthn/browser";
import { HudButton } from "./hud/HudButton";
import type { PublicUser } from "../types/forge";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

type Props = {
  onSuccess: (user: PublicUser) => void;
  onError: (msg: string) => void;
  onPending?: (msg: string) => void;
};

export default function PasskeyButton({ onSuccess, onError, onPending }: Props) {
  const [mode, setMode] = useState<"idle" | "register">("idle");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleLogin = async () => {
    setLoading(true);
    try {
      const startRes = await fetch(API_BASE + "/api/auth/passkey/login/start", { method: "POST" });
      const startJson = await startRes.json();
      const credential = await startAuthentication({ optionsJSON: startJson.options });
      const finishRes = await fetch(API_BASE + "/api/auth/passkey/login/finish", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credential }),
      });
      const data = await finishRes.json();
      if (data.ok && data.pending) {
        // New account: confirmed by the link e-mailed to the address
        setMode("idle");
        onPending?.(data.message || "Check your inbox to confirm your account.");
      } else if (data.ok) {
        onSuccess(data.user);
      } else {
        onError(data.error || "Passkey login failed");
      }
    } catch (e) {
      onError((e as Error).message || "Passkey login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email.trim()) return;
    setLoading(true);
    try {
      const startRes = await fetch(API_BASE + "/api/auth/passkey/register/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const startJson = await startRes.json();
      const credential = await startRegistration({ optionsJSON: startJson.options });
      const finishRes = await fetch(API_BASE + "/api/auth/passkey/register/finish", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), credential: credential }),
      });
      const data = await finishRes.json();
      if (data.ok) {
        onSuccess(data.user);
      } else {
        onError(data.error || "Passkey registration failed");
      }
    } catch (e) {
      onError((e as Error).message || "Passkey registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (mode === "idle") {
    return (
      <div className="nxl-passkey">
        <HudButton action="continue" compact label="Sign in with Passkey" busy={loading} busyLabel="Authenticating..."
          onClick={handleLogin} style={{ color: "#fff" }} />
        <button type="button" className="nxl-link nxl-link--violet" onClick={() => setMode("register")}>Create a new passkey →</button>
      </div>
    );
  }

  return (
    <div className="nxl-form">
      <input className="nxl-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com" onKeyDown={(e) => e.key === "Enter" && handleRegister()} />
      <HudButton action="new-project" compact label="Create Passkey" busy={loading} busyLabel="Setting up..."
        disabled={!email.trim()} onClick={handleRegister} style={{ color: "#fff" }} />
      <button type="button" className="nxl-link" onClick={() => setMode("idle")}>← Back</button>
    </div>
  );
}
