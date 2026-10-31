import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { useForgeT } from '../../hooks/useForgeT';
import { HudButton } from '../../components/hud/HudButton';
import HudRouterLink from '../../components/HudRouterLink';
import type { ForgeTranslations } from '../../i18n/forge.translations';

import ForgeTopbar from '../../components/ForgeTopbar';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getTiers = (t: ForgeTranslations) => [
  {
    key: 'bronze',
    label: 'Bronze',
    icon: '🥉',
    image: '/tiers/Bronze_tier.png',
    color: '#cd7f32',
    monthly: 0,
    annual: 0,
    priceLabel: 'Free',
    features: ['Directory access', 'View all Forge partners', 'NOXEL badge (display only)'],
    cta: t.pricing.getStartedFree,
    disabled: false,
  },
  {
    key: 'silver',
    label: 'Silver',
    icon: '🥈',
    image: '/tiers/Silver_tier.png',
    color: '#aab0cc',
    monthly: 20,
    annual: 199,
    features: ['Submit your site', 'Alfred review', 'Earn Forge Points', 'Badge discount 10%'],
    cta: t.pricing.ctaSilver,
    disabled: false,
  },
  {
    key: 'gold',
    label: 'Gold',
    icon: '🥇',
    image: '/tiers/Gold_tier.png',
    color: '#ffb74d',
    monthly: 40,
    annual: 399,
    features: ['Priority Alfred review', '1.5x Forge Points', 'Badge discount 15%', 'Verified partner badge'],
    cta: t.pricing.ctaGold,
    disabled: false,
    popular: true,
  },
  {
    key: 'platinum',
    label: 'Platinum',
    icon: '⬡',
    image: '/tiers/Platinum_tier.png',
    color: '#ce93d8',
    monthly: 60,
    annual: 599,
    features: ['VIP Alfred review', '2x Forge Points', 'Badge discount 20%', 'Advanced placement'],
    cta: t.pricing.ctaPlatinum,
    disabled: false,
  },
  {
    key: 'diamond',
    label: 'Diamond',
    icon: '💎',
    image: '/tiers/Diamond_tier.png',
    color: '#3ddc84',
    monthly: 80,
    annual: 799,
    features: ['Elite Alfred VIP', '3x Forge Points', 'Badge discount 25%', 'Featured listing'],
    cta: t.pricing.ctaDiamond,
    disabled: false,
  },
];

const BADGE_DISCOUNTS: Record<string, number> = {
  silver: 0.10, gold: 0.15, platinum: 0.20, diamond: 0.25,
};

export default function ForgePricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  // Remise badge affichée seulement si le serveur a vérifié le badge (même règle que /checkout).
  const [badgeInstalle, setBadgeInstalle] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [tierActuel, setTierActuel] = useState<string | null>(null);
  // Langue choisie dans l'en-tête (forge_lang), comme les autres pages
  const { t } = useForgeT();

  useEffect(() => {
    fetch(`${API_BASE}/api/forge/members/status`, { credentials: 'include' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        setBadgeInstalle(d?.membre?.badge_installe === true);
        setTierActuel(d?.membre?.tier_abonnement ?? null);
      })
      .catch(() => {});
  }, []);

  async function ouvrirPortail() {
    const res = await fetch(`${API_BASE}/api/forge/stripe/portal`, { method: 'POST', credentials: 'include' });
    const data = await res.json().catch(() => ({}));
    if (data.url) window.location.assign(data.url);
    else alert(data.error || 'Error. Please try again.');
  }

  async function handleCheckout(tier: string) {
    if (tier === 'bronze') return;
    setLoading(tier);
    try {
      const res = await fetch(`${API_BASE}/api/forge/stripe/checkout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, billing }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.url) { window.location.assign(data.url); return; }
      // One subscription per member: plan changes and cancellation go through the Stripe portal
      if (data.code === 'already_subscribed') {
        if (window.confirm(t.pricing.alreadySubscribed ?? data.error)) await ouvrirPortail();
        return;
      }
      alert(res.status === 401 ? 'Please sign in first.' : (data.error || 'Error. Please try again.'));
    } catch { alert('Error. Please try again.'); }
    finally { setLoading(null); }
  }

  function getPrice(tier: ReturnType<typeof getTiers>[number]): string {
    if (tier.monthly === 0) return 'Free';
    const base = billing === 'monthly' ? tier.monthly : Math.round(tier.annual / 12);
    const discount = badgeInstalle ? (BADGE_DISCOUNTS[tier.key] ?? 0) : 0;
    const final = Math.round(base * (1 - discount));
    return `$${final} CAD`;
  }

  function getOriginalPrice(tier: ReturnType<typeof getTiers>[number]): string | null {
    if (tier.monthly === 0 || !badgeInstalle) return null;
    const base = billing === 'monthly' ? tier.monthly : Math.round(tier.annual / 12);
    return `$${base} CAD`;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>
      <ForgeTopbar active="pricing" />

      {/* Même page de prix que NOXEL SEO (noxel-shell.css) */}
      <main className="nx-page">
        <div className="nx-page-header">
          <h1 className="nx-page-title">{t.nav.pricing}</h1>
          <span className="nx-page-subtitle">{t.pricing.title} {t.pricing.titleAccent}. {t.pricing.subtitle}</span>
        </div>

        <div className="nx-cycle">
          <div className="nx-cycle__track" role="group" aria-label={t.nav.pricing}>
            <button type="button" className="nx-cycle__btn" aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>{t.pricing.monthly}</button>
            <button type="button" className="nx-cycle__btn" aria-pressed={billing === 'annual'} onClick={() => setBilling('annual')}>
              {t.pricing.annual} <span className="nx-save">{t.pricing.discount}</span>
            </button>
          </div>
        </div>
        <div className="nx-price-note">{t.pricing.currencyNote}</div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {badgeInstalle ? (
            <span className="nx-pill" style={{ cursor: 'default', borderColor: 'rgba(61,220,132,0.35)', color: 'var(--g)' }}>
              <img src="/chain-link.avif" alt="" width={18} height={18} /> {'✓ ' + t.pricing.badgeApplied}
            </span>
          ) : (
            <Link to="/forge/badge" className="nx-pill" style={{ textDecoration: 'none' }}>
              <img src="/chain-link.avif" alt="" width={18} height={18} /> <span className="nx-pill__muted" style={{ display: 'inline' }}>{t.pricing.badgeToggle}</span>
            </Link>
          )}
        </div>

        <div className="nx-pricing-grid">
          {getTiers(t).map(tier => {
            const actif = tierActuel === tier.key;
            const original = getOriginalPrice(tier);
            return (
              <div key={tier.key} className={`nx-pcard${tier.popular ? ' nx-pcard--featured' : ''}${actif ? ' nx-pcard--active' : ''}`}>
                {actif ? <div className="nx-pcard__flag">✓ Current plan</div> : tier.popular && <div className="nx-pcard__flag">{t.pricing.mostPopular}</div>}
                <div className="nx-pcard__head">
                  <img src={tier.image} alt={tier.label} width={48} height={48} />
                  <div className="nx-pcard__name" style={{ color: tier.color }}>{tier.label}</div>
                </div>
                <div className="nx-pcard__price">
                  {getPrice(tier)}
                  {tier.monthly > 0 && <span className="nx-pcard__period">{t.pricing.perMonth}</span>}
                </div>
                {original && <div className="nx-pcard__sub" style={{ textDecoration: 'line-through' }}>{original}</div>}
                {billing === 'annual' && tier.annual > 0 && (
                  <div className="nx-pcard__sub">{t.pricing.billedPerYear.replace('{price}', `${tier.annual} CAD`)}</div>
                )}
                <ul className="nx-pcard__items">
                  {tier.features.map(f => (
                    <li key={f}><span style={{ color: tier.color, flexShrink: 0 }}>✓</span>{f}</li>
                  ))}
                </ul>
                {tier.key === 'bronze' ? (
                  <HudRouterLink to="/forge" action="continue" compact label={tier.cta} className="nx-pcard__cta" />
                ) : (
                  <HudButton action="continue" compact label={actif ? 'Current plan' : tier.cta} disabled={actif} busy={loading === tier.key} busyLabel="Loading..." onClick={() => handleCheckout(tier.key)} className="nx-pcard__cta" />
                )}
              </div>
            );
          })}
        </div>

        <div className="nx-info" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <img src="/chain-link.avif" alt="" width={32} height={32} style={{ flexShrink: 0 }} />
          <div>
            <div className="nx-info__title">{t.pricing.badgeInfoTitle}</div>
            <div className="nx-info__desc">{t.pricing.badgeInfoDesc}</div>
          </div>
        </div>
      </main>
      <Footer
        brand="NOXEL FORGE"
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
    </div>
  );
}
