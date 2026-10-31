import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgeT } from '../hooks/useForgeT';
import { useAuthStore } from '../auth/authContext';
import { LANGUAGES_115 } from '../i18n/languages';
import ForgeAccessModal from './ForgeAccessModal';
import HudRouterLink from './HudRouterLink';
import { HudButton } from './hud/HudButton';
import type { MemberStatus } from '../types/forge';

const NoxelInterface = lazy(() => import('./NoxelInterface'));
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type ForgeSection = 'home' | 'dashboard' | 'partners' | 'badges' | 'pricing' | 'submit' | 'points' | 'admin';

const MEDAL: Record<string, string> = {
  bronze: '/tiers/Bronze_tier.png', silver: '/tiers/Silver_tier.png', gold: '/tiers/Gold_tier.png',
  platinum: '/tiers/Platinum_tier.png', diamond: '/tiers/Diamond_tier.png',
};

function initials(name?: string | null): string {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '?';
}

/**
 * En-tête commun NOXEL (noxel-shell.css), sur le modèle de NOXEL SEO :
 * logo · menu · Soumettre · langue · médaille du forfait · compte.
 * Utilisé par toutes les pages de Forge.
 */
export default function ForgeTopbar({ active }: { active: ForgeSection }) {
  const { t, lang, changeLang } = useForgeT();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [statut, setStatut] = useState<MemberStatus | null>(null);
  const [showLang, setShowLang] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    let actif = true;
    fetch(`${API_BASE}/api/forge/members/status`, { credentials: 'include' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (actif) setStatut(d && d.membre ? d : null); })
      .catch(() => { if (actif) setStatut(null); });
    return () => { actif = false; };
  }, [isAuthenticated]);

  // Échap ou clic hors de la barre : ferme le menu mobile et le menu du compte
  useEffect(() => {
    if (!userOpen && !navOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setUserOpen(false); setNavOpen(false); } };
    const onDown = (e: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) { setUserOpen(false); setNavOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [userOpen, navOpen]);

  async function gererAbonnement() {
    const res = await fetch(`${API_BASE}/api/forge/stripe/portal`, { method: 'POST', credentials: 'include' });
    const d = await res.json().catch(() => ({}));
    if (d.url) window.location.assign(d.url);
    else alert(d.error || 'Error. Please try again.');
  }

  const meta = LANGUAGES_115.find(l => l.code === lang);
  const tier = isAuthenticated ? statut?.membre?.tier_abonnement : undefined;
  const link = (section: ForgeSection, to: string, label: string) => (
    <Link to={to} className="nx-nav" aria-current={active === section ? 'page' : undefined} onClick={() => setNavOpen(false)}>{label}</Link>
  );

  return (
    <header ref={barRef} className="nx-bar">
      <Link to="/forge" className="nx-bar__brand" aria-label="NOXEL FORGE">
        <img src="/NOXEL_FORGE_LOGO.svg" alt="NOXEL FORGE" className="nx-bar__logo" />
      </Link>

      <nav id="nx-forge-nav" className="nx-bar__nav" data-open={navOpen} aria-label="NOXEL FORGE">
        {link('dashboard', '/forge/dashboard', t.nav.dashboard)}
        {link('partners', '/forge/partners', 'Partners')}
        {link('badges', '/forge/badge', t.nav.badges)}
        {link('pricing', '/forge/pricing', t.nav.pricing)}
      </nav>

      <div className="nx-bar__right">
        <HudRouterLink to="/forge/submit" action="new-project" compact label={t.nav.submit} />

        <button type="button" className="nx-pill" onClick={() => setShowLang(true)} aria-label="Language">
          <span aria-hidden="true">{meta?.flag || '🌐'}</span>
          <span className="nx-pill__code">{lang.toUpperCase()}</span>
          <span className="nx-pill__muted">{meta?.native || ''}</span>
          <span className="nx-caret" aria-hidden="true">▼</span>
        </button>

        {tier && (
          <Link to="/forge/pricing" title={tier}>
            <img src={MEDAL[tier] || MEDAL.bronze} alt={tier} className="nx-medal" width={32} height={32} />
          </Link>
        )}

        {isAuthenticated ? (
          <div className="nx-menu-wrap">
            <button type="button" className="nx-pill nx-user" aria-haspopup="menu" aria-expanded={userOpen} onClick={() => setUserOpen(o => !o)}>
              <span className="nx-avatar">{user?.avatarUrl ? <img src={user.avatarUrl} alt="" referrerPolicy="no-referrer" /> : initials(user?.name)}</span>
              <span className="nx-user__name">{user?.name?.split(' ')[0] || 'Account'}</span>
              <span className="nx-caret" aria-hidden="true">▼</span>
            </button>
            {userOpen && (
              <div className="nx-menu" role="menu">
                <div className="nx-menu__head">
                  <div className="nx-menu__name">{user?.name}</div>
                  <div className="nx-menu__mail">{user?.email}</div>
                </div>
                <Link role="menuitem" to="/forge/dashboard" className="nx-menu__item" onClick={() => setUserOpen(false)}>{t.nav.dashboard}</Link>
                <Link role="menuitem" to="/forge/points" className="nx-menu__item" onClick={() => setUserOpen(false)}>Forge Points</Link>
                {tier && tier !== 'bronze' && (
                  <button role="menuitem" type="button" className="nx-menu__item" onClick={() => { setUserOpen(false); gererAbonnement(); }}>Manage subscription</button>
                )}
                {statut?.est_admin && <Link role="menuitem" to="/forge/admin" className="nx-menu__item" onClick={() => setUserOpen(false)}>Admin</Link>}
                <button role="menuitem" type="button" className="nx-menu__item nx-menu__item--danger" onClick={() => { setUserOpen(false); logout(); }}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <HudButton action="continue" compact label="Sign in" onClick={() => setShowLogin(true)} />
        )}

        <button type="button" className="nx-bar__burger" aria-label="Menu" aria-expanded={navOpen} aria-controls="nx-forge-nav" onClick={() => setNavOpen(o => !o)}>
          <span aria-hidden="true">{navOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {showLang && (
        <Suspense fallback={null}>
          <NoxelInterface locale={lang} onChange={(l) => { changeLang(l); setShowLang(false); }} onClose={() => setShowLang(false)} />
        </Suspense>
      )}
      {showLogin && <ForgeAccessModal open={showLogin} onClose={() => setShowLogin(false)} />}
    </header>
  );
}
