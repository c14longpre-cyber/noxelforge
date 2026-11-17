import { useState } from 'react';
import { HudButton } from './hud/HudButton';

// Admin (FORGE_ADMIN_EMAILS): NOXEL FORGE access codes, same idea as the NOXEL SEO admin.
// Codes live in the shared access_codes table with product = 'forge'; members redeem them on their dashboard.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type Code = { code: string; tier: string; duration: string; created_by: string | null; created_at: string; expires_at: string | null; is_used?: boolean | null; used_by?: string | null; used_at?: string | null };

const TIERS = [['diamond', '💎 Diamond'], ['platinum', 'Platinum'], ['gold', 'Gold'], ['silver', 'Silver']] as const;
const DUREES = [['1week', '1 semaine'], ['1month', '1 mois'], ['3months', '3 mois'], ['6months', '6 mois'], ['1year', '1 an'], ['lifetime', 'Sans fin']] as const;
const libelleDuree = (d: string) => DUREES.find(([k]) => k === d)?.[1] ?? d;
const date = (iso?: string | null) => (iso ? new Date(iso).toLocaleString('fr-CA', { dateStyle: 'short', timeStyle: 'short' }) : '—');

const champ = {
  width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)',
  padding: '10px 12px', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const,
};
const etiquette = { display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' as const, color: 'var(--muted)', marginBottom: 6 };

function CarteCode({ c }: { c: Code }) {
  const [copie, setCopie] = useState(false);
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'center', opacity: c.is_used ? 0.6 : 1 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 17, fontWeight: 800, letterSpacing: 2, color: 'var(--g)' }}>{c.code}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6, fontSize: 11, alignItems: 'center' }}>
          <span style={{ padding: '2px 8px', borderRadius: 20, background: 'var(--g-dim)', color: 'var(--g)', fontWeight: 800, textTransform: 'uppercase' }}>{c.tier}</span>
          <span style={{ padding: '2px 8px', borderRadius: 20, background: 'rgba(168,85,247,0.15)', color: '#c99bff', fontWeight: 800 }}>{libelleDuree(c.duration)}</span>
          {c.created_by && <span style={{ color: 'var(--muted)' }}>→ {c.created_by}</span>}
          <span style={{ color: 'var(--soft)' }}>{date(c.created_at)}</span>
          {c.is_used
            ? <span style={{ color: 'var(--warn)', fontWeight: 700 }}>Utilisé par {c.used_by || '?'} le {date(c.used_at)}</span>
            : c.expires_at && <span style={{ color: 'var(--soft)' }}>À échanger avant le {new Date(c.expires_at).toLocaleDateString('fr-CA')}</span>}
        </div>
      </div>
      {!c.is_used && <HudButton action="copy-code" compact label={copie ? 'Copié' : 'Copier'} onClick={() => {
        navigator.clipboard?.writeText(c.code).then(() => { setCopie(true); window.setTimeout(() => setCopie(false), 1500); }).catch(() => {});
      }} />}
    </div>
  );
}

export default function AdminAccessCodes() {
  const [onglet, setOnglet] = useState<'creer' | 'tous'>('creer');
  const [tier, setTier] = useState('diamond');
  const [duree, setDuree] = useState('1month');
  const [nombre, setNombre] = useState(1);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [session, setSession] = useState<Code[]>([]);
  const [tous, setTous] = useState<Code[] | null>(null);

  async function charger() {
    try {
      const res = await fetch(`${API_BASE}/api/forge/admin/codes`, { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      setTous(data.codes ?? []);
    } catch (e) { setErreur((e as Error).message); }
  }

  async function creer() {
    setBusy(true); setErreur(null);
    try {
      const res = await fetch(`${API_BASE}/api/forge/admin/codes`, {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, duration: duree, count: nombre, note }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      setSession((s) => [...(data.codes ?? []), ...s]);
    } catch (e) { setErreur((e as Error).message); }
    finally { setBusy(false); }
  }

  return (
    <div className="nx-card" style={{ marginBottom: 20 }}>
      <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 900, color: 'var(--g)' }}>⚡ Codes d’accès NOXEL FORGE</h2>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--muted)' }}>
        Crée un code, envoie-le à la personne : elle l’entre dans son tableau de bord (« Have an access code? »). Le forfait revient tout seul à l’ancien à la fin de la durée.
      </p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, background: 'var(--surface)', padding: 4, borderRadius: 12 }}>
        {([['creer', 'Créer un code'], ['tous', 'Tous les codes']] as const).map(([k, l]) => (
          <button key={k} type="button" aria-pressed={onglet === k} onClick={() => { setOnglet(k); if (k === 'tous') { setTous(null); void charger(); } }}
            style={{ flex: 1, padding: '8px 12px', borderRadius: 9, border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 13,
              background: onglet === k ? 'var(--g-dim)' : 'transparent', color: onglet === k ? 'var(--g)' : 'var(--muted)' }}>{l}</button>
        ))}
      </div>
      {erreur && <div role="alert" style={{ marginBottom: 12, fontSize: 13, color: 'var(--danger)' }}>{erreur}</div>}

      {onglet === 'creer' ? (
        <>
          <label style={etiquette} htmlFor="code-note">Pour qui (courriel ou note, facultatif)</label>
          <input id="code-note" style={{ ...champ, marginBottom: 14 }} value={note} maxLength={120} onChange={(e) => setNote(e.target.value)} placeholder="user@example.com" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
            <div><label style={etiquette} htmlFor="code-tier">Forfait</label>
              <select id="code-tier" style={champ} value={tier} onChange={(e) => setTier(e.target.value)}>{TIERS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
            <div><label style={etiquette} htmlFor="code-duree">Durée</label>
              <select id="code-duree" style={champ} value={duree} onChange={(e) => setDuree(e.target.value)}>{DUREES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
            <div><label style={etiquette} htmlFor="code-nombre">Nombre</label>
              <input id="code-nombre" type="number" min={1} max={20} style={champ} value={nombre} onChange={(e) => setNombre(Math.min(20, Math.max(1, Number(e.target.value) || 1)))} /></div>
          </div>
          <HudButton action="new-project" compact label="Créer le code" busy={busy} busyLabel="Création…" onClick={() => void creer()} />
          {session.length > 0 && (
            <>
              <div style={{ ...etiquette, marginTop: 20 }}>Créés pendant cette session</div>
              <div style={{ display: 'grid', gap: 8 }}>{session.map((c) => <CarteCode key={c.code} c={c} />)}</div>
            </>
          )}
        </>
      ) : tous === null ? (
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>Chargement…</div>
      ) : tous.length === 0 ? (
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>Aucun code pour l’instant.</div>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>{tous.map((c) => <CarteCode key={c.code} c={c} />)}</div>
      )}
    </div>
  );
}
