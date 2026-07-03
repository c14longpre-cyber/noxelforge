import { LANGUAGES_115 } from './languages';

export type ForgeTranslations = {
  nav: { submit: string; dashboard: string; pricing: string; badges: string; };
  hero: { kicker: string; title: string; titleAccent: string; subtitle: string; ctaSubmit: string; ctaDashboard: string; };
  stats: { forgePoints: string; forgePointsDesc: string; giveOne: string; giveOneDesc: string; alfredFilters: string; alfredFiltersDesc: string; };
  trust: { kicker: string; subtitle: string; };
  directory: { kicker: string; title: string; empty: string; emptyDesc: string; loading: string; previous: string; next: string; };
  submit: { alfredTitle: string; alfredDesc: string; urlLabel: string; urlHint: string; titleLabel: string; nicheLabel: string; descLabel: string; contentLabel: string; contentHint: string; submitBtn: string; analyzing: string; };
  pricing: { kicker: string; title: string; titleAccent: string; subtitle: string; monthly: string; annual: string; badgeToggle: string; badgeApplied: string; mostPopular: string; perMonth: string; getStarted: string; badgeInfoTitle: string; badgeInfoDesc: string; };
  badge: { kicker: string; title: string; titleAccent: string; subtitle: string; copy: string; copied: string; infoTitle: string; infoDesc: string; };
  cta: { kicker: string; title: string; subtitle: string; };
}

const modules = import.meta.glob<{ default: ForgeTranslations }>('./forge/*.ts');

export async function getForgeT(lang: string): Promise<ForgeTranslations> {
  const key = `./forge/${lang}.ts`;
  const loader = modules[key] ?? modules['./forge/en.ts'];
  const mod = await loader();
  return mod.default;
}

export { LANGUAGES_115 };
