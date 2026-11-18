// NOXEL FORGE — Network guidelines: which sites are accepted and which are refused.
// Keep this list in sync with the Alfred prompt (backend/src/services/forge/alfred.forge.service.ts, REFUSED list)
// and with the static text of /forge/guidelines in scripts/route-pages.mjs.
import { Link } from 'react-router-dom';
import ForgeTopbar from '../../components/ForgeTopbar';

type Txt = {
  title: string; intro: string; refusedTitle: string; refused: [string, string][];
  nuanceTitle: string; nuance: string; acceptedTitle: string; accepted: string[];
  whatTitle: string; what: string[]; back: string; submit: string;
};

const FR: Txt = {
  title: 'Règles du réseau NOXEL FORGE',
  intro: "NOXEL FORGE relie des sites réels et utiles. Pour que chaque lien échangé reste une recommandation que l'on peut défendre, certains types de sites sont refusés, quelle que soit leur niche. Alfred applique ces règles à chaque soumission.",
  refusedTitle: 'Sites refusés',
  refused: [
    ['Contenu sexuel et nudité', 'pornographie, nudité, services sexuels, sites de rencontres pour adultes, contenu suggestif.'],
    ['Violence', 'contenu violent ou choquant, gore, glorification de la violence ou du terrorisme.'],
    ['Armes', "vente d'armes, de munitions, d'accessoires ou de pièces, fabrication d'armes ou d'explosifs."],
    ['Drogues et substances', 'vente ou promotion de drogues illégales, de produits pharmaceutiques sans ordonnance ou de substances réglementées.'],
    ['Jeux d’argent', 'casinos, paris et loteries en ligne.'],
    ['Haine et harcèlement', 'contenu qui vise des personnes pour leur origine, religion, sexe, orientation, handicap ou autre caractéristique.'],
    ['Arnaques', "fraude, hameçonnage, promesses d'argent facile, systèmes pyramidaux, faux avis."],
    ['Activités illégales', 'contrefaçon, piratage, logiciels malveillants, vente de données personnelles.'],
    ['Désinformation dangereuse', 'faux remèdes et fausses affirmations de santé ou de sécurité.'],
    ['Manipulation des liens', 'fermes de liens, réseaux de blogues privés (PBN), vente de liens, pages creuses générées en masse, domaines parqués.'],
  ],
  nuanceTitle: 'À noter',
  nuance: "Les activités légales et encadrées restent acceptées quand le site informe sans faire la promotion de ce qui est refusé : un club de tir sportif, une pourvoirie, un organisme de prévention en santé ou un site d'éducation sexuelle à vocation médicale, par exemple. En cas de doute, Alfred explique sa décision et tu peux corriger ta page.",
  acceptedTitle: 'Ce que le réseau recherche',
  accepted: [
    'Un site réel, avec un propriétaire identifiable et un domaine prouvé.',
    'Des pages utiles pour un lecteur de la niche, avec du contenu original.',
    "Des promesses honnêtes : pas de résultats garantis ni de chiffres inventés.",
  ],
  whatTitle: 'Ce qui se passe si une règle est enfreinte',
  what: [
    "La soumission est refusée et Alfred en donne la raison.",
    "Un site qui enfreint les règles de façon claire ou répétée est retiré du répertoire, ses échanges sont fermés et son domaine peut être bloqué.",
  ],
  back: '← Retour à NOXEL FORGE',
  submit: 'Soumettre une page',
};

const EN: Txt = {
  title: 'NOXEL FORGE network guidelines',
  intro: 'NOXEL FORGE connects real, useful sites. So that every exchanged link stays a recommendation worth defending, some kinds of sites are refused whatever their niche. Alfred applies these rules to every submission.',
  refusedTitle: 'Refused sites',
  refused: [
    ['Sexual content and nudity', 'pornography, nudity, sexual services, adult dating, suggestive content.'],
    ['Violence', 'violent or shocking content, gore, glorification of violence or terrorism.'],
    ['Weapons', 'sale of weapons, ammunition, accessories or parts, making weapons or explosives.'],
    ['Drugs and substances', 'sale or promotion of illegal drugs, prescription drugs without a prescription or controlled substances.'],
    ['Gambling', 'online casinos, betting and lotteries.'],
    ['Hate and harassment', 'content that targets people for their origin, religion, sex, orientation, disability or any other trait.'],
    ['Scams', 'fraud, phishing, get-rich-quick promises, pyramid schemes, fake reviews.'],
    ['Illegal activities', 'counterfeits, piracy, malware, sale of personal data.'],
    ['Dangerous misinformation', 'fake cures and false health or safety claims.'],
    ['Link manipulation', 'link farms, private blog networks (PBN), link selling, mass-generated thin pages, parked domains.'],
  ],
  nuanceTitle: 'Good to know',
  nuance: 'Legal, regulated activities are still accepted when the site informs without promoting what is refused: a sport shooting club, a hunting outfitter, a health prevention organization or a medical sex education site, for example. When in doubt, Alfred explains his decision and you can fix your page.',
  acceptedTitle: 'What the network looks for',
  accepted: [
    'A real site, with an identifiable owner and a proven domain.',
    'Pages that are useful to a reader of the niche, with original content.',
    'Honest promises: no guaranteed results and no invented figures.',
  ],
  whatTitle: 'What happens when a rule is broken',
  what: [
    'The submission is refused and Alfred gives the reason.',
    'A site that clearly or repeatedly breaks the rules is removed from the directory, its exchanges are closed and its domain can be blocked.',
  ],
  back: '← Back to NOXEL FORGE',
  submit: 'Submit a page',
};

export default function ForgeGuidelines() {
  const t = (navigator.language || 'en').toLowerCase().startsWith('fr') ? FR : EN;
  const h2: React.CSSProperties = { fontSize: 17, fontWeight: 900, margin: '28px 0 10px', color: 'var(--g)' };
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>
      <ForgeTopbar active="submit" />
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 32px 80px', lineHeight: 1.65 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>{t.title}</h1>
        <p style={{ color: 'var(--muted)' }}>{t.intro}</p>

        <h2 style={{ ...h2, color: 'var(--danger)' }}>{t.refusedTitle}</h2>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {t.refused.map(([k, v]) => <li key={k} style={{ marginBottom: 6 }}><strong>{k}</strong> : {v}</li>)}
        </ul>

        <div className="nx-card" style={{ marginTop: 20, borderColor: 'rgba(255,183,77,0.35)' }}>
          <div style={{ fontWeight: 800, marginBottom: 4, color: 'var(--warn)' }}>{t.nuanceTitle}</div>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>{t.nuance}</div>
        </div>

        <h2 style={h2}>{t.acceptedTitle}</h2>
        <ul style={{ paddingLeft: 20, margin: 0 }}>{t.accepted.map((a) => <li key={a} style={{ marginBottom: 6 }}>{a}</li>)}</ul>

        <h2 style={h2}>{t.whatTitle}</h2>
        <ul style={{ paddingLeft: 20, margin: 0 }}>{t.what.map((a) => <li key={a} style={{ marginBottom: 6 }}>{a}</li>)}</ul>

        <p style={{ marginTop: 32, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link to="/forge" style={{ color: 'var(--muted)' }}>{t.back}</Link>
          <Link to="/forge/submit" style={{ color: 'var(--g)' }}>{t.submit} →</Link>
        </p>
      </main>
    </div>
  );
}
