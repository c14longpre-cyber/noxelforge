import { useState, useEffect } from 'react';
import { getForgeT, LANGUAGES_115 } from '../i18n/forge.translations';
import type { ForgeTranslations } from '../i18n/forge.translations';
import en from '../i18n/forge/en';

const STORAGE_KEY = 'forge_lang';
const LANG_EVENT = 'forge-lang-change';

// Pages publiques qui existent aussi en français sous /fr (Loi 96, scripts/route-pages-fr.mjs).
const PUBLIC_PAGES = ['/forge', '/forge/pricing', '/forge/partners', '/forge/submit', '/forge/badge', '/forge/guidelines'];
const isFrPath = () => window.location.pathname === '/fr' || window.location.pathname.startsWith('/fr/');

/** L'adresse de la même page publique dans l'autre langue, ou null si la page n'a pas de version /fr. */
function otherLanguagePath(toFrench: boolean): string | null {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const base = isFrPath() ? path.slice(3) || '/forge' : path;
  if (!PUBLIC_PAGES.includes(base)) return null;
  const target = toFrench ? `/fr${base}` : base;
  return target === path ? null : target + window.location.search + window.location.hash;
}

export function useForgeT() {
  const [lang, setLang] = useState<string>(() => {
    // Une adresse /fr/… est en français, quel que soit le choix enregistré.
    if (isFrPath()) {
      try { localStorage.setItem(STORAGE_KEY, 'fr'); } catch { /* stockage indisponible */ }
      return 'fr';
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    const browser = navigator.language.split('-')[0];
    return browser || 'en';
  });

  const [t, setT] = useState<ForgeTranslations>(en);

  // <html lang> = langue affichée : Chrome ne propose plus de retraduire l'interface (voir translationGuard.ts).
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  useEffect(() => {
    let cancelled = false;
    getForgeT(lang).then((translations) => {
      if (!cancelled) setT(translations);
    });
    return () => { cancelled = true; };
  }, [lang]);

  // L'en-tête et la page ont chacun leur useForgeT : un changement de langue est
  // annoncé à toute la page pour que tout passe dans la même langue.
  useEffect(() => {
    const onLang = (e: Event) => setLang((e as CustomEvent<string>).detail);
    window.addEventListener(LANG_EVENT, onLang);
    return () => window.removeEventListener(LANG_EVENT, onLang);
  }, []);

  function changeLang(code: string) {
    // Sur une page publique, passer du français à une autre langue (ou l'inverse) ouvre l'adresse de cette langue.
    const target = otherLanguagePath(code === 'fr');
    if (target) {
      try { localStorage.setItem(STORAGE_KEY, code); } catch { /* stockage indisponible */ }
      window.location.assign(target);
      return;
    }
    setLang(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* stockage indisponible */ }
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: code }));
  }

  return { t, lang, changeLang, languages: LANGUAGES_115 };
}
