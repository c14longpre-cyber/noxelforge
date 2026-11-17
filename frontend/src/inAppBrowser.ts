// Navigateur intégré à une appli (Facebook, Messenger, Instagram, LinkedIn, TikTok…) : Google y refuse souvent
// la connexion. Fichier identique dans les frontends NOXEL (src/inAppBrowser.ts).
export function navigateurIntegre(ua: string = typeof navigator !== "undefined" ? navigator.userAgent : ""): string | null {
  if (/FBAN|FBAV|FB_IAB|FBIOS|Messenger/i.test(ua)) return "Facebook";
  if (/Instagram/i.test(ua)) return "Instagram";
  if (/LinkedInApp/i.test(ua)) return "LinkedIn";
  if (/musical_ly|BytedanceWebview|TikTok/i.test(ua)) return "TikTok";
  if (/\bLine\//i.test(ua)) return "LINE";
  return null;
}

export function avertissementNavigateurIntegre(appli: string, fr: boolean): string {
  return fr
    ? `Vous êtes dans le navigateur de l'appli ${appli} : Google peut y refuser la connexion. Ouvrez la page dans Safari ou Chrome (menu ⋯ › « Ouvrir dans le navigateur »), ou utilisez le lien par courriel.`
    : `You are in the ${appli} app's browser: Google may refuse to sign you in here. Open the page in Safari or Chrome (⋯ menu › "Open in browser"), or use the e-mail link.`;
}
