import { useEffect, useState } from 'react';
import { HudButton } from './hud/HudButton';
import type { Exchange, ExchangeStatus } from '../types/forge';

// Backlink exchanges of the signed-in member: full history with the step each one is at.
// An exchange is complete only once both links are verified by the server.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const STATUS: Record<ExchangeStatus, { label: string; color: string }> = {
  propose: { label: 'Proposed', color: 'var(--muted)' },
  accepte: { label: 'Accepted', color: 'var(--p, #A855F7)' },
  publie: { label: 'Published', color: 'var(--warn)' },
  verifie: { label: 'Verified', color: 'var(--ok)' },
  refuse: { label: 'Declined', color: 'var(--soft)' },
  expire: { label: 'Expired', color: 'var(--soft)' },
  rompu: { label: 'Broken', color: 'var(--danger)' },
};

const day = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString() : '');

async function charger(): Promise<Exchange[] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/forge/exchanges`, { credentials: 'include' });
    if (!res.ok) return null;
    return (await res.json()).echanges ?? [];
  } catch {
    return null;
  }
}

function Row({ e, onChange }: { e: Exchange; onChange: () => void }) {
  const [url, setUrl] = useState(e.mon_lien.url ?? '');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function post(path: string, body?: Record<string, string>) {
    setBusy(true); setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/api/forge/exchanges/${e.id}/${path}`, {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setMessage({ ok: false, text: data.error || `Error ${res.status}` }); return; }
      if (path === 'lien') setMessage(data.lien_verifie ? { ok: true, text: 'Link verified.' } : { ok: false, text: data.raison || 'Link not found yet: it will be checked again daily.' });
      onChange();
    } catch {
      setMessage({ ok: false, text: 'API unreachable.' });
    } finally {
      setBusy(false);
    }
  }

  const s = STATUS[e.statut];
  const peutDeclarer = (e.statut === 'accepte' || e.statut === 'publie') && !e.mon_lien.verifie;
  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, wordBreak: 'break-all' }}>{e.partenaire.url_site || 'Partner'}</div>
          <div style={{ fontSize: 11, color: 'var(--soft)' }}>
            {e.role === 'recu' ? 'Received' : 'Sent'} {day(e.propose_at)}
            {e.statut !== 'propose' && ` · your link ${e.mon_lien.verifie ? '✓' : '—'} · their link ${e.son_lien.verifie ? '✓' : '—'}`}
          </div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 800, color: s.color }}>{s.label}</span>
      </div>

      {e.statut === 'verifie' && e.grace_expire_at && (
        <div style={{ fontSize: 12, color: 'var(--warn)', marginTop: 6 }}>⚠️ A link is missing ({e.raison}). Restore it before {day(e.grace_expire_at)} or the exchange breaks.</div>
      )}
      {(e.statut === 'rompu' || e.statut === 'expire') && e.raison && <div style={{ fontSize: 12, color: 'var(--soft)', marginTop: 6 }}>{e.raison}</div>}

      {e.statut === 'propose' && e.role === 'recu' && (
        <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
          <HudButton action="ok" compact label="Accept" busy={busy} onClick={() => post('accepter')} />
          <HudButton action="cancel" compact label="Decline" disabled={busy} onClick={() => post('refuser')} />
        </div>
      )}
      {peutDeclarer && (
        <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="url" value={url} onChange={(ev) => setUrl(ev.target.value)} placeholder="https://your-site.com/page-with-the-link"
            style={{ flex: '1 1 220px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '8px 12px', color: 'var(--text)', fontSize: 13 }} />
          <HudButton action="continue" compact label="Declare my link" busy={busy} disabled={!url.trim()} onClick={() => post('lien', { url: url.trim() })} />
        </div>
      )}
      {peutDeclarer && e.raison && !message && <div style={{ fontSize: 12, color: 'var(--soft)', marginTop: 6 }}>Last check: {e.raison}</div>}
      {message && <div style={{ fontSize: 12, marginTop: 6, color: message.ok ? 'var(--ok)' : 'var(--danger)' }}>{message.text}</div>}
    </div>
  );
}

export default function ExchangesPanel() {
  const [echanges, setEchanges] = useState<Exchange[] | null>(null);
  const recharger = () => { charger().then((r) => { if (r) setEchanges(r); }); };

  useEffect(() => {
    let actif = true;
    charger().then((r) => { if (actif) setEchanges(r ?? []); });
    return () => { actif = false; };
  }, []);

  const verifies = (echanges ?? []).filter((e) => e.statut === 'verifie').length;
  return (
    <div className="nx-card" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <div className="nx-kicker">Backlink exchanges</div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>{verifies} verified</div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--soft)', marginBottom: 6 }}>An exchange is complete once both links are verified online.</div>
      {echanges === null ? (
        <div style={{ color: 'var(--muted)', fontSize: 13, padding: '12px 0' }}>Loading...</div>
      ) : echanges.length === 0 ? (
        <div style={{ color: 'var(--muted)', fontSize: 13, padding: '12px 0' }}>No exchange yet. Propose one from the recommended partners.</div>
      ) : (
        echanges.map((e) => <Row key={e.id} e={e} onChange={recharger} />)
      )}
    </div>
  );
}
