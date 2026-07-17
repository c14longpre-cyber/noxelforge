import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const NICHES = ['SEO','Marketing','AI','E-commerce','Web Dev','Business','Design','Finance','Health','Education','Other'];

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
    if (!form.url_soumise || !form.titre) { setError('URL and title are required.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
     const res = await fetch(`${API_BASE}/api/forge/submissions`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.raison || data.error || 'Submission error.'); return; }
      setResult(data);
    } catch { setError('Server error. Please try again.'); }
    finally { setLoading(false); }
  }

  const wordCount = form.contenu.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/forge" style={{ color: 'var(--muted)', fontSize: 13 }}>← Forge</Link>
        <span style={{ color: 'var(--soft)' }}>·</span>
        <span style={{ fontWeight: 900, fontSize: 15 }}>Submit a site</span>
      </nav>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 32px 80px' }}>
        {result ? (
          <div className="nx-card" style={{ textAlign: 'center', padding: 48, borderColor: 'var(--g-border)', background: 'var(--g-dim)' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔥</div>
            <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 8, color: 'var(--g)' }}>
              {result.flux === 'auto_share' ? 'Published automatically!' : 'Submission received!'}
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 14 }}>{result.message}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setResult(null); setForm({ url_soumise:'', titre:'', description:'', contenu:'', niche:'' }); }} style={{ padding: '10px 20px', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                + Submit another
              </button>
              <button onClick={() => navigate('/forge/dashboard')} className="nx-pill">View my Dashboard →</button>
            </div>
          </div>
        ) : (
          <>
            {/* Alfred card */}
            <div className="nx-card" style={{ marginBottom: 28, display: 'flex', gap: 14, alignItems: 'flex-start', borderColor: 'var(--g-border)', background: 'var(--g-dim)' }}>
              <img
                src="/Alfred.webp"
                alt="Alfred"
                style={{ width: 44, height: 44, objectFit: 'cover', objectPosition: '50% 15%', borderRadius: '50%', border: '2px solid var(--g)', flexShrink: 0 }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>Alfred reviews every submission</div>
                <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.6 }}>
                  Every submission is scanned and reviewed by Alfred before publication. Quality guaranteed, spam impossible.
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ display: 'grid', gap: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Site URL <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input name="url_soumise" value={form.url_soumise} onChange={handleChange} placeholder="https://mysite.com/my-article"
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'var(--soft)', marginTop: 5 }}>HTTPS required · Must contain a link to noxelseo.com or noxelforge.com</div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Title <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input name="titre" value={form.titre} onChange={handleChange} placeholder="Title of your article or page"
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Niche</label>
                <select name="niche" value={form.niche} onChange={handleChange}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: form.niche ? 'var(--text)' : 'var(--soft)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}>
                  <option value="">Select a niche</option>
                  {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Short description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Briefly describe the content (1-2 sentences)" rows={3}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Main content <span style={{ color: 'var(--soft)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional — helps Alfred analyze better)</span>
                </label>
                <textarea name="contenu" value={form.contenu} onChange={handleChange} placeholder="Paste your article text here (300+ words recommended)" rows={8}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                <div style={{ fontSize: 11, color: wordCount >= 300 ? 'var(--ok)' : 'var(--soft)', marginTop: 5 }}>
                  {wordCount} words {wordCount >= 300 ? '✓' : '(300+ recommended)'}
                </div>
              </div>

              <div className="nx-card" style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px' }}>
                <img src="/chain-link.webp" alt="Give one get one" style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--g)' }}>Give one, get one:</strong> your site must display a link to{' '}
                  <strong style={{ color: 'var(--g)' }}>noxelseo.com</strong> or <strong style={{ color: 'var(--g)' }}>noxelforge.com</strong> to keep the backlink active.
                </div>
              </div>

              {error && (
                <div style={{ background: 'rgba(255,92,122,0.1)', border: '1px solid rgba(255,92,122,0.3)', borderRadius: 'var(--r)', padding: '12px 16px', color: 'var(--danger)', fontSize: 13 }}>
                  ❌ {error}
                </div>
              )}

              <button onClick={handleSubmit} disabled={loading} className="nx-pill" style={{ padding: '14px', fontSize: 15 }}>
                {loading ? 'Analyzing...' : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <img src="/forge-tools.webp" alt="Forge" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                    Submit to NOXEL Forge
                  </span>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}