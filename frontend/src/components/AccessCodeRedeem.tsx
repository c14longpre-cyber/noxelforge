import { useState } from 'react';
import { HudButton } from './hud/HudButton';

// "Have an access code?" — redeems a NOXEL FORGE code (POST /api/forge/codes/redeem)
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function AccessCodeRedeem({ expiresAt, onDone, account = 'membre' }: { expiresAt?: string | null; onDone: () => void; account?: 'anonyme' | 'nonMembre' | 'membre' }) {
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function redeem() {
    if (!code.trim()) return;
    setBusy(true); setMsg(null);
    try {
      const res = await fetch(`${API_BASE}/api/forge/codes/redeem`, {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      const until = data.expiresAt ? ` until ${new Date(data.expiresAt).toLocaleDateString('en-CA')}` : '';
      setMsg({ ok: true, text: `Code accepted: ${String(data.tier).toUpperCase()} plan${until}.` });
      setCode('');
      onDone();
    } catch (e) {
      setMsg({ ok: false, text: (e as Error).message });
    } finally { setBusy(false); }
  }

  return (
    <div className="nx-card" style={{ marginTop: 24 }}>
      <div style={{ marginBottom: 10, fontWeight: 800, fontSize: 16, color: 'var(--g)' }}>Have an access code?</div>
      {expiresAt && <div style={{ fontSize: 13, color: 'var(--g)', marginBottom: 10 }}>Your current plan is offered until {new Date(expiresAt).toLocaleDateString('en-CA')}.</div>}
      {account === 'anonyme' && <div style={{ fontSize: 13, color: 'var(--muted)' }}>Sign in (top right) to use a code.</div>}
      {account === 'nonMembre' && <div style={{ fontSize: 13, color: 'var(--muted)' }}>Register your site on your <a href="/forge/dashboard" style={{ color: 'var(--g)' }}>dashboard</a> first, then enter your code here.</div>}
      {account === 'membre' && <form style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }} onSubmit={(e) => { e.preventDefault(); void redeem(); }}>
        <label htmlFor="forge-code" style={{ position: 'absolute', left: -9999 }}>Access code</label>
        <input id="forge-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="NXF-XXXXXX-XXXXXX" autoComplete="off" spellCheck={false}
          style={{ flex: '1 1 220px', maxWidth: 320, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '9px 12px', color: 'var(--text)', fontSize: 14, fontFamily: 'monospace', letterSpacing: 1 }} />
        <HudButton action="ok" compact label="Use the code" busy={busy} busyLabel="Checking..." onClick={() => void redeem()} />
      </form>}
      {msg && <div role="status" style={{ marginTop: 10, fontSize: 13, color: msg.ok ? 'var(--ok)' : 'var(--danger)' }}>{msg.text}</div>}
    </div>
  );
}
