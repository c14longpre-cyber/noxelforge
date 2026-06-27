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

  const wordCount = form.contenu.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/forge" style={{ color: 'var(--muted)', fontSize: 13 }}>← Forge</Link>
        <span style={{ color: 'var(--soft)' }}>·</span>
        <span style={{ fontWeight: 900, fontSize: 15 }}>Soumettre un site</span>
      </nav>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 32px 80px' }}>

        {result ? (
          <div className="nx-card" style={{ textAlign: 'center', padding: 48, borderColor: 'var(--g-border)', background: 'var(--g-dim)' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔥</div>
            <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 8, color: 'var(--g)' }}>
              {result.flux === 'auto_share' ? 'Publié automatiquement!' : 'Soumission reçue!'}
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 14 }}>{result.message}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setResult(null); setForm({ url_soumise:'', titre:'', description:'', contenu:'', niche:'' }); }} style={{ padding: '10px 20px', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                + Soumettre un autre
              </button>
              <button onClick={() => navigate('/forge/dashboard')} className="nx-pill">
                Voir mon Dashboard →
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ALFRED INFO */}
            <div className="nx-card" style={{ marginBottom: 28, display: 'flex', gap: 14, alignItems: 'flex-start', borderColor: 'var(--p-border)', background: 'var(--p-dim)' }}>
              <span style={{ fontSize: 22 }}>🤵</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>Alfred analyse chaque soumission</div>
                <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.6 }}>
                  Moins de 15 jours ou pas de scan = publication automatique. Sinon Alfred vérifie la qualité avant publication.
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 18 }}>

              {/* URL */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  URL du site <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input name="url_soumise" value={form.url_soumise} onChange={handleChange} placeholder="https://monsite.com/mon-article"
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'var(--soft)', marginTop: 5 }}>HTTPS obligatoire · Doit contenir un lien vers noxelseo.com ou noxelforge.com</div>
              </div>

              {/* TITRE */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Titre <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input name="titre" value={form.titre} onChange={handleChange} placeholder="Titre de ton article ou page"
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* NICHE */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Niche</label>
                <select name="niche" value={form.niche} onChange={handleChange}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: form.niche ? 'var(--text)' : 'var(--soft)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}>
                  <option value="">Sélectionne une niche</option>
                  {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description courte</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Décris brièvement le contenu (1-2 phrases)" rows={3}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
              </div>

              {/* CONTENU */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Contenu principal <span style={{ color: 'var(--soft)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optionnel — aide Alfred à mieux analyser)</span>
                </label>
                <textarea name="contenu" value={form.contenu} onChange={handleChange} placeholder="Colle le texte principal de ton article (300+ mots recommandés)" rows={8}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                <div style={{ fontSize: 11, color: wordCount >= 300 ? 'var(--ok)' : 'var(--soft)', marginTop: 5 }}>
                  {wordCount} mots {wordCount >= 300 ? '✓' : '(300+ recommandés)'}
                </div>
              </div>

              {/* BADGE REMINDER */}
              <div className="nx-card" style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px' }}>
                <span style={{ fontSize: 16 }}>🔗</span>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--g)' }}>Donnant-donnant :</strong> ton site doit afficher un lien vers{' '}
                  <strong style={{ color: 'var(--g)' }}>noxelseo.com</strong> ou <strong style={{ color: 'var(--g)' }}>noxelforge.com</strong> pour que le backlink reste actif.
                </div>
              </div>

              {/* ERREUR */}
              {error && (
                <div style={{ background: 'rgba(255,92,122,0.1)', border: '1px solid rgba(255,92,122,0.3)', borderRadius: 'var(--r)', padding: '12px 16px', color: 'var(--danger)', fontSize: 13 }}>
                  ❌ {error}
                </div>
              )}

              {/* SUBMIT */}
              <button onClick={handleSubmit} disabled={loading} className="nx-pill" style={{ padding: '14px', fontSize: 15 }}>
                {loading ? '⚒️ Analyse en cours...' : '⚒️ Soumettre à NOXEL Forge'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
