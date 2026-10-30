import { LANGUAGES_115 } from './languages';

export type ForgeTranslations = {
  nav: { submit: string; dashboard: string; pricing: string; badges: string; back: string; };
  hero: { kicker: string; title: string; titleAccent: string; subtitle: string; ctaSubmit: string; ctaDashboard: string; };
  stats: { forgePoints: string; forgePointsDesc: string; giveOne: string; giveOneDesc: string; alfredFilters: string; alfredFiltersDesc: string; };
  trust: { kicker: string; subtitle: string; };
  directory: { kicker: string; title: string; empty: string; emptyDesc: string; loading: string; previous: string; next: string; };
  submit: { alfredTitle: string; alfredDesc: string; urlLabel: string; urlHint: string; titleLabel: string; nicheLabel: string; descLabel: string; contentLabel: string; contentHint: string; submitBtn: string; analyzing: string; successTitle: string; successAuto: string; successPending: string; submitAnother: string; viewDashboard: string; requiredFields: string; niches: { [key: string]: string }; };
  pricing: { kicker: string; title: string; titleAccent: string; subtitle: string; monthly: string; annual: string; discount: string; badgeToggle: string; badgeApplied: string; mostPopular: string; perMonth: string; getStartedFree: string; ctaBadge: string; ctaSilver: string; ctaGold: string; ctaPlatinum: string; ctaDiamond: string; badgeInfoTitle: string; badgeInfoDesc: string; billedPerYear: string; currencyNote: string; alreadySubscribed: string; };
  badge: { kicker: string; title: string; titleAccent: string; subtitle: string; copy: string; copied: string; partner: string; verified: string; exchange: string; optimized: string; infoTitle: string; infoDesc: string; };
  cta: { kicker: string; title: string; subtitle: string; };
  email: { magicLinkSubject: string; magicLinkTitle: string; magicLinkDesc: string; magicLinkCta: string; magicLinkExpiry: string; };
}

/**
 * Dictionnaire d'une langue pas encore entièrement traduite : chaque section
 * et chaque clé peuvent manquer. getForgeT complète avec l'anglais, pour
 * qu'une clé absente affiche le texte anglais au lieu d'un vide.
 */
export type ForgePartialTranslations = {
  [S in keyof ForgeTranslations]?: Partial<ForgeTranslations[S]>;
};

const modules = import.meta.glob<{ default: ForgeTranslations | ForgePartialTranslations }>('./forge/*.ts');

function withEnglishFallback(en: ForgeTranslations, partial: ForgePartialTranslations): ForgeTranslations {
  const merged = { ...en } as Record<keyof ForgeTranslations, unknown>;
  for (const section of Object.keys(en) as (keyof ForgeTranslations)[]) {
    merged[section] = { ...en[section], ...partial[section] };
  }
  const niches = { ...en.submit.niches, ...partial.submit?.niches };
  return { ...(merged as ForgeTranslations), submit: { ...(merged.submit as ForgeTranslations['submit']), niches } };
}

export async function getForgeT(lang: string): Promise<ForgeTranslations> {
  const en = (await modules['./forge/en.ts']()).default as ForgeTranslations;
  const loader = modules[`./forge/${lang}.ts`];
  if (!loader || lang === 'en') return en;
  return withEnglishFallback(en, (await loader()).default);
}

export { LANGUAGES_115 };
