import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAuthStore } from "../auth/authContext";
import PasskeyButton from "./PasskeyButton";
import { HudButton } from "./hud/HudButton";
import "../noxel-login.css";
import type { PublicUser } from "../types/forge";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (el: HTMLElement, config: object) => void;
          prompt: () => void;
        };
      };
    };
  }
}

type Props = {
  open: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "email" | "magic";
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const API_BASE = import.meta.env.VITE_API_URL ?? "";

type Screen = "grid" | "email" | "magic";


function writeStored(user: PublicUser | null | undefined) {
  // Champs publics seulement (jamais password_hash ni providerId).
  const { id, email, name, avatarUrl, provider, tier } = user ?? {};
  try { localStorage.setItem("nxl_forge_user", JSON.stringify({ id, email, name, avatarUrl: avatarUrl ?? null, provider, tier })); } catch { /* storage blocked: the session cookie still works */ }
}

export default function ForgeAccessModal({ open, onClose, defaultTab }: Props) {
  const { loginWithGoogle, refreshAuth } = useAuthStore();
  const googleInitialized = useRef(false);

  const [screen, setScreen] = useState<Screen>(
    defaultTab === "email" ? "email" : defaultTab === "magic" ? "magic" : "grid"
  );

  const [emailAddr, setEmailAddr] = useState("");
  const [emailPass, setEmailPass] = useState("");
  const [emailName, setEmailName] = useState("");
  const [emailMode, setEmailMode] = useState<"login" | "register">("login");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [notice, setNotice] = useState("");

  const [magicEmail, setMagicEmail] = useState("");
  const [magicStatus, setMagicStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [magicMessage, setMagicMessage] = useState("");

  useEffect(() => {
    if (!open || !GOOGLE_CLIENT_ID || screen !== "grid") return;
    function initGoogle() {
      if (!window.google?.accounts?.id || googleInitialized.current) return;
      googleInitialized.current = true;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          try { await loginWithGoogle(response.credential); onClose(); }
          catch (err) { console.error("Google login failed:", err); }
        },
      });
    }
    if (!window.google?.accounts) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true; script.defer = true;
      script.onload = initGoogle;
      document.head.appendChild(script);
    } else { initGoogle(); }
  }, [open, loginWithGoogle, onClose, screen]);

  const handleGoogleClick = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: async (response: { credential: string }) => {
              try { await loginWithGoogle(response.credential); onClose(); }
              catch (err) { console.error("Google login failed:", err); }
            },
          });
          window.google.accounts.id.prompt();
        }
      };
      document.head.appendChild(script);
    }
  };

  const handleMagicLink = async () => {
    if (!magicEmail.trim()) return;
    setMagicStatus("loading");
    try {
      const res = await fetch(API_BASE + "/api/auth/magic/request", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: magicEmail.trim() }),
      });
      const data = await res.json();
      if (data.ok) { setMagicStatus("sent"); }
      else { setMagicStatus("error"); setMagicMessage(data.error || "Failed to send link"); }
    } catch { setMagicStatus("error"); setMagicMessage("Server error. Please try again."); }
  };

  const handleEmailAuth = async () => {
    if (!emailAddr.trim() || !emailPass.trim()) { setEmailError("Email and password required"); return; }
    setEmailLoading(true); setEmailError("");
    try {
      const endpoint = emailMode === "register" ? "/api/auth/register" : "/api/auth/login";
      const body: { email: string; password: string; name?: string } = { email: emailAddr.trim(), password: emailPass };
      if (emailMode === "register" && emailName.trim()) body.name = emailName.trim();
      const res = await fetch(API_BASE + endpoint, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      // Sign-up: the account is created when the e-mailed link is opened
      if (data.pending) { setNotice(data.message || "Check your inbox to confirm your account."); return; }
      window.location.reload();
    } catch (e) { setEmailError((e as Error).message || "Authentication failed"); }
    finally { setEmailLoading(false); }
  };

  if (!open) return null;
  const overlayRoot = document.getElementById("overlay-root") || document.body;

  const providers = [
    {
      id: "google", label: "Google", comingSoon: false, onClick: handleGoogleClick,
      icon: <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.042.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>,
    },
    {
      id: "microsoft", label: "Microsoft", comingSoon: false,
      onClick: () => { window.location.href = API_BASE + "/api/auth/microsoft/start"; },
      icon: <svg width="32" height="32" viewBox="0 0 24 24"><rect x="1" y="1" width="10.5" height="10.5" fill="#F25022"/><rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00"/><rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/><rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/></svg>,
    },
    {
      id: "linkedin", label: "LinkedIn",
      onClick: () => { window.location.href = `${API_BASE}/api/auth/linkedin/start`; },
      icon: <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    },
    {
      id: "github", label: "GitHub",
      onClick: () => { window.location.href = `${API_BASE}/api/auth/github/start`; },
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
    },
  ];

  // A JSX element, not a component declared during render (it would be remounted on every render)
  const backBtn = <button type="button" className="nxl-back" onClick={() => setScreen("grid")}>← Back</button>;

  // Look commun NOXEL Login 1.0 (src/noxel-login.css), identique sur NOXEL SEO, NOXEL FORGE, NOXEL360 et NOXEL SPECTRA
  return createPortal(
    <div className="nxl-overlay" onClick={onClose}>
      <div className="nxl-card" role="dialog" aria-modal="true" aria-labelledby="nxl-title" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="nxl-close" aria-label="Close" onClick={onClose}>✕</button>

        {screen === "grid" && (
          <>
            <div className="nxl-head">
              <h2 id="nxl-title" className="nxl-title">Access NOXEL FORGE</h2>
              <p className="nxl-sub">One NOXEL account for NOXEL SEO, NOXEL FORGE and NOXEL SPECTRA.</p>
            </div>

            <div className="nxl-providers">
              {providers.map((p) => (
                <button key={p.id} type="button" className="nxl-provider" onClick={p.onClick}>
                  {p.icon}<span className="nxl-provider__name">{p.label}</span>
                </button>
              ))}
            </div>

            <PasskeyButton
              onSuccess={(u) => { writeStored(u); void refreshAuth(); onClose(); }}
              onError={(msg) => setNotice(msg)}
              onPending={(msg) => setNotice(msg)}
            />
            {notice && <div role="status" className="nxl-msg nxl-msg--ok">{notice}</div>}

            <button type="button" className="nxl-wide nxl-wide--magic" onClick={() => setScreen("magic")}>Sign in with Magic Link (no password)</button>
            <button type="button" className="nxl-wide" onClick={() => setScreen("email")}>Sign in with email / password</button>
          </>
        )}

        {screen === "magic" && (
          <>
            {backBtn}
            <h2 id="nxl-title" className="nxl-h2">Magic Link</h2>
            <p className="nxl-lead">Enter your email and we'll send you a secure sign-in link, no password needed.</p>
            {magicStatus === "sent" ? (
              <div className="nxl-sent" role="status">
                <div className="nxl-sent__title">Check your inbox!</div>
                <div className="nxl-sent__text">We sent a sign-in link to <strong>{magicEmail}</strong>. It expires in 15 minutes.</div>
              </div>
            ) : (
              <div className="nxl-form">
                <input className="nxl-input" type="email" value={magicEmail} onChange={(e) => setMagicEmail(e.target.value)}
                  placeholder="your@email.com" onKeyDown={(e) => e.key === "Enter" && handleMagicLink()} />
                {magicMessage && <div className="nxl-msg nxl-msg--error">{magicMessage}</div>}
                <HudButton action="continue" compact label="Send Magic Link" busy={magicStatus === "loading"} busyLabel="Sending..."
                  disabled={!magicEmail.trim()} onClick={handleMagicLink} style={{ color: "#fff" }} />
              </div>
            )}
          </>
        )}

        {screen === "email" && (
          <>
            {backBtn}
            <h2 id="nxl-title" className="nxl-h2" style={{ marginBottom: 18 }}>Sign in with email</h2>
            <div className="nxl-tabs" role="tablist">
              {(["login", "register"] as const).map((m) => (
                <button key={m} type="button" role="tab" className="nxl-tab" aria-selected={emailMode === m}
                  onClick={() => { setEmailMode(m); setEmailError(""); }}>{m === "login" ? "Sign In" : "Create Account"}</button>
              ))}
            </div>
            <div className="nxl-form">
              {emailMode === "register" && <input className="nxl-input" type="text" value={emailName} onChange={(e) => setEmailName(e.target.value)} placeholder="Your name" />}
              <input className="nxl-input" type="email" value={emailAddr} onChange={(e) => setEmailAddr(e.target.value)} placeholder="your@email.com" onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()} />
              <input className="nxl-input" type="password" value={emailPass} onChange={(e) => setEmailPass(e.target.value)} placeholder="Password (min 6 characters)" onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()} />
              {notice && <div role="status" className="nxl-msg nxl-msg--ok">{notice}</div>}
              {emailError && <div className="nxl-msg nxl-msg--error">{emailError}</div>}
              <HudButton action={emailMode === "login" ? "continue" : "new-project"} compact
                label={emailMode === "login" ? "Sign In" : "Create Account"} busy={emailLoading} busyLabel="Please wait..."
                onClick={handleEmailAuth} style={{ color: "#fff" }} />
              <button type="button" className="nxl-link nxl-link--green" onClick={() => setScreen("magic")}>Forgot your password? Use the Magic Link instead →</button>
            </div>
          </>
        )}

        <p className="nxl-legal">By signing in you agree to our Terms of Service. We never sell your data.</p>
      </div>
    </div>,
    overlayRoot
  );
}
