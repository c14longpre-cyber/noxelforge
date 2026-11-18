import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getForgeT } from '../../i18n/forge.translations';
import { HudButton } from '../../components/hud/HudButton';
import type { SubmitResult } from '../../types/forge';
import type { ForgeTranslations } from '../../i18n/forge.translations';

import ForgeTopbar from '../../components/ForgeTopbar';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Texts of this form not yet in the 115 dictionaries (fr / en, other languages get English)
const X = {
  fr: {
    url: 'https://monsite.com/mon-article', title: 'Titre de ton article ou de ta page', selectNiche: 'Choisir une niche',
    desc: 'Décris brièvement le contenu (1 ou 2 phrases)', content: 'Colle le texte de ta page ici (300 mots et plus recommandés)',
    words: (n: number) => `${n} mot${n > 1 ? 's' : ''}`, wordsHint: '(300 et plus recommandés)',
    give: 'ton site doit afficher un lien vers', or: 'ou', keep: 'pour garder le lien actif.',
    otherLabel: 'Précise ta niche', otherPh: 'Ex. : rénovation, tourisme, agriculture…', otherRequired: 'Précise ta niche (champ « Autre »).',
    rulesTitle: 'Avant de choisir « Autre »', rulesText: 'Certains sites sont refusés dans NOXEL FORGE, quelle que soit leur niche : contenu sexuel ou nudité, violence, vente d’armes, drogues, jeux d’argent, haine, arnaques, activités illégales et manipulation des liens.',
    rulesLink: 'Lire les règles du réseau', rulesFooter: 'Règles du réseau : sites acceptés et refusés',
    sitesHint: 'La page doit appartenir à un de tes sites vérifiés (tableau de bord, « Mes sites »).',
  },
  en: {
    url: 'https://mysite.com/my-article', title: 'Title of your article or page', selectNiche: 'Select a niche',
    desc: 'Briefly describe the content (1-2 sentences)', content: 'Paste your article text here (300+ words recommended)',
    words: (n: number) => `${n} word${n === 1 ? '' : 's'}`, wordsHint: '(300+ recommended)',
    give: 'your site must display a link to', or: 'or', keep: 'to keep the backlink active.',
    otherLabel: 'Specify your niche', otherPh: 'E.g. renovation, tourism, farming…', otherRequired: 'Please specify your niche ("Other" field).',
    rulesTitle: 'Before choosing "Other"', rulesText: 'Some sites are refused in NOXEL FORGE whatever their niche: sexual content or nudity, violence, weapons sales, drugs, gambling, hate, scams, illegal activities and link manipulation.',
    rulesLink: 'Read the network guidelines', rulesFooter: 'Network guidelines: accepted and refused sites',
    sitesHint: 'The page must belong to one of your verified sites (dashboard, "My sites").',
  },
};

export default function ForgeSubmit() {
  const navigate = useNavigate();
  const [t, setT] = useState<ForgeTranslations | null>(null);
  const [form, setForm] = useState({ url_soumise:'', titre:'', description:'', contenu:'', niche:'' });
  const [nicheAutre, setNicheAutre] = useState('');
  const x = (navigator.language || 'en').toLowerCase().startsWith('fr') ? X.fr : X.en;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const lang = navigator.language.split('-')[0] || 'en';
    getForgeT(lang).then(setT).catch(() => getForgeT('en').then(setT));
  }, []);

  if (!t) return <div style={{ minHeight: '100vh', background: 'var(--bg)' }} />;

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!t) return;
    if (!form.url_soumise || !form.titre) { setError(t.submit.requiredFields); return; }
    if (form.niche === 'Other' && !nicheAutre.trim()) { setError(x.otherRequired); return; }
    const envoi = { ...form, niche: form.niche === 'Other' ? `Other: ${nicheAutre.trim().slice(0, 60)}` : form.niche };
    setLoading(true); setError(''); setResult(null);
    try {
     const res = await fetch(`${API_BASE}/api/forge/submissions`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(envoi) });
      const data = await res.json();
      if (!res.ok) { setError(data.raison || data.error || 'Submission error.'); return; }
      setResult(data);
    } catch { setError('Server error. Please try again.'); }
    finally { setLoading(false); }
  }

  const wordCount = form.contenu.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>
      <ForgeTopbar active="submit" />

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 32px 80px' }}>
        {result ? (
          <div className="nx-card" style={{ textAlign: 'center', padding: 48, borderColor: 'var(--g-border)', background: 'var(--g-dim)' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔥</div>
            <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 8, color: 'var(--g)' }}>
              {result.flux === 'auto_share' ? t.submit.successAuto : t.submit.successTitle}
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: result.rappels && result.rappels.length ? 12 : 28, fontSize: 14 }}>{result.message}</p>
            {result.rappels && result.rappels.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                {result.rappels.map((r: string) => <div key={r} style={{ color: 'var(--soft)', fontSize: 12, marginBottom: 4 }}>💡 {r}</div>)}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <HudButton action="new-project" compact label={t.submit.submitAnother} onClick={() => { setResult(null); setForm({ url_soumise:'', titre:'', description:'', contenu:'', niche:'' }); setNicheAutre(''); }} />
              <HudButton action="open-project" compact label={t.submit.viewDashboard} onClick={() => navigate('/forge/dashboard')} />
            </div>
          </div>
        ) : (
          <>
            {/* Alfred card */}
            <div className="nx-card" style={{ marginBottom: 28, display: 'flex', gap: 14, alignItems: 'flex-start', borderColor: 'var(--g-border)', background: 'var(--g-dim)' }}>
              <img
                src="/Alfred-transparent.avif"
                alt="Alfred"
                style={{ width: 44, height: 44, objectFit: 'cover', objectPosition: '50% 15%', borderRadius: '50%', border: '2px solid var(--g)', flexShrink: 0 }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>{t.submit.alfredTitle}</div>
                <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.6 }}>
                  {t.submit.alfredDesc}
                </div>
              </div>
            </div>

            {/* Form */}
            <div style={{ display: 'grid', gap: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.submit.urlLabel} <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input name="url_soumise" value={form.url_soumise} onChange={handleChange} placeholder={x.url}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                <div style={{ fontSize: 11, color: 'var(--soft)', marginTop: 5 }}>{t.submit.urlHint} {x.sitesHint}</div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.submit.titleLabel} <span style={{ color: 'var(--danger)' }}>*</span>
                </label>
                <input name="titre" value={form.titre} onChange={handleChange} placeholder={x.title}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
  <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.submit.nicheLabel}</label>
  <select name="niche" value={form.niche} onChange={handleChange} className="forge-niche-select"
    style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: form.niche ? 'var(--text)' : 'var(--soft)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}>
    <option value="">{x.selectNiche}</option>
    {Object.entries(t.submit.niches as Record<string, string>).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
  </select>
  <style>{`
    .forge-niche-select option {
      background-color: #07090f;
      color: #3ddc84;
    }
    .forge-niche-select option:hover,
    .forge-niche-select option:focus,
    .forge-niche-select option:checked {
      background-color: #07090f;
      background: linear-gradient(#a855f7, #a855f7);
      color: #a855f7;
    }
  `}</style>
  {form.niche === 'Other' && (
    <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
      <div>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{x.otherLabel} <span style={{ color: 'var(--danger)' }}>*</span></label>
        <input value={nicheAutre} onChange={(e) => setNicheAutre(e.target.value)} maxLength={60} placeholder={x.otherPh}
          style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
      </div>
      <div className="nx-card" style={{ padding: '12px 16px', borderColor: 'rgba(255,183,77,0.35)' }}>
        <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--warn)', marginBottom: 4 }}>⚠ {x.rulesTitle}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{x.rulesText}</div>
        <Link to="/forge/guidelines" target="_blank" rel="noopener" style={{ display: 'inline-block', marginTop: 6, fontSize: 12, color: 'var(--g)' }}>{x.rulesLink} →</Link>
      </div>
    </div>
  )}
</div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.submit.descLabel}</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder={x.desc} rows={3}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, marginBottom: 8, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t.submit.contentLabel} <span style={{ color: 'var(--soft)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>({t.submit.contentHint})</span>
                </label>
                <textarea name="contenu" value={form.contenu} onChange={handleChange} placeholder={x.content} rows={8}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '11px 14px', color: 'var(--text)', fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                <div style={{ fontSize: 11, color: wordCount >= 300 ? 'var(--ok)' : 'var(--soft)', marginTop: 5 }}>
                  {x.words(wordCount)} {wordCount >= 300 ? '✓' : x.wordsHint}
                </div>
              </div>

              <div className="nx-card" style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px' }}>
                <img src="/chain-link.avif" alt="Give one get one" style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--g)' }}>{t.stats.giveOne} :</strong> {x.give}{' '}
                  <strong style={{ color: 'var(--g)' }}>noxelseo.com</strong> {x.or} <strong style={{ color: 'var(--g)' }}>noxelforge.com</strong> {x.keep}
                </div>
              </div>

              {error && (
                <div style={{ background: 'rgba(255,92,122,0.1)', border: '1px solid rgba(255,92,122,0.3)', borderRadius: 'var(--r)', padding: '12px 16px', color: 'var(--danger)', fontSize: 13 }}>
                  ❌ {error}
                </div>
              )}

              <div style={{ textAlign: 'center', fontSize: 12 }}>
                <Link to="/forge/guidelines" style={{ color: 'var(--muted)' }}>{x.rulesFooter}</Link>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <HudButton action="analyse" compact label={t.submit.submitBtn} busy={loading} busyLabel={t.submit.analyzing} onClick={handleSubmit} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}