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
    <div style={{ minHeight:'100vh', background:'#0a0a0f', color:'#f0f0f0', fontFamily:'Inter, sans-serif' }}>
      <div style={{ background:'#0f0a1f', borderBottom:'1px solid #1a1a2e', padding:'20px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div>
            <div style={{ fontSize:'0.8rem', color:'#666' }}>⚒️ NOXEL Forge™</div>
            <h1 style={{ margin:0, fontSize:'1.3rem', fontWeight:800 }}>Partenaires Forge</h1>
          </div>
          <Link to="/forge/submit" style={{ background:'linear-gradient(135deg,#7c6af7,#6d28d9)', color:'#fff', padding:'10px 20px', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:'0.9rem' }}>+ Soumettre mon site</Link>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'32px 24px' }}>
        <div style={{ background:'#111', border:'1px solid #1a1a2e', borderRadius:12, padding:'20px 24px', marginBottom:28, display:'flex', gap:32, flexWrap:'wrap' }}>
          {[['🔗','Backlink reçu','+100 pts'],['⚒️','Backlink donné','+75 pts'],['✅','Soumission approuvée','+50 pts']].map(([icon,label,pts]) => (
            <div key={String(label)} style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:22 }}>{icon}</span>
              <div>
                <div style={{ fontSize:'0.82rem', color:'#888' }}>{label}</div>
                <div style={{ fontWeight:700, color:'#7c6af7', fontSize:'0.95rem' }}>{pts}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
          <button onClick={() => { setNicheFilter(''); setPage(1); }} style={{ background:!nicheFilter?'#7c6af7':'#1a1a2e', color:'#fff', border:'none', borderRadius:8, padding:'6px 14px', cursor:'pointer', fontSize:'0.82rem' }}>Tous</button>
          {NICHES.map(n => <button key={n} onClick={() => { setNicheFilter(n); setPage(1); }} style={{ background:nicheFilter===n?'#7c6af7':'#1a1a2e', color:'#fff', border:'none', borderRadius:8, padding:'6px 14px', cursor:'pointer', fontSize:'0.82rem' }}>{n}</button>)}
        </div>

        {loading ? (
          <div style={{ textAlign:'center', color:'#666', padding:60 }}>⚒️ Chargement des partenaires...</div>
        ) : partenaires.length === 0 ? (
          <div style={{ textAlign:'center', color:'#666', padding:60, border:'1px dashed #1a1a2e', borderRadius:12 }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🤝</div>
            <div style={{ fontWeight:600, marginBottom:8 }}>Aucun partenaire dans cette niche</div>
            <Link to="/forge/submit" style={{ background:'#7c6af7', color:'#fff', padding:'10px 20px', borderRadius:8, textDecoration:'none', fontWeight:600, display:'inline-block', marginTop:12 }}>Soumettre mon site</Link>
          </div>
        ) : (
          <div style={{ display:'grid', gap:12 }}>
            {partenaires.map((p:any) => (
              <div key={p.id} style={{ background:'#111', border:'1px solid #1a1a2e', borderRadius:12, padding:'20px 24px', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8, flexWrap:'wrap' }}>
                    {p.niche && <span style={{ background:'#1a1a2e', color:'#7c6af7', fontSize:'0.75rem', padding:'3px 10px', borderRadius:20, fontWeight:600 }}>{p.niche}</span>}
                    {p.forge_trust_scores?.tier_forge && <span style={{ background:`${TIER_COLORS[p.forge_trust_scores.tier_forge]}22`, color:TIER_COLORS[p.forge_trust_scores.tier_forge], fontSize:'0.75rem', padding:'3px 10px', borderRadius:20, fontWeight:700 }}>{TIER_ICONS[p.forge_trust_scores.tier_forge]} {p.forge_trust_scores.tier_forge?.toUpperCase()} · {p.forge_trust_scores.score}/100</span>}
                  </div>
                  <h3 style={{ margin:'0 0 6px', fontSize:'1rem', fontWeight:700 }}>{p.titre}</h3>
                  <p style={{ margin:'0 0 10px', color:'#888', fontSize:'0.85rem', lineHeight:1.5 }}>{p.description}</p>
                  <a href={p.url_soumise} target="_blank" rel="noopener noreferrer" style={{ color:'#7c6af7', fontSize:'0.82rem', textDecoration:'none' }}>{p.url_soumise} ↗</a>
                </div>
                <div style={{ fontSize:'0.75rem', color:'#555' }}>{new Date(p.created_at).toLocaleDateString('fr-CA')}</div>
              </div>
            ))}
          </div>
        )}

        {partenaires.length > 0 && (
          <div style={{ display:'flex', justifyContent:'center', gap:12, marginTop:32 }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} style={{ background:'#1a1a2e', color:'#fff', border:'none', borderRadius:8, padding:'8px 18px', cursor:page===1?'not-allowed':'pointer', opacity:page===1?0.4:1 }}>← Précédent</button>
            <span style={{ padding:'8px 16px', color:'#666', fontSize:'0.85rem' }}>Page {page}</span>
            <button onClick={() => setPage(p => p+1)} disabled={partenaires.length<20} style={{ background:'#1a1a2e', color:'#fff', border:'none', borderRadius:8, padding:'8px 18px', cursor:partenaires.length<20?'not-allowed':'pointer', opacity:partenaires.length<20?0.4:1 }}>Suivant →</button>
          </div>
        )}
      </div>
    </div>
  );
}
