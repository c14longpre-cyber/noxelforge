import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const NICHES = ['SEO','Marketing','IA','E-commerce','Dev Web','Business','Design','Finance','Santé','Éducation','Autre'];

export default function ForgeSubmit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ url_soumise:'', titre:'', description:'', contenu:'', niche:'' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.url_soumise || !form.titre) { setError('URL et titre obligatoires.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const token = localStorage.getItem('supabase_token') || '';
      const res = await fetch(`${API_BASE}/api/forge/submissions`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.raison || data.error || 'Erreur soumission.'); return; }
      setResult(data);
    } catch { setError('Erreur serveur. Réessaie.'); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0f', color:'#f0f0f0', fontFamily:'Inter, sans-serif' }}>
      <div style={{ background:'#0f0a1f', borderBottom:'1px solid #1a1a2e', padding:'20px 24px' }}>
        <div style={{ maxWidth:680, margin:'0 auto', display:'flex', alignItems:'center', gap:16 }}>
          <Link to="/forge" style={{ color:'#666', textDecoration:'none', fontSize:'0.85rem' }}>← Forge</Link>
          <div>
            <div style={{ fontSize:'0.8rem', color:'#666' }}>⚒️ NOXEL Forge™</div>
            <h1 style={{ margin:0, fontSize:'1.3rem', fontWeight:800 }}>Soumettre un site</h1>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:680, margin:'0 auto', padding:'40px 24px' }}>
        {result ? (
          <div style={{ background:'#0a1f0f', border:'1px solid #10b98144', borderRadius:14, padding:'32px', textAlign:'center' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔥</div>
            <h2 style={{ margin:'0 0 8px', color:'#10b981' }}>{result.flux === 'auto_share' ? 'Publié automatiquement!' : 'Soumission reçue!'}</h2>
            <p style={{ color:'#888', marginBottom:24 }}>{result.message}</p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={() => { setResult(null); setForm({ url_soumise:'', titre:'', description:'', contenu:'', niche:'' }); }} style={{ background:'#1a1a2e', color:'#7c6af7', border:'none', borderRadius:10, padding:'10px 20px', cursor:'pointer', fontWeight:600 }}>+ Soumettre un autre</button>
              <button onClick={() => navigate('/forge/dashboard')} style={{ background:'linear-gradient(135deg,#7c6af7,#6d28d9)', color:'#fff', border:'none', borderRadius:10, padding:'10px 20px', cursor:'pointer', fontWeight:700 }}>Voir mon Dashboard →</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ background:'#111', border:'1px solid #1a1a2e', borderRadius:12, padding:'16px 20px', marginBottom:28, display:'flex', gap:12 }}>
              <span style={{ fontSize:20 }}>🤵</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'0.9rem', marginBottom:4 }}>Alfred analyse chaque soumission</div>
                <div style={{ color:'#666', fontSize:'0.82rem', lineHeight:1.6 }}>Moins de 15 jours ou pas de scan = publication automatique. Sinon Alfred vérifie la qualité avant publication.</div>
              </div>
            </div>

            <div style={{ display:'grid', gap:20 }}>
              <div>
                <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:8, color:'#ccc' }}>URL du site <span style={{ color:'#ef4444' }}>*</span></label>
                <input name="url_soumise" value={form.url_soumise} onChange={handleChange} placeholder="https://monsite.com/mon-article" style={{ width:'100%', background:'#111', border:'1px solid #1a1a2e', borderRadius:10, padding:'12px 16px', color:'#f0f0f0', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' }} />
                <div style={{ fontSize:'0.75rem', color:'#555', marginTop:6 }}>HTTPS obligatoire. Doit contenir un lien vers noxelseo.com ou noxelforge.com.</div>
              </div>

              <div>
                <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:8, color:'#ccc' }}>Titre <span style={{ color:'#ef4444' }}>*</span></label>
                <input name="titre" value={form.titre} onChange={handleChange} placeholder="Titre de ton article ou page" style={{ width:'100%', background:'#111', border:'1px solid #1a1a2e', borderRadius:10, padding:'12px 16px', color:'#f0f0f0', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' }} />
              </div>

              <div>
                <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:8, color:'#ccc' }}>Niche</label>
                <select name="niche" value={form.niche} onChange={handleChange} style={{ width:'100%', background:'#111', border:'1px solid #1a1a2e', borderRadius:10, padding:'12px 16px', color:form.niche?'#f0f0f0':'#555', fontSize:'0.95rem', outline:'none', boxSizing:'border-box' }}>
                  <option value="">Sélectionne une niche</option>
                  {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:8, color:'#ccc' }}>Description courte</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Décris brièvement le contenu (1-2 phrases)" rows={3} style={{ width:'100%', background:'#111', border:'1px solid #1a1a2e', borderRadius:10, padding:'12px 16px', color:'#f0f0f0', fontSize:'0.95rem', outline:'none', resize:'vertical', boxSizing:'border-box', fontFamily:'inherit' }} />
              </div>

              <div>
                <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, marginBottom:8, color:'#ccc' }}>Contenu principal <span style={{ color:'#555', fontWeight:400 }}>(optionnel — aide Alfred à mieux analyser)</span></label>
                <textarea name="contenu" value={form.contenu} onChange={handleChange} placeholder="Colle le texte principal de ton article (300+ mots recommandés)" rows={8} style={{ width:'100%', background:'#111', border:'1px solid #1a1a2e', borderRadius:10, padding:'12px 16px', color:'#f0f0f0', fontSize:'0.9rem', outline:'none', resize:'vertical', boxSizing:'border-box', fontFamily:'inherit' }} />
                <div style={{ fontSize:'0.75rem', color:'#555', marginTop:6 }}>{form.contenu.trim().split(/\s+/).filter(Boolean).length} mots</div>
              </div>

              <div style={{ background:'#0f0a1f', border:'1px solid #7c6af733', borderRadius:10, padding:'14px 18px', display:'flex', gap:10, alignItems:'center' }}>
                <span style={{ fontSize:18 }}>🔗</span>
                <div style={{ fontSize:'0.82rem', color:'#888', lineHeight:1.6 }}>
                  <strong style={{ color:'#a78bfa' }}>Rappel donnant-donnant :</strong> ton site doit afficher un lien vers <strong style={{ color:'#7c6af7' }}>noxelseo.com</strong> ou <strong style={{ color:'#7c6af7' }}>noxelforge.com</strong> pour que le backlink reste actif.
                </div>
              </div>

              {error && <div style={{ background:'#1f0a0a', border:'1px solid #ef444444', borderRadius:10, padding:'14px 18px', color:'#ef4444', fontSize:'0.875rem' }}>❌ {error}</div>}

              <button onClick={handleSubmit} disabled={loading} style={{ background:loading?'#333':'linear-gradient(135deg,#7c6af7,#6d28d9)', color:'#fff', border:'none', borderRadius:12, padding:'16px', cursor:loading?'not-allowed':'pointer', fontWeight:700, fontSize:'1rem' }}>
                {loading ? '⚒️ Analyse en cours...' : '⚒️ Soumettre à NOXEL Forge'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
