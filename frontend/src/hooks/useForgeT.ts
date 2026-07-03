import { useState, useEffect } from 'react';
import { getForgeT, LANGUAGES_115 } from '../i18n/forge.translations';
import type { ForgeTranslations } from '../i18n/forge.translations';
import en from '../i18n/forge/en';

const STORAGE_KEY = 'forge_lang';

export function useForgeT() {
  const [lang, setLang] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    const browser = navigator.language.split('-')[0];
    return browser || 'en';
  });

  const [t, setT] = useState<ForgeTranslations>(en);

  useEffect(() => {
    let cancelled = false;
    getForgeT(lang).then((translations) => {
      if (!cancelled) setT(translations);
    });
    return () => { cancelled = true; };
  }, [lang]);

  function changeLang(code: string) {
    setLang(code);
    localStorage.setItem(STORAGE_KEY, code);
  }

  return { t, lang, changeLang, languages: LANGUAGES_115 };
}
