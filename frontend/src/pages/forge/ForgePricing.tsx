import { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const TIERS = [
  {
    key: 'bronze',
    label: 'Bronze',
    icon: '🥉',
    color: '#CD7F32',
    monthly: 0,
    annual: 0,
    priceLabel: 'Free',
    features: ['Directory access', 'View all Forge partners', 'NOXEL badge (display only)'],
    cta: 'Get started free',
    disabled: false,
  },
  {
    key: 'silver',
    label: 'Silver',
    icon: '🥈',
    color: '#A8A9AD',
    monthly: 20,
    annual: 199,
    features: ['Submit your site', 'Alfred review', 'Earn Forge Points', 'Badge discount 10%'],
    cta: 'Start with Silver',
    disabled: false,
  },
  {
    key: 'gold',
    label: 'Gold',
    icon: '🥇',
    color: '#FFD700',
    monthly: 40,
    annual: 399,
    features: ['Priority Alfred review', '1.5x Forge Points', 'Badge discount 15%', 'Verified partner badge'],
    cta: 'Start with Gold',
    disabled: false,
    popular: true,
  },
  {
    key: 'platinum',
    label: 'Platinum',
    icon: '⬡',
    color: '#E5E4E2',
    monthly: 60,
    annual: 599,
    features: ['VIP Alfred review', '2x Forge Points', 'Badge discount 20%', 'Advanced placement'],
    cta: 'Start with Platinum',
    disabled: false,
  },
  {
    key: 'diamond',
    label: 'Diamond',
    icon: '💎',
    color: '#B9F2FF',
    monthly: 80,
    annual: 799,
    features: ['Elite Alfred VIP', '3x Forge Points', 'Badge discount 25%', 'Featured listing'],
    cta: 'Start with Diamond',
    disabled: false,
  },
];

const BADGE_DISCOUNTS: Record<string, number> = {
  silver: 0.10, gold: 0.15, platinum: 0.20, diamond: 0.25,
};

export default function ForgePricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [badgeInstalle, setBadgeInstalle] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(tier: string) {
    if (tier === 'bronze') return;
    setLoading(tier);
    try {
      const token = localStorage.getItem('supabase_token') || '';
      const res = await fetch(`${API_BASE}/api/forge/stripe/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tier, billing, badgeInstalle }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { alert('Error. Please try again.'); }
    finally { setLoading(null); }
  }

  function getPrice(tier: typeof TIERS[0]): string {
    if (tier.monthly === 0) return 'Free';
    const base = billing === 'monthly' ? tier.monthly : Math.round(tier.annual / 12);
    const discount = badgeInstalle ? (BADGE_DISCOUNTS[tier.key] ?? 0) : 0;
    const final = Math.round(base * (1 - discount));
    return `$${final}`;
  }

  function getOriginalPrice(tier: typeof TIERS[0]): string | null {
    if (tier.monthly === 0 || !badgeInstalle) return null;
    const base = billing === 'monthly' ? tier.monthly : Math.round(tier.annual / 12);
    return `$${base}`;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/forge" style={{ color: 'var(--muted)', fontSize: 13 }}>← Forge</Link>
        <span style={{ color: 'var(--soft)' }}>·</span>
        <span style={{ fontWeight: 900, fontSize: 15 }}>Pricing</span>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px 80px' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="nx-kicker" style={{ marginBottom: 12 }}>NOXEL Forge™ Pricing</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.5px' }}>
            Build your <span style={{ color: 'var(--g)' }}>authority network</span>
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 32 }}>
            Display the NOXEL badge on your site and unlock exclusive discounts on every tier.
          </p>

          {/* BILLING TOGGLE */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
            <button onClick={() => setBilling('monthly')} style={{ padding: '8px 20px', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: billing === 'monthly' ? 'var(--g)' : 'transparent', color: billing === 'monthly' ? '#07090f' : 'var(--muted)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Monthly</button>
            <button onClick={() => setBilling('annual')} style={{ padding: '8px 20px', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: billing === 'annual' ? 'var(--g)' : 'transparent', color: billing === 'annual' ? '#07090f' : 'var(--muted)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              Annual <span style={{ fontSize: 11, marginLeft: 4, color: billing === 'annual' ? '#07090f' : 'var(--g)' }}>−17%</span>
            </button>
          </div>

          {/* BADGE TOGGLE */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 'var(--r)', border: `1px solid ${badgeInstalle ? 'var(--g-border)' : 'var(--border)'}`, background: badgeInstalle ? 'var(--g-dim)' : 'transparent', cursor: 'pointer' }} onClick={() => setBadgeInstalle(b => !b)}>
            <img src="/chain-link.webp" alt="Badge" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: badgeInstalle ? 'var(--g)' : 'var(--muted)' }}>
              {badgeInstalle ? '✓ Badge discount applied' : 'I display the NOXEL badge — unlock discount'}
            </span>
          </div>
        </div>

        {/* TIERS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {TIERS.map(tier => (
            <div key={tier.key} className="nx-card" style={{ position: 'relative', borderColor: tier.popular ? 'var(--g-border)' : undefined, background: tier.popular ? 'var(--g-dim)' : undefined, display: 'flex', flexDirection: 'column' }}>
              {tier.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--g)', color: '#07090f', fontSize: 11, fontWeight: 800, padding: '3px 14px', borderRadius: 20, whiteSpace: 'nowrap' }}>Most popular</div>
              )}
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ color: tier.color, fontWeight: 900, fontSize: 15, marginBottom: 4 }}>{tier.icon} {tier.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
                  {getOriginalPrice(tier) && <span style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'line-through' }}>{getOriginalPrice(tier)}</span>}
                  <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)' }}>{getPrice(tier)}</span>
                  {tier.monthly > 0 && <span style={{ fontSize: 12, color: 'var(--muted)' }}>/mo</span>}
                </div>
                {billing === 'annual' && tier.annual > 0 && (
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>billed ${tier.annual}/year</div>
                )}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', flex: 1 }}>
                {tier.features.map(f => (
                  <li key={f} style={{ fontSize: 12, color: 'var(--muted)', padding: '4px 0', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--g)', flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              {tier.key === 'bronze' ? (
                <Link to="/forge" className="nx-pill" style={{ textAlign: 'center', display: 'block', fontSize: 13, padding: '10px' }}>{tier.cta}</Link>
              ) : (
                <button onClick={() => handleCheckout(tier.key)} disabled={loading === tier.key} className="nx-pill" style={{ width: '100%', padding: '10px', fontSize: 13, cursor: 'pointer' }}>
                  {loading === tier.key ? 'Loading...' : tier.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* BADGE INFO */}
        <div className="nx-card" style={{ marginTop: 40, display: 'flex', gap: 14, alignItems: 'center', borderColor: 'var(--g-border)', background: 'var(--g-dim)' }}>
          <img src="/chain-link.webp" alt="Badge" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 4 }}>How to unlock badge discounts</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
              Display a link to <strong style={{ color: 'var(--g)' }}>noxelseo.com</strong> or <strong style={{ color: 'var(--g)' }}>noxelforge.com</strong> on your site. Alfred verifies it automatically on every submission. Discount applies permanently as long as the badge is active.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}