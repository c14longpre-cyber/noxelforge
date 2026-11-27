import { useEffect, useRef, useState } from "react";
import "./nivo.css";

// Nivo 1.1 — support assistant of the NOXEL sites. Same file in noxelseo, noxelforge, noxelspectra, noxel360 and noxelmarketing
// (frontend/src/components/NivoChat.tsx + nivo.css). It always talks to the NOXEL SEO API (routes/nivo.routes.ts),
// with `site` so it answers from that site's facts; when a person must answer, it offers to pass the question to the
// team (reply within 24 business hours). Conversations are kept 12 months only when a NOXEL SEO session exists.

const NIVO_API = "https://noxelseo-production.up.railway.app";
export type NivoSite = "seo" | "forge" | "spectra" | "360" | "marketing";
const SITE_NAME: Record<NivoSite, string> = { seo: "NOXEL SEO", forge: "NOXEL FORGE", spectra: "NOXEL SPECTRA", "360": "NOXEL360", marketing: "NOXEL MARKETING" };
type Msg = { role: "user" | "assistant"; content: string };

const TEXT = {
  fr: {
    open: "Ouvrir l'aide de Nivo", help: "Besoin d'aide ?", chat: "Clavardez avec Nivo", close: "Fermer", title: "Nivo", subtitle: "Assistant IA",
    welcome: "Bonjour! Je suis Nivo, l'assistant IA de {site}. Comment puis-je vous aider?",
    placeholder: "Écrivez votre question…", send: "Envoyer", thinking: "Nivo écrit…",
    error: "Nivo est momentanément indisponible. Écrivez-nous à contact@noxel360.com : une personne vous répondra dans les 24 heures ouvrables.",
    limited: "Vous avez envoyé beaucoup de messages. Réessayez dans quelques minutes, ou écrivez à contact@noxel360.com.",
    noticeGuest: "Nivo est un assistant IA qui répond à partir des informations de {site}. Vos messages ne sont pas conservés.",
    noticeUser: "Nivo est un assistant IA qui répond à partir des informations de {site}. La conversation est conservée 12 mois avec votre compte.",
    erase: "Effacer mes conversations", erased: "Vos conversations ont été effacées.",
    handoffTitle: "Transmettre votre question à l'équipe", name: "Votre nom", email: "Votre courriel", question: "Votre question",
    consent: "J'accepte que NOXEL me réponde par courriel au sujet de cette question.",
    handoffSend: "Transmettre", handoffDone: "Merci! Votre question est transmise. Vous aurez une réponse complète dans les 24 heures ouvrables.",
    handoffError: "L'envoi n'a pas fonctionné. Écrivez-nous directement à contact@noxel360.com.",
    fieldError: "Vérifiez votre nom, votre courriel et la case de consentement.",
    transfer: "Transmettre ma question à l'équipe",
  },
  en: {
    open: "Open Nivo help", help: "Need help?", chat: "Chat with Nivo", close: "Close", title: "Nivo", subtitle: "AI assistant",
    welcome: "Hello! I'm Nivo, the AI assistant of {site}. How can I help you?",
    placeholder: "Type your question…", send: "Send", thinking: "Nivo is typing…",
    error: "Nivo is unavailable right now. Write to contact@noxel360.com: a person will answer within 24 business hours.",
    limited: "You've sent many messages. Try again in a few minutes, or write to contact@noxel360.com.",
    noticeGuest: "Nivo is an AI assistant that answers from {site}'s information. Your messages are not kept.",
    noticeUser: "Nivo is an AI assistant that answers from {site}'s information. The conversation is kept 12 months with your account.",
    erase: "Erase my conversations", erased: "Your conversations were erased.",
    handoffTitle: "Pass your question to the team", name: "Your name", email: "Your e-mail", question: "Your question",
    consent: "I agree that NOXEL answers me by e-mail about this question.",
    handoffSend: "Send to the team", handoffDone: "Thank you! Your question was passed on. You'll get a complete answer within 24 business hours.",
    handoffError: "Sending failed. Write to us directly at contact@noxel360.com.",
    fieldError: "Check your name, your e-mail and the consent box.",
    transfer: "Pass my question to the team",
  },
};

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`).toLowerCase();

export default function NivoChat({ locale, site = "seo", apiBase, accountEmail = null }: {
  locale: string; site?: NivoSite; apiBase?: string; accountEmail?: string | null;
}) {
  const lang = locale.toLowerCase().startsWith("fr") ? "fr" : "en";
  const name = SITE_NAME[site];
  const tx = Object.fromEntries(Object.entries(TEXT[lang]).map(([k, v]) => [k, v.replace("{site}", name)])) as typeof TEXT["fr"];
  const API_BASE = apiBase ?? NIVO_API;
  // Conversation kept only when the NOXEL SEO API recognises a session (answer of /api/support/history)
  const [kept, setKept] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [handoff, setHandoff] = useState<null | "form" | "sending" | "done">(null);
  const [form, setForm] = useState({ name: "", email: "", question: "", consent: false, website2: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const convId = useRef<string>(newId());
  const loadedFor = useRef<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Signed-in account: reopen its last conversation (once per account, and once for a visitor)
  useEffect(() => {
    const who = accountEmail ?? "visitor";
    if (!open || loadedFor.current === who) return;
    loadedFor.current = who;
    fetch(`${API_BASE}/api/support/history?site=${site}`, { credentials: "include" })
      .then((r) => { setKept(r.ok); return r.ok ? r.json() : null; })
      .then((d) => {
        const c = d?.conversation;
        if (c?.id && Array.isArray(c.messages) && c.messages.length) { convId.current = c.id; setMsgs(c.messages); }
      })
      .catch(() => setKept(false));
  }, [open, accountEmail, API_BASE, site]);

  useEffect(() => {
    const box = listRef.current;
    if (box) box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }, [msgs, busy, handoff]);

  const lastQuestion = () => [...msgs].reverse().find((m) => m.role === "user")?.content ?? "";

  async function send() {
    const q = input.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(next); setInput(""); setBusy(true); setNote(null);
    try {
      const r = await fetch(`${API_BASE}/api/support/chat`, {
        method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, messages: next.slice(-16), conversationId: convId.current, lang }),
      });
      if (r.status === 429) { setNote(tx.limited); return; }
      const d = await r.json().catch(() => null);
      if (!r.ok || !d?.ok) { setNote(tx.error); return; }
      setMsgs([...next, { role: "assistant", content: d.reply }]);
      if (d.handoff) openHandoff(q);
    } catch {
      setNote(tx.error);
    } finally {
      setBusy(false);
    }
  }

  function openHandoff(question?: string) {
    setForm((f) => ({ ...f, name: f.name || "", email: f.email || accountEmail || "", question: question ?? lastQuestion() }));
    setFormError(null);
    setHandoff("form");
  }

  async function sendHandoff() {
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) || !form.consent || form.question.trim().length < 3) {
      setFormError(tx.fieldError); return;
    }
    setHandoff("sending"); setFormError(null);
    try {
      const r = await fetch(`${API_BASE}/api/support/handoff`, {
        method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, name: form.name, email: form.email, question: form.question, contactConsent: form.consent, website2: form.website2, lang, transcript: msgs }),
      });
      if (!r.ok) throw new Error("not ok");
      setHandoff("done");
    } catch {
      setHandoff("form"); setFormError(tx.handoffError);
    }
  }

  async function erase() {
    try {
      const r = await fetch(`${API_BASE}/api/support/history`, { method: "DELETE", credentials: "include" });
      if (r.ok) { setMsgs([]); convId.current = newId(); setNote(tx.erased); }
    } catch { /* keep the conversation on screen */ }
  }

  if (!open) {
    return (
      <button type="button" className="nivo-launcher" onClick={() => setOpen(true)} aria-label={tx.open}>
        <span className="nivo-launcher__mark" aria-hidden="true">N</span>
        <span className="nivo-launcher__text">
          <span className="nivo-launcher__label">{tx.help}</span>
          <span className="nivo-launcher__sub">{tx.chat}</span>
        </span>
      </button>
    );
  }

  return (
    <section className="nivo-panel" role="dialog" aria-label={`${tx.title} · ${tx.subtitle}`}>
      <header className="nivo-panel__head">
        <span className="nivo-launcher__mark" aria-hidden="true">N</span>
        <div><strong>{tx.title}</strong> <span className="nivo-panel__sub">· {tx.subtitle}</span></div>
        <button type="button" className="nivo-panel__close" onClick={() => setOpen(false)} aria-label={tx.close}>✕</button>
      </header>

      <div className="nivo-panel__list" ref={listRef} aria-live="polite">
        <p className="nivo-msg nivo-msg--bot">{tx.welcome}</p>
        {msgs.map((m, i) => <p key={i} className={`nivo-msg ${m.role === "user" ? "nivo-msg--me" : "nivo-msg--bot"}`}>{m.content}</p>)}
        {busy && <p className="nivo-msg nivo-msg--bot nivo-msg--typing">{tx.thinking}</p>}
        {note && <p className="nivo-note">{note}</p>}

        {handoff === "form" || handoff === "sending" ? (
          <div className="nivo-handoff">
            <strong>{tx.handoffTitle}</strong>
            <input aria-label={tx.name} placeholder={tx.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input aria-label={tx.email} placeholder={tx.email} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea aria-label={tx.question} placeholder={tx.question} rows={3} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
            <input className="nivo-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website2} onChange={(e) => setForm({ ...form, website2: e.target.value })} />
            <label className="nivo-consent"><input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} /> {tx.consent}</label>
            {formError && <p className="nivo-note">{formError}</p>}
            <button type="button" className="nivo-btn" disabled={handoff === "sending"} onClick={sendHandoff}>{tx.handoffSend}</button>
          </div>
        ) : handoff === "done" ? (
          <p className="nivo-msg nivo-msg--bot">{tx.handoffDone}</p>
        ) : msgs.length > 0 ? (
          <button type="button" className="nivo-link" onClick={() => openHandoff()}>{tx.transfer}</button>
        ) : null}
      </div>

      <form className="nivo-panel__input" onSubmit={(e) => { e.preventDefault(); void send(); }}>
        <input aria-label={tx.placeholder} placeholder={tx.placeholder} value={input} maxLength={1500} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" className="nivo-btn" disabled={busy || !input.trim()}>{tx.send}</button>
      </form>
      <p className="nivo-panel__notice">
        {kept ? tx.noticeUser : tx.noticeGuest}
        {kept && <> <button type="button" className="nivo-link nivo-link--inline" onClick={erase}>{tx.erase}</button></>}
      </p>
    </section>
  );
}
