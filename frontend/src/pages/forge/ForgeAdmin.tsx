import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HudButton } from '../../components/hud/HudButton';

// Admin page (FORGE_ADMIN_EMAILS): entry of the authority and spam signals, per member.
// Every other signal is collected by the server; this page only shows them.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type NomSignal = 'technique' | 'autorite' | 'spam' | 'contenu' | 'anciennete' | 'frequence';
type Signal = { valeur: number | null; source: string; collecte_at: string; raison?: string; saisi_par?: string };
type Membre = {
  user_id: string;
  email: string | null;
  url_site: string | null;
  niche: string | null;
  statut_membre: string | null;
  tier_abonnement: string | null;
  statut_score: 'en_attente' | 'calcule' | null;
  score: number | null;
  tier_forge: string | null;
  calcule_at: string | null;
  sources: Partial<Record<NomSignal, Signal>>;
};

const SIGNAUX: { nom: NomSignal; label: string; unite: string }[] = [
  { nom: 'technique', label: 'Technique', unite: '/100' },
  { nom: 'autorite', label: 'Autorité', unite: '/100' },
  { nom: 'spam', label: 'Spam', unite: '/100' },
  { nom: 'contenu', label: 'Contenu', unite: '/100' },
  { nom: 'anciennete', label: 'Âge', unite: ' ans' },
  { nom: 'frequence', label: 'Fréquence', unite: ' /mois' },
];

const dateCourte = (iso?: string | null) => (iso ? new Date(iso).toLocaleDateString('fr-CA') : '—');

const inputStyle = {
  width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)',
  padding: '9px 12px', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const,
};

function CarteMembre({ m, onChange }: { m: Membre; onChange: () => void }) {
  const [da, setDa] = useState(m.sources.autorite?.source === 'admin' ? String(m.sources.autorite.valeur ?? '') : '');
  const [spam, setSpam] = useState(m.sources.spam?.source === 'admin' ? String(m.sources.spam.valeur ?? '') : '');
  const [busy, setBusy] = useState<'save' | 'recalc' | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; texte: string } | null>(null);

  async function appeler(chemin: string, body?: Record<string, number>) {
    const res = await fetch(`${API_BASE}/api/forge/admin/trust-score/${encodeURIComponent(m.user_id)}${chemin}`, {
      method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body ?? {}),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
    return data;
  }

  async function enregistrer() {
    const body: Record<string, number> = {};
    if (da.trim() !== '') body.domainAuthority = Number(da);
    if (spam.trim() !== '') body.spamScore = Number(spam);
    if (!Object.keys(body).length) { setMessage({ ok: false, texte: 'Saisis l’autorité et/ou le spam (0 à 100).' }); return; }
    setBusy('save'); setMessage(null);
    try { await appeler('', body); setMessage({ ok: true, texte: 'Enregistré, score recalculé.' }); onChange(); }
    catch (e) { setMessage({ ok: false, texte: (e as Error).message }); }
    finally { setBusy(null); }
  }

  async function recalculer() {
    setBusy('recalc'); setMessage(null);
    try { await appeler('/recalculate'); setMessage({ ok: true, texte: 'Signaux recollectés.' }); onChange(); }
    catch (e) { setMessage({ ok: false, texte: (e as Error).message }); }
    finally { setBusy(null); }
  }

  const enAttente = m.statut_score !== 'calcule';
  return (
    <div className="nx-card" style={{ marginBottom: 14, borderColor: enAttente ? 'rgba(255,183,77,0.35)' : 'var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 15, wordBreak: 'break-all' }}>{m.url_site || '(aucun site)'}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', wordBreak: 'break-all' }}>
            {m.email || m.user_id} · {m.tier_abonnement || '—'}{m.niche ? ` · ${m.niche}` : ''}{m.statut_membre === 'suspendu' ? ' · suspendu' : ''}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {m.statut_score === 'calcule'
            ? <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--g)' }}>{m.score}<span style={{ fontSize: 12, color: 'var(--muted)' }}>/100 · {m.tier_forge}</span></div>
            : <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--warn)' }}>{m.statut_score === 'en_attente' ? 'En attente de vérification' : 'Jamais calculé'}</div>}
          <div style={{ fontSize: 11, color: 'var(--soft)' }}>Calculé le {dateCourte(m.calcule_at)}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8, marginBottom: 12 }}>
        {SIGNAUX.map(({ nom, label, unite }) => {
          const s = m.sources[nom];
          return (
            <div key={nom} style={{ background: 'var(--surface)', borderRadius: 'var(--r)', padding: '8px 10px', fontSize: 12 }}>
              <div style={{ color: 'var(--muted)' }}>{label}</div>
              <div style={{ fontWeight: 800 }}>{s?.valeur ?? '—'}{s?.valeur != null ? unite : ''}</div>
              <div style={{ color: 'var(--soft)', fontSize: 11 }}>
                {s ? `${s.source} · ${dateCourte(s.collecte_at)}${s.saisi_par ? ` · ${s.saisi_par}` : ''}` : 'aucune valeur'}
              </div>
              {s?.raison && <div style={{ color: 'var(--danger)', fontSize: 11 }}>{s.raison}</div>}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <label style={{ flex: '1 1 120px', fontSize: 12, color: 'var(--muted)' }}>
          Autorité (0–100)
          <input type="number" inputMode="numeric" min={0} max={100} value={da} onChange={(e) => setDa(e.target.value)} style={inputStyle} />
        </label>
        <label style={{ flex: '1 1 120px', fontSize: 12, color: 'var(--muted)' }}>
          Spam (0–100, 0 = propre)
          <input type="number" inputMode="numeric" min={0} max={100} value={spam} onChange={(e) => setSpam(e.target.value)} style={inputStyle} />
        </label>
        <HudButton action="save-recipe" compact label="Enregistrer" busy={busy === 'save'} disabled={busy !== null} onClick={enregistrer} />
        <HudButton action="continue" compact label="Recollecter" busyLabel="Collecte…" busy={busy === 'recalc'} disabled={busy !== null} onClick={recalculer} />
      </div>
      {message && <div style={{ marginTop: 8, fontSize: 12, color: message.ok ? 'var(--ok)' : 'var(--danger)' }}>{message.texte}</div>}
    </div>
  );
}

async function lireMembres(): Promise<{ membres?: Membre[]; erreur?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/forge/admin/trust-scores`, { credentials: 'include' });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) return { erreur: 'Connecte-toi pour accéder à l’administration.' };
    if (res.status === 403) return { erreur: 'Réservé aux administrateurs (FORGE_ADMIN_EMAILS).' };
    if (!res.ok) return { erreur: data.error || `Erreur ${res.status}` };
    return { membres: data.membres ?? [] };
  } catch {
    return { erreur: 'API injoignable.' };
  }
}

export default function ForgeAdmin() {
  const [membres, setMembres] = useState<Membre[] | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [filtre, setFiltre] = useState<'a_verifier' | 'tous'>('a_verifier');

  function appliquer(r: { membres?: Membre[]; erreur?: string }) {
    setErreur(r.erreur ?? null);
    if (r.membres) setMembres(r.membres);
  }
  const charger = () => { lireMembres().then(appliquer); };

  useEffect(() => {
    let actif = true;
    lireMembres().then((r) => { if (actif) appliquer(r); });
    return () => { actif = false; };
  }, []);

  const liste = (membres ?? []).filter((m) => filtre === 'tous' || m.statut_score !== 'calcule');
  const nbAVerifier = (membres ?? []).filter((m) => m.statut_score !== 'calcule').length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>
      <nav className="forge-subbar" style={{ borderBottom: '1px solid var(--border)', height: 56, display: 'flex', alignItems: 'center', background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100, gap: 10 }}>
        <Link to="/forge/dashboard" style={{ color: 'var(--muted)', fontSize: 13 }}>← Dashboard</Link>
        <span style={{ color: 'var(--soft)' }}>·</span>
        <span style={{ fontWeight: 900, fontSize: 15 }}>Admin · Trust Score</span>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px 80px' }}>
        {erreur ? (
          <div className="nx-card" style={{ textAlign: 'center', color: 'var(--muted)' }}>{erreur}</div>
        ) : membres === null ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60, fontSize: 14 }}>Chargement…</div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {([['a_verifier', `À vérifier (${nbAVerifier})`], ['tous', `Tous (${membres.length})`]] as const).map(([cle, label]) => (
                <button key={cle} type="button" onClick={() => setFiltre(cle)}
                  style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800, cursor: 'pointer',
                    border: '1px solid var(--border)', background: filtre === cle ? 'var(--g-dim)' : 'transparent', color: filtre === cle ? 'var(--g)' : 'var(--muted)' }}>
                  {label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--soft)', margin: '0 0 16px' }}>
              Technique, contenu, âge et fréquence sont collectés par le serveur. Saisis l’autorité et le spam après vérification manuelle : le score passe alors de « en attente » à calculé.
            </p>
            {liste.length === 0
              ? <div className="nx-card" style={{ textAlign: 'center', color: 'var(--muted)' }}>Aucun membre à vérifier.</div>
              : liste.map((m) => <CarteMembre key={m.user_id} m={m} onChange={charger} />)}
          </>
        )}
      </div>
    </div>
  );
}
