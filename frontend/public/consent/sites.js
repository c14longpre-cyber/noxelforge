/* Select a configuration and load it BEFORE noxel-consent.js.
   openOnArrival (1.4.0) : la fenêtre de préférences s'ouvre à l'arrivée sur tous les sites NOXEL tant qu'aucun choix n'existe.
   No optional vendor is enabled here: declare the actual tools first (window.NOXEL_CONSENT_CONFIG in the page).
   Langue : choix du visiteur gardé par le site, sinon navigateur français, sinon <html lang> ; le moteur affiche fr ou en.
   privacyUrl : vide tant que le site n'a pas de politique publiée (noxelforge.com, noxelspectra.com au 13/10/2026).
   Textes bilingues (moteur 1.5.0) : siteName, privacyUrl, name et purpose acceptent une chaîne ou { fr, en }. */
window.NOXEL_CONSENT_SITES = {
  'noxelseo.com': { siteName: 'NOXEL SEO', policyVersion: 'seo-3', privacyUrl: '/privacy' },
  'noxelforge.com': { siteName: 'NOXEL FORGE', policyVersion: 'forge-4', privacyUrl: '/policies/privacy.html' },
  'noxel360.com': { siteName: 'NOXEL360', policyVersion: '360-3', privacyUrl: '/privacy' },
  'noxelspectra.com': { siteName: 'NOXEL SPECTRA', policyVersion: 'spectra-4', privacyUrl: { fr: '/#confidentialite', en: '/en/#privacy' } },
  'app.noxelspectra.com': { siteName: 'NOXEL SPECTRA', policyVersion: 'spectra-app-4', privacyUrl: { fr: 'https://www.noxelspectra.com/#confidentialite', en: 'https://www.noxelspectra.com/en/#privacy' } },
  'video.noxelspectra.com': { siteName: { fr: 'NOXEL SPECTRA Vidéo', en: 'NOXEL SPECTRA Video' }, policyVersion: 'spectra-video-1', privacyUrl: { fr: 'https://www.noxelspectra.com/#confidentialite', en: 'https://www.noxelspectra.com/en/#privacy' } }
};
/* Outils facultatifs du réseau NOXEL (1.4.0) : la même fenêtre s'affiche sur tous les sites, avec les mêmes
   catégories et la liste de tous les outils, en précisant le site où chacun est utilisé. Le choix vaut pour tous
   les sites NOXEL (relais par les liens). Ajouter ici tout nouvel outil, sur tous les sites, et incrémenter policyVersion. */
window.NOXEL_CONSENT_NETWORK = {
  enabledCategories: ['preferences', 'analytics', 'marketing'],
  providers: [
    { name: 'Google Tag Manager (GTM-59WTMFGM) — Google', category: 'analytics', purpose: { fr: 'Mesure d’audience sur NOXEL SEO (noxelseo.com). Chargé seulement avec ce consentement.', en: 'Audience measurement on NOXEL SEO (noxelseo.com). Loaded only with this consent.' } },
    { name: { fr: 'Balises publicitaires Google via GTM (GTM-59WTMFGM) — Google', en: 'Google advertising tags via GTM (GTM-59WTMFGM) — Google' }, category: 'marketing', purpose: { fr: 'Suivi publicitaire et marketing sur NOXEL SEO (noxelseo.com), via le mode Consentement de Google (ad_storage, ad_user_data, ad_personalization).', en: 'Advertising and marketing tracking on NOXEL SEO (noxelseo.com), through Google Consent Mode (ad_storage, ad_user_data, ad_personalization).' } },
    { name: 'Vercel Web Analytics — Vercel', category: 'analytics', purpose: { fr: 'Comptage des visites sans cookie sur NOXEL SEO et l’app NOXEL SPECTRA.', en: 'Cookieless visit counting on NOXEL SEO and the NOXEL SPECTRA app.' } },
    { name: { fr: 'Trustpilot — widget d’avis', en: 'Trustpilot — review widget' }, category: 'preferences', purpose: { fr: 'Affichage des avis clients dans l’app NOXEL SEO.', en: 'Shows customer reviews in the NOXEL SEO app.' } }
  ]
};
/* Sites NOXEL entre lesquels le choix est relayé par les liens (1.1.0). */
window.NOXEL_CONSENT_RELAY_DOMAINS = ['noxel360.com', 'noxelseo.com', 'noxelforge.com', 'noxelspectra.com', 'app.noxelspectra.com', 'video.noxelspectra.com'];
(function () {
  const hostname = location.hostname.replace(/^www\./, '');
  // Langue de la bannière : choix du visiteur gardé par le site (NOXEL360 noxel.language, SEO noxel-lang,
  // Forge forge_lang), sinon langue du navigateur si française, sinon langue de la page. Le moteur affiche fr ou en.
  let chosen = null;
  try { chosen = localStorage.getItem('noxel.language') || localStorage.getItem('noxel-lang') || localStorage.getItem('forge_lang'); } catch (_) { chosen = null; }
  const language = chosen || (/^fr\b/i.test(navigator.language || '') ? 'fr' : (document.documentElement.lang || 'fr'));
  const site = window.NOXEL_CONSENT_SITES[hostname] || { siteName: 'NOXEL', policyVersion: '1', privacyUrl: '' };
  window.NOXEL_CONSENT_CONFIG = Object.assign({ storageKey: 'noxel.consent.v1', retentionDays: 180, enabledCategories: [], providers: [],
    relayDomains: window.NOXEL_CONSENT_RELAY_DOMAINS, showWithoutCategories: true, openOnArrival: true, language }, window.NOXEL_CONSENT_NETWORK, site, window.NOXEL_CONSENT_CONFIG || {});
})();
