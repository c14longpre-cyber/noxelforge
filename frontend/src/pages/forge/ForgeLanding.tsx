import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const NICHES = ['SEO','Marketing','AI','E-commerce','Web Dev','Business','Design'];

const TIER_CONFIG: Record<string, { color: string; icon: string; label: string }> = {
  bronze:   { color: '#CD7F32', icon: '🥉', label: 'Bronze' },
  silver:   { color: '#A8A9AD', icon: '🥈', label: 'Silver' },
  gold:     { color: '#FFD700', icon: '🥇', label: 'Gold' },
  platinum: { color: '#E5E4E2', icon: '⬡',  label: 'Platinum' },
  diamond:  { color: '#B9F2FF', icon: '💎', label: 'Diamond' },
};

export default function ForgeLanding() {
  const [annuaire, setAnnuaire] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nicheFilter, setNicheFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => { fetchAnnuaire(); }, [nicheFilter, page]);

  async function fetchAnnuaire() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (nicheFilter) params.append('niche', nicheFilter);
      const res = await fetch(`${API_BASE}/api/forge/submissions/annuaire?${params}`);
      const data = await res.json();
      setAnnuaire(data.annuaire ?? []);
    } catch { setAnnuaire([]); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/forge-tools.webp" alt="Forge" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: '-0.3px' }}>NOXEL Forge™</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/forge/pricing" className="nx-pill" style={{ padding: '7px 16px', fontSize: 13 }}>View pricing</Link>
          <Link to="/forge/dashboard" style={{ padding: '7px 16px', borderRadius: 'var(--r)', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: 13, fontWeight: 600 }}>Dashboard</Link>
          <Link to="/forge/submit" className="nx-pill" style={{ padding: '7px 16px', fontSize: 13 }}><img src="/forge-tools.webp" alt="Forge" style={{width:18,height:18,objectFit:"contain",marginRight:6,verticalAlign:"middle"}}/> Submit</Link>
        </div>
      </nav>
      

      {/* HERO */}
      <section style={{ padding: '72px 32px 56px', textAlign: 'center', borderBottom: '1px solid var(--border)', background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)' }}>
        <div className="nx-kicker" style={{ marginBottom: 16 }}><img src="/forge-tools.webp" alt="Forge" style={{width:18,height:18,objectFit:"contain",marginRight:6,verticalAlign:"middle"}}/> NOXEL Forge™ — Backlink Exchange Ecosystem</div>
        <h1 className="nx-title" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', textAlign: 'center', marginBottom: 20 }}>
          Forge your{' '}
          <span style={{ color: 'var(--g)' }}>authority</span>
        </h1>
        <p className="nx-subtitle" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
          Exchange backlinks with verified sites filtered by Alfred. Quality guaranteed, spam impossible. Give one, get one.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/forge/submit" className="nx-pill"><img src="/forge-tools.webp" alt="Forge" style={{width:18,height:18,objectFit:"contain",marginRight:6,verticalAlign:"middle"}}/> Submit my site</Link>
          <Link to="/forge/dashboard" style={{ padding: '12px 22px', borderRadius: 'var(--r)', border: '1px solid var(--g-border)', color: 'var(--g)', fontSize: 14, fontWeight: 700, background: 'var(--g-dim)' }}>My Dashboard →</Link>
        </div>

        {/* STATS */}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Forge Points */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <img
                src="/forge-tools.webp"
                alt="Forge Points"
                style={{ width: 72, height: 72, objectFit: 'contain' }}
              />
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>Forge Points</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 160 }}>Earn points on every exchange</div>
          </div>

   {/* Give one get one */}
<div style={{ textAlign: 'center' }}>
  <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
    <img
      src="/chain-link.webp"
      alt="Give one get one"
      style={{ width: 72, height: 72, objectFit: 'contain' }}
    />
  </div>
  <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>Give one, get one</div>
  <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 160 }}>You give a backlink, you get one back</div>
</div>
          {/* Alfred */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <img
                src="/Alfred.webp"
                alt="Alfred"
                style={{ width: 72, height: 72, objectFit: 'cover', objectPosition: '50% 15%', borderRadius: '50%', border: '2px solid var(--g)' }}
              />
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>Alfred filters</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 160 }}>Zero spam, zero generic content</div>
          </div>

        </div>
      </section>

      {/* TRUST SCORE TIERS */}
      <section style={{ padding: '56px 32px', maxWidth: 960, margin: '0 auto' }}>
        <div className="nx-kicker" style={{ marginBottom: 8, textAlign: 'center' }}>Trust Score Forge™</div>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 32, fontSize: 14 }}>Every site receives a score out of 100 based on 6 quality signals</p>
        <div className="nx-grid nx-grid--5">
          {[
            { tier: 'bronze',   range: '0–40',   desc: 'Read-only access' },
            { tier: 'silver',   range: '41–65',  desc: 'Submission active' },
            { tier: 'gold',     range: '66–85',  desc: 'Verified partner' },
            { tier: 'platinum', range: '86–94',  desc: 'Confirmed authority' },
            { tier: 'diamond',  range: '95–100', desc: 'Forge Elite' },
          ].map(({ tier, range, desc }) => {
            const t = TIER_CONFIG[tier];
            return (
              <div key={tier} className="nx-card" style={{ textAlign: 'center', borderColor: `${t.color}33` }}>
                <div style={{ color: t.color, fontWeight: 900, fontSize: 13, marginBottom: 6 }}>{t.icon} {t.label}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', marginBottom: 4 }}>{range}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ANNUAIRE */}
      <section style={{ padding: '0 32px 80px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="nx-kicker" style={{ marginBottom: 4 }}>Directory</div>
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Verified Forge Sites</h2>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => { setNicheFilter(''); setPage(1); }} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', background: !nicheFilter ? 'var(--g)' : 'transparent', color: !nicheFilter ? '#07090f' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>All</button>
            {NICHES.map(n => (
              <button key={n} onClick={() => { setNicheFilter(n); setPage(1); }} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', background: nicheFilter === n ? 'var(--g)' : 'transparent', color: nicheFilter === n ? '#07090f' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{n}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60, fontSize: 14 }}><img src="/forge-tools.webp" alt="Forge" style={{width:18,height:18,objectFit:"contain",marginRight:6,verticalAlign:"middle"}}/> Loading directory...</div>
        ) : annuaire.length === 0 ? (
          <div className="nx-card" style={{ textAlign: 'center', padding: 60 }}>
            <img src="/forge-tools.webp" alt="Forge" style={{ width: 56, height: 56, objectFit: 'contain', marginBottom: 12 }} />
            <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 15 }}>The directory is empty for now</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Be the first to submit your site.</div>
            <Link to="/forge/submit" className="nx-pill" style={{ display: 'inline-block' }}>Submit my site</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {annuaire.map((item: any) => (
              <div key={item.id} className="nx-card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  {item.niche && <span style={{ background: 'var(--g-dim)', color: 'var(--g)', fontSize: 11, padding: '2px 10px', borderRadius: 20, fontWeight: 700, marginBottom: 8, display: 'inline-block' }}>{item.niche}</span>}
                  <h3 style={{ margin: '6px 0 4px', fontSize: 14, fontWeight: 800 }}>{item.titre}</h3>
                  <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: 13, lineHeight: 1.5 }}>{item.description}</p>
                  <a href={item.url_soumise} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--g)', fontSize: 12 }}>{item.url_soumise} ↗</a>
                </div>
                <div style={{ fontSize: 11, color: 'var(--soft)' }}>{new Date(item.created_at).toLocaleDateString('en-CA')}</div>
              </div>
            ))}
          </div>
        )}

        {annuaire.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28 }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: page===1?'not-allowed':'pointer', opacity: page===1?0.4:1, fontSize: 13 }}>← Previous</button>
            <span style={{ padding: '7px 14px', color: 'var(--muted)', fontSize: 13 }}>Page {page}</span>
            <button onClick={() => setPage(p => p+1)} disabled={annuaire.length<20} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: annuaire.length<20?'not-allowed':'pointer', opacity: annuaire.length<20?0.4:1, fontSize: 13 }}>Next →</button>
          </div>
        )}
      </section>

      {/* CTA BOTTOM */}
      <section style={{ padding: '56px 32px', background: 'var(--bg2)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="nx-kicker" style={{ marginBottom: 12 }}>Ready to forge?</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.5px' }}>Join NOXEL Forge™</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 14 }}>Start building your verified backlink network today.</p>
        <Link to="/forge/submit" className="nx-pill"><img src="/forge-tools.webp" alt="Forge" style={{width:18,height:18,objectFit:"contain",marginRight:6,verticalAlign:"middle"}}/> Join NOXEL Forge</Link>
      </section>
    </div>
  );
}
