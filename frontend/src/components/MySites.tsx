// NOXEL FORGE — "My sites": several sites per account (limit per plan: Bronze 1, Silver 1, Gold 3, Platinum 10, Diamond 25).
// The first site comes from the member record; the others are added here and each proves its own domain.
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HudButton } from './hud/HudButton';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

type Site = {
  domaine: string; url_site: string; niche: string | null; principal: boolean; verifie: boolean;
  instructions: { meta: string; fichier: { url: string; contenu: string }; dns: { nom: string; valeur: string } } | null;
};

const NICHES = ['SEO', 'Marketing', 'AI', 'E-commerce', 'Web Dev', 'Business', 'Design', 'Finance', 'Health', 'Education', 'Other'];

const T = {
  fr: {
    title: 'Mes sites', of: (n: number, l: number) => `${n} sur ${l}`,
    intro: 'Chaque site prouve son domaine avec sa propre balise. Tu peux ensuite soumettre des pages de n’importe quel site vérifié.',
    first: 'site principal', verified: 'Vérifié', unverified: 'À prouver', verify: 'Vérifier', verifying: 'Vérification…', remove: 'Retirer',
    confirmRemove: (d: string) => `Retirer ${d} de tes sites ?`,
    proof: 'Ajoute une de ces preuves, puis clique sur Vérifier :', meta: 'Balise dans le <head> de l’accueil', file: 'Ou un fichier', dns: 'Ou un enregistrement DNS TXT',
    add: 'Ajouter un site', url: 'https://autresite.com', niche: 'Niche', otherPh: 'Précise ta niche', adding: 'Ajout…',
    full: (l: number) => `Ton forfait permet ${l} site${l > 1 ? 's' : ''}.`, upgrade: 'Voir les forfaits →',
    rules: 'Règles du réseau', notVerified: 'Pas encore vérifié : ',
  },
  en: {
    title: 'My sites', of: (n: number, l: number) => `${n} of ${l}`,
    intro: 'Each site proves its domain with its own tag. You can then submit pages from any verified site.',
    first: 'main site', verified: 'Verified', unverified: 'To prove', verify: 'Verify', verifying: 'Verifying…', remove: 'Remove',
    confirmRemove: (d: string) => `Remove ${d} from your sites?`,
    proof: 'Add one of these proofs, then click Verify:', meta: 'Tag in the <head> of the home page', file: 'Or a file', dns: 'Or a DNS TXT record',
    add: 'Add a site', url: 'https://othersite.com', niche: 'Niche', otherPh: 'Specify your niche', adding: 'Adding…',
    full: (l: number) => `Your plan allows ${l} site${l === 1 ? '' : 's'}.`, upgrade: 'See the plans →',
    rules: 'Network guidelines', notVerified: 'Not verified yet: ',
  },
};

const input: React.CSSProperties = { width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '10px 12px', color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box' };
const code: React.CSSProperties = { display: 'block', fontSize: 11, padding: '6px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', margin: '3px 0 8px', wordBreak: 'break-all' };

export default function MySites({ onChange }: { onChange?: () => void }) {
  const t = (navigator.language || 'en').toLowerCase().startsWith('fr') ? T.fr : T.en;
  const [sites, setSites] = useState<Site[]>([]);
  const [limite, setLimite] = useState(1);
  const [url, setUrl] = useState('');
  const [niche, setNiche] = useState('');
  const [autre, setAutre] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const charger = useCallback(async () => {
    try {
      const r = await fetch(`${API_BASE}/api/forge/sites`, { credentials: 'include' });
      const d = await r.json();
      if (d.ok) { setSites(d.sites ?? []); setLimite(d.limite ?? 1); }
    } catch { /* the dashboard still works without this block */ }
  }, []);
  useEffect(() => {
    let vivant = true;
    fetch(`${API_BASE}/api/forge/sites`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (vivant && d.ok) { setSites(d.sites ?? []); setLimite(d.limite ?? 1); } })
      .catch(() => { /* the dashboard still works without this block */ });
    return () => { vivant = false; };
  }, []);

  async function ajouter() {
    if (!url.trim()) return;
    if (niche === 'Other' && !autre.trim()) { setMessage({ ok: false, text: t.otherPh }); return; }
    setBusy('add'); setMessage(null);
    try {
      const r = await fetch(`${API_BASE}/api/forge/sites`, {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url_site: url.trim(), niche: niche === 'Other' ? `Other: ${autre.trim().slice(0, 60)}` : niche || null }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) { setMessage({ ok: false, text: d.error ?? 'Erreur' }); return; }
      setUrl(''); setNiche(''); setAutre(''); await charger(); onChange?.();
    } finally { setBusy(null); }
  }

  async function verifier(domaine: string) {
    setBusy(domaine); setMessage(null);
    try {
      const r = await fetch(`${API_BASE}/api/forge/sites/verify`, {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ domaine }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) setMessage({ ok: false, text: d.error ?? 'Erreur' });
      else if (!d.verifie) setMessage({ ok: false, text: t.notVerified + (d.raison ?? '') });
      else { setMessage({ ok: true, text: `✓ ${domaine}` }); await charger(); onChange?.(); }
    } finally { setBusy(null); }
  }

  async function retirer(domaine: string) {
    if (!window.confirm(t.confirmRemove(domaine))) return;
    setBusy(domaine);
    try {
      await fetch(`${API_BASE}/api/forge/sites/${encodeURIComponent(domaine)}`, { method: 'DELETE', credentials: 'include' });
      await charger(); onChange?.();
    } finally { setBusy(null); }
  }

  if (sites.length === 0) return null;
  const plein = sites.length >= limite;

  return (
    <div className="nx-card" style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--g)' }}>{t.title}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.of(sites.length, limite)}</div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>{t.intro}</div>

      <div style={{ display: 'grid', gap: 8 }}>
        {sites.map((s) => (
          <div key={s.domaine} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', background: 'var(--surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div>
                <a href={s.url_site} target="_blank" rel="noopener" style={{ color: 'var(--text)', fontWeight: 700, fontSize: 13 }}>{s.domaine}</a>
                {s.principal && <span style={{ fontSize: 11, color: 'var(--muted)' }}> · {t.first}</span>}
                {s.niche && <span style={{ fontSize: 11, color: 'var(--muted)' }}> · {s.niche.replace(/^Other:\s*/, '')}</span>}
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: s.verifie ? 'var(--ok)' : 'var(--warn)' }}>{s.verifie ? `✓ ${t.verified}` : t.unverified}</span>
                {!s.principal && !s.verifie && (
                  <button type="button" onClick={() => void verifier(s.domaine)} disabled={busy !== null}
                    style={{ background: 'none', border: '1px solid var(--g-border)', borderRadius: 8, color: 'var(--g)', padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>
                    {busy === s.domaine ? t.verifying : t.verify}
                  </button>
                )}
                {!s.principal && (
                  <button type="button" onClick={() => void retirer(s.domaine)} disabled={busy !== null}
                    style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 12, cursor: 'pointer' }}>{t.remove}</button>
                )}
              </div>
            </div>
            {!s.principal && !s.verifie && s.instructions && (
              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--muted)' }}>
                {t.proof}
                <div style={{ marginTop: 6 }}>{t.meta}</div><code style={code}>{s.instructions.meta}</code>
                <div>{t.file} {s.instructions.fichier.url}</div><code style={code}>{s.instructions.fichier.contenu}</code>
                <div>{t.dns} ({s.instructions.dns.nom})</div><code style={code}>{s.instructions.dns.valeur}</code>
              </div>
            )}
          </div>
        ))}
      </div>

      {message && <div style={{ marginTop: 10, fontSize: 12, color: message.ok ? 'var(--ok)' : 'var(--danger)' }}>{message.text}</div>}

      {plein ? (
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)' }}>
          {t.full(limite)} <Link to="/forge/pricing" style={{ color: 'var(--g)' }}>{t.upgrade}</Link>
        </div>
      ) : (
        <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.add}</div>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t.url} style={input} />
          <select value={niche} onChange={(e) => setNiche(e.target.value)} className="forge-niche-select" style={{ ...input, color: niche ? 'var(--text)' : 'var(--soft)' }}>
            <option value="">{t.niche}</option>
            {NICHES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          {niche === 'Other' && (
            <>
              <input value={autre} onChange={(e) => setAutre(e.target.value)} maxLength={60} placeholder={t.otherPh} style={input} />
              <Link to="/forge/guidelines" target="_blank" rel="noopener" style={{ fontSize: 12, color: 'var(--g)' }}>⚠ {t.rules} →</Link>
            </>
          )}
          <div><HudButton action="new-project" compact label={t.add} busy={busy === 'add'} busyLabel={t.adding} onClick={() => void ajouter()} /></div>
        </div>
      )}
    </div>
  );
}
