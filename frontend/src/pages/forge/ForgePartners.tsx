import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const NICHES = ['SEO','Marketing','IA','E-commerce','Dev Web','Business','Design','Finance','Santé','Éducation'];
const TIER_COLORS: Record<string,string> = { bronze:'#CD7F32', silver:'#A8A9AD', gold:'#FFD700', platinum:'#E5E4E2', diamond:'#B9F2FF' };
const TIER_ICONS: Record<string,string> = { bronze:'🥉', silver:'🥈', gold:'🥇', platinum:'⬡', diamond:'💎' };

export default function ForgePartners() {
  const [partenaires, setPartenaires] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nicheFilter, setNicheFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => { fetchPartenaires(); }, [nicheFilter, page]);

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
          <span style={{ fontWeight: 900, fontSize: 15 }}>Partenaires Forge</span>
        </div>
        <Link to="/forge/submit" className="nx-pill" style={{ padding: '7px 16px', fontSize: 13 }}>+ Soumettre</Link>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 32px 80px' }}>

        {/* POINTS EXPLAINER */}
        <div className="nx-card" style={{ marginBottom: 24, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[['🔗','Backlink reçu','+100 pts'],['⚒️','Backlink donné','+75 pts'],['✅','Soumission approuvée','+50 pts']].map(([icon,label,pts]) => (
            <div key={String(label)} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{label}</div>
                <div style={{ fontWeight: 800, color: 'var(--g)', fontSize: 13 }}>{pts}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTRES */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          <button onClick={() => { setNicheFilter(''); setPage(1); }} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', background: !nicheFilter ? 'var(--g)' : 'transparent', color: !nicheFilter ? '#07090f' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Tous</button>
          {NICHES.map(n => (
            <button key={n} onClick={() => { setNicheFilter(n); setPage(1); }} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', background: nicheFilter === n ? 'var(--g)' : 'transparent', color: nicheFilter === n ? '#07090f' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{n}</button>
          ))}
        </div>

        {/* LISTE */}
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60, fontSize: 14 }}>⚒️ Chargement des partenaires...</div>
        ) : partenaires.length === 0 ? (
          <div className="nx-card" style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
            <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 15 }}>Aucun partenaire dans cette niche</div>
            <Link to="/forge/submit" className="nx-pill" style={{ display: 'inline-block', marginTop: 16 }}>Soumettre mon site</Link>
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
                <div style={{ fontSize: 11, color: 'var(--soft)', whiteSpace: 'nowrap' }}>{new Date(p.created_at).toLocaleDateString('fr-CA')}</div>
              </div>
            ))}
          </div>
        )}

        {partenaires.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28 }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: page===1?'not-allowed':'pointer', opacity: page===1?0.4:1, fontSize: 13 }}>← Précédent</button>
            <span style={{ padding: '7px 14px', color: 'var(--muted)', fontSize: 13 }}>Page {page}</span>
            <button onClick={() => setPage(p => p+1)} disabled={partenaires.length<20} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: partenaires.length<20?'not-allowed':'pointer', opacity: partenaires.length<20?0.4:1, fontSize: 13 }}>Suivant →</button>
          </div>
        )}
      </div>
    </div>
  );
}
