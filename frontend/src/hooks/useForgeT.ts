import { useState, useEffect } from 'react';
import { getForgeT, ForgeTranslations, LANGUAGES_115 } from '../i18n/forge.translations';

const STORAGE_KEY = 'forge_lang';

export function useForgeT() {
  const [lang, setLang] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    const browser = navigator.language.split('-')[0];
    return browser || 'en';
  });

  const t: ForgeTranslations = getForgeT(lang);

  function changeLang(code: string) {
    setLang(code);
    localStorage.setItem(STORAGE_KEY, code);
  }

  return { t, lang, changeLang, languages: LANGUAGES_115 };
}
