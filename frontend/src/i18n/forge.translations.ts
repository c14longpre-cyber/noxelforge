import { LANGUAGES_115 } from './languages';

export type ForgeTranslations = {
  nav: { submit: string; dashboard: string; pricing: string; badges: string; back: string; };
  hero: { kicker: string; title: string; titleAccent: string; subtitle: string; ctaSubmit: string; ctaDashboard: string; };
  stats: { forgePoints: string; forgePointsDesc: string; giveOne: string; giveOneDesc: string; alfredFilters: string; alfredFiltersDesc: string; };
  trust: { kicker: string; subtitle: string; };
  directory: { kicker: string; title: string; empty: string; emptyDesc: string; loading: string; previous: string; next: string; };
  submit: { alfredTitle: string; alfredDesc: string; urlLabel: string; urlHint: string; titleLabel: string; nicheLabel: string; descLabel: string; contentLabel: string; contentHint: string; submitBtn: string; analyzing: string; successTitle: string; successAuto: string; successPending: string; submitAnother: string; viewDashboard: string; requiredFields: string; niches: { [key: string]: string }; };
  pricing: { kicker: string; title: string; titleAccent: string; subtitle: string; monthly: string; annual: string; discount: string; badgeToggle: string; badgeApplied: string; mostPopular: string; perMonth: string; getStartedFree: string; ctaBadge: string; ctaSilver: string; ctaGold: string; ctaPlatinum: string; ctaDiamond: string; badgeInfoTitle: string; badgeInfoDesc: string; billedPerYear: string; };
  badge: { kicker: string; title: string; titleAccent: string; subtitle: string; copy: string; copied: string; partner: string; verified: string; exchange: string; optimized: string; infoTitle: string; infoDesc: string; };
  cta: { kicker: string; title: string; subtitle: string; };
  email: { magicLinkSubject: string; magicLinkTitle: string; magicLinkDesc: string; magicLinkCta: string; magicLinkExpiry: string; };
}

const modules = import.meta.glob<{ default: ForgeTranslations }>('./forge/*.ts');

export async function getForgeT(lang: string): Promise<ForgeTranslations> {
  const key = `./forge/${lang}.ts`;
  const loader = modules[key] ?? modules['./forge/en.ts'];
  const mod = await loader();
  return mod.default;
}

export { LANGUAGES_115 };
