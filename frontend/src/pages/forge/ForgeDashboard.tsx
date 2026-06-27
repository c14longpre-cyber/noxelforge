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

  if (loading) return <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>⚒️ Chargement...</div>;

  if (!statut?.membre) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, color: '#f0f0f0' }}>
      <div style={{ fontSize: 48 }}>⚒️</div>
      <h2>Tu n'es pas encore membre de NOXEL Forge</h2>
      <Link to="/forge" style={{ background: '#7c6af7', color: '#fff', padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontWeight: 700 }}>Rejoindre Forge</Link>
    </div>
  );

  const { trust_score, points, badge, flux_actuel, etapes_manquantes } = statut;
  const tier = trust_score?.tier_forge ?? 'bronze';
  const tierColor = TIER_COLORS[tier];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#f0f0f0', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#0f0a1f', borderBottom: '1px solid #1a1a2e', padding: '20px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: 4 }}>⚒️ NOXEL Forge™</div>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Mon Dashboard</h1>
          </div>
          <Link to="/forge/submit" style={{ background: 'linear-gradient(135deg,#7c6af7,#6d28d9)', color: '#fff', padding: '10px 20px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>+ Soumettre un site</Link>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {etapes_manquantes?.length > 0 && (
          <div style={{ background: '#1a0f00', border: '1px solid #7c6af733', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>⚠️ Actions requises pour débloquer la soumission</div>
            {etapes_manquantes.map((e: string) => <div key={e} style={{ color: '#888', fontSize: '0.9rem', marginBottom: 6 }}>→ {e}</div>)}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#111', border: `1px solid ${tierColor}44`, borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: '0.78rem', color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Trust Score</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: tierColor, lineHeight: 1 }}>{trust_score?.score ?? 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 4 }}>/100</div>
            <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, background: `${tierColor}22`, borderRadius: 20, padding: '4px 12px' }}>
              <span>{TIER_ICONS[tier]}</span>
              <span style={{ color: tierColor, fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>{tier}</span>
            </div>
          </div>

          <div style={{ background: '#111', border: '1px solid #1a1a2e', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: '0.78rem', color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Forge Points</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#7c6af7', lineHeight: 1 }}>{points?.solde ?? 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: 4 }}>pts disponibles</div>
            <div style={{ marginTop: 10, fontSize: '0.78rem', color: '#555' }}>Total gagné : {points?.total_gagne ?? 0} pts</div>
          </div>

          <div style={{ background: '#111', border: '1px solid #1a1a2e', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: '0.78rem', color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Flux soumission</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: flux_actuel === 'auto_share' ? '#10b981' : flux_actuel === 'alfred' ? '#7c6af7' : '#ef4444', lineHeight: 1 }}>
              {flux_actuel === 'auto_share' ? '⚡ Auto' : flux_actuel === 'alfred' ? '🤵 Alfred' : '🔒 Bloqué'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#555', marginTop: 8 }}>
              {flux_actuel === 'auto_share' ? 'Publication immédiate' : flux_actuel === 'alfred' ? 'Filtrage Alfred actif' : 'Complète les étapes'}
            </div>
          </div>

          <div style={{ background: '#111', border: '1px solid #1a1a2e', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: '0.78rem', color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Badge NOXEL</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: badge?.statut === 'verifie' ? '#10b981' : '#ef4444', lineHeight: 1 }}>
              {badge?.statut === 'verifie' ? '✅ Vérifié' : badge?.statut === 'grace' ? '⚠️ Grâce' : '❌ Absent'}
            </div>
            <button onClick={verifierBadge} disabled={verifyingBadge} style={{ marginTop: 12, background: '#1a1a2e', color: '#7c6af7', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>
              {verifyingBadge ? 'Vérification...' : 'Vérifier badge'}
            </button>
            {badgeMsg && <div style={{ marginTop: 8, fontSize: '0.75rem', color: '#888' }}>{badgeMsg}</div>}
          </div>
        </div>

        {trust_score && (
          <div style={{ background: '#111', border: '1px solid #1a1a2e', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700 }}>Détail Trust Score Forge™</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16 }}>
              {[{label:'Technique',val:trust_score.signal_technique,max:25},{label:'Autorité',val:trust_score.signal_autorite,max:25},{label:'Spam',val:trust_score.signal_spam,max:20},{label:'Contenu',val:trust_score.signal_contenu,max:15},{label:'Ancienneté',val:trust_score.signal_anciennete,max:10},{label:'Fréquence',val:trust_score.signal_frequence,max:5}].map(({label,val,max}) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.8rem' }}>
                    <span style={{ color: '#888' }}>{label}</span>
                    <span style={{ color: '#f0f0f0', fontWeight: 700 }}>{val}/{max}</span>
                  </div>
                  <div style={{ background: '#1a1a2e', borderRadius: 4, height: 6 }}>
                    <div style={{ background: tierColor, borderRadius: 4, height: 6, width: `${(val/max)*100}%`, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>Mes soumissions</h3>
          {soumissions.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#555', padding: '40px', border: '1px dashed #1a1a2e', borderRadius: 12, fontSize: '0.85rem' }}>
              Aucune soumission encore. <Link to="/forge/submit" style={{ color: '#7c6af7' }}>Soumettre mon premier site →</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {soumissions.map((s: any) => (
                <div key={s.id} style={{ background: '#111', border: '1px solid #1a1a2e', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{s.titre}</div>
                    <a href={s.url_soumise} target="_blank" rel="noopener noreferrer" style={{ color: '#7c6af7', fontSize: '0.8rem', textDecoration: 'none' }}>{s.url_soumise}</a>
                  </div>
                  <span style={{ background: s.statut === 'approuve' || s.statut === 'auto_share' ? '#10b98122' : s.statut === 'pending' ? '#f59e0b22' : '#ef444422', color: s.statut === 'approuve' || s.statut === 'auto_share' ? '#10b981' : s.statut === 'pending' ? '#f59e0b' : '#ef4444', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>
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
