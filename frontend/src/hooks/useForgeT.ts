import { useState, useEffect } from 'react';
import { getForgeT, LANGUAGES_115 } from '../i18n/forge.translations';
import type { ForgeTranslations } from '../i18n/forge.translations';
import en from '../i18n/forge/en';

const STORAGE_KEY = 'forge_lang';
const LANG_EVENT = 'forge-lang-change';

export function useForgeT() {
  const [lang, setLang] = useState<string>(() => {
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
    setLang(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* stockage indisponible */ }
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: code }));
  }

  return { t, lang, changeLang, languages: LANGUAGES_115 };
}
