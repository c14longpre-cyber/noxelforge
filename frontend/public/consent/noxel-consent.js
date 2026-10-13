/* NOXEL Consent 1.4.0 — no dependencies, no remote requests by default.
   1.1.0 : relais du choix entre les sites NOXEL (relayDomains), voir README « Mémoire entre les sites NOXEL ».
   1.2.0 : boutons HUD NOXEL (dessins du kit HUD de NOXEL Spectra) et charte NOXEL.
   1.3.0 : bannière ouverte à l'arrivée même sans outil facultatif (showWithoutCategories) et bouton Fermer
           (fermer = continuer sans accepter ; sur un site sans outil facultatif, simple information non relayée).
   1.4.0 : openOnArrival — la fenêtre de préférences complète s'ouvre à l'arrivée tant qu'aucun choix n'existe ;
           « Fermer sans modifier » (ou Échap) = continuer sans accepter. Interface exclue de la traduction automatique du navigateur. */
(() => {
  'use strict';
  if (window.NoxelConsent) return;
  const cfg = Object.assign({ siteName: 'NOXEL', language: document.documentElement.lang || 'fr', policyVersion: '1',
    storageKey: 'noxel.consent.v1', retentionDays: 180, privacyUrl: '', enabledCategories: [],
    providers: [], reloadOnWithdrawal: true, cookieRules: [], storageRules: [], nonce: '', relayDomains: [], relayParam: 'nxc', showWithoutCategories: false, openOnArrival: false }, window.NOXEL_CONSENT_CONFIG || {});
  const keys = ['preferences', 'analytics', 'marketing'];
  // Dessins HUD NOXEL extraits tels quels de hud-data.ts (kit HUD de NOXEL Spectra) :
  // reject=cancel, accept=ok, customize=apply-filters, save=save-recipe, close=remove-image, settings=protect.
  // Chaînes internes au kit, jamais de contenu utilisateur.
  const HUD = {"reject": "<circle cx=\"64\" cy=\"64\" r=\"42\" fill=\"#0C171C\" stroke=\"#A855F7\" stroke-opacity=\".15\"/><circle cx=\"64\" cy=\"64\" r=\"59\" fill=\"none\" stroke=\"#A855F7\" stroke-opacity=\".15\"/><g class=\"hud-orbit\" fill=\"none\" stroke=\"#A855F7\" stroke-width=\"1.6\" stroke-linecap=\"round\"><circle cx=\"64\" cy=\"64\" r=\"59\" stroke-dasharray=\"91 28 31 30 125 66\" transform=\"rotate(68 64 64)\"/></g><g class=\"hud-segments\" fill=\"none\" stroke-width=\"5\"><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#A855F7\" stroke-dasharray=\"54 15 12 16 70 15 30 64\" transform=\"rotate(85 64 64)\"/><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#3DDC84\" stroke-dasharray=\"26 250.5\" transform=\"rotate(-117 64 64)\"/></g><g stroke=\"#A855F7\" stroke-width=\"1.1\"><path d=\"M64.00 15.00L64.00 11.00\" opacity=\"0.62\"/><path d=\"M70.53 14.43L70.92 11.45\" opacity=\"0.24\"/><path d=\"M76.94 15.70L77.72 12.81\" opacity=\"0.24\"/><path d=\"M83.13 17.81L84.28 15.03\" opacity=\"0.24\"/><path d=\"M88.50 21.56L90.50 18.10\" opacity=\"0.62\"/><path d=\"M94.44 24.33L96.26 21.95\" opacity=\"0.24\"/><path d=\"M99.36 28.64L101.48 26.52\" opacity=\"0.24\"/><path d=\"M103.67 33.56L106.05 31.74\" opacity=\"0.24\"/><path d=\"M106.44 39.50L109.90 37.50\" opacity=\"0.62\"/><path d=\"M110.19 44.87L112.97 43.72\" opacity=\"0.24\"/><path d=\"M112.30 51.06L115.19 50.28\" opacity=\"0.24\"/><path d=\"M113.57 57.47L116.55 57.08\" opacity=\"0.24\"/><path d=\"M113.00 64.00L117.00 64.00\" opacity=\"0.62\"/><path d=\"M113.57 70.53L116.55 70.92\" opacity=\"0.24\"/><path d=\"M112.30 76.94L115.19 77.72\" opacity=\"0.24\"/><path d=\"M110.19 83.13L112.97 84.28\" opacity=\"0.24\"/><path d=\"M106.44 88.50L109.90 90.50\" opacity=\"0.62\"/><path d=\"M103.67 94.44L106.05 96.26\" opacity=\"0.24\"/><path d=\"M99.36 99.36L101.48 101.48\" opacity=\"0.24\"/><path d=\"M94.44 103.67L96.26 106.05\" opacity=\"0.24\"/><path d=\"M88.50 106.44L90.50 109.90\" opacity=\"0.62\"/><path d=\"M83.13 110.19L84.28 112.97\" opacity=\"0.24\"/><path d=\"M76.94 112.30L77.72 115.19\" opacity=\"0.24\"/><path d=\"M70.53 113.57L70.92 116.55\" opacity=\"0.24\"/><path d=\"M64.00 113.00L64.00 117.00\" opacity=\"0.62\"/><path d=\"M57.47 113.57L57.08 116.55\" opacity=\"0.24\"/><path d=\"M51.06 112.30L50.28 115.19\" opacity=\"0.24\"/><path d=\"M44.87 110.19L43.72 112.97\" opacity=\"0.24\"/><path d=\"M39.50 106.44L37.50 109.90\" opacity=\"0.62\"/><path d=\"M33.56 103.67L31.74 106.05\" opacity=\"0.24\"/><path d=\"M28.64 99.36L26.52 101.48\" opacity=\"0.24\"/><path d=\"M24.33 94.44L21.95 96.26\" opacity=\"0.24\"/><path d=\"M21.56 88.50L18.10 90.50\" opacity=\"0.62\"/><path d=\"M17.81 83.13L15.03 84.28\" opacity=\"0.24\"/><path d=\"M15.70 76.94L12.81 77.72\" opacity=\"0.24\"/><path d=\"M14.43 70.53L11.45 70.92\" opacity=\"0.24\"/><path d=\"M15.00 64.00L11.00 64.00\" opacity=\"0.62\"/><path d=\"M14.43 57.47L11.45 57.08\" opacity=\"0.24\"/><path d=\"M15.70 51.06L12.81 50.28\" opacity=\"0.24\"/><path d=\"M17.81 44.87L15.03 43.72\" opacity=\"0.24\"/><path d=\"M21.56 39.50L18.10 37.50\" opacity=\"0.62\"/><path d=\"M24.33 33.56L21.95 31.74\" opacity=\"0.24\"/><path d=\"M28.64 28.64L26.52 26.52\" opacity=\"0.24\"/><path d=\"M33.56 24.33L31.74 21.95\" opacity=\"0.24\"/><path d=\"M39.50 21.56L37.50 18.10\" opacity=\"0.62\"/><path d=\"M44.87 17.81L43.72 15.03\" opacity=\"0.24\"/><path d=\"M51.06 15.70L50.28 12.81\" opacity=\"0.24\"/><path d=\"M57.47 14.43L57.08 11.45\" opacity=\"0.24\"/></g><circle cx=\"64\" cy=\"64\" r=\"36\" fill=\"none\" stroke=\"#A855F7\" stroke-width=\".7\" stroke-opacity=\".32\"/><g class=\"hud-icon\" transform=\"translate(44.2 44.2) scale(1.65)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.55\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#A855F7\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M9 9l6 6M15 9l-6 6\"/></g><path d=\"M59 98h10\" stroke=\"#3DDC84\" stroke-width=\"1.5\"/><circle cx=\"64\" cy=\"5\" r=\"2.2\" fill=\"#3DDC84\"/>", "accept": "<circle cx=\"64\" cy=\"64\" r=\"42\" fill=\"#0C171C\" stroke=\"#A855F7\" stroke-opacity=\".15\"/><circle cx=\"64\" cy=\"64\" r=\"59\" fill=\"none\" stroke=\"#A855F7\" stroke-opacity=\".15\"/><g class=\"hud-orbit\" fill=\"none\" stroke=\"#A855F7\" stroke-width=\"1.6\" stroke-linecap=\"round\"><circle cx=\"64\" cy=\"64\" r=\"59\" stroke-dasharray=\"91 28 31 30 125 66\" transform=\"rotate(-103 64 64)\"/></g><g class=\"hud-segments\" fill=\"none\" stroke-width=\"5\"><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#A855F7\" stroke-dasharray=\"54 15 12 16 70 15 30 64\" transform=\"rotate(-86 64 64)\"/><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#3DDC84\" stroke-dasharray=\"26 250.5\" transform=\"rotate(72 64 64)\"/></g><g stroke=\"#A855F7\" stroke-width=\"1.1\"><path d=\"M64.00 15.00L64.00 11.00\" opacity=\"0.62\"/><path d=\"M70.53 14.43L70.92 11.45\" opacity=\"0.24\"/><path d=\"M76.94 15.70L77.72 12.81\" opacity=\"0.24\"/><path d=\"M83.13 17.81L84.28 15.03\" opacity=\"0.24\"/><path d=\"M88.50 21.56L90.50 18.10\" opacity=\"0.62\"/><path d=\"M94.44 24.33L96.26 21.95\" opacity=\"0.24\"/><path d=\"M99.36 28.64L101.48 26.52\" opacity=\"0.24\"/><path d=\"M103.67 33.56L106.05 31.74\" opacity=\"0.24\"/><path d=\"M106.44 39.50L109.90 37.50\" opacity=\"0.62\"/><path d=\"M110.19 44.87L112.97 43.72\" opacity=\"0.24\"/><path d=\"M112.30 51.06L115.19 50.28\" opacity=\"0.24\"/><path d=\"M113.57 57.47L116.55 57.08\" opacity=\"0.24\"/><path d=\"M113.00 64.00L117.00 64.00\" opacity=\"0.62\"/><path d=\"M113.57 70.53L116.55 70.92\" opacity=\"0.24\"/><path d=\"M112.30 76.94L115.19 77.72\" opacity=\"0.24\"/><path d=\"M110.19 83.13L112.97 84.28\" opacity=\"0.24\"/><path d=\"M106.44 88.50L109.90 90.50\" opacity=\"0.62\"/><path d=\"M103.67 94.44L106.05 96.26\" opacity=\"0.24\"/><path d=\"M99.36 99.36L101.48 101.48\" opacity=\"0.24\"/><path d=\"M94.44 103.67L96.26 106.05\" opacity=\"0.24\"/><path d=\"M88.50 106.44L90.50 109.90\" opacity=\"0.62\"/><path d=\"M83.13 110.19L84.28 112.97\" opacity=\"0.24\"/><path d=\"M76.94 112.30L77.72 115.19\" opacity=\"0.24\"/><path d=\"M70.53 113.57L70.92 116.55\" opacity=\"0.24\"/><path d=\"M64.00 113.00L64.00 117.00\" opacity=\"0.62\"/><path d=\"M57.47 113.57L57.08 116.55\" opacity=\"0.24\"/><path d=\"M51.06 112.30L50.28 115.19\" opacity=\"0.24\"/><path d=\"M44.87 110.19L43.72 112.97\" opacity=\"0.24\"/><path d=\"M39.50 106.44L37.50 109.90\" opacity=\"0.62\"/><path d=\"M33.56 103.67L31.74 106.05\" opacity=\"0.24\"/><path d=\"M28.64 99.36L26.52 101.48\" opacity=\"0.24\"/><path d=\"M24.33 94.44L21.95 96.26\" opacity=\"0.24\"/><path d=\"M21.56 88.50L18.10 90.50\" opacity=\"0.62\"/><path d=\"M17.81 83.13L15.03 84.28\" opacity=\"0.24\"/><path d=\"M15.70 76.94L12.81 77.72\" opacity=\"0.24\"/><path d=\"M14.43 70.53L11.45 70.92\" opacity=\"0.24\"/><path d=\"M15.00 64.00L11.00 64.00\" opacity=\"0.62\"/><path d=\"M14.43 57.47L11.45 57.08\" opacity=\"0.24\"/><path d=\"M15.70 51.06L12.81 50.28\" opacity=\"0.24\"/><path d=\"M17.81 44.87L15.03 43.72\" opacity=\"0.24\"/><path d=\"M21.56 39.50L18.10 37.50\" opacity=\"0.62\"/><path d=\"M24.33 33.56L21.95 31.74\" opacity=\"0.24\"/><path d=\"M28.64 28.64L26.52 26.52\" opacity=\"0.24\"/><path d=\"M33.56 24.33L31.74 21.95\" opacity=\"0.24\"/><path d=\"M39.50 21.56L37.50 18.10\" opacity=\"0.62\"/><path d=\"M44.87 17.81L43.72 15.03\" opacity=\"0.24\"/><path d=\"M51.06 15.70L50.28 12.81\" opacity=\"0.24\"/><path d=\"M57.47 14.43L57.08 11.45\" opacity=\"0.24\"/></g><circle cx=\"64\" cy=\"64\" r=\"36\" fill=\"none\" stroke=\"#A855F7\" stroke-width=\".7\" stroke-opacity=\".32\"/><g class=\"hud-icon\" transform=\"translate(44.2 44.2) scale(1.65)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.55\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#A855F7\"><path d=\"m4 12 5 5L20 6\"/></g><path d=\"M59 98h10\" stroke=\"#3DDC84\" stroke-width=\"1.5\"/><circle cx=\"64\" cy=\"5\" r=\"2.2\" fill=\"#3DDC84\"/>", "customize": "<circle cx=\"64\" cy=\"64\" r=\"42\" fill=\"#0C171C\" stroke=\"#3DDC84\" stroke-opacity=\".15\"/><circle cx=\"64\" cy=\"64\" r=\"59\" fill=\"none\" stroke=\"#3DDC84\" stroke-opacity=\".15\"/><g class=\"hud-orbit\" fill=\"none\" stroke=\"#3DDC84\" stroke-width=\"1.6\" stroke-linecap=\"round\"><circle cx=\"64\" cy=\"64\" r=\"59\" stroke-dasharray=\"91 28 31 30 125 66\" transform=\"rotate(-103 64 64)\"/></g><g class=\"hud-segments\" fill=\"none\" stroke-width=\"5\"><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#3DDC84\" stroke-dasharray=\"54 15 12 16 70 15 30 64\" transform=\"rotate(-86 64 64)\"/><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#A855F7\" stroke-dasharray=\"26 250.5\" transform=\"rotate(72 64 64)\"/></g><g stroke=\"#3DDC84\" stroke-width=\"1.1\"><path d=\"M64.00 15.00L64.00 11.00\" opacity=\"0.62\"/><path d=\"M70.53 14.43L70.92 11.45\" opacity=\"0.24\"/><path d=\"M76.94 15.70L77.72 12.81\" opacity=\"0.24\"/><path d=\"M83.13 17.81L84.28 15.03\" opacity=\"0.24\"/><path d=\"M88.50 21.56L90.50 18.10\" opacity=\"0.62\"/><path d=\"M94.44 24.33L96.26 21.95\" opacity=\"0.24\"/><path d=\"M99.36 28.64L101.48 26.52\" opacity=\"0.24\"/><path d=\"M103.67 33.56L106.05 31.74\" opacity=\"0.24\"/><path d=\"M106.44 39.50L109.90 37.50\" opacity=\"0.62\"/><path d=\"M110.19 44.87L112.97 43.72\" opacity=\"0.24\"/><path d=\"M112.30 51.06L115.19 50.28\" opacity=\"0.24\"/><path d=\"M113.57 57.47L116.55 57.08\" opacity=\"0.24\"/><path d=\"M113.00 64.00L117.00 64.00\" opacity=\"0.62\"/><path d=\"M113.57 70.53L116.55 70.92\" opacity=\"0.24\"/><path d=\"M112.30 76.94L115.19 77.72\" opacity=\"0.24\"/><path d=\"M110.19 83.13L112.97 84.28\" opacity=\"0.24\"/><path d=\"M106.44 88.50L109.90 90.50\" opacity=\"0.62\"/><path d=\"M103.67 94.44L106.05 96.26\" opacity=\"0.24\"/><path d=\"M99.36 99.36L101.48 101.48\" opacity=\"0.24\"/><path d=\"M94.44 103.67L96.26 106.05\" opacity=\"0.24\"/><path d=\"M88.50 106.44L90.50 109.90\" opacity=\"0.62\"/><path d=\"M83.13 110.19L84.28 112.97\" opacity=\"0.24\"/><path d=\"M76.94 112.30L77.72 115.19\" opacity=\"0.24\"/><path d=\"M70.53 113.57L70.92 116.55\" opacity=\"0.24\"/><path d=\"M64.00 113.00L64.00 117.00\" opacity=\"0.62\"/><path d=\"M57.47 113.57L57.08 116.55\" opacity=\"0.24\"/><path d=\"M51.06 112.30L50.28 115.19\" opacity=\"0.24\"/><path d=\"M44.87 110.19L43.72 112.97\" opacity=\"0.24\"/><path d=\"M39.50 106.44L37.50 109.90\" opacity=\"0.62\"/><path d=\"M33.56 103.67L31.74 106.05\" opacity=\"0.24\"/><path d=\"M28.64 99.36L26.52 101.48\" opacity=\"0.24\"/><path d=\"M24.33 94.44L21.95 96.26\" opacity=\"0.24\"/><path d=\"M21.56 88.50L18.10 90.50\" opacity=\"0.62\"/><path d=\"M17.81 83.13L15.03 84.28\" opacity=\"0.24\"/><path d=\"M15.70 76.94L12.81 77.72\" opacity=\"0.24\"/><path d=\"M14.43 70.53L11.45 70.92\" opacity=\"0.24\"/><path d=\"M15.00 64.00L11.00 64.00\" opacity=\"0.62\"/><path d=\"M14.43 57.47L11.45 57.08\" opacity=\"0.24\"/><path d=\"M15.70 51.06L12.81 50.28\" opacity=\"0.24\"/><path d=\"M17.81 44.87L15.03 43.72\" opacity=\"0.24\"/><path d=\"M21.56 39.50L18.10 37.50\" opacity=\"0.62\"/><path d=\"M24.33 33.56L21.95 31.74\" opacity=\"0.24\"/><path d=\"M28.64 28.64L26.52 26.52\" opacity=\"0.24\"/><path d=\"M33.56 24.33L31.74 21.95\" opacity=\"0.24\"/><path d=\"M39.50 21.56L37.50 18.10\" opacity=\"0.62\"/><path d=\"M44.87 17.81L43.72 15.03\" opacity=\"0.24\"/><path d=\"M51.06 15.70L50.28 12.81\" opacity=\"0.24\"/><path d=\"M57.47 14.43L57.08 11.45\" opacity=\"0.24\"/></g><circle cx=\"64\" cy=\"64\" r=\"36\" fill=\"none\" stroke=\"#3DDC84\" stroke-width=\".7\" stroke-opacity=\".32\"/><g class=\"hud-icon\" transform=\"translate(44.2 44.2) scale(1.65)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.55\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#3DDC84\"><path d=\"M2 5h7m5 0h8M2 12h13m5 0h2M2 19h3m5 0h12\"/><circle cx=\"11\" cy=\"5\" r=\"2\"/><circle cx=\"17\" cy=\"12\" r=\"2\"/><circle cx=\"7\" cy=\"19\" r=\"2\"/></g><path d=\"M59 98h10\" stroke=\"#A855F7\" stroke-width=\"1.5\"/><circle cx=\"64\" cy=\"5\" r=\"2.2\" fill=\"#A855F7\"/>", "save": "<circle cx=\"64\" cy=\"64\" r=\"42\" fill=\"#0C171C\" stroke=\"#A855F7\" stroke-opacity=\".15\"/><circle cx=\"64\" cy=\"64\" r=\"59\" fill=\"none\" stroke=\"#A855F7\" stroke-opacity=\".15\"/><g class=\"hud-orbit\" fill=\"none\" stroke=\"#A855F7\" stroke-width=\"1.6\" stroke-linecap=\"round\"><circle cx=\"64\" cy=\"64\" r=\"59\" stroke-dasharray=\"91 28 31 30 125 66\" transform=\"rotate(-103 64 64)\"/></g><g class=\"hud-segments\" fill=\"none\" stroke-width=\"5\"><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#A855F7\" stroke-dasharray=\"54 15 12 16 70 15 30 64\" transform=\"rotate(-86 64 64)\"/><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#3DDC84\" stroke-dasharray=\"26 250.5\" transform=\"rotate(72 64 64)\"/></g><g stroke=\"#A855F7\" stroke-width=\"1.1\"><path d=\"M64.00 15.00L64.00 11.00\" opacity=\"0.62\"/><path d=\"M70.53 14.43L70.92 11.45\" opacity=\"0.24\"/><path d=\"M76.94 15.70L77.72 12.81\" opacity=\"0.24\"/><path d=\"M83.13 17.81L84.28 15.03\" opacity=\"0.24\"/><path d=\"M88.50 21.56L90.50 18.10\" opacity=\"0.62\"/><path d=\"M94.44 24.33L96.26 21.95\" opacity=\"0.24\"/><path d=\"M99.36 28.64L101.48 26.52\" opacity=\"0.24\"/><path d=\"M103.67 33.56L106.05 31.74\" opacity=\"0.24\"/><path d=\"M106.44 39.50L109.90 37.50\" opacity=\"0.62\"/><path d=\"M110.19 44.87L112.97 43.72\" opacity=\"0.24\"/><path d=\"M112.30 51.06L115.19 50.28\" opacity=\"0.24\"/><path d=\"M113.57 57.47L116.55 57.08\" opacity=\"0.24\"/><path d=\"M113.00 64.00L117.00 64.00\" opacity=\"0.62\"/><path d=\"M113.57 70.53L116.55 70.92\" opacity=\"0.24\"/><path d=\"M112.30 76.94L115.19 77.72\" opacity=\"0.24\"/><path d=\"M110.19 83.13L112.97 84.28\" opacity=\"0.24\"/><path d=\"M106.44 88.50L109.90 90.50\" opacity=\"0.62\"/><path d=\"M103.67 94.44L106.05 96.26\" opacity=\"0.24\"/><path d=\"M99.36 99.36L101.48 101.48\" opacity=\"0.24\"/><path d=\"M94.44 103.67L96.26 106.05\" opacity=\"0.24\"/><path d=\"M88.50 106.44L90.50 109.90\" opacity=\"0.62\"/><path d=\"M83.13 110.19L84.28 112.97\" opacity=\"0.24\"/><path d=\"M76.94 112.30L77.72 115.19\" opacity=\"0.24\"/><path d=\"M70.53 113.57L70.92 116.55\" opacity=\"0.24\"/><path d=\"M64.00 113.00L64.00 117.00\" opacity=\"0.62\"/><path d=\"M57.47 113.57L57.08 116.55\" opacity=\"0.24\"/><path d=\"M51.06 112.30L50.28 115.19\" opacity=\"0.24\"/><path d=\"M44.87 110.19L43.72 112.97\" opacity=\"0.24\"/><path d=\"M39.50 106.44L37.50 109.90\" opacity=\"0.62\"/><path d=\"M33.56 103.67L31.74 106.05\" opacity=\"0.24\"/><path d=\"M28.64 99.36L26.52 101.48\" opacity=\"0.24\"/><path d=\"M24.33 94.44L21.95 96.26\" opacity=\"0.24\"/><path d=\"M21.56 88.50L18.10 90.50\" opacity=\"0.62\"/><path d=\"M17.81 83.13L15.03 84.28\" opacity=\"0.24\"/><path d=\"M15.70 76.94L12.81 77.72\" opacity=\"0.24\"/><path d=\"M14.43 70.53L11.45 70.92\" opacity=\"0.24\"/><path d=\"M15.00 64.00L11.00 64.00\" opacity=\"0.62\"/><path d=\"M14.43 57.47L11.45 57.08\" opacity=\"0.24\"/><path d=\"M15.70 51.06L12.81 50.28\" opacity=\"0.24\"/><path d=\"M17.81 44.87L15.03 43.72\" opacity=\"0.24\"/><path d=\"M21.56 39.50L18.10 37.50\" opacity=\"0.62\"/><path d=\"M24.33 33.56L21.95 31.74\" opacity=\"0.24\"/><path d=\"M28.64 28.64L26.52 26.52\" opacity=\"0.24\"/><path d=\"M33.56 24.33L31.74 21.95\" opacity=\"0.24\"/><path d=\"M39.50 21.56L37.50 18.10\" opacity=\"0.62\"/><path d=\"M44.87 17.81L43.72 15.03\" opacity=\"0.24\"/><path d=\"M51.06 15.70L50.28 12.81\" opacity=\"0.24\"/><path d=\"M57.47 14.43L57.08 11.45\" opacity=\"0.24\"/></g><circle cx=\"64\" cy=\"64\" r=\"36\" fill=\"none\" stroke=\"#A855F7\" stroke-width=\".7\" stroke-opacity=\".32\"/><g class=\"hud-icon\" transform=\"translate(44.2 44.2) scale(1.65)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.55\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#A855F7\"><path d=\"M4 3h13l4 4v14H3V3h1m3 0v6h10V3M7 21v-8h10v8\"/></g><path d=\"M59 98h10\" stroke=\"#3DDC84\" stroke-width=\"1.5\"/><circle cx=\"64\" cy=\"5\" r=\"2.2\" fill=\"#3DDC84\"/>", "close": "<circle cx=\"64\" cy=\"64\" r=\"42\" fill=\"#0C171C\" stroke=\"#A855F7\" stroke-opacity=\".15\"/><circle cx=\"64\" cy=\"64\" r=\"59\" fill=\"none\" stroke=\"#A855F7\" stroke-opacity=\".15\"/><g class=\"hud-orbit\" fill=\"none\" stroke=\"#A855F7\" stroke-width=\"1.6\" stroke-linecap=\"round\"><circle cx=\"64\" cy=\"64\" r=\"59\" stroke-dasharray=\"91 28 31 30 125 66\" transform=\"rotate(-103 64 64)\"/></g><g class=\"hud-segments\" fill=\"none\" stroke-width=\"5\"><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#A855F7\" stroke-dasharray=\"54 15 12 16 70 15 30 64\" transform=\"rotate(-86 64 64)\"/><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#3DDC84\" stroke-dasharray=\"26 250.5\" transform=\"rotate(72 64 64)\"/></g><g stroke=\"#A855F7\" stroke-width=\"1.1\"><path d=\"M64.00 15.00L64.00 11.00\" opacity=\"0.62\"/><path d=\"M70.53 14.43L70.92 11.45\" opacity=\"0.24\"/><path d=\"M76.94 15.70L77.72 12.81\" opacity=\"0.24\"/><path d=\"M83.13 17.81L84.28 15.03\" opacity=\"0.24\"/><path d=\"M88.50 21.56L90.50 18.10\" opacity=\"0.62\"/><path d=\"M94.44 24.33L96.26 21.95\" opacity=\"0.24\"/><path d=\"M99.36 28.64L101.48 26.52\" opacity=\"0.24\"/><path d=\"M103.67 33.56L106.05 31.74\" opacity=\"0.24\"/><path d=\"M106.44 39.50L109.90 37.50\" opacity=\"0.62\"/><path d=\"M110.19 44.87L112.97 43.72\" opacity=\"0.24\"/><path d=\"M112.30 51.06L115.19 50.28\" opacity=\"0.24\"/><path d=\"M113.57 57.47L116.55 57.08\" opacity=\"0.24\"/><path d=\"M113.00 64.00L117.00 64.00\" opacity=\"0.62\"/><path d=\"M113.57 70.53L116.55 70.92\" opacity=\"0.24\"/><path d=\"M112.30 76.94L115.19 77.72\" opacity=\"0.24\"/><path d=\"M110.19 83.13L112.97 84.28\" opacity=\"0.24\"/><path d=\"M106.44 88.50L109.90 90.50\" opacity=\"0.62\"/><path d=\"M103.67 94.44L106.05 96.26\" opacity=\"0.24\"/><path d=\"M99.36 99.36L101.48 101.48\" opacity=\"0.24\"/><path d=\"M94.44 103.67L96.26 106.05\" opacity=\"0.24\"/><path d=\"M88.50 106.44L90.50 109.90\" opacity=\"0.62\"/><path d=\"M83.13 110.19L84.28 112.97\" opacity=\"0.24\"/><path d=\"M76.94 112.30L77.72 115.19\" opacity=\"0.24\"/><path d=\"M70.53 113.57L70.92 116.55\" opacity=\"0.24\"/><path d=\"M64.00 113.00L64.00 117.00\" opacity=\"0.62\"/><path d=\"M57.47 113.57L57.08 116.55\" opacity=\"0.24\"/><path d=\"M51.06 112.30L50.28 115.19\" opacity=\"0.24\"/><path d=\"M44.87 110.19L43.72 112.97\" opacity=\"0.24\"/><path d=\"M39.50 106.44L37.50 109.90\" opacity=\"0.62\"/><path d=\"M33.56 103.67L31.74 106.05\" opacity=\"0.24\"/><path d=\"M28.64 99.36L26.52 101.48\" opacity=\"0.24\"/><path d=\"M24.33 94.44L21.95 96.26\" opacity=\"0.24\"/><path d=\"M21.56 88.50L18.10 90.50\" opacity=\"0.62\"/><path d=\"M17.81 83.13L15.03 84.28\" opacity=\"0.24\"/><path d=\"M15.70 76.94L12.81 77.72\" opacity=\"0.24\"/><path d=\"M14.43 70.53L11.45 70.92\" opacity=\"0.24\"/><path d=\"M15.00 64.00L11.00 64.00\" opacity=\"0.62\"/><path d=\"M14.43 57.47L11.45 57.08\" opacity=\"0.24\"/><path d=\"M15.70 51.06L12.81 50.28\" opacity=\"0.24\"/><path d=\"M17.81 44.87L15.03 43.72\" opacity=\"0.24\"/><path d=\"M21.56 39.50L18.10 37.50\" opacity=\"0.62\"/><path d=\"M24.33 33.56L21.95 31.74\" opacity=\"0.24\"/><path d=\"M28.64 28.64L26.52 26.52\" opacity=\"0.24\"/><path d=\"M33.56 24.33L31.74 21.95\" opacity=\"0.24\"/><path d=\"M39.50 21.56L37.50 18.10\" opacity=\"0.62\"/><path d=\"M44.87 17.81L43.72 15.03\" opacity=\"0.24\"/><path d=\"M51.06 15.70L50.28 12.81\" opacity=\"0.24\"/><path d=\"M57.47 14.43L57.08 11.45\" opacity=\"0.24\"/></g><circle cx=\"64\" cy=\"64\" r=\"36\" fill=\"none\" stroke=\"#A855F7\" stroke-width=\".7\" stroke-opacity=\".32\"/><g class=\"hud-icon\" transform=\"translate(44.2 44.2) scale(1.65)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.55\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#A855F7\"><path d=\"m5 5 14 14M19 5 5 19\"/></g><path d=\"M59 98h10\" stroke=\"#3DDC84\" stroke-width=\"1.5\"/><circle cx=\"64\" cy=\"5\" r=\"2.2\" fill=\"#3DDC84\"/>", "settings": "<circle cx=\"64\" cy=\"64\" r=\"42\" fill=\"#0C171C\" stroke=\"#3DDC84\" stroke-opacity=\".15\"/><circle cx=\"64\" cy=\"64\" r=\"59\" fill=\"none\" stroke=\"#3DDC84\" stroke-opacity=\".15\"/><g class=\"hud-orbit\" fill=\"none\" stroke=\"#3DDC84\" stroke-width=\"1.6\" stroke-linecap=\"round\"><circle cx=\"64\" cy=\"64\" r=\"59\" stroke-dasharray=\"91 28 31 30 125 66\" transform=\"rotate(-103 64 64)\"/></g><g class=\"hud-segments\" fill=\"none\" stroke-width=\"5\"><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#3DDC84\" stroke-dasharray=\"54 15 12 16 70 15 30 64\" transform=\"rotate(-86 64 64)\"/><circle cx=\"64\" cy=\"64\" r=\"44\" stroke=\"#A855F7\" stroke-dasharray=\"26 250.5\" transform=\"rotate(72 64 64)\"/></g><g stroke=\"#3DDC84\" stroke-width=\"1.1\"><path d=\"M64.00 15.00L64.00 11.00\" opacity=\"0.62\"/><path d=\"M70.53 14.43L70.92 11.45\" opacity=\"0.24\"/><path d=\"M76.94 15.70L77.72 12.81\" opacity=\"0.24\"/><path d=\"M83.13 17.81L84.28 15.03\" opacity=\"0.24\"/><path d=\"M88.50 21.56L90.50 18.10\" opacity=\"0.62\"/><path d=\"M94.44 24.33L96.26 21.95\" opacity=\"0.24\"/><path d=\"M99.36 28.64L101.48 26.52\" opacity=\"0.24\"/><path d=\"M103.67 33.56L106.05 31.74\" opacity=\"0.24\"/><path d=\"M106.44 39.50L109.90 37.50\" opacity=\"0.62\"/><path d=\"M110.19 44.87L112.97 43.72\" opacity=\"0.24\"/><path d=\"M112.30 51.06L115.19 50.28\" opacity=\"0.24\"/><path d=\"M113.57 57.47L116.55 57.08\" opacity=\"0.24\"/><path d=\"M113.00 64.00L117.00 64.00\" opacity=\"0.62\"/><path d=\"M113.57 70.53L116.55 70.92\" opacity=\"0.24\"/><path d=\"M112.30 76.94L115.19 77.72\" opacity=\"0.24\"/><path d=\"M110.19 83.13L112.97 84.28\" opacity=\"0.24\"/><path d=\"M106.44 88.50L109.90 90.50\" opacity=\"0.62\"/><path d=\"M103.67 94.44L106.05 96.26\" opacity=\"0.24\"/><path d=\"M99.36 99.36L101.48 101.48\" opacity=\"0.24\"/><path d=\"M94.44 103.67L96.26 106.05\" opacity=\"0.24\"/><path d=\"M88.50 106.44L90.50 109.90\" opacity=\"0.62\"/><path d=\"M83.13 110.19L84.28 112.97\" opacity=\"0.24\"/><path d=\"M76.94 112.30L77.72 115.19\" opacity=\"0.24\"/><path d=\"M70.53 113.57L70.92 116.55\" opacity=\"0.24\"/><path d=\"M64.00 113.00L64.00 117.00\" opacity=\"0.62\"/><path d=\"M57.47 113.57L57.08 116.55\" opacity=\"0.24\"/><path d=\"M51.06 112.30L50.28 115.19\" opacity=\"0.24\"/><path d=\"M44.87 110.19L43.72 112.97\" opacity=\"0.24\"/><path d=\"M39.50 106.44L37.50 109.90\" opacity=\"0.62\"/><path d=\"M33.56 103.67L31.74 106.05\" opacity=\"0.24\"/><path d=\"M28.64 99.36L26.52 101.48\" opacity=\"0.24\"/><path d=\"M24.33 94.44L21.95 96.26\" opacity=\"0.24\"/><path d=\"M21.56 88.50L18.10 90.50\" opacity=\"0.62\"/><path d=\"M17.81 83.13L15.03 84.28\" opacity=\"0.24\"/><path d=\"M15.70 76.94L12.81 77.72\" opacity=\"0.24\"/><path d=\"M14.43 70.53L11.45 70.92\" opacity=\"0.24\"/><path d=\"M15.00 64.00L11.00 64.00\" opacity=\"0.62\"/><path d=\"M14.43 57.47L11.45 57.08\" opacity=\"0.24\"/><path d=\"M15.70 51.06L12.81 50.28\" opacity=\"0.24\"/><path d=\"M17.81 44.87L15.03 43.72\" opacity=\"0.24\"/><path d=\"M21.56 39.50L18.10 37.50\" opacity=\"0.62\"/><path d=\"M24.33 33.56L21.95 31.74\" opacity=\"0.24\"/><path d=\"M28.64 28.64L26.52 26.52\" opacity=\"0.24\"/><path d=\"M33.56 24.33L31.74 21.95\" opacity=\"0.24\"/><path d=\"M39.50 21.56L37.50 18.10\" opacity=\"0.62\"/><path d=\"M44.87 17.81L43.72 15.03\" opacity=\"0.24\"/><path d=\"M51.06 15.70L50.28 12.81\" opacity=\"0.24\"/><path d=\"M57.47 14.43L57.08 11.45\" opacity=\"0.24\"/></g><circle cx=\"64\" cy=\"64\" r=\"36\" fill=\"none\" stroke=\"#3DDC84\" stroke-width=\".7\" stroke-opacity=\".32\"/><g class=\"hud-icon\" transform=\"translate(44.2 44.2) scale(1.65)\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.55\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#3DDC84\"><path d=\"M12 2 3 6v7c0 5 9 9 9 9s9-4 9-9V6l-9-4Z\"/><path d=\"M15 9a4 4 0 1 0 0 6\"/></g><path d=\"M59 98h10\" stroke=\"#A855F7\" stroke-width=\"1.5\"/><circle cx=\"64\" cy=\"5\" r=\"2.2\" fill=\"#A855F7\"/>"};
  const lang = /^fr\b/i.test(cfg.language) ? 'fr' : 'en';
  const words = {
    fr: { title: 'Votre confidentialité', intro: 'Vous choisissez les outils facultatifs autorisés sur ce site. Les outils nécessaires à son fonctionnement restent actifs.',
      accept: 'Tout accepter', reject: 'Tout refuser', customize: 'Personnaliser', save: 'Enregistrer mes choix', close: 'Fermer sans modifier',
      settings: 'Préférences de confidentialité', policy: 'Politique de confidentialité', necessary: 'Nécessaires', always: 'Toujours actifs',
      required: 'Connexion, sécurité et conservation de votre choix. Les outils déclarés comme nécessaires doivent être limités au fonctionnement demandé.',
      preferences: 'Préférences facultatives', analytics: 'Mesure d’audience', marketing: 'Publicité et suivi marketing',
      preferencesDesc: 'Activer les fonctions facultatives et mémoriser leurs réglages.', analyticsDesc: 'Mesurer la fréquentation et l’utilisation du site.',
      marketingDesc: 'Activer les outils publicitaires et le suivi marketing déclarés.', vendors: 'Outils et fournisseurs concernés',
      more: 'Le choix concerne ce site et ce navigateur. Vous pouvez le modifier à tout moment.',
      saved: 'Choix enregistré.', unavailable: 'Votre navigateur ne permet pas de conserver ce choix. Il sera valable pour cette page uniquement.',
      expired: 'Votre choix doit être renouvelé.', blocked: 'Contenu facultatif désactivé. Ouvrez les préférences pour l’autoriser.',
      none: 'Aucun outil facultatif déclaré sur cette page.',
      relayMore: 'Votre choix s’applique à tous les sites NOXEL : il vous suit lorsque vous passez de l’un à l’autre par un lien. Vous pouvez le modifier à tout moment sur chacun d’eux.',
      relayShort: 'Ce choix vaut pour tous les sites NOXEL.',
      noneIntro: 'Ce site n’utilise aucun outil facultatif : pas de mesure d’audience ni de publicité. Les outils nécessaires à son fonctionnement restent actifs.',
      noneRelay: 'Sur les autres sites NOXEL, votre choix vous sera demandé une fois, puis il vous suivra d’un site à l’autre.',
      dismiss: 'Fermer et continuer sans accepter', dismissInfo: 'Fermer' },
    en: { title: 'Your privacy', intro: 'You choose which optional tools can run on this site. Tools required for the requested service remain active.',
      accept: 'Accept all', reject: 'Reject all', customize: 'Customize', save: 'Save my choices', close: 'Close without changes',
      settings: 'Privacy preferences', policy: 'Privacy policy', necessary: 'Necessary', always: 'Always active',
      required: 'Sign-in, security and remembering your choice. Tools classified as necessary must be limited to the requested service.',
      preferences: 'Optional preferences', analytics: 'Audience measurement', marketing: 'Advertising and marketing tracking',
      preferencesDesc: 'Enable optional features and remember their settings.', analyticsDesc: 'Measure visits and site usage.',
      marketingDesc: 'Enable the declared advertising and marketing tools.', vendors: 'Tools and providers involved',
      more: 'Your choice applies to this site and browser. You can change it at any time.',
      saved: 'Choice saved.', unavailable: 'Your browser cannot remember this choice. It applies to this page only.',
      expired: 'Please renew your choice.', blocked: 'Optional content is disabled. Open preferences to allow it.',
      none: 'No optional tools have been declared on this page.',
      relayMore: 'Your choice applies to all NOXEL sites: it follows you when you go from one to another through a link. You can change it at any time on each of them.',
      relayShort: 'This choice applies to all NOXEL sites.',
      noneIntro: 'This site uses no optional tools: no audience measurement and no advertising. Tools required for the requested service remain active.',
      noneRelay: 'On the other NOXEL sites, you will be asked once, then your choice follows you from one site to another.',
      dismiss: 'Close and continue without accepting', dismissInfo: 'Close' }
  };
  const t = words[lang];
  const categories = new Set((cfg.enabledCategories || []).filter(x => keys.includes(x)));
  const services = new Map();
  const activeCategories = new Set();
  const activatedNodes = new WeakSet();
  const originalFrames = new WeakMap();
  let receipt = null, root, banner, dialog, live, returnFocus, mutationObserver, timer;
  let started = false, pendingQueue = Promise.resolve(), mutationPending = false;
  let persistenceAvailable = true;
  const effectiveDays = Math.max(1, Math.min(180, Number(cfg.retentionDays) || 180));
  // Relais entre sites NOXEL : le choix voyage dans le lien (#nxc=1.<p><a><m>.<date base36>),
  // jamais d'identifiant. Accepté seulement si la page précédente est un site NOXEL déclaré.
  const bareHost = host => String(host || '').toLowerCase().replace(/^www\./, '');
  const relayDomains = new Set((Array.isArray(cfg.relayDomains) ? cfg.relayDomains : []).map(bareHost).filter(Boolean));
  const relayParam = /^[a-z][a-z0-9_]{0,15}$/i.test(String(cfg.relayParam)) ? String(cfg.relayParam) : 'nxc';
  const relayEnabled = relayDomains.size > 0 && relayDomains.has(bareHost(location.hostname));
  const encodeRelay = value => '1.' + keys.map(k => value.categories[k] ? '1' : '0').join('') + '.' + Math.floor(value.createdAt).toString(36);
  function decodeRelay(token) {
    const m = /^1\.([01]{3})\.([0-9a-z]{1,12})$/.exec(String(token || '')); if (!m) return null;
    const createdAt = parseInt(m[2], 36), now = Date.now();
    if (!Number.isFinite(createdAt) || createdAt > now + 60000 || createdAt + effectiveDays * 86400000 <= now) return null;
    const categories = { necessary: true }; keys.forEach((k, i) => { categories[k] = m[1][i] === '1'; });
    return { createdAt, categories };
  }
  function takeRelay() {
    if (!relayEnabled) return null;
    let token = null; const url = new URL(location.href);
    const hash = new URLSearchParams(url.hash.replace(/^#/, ''));
    if (hash.has(relayParam)) { token = hash.get(relayParam); url.hash = ''; }
    else if (url.searchParams.has(relayParam)) { token = url.searchParams.get(relayParam); url.searchParams.delete(relayParam); }
    else return null;
    try { history.replaceState(history.state, '', url.pathname + url.search + url.hash); } catch (_) { /* adresse inchangée */ }
    let from = ''; try { from = document.referrer ? new URL(document.referrer).hostname : ''; } catch (_) { from = ''; }
    if (!relayDomains.has(bareHost(from))) return null;
    const value = decodeRelay(token); if (value) value.from = bareHost(from);
    return value;
  }
  const pendingRelay = takeRelay();
  const empty = () => ({ necessary: true, preferences: false, analytics: false, marketing: false });
  const valid = value => {
    if (!value || value.schema !== 1 || value.policyVersion !== String(cfg.policyVersion) || value.origin !== location.origin) return false;
    if (!Number.isFinite(value.createdAt) || !Number.isFinite(value.expiresAt) || value.createdAt > Date.now() + 60000 || value.expiresAt <= Date.now()) return false;
    if (value.expiresAt > value.createdAt + effectiveDays * 86400000 + 1000) return false;
    return value.categories?.necessary === true && keys.every(k => typeof value.categories[k] === 'boolean');
  };
  function read() { try { const raw = localStorage.getItem(cfg.storageKey); const value = raw ? JSON.parse(raw) : null; return valid(value) ? value : null; } catch (_) { persistenceAvailable = false; return null; } }
  function has(category) { return category === 'necessary' || (keys.includes(category) && valid(receipt) && receipt.categories[category] === true); }
  function get() { return receipt ? JSON.parse(JSON.stringify(receipt)) : null; }
  function node(tag, text, attrs = {}) {
    const el = document.createElement(tag); if (text != null) el.textContent = text;
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
    return el;
  }
  function button(text, action, className = '', hud = '') {
    if (!HUD[hud]) { const el = node('button', text, { type: 'button', class: 'nx-consent-btn ' + className }); el.addEventListener('click', action); return el; }
    // Bouton HUD NOXEL : anneaux du kit HUD + libellé (ou icône seule avec nom accessible).
    const iconOnly = / nx-hud--icon\b/.test(' ' + className);
    const el = node('button', null, { type: 'button', class: ('nx-consent-btn nx-hud ' + className).trim() });
    if (iconOnly) { el.setAttribute('aria-label', text); el.setAttribute('title', text); }
    const graphic = node('span', null, { class: 'nx-hud-graphic', 'aria-hidden': 'true' });
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 128 128'); svg.setAttribute('focusable', 'false'); svg.innerHTML = HUD[hud];
    graphic.append(svg); el.append(graphic, node('span', text, { class: 'nx-hud-label' }));
    el.addEventListener('click', action); return el;
  }
  function announce(text) { if (live) live.textContent = text; }
  function emit(action, old) {
    window.dispatchEvent(new CustomEvent('noxel:consentchange', { detail: { action, previous: old, receipt: get(), categories: receipt?.categories || empty() } }));
  }
  function safePrivacyLink(parent) {
    if (!cfg.privacyUrl) return;
    try { const url = new URL(cfg.privacyUrl, location.href); if (!['https:', 'http:'].includes(url.protocol)) return;
      parent.append(node('a', t.policy, { href: url.href, class: 'nx-consent-link' })); } catch (_) {}
  }
  function detect() {
    document.querySelectorAll('script[type="text/plain"][data-consent],iframe[data-consent][data-src]').forEach(el => {
      const category = el.dataset.consent;
      if (keys.includes(category)) categories.add(category);
      if (el.tagName === 'IFRAME' && keys.includes(category) && !originalFrames.has(el)) {
        if (el.hasAttribute('src') && el.getAttribute('src') !== 'about:blank') console.warn('[NOXEL Consent] iframe src must be removed before the initial load.');
        originalFrames.set(el, { src: el.dataset.src });
        if (!has(category)) {
          const placeholder = node('button', t.blocked, { type: 'button', class: 'nx-consent-placeholder' });
          placeholder.addEventListener('click', open); el.before(placeholder); el.hidden = true;
          originalFrames.get(el).placeholder = placeholder;
        }
      }
    });
  }
  function cleanCategory(category) {
    // Only explicitly inventoried first-party cookies/storage are removed.
    for (const rule of cfg.cookieRules || []) {
      if (rule.category !== category || typeof rule.name !== 'string') continue;
      const cookieNames = document.cookie.split(';').map(x => x.trim().split('=')[0]);
      const names = cookieNames.filter(name => rule.name.endsWith('*') ? name.startsWith(rule.name.slice(0, -1)) : name === rule.name);
      const paths = rule.paths || ['/']; const domains = rule.domains || [''];
      for (const name of names) for (const path of paths) for (const domain of domains) {
        if (/[;\r\n]/.test(name + path + domain)) continue;
        document.cookie = name + '=; Max-Age=0; path=' + path + (domain ? '; domain=' + domain : '') + (location.protocol === 'https:' ? '; Secure' : '') + '; SameSite=Lax';
      }
    }
    for (const rule of cfg.storageRules || []) if (rule.category === category && rule.key !== cfg.storageKey) {
      try { (rule.kind === 'session' ? sessionStorage : localStorage).removeItem(rule.key); } catch (_) {}
    }
  }
  function disableDisallowed() {
    let reload = false;
    for (const category of activeCategories) if (!has(category)) { cleanCategory(category); reload = true; }
    for (const service of services.values()) if (service.running && !has(service.category)) {
      try { if (typeof service.cleanup === 'function') service.cleanup(); if (typeof service.stop === 'function') service.stop(); }
      catch (error) { console.error('[NOXEL Consent] service stop failed', service.id, error); }
      service.running = false; service.cleanup = null;
    }
    return reload;
  }
  async function activate() {
    for (const service of services.values()) if (!service.running && has(service.category)) {
      service.running = true; activeCategories.add(service.category);
      try { const cleanup = service.start(); if (typeof cleanup === 'function') service.cleanup = cleanup; }
      catch (error) { service.running = false; console.error('[NOXEL Consent] service start failed', service.id, error); }
    }
    for (const frame of document.querySelectorAll('iframe[data-consent][data-src]')) {
      const category = frame.dataset.consent;
      if (keys.includes(category) && has(category) && !activatedNodes.has(frame)) {
        activatedNodes.add(frame); activeCategories.add(category); frame.src = frame.dataset.src; frame.hidden = false;
        originalFrames.get(frame)?.placeholder?.remove();
      }
    }
    // Declared scripts are inserted in DOM order; dependencies wait for load.
    for (const inert of document.querySelectorAll('script[type="text/plain"][data-consent]')) {
      const category = inert.dataset.consent;
      if (!keys.includes(category) || !has(category) || activatedNodes.has(inert)) continue;
      activatedNodes.add(inert); activeCategories.add(category);
      const script = document.createElement('script');
      script.type = inert.dataset.scriptType || 'text/javascript';
      if (cfg.nonce) script.nonce = cfg.nonce;
      for (const key of ['integrity', 'crossorigin', 'referrerpolicy']) if (inert.hasAttribute(key)) script.setAttribute(key, inert.getAttribute(key));
      const src = inert.dataset.src;
      if (src) {
        script.async = false; script.src = src;
        await new Promise(resolve => { script.onload = resolve; script.onerror = () => { console.error('[NOXEL Consent] script failed', src); resolve(); }; inert.after(script); });
      } else { script.textContent = inert.textContent; inert.after(script); }
    }
  }
  function scheduleActivation() { pendingQueue = pendingQueue.then(activate).catch(error => console.error('[NOXEL Consent]', error)); return pendingQueue; }
  function apply(next, action, persist = true) {
    const old = get(); receipt = next;
    if (persist) try { if (next) localStorage.setItem(cfg.storageKey, JSON.stringify(next)); else localStorage.removeItem(cfg.storageKey); }
    catch (_) { persistenceAvailable = false; }
    const reload = disableDisallowed();
    for (const category of keys) if (!has(category)) cleanCategory(category);
    armExpiry(); emit(action, old); close(); renderBanner();
    announce(persistenceAvailable ? t.saved : t.unavailable);
    if (reload && cfg.reloadOnWithdrawal !== false) { location.reload(); return; }
    if (reload) console.warn('[NOXEL Consent] Reload required: already-loaded scripts cannot be reliably unloaded.');
    scheduleActivation();
  }
  function choose(selected, action) {
    const values = empty(); for (const k of keys) values[k] = categories.has(k) && selected[k] === true;
    const now = Date.now();
    apply({ schema: 1, policyVersion: String(cfg.policyVersion), origin: location.origin, createdAt: now,
      expiresAt: now + effectiveDays * 86400000, action, language: lang, categories: values }, action);
  }
  function accept() { choose(Object.fromEntries(keys.map(k => [k, true])), 'accept-all'); }
  function reject() { choose(empty(), 'reject-all'); }
  function renderBanner() {
    if (!root) return;
    const infoOnly = categories.size === 0;
    banner.replaceChildren(); banner.hidden = valid(receipt) || cfg.openOnArrival === true || (infoOnly && cfg.showWithoutCategories !== true);
    if (banner.hidden) return;
    // Fermer : continuer sans accepter (refus) ; sur un site sans outil facultatif, simple information (non relayée).
    banner.append(button(infoOnly ? t.dismissInfo : t.dismiss, () => choose(empty(), infoOnly ? 'dismiss-info' : 'dismiss'), 'nx-consent-dismiss nx-hud--icon', 'close'));
    banner.append(node('p', cfg.siteName, { class: 'nx-consent-brand' }), node('h2', t.title), node('p', infoOnly ? t.noneIntro : t.intro));
    if (!infoOnly) {
      const actions = node('div', null, { class: 'nx-consent-actions' });
      actions.append(button(t.reject, reject, '', 'reject'), button(t.accept, accept, '', 'accept'), button(t.customize, open, '', 'customize'));
      banner.append(actions);
    }
    const foot = node('div', null, { class: 'nx-consent-foot' });
    if (relayEnabled) foot.append(node('p', infoOnly ? t.noneRelay : t.relayShort)); safePrivacyLink(foot); banner.append(foot);
  }
  function open() {
    if (!root || dialog.open) return;
    returnFocus = document.activeElement; dialog.replaceChildren();
    const heading = node('h2', t.title, { id: 'nx-consent-heading' });
    dialog.append(heading, node('p', t.intro, { id: 'nx-consent-description' }));
    const required = node('section', null, { class: 'nx-consent-category' }); required.append(node('h3', t.necessary + ' — ' + t.always), node('p', t.required)); dialog.append(required);
    for (const category of keys.filter(k => categories.has(k))) {
      const section = node('section', null, { class: 'nx-consent-category' });
      const label = node('label', null, { class: 'nx-consent-toggle' });
      const input = node('input', null, { type: 'checkbox', name: category, id: 'nx-consent-' + category }); input.checked = has(category);
      label.append(input, node('span', t[category])); section.append(label, node('p', t[category + 'Desc']));
      const providers = (cfg.providers || []).filter(p => p.category === category);
      if (providers.length) {
        section.append(node('h4', t.vendors)); const list = node('ul');
        for (const provider of providers) { const item = node('li', String(provider.name || '') + (provider.purpose ? ' — ' + provider.purpose : '')); list.append(item); }
        section.append(list);
      }
      dialog.append(section);
    }
    if (!categories.size) dialog.append(node('p', t.none));
    dialog.append(node('p', relayEnabled ? t.relayMore : t.more)); safePrivacyLink(dialog);
    const actions = node('div', null, { class: 'nx-consent-actions' });
    actions.append(button(t.reject, reject, '', 'reject'), button(t.accept, accept, '', 'accept'), button(t.save, () => {
      const selected = empty(); for (const input of dialog.querySelectorAll('input[type="checkbox"]')) selected[input.name] = input.checked;
      choose(selected, 'custom');
    }, '', 'save'));
    dialog.append(actions, button(t.close, closeWithoutChange, 'nx-consent-close', 'close'));
    dialog.showModal(); dialog.querySelector('input,button')?.focus();
  }
  function close() { if (dialog?.open) { dialog.close(); if (returnFocus?.isConnected) returnFocus.focus(); } }
  // « Fermer sans modifier » : sans choix existant, c'est continuer sans accepter (refus enregistré) ; sinon simple fermeture.
  function closeWithoutChange() { if (valid(receipt)) close(); else choose(empty(), 'dismiss'); }
  function register(service) {
    if (!service || typeof service.id !== 'string' || !keys.includes(service.category) || typeof service.start !== 'function') throw new TypeError('Service requires id, category and a synchronous start callback.');
    if (services.has(service.id)) throw new Error('Service already registered: ' + service.id);
    services.set(service.id, Object.assign({}, service, { running: false })); categories.add(service.category);
    if (started) { renderBanner(); scheduleActivation(); }
    return () => { const entry = services.get(service.id); if (!entry) return;
      if (entry.running) { entry.cleanup?.(); entry.stop?.(); } services.delete(service.id); };
  }
  function expire() { if (receipt && !valid(receipt)) { apply(null, 'expired'); announce(t.expired); } }
  function armExpiry() {
    clearTimeout(timer);
    if (receipt) timer = setTimeout(() => { expire(); armExpiry(); }, Math.max(1, Math.min(3600000, receipt.expiresAt - Date.now())));
  }
  function adoptRelay() {
    if (!pendingRelay || (receipt && receipt.createdAt >= pendingRelay.createdAt)) return;
    const next = { schema: 1, policyVersion: String(cfg.policyVersion), origin: location.origin, createdAt: pendingRelay.createdAt,
      expiresAt: pendingRelay.createdAt + effectiveDays * 86400000, action: 'relay', language: lang, categories: pendingRelay.categories, relayedFrom: pendingRelay.from };
    if (!valid(next)) return;
    receipt = next; try { localStorage.setItem(cfg.storageKey, JSON.stringify(next)); } catch (_) { persistenceAvailable = false; }
  }
  // Adresse enrichie du choix courant si elle mène vers un autre site NOXEL ; sinon inchangée.
  function relayUrl(href) {
    // Une simple information fermée sur un site sans outil facultatif n'est pas un choix : rien à relayer.
    if (!relayEnabled || !valid(receipt) || receipt.action === 'dismiss-info') return String(href);
    let url; try { url = new URL(String(href), location.href); } catch (_) { return String(href); }
    if (!/^https?:$/.test(url.protocol) || !relayDomains.has(bareHost(url.hostname)) || bareHost(url.hostname) === bareHost(location.hostname)) return String(href);
    const token = encodeRelay(receipt); const hash = new URLSearchParams(url.hash.replace(/^#/, ''));
    if (!url.hash || (hash.has(relayParam) && [...hash.keys()].length === 1)) url.hash = relayParam + '=' + token;
    else url.searchParams.set(relayParam, token);
    return url.href;
  }
  function relayLink(event) {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null; if (!link) return;
    const next = relayUrl(link.href); if (next !== link.href) link.href = next;
  }
  function boot() {
    receipt = read(); adoptRelay(); detect();
    for (const category of keys) if (!has(category)) cleanCategory(category);
    // translate=no : l'interface est déjà en fr/en ; la traduction automatique du navigateur la déformait.
    root = node('div', null, { id: 'noxel-consent-root', lang, translate: 'no', class: 'notranslate' });
    banner = node('section', null, { class: 'nx-consent-banner', 'aria-label': t.settings });
    dialog = node('dialog', null, { class: 'nx-consent-dialog', 'aria-labelledby': 'nx-consent-heading', 'aria-describedby': 'nx-consent-description' });
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeWithoutChange(); });
    live = node('p', '', { class: 'nx-consent-sr-only', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' });
    const launcher = button(t.settings, open, 'nx-consent-launcher nx-hud--icon', 'settings');
    root.append(banner, dialog, launcher, live); document.body.append(root); started = true;
    renderBanner(); scheduleActivation();
    if (cfg.openOnArrival === true && !valid(receipt)) open();
    document.addEventListener('click', event => { if (event.target.closest('[data-noxel-consent-settings]')) { event.preventDefault(); open(); } });
    if (relayEnabled) { document.addEventListener('click', relayLink, true); document.addEventListener('auxclick', relayLink, true); }
    window.addEventListener('storage', event => { if (event.key !== cfg.storageKey && event.key !== null) return;
      const current = read(); apply(current, 'storage-sync', false); });
    window.addEventListener('pageshow', expire); document.addEventListener('visibilitychange', expire);
    armExpiry();
    mutationObserver = new MutationObserver(() => { if (mutationPending) return; mutationPending = true;
      queueMicrotask(() => { mutationPending = false; const oldCount = categories.size; detect(); if (oldCount !== categories.size) renderBanner(); scheduleActivation(); });
    });
    mutationObserver.observe(document.documentElement, { childList: true, subtree: true });
    window.dispatchEvent(new CustomEvent('noxel:consentready', { detail: { receipt: get() } }));
  }
  window.NoxelConsent = Object.freeze({ open, close, acceptAll: accept, rejectAll: reject, has, getReceipt: get, register, relayUrl,
    refresh: () => { detect(); renderBanner(); return scheduleActivation(); }, version: '1.4.0' });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();
})();
