import { useEffect, useRef } from "react";
import "../nx-search.js";

/**
 * Recherche « app ou guides » de la barre du haut (NOXEL Shell 1.3, nx-search.js), comme NOXEL SEO.
 * navigate(url) ouvre la page dans l'app et renvoie true ; sinon la page se charge normalement.
 * lang : langue du champ (fr ou en, sinon celle enregistrée sous noxel-lang) ; le champ se refait quand elle change.
 */
type SearchApi = { destroy: () => void };
declare global {
  interface Window {
    NoxelSearch?: { mount: (el: HTMLElement, opts?: { index?: string; lang?: string; navigate?: (url: string) => boolean }) => SearchApi | undefined };
  }
}

export default function NxSearch({ navigate, index, lang }: { navigate?: (url: string) => boolean; index?: string; lang?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const nav = useRef(navigate);
  nav.current = navigate;

  useEffect(() => {
    if (!ref.current) return;
    const api = window.NoxelSearch?.mount(ref.current, { index, lang, navigate: (url) => nav.current?.(url) ?? false });
    return () => api?.destroy();
  }, [index, lang]);

  return <div ref={ref} className="nx-search" />;
}
