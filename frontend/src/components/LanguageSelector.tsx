// NOXEL SEO — LanguageSelector

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LANGUAGES_115, FULLY_TRANSLATED } from "../i18n/languages";
import worldSvg from "../../public/world-map.svg?raw";

type Props = { locale: string; onChange: (code: string) => void };
type ViewMode = "list" | "map";

const COUNTRY_LANGS: Record<string, string[]> = {
  ae: ["ar"], af: ["en"], al: ["en"], am: ["ru"], ao: ["pt"],
  ar: ["es"], at: ["de"], au: ["en"], az: ["ru"], ba: ["en"],
  bd: ["hi", "en"], be: ["fr", "de"], bf: ["fr"], bg: ["en"],
  bi: ["fr"], bj: ["fr"], bn: ["en"], bo: ["es"], br: ["pt"],
  bs: ["en"], bt: ["hi", "en"], bw: ["en"], by: ["ru"], bz: ["en", "es"],
  ca: ["en", "fr"], cd: ["fr"], cf: ["fr"], cg: ["fr"],
  ch: ["de", "fr", "it"], ci: ["fr"], cl: ["es"], cm: ["en", "fr"],
  cn: ["zh"], co: ["es"], cr: ["es"], cu: ["es"], cv: ["pt"],
  cy: ["en"], cz: ["en"], de: ["de"], dk: ["en"], dj: ["fr", "ar"],
  dm: ["en"], do: ["es"], dz: ["ar"], ec: ["es"], ee: ["en"],
  eg: ["ar"], er: ["ar", "en"], es: ["es"], et: ["en"],
  fi: ["en"], fk: ["en"], fr: ["fr"], ga: ["fr"], gb: ["en"],
  ge: ["ru"], gh: ["en"], gl: ["en"], gm: ["en"], gn: ["fr"],
  gq: ["es", "fr"], gr: ["en"], gt: ["es"], gw: ["pt"], gy: ["en"],
  hn: ["es"], hr: ["en"], ht: ["fr"], hu: ["en"], id: ["en"],
  ie: ["en"], il: ["ar"], in: ["hi", "en"], iq: ["ar"], ir: ["ar"],
  is: ["en"], it: ["it"], jm: ["en"], jo: ["ar"], jp: ["ja"],
  ke: ["en"], kg: ["ru"], kh: ["en"], km: ["ar", "fr"],
  kp: ["ko"], kr: ["ko"], kw: ["ar"], kz: ["ru"], la: ["en"],
  lb: ["ar", "fr"], lc: ["en"], lk: ["en"], lr: ["en"],
  ls: ["en"], lt: ["en"], lu: ["fr", "de"], lv: ["en"], ly: ["ar"],
  ma: ["ar"], md: ["ru"], me: ["en"], mg: ["fr"], mk: ["en"],
  ml: ["fr"], mm: ["en"], mn: ["ru"], mr: ["ar"], mt: ["en"],
  mu: ["en"], mv: ["en"], mw: ["en"], mx: ["es"], my: ["en"],
  mz: ["pt"], na: ["en"], nc: ["fr"], ne: ["fr"], ng: ["en"],
  ni: ["es"], nl: ["en"], no: ["en"], np: ["hi", "en"], nz: ["en"],
  om: ["ar"], pa: ["es"], pe: ["es"], pg: ["en"], ph: ["en"],
  pk: ["en"], pl: ["en"], pr: ["es", "en"], pt: ["pt"], py: ["es"],
  qa: ["ar"], ro: ["en"], rs: ["en"], ru: ["ru"], rw: ["en", "fr"],
  sa: ["ar"], sb: ["en"], sc: ["fr", "en"], sd: ["ar", "en"],
  se: ["en"], sg: ["en", "zh"], si: ["en"], sk: ["en"], sl: ["en"],
  sn: ["fr"], so: ["ar"], sr: ["en"], ss: ["en"], st: ["pt"],
  sv: ["es"], sy: ["ar"], sz: ["en"], td: ["fr", "ar"],
  tg: ["fr"], th: ["en"], tj: ["ru"], tm: ["ru"], tn: ["ar"],
  tr: ["en"], tt: ["en"], tw: ["zh"], tz: ["en"], ua: ["ru"],
  ug: ["en"], us: ["en"], uy: ["es"], uz: ["ru"], ve: ["es"],
  vn: ["en"], vu: ["en", "fr"], ye: ["ar"], za: ["en"],
  zm: ["en"], zw: ["en"],
};

const LANG_INFO: Record<string, { flag: string; native: string; english: string }> = {
  en: { flag: "🇺🇸", native: "English", english: "English" },
  fr: { flag: "🇫🇷", native: "Français", english: "French" },
  es: { flag: "🇪🇸", native: "Español", english: "Spanish" },
  de: { flag: "🇩🇪", native: "Deutsch", english: "German" },
  it: { flag: "🇮🇹", native: "Italiano", english: "Italian" },
  pt: { flag: "🇧🇷", native: "Português", english: "Portuguese" },
  ru: { flag: "🇷🇺", native: "Русский", english: "Russian" },
  ar: { flag: "🇸🇦", native: "العربية", english: "Arabic" },
  hi: { flag: "🇮🇳", native: "हिन्दी", english: "Hindi" },
  zh: { flag: "🇨🇳", native: "中文", english: "Chinese" },
  ko: { flag: "🇰🇷", native: "한국어", english: "Korean" },
  ja: { flag: "🇯🇵", native: "日本語", english: "Japanese" },
};

const COUNTRY_NAMES: Record<string, string> = {
  ca: "Canada", us: "United States", fr: "France", de: "Germany",
  es: "Spain", it: "Italy", br: "Brazil", pt: "Portugal",
  ru: "Russia", sa: "Saudi Arabia", in: "India", cn: "China",
  kr: "South Korea", jp: "Japan", gb: "United Kingdom",
  au: "Australia", mx: "Mexico", ar: "Argentina", be: "Belgium",
  ch: "Switzerland", za: "South Africa",
};

const GREEN = "rgb(60,222,106)";

const LANG_TO_COUNTRIES: Record<string, string[]> = {};
for (const [country, langs] of Object.entries(COUNTRY_LANGS)) {
  for (const lang of langs) {
    if (!LANG_TO_COUNTRIES[lang]) LANG_TO_COUNTRIES[lang] = [];
    LANG_TO_COUNTRIES[lang].push(country);
  }
}

export default function LanguageSelector({ locale, onChange }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [panelPos, setPanelPos] = useState({ top: 0, right: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapWrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const current =
    LANGUAGES_115.find((l) => l.code === locale) ??
    LANGUAGES_115.find((l) => l.code === "en")!;

  useEffect(() => {
    const timer = setTimeout(() => {
    svgRef.current = mapWrapRef.current?.querySelector("svg") ?? null;
    const svg = svgRef.current;
    if (!svg) return;

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("viewBox", "0 40 900 700");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.display = "block";
    svg.style.margin = "0 auto";

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    paths.forEach((p) => {
      const parent = p.closest<SVGGElement>("g[id]");
      const id = (p.id || parent?.id || "").trim().toLowerCase();
      if (id) p.setAttribute("data-id", id);
      if (!p.getAttribute("fill") || p.getAttribute("fill") === "none") {
        p.style.fill = "#9BD5C1";
      }
      p.style.stroke = "#0477BE";
      p.style.strokeWidth = "0.5";
      p.style.transition = "fill 0.12s ease, filter 0.12s ease, stroke 0.12s ease";
      p.style.pointerEvents = "all";
    });
    }, 50);
    return () => clearTimeout(timer);
  }, [viewMode, menuOpen]);

  const resolveDataId = (target: EventTarget | null): string | null => {
    if (!(target instanceof Element)) return null;
    const hit = target.closest<SVGElement>("[data-id], path[id], g[id]");
    const raw =
      hit?.getAttribute("data-id") ||
      hit?.getAttribute("id") ||
      hit?.closest("g[id]")?.getAttribute("id") ||
      "";
    return raw.trim().toLowerCase() || null;
  };

  const clearClass = (className: string) => {
    svgRef.current?.querySelectorAll<SVGElement>("." + className).forEach((n) => n.classList.remove(className));
  };

  const applyClassById = (id: string | null, className: string, clearFirst = true) => {
    const svg = svgRef.current;
    if (!svg) return;
    if (clearFirst) clearClass(className);
    if (!id) return;
    const escaped = CSS.escape(id);
    const direct = Array.from(svg.querySelectorAll<SVGElement>(`[data-id="${id}"], #${escaped}`));
    const targets: SVGElement[] = [];
    direct.forEach((el) => {
      targets.push(el);
      el.querySelectorAll<SVGElement>("path").forEach((p) => targets.push(p));
    });
    targets.forEach((n) => n.classList.add(className));
  };

  useEffect(() => { applyClassById(hoveredId, "is-hovered"); }, [hoveredId]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    clearClass("is-selected");
    const countries = LANG_TO_COUNTRIES[locale] ?? [];
    countries.forEach((countryId) => { applyClassById(countryId, "is-selected", false); });
  }, [locale, viewMode, menuOpen]);

  const onPointerMove = (e: React.PointerEvent) => {
    const id = resolveDataId(e.target);
    const validId = id && COUNTRY_LANGS[id] ? id : null;
    setHoveredId((prev) => (prev === validId ? prev : validId));
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll<SVGPathElement>("path");
      paths.forEach((p) => {
        if (!p.style.fill || p.style.fill === "") {
          if (!p.classList.contains("is-hovered") && !p.classList.contains("is-selected")) {
            p.style.fill = "#9BD5C1";
            p.style.stroke = "#0477BE";
          }
        }
      });
    }
  };

  const onPointerLeave = () => setHoveredId(null);

  const onClick = (e: React.MouseEvent) => {
    const id = resolveDataId(e.target);
    if (!id || !COUNTRY_LANGS[id]) return;
    const langs = COUNTRY_LANGS[id];
    const next = langs.find((l) => l !== locale) ?? langs[0];
    onChange(next);
    setMenuOpen(false);
  };

  const updatePosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPanelPos({ top: rect.bottom + 8, right: Math.max(8, window.innerWidth - rect.right) });
  };

  useEffect(() => {
    if (!menuOpen) { setQuery(""); setShowAll(false); setHoveredId(null); return; }
    updatePosition();
    const timer = setTimeout(() => { if (viewMode === "list") searchRef.current?.focus(); }, 50);
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    const onScroll = () => updatePosition();
    document.addEventListener("click", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [menuOpen, viewMode]);

  const translatedLanguages = useMemo(() => LANGUAGES_115.filter((l) => FULLY_TRANSLATED.has(l.code)), []);
  const sourceList = showAll ? LANGUAGES_115 : translatedLanguages;
  const filteredLanguages = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sourceList;
    return sourceList.filter((l) =>
      l.code.toLowerCase().includes(q) ||
      l.english.toLowerCase().includes(q) ||
      l.native.toLowerCase().includes(q)
    );
  }, [query, sourceList]);

  const handleSelect = (code: string) => { onChange(code); setMenuOpen(false); };

  const hovLangs = hoveredId ? COUNTRY_LANGS[hoveredId] ?? [] : [];
  const countryName = hoveredId ? COUNTRY_NAMES[hoveredId] ?? hoveredId.toUpperCase() : null;
  const panelWidth = viewMode === "map" ? "min(1040px, calc(100vw - 32px))" : showAll ? 320 : 280;

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          minWidth: 140, minHeight: 40, padding: "8px 14px", borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.14)",
          background: menuOpen ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.05)",
          color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer",
          backdropFilter: "blur(8px)", fontFamily: "inherit",
        }}
      >
        <span style={{ fontSize: 16 }}>{current.flag}</span>
        <span style={{ color: GREEN }}>{current.code.toUpperCase()}</span>
        <span style={{ opacity: 0.65, fontWeight: 500, fontSize: 13 }}>{current.native}</span>
        <span aria-hidden="true" style={{ opacity: 0.5, fontSize: 10, marginLeft: 2, transform: menuOpen ? "rotate(180deg)" : "none", transition: "transform 150ms" }}>▼</span>
      </button>

      {menuOpen && createPortal(
        <div
          role="listbox"
          style={{
            position: "fixed", top: panelPos.top, right: panelPos.right,
            width: panelWidth,
            maxHeight: viewMode === "map" ? "none" : `min(460px, calc(100vh - ${panelPos.top + 16}px))`,
            display: "flex", flexDirection: "column", padding: 6, borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "linear-gradient(180deg, rgba(14,17,30,0.99) 0%, rgba(8,10,20,0.99) 100%)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(60,222,106,0.06)",
            backdropFilter: "blur(12px)", zIndex: 2147483647, color: "white",
          }}
        >
          {/* View toggle */}
          <div style={{ display: "flex", gap: 6, padding: "6px 6px 4px" }}>
            {(["list", "map"] as ViewMode[]).map((mode) => (
              <button key={mode} type="button" onClick={() => setViewMode(mode)} style={{
                flex: 1, padding: "7px 10px", borderRadius: 10, border: "none",
                cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700,
                background: viewMode === mode ? "rgba(60,222,106,0.15)" : "rgba(255,255,255,0.05)",
                color: viewMode === mode ? GREEN : "rgba(255,255,255,0.6)",
                outline: viewMode === mode ? "1px solid rgba(60,222,106,0.3)" : "none",
              }}>
                {mode === "list" ? "☰ List" : "🗺 Map"}
              </button>
            ))}
          </div>

          {/* MAP VIEW */}
          {viewMode === "map" && (
            <div style={{ padding: "4px 6px 8px" }}>
              <style>{`
                .nxl-map-wrap svg { width: 100% !important; height: 100% !important; display: block !important; transform: translateY(0); }
                .nxl-map-wrap svg g, .nxl-map-wrap svg path { pointer-events: all; fill: #9BD5C1; stroke: #0477BE; stroke-width: 0.5; transition: fill 0.12s ease, filter 0.12s ease, stroke 0.12s ease; }
                .nxl-map-wrap svg path.is-hovered, .nxl-map-wrap svg g.is-hovered path { fill: rgba(112,42,165,0.85) !important; stroke: rgba(180,120,255,1) !important; stroke-width: 1.8 !important; filter: drop-shadow(0 0 8px rgba(131,90,255,0.5)) !important; }
                .nxl-map-wrap { cursor: crosshair; }
              `}</style>
              <div ref={mapWrapRef} className="nxl-map-wrap"
                dangerouslySetInnerHTML={{ __html: worldSvg.replace('viewBox="0 0 784.077 458.627"', 'viewBox="0 40 900 700"').replace('width="784.077px"', 'width="100%"').replace('height="458.627px"', 'height="100%"') }}
                onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} onClick={onClick}
                style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#07090f", lineHeight: 0, height: 700, display: "flex", alignItems: "center", justifyContent: "center" }}
              />
              <div style={{ marginTop: 8, padding: "9px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.07)", minHeight: 42, display: "flex", alignItems: "center", gap: 10 }}>
                {hoveredId && hovLangs.length > 0 ? (
                  <>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", flexShrink: 0 }}>{countryName}</span>
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {hovLangs.map((lc) => {
                        const info = LANG_INFO[lc];
                        if (!info) return null;
                        const isActive = lc === locale;
                        return (
                          <button key={lc} type="button" onClick={(e) => { e.stopPropagation(); handleSelect(lc); }}
                            style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 99, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700, background: isActive ? "rgba(60,222,106,0.2)" : "rgba(255,255,255,0.08)", color: isActive ? GREEN : "white", outline: isActive ? "1px solid rgba(60,222,106,0.4)" : "none" }}>
                            <span>{info.flag}</span><span>{info.english}</span>{isActive && <span style={{ fontSize: 10 }}>✓</span>}
                          </button>
                        );
                      })}
                    </div>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginLeft: "auto", flexShrink: 0 }}>Click to select</span>
                  </>
                ) : (
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                    {LANG_INFO[locale]?.flag}&nbsp;<strong style={{ color: "rgba(255,255,255,0.6)" }}>{LANG_INFO[locale]?.english}</strong>&nbsp;active · Hover a country to change language
                  </span>
                )}
              </div>
              <div style={{ marginTop: 5, fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
                193 countries · Violet = hover · Green = active language
              </div>
            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === "list" && (
            <>
              <div style={{ padding: "4px 6px 6px" }}>
                <input ref={searchRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder={showAll ? "Search 115 languages…" : "Search language…"}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)", color: "white", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ padding: "0 12px 6px", fontSize: 10, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.09em" }}>
                {filteredLanguages.length} {showAll ? "languages" : "fully translated"}
              </div>
              <div style={{ flex: 1, overflowY: "auto" }}>
                {filteredLanguages.map((item) => {
                  const active = item.code === locale;
                  return (
                    <button key={item.code} type="button" role="option" aria-selected={active}
                      onClick={() => handleSelect(item.code)} dir={item.dir}
                      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "9px 10px", borderRadius: 10, border: "none", background: active ? "rgba(60,222,106,0.12)" : "transparent", color: "white", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{item.flag}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.english}</div>
                        <div style={{ opacity: 0.55, fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.native}</div>
                      </span>
                      <span style={{ fontSize: 9, opacity: 0.4, fontFamily: "monospace", textTransform: "uppercase", flexShrink: 0 }}>{item.code}</span>
                      {active && <span style={{ color: GREEN, fontWeight: 800 }}>✓</span>}
                    </button>
                  );
                })}
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "6px 4px" }} />
              {!showAll ? (
                <button type="button" onClick={() => { setShowAll(true); setQuery(""); }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", background: "transparent", color: "rgba(255,255,255,0.70)", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                  <span>All {LANGUAGES_115.length} languages</span>
                  <span style={{ opacity: 0.5 }}>→</span>
                </button>
              ) : (
                <button type="button" onClick={() => { setShowAll(false); setQuery(""); }}
                  style={{ display: "flex", alignItems: "center", width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", background: "transparent", color: "rgba(255,255,255,0.50)", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
                  ← Fully translated only
                </button>
              )}
            </>
          )}
        </div>
      , document.body)}
    </div>
  );
}



