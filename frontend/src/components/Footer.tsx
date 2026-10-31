import React from "react";

/**
 * NOXEL — Shared Footer Component
 * NOXEL Shell 1.0 — pied de page commun (modèle : NOXEL SEO).
 * Copié à l'identique dans noxel360, noxelforge et noxelspectra.
 *
 * - Real <a href> links to owned social properties (no nofollow)
 * - rel="me" for IndieWeb / identity verification
 * - Descriptive aria-label per icon
 * - schema.org Organization + sameAs JSON-LD for SEO/AEO
 * - Two-row layout (nav / social+copyright) to keep visual weight low
 *
 * Usage — pass ONE hub link instead of enumerating every glossary/guide page:
 *   <Footer
 *     brand="NOXEL SEO"
 *     siteUrl="https://www.noxelseo.com"
 *     contactEmail="hello@noxelseo.com"
 *     links={[
 *       { label: "About", href: "/about" },
 *       { label: "Glossary", href: "/glossary" },
 *       { label: "Privacy", href: "/privacy" },
 *       { label: "Terms", href: "/terms" },
 *     ]}
 *   />
 */

export interface FooterLink {
  label: string;
  href: string;
  /** Opens in a new tab. Defaults to false (mailto/relative links usually stay in-tab). */
  external?: boolean;
}

export interface FooterProps {
  /** Product name shown in aria-labels, e.g. "NOXEL SEO" or "NOXEL Forge" */
  brand: string;
  /** Canonical site URL, e.g. "https://www.noxelseo.com" — used for JSON-LD "url" */
  siteUrl: string;
  /** Contact email shown as a mailto link */
  contactEmail: string;
  /** Current UI locale (e.g. "fr", "es"). Only the 6 translated pages (index, about, privacy, terms, seo-mistakes.html, seo-tips.html) get locale-prefixed; other links stay in English. */
  locale?: string;
  /** Footer nav links — keep this short. One hub link (e.g. "Glossary") instead of listing every individual page. */
  links: FooterLink[];
  /** Copyright line override. Defaults to "© {year} NOXEL360" */
  copyrightText?: string;
  /** Accent color for links/icons. Defaults to NOXEL green. */
  accentColor?: string;
  /** Show a small "Powered by NOXEL FORGE" cross-promo badge linking to noxelforge.com. Defaults to false. */
  showForgePartnerBadges?: boolean;
}

const SOCIAL_LINKS: { name: string; url: string; path: string }[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/NOXEL360/",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/noxel360/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@noxel360",
    path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/noxel360/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "X",
    url: "https://x.com/NOXEL360",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.87L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Pinterest",
    url: "https://ca.pinterest.com/NOXEL360",
    path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.163-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.784c0-1.671.969-2.919 2.175-2.919 1.025 0 1.52.769 1.52 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.194.6 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.739a.36.36 0 01.083.345l-.333 1.36c-.053.222-.174.271-.402.165-1.495-.696-2.431-2.882-2.431-4.641 0-3.776 2.744-7.252 7.914-7.252 4.155 0 7.38 2.96 7.38 6.916 0 4.129-2.605 7.452-6.223 7.452-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.62 0 11.987-5.366 11.987-11.987C23.999 5.367 18.634.001 12.017.001z",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/user/cl_noxelseo/",
    path: "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 3.53 12.42c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.72zm-9.673 10.475c-.63 0-1.146.512-1.146 1.145 0 .631.516 1.147 1.146 1.147.629 0 1.145-.516 1.145-1.147.001-.632-.516-1.145-1.145-1.145zm5.35 5.078c-.634 0-1.146.512-1.146 1.143 0 .629.512 1.144 1.146 1.144.63 0 1.147-.515 1.147-1.144a1.146 1.146 0 0 0-1.147-1.143z",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@NOXEL360",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "Bluesky",
    url: "https://bsky.app/profile/noxel360.bsky.social",
    path: "M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 01-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z",
  },
];


export default function Footer({
  brand,
  siteUrl,
  contactEmail,
  links,
  copyrightText,
  accentColor = "#3ddc84",
  showForgePartnerBadges = false,
  locale = 'en',
}: FooterProps) {
  // Liens vers les autres sites NOXEL : pas de noreferrer (le choix de consentement voyage dans le lien)
  const isNoxel = (href: string) => /^https:\/\/(www\.)?(noxel360|noxelseo|noxelforge|noxelspectra)\.com/.test(href);
  const localizeHref = (href: string) => href;
  void locale;
  const year = new Date().getFullYear();
  const sameAs = SOCIAL_LINKS.map((s) => s.url);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand,
    url: siteUrl,
    sameAs,
  };

  const navLinkStyle: React.CSSProperties = {
    fontSize: 14,
    color: accentColor,
    textDecoration: "none",
    fontWeight: 700,
  };

  const iconStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    color: "rgba(255,255,255,0.45)",
    transition: "color 0.15s ease",
  };

  return (
    <footer
      style={{
        marginTop: 32,
        padding: "24px 0 20px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* schema.org Organization + sameAs — helps AEO/GEO engines resolve brand identity */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Row 1 — nav links (keep short: one hub link per content area, not every page) */}
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={localizeHref(link.href)}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? (isNoxel(link.href) ? "noopener" : "noopener noreferrer") : undefined}
            aria-label={link.external ? `${link.label} (opens in new tab)` : link.label}
            style={navLinkStyle}
          >
            {link.label}
          </a>
        ))}
        <a href={`mailto:${contactEmail}`} style={navLinkStyle}>Contact</a>
        <button type="button" data-noxel-consent-settings style={{ ...navLinkStyle, background: "none", border: 0, padding: 0, font: "inherit", cursor: "pointer" }}>Privacy preferences</button>
        {showForgePartnerBadges && (
          <a
            href="https://noxelforge.com"
            target="_blank"
            rel="noopener"
            aria-label={`${brand} partners with NOXEL FORGE (opens in new tab)`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              padding: "4px 10px",
              borderRadius: 99,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Powered by NOXEL FORGE
          </a>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />

      {/* Row 2 — copyright (left) + social icons (right), no boxed backgrounds */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
          {copyrightText ?? `© ${year} NOXEL360`}
        </span>

        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`Follow ${brand} on ${s.name}`}
              title={s.name}
              style={iconStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}


