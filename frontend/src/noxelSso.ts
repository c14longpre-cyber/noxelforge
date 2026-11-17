// NOXEL SSO 1.0 (navigateur) — fichier identique dans noxelseo, noxelforge et noxelspectra (frontend/src/noxelSso.ts).
// Arrivée : la page ouverte avec ?nxsso=<jeton> l'envoie à sa propre API, qui ouvre la session, puis le retire de l'adresse.
// Départ : lienSso() mène à l'autre site par l'API d'ici, qui y joint un jeton si le compte est connecté.
export type SiteNoxel = "seo" | "forge" | "spectra";

let enCours: Promise<boolean> | null = null;

/** À appeler une fois au démarrage, AVANT de lire la session (/api/auth/me). Rend true si une session a été ouverte. */
export function accepterPassageSso(apiBase: string): Promise<boolean> {
  if (enCours) return enCours;
  enCours = (async () => {
    let t: string | null;
    try {
      const url = new URL(window.location.href);
      t = url.searchParams.get("nxsso");
      if (!t) return false;
      url.searchParams.delete("nxsso");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    } catch { return false; }
    try {
      const r = await fetch(`${apiBase}/api/auth/sso/accept`, {
        method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ t }),
      });
      const d = await r.json().catch(() => ({}));
      return d?.changed === true;
    } catch { return false; }
  })();
  return enCours;
}

/** Lien vers un autre site NOXEL qui garde la connexion (sans connexion : ouvre simplement le site) */
export function lienSso(apiBase: string, vers: SiteNoxel, next: string): string {
  return `${apiBase}/api/auth/sso/go?to=${vers}&next=${encodeURIComponent(next)}`;
}
