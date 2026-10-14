import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useForgeT } from '../../hooks/useForgeT';
import { useAuthStore } from '../../auth/AuthStore';
import ForgeAccessModal from '../../components/ForgeAccessModal';
import Footer from '../../components/Footer';
import { HudButton } from '../../components/hud/HudButton';
import HudRouterLink from '../../components/HudRouterLink';
const NoxelInterface = lazy(() => import('../../components/NoxelInterface'));

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const NICHES = ['SEO','Marketing','AI','E-commerce','Web Dev','Business','Design'];

const TIER_CONFIG: Record<string, { color: string; icon: string; image: string; label: string }> = {
  bronze:   { color: '#CD7F32', icon: '🥉', image: '/tiers/Bronze_tier.png', label: 'Bronze' },
  silver:   { color: '#A8A9AD', icon: '🥈', image: '/tiers/Silver_tier.png', label: 'Silver' },
  gold:     { color: '#FFD700', icon: '🥇', image: '/tiers/Gold_tier.png', label: 'Gold' },
  platinum: { color: '#E5E4E2', icon: '⬡',  image: '/tiers/Platinum_tier.png', label: 'Platinum' },
  diamond:  { color: '#B9F2FF', icon: '💎', image: '/tiers/Diamond_tier.png', label: 'Diamond' },
};

export default function ForgeLanding() {
  const { t, lang, changeLang } = useForgeT();
  const [showMap, setShowMap] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const [membre, setMembre] = useState<any>(null);
  const [annuaire, setAnnuaire] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nicheFilter, setNicheFilter] = useState('');
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Menu mobile : Échap le ferme (et rend le focus au bouton), un clic hors de la barre aussi.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setMenuOpen(false); menuBtnRef.current?.focus(); }
    }
    function onPointer(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen]);


  useEffect(() => { fetchAnnuaire(); }, [nicheFilter, page]);
  useEffect(() => {
    if (!isAuthenticated) { setMembre(null); return; }
    fetch(`${API_BASE}/api/forge/members/status`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => setMembre(data?.membre ?? null))
      .catch(() => setMembre(null));
  }, [isAuthenticated]);

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
      <nav ref={navRef} className="forge-topbar">
        <div className="forge-topbar__brand">
          <img src="/NOXEL_FORGE_LOGO.svg" alt="Forge" className="forge-topbar__logo" />
        </div>
        <div className="forge-topbar__actions">
          <button onClick={() => setShowMap(true)} className="forge-topbar__lang"><span><span className="forge-topbar__lang-icon" aria-hidden="true">🌐 </span>{lang.toUpperCase()}</span></button>
          {showMap && (
            <Suspense fallback={null}>
              <NoxelInterface locale={lang} onChange={(l) => { changeLang(l); setShowMap(false); }} onClose={() => setShowMap(false)} />
            </Suspense>
          )}
          <div id="forge-mobile-menu" className="forge-topbar__links" data-open={menuOpen}>
            <Link to="/forge/badge" className="forge-topbar__link">{t.nav.badges}</Link>
            <Link to="/forge/pricing" className="forge-topbar__link">{t.nav.pricing}</Link>
            <Link to="/forge/dashboard" className="forge-topbar__link">{t.nav.dashboard}</Link>
            {isAuthenticated && (
              <>
                {membre?.tier_abonnement && (<Link to="/forge/pricing" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800, textDecoration: 'none', textTransform: 'capitalize', background: (TIER_CONFIG[membre.tier_abonnement]?.color || '#888') + '20', color: TIER_CONFIG[membre.tier_abonnement]?.color || '#888', border: `1px solid ${(TIER_CONFIG[membre.tier_abonnement]?.color || '#888')}40` }}><img src={TIER_CONFIG[membre.tier_abonnement]?.image || '/tiers/Bronze_tier.png'} alt={membre.tier_abonnement} style={{ width: 14, height: 14, verticalAlign: 'middle' }} /><span style={{marginLeft:6}}>{membre.tier_abonnement}</span>{membre.tier_abonnement !== 'diamond' && <span style={{ opacity: 0.7, marginLeft: 4 }}>· Upgrade ↗</span>}</Link>)}
                <button onClick={() => { setMenuOpen(false); logout(); }} className="forge-topbar__link">{user?.name || 'Account'} (logout)</button>
              </>
            )}
          </div>
          {!isAuthenticated && (
            <HudButton action="continue" compact label="Sign in" onClick={() => { setMenuOpen(false); setShowAuthModal(true); }} />
          )}
          <HudRouterLink to="/forge/submit" action="new-project" compact label={t.nav.submit} />
          <button
            ref={menuBtnRef}
            type="button"
            className="forge-topbar__menu-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="forge-mobile-menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '72px 32px 56px', textAlign: 'center', borderBottom: '1px solid var(--border)', background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)' }}>
        <div className="nx-kicker" style={{ marginBottom: 16 }}>
          <img src="/forge-tools.avif" alt="Forge" style={{width:18,height:18,objectFit:'contain',marginRight:6,verticalAlign:'middle'}}/>
          {t.hero.kicker}
        </div>
        <h1 className="nx-title" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', textAlign: 'center', marginBottom: 20 }}>
          {t.hero.title}{' '}
          <span style={{ color: 'var(--g)' }}>{t.hero.titleAccent}</span>
        </h1>
        <p className="nx-subtitle" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
          {t.hero.subtitle}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <HudRouterLink to="/forge/submit" action="new-project" label={t.hero.ctaSubmit} />
          <HudRouterLink to="/forge/dashboard" action="open-project" label={t.hero.ctaDashboard} />
        </div>

        {/* STATS */}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <img src="/forge-tools.avif" alt="Forge Points" style={{ width: 72, height: 72, objectFit: 'contain' }} />
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{t.stats.forgePoints}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 160 }}>{t.stats.forgePointsDesc}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <img src="/chain-link.avif" alt="Give one get one" style={{ width: 72, height: 72, objectFit: 'contain' }} />
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{t.stats.giveOne}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 160 }}>{t.stats.giveOneDesc}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
              <img src="/Alfred-transparent.avif" alt="Alfred" style={{ width: 65, height: 65, objectFit: 'cover', objectPosition: '50% 3%', borderRadius: '50%', border: '2px solid var(--g)' }} />
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{t.stats.alfredFilters}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 160 }}>{t.stats.alfredFiltersDesc}</div>
          </div>
        </div>
      </section>

      {/* TRUST SCORE TIERS */}
      <section style={{ padding: '56px 32px', maxWidth: 960, margin: '0 auto' }}>
        <div className="nx-kicker" style={{ marginBottom: 8, textAlign: 'center' }}>{t.trust.kicker}</div>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 32, fontSize: 14 }}>{t.trust.subtitle}</p>
        <div className="nx-grid nx-grid--5">
          {[
            { tier: 'bronze',   range: '0–40',   desc: 'Read-only access' },
            { tier: 'silver',   range: '41–65',  desc: 'Submission active' },
            { tier: 'gold',     range: '66–85',  desc: 'Verified partner' },
            { tier: 'platinum', range: '86–94',  desc: 'Confirmed authority' },
            { tier: 'diamond',  range: '95–100', desc: 'Forge Elite' },
          ].map(({ tier, range, desc }) => {
            const t2 = TIER_CONFIG[tier];
            return (
              <div key={tier} className="nx-card" style={{ textAlign: 'center', borderColor: `${t2.color}33` }}>
                <div style={{ color: t2.color, fontWeight: 900, fontSize: 13, marginBottom: 6 }}><img src={t2.image} alt={t2.label} style={{ width: 24, height: 24, verticalAlign: 'middle', marginRight: 4 }} /> {t2.label}</div>
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
            <div className="nx-kicker" style={{ marginBottom: 4 }}>{t.directory.kicker}</div>
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>{t.directory.title}</h2>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => { setNicheFilter(''); setPage(1); }} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', background: !nicheFilter ? 'var(--g)' : 'transparent', color: !nicheFilter ? '#07090f' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>All</button>
            {NICHES.map(n => (
              <button key={n} onClick={() => { setNicheFilter(n); setPage(1); }} style={{ padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', background: nicheFilter === n ? 'var(--g)' : 'transparent', color: nicheFilter === n ? '#07090f' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{n}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60, fontSize: 14 }}>
            <img src="/forge-tools.avif" alt="Forge" style={{width:18,height:18,objectFit:'contain',marginRight:6,verticalAlign:'middle'}}/>
            {t.directory.loading}
          </div>
        ) : annuaire.length === 0 ? (
          <div className="nx-card" style={{ textAlign: 'center', padding: 60 }}>
            <img src="/forge-tools.avif" alt="Forge" style={{ width: 56, height: 56, objectFit: 'contain', marginBottom: 12 }} />
            <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 15 }}>{t.directory.empty}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>{t.directory.emptyDesc}</div>
            <HudRouterLink to="/forge/submit" action="new-project" compact label={t.hero.ctaSubmit} />
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
                <div style={{ fontSize: 11, color: 'var(--soft)' }}>{new Date(item.created_at).toLocaleDateString(lang)}</div>
              </div>
            ))}
          </div>
        )}

        {annuaire.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28 }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: page===1?'not-allowed':'pointer', opacity: page===1?0.4:1, fontSize: 13 }}>{t.directory.previous}</button>
            <span style={{ padding: '7px 14px', color: 'var(--muted)', fontSize: 13 }}>Page {page}</span>
            <button onClick={() => setPage(p => p+1)} disabled={annuaire.length<20} style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--muted)', cursor: annuaire.length<20?'not-allowed':'pointer', opacity: annuaire.length<20?0.4:1, fontSize: 13 }}>{t.directory.next}</button>
          </div>
        )}
      </section>

      {/* CTA BOTTOM */}
      <section style={{ padding: '56px 32px', background: 'var(--bg2)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="nx-kicker" style={{ marginBottom: 12 }}>{t.cta.kicker}</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.5px' }}>{t.cta.title}</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 14 }}>{t.cta.subtitle}</p>
        <HudRouterLink to="/forge/submit" action="new-project" compact label={t.cta.title} />
      </section>
      <Footer
        brand="NOXEL Forge"
        siteUrl="https://noxelforge.com"
        contactEmail="founder@noxel360.com"
        links={[
          { label: "Home", href: "/forge" },
          { label: "Pricing", href: "/forge/pricing" },
          { label: "Partners", href: "/forge/partners" },
          { label: "NOXEL SEO", href: "https://noxelseo.com" },
          { label: "Privacy", href: "/policies/privacy.html" },
        ]}
      />
      <ForgeAccessModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

