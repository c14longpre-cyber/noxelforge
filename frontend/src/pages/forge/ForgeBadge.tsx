import { useState } from 'react';
import { Link } from 'react-router-dom';

const BADGES = [
  {
    id: 'partner',
    label: 'NOXEL Forge Partner',
    image: '/forge-tools.webp',
    title: 'NOXEL FORGE',
    subtitle: 'Verified Partner',
    borderColor: '#3cde6a44',
    titleColor: '#3cde6a',
    link: 'https://noxelforge.com',
  },
  {
    id: 'verified',
    label: 'Forge Verified',
    image: '/forge_verified.webp',
    title: 'FORGE VERIFIED',
    subtitle: 'Trust Score certified',
    borderColor: '#702aa566',
    titleColor: '#b06ef5',
    link: 'https://noxelforge.com',
  },
  {
    id: 'exchange',
    label: 'Forge Exchange',
    image: '/chain-link.webp',
    title: 'FORGE EXCHANGE',
    subtitle: 'Give one · Get one',
    borderColor: '#3cde6a44',
    titleColor: '#3cde6a',
    link: 'https://noxelforge.com',
  },
  {
    id: 'seo',
    label: 'Optimized with NOXEL SEO',
    image: '/noxel-seo.webp',
    title: 'OPTIMIZED WITH',
    subtitle: 'NOXEL SEO',
    borderColor: '#3cde6a33',
    titleColor: '#3cde6a',
    link: 'https://noxelseo.com',
  },
];

function getBadgeHTML(badge: typeof BADGES[0], baseUrl: string): string {
  return `<a href="${badge.link}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;background:#07090f;border:1px solid ${badge.borderColor};border-radius:10px;padding:10px 16px;text-decoration:none;">
  <img src="${baseUrl}${badge.image}" width="32" height="32" style="object-fit:contain;" alt="${badge.label}" />
  <div>
    <div style="font-size:11px;color:${badge.titleColor};font-weight:800;letter-spacing:0.05em;line-height:1;">${badge.title}</div>
    <div style="font-size:10px;color:#888;line-height:1.4;">${badge.subtitle}</div>
  </div>
</a>`;
}

export default function ForgeBadge() {
  const [copied, setCopied] = useState<string | null>(null);
  const baseUrl = 'https://noxelforge.com';

  function copySnippet(badgeId: string, html: string) {
    navigator.clipboard.writeText(html);
    setCopied(badgeId);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/forge" style={{ color: 'var(--muted)', fontSize: 13 }}>← Forge</Link>
        <span style={{ color: 'var(--soft)' }}>·</span>
        <span style={{ fontWeight: 900, fontSize: 15 }}>Badge Center</span>
      </nav>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '48px 32px 80px' }}>
        <div className="nx-kicker" style={{ marginBottom: 12 }}>Display on your site</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.5px' }}>
          NOXEL Forge <span style={{ color: 'var(--g)' }}>Badges</span>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 40, lineHeight: 1.6 }}>
          Copy and paste any badge on your site. Displaying a badge with a link to noxelforge.com or noxelseo.com keeps your backlink active and unlocks badge discounts.
        </p>

        <div style={{ display: 'grid', gap: 20 }}>
          {BADGES.map(badge => {
            const html = getBadgeHTML(badge, baseUrl);
            return (
              <div key={badge.id} className="nx-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>{badge.label}</div>
                  <button
                    onClick={() => copySnippet(badge.id, html)}
                    style={{ padding: '6px 16px', borderRadius: 'var(--r)', border: '1px solid var(--g-border)', background: copied === badge.id ? 'var(--g)' : 'var(--g-dim)', color: copied === badge.id ? '#07090f' : 'var(--g)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    {copied === badge.id ? '✓ Copied!' : 'Copy snippet'}
                  </button>
                </div>

                {/* PREVIEW */}
                <div style={{ marginBottom: 16, padding: '20px', background: '#07090f', borderRadius: 8, display: 'flex', alignItems: 'center' }}>
                  <a href={badge.link} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#07090f', border: `1px solid ${badge.borderColor}`, borderRadius: 10, padding: '10px 16px', textDecoration: 'none' }}>
                    <img src={badge.image} width={32} height={32} style={{ objectFit: 'contain' }} alt={badge.label} />
                    <div>
                      <div style={{ fontSize: 11, color: badge.titleColor, fontWeight: 800, letterSpacing: '0.05em', lineHeight: 1 }}>{badge.title}</div>
                      <div style={{ fontSize: 10, color: '#888', lineHeight: 1.4 }}>{badge.subtitle}</div>
                    </div>
                  </a>
                </div>

                {/* CODE */}
                <pre style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', fontSize: 11, color: 'var(--muted)', overflowX: 'auto', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {html}
                </pre>
              </div>
            );
          })}
        </div>

        {/* INFO */}
        <div className="nx-card" style={{ marginTop: 32, borderColor: 'var(--g-border)', background: 'var(--g-dim)' }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8 }}>How badge discounts work</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
            Place any badge in the footer of your site — not just one page, but site-wide. Alfred scans your footer specifically on every submission to confirm the backlink is active on all pages. As long as your footer badge links to noxelforge.com or noxelseo.com, your discount applies permanently — Silver 10%, Gold 15%, Platinum 20%, Diamond 25%.
          </div>
        </div>
      </div>
    </div>
  );
}

