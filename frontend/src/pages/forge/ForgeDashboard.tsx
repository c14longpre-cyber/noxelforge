import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TIER_COLORS: Record<string, string> = { bronze: '#CD7F32', silver: '#A8A9AD', gold: '#FFD700', platinum: '#E5E4E2', diamond: '#B9F2FF' };
const TIER_ICONS: Record<string, string> = { bronze: '🥉', silver: '🥈', gold: '🥇', platinum: '⬡', diamond: '💎' };

export default function ForgeDashboard() {
  const [statut, setStatut] = useState<any>(null);
  const [soumissions, setSoumissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyingBadge, setVerifyingBadge] = useState(false);
  const [badgeMsg, setBadgeMsg] = useState('');

  useEffect(() => { fetchDashboard(); }, []);

  async function fetchDashboard() {
    setLoading(true);
    try {
      const token = localStorage.getItem('supabase_token') || '';
      const headers = { Authorization: `Bearer ${token}` };
      const [s, r] = await Promise.all([
        fetch(`${API_BASE}/api/forge/members/status`, { headers }),
        fetch(`${API_BASE}/api/forge/submissions`, { headers }),
      ]);
      if (s.ok) setStatut(await s.json());
      if (r.ok) setSoumissions((await r.json()).soumissions ?? []);
    } catch {}
    finally { setLoading(false); }
  }

  async function verifierBadge() {
    setVerifyingBadge(true); setBadgeMsg('');
    try {
      const token = localStorage.getItem('supabase_token') || '';
      const res = await fetch(`${API_BASE}/api/forge/badges/verify`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setBadgeMsg(data.message);
      fetchDashboard();
    } catch { setBadgeMsg('Erreur vérification.'); }
    finally { setVerifyingBadge(false); }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 14 }}>
      ⚒️ Chargement du dashboard...
    </div>
  );

  if (!statut?.membre) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 48 }}>⚒️</div>
      <h2 style={{ fontWeight: 900, fontSize: 20 }}>Tu n'es pas encore membre de NOXEL Forge</h2>
      <Link to="/forge" className="nx-pill">Rejoindre Forge</Link>
    </div>
  );

  const { trust_score, points, badge, flux_actuel, etapes_manquantes } = statut;
  const tier = trust_score?.tier_forge ?? 'bronze';
  const tierColor = TIER_COLORS[tier];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/forge" style={{ color: 'var(--muted)', fontSize: 13 }}>← Forge</Link>
          <span style={{ color: 'var(--soft)', margin: '0 4px' }}>·</span>
          <span style={{ fontWeight: 900, fontSize: 15 }}>Dashboard</span>
        </div>
        <Link to="/forge/submit" className="nx-pill" style={{ padding: '7px 16px', fontSize: 13 }}>+ Soumettre</Link>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 32px 80px' }}>

        {/* ÉTAPES MANQUANTES */}
        {etapes_manquantes?.length > 0 && (
          <div className="nx-card" style={{ marginBottom: 24, borderColor: 'rgba(255,183,77,0.3)', background: 'rgba(255,183,77,0.06)' }}>
            <div style={{ fontWeight: 800, marginBottom: 10, color: 'var(--warn)', fontSize: 13 }}>⚠️ Actions requises pour débloquer la soumission</div>
            {etapes_manquantes.map((e: string) => (
              <div key={e} style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 4 }}>→ {e}</div>
            ))}
          </div>
        )}

        {/* STATS CARDS */}
        <div className="nx-grid nx-grid--4" style={{ marginBottom: 24 }}>

          {/* Trust Score */}
          <div className="nx-card" style={{ borderColor: `${tierColor}44` }}>
            <div className="nx-kicker" style={{ marginBottom: 8 }}>Trust Score</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: tierColor, lineHeight: 1 }}>{trust_score?.score ?? 0}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>/100</div>
            <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, background: `${tierColor}22`, borderRadius: 20, padding: '3px 10px' }}>
              <span style={{ fontSize: 12 }}>{TIER_ICONS[tier]}</span>
              <span style={{ color: tierColor, fontWeight: 800, fontSize: 11, textTransform: 'uppercase' }}>{tier}</span>
            </div>
          </div>

          {/* Forge Points */}
          <div className="nx-card">
            <div className="nx-kicker" style={{ marginBottom: 8 }}>Forge Points</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--g)', lineHeight: 1 }}>{points?.solde ?? 0}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>pts disponibles</div>
            <div style={{ marginTop: 10, fontSize: 11, color: 'var(--soft)' }}>Total gagné : {points?.total_gagne ?? 0} pts</div>
          </div>

          {/* Flux */}
          <div className="nx-card">
            <div className="nx-kicker" style={{ marginBottom: 8 }}>Flux soumission</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: flux_actuel === 'auto_share' ? 'var(--ok)' : flux_actuel === 'alfred' ? 'var(--p)' : 'var(--danger)', lineHeight: 1 }}>
              {flux_actuel === 'auto_share' ? '⚡ Auto' : flux_actuel === 'alfred' ? '🤵 Alfred' : '🔒 Bloqué'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
              {flux_actuel === 'auto_share' ? 'Publication immédiate' : flux_actuel === 'alfred' ? 'Filtrage Alfred actif' : 'Complète les étapes ci-dessus'}
            </div>
          </div>

          {/* Badge */}
          <div className="nx-card">
            <div className="nx-kicker" style={{ marginBottom: 8 }}>Badge NOXEL</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: badge?.statut === 'verifie' ? 'var(--ok)' : badge?.statut === 'grace' ? 'var(--warn)' : 'var(--danger)', lineHeight: 1 }}>
              {badge?.statut === 'verifie' ? '✅ Vérifié' : badge?.statut === 'grace' ? '⚠️ Grâce' : '❌ Absent'}
            </div>
            <button onClick={verifierBadge} disabled={verifyingBadge} style={{ marginTop: 10, background: 'var(--g-dim)', color: 'var(--g)', border: '1px solid var(--g-border)', borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontSize: 11, fontWeight: 700 }}>
              {verifyingBadge ? 'Vérification...' : 'Vérifier badge'}
            </button>
            {badgeMsg && <div style={{ marginTop: 6, fontSize: 11, color: 'var(--muted)' }}>{badgeMsg}</div>}
          </div>
        </div>

        {/* TRUST SCORE DÉTAIL */}
        {trust_score && (
          <div className="nx-card" style={{ marginBottom: 24 }}>
            <div className="nx-kicker" style={{ marginBottom: 16 }}>Détail Trust Score Forge™</div>
            <div className="nx-grid nx-grid--3">
              {[
                { label: 'Technique',  val: trust_score.signal_technique,  max: 25 },
                { label: 'Autorité',   val: trust_score.signal_autorite,   max: 25 },
                { label: 'Spam',       val: trust_score.signal_spam,       max: 20 },
                { label: 'Contenu',    val: trust_score.signal_contenu,    max: 15 },
                { label: 'Ancienneté', val: trust_score.signal_anciennete, max: 10 },
                { label: 'Fréquence',  val: trust_score.signal_frequence,  max: 5  },
              ].map(({ label, val, max }) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: 'var(--muted)' }}>{label}</span>
                    <span style={{ color: 'var(--text)', fontWeight: 700 }}>{val}/{max}</span>
                  </div>
                  <div style={{ background: 'var(--surface2)', borderRadius: 4, height: 5 }}>
                    <div style={{ background: tierColor, borderRadius: 4, height: 5, width: `${(val/max)*100}%`, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SOUMISSIONS */}
        <div className="nx-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div className="nx-kicker">Mes soumissions</div>
            <Link to="/forge/submit" style={{ fontSize: 12, color: 'var(--g)', fontWeight: 700 }}>+ Nouvelle →</Link>
          </div>
          {soumissions.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px 0', fontSize: 13 }}>
              Aucune soumission encore. <Link to="/forge/submit" style={{ color: 'var(--g)' }}>Soumettre mon premier site →</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {soumissions.map((s: any) => (
                <div key={s.id} style={{ background: 'var(--surface)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, border: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{s.titre}</div>
                    <a href={s.url_soumise} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--g)', fontSize: 11 }}>{s.url_soumise}</a>
                  </div>
                  <span style={{ background: s.statut === 'approuve' || s.statut === 'auto_share' ? 'var(--g-dim)' : s.statut === 'pending' ? 'rgba(255,183,77,0.12)' : 'rgba(255,92,122,0.12)', color: s.statut === 'approuve' || s.statut === 'auto_share' ? 'var(--ok)' : s.statut === 'pending' ? 'var(--warn)' : 'var(--danger)', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>
                    {s.statut === 'auto_share' ? '⚡ Publié' : s.statut === 'approuve' ? '✅ Approuvé' : s.statut === 'pending' ? '⏳ En analyse' : '❌ Rejeté'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
