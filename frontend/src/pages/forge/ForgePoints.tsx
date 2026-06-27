import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const REWARDS = [
  { pts:100, label:'Scan NOXEL SEO supplémentaire', icon:'🔍' },
  { pts:200, label:'Rapport PDF premium', icon:'📄' },
  { pts:300, label:'Badge Forge Exclusif', icon:'🏆' },
  { pts:500, label:'Accès partenaires Diamond', icon:'💎' },
];

const EARN_RULES = [
  { action:'Soumission approuvée', pts:50, icon:'✅' },
  { action:'Backlink reçu confirmé', pts:100, icon:'🔗' },
  { action:'Backlink donné', pts:75, icon:'🤝' },
  { action:'Badge vérifié installé', pts:25, icon:'🛡️' },
  { action:'Scan NOXEL SEO complété', pts:10, icon:'🔍' },
];

export default function ForgePoints() {
  const [points, setPoints] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPoints(); }, []);

  async function fetchPoints() {
    setLoading(true);
    try {
      const token = localStorage.getItem('supabase_token') || '';
      const res = await fetch(`${API_BASE}/api/forge/members/status`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { const data = await res.json(); setPoints(data.points); }
    } catch {}
    finally { setLoading(false); }
  }

  const historique: any[] = points?.historique ?? [];

  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0f', color:'#f0f0f0', fontFamily:'Inter, sans-serif' }}>
      <div style={{ background:'#0f0a1f', borderBottom:'1px solid #1a1a2e', padding:'20px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div>
            <div style={{ fontSize:'0.8rem', color:'#666' }}>⚒️ NOXEL Forge™</div>
            <h1 style={{ margin:0, fontSize:'1.3rem', fontWeight:800 }}>Forge Points</h1>
          </div>
          <Link to="/forge/dashboard" style={{ color:'#7c6af7', textDecoration:'none', fontSize:'0.85rem', fontWeight:600 }}>← Dashboard</Link>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'32px 24px' }}>
        {loading ? (
          <div style={{ textAlign:'center', color:'#666', padding:60 }}>⚒️ Chargement...</div>
        ) : (
          <>
            <div style={{ background:'linear-gradient(135deg,#0f0a1f,#1a0a2e)', border:'1px solid #7c6af733', borderRadius:16, padding:'36px', textAlign:'center', marginBottom:32 }}>
              <div style={{ fontSize:'0.85rem', color:'#666', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.08em' }}>Solde disponible</div>
              <div style={{ fontSize:'4rem', fontWeight:900, color:'#7c6af7', lineHeight:1, marginBottom:8 }}>{points?.solde ?? 0}</div>
              <div style={{ fontSize:'1rem', color:'#888' }}>Forge Points</div>
              <div style={{ display:'flex', gap:32, justifyContent:'center', marginTop:24, flexWrap:'wrap' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'1.4rem', fontWeight:800, color:'#10b981' }}>{points?.total_gagne ?? 0}</div>
                  <div style={{ fontSize:'0.78rem', color:'#555' }}>Total gagné</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:'1.4rem', fontWeight:800, color:'#ef4444' }}>{points?.total_depense ?? 0}</div>
                  <div style={{ fontSize:'0.78rem', color:'#555' }}>Total dépensé</div>
                </div>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:24, marginBottom:32 }}>
              <div style={{ background:'#111', border:'1px solid #1a1a2e', borderRadius:12, padding:'24px' }}>
                <h3 style={{ margin:'0 0 16px', fontSize:'1rem', fontWeight:700 }}>⚒️ Comment gagner des points</h3>
                <div style={{ display:'grid', gap:10 }}>
                  {EARN_RULES.map(({action,pts,icon}) => (
                    <div key={action} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'#0f0f0f', borderRadius:8 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:18 }}>{icon}</span>
                        <span style={{ fontSize:'0.85rem', color:'#ccc' }}>{action}</span>
                      </div>
                      <span style={{ color:'#10b981', fontWeight:700, fontSize:'0.9rem' }}>+{pts} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background:'#111', border:'1px solid #1a1a2e', borderRadius:12, padding:'24px' }}>
                <h3 style={{ margin:'0 0 16px', fontSize:'1rem', fontWeight:700 }}>🎁 Dépenser tes points</h3>
                <div style={{ display:'grid', gap:10 }}>
                  {REWARDS.map(({pts,label,icon}) => (
                    <div key={label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'#0f0f0f', borderRadius:8 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:18 }}>{icon}</span>
                        <span style={{ fontSize:'0.85rem', color:'#ccc' }}>{label}</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ color:'#7c6af7', fontWeight:700, fontSize:'0.9rem' }}>{pts} pts</span>
                        <button disabled={(points?.solde??0)<pts} style={{ background:(points?.solde??0)>=pts?'#7c6af7':'#1a1a2e', color:'#fff', border:'none', borderRadius:6, padding:'4px 12px', cursor:(points?.solde??0)>=pts?'pointer':'not-allowed', fontSize:'0.75rem', fontWeight:600, opacity:(points?.solde??0)>=pts?1:0.4 }}>Utiliser</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:12, fontSize:'0.75rem', color:'#444', textAlign:'center' }}>Plus de rewards à venir — Phase 2</div>
              </div>
            </div>

            <div style={{ background:'#111', border:'1px solid #1a1a2e', borderRadius:12, padding:'24px' }}>
              <h3 style={{ margin:'0 0 16px', fontSize:'1rem', fontWeight:700 }}>Historique des transactions</h3>
              {historique.length === 0 ? (
                <div style={{ textAlign:'center', color:'#555', padding:'32px', fontSize:'0.85rem' }}>
                  Aucune transaction encore. <Link to="/forge/submit" style={{ color:'#7c6af7' }}>Soumets ton premier site →</Link>
                </div>
              ) : (
                <div style={{ display:'grid', gap:8 }}>
                  {[...historique].reverse().map((t:any,i:number) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'#0f0f0f', borderRadius:8 }}>
                      <div>
                        <div style={{ fontSize:'0.85rem', color:'#ccc' }}>{t.description}</div>
                        <div style={{ fontSize:'0.75rem', color:'#555', marginTop:2 }}>{new Date(t.date).toLocaleDateString('fr-CA')}</div>
                      </div>
                      <span style={{ color:t.type==='earn'?'#10b981':'#ef4444', fontWeight:700, fontSize:'0.9rem' }}>{t.type==='earn'?'+':'-'}{t.points} pts</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
