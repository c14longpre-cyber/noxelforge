import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import worldSvgRaw from "../../public/world-map.svg?raw";
import { COUNTRY_DATA, type CountryInfo } from "../i18n/nexus/countryData";
import { getIndigenousLanguagesLabel } from "../i18n/nexus/indigenous";

type Props = {
  locale: string;
  onChange: (code: string) => void;
  onClose?: () => void;
};

type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  iso: string | null;
};

const LANGUAGE_BY_ISO2: Record<string, string> = {
  CA: "fr", US: "en", FR: "fr", MX: "es", BR: "pt", PE: "es",
  ES: "es", DE: "de", IT: "it", PT: "pt", NL: "nl", JP: "ja",
  CN: "zh", IN: "hi", AU: "en", NZ: "en", SA: "ar", NO: "no",
  FI: "fi", ET: "am", KE: "en",
};

const MAP_STYLE = ".noxel-map-wrap svg path { fill: #9BD5C1; stroke: #0477BE; stroke-width: 0.5; transition: fill 0.12s ease, stroke 0.12s ease, filter 0.12s ease; } .noxel-map-wrap svg path.iso-selected { fill: #3CDE6A !important; stroke: #702AA5 !important; stroke-width: 1.2 !important; filter: drop-shadow(0 0 6px rgba(60,222,106,0.6)) !important; } .noxel-map-wrap svg path.iso-hovered { fill: #8ae7a8 !important; stroke: #702AA5 !important; stroke-width: 0.9 !important; filter: drop-shadow(0 0 4px rgba(138,231,168,0.5)) !important; }";

function normalizeIso(raw?: string | null): string | null {
  if (!raw) return null;
  const clean = raw.trim().toLowerCase().replace(/^_+/, "");
  if (!/^[a-z]{2,3}$/.test(clean)) return null;
  return clean.toUpperCase();
}

function findIsoFromElement(el: Element | null): string | null {
  let node: Element | null = el;
  while (node) {
    const iso =
      normalizeIso(node.getAttribute("data-id")) ||
      normalizeIso(node.getAttribute("data-iso")) ||
      normalizeIso(node.id) ||
      normalizeIso(node.closest("g[id]")?.getAttribute("id") ?? null);
    if (iso) return iso;
    node = node.parentElement;
  }
  return null;
}

export default function NoxelInterface({ locale, onChange, onClose }: Props) {
  const [selectedIso, setSelectedIso] = useState<string>("CA");
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, iso: null });
  const mapHostRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const countryByIso2 = useMemo<Map<string, CountryInfo>>(() => {
    const map = new Map<string, CountryInfo>();
    Object.values(COUNTRY_DATA).forEach((row: CountryInfo) => {
      if (!row.iso2) return;
      map.set(row.iso2.toUpperCase(), row);
    });
    return map;
  }, []);

  const selectedCountry = countryByIso2.get(selectedIso) || null;
  const hoveredCountry = tooltip.iso ? countryByIso2.get(tooltip.iso) || null : null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useLayoutEffect(() => {
    svgRef.current = mapHostRef.current?.querySelector("svg") ?? null;
    const svg = svgRef.current;
    if (!svg) return;

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.display = "block";
    svg.setAttribute("viewBox", "0 40 900 700");

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    paths.forEach((p) => {
      const parent = p.closest<SVGGElement>("g[id]");
      const id = (p.id || parent?.id || "").trim().toLowerCase();
      if (id) p.setAttribute("data-id", id);
      p.style.pointerEvents = "all";
      p.style.cursor = "pointer";
    });

    const initial = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-id]"));
    initial.forEach((p) => {
      const id = p.getAttribute("data-id");
      p.classList.toggle("iso-selected", id === selectedIso.toLowerCase());
    });
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-id]"));
    paths.forEach((p) => {
      const id = p.getAttribute("data-id");
      p.classList.toggle("iso-selected", id === selectedIso.toLowerCase());
      p.classList.toggle("iso-hovered", id === hoveredIso?.toLowerCase());
    });
  }, [selectedIso, hoveredIso]);

  function onPointerMove(e: React.PointerEvent) {
    const id = findIsoFromElement(e.target as Element);
    setHoveredIso(id);
    if (!id || !mapHostRef.current) {
      setTooltip((p) => ({ ...p, visible: false, iso: null }));
      return;
    }
    const rect = mapHostRef.current.getBoundingClientRect();
    setTooltip({ visible: true, x: e.clientX - rect.left + 12, y: e.clientY - rect.top + 12, iso: id });
  }

  function onPointerLeave() {
    setHoveredIso(null);
    setTooltip((p) => ({ ...p, visible: false, iso: null }));
  }

  function onClick(e: React.MouseEvent) {
    const id = findIsoFromElement(e.target as Element);
    if (!id) return;
    setSelectedIso(id);
  }

  function applyLanguage() {
    const lang = LANGUAGE_BY_ISO2[selectedIso] || "en";
    onChange(lang);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2147483647, background: "rgba(7,9,15,0.97)", overflowY: "auto" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 32px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div style={{ color: "var(--muted)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>NOXEL Interface</div>
          {onClose && (
            <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: "var(--r)", border: "1px solid var(--border)", background: "transparent", color: "var(--text)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Fermer
            </button>
          )}
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 20, color: "var(--text)" }}>Choisissez votre langue</h1>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(320px, 0.6fr)", gap: 16 }}>
          <div style={{ position: "relative", borderRadius: 20, border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", overflow: "hidden", height: 600, minHeight: 600, maxHeight: 600, padding: 8 }}>
            <style>{MAP_STYLE}</style>
            <div
              ref={mapHostRef}
              className="noxel-map-wrap"
              onClick={onClick}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              dangerouslySetInnerHTML={{ __html: worldSvgRaw }}
              style={{ width: "100%", height: "100%" }}
            />
            {tooltip.visible && tooltip.iso && (
              <div style={{ position: "absolute", left: tooltip.x, top: tooltip.y, zIndex: 20, pointerEvents: "none", background: "rgba(10,12,18,0.94)", color: "white", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 10px", fontSize: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.3)", maxWidth: 220 }}>
                <div style={{ fontWeight: 700 }}>{hoveredCountry?.name || tooltip.iso}</div>
                <div style={{ opacity: 0.7 }}>{tooltip.iso}</div>
              </div>
            )}
          </div>

          <aside style={{ borderRadius: 20, border: "1px solid var(--border)", background: "var(--bg2)", padding: 20, color: "var(--text)" }}>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Sélecteur de langue</div>
            <h2 style={{ margin: "0 0 14px", fontSize: 24, fontWeight: 900 }}>{selectedCountry?.name || selectedIso}</h2>

            {selectedCountry?.flag && (
              <img src={selectedCountry.flag} alt={selectedCountry.name} style={{ width: 56, height: 38, objectFit: "cover", borderRadius: 8, marginBottom: 14, border: "1px solid var(--border)" }} />
            )}

            <div style={{ display: "grid", gap: 9, fontSize: 14 }}>
              <div><strong>ISO2:</strong> {selectedIso}</div>
              <div><strong>ISO3:</strong> {selectedCountry?.iso3 || "—"}</div>
              <div><strong>Capitale:</strong> {selectedCountry?.capital || "—"}</div>
              <div><strong>Région:</strong> {selectedCountry?.region || "—"}</div>
              <div><strong>Subregion:</strong> {selectedCountry?.subregion || "—"}</div>
              <div><strong>Domaine:</strong> {selectedCountry?.domain || "—"}</div>
              <div><strong>Devise:</strong> {selectedCountry?.currency || "—"}</div>
              <div><strong>Langues officielles:</strong> {selectedCountry?.officialLanguages?.join(", ") || "—"}</div>
              <div><strong>Langues autochtones:</strong> {selectedCountry?.indigenousLanguages?.length ? selectedCountry.indigenousLanguages.join(", ") : getIndigenousLanguagesLabel(selectedIso)}</div>
              <div><strong>Langue cartographiée:</strong> {LANGUAGE_BY_ISO2[selectedIso] || "non mappée"}</div>
            </div>

            <button
              onClick={applyLanguage}
              style={{ marginTop: 18, padding: "10px 18px", borderRadius: 999, border: "1px solid var(--g-border)", background: "var(--g-dim)", color: "var(--g)", fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%" }}
            >
              Appliquer la langue
            </button>

            <p style={{ marginTop: 16, fontSize: 12, color: "var(--soft)" }}>Langue actuelle: {locale.toUpperCase()}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
