import { LANGUAGES_115 } from './languages';

export type ForgeTranslations = {
  nav: { submit: string; dashboard: string; pricing: string; badges: string; };
  hero: { kicker: string; title: string; titleAccent: string; subtitle: string; ctaSubmit: string; ctaDashboard: string; };
  stats: { forgePoints: string; forgePointsDesc: string; giveOne: string; giveOneDesc: string; alfredFilters: string; alfredFiltersDesc: string; };
  trust: { kicker: string; subtitle: string; };
  directory: { kicker: string; title: string; empty: string; emptyDesc: string; loading: string; previous: string; next: string; };
  submit: { alfredTitle: string; alfredDesc: string; urlLabel: string; urlHint: string; titleLabel: string; nicheLabel: string; descLabel: string; contentLabel: string; contentHint: string; submitBtn: string; analyzing: string; };
  pricing: { kicker: string; title: string; titleAccent: string; subtitle: string; monthly: string; annual: string; badgeToggle: string; badgeApplied: string; mostPopular: string; perMonth: string; getStarted: string; badgeInfoTitle: string; badgeInfoDesc: string; };
  badge: { kicker: string; title: string; titleAccent: string; subtitle: string; copy: string; copied: string; infoTitle: string; infoDesc: string; };
  cta: { kicker: string; title: string; subtitle: string; };
};

const en: ForgeTranslations = {
  nav: { submit: 'Submit', dashboard: 'Dashboard', pricing: 'Pricing', badges: 'Badges' },
  hero: { kicker: 'NOXEL Forge — Backlink Exchange Ecosystem', title: 'Forge your', titleAccent: 'authority', subtitle: 'Exchange backlinks with verified sites filtered by Alfred. Quality guaranteed, spam impossible. Give one, get one.', ctaSubmit: 'Submit my site', ctaDashboard: 'My Dashboard' },
  stats: { forgePoints: 'Forge Points', forgePointsDesc: 'Earn points on every exchange', giveOne: 'Give one, get one', giveOneDesc: 'You give a backlink, you get one back', alfredFilters: 'Alfred filters', alfredFiltersDesc: 'Zero spam, zero generic content' },
  trust: { kicker: 'Trust Score Forge', subtitle: 'Every site receives a score out of 100 based on 6 quality signals' },
  directory: { kicker: 'Directory', title: 'Verified Forge Sites', empty: 'The directory is empty for now', emptyDesc: 'Be the first to submit your site.', loading: 'Loading directory...', previous: 'Previous', next: 'Next' },
  submit: { alfredTitle: 'Alfred reviews every submission', alfredDesc: 'Every submission is scanned and reviewed by Alfred before publication. Quality guaranteed, spam impossible.', urlLabel: 'Site URL', urlHint: 'HTTPS required. Must contain a link to noxelseo.com or noxelforge.com', titleLabel: 'Title', nicheLabel: 'Niche', descLabel: 'Short description', contentLabel: 'Main content', contentHint: 'optional, helps Alfred analyze better', submitBtn: 'Submit to NOXEL Forge', analyzing: 'Analyzing...' },
  pricing: { kicker: 'NOXEL Forge Pricing', title: 'Build your', titleAccent: 'authority network', subtitle: 'Display the NOXEL badge on your site and unlock exclusive discounts on every tier.', monthly: 'Monthly', annual: 'Annual', badgeToggle: 'I display the NOXEL badge, unlock discount', badgeApplied: 'Badge discount applied', mostPopular: 'Most popular', perMonth: '/mo', getStarted: 'Get started free', badgeInfoTitle: 'How to unlock badge discounts', badgeInfoDesc: 'Display any badge in the footer of your site. Alfred scans your footer on every submission.' },
  badge: { kicker: 'Display on your site', title: 'NOXEL Forge', titleAccent: 'Badges', subtitle: 'Copy and paste any badge in your site footer.', copy: 'Copy snippet', copied: 'Copied!', infoTitle: 'How badge discounts work', infoDesc: 'Place any badge in the footer of your site, site-wide. Alfred scans your footer on every submission. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%.' },
  cta: { kicker: 'Ready to forge?', title: 'Join NOXEL Forge', subtitle: 'Start building your verified backlink network today.' },
};

const fr: ForgeTranslations = {
  nav: { submit: 'Soumettre', dashboard: 'Tableau de bord', pricing: 'Tarifs', badges: 'Badges' },
  hero: { kicker: 'NOXEL Forge - Ecosysteme d echange de backlinks', title: 'Forgez votre', titleAccent: 'autorite', subtitle: 'Echangez des backlinks avec des sites verifies filtres par Alfred. Qualite garantie, spam impossible. Donnez un, recevez un.', ctaSubmit: 'Soumettre mon site', ctaDashboard: 'Mon tableau de bord' },
  stats: { forgePoints: 'Points Forge', forgePointsDesc: 'Gagnez des points a chaque echange', giveOne: 'Donnez un, recevez un', giveOneDesc: 'Vous donnez un backlink, vous en recevez un', alfredFilters: 'Alfred filtre', alfredFiltersDesc: 'Zero spam, zero contenu generique' },
  trust: { kicker: 'Trust Score Forge', subtitle: 'Chaque site recoit un score sur 100 base sur 6 signaux de qualite' },
  directory: { kicker: 'Annuaire', title: 'Sites Forge Verifies', empty: 'L annuaire est vide pour l instant', emptyDesc: 'Soyez le premier a soumettre votre site.', loading: 'Chargement...', previous: 'Precedent', next: 'Suivant' },
  submit: { alfredTitle: 'Alfred examine chaque soumission', alfredDesc: 'Chaque soumission est scannee et examinee par Alfred avant publication. Qualite garantie, spam impossible.', urlLabel: 'URL du site', urlHint: 'HTTPS requis. Doit contenir un lien vers noxelseo.com ou noxelforge.com', titleLabel: 'Titre', nicheLabel: 'Niche', descLabel: 'Courte description', contentLabel: 'Contenu principal', contentHint: 'optionnel, aide Alfred a mieux analyser', submitBtn: 'Soumettre a NOXEL Forge', analyzing: 'Analyse en cours...' },
  pricing: { kicker: 'Tarifs NOXEL Forge', title: 'Construisez votre', titleAccent: 'reseau d autorite', subtitle: 'Affichez le badge NOXEL sur votre site et debloquez des reductions exclusives.', monthly: 'Mensuel', annual: 'Annuel', badgeToggle: 'J affiche le badge NOXEL, debloquer la reduction', badgeApplied: 'Reduction badge appliquee', mostPopular: 'Plus populaire', perMonth: '/mois', getStarted: 'Commencer gratuitement', badgeInfoTitle: 'Comment debloquer les reductions badge', badgeInfoDesc: 'Affichez un badge dans le footer de votre site. Alfred scanne votre footer a chaque soumission.' },
  badge: { kicker: 'Afficher sur votre site', title: 'Badges NOXEL', titleAccent: 'Forge', subtitle: 'Copiez et collez un badge dans le footer de votre site.', copy: 'Copier le snippet', copied: 'Copie!', infoTitle: 'Comment fonctionnent les reductions badge', infoDesc: 'Placez un badge dans le footer de votre site sur toutes les pages. Alfred scanne votre footer a chaque soumission. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%.' },
  cta: { kicker: 'Pret a forger?', title: 'Rejoindre NOXEL Forge', subtitle: 'Commencez a construire votre reseau de backlinks verifies aujourd hui.' },
};

const es: ForgeTranslations = {
  nav: { submit: 'Enviar', dashboard: 'Panel', pricing: 'Precios', badges: 'Insignias' },
  hero: { kicker: 'NOXEL Forge - Ecosistema de intercambio de backlinks', title: 'Forja tu', titleAccent: 'autoridad', subtitle: 'Intercambia backlinks con sitios verificados filtrados por Alfred. Calidad garantizada, spam imposible. Da uno, recibe uno.', ctaSubmit: 'Enviar mi sitio', ctaDashboard: 'Mi panel' },
  stats: { forgePoints: 'Puntos Forge', forgePointsDesc: 'Gana puntos en cada intercambio', giveOne: 'Da uno, recibe uno', giveOneDesc: 'Das un backlink, recibes uno', alfredFilters: 'Alfred filtra', alfredFiltersDesc: 'Cero spam, cero contenido generico' },
  trust: { kicker: 'Trust Score Forge', subtitle: 'Cada sitio recibe una puntuacion sobre 100 basada en 6 senales de calidad' },
  directory: { kicker: 'Directorio', title: 'Sitios Forge Verificados', empty: 'El directorio esta vacio por ahora', emptyDesc: 'Se el primero en enviar tu sitio.', loading: 'Cargando...', previous: 'Anterior', next: 'Siguiente' },
  submit: { alfredTitle: 'Alfred revisa cada envio', alfredDesc: 'Cada envio es escaneado y revisado por Alfred antes de la publicacion. Calidad garantizada, spam imposible.', urlLabel: 'URL del sitio', urlHint: 'HTTPS requerido. Debe contener un enlace a noxelseo.com o noxelforge.com', titleLabel: 'Titulo', nicheLabel: 'Nicho', descLabel: 'Descripcion corta', contentLabel: 'Contenido principal', contentHint: 'opcional, ayuda a Alfred a analizar mejor', submitBtn: 'Enviar a NOXEL Forge', analyzing: 'Analizando...' },
  pricing: { kicker: 'Precios NOXEL Forge', title: 'Construye tu', titleAccent: 'red de autoridad', subtitle: 'Muestra la insignia NOXEL en tu sitio y desbloquea descuentos exclusivos.', monthly: 'Mensual', annual: 'Anual', badgeToggle: 'Muestro la insignia NOXEL, desbloquear descuento', badgeApplied: 'Descuento de insignia aplicado', mostPopular: 'Mas popular', perMonth: '/mes', getStarted: 'Empezar gratis', badgeInfoTitle: 'Como desbloquear descuentos de insignia', badgeInfoDesc: 'Muestra una insignia en el footer de tu sitio. Alfred escanea tu footer en cada envio.' },
  badge: { kicker: 'Mostrar en tu sitio', title: 'Insignias NOXEL', titleAccent: 'Forge', subtitle: 'Copia y pega una insignia en el footer de tu sitio.', copy: 'Copiar snippet', copied: 'Copiado!', infoTitle: 'Como funcionan los descuentos de insignia', infoDesc: 'Coloca una insignia en el footer de tu sitio en todas las paginas. Alfred escanea tu footer en cada envio. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%.' },
  cta: { kicker: 'Listo para forjar?', title: 'Unete a NOXEL Forge', subtitle: 'Empieza a construir tu red de backlinks verificados hoy.' },
};

export const FORGE_TRANSLATIONS: Record<string, ForgeTranslations> = { en, fr, es };
export function getForgeT(lang: string): ForgeTranslations { return FORGE_TRANSLATIONS[lang] ?? FORGE_TRANSLATIONS['en']; }
export { LANGUAGES_115 };
