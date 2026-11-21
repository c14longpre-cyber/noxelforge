/**
 * Version française des pages publiques de NOXEL FORGE (Loi 96 : le site public existe en français).
 * Servies sous /fr/forge et /fr/forge/<page> (vercel.json), avec <html lang="fr">, hreflang fr / en /
 * x-default et leur propre canonique. Même sujet que la page anglaise correspondante de route-pages.mjs :
 * tout changement de prix, de règle ou de promesse se fait dans les deux langues.
 */
const FOOTER = `
        <footer><p><a href="/policies/privacy.html">Politique de confidentialité</a> · Responsable de la protection des renseignements personnels : Christian Longpré, fondateur de NOXEL360 Inc. — <a href="mailto:legal@noxel360.com">legal@noxel360.com</a> · <a href="/forge" hreflang="en" lang="en">English</a></p></footer>`;

export const ROUTE_PAGES_FR = [
  {
    route: "fr/forge",
    en: "forge",
    title: "NOXEL FORGE — échanges de liens vérifiés entre vrais sites",
    description:
      "NOXEL FORGE : échangez des liens avec des sites au domaine prouvé, relus par Alfred et vérifiés par le serveur des deux côtés. Sans pourriel ni fermes de liens.",
    crumb: null,
    body: `
        <h1>NOXEL FORGE : des échanges de liens vérifiés entre vrais sites</h1>
        <p>NOXEL FORGE est un réseau d'échange de liens pour les propriétaires de sites qui veulent bâtir leur autorité proprement. Chaque membre prouve qu'il possède son domaine, chaque page soumise est relue par Alfred, le réviseur de NOXEL FORGE, et chaque lien échangé est vérifié par le serveur sur les deux sites avant de compter.</p>
        <p>Chaque membre reçoit un Trust Score sur 100, calculé par le serveur à partir de six signaux : santé technique (analyse NOXEL SEO), autorité, risque de pourriel, qualité du contenu (Alfred), âge du domaine et fréquence de publication. Le membre n'envoie jamais lui-même une valeur. Tant que les signaux ne sont pas tous vérifiés, le score est affiché « en attente de vérification », jamais 0.</p>
        <h2>Comment ça fonctionne</h2>
        <p>Vous prouvez votre domaine une fois, par une balise meta, un fichier dans /.well-known/ ou un enregistrement DNS TXT. Vous soumettez une page de ce domaine : Alfred vérifie la qualité, la pertinence pour votre niche et les lignes directrices du réseau, et explique sa décision. Votre site apparaît ensuite dans le répertoire des partenaires, et le moteur de jumelage vous propose des membres proches de votre sujet.</p>
        <p>Un échange se termine seulement quand le serveur a trouvé, sur une page du domaine de chaque membre, un lien vers l'autre. Un lien qui disparaît ouvre une période de grâce de 7 jours, puis l'échange est marqué rompu. Vous n'avez donc jamais à croire quelqu'un sur parole.</p>
        <h2>Forfaits</h2>
        <p>Bronze est gratuit pour parcourir le répertoire. Les échanges commencent avec Silver (20 $ CA par mois), puis Gold, Platinum et Diamond ajoutent une relecture prioritaire, plus de visibilité et plus de sites par compte : 1 site en Bronze et en Silver, jusqu'à 3 en Gold, 10 en Platinum et 25 en Diamond pour les agences. Un abonnement annulé dans les 14 jours est remboursé automatiquement.</p>
        <p>Le badge NOXEL FORGE (ou NOXEL SEO) affiché dans le pied de page de votre site garde votre site public dans le répertoire et donne de 10 % à 25 % de rabais sur les forfaits payants.</p>
        <nav><a href="/fr/forge/pricing">Forfaits</a> · <a href="/fr/forge/partners">Partenaires vérifiés</a> · <a href="/fr/forge/submit">Soumettre votre site</a> · <a href="/fr/forge/badge">Badge NOXEL FORGE</a> · <a href="/fr/forge/guidelines">Lignes directrices</a></nav>${FOOTER}`,
  },
  {
    route: "fr/forge/pricing",
    en: "forge/pricing",
    title: "Forfaits NOXEL FORGE — Bronze gratuit, de Silver à Diamond en $ CA",
    description:
      "Forfaits NOXEL FORGE : Bronze gratuit, Silver 20 $, Gold 40 $, Platinum 60 $ et Diamond 80 $ CA par mois, ou environ 17 % de moins à l'année.",
    crumb: "Forfaits",
    body: `
        <h1>Forfaits NOXEL FORGE : un forfait gratuit et quatre forfaits payants en dollars canadiens</h1>
        <p>NOXEL FORGE commence avec Bronze, un forfait gratuit pour parcourir le répertoire des partenaires vérifiés. Les forfaits payants ajoutent la soumission de votre site, la relecture par Alfred et les échanges de liens avec des membres d'une niche proche.</p>
        <ul>
          <li>Bronze — gratuit : 1 site, accès au répertoire, tous les partenaires NOXEL FORGE, badge NOXEL (affichage seulement).</li>
          <li>Silver — 20 $ CA par mois ou 199 $ par année : 1 site, soumission de votre site, relecture par Alfred, points Forge, 10 % de rabais badge.</li>
          <li>Gold — 40 $ CA par mois ou 399 $ par année : jusqu'à 3 sites, relecture prioritaire, points Forge x1,5, 15 % de rabais badge, badge de partenaire vérifié.</li>
          <li>Platinum — 60 $ CA par mois ou 599 $ par année : jusqu'à 10 sites, relecture VIP, points Forge x2, 20 % de rabais badge, placement avancé.</li>
          <li>Diamond — 80 $ CA par mois ou 799 $ par année : jusqu'à 25 sites pour les agences, relecture élite, points Forge x3, 25 % de rabais badge, mise en vedette.</li>
        </ul>
        <p>Les prix sont en dollars canadiens. La facturation annuelle fait économiser environ 17 %. Un membre qui affiche le badge NOXEL FORGE ou NOXEL SEO sur son site obtient le rabais badge de son forfait. Un abonnement annulé dans les 14 jours suivant son début est remboursé automatiquement; les changements de forfait, l'annulation, la carte et les factures se gèrent dans le portail client de Stripe.</p>
        <p>Les membres Bronze peuvent parcourir le répertoire, mais pas proposer ni accepter un échange : les échanges commencent avec Silver. Chaque échange est vérifié par le serveur sur les deux sites avant de compter.</p>
        <h2>Quel forfait pour votre site</h2>
        <p>Bronze convient à qui veut d'abord regarder : parcourir les partenaires, voir leurs niches et comprendre le réseau, sans frais. Silver est le premier forfait pour un vrai échange : soumettre votre site, obtenir la relecture d'Alfred et proposer ou accepter des échanges. Gold, Platinum et Diamond ajoutent la relecture prioritaire, plus de visibilité dans le répertoire et un rabais badge plus élevé, pour les agences et les sites qui échangent souvent.</p>
        <p>Les mêmes règles valent pour tous : un seul membre par domaine prouvé, des liens vérifiés sur les deux sites par le serveur, et aucun lien payé ni ferme de liens. Le forfait change la vitesse et la visibilité, jamais le niveau de qualité exigé d'un partenaire.</p>
        <nav><a href="/fr/forge">Accueil NOXEL FORGE</a> · <a href="/fr/forge/partners">Partenaires vérifiés</a> · <a href="/fr/forge/badge">Badge NOXEL FORGE</a> · <a href="/fr/forge/submit">Soumettre votre site</a></nav>${FOOTER.replace('href="/forge"', 'href="/forge/pricing"')}`,
  },
  {
    route: "fr/forge/partners",
    en: "forge/partners",
    title: "Partenaires NOXEL FORGE — répertoire de liens vérifiés",
    description:
      "Parcourez les partenaires NOXEL FORGE : des sites au domaine prouvé et à la soumission relue, classés par niche, prêts pour des échanges de liens vérifiés.",
    crumb: "Partenaires",
    body: `
        <h1>Partenaires NOXEL FORGE : le répertoire des partenaires d'échange vérifiés</h1>
        <p>Le répertoire des partenaires NOXEL FORGE présente les sites membres qui ont prouvé qu'ils possèdent leur domaine et passé la relecture d'Alfred. Filtrez-le par niche (SEO, marketing, IA, commerce en ligne, développement web, affaires, design, finance, santé, éducation) pour trouver des partenaires proches de votre sujet.</p>
        <p>Les membres connectés reçoivent aussi des suggestions du moteur de jumelage de NOXEL FORGE, qui compare les niches, les Trust Scores, l'activité récente et la fraîcheur des données, et peut proposer un échange en un clic. Un échange compte seulement quand le serveur a trouvé un lien vers le partenaire sur une page du domaine de chaque membre.</p>
        <p>Un site apparaît dans le répertoire seulement tant que son domaine est prouvé par une balise meta, un fichier ou un enregistrement DNS, et tant que son badge NOXEL FORGE est vérifié. Les sites qui enfreignent les lignes directrices sont retirés.</p>
        <h2>Comment un partenaire est inscrit</h2>
        <p>Un site rejoint le répertoire en trois étapes. Le membre prouve qu'il possède le domaine par une balise meta, un fichier dans /.well-known/ ou un enregistrement DNS TXT. Une page de ce domaine est ensuite soumise et relue par Alfred, qui vérifie la qualité du contenu, la pertinence pour la niche et les lignes directrices. Enfin, le badge NOXEL FORGE est installé sur le site et vérifié par le serveur.</p>
        <h2>Ce qui fait compter un échange</h2>
        <p>Un échange est terminé seulement quand le serveur trouve un lien vers le partenaire sur une page du domaine de chaque membre. Un lien qui disparaît ouvre une période de grâce de 7 jours, puis l'échange est marqué rompu. Une proposition expire après 14 jours, et les deux liens doivent être vérifiés dans les 60 jours. C'est pourquoi le répertoire présente de vrais sites avec de vrais liens vérifiés, et non une simple liste d'adresses.</p>
        <p>Parcourir le répertoire est gratuit avec Bronze; proposer et accepter des échanges commence avec Silver. Les sites qui enfreignent les lignes directrices (pourriel, pages minces, liens payés) sont retirés du répertoire et leurs échanges sont fermés.</p>
        <nav><a href="/fr/forge">Accueil NOXEL FORGE</a> · <a href="/fr/forge/pricing">Forfaits</a> · <a href="/fr/forge/submit">Soumettre votre site</a> · <a href="/fr/forge/badge">Badge NOXEL FORGE</a></nav>${FOOTER.replace('href="/forge"', 'href="/forge/partners"')}`,
  },
  {
    route: "fr/forge/submit",
    en: "forge/submit",
    title: "Soumettre votre site à NOXEL FORGE — relu par Alfred",
    description:
      "Soumettez une page de votre domaine prouvé à NOXEL FORGE. Alfred vérifie la qualité du contenu et la pertinence pour votre niche avant l'entrée au répertoire.",
    crumb: "Soumettre",
    body: `
        <h1>Soumettre votre site à NOXEL FORGE</h1>
        <p>Soumettre votre site à NOXEL FORGE présente une page de votre domaine au réseau de partenaires. Alfred, le réviseur de NOXEL FORGE, vérifie la qualité du contenu, la pertinence pour la niche et les lignes directrices avant que la page entre dans le répertoire.</p>
        <p>La page soumise doit appartenir à un domaine que vous avez prouvé : une seule fois, par une balise meta, un fichier dans /.well-known/ ou un enregistrement DNS TXT. Selon votre forfait, vous pouvez prouver plusieurs sites et soumettre une page de n'importe lequel d'entre eux. La soumission avec relecture par Alfred est incluse à partir de Silver; les membres Bronze parcourent le répertoire gratuitement.</p>
        <h2>Ce qu'Alfred vérifie</h2>
        <p>Alfred lit la page comme le ferait un réviseur attentif. Il regarde si le contenu est original et utile, s'il correspond à la niche choisie et s'il respecte les lignes directrices de NOXEL FORGE : pas de pourriel, pas de remplissage mince ou généré, pas de liens cachés ni de liens payés. Il critique la page, jamais la personne, et explique quoi changer quand une soumission n'est pas acceptée. La raison d'un refus s'affiche sous la soumission, dans votre tableau de bord.</p>
        <h2>Et ensuite</h2>
        <p>Une fois la page acceptée, votre site apparaît dans le répertoire avec sa niche, et les autres membres peuvent le trouver. Votre Trust Score se construit à partir de six signaux recueillis par le serveur : santé technique d'une analyse NOXEL SEO, âge du domaine, fréquence de publication, qualité du contenu selon Alfred, et autorité et risque de pourriel vérifiés par l'équipe NOXEL. Vous pouvez alors proposer des échanges à des partenaires proches de votre sujet; chaque échange compte une fois les deux liens vérifiés.</p>
        <p>Vous pouvez soumettre de nouveau quand votre contenu change : la nouvelle page a sa propre relecture. Avant de soumettre, une analyse NOXEL SEO gratuite de la page permet de repérer les problèmes techniques, puisque la santé technique est l'un des six signaux du Trust Score.</p>
        <nav><a href="/fr/forge">Accueil NOXEL FORGE</a> · <a href="/fr/forge/pricing">Forfaits</a> · <a href="/fr/forge/partners">Partenaires vérifiés</a> · <a href="/fr/forge/guidelines">Lignes directrices</a></nav>${FOOTER.replace('href="/forge"', 'href="/forge/submit"')}`,
  },
  {
    route: "fr/forge/badge",
    en: "forge/badge",
    title: "Badge NOXEL FORGE — affichez votre adhésion vérifiée",
    description:
      "Installez le badge NOXEL FORGE sur votre site : il montre votre adhésion vérifiée, vous garde dans le répertoire et donne le rabais badge de votre forfait.",
    crumb: "Badge",
    body: `
        <h1>Le badge NOXEL FORGE</h1>
        <p>Le badge NOXEL FORGE montre aux visiteurs que votre site est un membre vérifié du réseau NOXEL FORGE. Tant que le badge est détecté, votre site reste public dans le répertoire des partenaires, et les forfaits payants obtiennent de 10 % à 25 % de rabais badge.</p>
        <p>NOXEL vérifie tous les badges le 1er et le 15 du mois. Si un badge est absent, une période de grâce de 7 jours commence et le site est vérifié chaque jour; ensuite, le badge est suspendu jusqu'à ce qu'il soit détecté de nouveau.</p>
        <h2>Pourquoi un badge</h2>
        <p>Les réseaux de liens sont faciles à imiter. Le badge est un engagement public et visible : votre site indique qu'il appartient à un réseau où chaque lien est vérifié et où chaque membre a prouvé le domaine qu'il possède. Les visiteurs peuvent cliquer pour découvrir NOXEL FORGE, et les autres membres savent que le site est toujours actif, car un badge qui disparaît est remarqué en quelques jours.</p>
        <h2>Installer le badge</h2>
        <p>La page du badge vous donne un court bout de HTML à coller dans le pied de page de votre site, ou dans tout gabarit affiché sur chaque page. Il charge une petite image et un lien vers NOXEL FORGE; il ne dépose aucun témoin et n'exécute aucun script de suivi. Une fois en place, le serveur le détecte à la vérification suivante et le badge devient vérifié. Un badge NOXEL SEO est aussi accepté : un site qui affiche déjà son score NOXEL SEO n'a pas besoin d'un deuxième badge.</p>
        <p>Le rabais badge s'applique aux forfaits payants : 10 % en Silver, 15 % en Gold, 20 % en Platinum et 25 % en Diamond, tant que le badge reste vérifié. Si vous refaites votre site, vérifiez que le badge est toujours dans le nouveau pied de page : un badge absent ouvre la période de grâce, et votre site quitte le répertoire public s'il n'est pas de retour dans les 7 jours.</p>
        <nav><a href="/fr/forge">Accueil NOXEL FORGE</a> · <a href="/fr/forge/pricing">Forfaits</a> · <a href="/fr/forge/partners">Partenaires vérifiés</a> · <a href="/fr/forge/submit">Soumettre votre site</a></nav>${FOOTER.replace('href="/forge"', 'href="/forge/badge"')}`,
  },
  {
    route: "fr/forge/guidelines",
    en: "forge/guidelines",
    title: "Lignes directrices du réseau NOXEL FORGE — sites acceptés et refusés",
    description:
      "Les sites que NOXEL FORGE accepte et refuse : pas de contenu sexuel, de violence, de vente d'armes, de drogues, de jeux d'argent, de haine, d'arnaques ni de fermes de liens.",
    crumb: "Lignes directrices",
    body: `
        <h1>Lignes directrices du réseau NOXEL FORGE : sites acceptés et sites refusés</h1>
        <p>NOXEL FORGE relie de vrais sites utiles par des échanges de liens vérifiés. Pour que chaque lien échangé reste une recommandation qu'un membre peut défendre, certains types de sites sont refusés, quelle que soit leur niche. Alfred, le réviseur de NOXEL FORGE, applique ces lignes directrices à chaque soumission et explique sa décision.</p>
        <h2>Sites refusés</h2>
        <ul>
          <li>Contenu sexuel et nudité : pornographie, nudité, services sexuels, rencontres pour adultes, contenu suggestif.</li>
          <li>Violence : contenu violent ou choquant, gore, glorification de la violence ou du terrorisme.</li>
          <li>Armes : vente d'armes, de munitions, d'accessoires ou de pièces, fabrication d'armes ou d'explosifs.</li>
          <li>Drogues et substances : vente ou promotion de drogues illégales, de médicaments sans ordonnance ou de substances contrôlées.</li>
          <li>Jeux d'argent : casinos en ligne, paris et loteries.</li>
          <li>Haine et harcèlement : contenu qui vise des personnes pour leur origine, leur religion, leur sexe, leur orientation, un handicap ou tout autre trait.</li>
          <li>Arnaques : fraude, hameçonnage, promesses d'enrichissement rapide, ventes pyramidales, faux avis.</li>
          <li>Activités illégales : contrefaçons, piratage, logiciels malveillants, vente de données personnelles.</li>
          <li>Désinformation dangereuse : faux remèdes et fausses affirmations sur la santé ou la sécurité.</li>
          <li>Manipulation de liens : fermes de liens, réseaux privés de blogues, vente de liens, pages minces générées en masse, domaines parqués.</li>
        </ul>
        <p>Les activités légales et encadrées restent acceptées quand le site informe sans promouvoir ce qui est refusé, par exemple un club de tir sportif, une pourvoirie de chasse, un organisme de prévention en santé ou un site d'éducation sexuelle médicale.</p>
        <h2>Ce que le réseau recherche</h2>
        <p>Un vrai site avec un propriétaire identifiable et un domaine prouvé, des pages utiles pour un lecteur de la niche avec du contenu original, et des promesses honnêtes, sans résultats garantis ni chiffres inventés.</p>
        <h2>Quand une règle n'est pas respectée</h2>
        <p>La soumission est refusée et Alfred en donne la raison. Un site qui enfreint clairement ou à répétition les lignes directrices est retiré du répertoire, ses échanges sont fermés et son domaine peut être bloqué.</p>
        <nav><a href="/fr/forge">Accueil NOXEL FORGE</a> · <a href="/fr/forge/submit">Soumettre votre site</a> · <a href="/fr/forge/partners">Partenaires vérifiés</a> · <a href="/fr/forge/pricing">Forfaits</a></nav>${FOOTER.replace('href="/forge"', 'href="/forge/guidelines"')}`,
  },
];
