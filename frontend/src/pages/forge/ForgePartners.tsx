import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const NICHES = ['SEO','Marketing','AI','E-commerce','Web Dev','Business','Design','Finance','Health','Education'];
const TIER_COLORS: Record<string,string> = { bronze:'#CD7F32', silver:'#A8A9AD', gold:'#FFD700', platinum:'#E5E4E2', diamond:'#B9F2FF' };
const TIER_ICONS: Record<string,string> = { bronze:'🥉', silver:'🥈', gold:'🥇', platinum:'⬡', diamond:'💎' };

export default function ForgePartners() {
  const [partenaires, setPartenaires] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nicheFilter, setNicheFilter] = useState('');
  const [page, setPage] = useState(1);
  const [recommandations, setRecommandations] = useState<any[]>([]);
  const [loadingReco, setLoadingReco] = useState(true);

  useEffect(() => { fetchPartenaires(); }, [nicheFilter, page]);
  useEffect(() => { fetchRecommandations(); }, []);

  async function fetchRecommandations() {
    setLoadingReco(true);
    try {
      const token = localStorage.getItem('supabase_token') || '';
      const res = await fetch(`${API_BASE}/api/forge/matchmaking/suggestions?limit=6`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRecommandations(data.suggestions ?? []);
      }
    } catch { setRecommandations([]); }
    finally { setLoadingReco(false); }
  }

  async function fetchPartenaires() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (nicheFilter) params.append('niche', nicheFilter);
      const res = await fetch(`${API_BASE}/api/forge/submissions/annuaire?${params}`);
      const data = await res.json();
      setPartenaires(data.annuaire ?? []);
    } catch { setPartenaires([]); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/forge" style={{ color: 'var(--muted)', fontSize: 13 }}>← Forge</Link>
          <span style={{ color: 'var(--soft)' }}>·</span>
          <span style={{ fontWeight: 900, fontSize: 15 }}>Forge Partners</span>
        </div>
        <Link to="/forge/submit" className="nx-pill" style={{ padding: '7px 16px', fontSize: 13 }}>+ Submit</Link>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 32px 80px' }}>
        <div className="nx-card" style={{ marginBottom: 24, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[['🔗','Backlink received','+100 pts'],['','Backlink given','+75 pts'],['✅','Submission approved','+50 pts']].map(([icon,label,pts]) => (
            <div key={String(label)} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{label}</div>
                <div style={{ fontWeight: 800, color: 'var(--g)', fontSize: 13 }}>{pts}</div>
              </div>
            </div>
          ))}
        </div>

        {(loadingReco || recommandations.length > 0) && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>🎯</span>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 900 }}>Recommended for you</h2>
            </div>
            {loadingReco ? (
              <div style={{ color: 'var(--muted)', fontSize: 13, padding: '20px 0' }}>Calculating best matches...</div>
            ) : (
              <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {recommandations.map((r: any) => (
                  <div key={r.user_id} className="nx-card" style={{ padding: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        {r.niche && <span style={{ background: 'var(--g-dim)', color: 'var(--g)', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{r.niche}</span>}
                        <span style={{ background: `${TIER_COLORS[r.trust_tier]}22`, color: TIER_COLORS[r.trust_tier], fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 800 }}>
                          {TIER_ICONS[r.trust_tier]} {r.trust_score}/100
                        </span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 900, color: 'var(--g)' }}>{r.score_matchmaking}% match</span>
                    </div>
                    <a href={r.url_site} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>{r.url_site} ↗</a>
                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: 11, lineHeight: 1.5 }}>{r.raison}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          <button onClick={() => { setNicheFilter(''); setPage(1); }} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', background: !nicheFilter ? 'var(--g)' : 'transparent', color: !nicheFilter ? '#07090f' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>All</button>
          {NICHES.map(n => (
            <button key={n} onClick={() => { setNicheFilter(n); setPage(1); }} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', background: nicheFilter === n ? 'var(--g)' : 'transparent', color: nicheFilter === n ? '#07090f' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{n}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60, fontSize: 14 }}>Loading partners...</div>
        ) : partenaires.length === 0 ? (
          <div className="nx-card" style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
            <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 15 }}>No partners in this niche yet</div>
            <Link to="/forge/submit" className="nx-pill" style={{ display: 'inline-block', marginTop: 16 }}>Submit my site</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {partenaires.map((p: any) => (
              <div key={p.id} className="nx-card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    {p.niche && <span style={{ background: 'var(--g-dim)', color: 'var(--g)', fontSize: 11, padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>{p.niche}</span>}
                    {p.forge_trust_scores?.tier_forge && (
                      <span style={{ background: `${TIER_COLORS[p.forge_trust_scores.tier_forge]}22`, color: TIER_COLORS[p.forge_trust_scores.tier_forge], fontSize: 11, padding: '2px 10px', borderRadius: 20, fontWeight: 800 }}>
                        {TIER_ICONS[p.forge_trust_scores.tier_forge]} {p.forge_trust_scores.tier_forge?.toUpperCase()} · {p.forge_trust_scores.score}/100
                      </span>
                    )}
                  </div>
                  <h3 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 800 }}>{p.titre}</h3>
                  <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: 13, lineHeight: 1.5 }}>{p.description}</p>
                  <a href={p.url_soumise} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--g)', fontSize: 12 }}>{p.url_soumise} ↗</a>
                </div>
                <div style={{ fontSize: 11, color: 'var(--soft)', whiteSpace: 'nowrap' }}>{new Date(p.created_at).toLocaleDateString('en-CA')}</div>
              </div>
            ))}
          </div>
        )}

        {partenaires.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28 }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: page===1?'not-allowed':'pointer', opacity: page===1?0.4:1, fontSize: 13 }}>← Previous</button>
            <span style={{ padding: '7px 14px', color: 'var(--muted)', fontSize: 13 }}>Page {page}</span>
            <button onClick={() => setPage(p => p+1)} disabled={partenaires.length<20} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: partenaires.length<20?'not-allowed':'pointer', opacity: partenaires.length<20?0.4:1, fontSize: 13 }}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}

