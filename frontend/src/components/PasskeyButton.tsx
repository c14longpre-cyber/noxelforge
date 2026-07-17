import { useState } from "react";
import { startRegistration, startAuthentication } from "@simplewebauthn/browser";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

type Props = {
  onSuccess: (user: any) => void;
  onError: (msg: string) => void;
};

export default function PasskeyButton({ onSuccess, onError }: Props) {
  const [mode, setMode] = useState<"idle" | "register">("idle");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff", fontSize: 14, fontFamily: "inherit",
    outline: "none", boxSizing: "border-box", marginBottom: 10,
  };

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
      if (data.ok) {
        onSuccess(data.user);
      } else {
        onError(data.error || "Passkey login failed");
      }
    } catch (e: any) {
      onError(e.message || "Passkey login failed");
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
    } catch (e: any) {
      onError(e.message || "Passkey registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (mode === "idle") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%", padding: "12px", borderRadius: 10, border: "none",
            background: "rgba(112,42,165,0.15)", color: "#c18cff",
            fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
            outline: "1px solid rgba(112,42,165,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          <span style={{ fontSize: 18 }}>{"\u{1F511}"}</span>
          {loading ? "Authenticating..." : "Sign in with Passkey"}
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          style={{
            background: "none", border: "none", color: "rgba(193,140,255,0.6)",
            fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
            textAlign: "center", textDecoration: "underline", textUnderlineOffset: 3,
          }}
        >
          Create a new passkey
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        onKeyDown={(e) => e.key === "Enter" && handleRegister()}
        style={inputStyle}
      />
      <button
        type="button"
        onClick={handleRegister}
        disabled={loading || !email.trim()}
        style={{
          width: "100%", padding: "12px", borderRadius: 10, border: "none",
          background: "rgba(112,42,165,0.15)", color: "#c18cff",
          fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
          outline: "1px solid rgba(112,42,165,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        <span style={{ fontSize: 18 }}>{"\u{1F511}"}</span>
        {loading ? "Setting up..." : "Create Passkey"}
      </button>
      <button
        type="button"
        onClick={() => setMode("idle")}
        style={{
          background: "none", border: "none", color: "rgba(255,255,255,0.4)",
          fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
          textAlign: "center",
        }}
      >
        Back
      </button>
    </div>
  );
}
