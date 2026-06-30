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

const cs: ForgeTranslations = {
  nav: {
    submit: "Odeslat",
    dashboard: "Přehled",
    pricing: "Ceník",
    badges: "Odznaky"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosystém výměny zpětných odkazů",
    title: "Vybudujte svou",
    titleAccent: "autoritu",
    subtitle: "Vyměňujte zpětné odkazy s ověřenými weby filtrovanými Alfredem. Kvalita zaručena, spam nemožný. Dáš jeden, dostaneš jeden.",
    ctaSubmit: "Přidat můj web",
    ctaDashboard: "Můj přehled"
  },
  stats: {
    forgePoints: "Forge Body",
    forgePointsDesc: "Získávejte body za každou výměnu",
    giveOne: "Dáš jeden, dostaneš jeden",
    giveOneDesc: "Poskytneš zpětný odkaz a dostaneš jeden zpět",
    alfredFilters: "Filtry Alfred",
    alfredFiltersDesc: "Nulový spam, žádný generický obsah"
  },
  trust: {
    kicker: "Skóre důvěryhodnosti Forge",
    subtitle: "Každý web obdrží skóre ze 100 bodů na základě 6 signálů kvality"
  },
  directory: {
    kicker: "Adresář",
    title: "Ověřené weby Forge",
    empty: "Adresář je zatím prázdný",
    emptyDesc: "Buďte první, kdo přidá svůj web.",
    loading: "Načítání adresáře...",
    previous: "Předchozí",
    next: "Další"
  },
  submit: {
    alfredTitle: "Alfred kontroluje každé podání",
    alfredDesc: "Každé podání je před zveřejněním prohledáno a zkontrolováno Alfredem. Kvalita zaručena, spam nemožný.",
    urlLabel: "URL webu",
    urlHint: "Vyžadováno HTTPS. Musí obsahovat odkaz na noxelseo.com nebo noxelforge.com",
    titleLabel: "Název",
    nicheLabel: "Nika",
    descLabel: "Krátký popis",
    contentLabel: "Hlavní obsah",
    contentHint: "volitelné, pomáhá Alfredovi lépe analyzovat",
    submitBtn: "Odeslat do NOXEL Forge",
    analyzing: "Analyzování..."
  },
  pricing: {
    kicker: "Ceník NOXEL Forge",
    title: "Budujte svou",
    titleAccent: "síť autority",
    subtitle: "Zobrazte odznak NOXEL na svém webu a odemkněte exkluzivní slevy na každé úrovni.",
    monthly: "Měsíčně",
    annual: "Ročně",
    badgeToggle: "Zobrazuji odznak NOXEL, odemknout slevu",
    badgeApplied: "Sleva za odznak uplatněna",
    mostPopular: "Nejoblíbenější",
    perMonth: "/měs",
    getStarted: "Začít zdarma",
    badgeInfoTitle: "Jak odemknout slevy za odznak",
    badgeInfoDesc: "Zobrazte libovolný odznak v patičce svého webu. Alfred skenuje vaši patičku při každém odeslání."
  },
  badge: {
    kicker: "Zobrazte na svém webu",
    title: "NOXEL Forge",
    titleAccent: "Odznaky",
    subtitle: "Zkopírujte a vložte libovolný odznak do patičky svého webu.",
    copy: "Kopírovat kód",
    copied: "Zkopírováno!",
    infoTitle: "Jak fungují slevy za odznak",
    infoDesc: "Umístěte libovolný odznak do patičky svého webu na celém webu. Alfred skenuje vaši patičku při každém odeslání. Stříbrný 10 %, Zlatý 15 %, Platinový 20 %, Diamantový 25 %."
  },
  cta: {
    kicker: "Připraveni kovat?",
    title: "Připojte se k NOXEL Forge",
    subtitle: "Začněte budovat svou ověřenou síť zpětných odkazů ještě dnes."
  }
};

const vi: ForgeTranslations = {
  nav: {
    submit: "Gửi bài",
    dashboard: "Bảng điều khiển",
    pricing: "Bảng giá",
    badges: "Huy hiệu"
  },
  hero: {
    kicker: "NOXEL Forge - Hệ sinh thái trao đổi backlink",
    title: "Xây dựng",
    titleAccent: "uy tín",
    subtitle: "Trao đổi backlink với các trang web đã được xác minh và lọc bởi Alfred. Chất lượng được đảm bảo, không thể có spam. Cho một, nhận một.",
    ctaSubmit: "Gửi trang web của tôi",
    ctaDashboard: "Bảng điều khiển của tôi"
  },
  stats: {
    forgePoints: "Điểm Forge",
    forgePointsDesc: "Kiếm điểm với mỗi lần trao đổi",
    giveOne: "Cho một, nhận một",
    giveOneDesc: "Bạn cho một backlink, bạn nhận lại một backlink",
    alfredFilters: "Bộ lọc Alfred",
    alfredFiltersDesc: "Không spam, không nội dung chung chung"
  },
  trust: {
    kicker: "Điểm Tin Cậy Forge",
    subtitle: "Mỗi trang web nhận được điểm trên 100 dựa trên 6 tín hiệu chất lượng"
  },
  directory: {
    kicker: "Thư mục",
    title: "Các trang Forge đã được xác minh",
    empty: "Thư mục hiện đang trống",
    emptyDesc: "Hãy là người đầu tiên gửi trang web của bạn.",
    loading: "Đang tải thư mục...",
    previous: "Trước",
    next: "Tiếp theo"
  },
  submit: {
    alfredTitle: "Alfred xem xét mọi bài gửi",
    alfredDesc: "Mọi bài gửi đều được Alfred quét và xem xét trước khi đăng. Chất lượng được đảm bảo, không thể có spam.",
    urlLabel: "URL trang web",
    urlHint: "Yêu cầu HTTPS. Phải chứa liên kết đến noxelseo.com hoặc noxelforge.com",
    titleLabel: "Tiêu đề",
    nicheLabel: "Lĩnh vực",
    descLabel: "Mô tả ngắn",
    contentLabel: "Nội dung chính",
    contentHint: "tùy chọn, giúp Alfred phân tích tốt hơn",
    submitBtn: "Gửi đến NOXEL Forge",
    analyzing: "Đang phân tích..."
  },
  pricing: {
    kicker: "Bảng giá NOXEL Forge",
    title: "Xây dựng",
    titleAccent: "mạng lưới uy tín",
    subtitle: "Hiển thị huy hiệu NOXEL trên trang web của bạn và mở khóa giảm giá độc quyền cho mọi gói.",
    monthly: "Hàng tháng",
    annual: "Hàng năm",
    badgeToggle: "Tôi hiển thị huy hiệu NOXEL, mở khóa giảm giá",
    badgeApplied: "Đã áp dụng giảm giá huy hiệu",
    mostPopular: "Phổ biến nhất",
    perMonth: "/tháng",
    getStarted: "Bắt đầu miễn phí",
    badgeInfoTitle: "Cách mở khóa giảm giá huy hiệu",
    badgeInfoDesc: "Hiển thị bất kỳ huy hiệu nào ở chân trang web của bạn. Alfred quét chân trang của bạn trong mỗi lần gửi bài."
  },
  badge: {
    kicker: "Hiển thị trên trang web của bạn",
    title: "NOXEL Forge",
    titleAccent: "Huy hiệu",
    subtitle: "Sao chép và dán bất kỳ huy hiệu nào vào chân trang web của bạn.",
    copy: "Sao chép đoạn mã",
    copied: "Đã sao chép!",
    infoTitle: "Cách giảm giá huy hiệu hoạt động",
    infoDesc: "Đặt bất kỳ huy hiệu nào ở chân trang web của bạn, trên toàn bộ trang. Alfred quét chân trang của bạn trong mỗi lần gửi bài. Bạc 10%, Vàng 15%, Bạch kim 20%, Kim cương 25%."
  },
  cta: {
    kicker: "Sẵn sàng để forge?",
    title: "Tham gia NOXEL Forge",
    subtitle: "Bắt đầu xây dựng mạng lưới backlink đã xác minh của bạn ngay hôm nay."
  }
};

const af: ForgeTranslations = {
  nav: {
    submit: "Indien",
    dashboard: "Kontroleskerm",
    pricing: "Pryse",
    badges: "Kentekens"
  },
  hero: {
    kicker: "NOXEL Forge - Terugskakels Uitruilekosisteem",
    title: "Smee jou",
    titleAccent: "gesag",
    subtitle: "Ruil terugskakels uit met geverifieerde werwe gefilterde deur Alfred. Kwaliteit gewaarborg, strooipos onmoontlik. Gee een, kry een.",
    ctaSubmit: "Indien my werf",
    ctaDashboard: "My Kontroleskerm"
  },
  stats: {
    forgePoints: "Smee Punte",
    forgePointsDesc: "Verdien punte by elke uitruil",
    giveOne: "Gee een, kry een",
    giveOneDesc: "Jy gee 'n terugskakels, jy kry een terug",
    alfredFilters: "Alfred filters",
    alfredFiltersDesc: "Nul strooipos, nul generiese inhoud"
  },
  trust: {
    kicker: "Vertrouspunt Smee",
    subtitle: "Elke werf ontvang 'n telling uit 100 gebaseer op 6 kwaliteitseine"
  },
  directory: {
    kicker: "Gids",
    title: "Geverifieerde Smee Werwe",
    empty: "Die gids is tans leeg",
    emptyDesc: "Wees die eerste om jou werf in te dien.",
    loading: "Gids word gelaai...",
    previous: "Vorige",
    next: "Volgende"
  },
  submit: {
    alfredTitle: "Alfred hersien elke indiening",
    alfredDesc: "Elke indiening word deur Alfred geskandeer en hersien voor publikasie. Kwaliteit gewaarborg, strooipos onmoontlik.",
    urlLabel: "Werf URL",
    urlHint: "HTTPS vereis. Moet 'n skakel na noxelseo.com of noxelforge.com bevat",
    titleLabel: "Titel",
    nicheLabel: "Nismark",
    descLabel: "Kort beskrywing",
    contentLabel: "Hoofinhoud",
    contentHint: "opsioneel, help Alfred beter analiseer",
    submitBtn: "Indien by NOXEL Forge",
    analyzing: "Besig om te analiseer..."
  },
  pricing: {
    kicker: "NOXEL Forge Pryse",
    title: "Bou jou",
    titleAccent: "gesagsnetwerk",
    subtitle: "Vertoon die NOXEL kenteken op jou werf en ontsluit eksklusiewe kortings op elke vlak.",
    monthly: "Maandeliks",
    annual: "Jaarliks",
    badgeToggle: "Ek vertoon die NOXEL kenteken, ontsluit korting",
    badgeApplied: "Kenteken korting toegepas",
    mostPopular: "Mees gewild",
    perMonth: "/md",
    getStarted: "Begin gratis",
    badgeInfoTitle: "Hoe om kenteken kortings te ontsluit",
    badgeInfoDesc: "Vertoon enige kenteken in die voetskrif van jou werf. Alfred skandeer jou voetskrif by elke indiening."
  },
  badge: {
    kicker: "Vertoon op jou werf",
    title: "NOXEL Forge",
    titleAccent: "Kentekens",
    subtitle: "Kopieer en plak enige kenteken in jou werf se voetskrif.",
    copy: "Kopieer kode",
    copied: "Gekopieer!",
    infoTitle: "Hoe kenteken kortings werk",
    infoDesc: "Plaas enige kenteken in die voetskrif van jou werf, werf-wyd. Alfred skandeer jou voetskrif by elke indiening. Silwer 10%, Goud 15%, Platinum 20%, Diamant 25%."
  },
  cta: {
    kicker: "Gereed om te smee?",
    title: "Sluit aan by NOXEL Forge",
    subtitle: "Begin vandag met die bou van jou geverifieerde terugskakelsnetwerk."
  }
};

const sl: ForgeTranslations = {
  nav: {
    submit: "Oddaj",
    dashboard: "Nadzorna plošča",
    pricing: "Cenik",
    badges: "Značke"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistem izmenjave povratnih povezav",
    title: "Skujte svojo",
    titleAccent: "avtoriteto",
    subtitle: "Izmenjajte povratne povezave s preverjenimi spletišči, ki jih filtrira Alfred. Kakovost zagotovljena, neželena vsebina nemogoča. Daj eno, prejmi eno.",
    ctaSubmit: "Oddaj moje spletišče",
    ctaDashboard: "Moja nadzorna plošča"
  },
  stats: {
    forgePoints: "Forge točke",
    forgePointsDesc: "Zaslužite točke pri vsaki izmenjavi",
    giveOne: "Daj eno, prejmi eno",
    giveOneDesc: "Daste povratno povezavo, dobite eno nazaj",
    alfredFilters: "Alfredovi filtri",
    alfredFiltersDesc: "Nič neželene vsebine, nič splošnih vsebin"
  },
  trust: {
    kicker: "Zaupnostna ocena Forge",
    subtitle: "Vsako spletišče prejme oceno do 100 na podlagi 6 kakovostnih signalov"
  },
  directory: {
    kicker: "Imenik",
    title: "Preverjena spletišča Forge",
    empty: "Imenik je zaenkrat prazen",
    emptyDesc: "Bodite prvi, ki oddate svoje spletišče.",
    loading: "Nalaganje imenika...",
    previous: "Prejšnja",
    next: "Naslednja"
  },
  submit: {
    alfredTitle: "Alfred pregleda vsako oddajo",
    alfredDesc: "Vsako oddajo Alfred pregleda in skenira pred objavo. Kakovost zagotovljena, neželena vsebina nemogoča.",
    urlLabel: "URL spletišča",
    urlHint: "Zahtevano HTTPS. Mora vsebovati povezavo do noxelseo.com ali noxelforge.com",
    titleLabel: "Naslov",
    nicheLabel: "Niša",
    descLabel: "Kratek opis",
    contentLabel: "Glavna vsebina",
    contentHint: "neobvezno, pomaga Alfredu pri boljši analizi",
    submitBtn: "Oddaj v NOXEL Forge",
    analyzing: "Analiziranje..."
  },
  pricing: {
    kicker: "Cenik NOXEL Forge",
    title: "Zgradite svojo",
    titleAccent: "avtoritetno mrežo",
    subtitle: "Prikažite značko NOXEL na svojem spletišču in odklenite ekskluzivne popuste pri vsakem paketu.",
    monthly: "Mesečno",
    annual: "Letno",
    badgeToggle: "Prikazujem značko NOXEL, odkleni popust",
    badgeApplied: "Popust za značko je bil uveljavljen",
    mostPopular: "Najbolj priljubljen",
    perMonth: "/mes",
    getStarted: "Začnite brezplačno",
    badgeInfoTitle: "Kako odkleniti popuste za značke",
    badgeInfoDesc: "Prikažite katero koli značko v nogi svojega spletišča. Alfred skenira vašo nogo pri vsaki oddaji."
  },
  badge: {
    kicker: "Prikažite na svojem spletišču",
    title: "NOXEL Forge",
    titleAccent: "Značke",
    subtitle: "Kopirajte in prilepite katero koli značko v nogo svojega spletišča.",
    copy: "Kopiraj kodo",
    copied: "Kopirano!",
    infoTitle: "Kako delujejo popusti za značke",
    infoDesc: "Postavite katero koli značko v nogo svojega spletišča, na vseh straneh. Alfred skenira vašo nogo pri vsaki oddaji. Srebrna 10 %, zlata 15 %, platinasta 20 %, diamantna 25 %."
  },
  cta: {
    kicker: "Pripravljeni na kovanje?",
    title: "Pridružite se NOXEL Forge",
    subtitle: "Začnite graditi svojo prevereno mrežo povratnih povezav še danes."
  }
};

const fo: ForgeTranslations = {
  nav: {
    submit: "Send inn",
    dashboard: "Stýriborð",
    pricing: "Prísir",
    badges: "Merkir"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Skiftisfelag",
    title: "Smíð tína",
    titleAccent: "myndugleika",
    subtitle: "Skift backlinks við staðfest síður sívaðar av Alfred. Góðsku tryggað, spam ómøguligt. Gev ein, fá ein.",
    ctaSubmit: "Send inn mínar síðu",
    ctaDashboard: "Mitt stýriborð"
  },
  stats: {
    forgePoints: "Forge Stig",
    forgePointsDesc: "Vel stig á hvørjum skifti",
    giveOne: "Gev ein, fá ein",
    giveOneDesc: "Tú gevur ein backlink, tú fært ein aftur",
    alfredFilters: "Alfred sívar",
    alfredFiltersDesc: "Einki spam, einki vanligt innihald"
  },
  trust: {
    kicker: "Tiltrúarstig Forge",
    subtitle: "Hver síða fær eitt stig upp til 100 grundað á 6 gæðamerki"
  },
  directory: {
    kicker: "Skráseting",
    title: "Staðfest Forge Síður",
    empty: "Skrásetingin er tóm um nú",
    emptyDesc: "Ver tann fyrsti at senda inn tína síðu.",
    loading: "Leður skráseting...",
    previous: "Fyrra",
    next: "Næsta"
  },
  submit: {
    alfredTitle: "Alfred yvirkíkir hvørja innsenning",
    alfredDesc: "Hvør innsenning verður skannað og yvirkíkt av Alfred áðrenn birting. Góðsku tryggað, spam ómøguligt.",
    urlLabel: "Síðu URL",
    urlHint: "HTTPS kravt. Má innihalda ein leinkju til noxelseo.com ella noxelforge.com",
    titleLabel: "Heiti",
    nicheLabel: "Fólk",
    descLabel: "Stuttur lýsing",
    contentLabel: "Høvuðsinnihald",
    contentHint: "valfrítt, hjálpir Alfred at greina betur",
    submitBtn: "Send inn til NOXEL Forge",
    analyzing: "Greinir..."
  },
  pricing: {
    kicker: "NOXEL Forge Prísir",
    title: "Bygg títt",
    titleAccent: "myndugleikanet",
    subtitle: "Vís NOXEL merkið á tínari síðu og opna einastu avslætt á hvørjum stigi.",
    monthly: "Mánaðarliga",
    annual: "Árliga",
    badgeToggle: "Eg vís NOXEL merkið, opna avslætt",
    badgeApplied: "Merki avslætt brúkt",
    mostPopular: "Mest vinsælt",
    perMonth: "/mán",
    getStarted: "Byrja ókeypis",
    badgeInfoTitle: "Hvussu opnar tú merki avslætt",
    badgeInfoDesc: "Vís eitt hvørt sem er merki í botnfætinum á tínari síðu. Alfred skannur tín botnfót á hvørjari innsenning."
  },
  badge: {
    kicker: "Vís á tínari síðu",
    title: "NOXEL Forge",
    titleAccent: "Merkir",
    subtitle: "Kopíer og límur eitt hvørt sem er merki í botnfót á tínari síðu.",
    copy: "Kopíer brot",
    copied: "Kopíert!",
    infoTitle: "Hvussu merki avslætt virkar",
    infoDesc: "Set eitt hvørt sem er merki í botnfótinum á tínari síðu, um alla síðuna. Alfred skannur tín botnfót á hvørjari innsenning. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Tíðugur at smíða?",
    title: "Sluttaðu til NOXEL Forge",
    subtitle: "Byrja at byggja títt staðfesta backlink net í dag."
  }
};

const lb: ForgeTranslations = {
  nav: {
    submit: "Abschécken",
    dashboard: "Dashboard",
    pricing: "Präisser",
    badges: "Badges"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Exchange Ökosystem",
    title: "Schmied deng",
    titleAccent: "Autoritéit",
    subtitle: "Tausch Backlinks mat verifiéierte Siten, gefiltert vun Alfred. Qualitéit garantéiert, Spam onméiglech. Gëff een, kriss een.",
    ctaSubmit: "Meng Säit abschécken",
    ctaDashboard: "Mäin Dashboard"
  },
  stats: {
    forgePoints: "Forge Punkten",
    forgePointsDesc: "Verdéng Punkten bei all Austausch",
    giveOne: "Gëff een, kriss een",
    giveOneDesc: "Du gëss e Backlink, du kriss een zréck",
    alfredFilters: "Alfred filtert",
    alfredFiltersDesc: "Null Spam, null generesche Inhalt"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "All Säit kritt eng Bewäertung aus 100 baséiert op 6 Qualitéitssignaler"
  },
  directory: {
    kicker: "Verzeichnis",
    title: "Verifiéiert Forge Säiten",
    empty: "D'Verzeichnis ass fir de Moment eidel",
    emptyDesc: "Sidd déi éischt, déi är Säit abschécken.",
    loading: "Verzeichnis gëtt gelueden...",
    previous: "Viregt",
    next: "Nächst"
  },
  submit: {
    alfredTitle: "Alfred iwwerpréift all Aschreiwung",
    alfredDesc: "All Aschreiwung gëtt vun Alfred gescannt an iwwerpréift ier se publizéiert gëtt. Qualitéit garantéiert, Spam onméiglech.",
    urlLabel: "Säiten-URL",
    urlHint: "HTTPS erfuerderlech. Muss e Link zu noxelseo.com oder noxelforge.com enthalen",
    titleLabel: "Titel",
    nicheLabel: "Nische",
    descLabel: "Kuerz Beschreiwung",
    contentLabel: "Haaptinhalt",
    contentHint: "fakultativ, hëlleft Alfred besser z'analyséieren",
    submitBtn: "Bei NOXEL Forge abschécken",
    analyzing: "Gëtt analyséiert..."
  },
  pricing: {
    kicker: "NOXEL Forge Präisser",
    title: "Bau däin",
    titleAccent: "Autoritéitsnetzwierk",
    subtitle: "Weist de NOXEL Badge op denger Säit an entspär exklusiv Remisen op all Niveau.",
    monthly: "Méindlech",
    annual: "Jährlech",
    badgeToggle: "Ech weisen de NOXEL Badge, Remise entspären",
    badgeApplied: "Badge-Remise applizéiert",
    mostPopular: "Am populärsten",
    perMonth: "/Mo",
    getStarted: "Gratis ufänken",
    badgeInfoTitle: "Wéi Dir Badge-Remisen entspärt",
    badgeInfoDesc: "Weist e Badge am Footer vun ärer Säit. Alfred scannt äre Footer bei all Aschreiwung."
  },
  badge: {
    kicker: "Op ärer Säit affichéieren",
    title: "NOXEL Forge",
    titleAccent: "Badges",
    subtitle: "Kopéiert a klëmmt e Badge an de Footer vun ärer Säit.",
    copy: "Snippet kopéieren",
    copied: "Kopéiert!",
    infoTitle: "Wéi Badge-Remisen funktionéieren",
    infoDesc: "Plazéiert e Badge am Footer vun ärer Säit, säitwäit. Alfred scannt äre Footer bei all Aschreiwung. Sëlwer 10%, Gold 15%, Platin 20%, Diamant 25%."
  },
  cta: {
    kicker: "Prett fir ze schmidden?",
    title: "NOXEL Forge bäitrieden",
    subtitle: "Fänkt haut un, äre verifiéierten Backlink-Netzwierk opzebauen."
  }
};

const is: ForgeTranslations = {
  nav: {
    submit: "Senda inn",
    dashboard: "Stjórnborð",
    pricing: "Verðlag",
    badges: "Merki"
  },
  hero: {
    kicker: "NOXEL Forge - Vistkerfi fyrir baktenglaskipti",
    title: "Smíðaðu þína",
    titleAccent: "yfirvald",
    subtitle: "Skiptu baktenglar með staðfestum síðum síaðar af Alfred. Gæði tryggð, ruslpóstur ómögulegt. Gefðu einn, fáðu einn.",
    ctaSubmit: "Senda inn síðuna mína",
    ctaDashboard: "Mitt stjórnborð"
  },
  stats: {
    forgePoints: "Forge stig",
    forgePointsDesc: "Þjónaðu stigum við hvert skipti",
    giveOne: "Gefðu einn, fáðu einn",
    giveOneDesc: "Þú gefur baktengl, þú færð einn til baka",
    alfredFilters: "Alfred síar",
    alfredFiltersDesc: "Ekkert ruslpóstur, ekkert almennt efni"
  },
  trust: {
    kicker: "Traustskor Forge",
    subtitle: "Sérhver síða fær skor upp úr 100 byggt á 6 gæðamerkjum"
  },
  directory: {
    kicker: "Skráasafn",
    title: "Staðfestar Forge síður",
    empty: "Skráasafnið er tómt að svo stöddu",
    emptyDesc: "Vertu fyrstur til að senda inn síðuna þína.",
    loading: "Hleður skráasafni...",
    previous: "Fyrri",
    next: "Næsta"
  },
  submit: {
    alfredTitle: "Alfred fer yfir hverja innsendingu",
    alfredDesc: "Sérhver innsending er skönnuð og yfirfarin af Alfred fyrir birtingu. Gæði tryggð, ruslpóstur ómögulegt.",
    urlLabel: "Slóð síðu",
    urlHint: "HTTPS krafist. Verður að innihalda tengil á noxelseo.com eða noxelforge.com",
    titleLabel: "Titill",
    nicheLabel: "Sérhópur",
    descLabel: "Stutt lýsing",
    contentLabel: "Aðalefni",
    contentHint: "valkvætt, hjálpar Alfred að greina betur",
    submitBtn: "Senda inn á NOXEL Forge",
    analyzing: "Greinir..."
  },
  pricing: {
    kicker: "NOXEL Forge verðlag",
    title: "Byggðu þitt",
    titleAccent: "yfirvaldanet",
    subtitle: "Birtu NOXEL merkið á síðunni þinni og opnaðu einkaafslætti á hverju þrepi.",
    monthly: "Mánaðarlegt",
    annual: "Árlegt",
    badgeToggle: "Ég birti NOXEL merkið, opna afslátt",
    badgeApplied: "Merkjaafsláttur virkur",
    mostPopular: "Vinsælast",
    perMonth: "/mán",
    getStarted: "Byrjaðu ókeypis",
    badgeInfoTitle: "Hvernig á að opna merkjaafslætti",
    badgeInfoDesc: "Birtu eitthvert merki í fæti síðunnar þinnar. Alfred skannar fætinn þinn við hverja innsendingu."
  },
  badge: {
    kicker: "Birtu á síðunni þinni",
    title: "NOXEL Forge",
    titleAccent: "Merki",
    subtitle: "Afritaðu og límdu eitthvert merki í fæt síðunnar þinnar.",
    copy: "Afrita brot",
    copied: "Afritað!",
    infoTitle: "Hvernig merkjaafslættir virka",
    infoDesc: "Settu eitthvert merki í fæt síðunnar þinnar, yfir alla síðuna. Alfred skannar fætinn þinn við hverja innsendingu. Silfur 10%, Gull 15%, Platína 20%, Demantur 25%."
  },
  cta: {
    kicker: "Tilbúinn til að smíða?",
    title: "Gangstu til liðs við NOXEL Forge",
    subtitle: "Byrjaðu að byggja staðfesta baktenglakerfið þitt í dag."
  }
};

const th: ForgeTranslations = {
  nav: {
    submit: "ส่งเว็บไซต์",
    dashboard: "แดชบอร์ด",
    pricing: "ราคา",
    badges: "แบดจ์"
  },
  hero: {
    kicker: "NOXEL Forge - ระบบนิเวศแลกเปลี่ยนแบ็คลิงก์",
    title: "สร้าง",
    titleAccent: "อำนาจของคุณ",
    subtitle: "แลกเปลี่ยนแบ็คลิงก์กับเว็บไซต์ที่ได้รับการยืนยันและกรองโดย Alfred รับประกันคุณภาพ ป้องกันสแปมได้อย่างสมบูรณ์ ให้หนึ่ง รับหนึ่ง",
    ctaSubmit: "ส่งเว็บไซต์ของฉัน",
    ctaDashboard: "แดชบอร์ดของฉัน"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "รับคะแนนจากการแลกเปลี่ยนทุกครั้ง",
    giveOne: "ให้หนึ่ง รับหนึ่ง",
    giveOneDesc: "คุณให้แบ็คลิงก์หนึ่งอัน คุณก็ได้รับกลับหนึ่งอัน",
    alfredFilters: "Alfred กรองให้",
    alfredFiltersDesc: "ไม่มีสแปม ไม่มีเนื้อหาทั่วไป"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "ทุกเว็บไซต์จะได้รับคะแนนจาก 100 คะแนน โดยอิงจากสัญญาณคุณภาพ 6 ประการ"
  },
  directory: {
    kicker: "ไดเรกทอรี",
    title: "เว็บไซต์ Forge ที่ได้รับการยืนยัน",
    empty: "ไดเรกทอรียังว่างเปล่าในขณะนี้",
    emptyDesc: "เป็นคนแรกที่ส่งเว็บไซต์ของคุณ",
    loading: "กำลังโหลดไดเรกทอรี...",
    previous: "ก่อนหน้า",
    next: "ถัดไป"
  },
  submit: {
    alfredTitle: "Alfred ตรวจสอบทุกการส่ง",
    alfredDesc: "ทุกการส่งจะถูกสแกนและตรวจสอบโดย Alfred ก่อนเผยแพร่ รับประกันคุณภาพ ป้องกันสแปมได้อย่างสมบูรณ์",
    urlLabel: "URL เว็บไซต์",
    urlHint: "ต้องใช้ HTTPS และต้องมีลิงก์ไปยัง noxelseo.com หรือ noxelforge.com",
    titleLabel: "ชื่อเรื่อง",
    nicheLabel: "หมวดหมู่",
    descLabel: "คำอธิบายสั้น",
    contentLabel: "เนื้อหาหลัก",
    contentHint: "ไม่บังคับ ช่วยให้ Alfred วิเคราะห์ได้ดีขึ้น",
    submitBtn: "ส่งไปยัง NOXEL Forge",
    analyzing: "กำลังวิเคราะห์..."
  },
  pricing: {
    kicker: "ราคา NOXEL Forge",
    title: "สร้าง",
    titleAccent: "เครือข่ายอำนาจของคุณ",
    subtitle: "แสดงแบดจ์ NOXEL บนเว็บไซต์ของคุณและรับส่วนลดพิเศษในทุกระดับ",
    monthly: "รายเดือน",
    annual: "รายปี",
    badgeToggle: "ฉันแสดงแบดจ์ NOXEL เพื่อรับส่วนลด",
    badgeApplied: "ส่วนลดแบดจ์ถูกนำไปใช้แล้ว",
    mostPopular: "ยอดนิยมที่สุด",
    perMonth: "/เดือน",
    getStarted: "เริ่มต้นฟรี",
    badgeInfoTitle: "วิธีรับส่วนลดจากแบดจ์",
    badgeInfoDesc: "แสดงแบดจ์ใดก็ได้ในส่วนท้ายของเว็บไซต์คุณ Alfred จะสแกนส่วนท้ายของคุณในทุกการส่ง"
  },
  badge: {
    kicker: "แสดงบนเว็บไซต์ของคุณ",
    title: "NOXEL Forge",
    titleAccent: "แบดจ์",
    subtitle: "คัดลอกและวางแบดจ์ใดก็ได้ในส่วนท้ายเว็บไซต์ของคุณ",
    copy: "คัดลอกโค้ด",
    copied: "คัดลอกแล้ว!",
    infoTitle: "วิธีที่ส่วนลดแบดจ์ทำงาน",
    infoDesc: "วางแบดจ์ใดก็ได้ในส่วนท้ายของเว็บไซต์คุณทั่วทั้งไซต์ Alfred จะสแกนส่วนท้ายของคุณในทุกการส่ง Silver 10%, Gold 15%, Platinum 20%, Diamond 25%"
  },
  cta: {
    kicker: "พร้อมที่จะสร้างแล้วหรือยัง?",
    title: "เข้าร่วม NOXEL Forge",
    subtitle: "เริ่มสร้างเครือข่ายแบ็คลิงก์ที่ได้รับการยืนยันของคุณวันนี้"
  }
};

const mt: ForgeTranslations = {
  nav: {
    submit: "Ibgħat",
    dashboard: "Dashboard",
    pricing: "Prezzijiet",
    badges: "Badges"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistema ta' Skambju ta' Backlinks",
    title: "Forġa l-",
    titleAccent: "awtorità",
    subtitle: "Skambbja backlinks ma' siti verifikati ffiltrati minn Alfred. Kwalità garantita, spam impossibbli. Agħti wieħed, ħu wieħed.",
    ctaSubmit: "Ibgħat is-sit tiegħi",
    ctaDashboard: "Id-Dashboard tiegħi"
  },
  stats: {
    forgePoints: "Punti Forge",
    forgePointsDesc: "Aqla' punti fuq kull skambju",
    giveOne: "Agħti wieħed, ħu wieħed",
    giveOneDesc: "Tagħti backlink, tirċievi wieħed lura",
    alfredFilters: "Filtri ta' Alfred",
    alfredFiltersDesc: "Żero spam, żero kontenut ġeneriku"
  },
  trust: {
    kicker: "Forge tal-Puntegġ ta' Fiduċja",
    subtitle: "Kull sit jirċievi puntegġ minn 100 ibbażat fuq 6 sinjali ta' kwalità"
  },
  directory: {
    kicker: "Direttorju",
    title: "Siti Forge Verifikati",
    empty: "Id-direttorju huwa vojt għalissa",
    emptyDesc: "Kun l-ewwel wieħed li tibgħat is-sit tiegħek.",
    loading: "Qed jitgħabba d-direttorju...",
    previous: "Preċedenti",
    next: "Li jmiss"
  },
  submit: {
    alfredTitle: "Alfred jirrevedi kull sottomissjoni",
    alfredDesc: "Kull sottomissjoni tiġi skannjata u riveduta minn Alfred qabel il-pubblikazzjoni. Kwalità garantita, spam impossibbli.",
    urlLabel: "URL tas-Sit",
    urlHint: "HTTPS meħtieġ. Irid ikun fih link għal noxelseo.com jew noxelforge.com",
    titleLabel: "Titolu",
    nicheLabel: "Niċċa",
    descLabel: "Deskrizzjoni qasira",
    contentLabel: "Kontenut ewlieni",
    contentHint: "fakultattiv, jgħin lil Alfred janaliżża aħjar",
    submitBtn: "Ibgħat lil NOXEL Forge",
    analyzing: "Qed janalizza..."
  },
  pricing: {
    kicker: "Prezzijiet ta' NOXEL Forge",
    title: "Ibni n-",
    titleAccent: "netwerk ta' awtorità tiegħek",
    subtitle: "Uri l-badge ta' NOXEL fuq is-sit tiegħek u sib skontijiet esklużivi fuq kull livell.",
    monthly: "Kull xahar",
    annual: "Annwali",
    badgeToggle: "Qed nurі l-badge ta' NOXEL, iflaħ l-iskont",
    badgeApplied: "Skont tal-badge applikat",
    mostPopular: "L-aktar popolari",
    perMonth: "/xahar",
    getStarted: "Ibda b'xejn",
    badgeInfoTitle: "Kif tiflaħ l-iskontijiet tal-badge",
    badgeInfoDesc: "Uri kwalunkwe badge fil-footer tas-sit tiegħek. Alfred jiskanerja l-footer tiegħek fuq kull sottomissjoni."
  },
  badge: {
    kicker: "Uri fuq is-sit tiegħek",
    title: "NOXEL Forge",
    titleAccent: "Badges",
    subtitle: "Ikkopja u waħħal kwalunkwe badge fil-footer tas-sit tiegħek.",
    copy: "Ikkopja s-snippet",
    copied: "Ikkopjat!",
    infoTitle: "Kif jaħdmu l-iskontijiet tal-badge",
    infoDesc: "Poġġi kwalunkwe badge fil-footer tas-sit tiegħek, fuq il-faqfaq kollu. Alfred jiskanerja l-footer tiegħek fuq kull sottomissjoni. Fidda 10%, Deheb 15%, Platinu 20%, Djamant 25%."
  },
  cta: {
    kicker: "Lest biex tibda tforġa?",
    title: "Ingħaqad ma' NOXEL Forge",
    subtitle: "Ibda tibni n-netwerk tiegħek ta' backlinks verifikati llum."
  }
};

const da: ForgeTranslations = {
  nav: {
    submit: "Indsend",
    dashboard: "Dashboard",
    pricing: "Priser",
    badges: "Badges"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Exchange Ecosystem",
    title: "Smedj din",
    titleAccent: "autoritet",
    subtitle: "Udveksl backlinks med verificerede sider filtreret af Alfred. Kvalitet garanteret, spam umuligt. Giv én, få én.",
    ctaSubmit: "Indsend mit websted",
    ctaDashboard: "Mit Dashboard"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Optjen point ved hver udveksling",
    giveOne: "Giv én, få én",
    giveOneDesc: "Du giver et backlink, du får et tilbage",
    alfredFilters: "Alfred filtrerer",
    alfredFiltersDesc: "Nul spam, nul generisk indhold"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Hvert websted modtager en score ud af 100 baseret på 6 kvalitetssignaler"
  },
  directory: {
    kicker: "Katalog",
    title: "Verificerede Forge-websteder",
    empty: "Kataloget er tomt for nu",
    emptyDesc: "Vær den første til at indsende dit websted.",
    loading: "Indlæser katalog...",
    previous: "Forrige",
    next: "Næste"
  },
  submit: {
    alfredTitle: "Alfred gennemgår hvert indsendt",
    alfredDesc: "Hvert indsendt websted scannes og gennemgås af Alfred inden offentliggørelse. Kvalitet garanteret, spam umuligt.",
    urlLabel: "Webstedets URL",
    urlHint: "HTTPS påkrævet. Skal indeholde et link til noxelseo.com eller noxelforge.com",
    titleLabel: "Titel",
    nicheLabel: "Niche",
    descLabel: "Kort beskrivelse",
    contentLabel: "Hovedindhold",
    contentHint: "valgfrit, hjælper Alfred med at analysere bedre",
    submitBtn: "Indsend til NOXEL Forge",
    analyzing: "Analyserer..."
  },
  pricing: {
    kicker: "NOXEL Forge Priser",
    title: "Byg dit",
    titleAccent: "autoritetsnetværk",
    subtitle: "Vis NOXEL-badgen på dit websted og lås eksklusive rabatter op på hvert niveau.",
    monthly: "Månedligt",
    annual: "Årligt",
    badgeToggle: "Jeg viser NOXEL-badgen, lås rabat op",
    badgeApplied: "Badge-rabat anvendt",
    mostPopular: "Mest populær",
    perMonth: "/md",
    getStarted: "Kom gratis i gang",
    badgeInfoTitle: "Sådan låser du badge-rabatter op",
    badgeInfoDesc: "Vis en hvilken som helst badge i din webstedssidefod. Alfred scanner din sidefod ved hvert indsendt."
  },
  badge: {
    kicker: "Vis på dit websted",
    title: "NOXEL Forge",
    titleAccent: "Badges",
    subtitle: "Kopiér og indsæt en hvilken som helst badge i din webstedssidefod.",
    copy: "Kopiér kode",
    copied: "Kopieret!",
    infoTitle: "Sådan fungerer badge-rabatter",
    infoDesc: "Placer en hvilken som helst badge i sidefoden på dit websted, på hele sitet. Alfred scanner din sidefod ved hvert indsendt. Sølv 10%, Guld 15%, Platin 20%, Diamant 25%."
  },
  cta: {
    kicker: "Klar til at smede?",
    title: "Tilmeld dig NOXEL Forge",
    subtitle: "Begynd at opbygge dit verificerede backlinknetværk i dag."
  }
};

const it: ForgeTranslations = {
  nav: {
    submit: "Invia",
    dashboard: "Dashboard",
    pricing: "Prezzi",
    badges: "Badge"
  },
  hero: {
    kicker: "NOXEL Forge - Ecosistema di Scambio Backlink",
    title: "Forgia la tua",
    titleAccent: "autorità",
    subtitle: "Scambia backlink con siti verificati filtrati da Alfred. Qualità garantita, spam impossibile. Dai uno, ricevi uno.",
    ctaSubmit: "Invia il mio sito",
    ctaDashboard: "Il mio Dashboard"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Guadagna punti ad ogni scambio",
    giveOne: "Dai uno, ricevi uno",
    giveOneDesc: "Dai un backlink, ne ricevi uno in cambio",
    alfredFilters: "Filtri di Alfred",
    alfredFiltersDesc: "Zero spam, zero contenuti generici"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Ogni sito riceve un punteggio su 100 basato su 6 segnali di qualità"
  },
  directory: {
    kicker: "Directory",
    title: "Siti Forge Verificati",
    empty: "La directory è vuota per ora",
    emptyDesc: "Sii il primo a inviare il tuo sito.",
    loading: "Caricamento directory...",
    previous: "Precedente",
    next: "Successivo"
  },
  submit: {
    alfredTitle: "Alfred esamina ogni invio",
    alfredDesc: "Ogni invio viene scansionato e revisionato da Alfred prima della pubblicazione. Qualità garantita, spam impossibile.",
    urlLabel: "URL del sito",
    urlHint: "HTTPS richiesto. Deve contenere un link a noxelseo.com o noxelforge.com",
    titleLabel: "Titolo",
    nicheLabel: "Nicchia",
    descLabel: "Breve descrizione",
    contentLabel: "Contenuto principale",
    contentHint: "facoltativo, aiuta Alfred ad analizzare meglio",
    submitBtn: "Invia a NOXEL Forge",
    analyzing: "Analisi in corso..."
  },
  pricing: {
    kicker: "Prezzi NOXEL Forge",
    title: "Costruisci la tua",
    titleAccent: "rete di autorità",
    subtitle: "Mostra il badge NOXEL sul tuo sito e sblocca sconti esclusivi su ogni piano.",
    monthly: "Mensile",
    annual: "Annuale",
    badgeToggle: "Mostro il badge NOXEL, sblocca lo sconto",
    badgeApplied: "Sconto badge applicato",
    mostPopular: "Più popolare",
    perMonth: "/mese",
    getStarted: "Inizia gratis",
    badgeInfoTitle: "Come sbloccare gli sconti badge",
    badgeInfoDesc: "Mostra qualsiasi badge nel footer del tuo sito. Alfred scansiona il tuo footer ad ogni invio."
  },
  badge: {
    kicker: "Mostra sul tuo sito",
    title: "NOXEL Forge",
    titleAccent: "Badge",
    subtitle: "Copia e incolla qualsiasi badge nel footer del tuo sito.",
    copy: "Copia snippet",
    copied: "Copiato!",
    infoTitle: "Come funzionano gli sconti badge",
    infoDesc: "Inserisci qualsiasi badge nel footer del tuo sito, su tutte le pagine. Alfred scansiona il tuo footer ad ogni invio. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Pronto a forgiare?",
    title: "Unisciti a NOXEL Forge",
    subtitle: "Inizia oggi a costruire la tua rete di backlink verificati."
  }
};

const de: ForgeTranslations = {
  nav: {
    submit: "Einreichen",
    dashboard: "Dashboard",
    pricing: "Preise",
    badges: "Abzeichen"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink-Austausch-Ökosystem",
    title: "Schmieden Sie Ihre",
    titleAccent: "Autorität",
    subtitle: "Tauschen Sie Backlinks mit verifizierten Seiten aus, die von Alfred gefiltert werden. Qualität garantiert, Spam unmöglich. Einen geben, einen erhalten.",
    ctaSubmit: "Meine Website einreichen",
    ctaDashboard: "Mein Dashboard"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Punkte bei jedem Austausch verdienen",
    giveOne: "Einen geben, einen erhalten",
    giveOneDesc: "Sie geben einen Backlink, Sie erhalten einen zurück",
    alfredFilters: "Alfred filtert",
    alfredFiltersDesc: "Kein Spam, keine generischen Inhalte"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Jede Website erhält eine Punktzahl von 100 basierend auf 6 Qualitätssignalen"
  },
  directory: {
    kicker: "Verzeichnis",
    title: "Verifizierte Forge-Seiten",
    empty: "Das Verzeichnis ist derzeit leer",
    emptyDesc: "Seien Sie der Erste, der seine Website einreicht.",
    loading: "Verzeichnis wird geladen...",
    previous: "Zurück",
    next: "Weiter"
  },
  submit: {
    alfredTitle: "Alfred prüft jede Einreichung",
    alfredDesc: "Jede Einreichung wird von Alfred gescannt und geprüft, bevor sie veröffentlicht wird. Qualität garantiert, Spam unmöglich.",
    urlLabel: "Website-URL",
    urlHint: "HTTPS erforderlich. Muss einen Link zu noxelseo.com oder noxelforge.com enthalten",
    titleLabel: "Titel",
    nicheLabel: "Nische",
    descLabel: "Kurzbeschreibung",
    contentLabel: "Hauptinhalt",
    contentHint: "optional, hilft Alfred bei der besseren Analyse",
    submitBtn: "Bei NOXEL Forge einreichen",
    analyzing: "Wird analysiert..."
  },
  pricing: {
    kicker: "NOXEL Forge Preise",
    title: "Bauen Sie Ihr",
    titleAccent: "Autoritätsnetzwerk",
    subtitle: "Zeigen Sie das NOXEL-Abzeichen auf Ihrer Website an und sichern Sie sich exklusive Rabatte auf jede Stufe.",
    monthly: "Monatlich",
    annual: "Jährlich",
    badgeToggle: "Ich zeige das NOXEL-Abzeichen an und schalte den Rabatt frei",
    badgeApplied: "Abzeichen-Rabatt angewendet",
    mostPopular: "Am beliebtesten",
    perMonth: "/Mo.",
    getStarted: "Kostenlos starten",
    badgeInfoTitle: "So schalten Sie Abzeichen-Rabatte frei",
    badgeInfoDesc: "Zeigen Sie ein beliebiges Abzeichen in der Fußzeile Ihrer Website an. Alfred scannt Ihre Fußzeile bei jeder Einreichung."
  },
  badge: {
    kicker: "Auf Ihrer Website anzeigen",
    title: "NOXEL Forge",
    titleAccent: "Abzeichen",
    subtitle: "Kopieren Sie ein beliebiges Abzeichen und fügen Sie es in die Fußzeile Ihrer Website ein.",
    copy: "Code kopieren",
    copied: "Kopiert!",
    infoTitle: "So funktionieren Abzeichen-Rabatte",
    infoDesc: "Platzieren Sie ein beliebiges Abzeichen seitenübergreifend in der Fußzeile Ihrer Website. Alfred scannt Ihre Fußzeile bei jeder Einreichung. Silber 10 %, Gold 15 %, Platin 20 %, Diamant 25 %."
  },
  cta: {
    kicker: "Bereit zum Schmieden?",
    title: "Treten Sie NOXEL Forge bei",
    subtitle: "Beginnen Sie noch heute mit dem Aufbau Ihres verifizierten Backlink-Netzwerks."
  }
};

const ln: ForgeTranslations = {
  nav: {
    submit: "Tinda",
    dashboard: "Tableau de bord",
    pricing: "Ntalo",
    badges: "Badges"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistème ya kobongola balinks",
    title: "Bongisa",
    titleAccent: "bokonzi na yo",
    subtitle: "Bosana balinks na basit oyo Alfred asaleli verification. Kalité ekombisamá, spam ezali mpossible. Pesa moko, zwa moko.",
    ctaSubmit: "Tinda site na ngai",
    ctaDashboard: "Dashboard na ngai"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Zwa mapoint na kobongola nyonso",
    giveOne: "Pesa moko, zwa moko",
    giveOneDesc: "Opesi link moko, ozwi link moko",
    alfredFilters: "Alfred azali kofilter",
    alfredFiltersDesc: "Spam te, content ya bozoba te"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Site nyonso ezwi points sur 100 kolanda biloko motoba ya kalité"
  },
  directory: {
    kicker: "Répertoire",
    title: "Basit ya Forge oyo ezali verified",
    empty: "Répertoire ezali pamba sikoyo",
    emptyDesc: "Linga kozala ya liboso kotinda site na yo.",
    loading: "Répertoire ezali kotangama...",
    previous: "Ya liboso",
    next: "Ya sima"
  },
  submit: {
    alfredTitle: "Alfred ataleli submission nyonso",
    alfredDesc: "Submission nyonso esalemaka scan mpe otalelami na Alfred liboso ya kopanza. Kalité ekombisamá, spam ezali mpossible.",
    urlLabel: "URL ya site",
    urlHint: "HTTPS esengemi. Esengeli ezala na link na noxelseo.com to noxelforge.com",
    titleLabel: "Toli",
    nicheLabel: "Niche",
    descLabel: "Kekele ya mokuse",
    contentLabel: "Content ya miboko",
    contentHint: "ya bonsomi, esalisi Alfred koanaliser malamu",
    submitBtn: "Tinda na NOXEL Forge",
    analyzing: "Ezali koanaliser..."
  },
  pricing: {
    kicker: "Ntalo ya NOXEL Forge",
    title: "Tonga",
    titleAccent: "réseau ya bokonzi",
    subtitle: "Bimisa badge ya NOXEL na site na yo mpe fungola réductions ya kokamwa na niveau nyonso.",
    monthly: "Sanza na sanza",
    annual: "Yambo na yambo",
    badgeToggle: "Nabimisi badge ya NOXEL, fungola réduction",
    badgeApplied: "Réduction ya badge esalemi",
    mostPopular: "Ya kolongelama mingi",
    perMonth: "/sanza",
    getStarted: "Banda ofele",
    badgeInfoTitle: "Ndenge ya kokungola réductions ya badge",
    badgeInfoDesc: "Bimisa badge nyonso na footer ya site na yo. Alfred asaleli scan footer na yo na submission nyonso."
  },
  badge: {
    kicker: "Bimisa na site na yo",
    title: "NOXEL Forge",
    titleAccent: "Badges",
    subtitle: "Kopie mpe kolakisa badge nyonso na footer ya site na yo.",
    copy: "Kopie snippet",
    copied: "Ekopiamá!",
    infoTitle: "Ndenge réductions ya badge esalemaka",
    infoDesc: "Tia badge nyonso na footer ya site na yo, na site mobimba. Alfred asaleli scan footer na yo na submission nyonso. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Ozali libready ya koforger?",
    title: "Kota na NOXEL Forge",
    subtitle: "Banda kotonga réseau na yo ya balinks verified lelo."
  }
};

const sm: ForgeTranslations = {
  nav: {
    submit: "Tu'uina atu",
    dashboard: "Fa'atonu",
    pricing: "Tau",
    badges: "Fa'ailoga"
  },
  hero: {
    kicker: "NOXEL Forge - Fa'alapotopotoga Fesuia'i Backlink",
    title: "Fau lou",
    titleAccent: "pule",
    subtitle: "Fesuia'i backlink ma saite fa'amaonia na fa'amamaina e Alfred. Fa'amautinoa lelei, e le mafai le spam. Tu'u se tasi, maua se tasi.",
    ctaSubmit: "Tu'uina atu la'u saite",
    ctaDashboard: "Lo'u Fa'atonu"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Maua ni poeniti i fesuia'iga uma",
    giveOne: "Tu'u se tasi, maua se tasi",
    giveOneDesc: "E te tu'u se backlink, e te maua se tasi toe",
    alfredFilters: "Fa'amamaina a Alfred",
    alfredFiltersDesc: "Leai se spam, leai se anotusi masani"
  },
  trust: {
    kicker: "Fa'atonu Faatuatua",
    subtitle: "E maua e saite uma se sikoa mai le 100 e fa'atatau i fa'ailoga lelei e 6"
  },
  directory: {
    kicker: "Fa'aupuga",
    title: "Saite Forge Fa'amaonia",
    empty: "E gaogao le fa'aupuga i le taimi nei",
    emptyDesc: "Ia e muamua tu'uina atu lau saite.",
    loading: "Fa'atau fa'aupuga...",
    previous: "Muamua",
    next: "Sosoo"
  },
  submit: {
    alfredTitle: "E toe iloilo e Alfred tu'itu'iga uma",
    alfredDesc: "E su'esu'e ma iloilo e Alfred tu'itu'iga uma a'o le'i lolomiina. Fa'amautinoa lelei, e le mafai le spam.",
    urlLabel: "URL o le Saite",
    urlHint: "E mana'omia le HTTPS. E tatau ona i ai se so'otaga i noxelseo.com po'o noxelforge.com",
    titleLabel: "Ulutala",
    nicheLabel: "Vaega",
    descLabel: "Fa'amatalaga puupuu",
    contentLabel: "Anotusi autu",
    contentHint: "fa'afesoasoani, e fesoasoani ia Alfred e su'esu'e atili",
    submitBtn: "Tu'uina atu i NOXEL Forge",
    analyzing: "O su'esu'e..."
  },
  pricing: {
    kicker: "Tau o NOXEL Forge",
    title: "Fausia lou",
    titleAccent: "feso'otaiga pule",
    subtitle: "Fa'aali le fa'ailoga NOXEL i lau saite ma tatalaina tau fa'apitoa i luga o vaega uma.",
    monthly: "Masina",
    annual: "Fa'aletausaga",
    badgeToggle: "O lo'o fa'aali lo'u fa'ailoga NOXEL, tatalaina le tau fa'amalolo",
    badgeApplied: "Ua fa'aogaina le tau fa'amalolo fa'ailoga",
    mostPopular: "Sili ona ta'uta'ua",
    perMonth: "/masina",
    getStarted: "Amata fua",
    badgeInfoTitle: "Fa'afefea ona tatalaina tau fa'amalolo fa'ailoga",
    badgeInfoDesc: "Fa'aali so'o se fa'ailoga i lalo o lau saite. E su'esu'e e Alfred lau lalo i tu'itu'iga uma."
  },
  badge: {
    kicker: "Fa'aali i lau saite",
    title: "NOXEL Forge",
    titleAccent: "Fa'ailoga",
    subtitle: "Kopi ma fa'apipi'i so'o se fa'ailoga i lalo o lau saite.",
    copy: "Kopi snippet",
    copied: "Ua kopii!",
    infoTitle: "Fa'afefea ona galue tau fa'amalolo fa'ailoga",
    infoDesc: "Tu'u so'o se fa'ailoga i lalo o lau saite, saite atoa. E su'esu'e e Alfred lau lalo i tu'itu'iga uma. Siliva 10%, Gaoio 15%, Platinum 20%, Taimane 25%."
  },
  cta: {
    kicker: "Ua saunia e fau?",
    title: "Auai i NOXEL Forge",
    subtitle: "Amata le fausiaina o lou feso'otaiga backlink fa'amaonia i le asō."
  }
};

const xh: ForgeTranslations = {
  nav: {
    submit: "Faka",
    dashboard: "Ibhodi yolawulo",
    pricing: "Amaxabiso",
    badges: "Iibheji"
  },
  hero: {
    kicker: "NOXEL Forge - Inkqubo yokutshintshana kweBacklink",
    title: "Yakhela yakho",
    titleAccent: "igunya",
    subtitle: "Tshintshana ngeebheklink namaziza aqinisekisiweyo ahlaziywa ngu-Alfred. Umgangatho uqinisekisiwe, ispam ayinakwenzeka. Nika omnye, ufumane omnye.",
    ctaSubmit: "Faka isayithi sam",
    ctaDashboard: "Ibhodi yam yolawulo"
  },
  stats: {
    forgePoints: "Iipoyinti zeForge",
    forgePointsDesc: "Fumana iipoyinti kwintshintshano nganye",
    giveOne: "Nika omnye, ufumane omnye",
    giveOneDesc: "Unika ibeklink, ufumana enye ubuyela",
    alfredFilters: "Iihleleli zika-Alfred",
    alfredFiltersDesc: "Akukho spam, akukho mxholo ojwayelekileyo"
  },
  trust: {
    kicker: "Forge yeSikolo soThemba",
    subtitle: "Isayithi nganye ifumana amanqaku kuma-100 ngokusekelwe kumazsigns amathandathu omgangatho"
  },
  directory: {
    kicker: "Uluhlu",
    title: "Amaziza eForge Aqinisekisiweyo",
    empty: "Uluhlu alukho nangona lungena nto ngoku",
    emptyDesc: "Yiba ngowokuqala ukufaka isayithi sakho.",
    loading: "Iyalayisha uluhlu...",
    previous: "Eyedlulileyo",
    next: "Elandelayo"
  },
  submit: {
    alfredTitle: "Alfred uyahlola ukufakwa kwento nganye",
    alfredDesc: "Ukufakwa kwento nganye kuskenyiwa kuze kuhlolwe ngu-Alfred ngaphambi kokupapashwa. Umgangatho uqinisekisiwe, ispam ayinakwenzeka.",
    urlLabel: "I-URL yesayithi",
    urlHint: "I-HTTPS iyafuneka. Kufuneka iqulathe isixokelelwano siye ku-noxelseo.com okanye ku-noxelforge.com",
    titleLabel: "Isihloko",
    nicheLabel: "Indawo",
    descLabel: "Inkcazelo emfutshane",
    contentLabel: "Umxholo oyintloko",
    contentHint: "akuxhomekekanga, unceda Alfred ukuhlalutya ngcono",
    submitBtn: "Faka ku-NOXEL Forge",
    analyzing: "Iyahlalutya..."
  },
  pricing: {
    kicker: "Amaxabiso e-NOXEL Forge",
    title: "Yakha yakho",
    titleAccent: "inethiwekhi yegunya",
    subtitle: "Bonisa ibheji ye-NOXEL kwisayithi sakho uze uvule iiskonto ezikhethekileyo kwiinqanaba nganye.",
    monthly: "Ngenyanga",
    annual: "Ngonyaka",
    badgeToggle: "Ndibonisa ibheji ye-NOXEL, vula iskonto",
    badgeApplied: "Iskonto sebheji sisebenzisiwe",
    mostPopular: "Eyaziwayo kakhulu",
    perMonth: "/iny",
    getStarted: "Qala simahla",
    badgeInfoTitle: "Indlela yokuvula iiskonto zebheji",
    badgeInfoDesc: "Bonisa nayiphi na ibheji kwifutha lesayithi sakho. Alfred uskena ifutha lakho kwifakelo nganye."
  },
  badge: {
    kicker: "Bonisa kwisayithi sakho",
    title: "NOXEL Forge",
    titleAccent: "Iibheji",
    subtitle: "Kopisha unamathisele nayiphi na ibheji kwifutha lesayithi sakho.",
    copy: "Kopisha isiqephu",
    copied: "Ikopishiwe!",
    infoTitle: "Indlela iiskonto zebheji ezisebenza ngayo",
    infoDesc: "Beka nayiphi na ibheji kwifutha lesayithi sakho, kuyo yonke isayithi. Alfred uskena ifutha lakho kwifakelo nganye. Isiliva 10%, Igolide 15%, Iplatinamu 20%, Idayimane 25%."
  },
  cta: {
    kicker: "Ukulungele ukuforja?",
    title: "Joyina i-NOXEL Forge",
    subtitle: "Qala yakha inethiwekhi yakho yeebheklink eziQinisekisiweyo namhlanje."
  }
};

const pl: ForgeTranslations = {
  nav: {
    submit: "Prześlij",
    dashboard: "Panel",
    pricing: "Cennik",
    badges: "Odznaki"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosystem wymiany linków zwrotnych",
    title: "Wykuj swoją",
    titleAccent: "autorytet",
    subtitle: "Wymieniaj linki zwrotne ze zweryfikowanymi witrynami filtrowanymi przez Alfred. Jakość gwarantowana, spam niemożliwy. Daj jeden, dostań jeden.",
    ctaSubmit: "Prześlij moją stronę",
    ctaDashboard: "Mój panel"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Zdobywaj punkty przy każdej wymianie",
    giveOne: "Daj jeden, dostań jeden",
    giveOneDesc: "Dajesz link zwrotny, dostajesz jeden w zamian",
    alfredFilters: "Filtry Alfred",
    alfredFiltersDesc: "Zero spamu, zero ogólnych treści"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Każda strona otrzymuje ocenę w skali 100 punktów na podstawie 6 sygnałów jakości"
  },
  directory: {
    kicker: "Katalog",
    title: "Zweryfikowane witryny Forge",
    empty: "Katalog jest na razie pusty",
    emptyDesc: "Bądź pierwszym, który prześle swoją stronę.",
    loading: "Ładowanie katalogu...",
    previous: "Poprzednia",
    next: "Następna"
  },
  submit: {
    alfredTitle: "Alfred weryfikuje każde zgłoszenie",
    alfredDesc: "Każde zgłoszenie jest skanowane i weryfikowane przez Alfred przed publikacją. Jakość gwarantowana, spam niemożliwy.",
    urlLabel: "Adres URL strony",
    urlHint: "Wymagany HTTPS. Musi zawierać link do noxelseo.com lub noxelforge.com",
    titleLabel: "Tytuł",
    nicheLabel: "Nisza",
    descLabel: "Krótki opis",
    contentLabel: "Główna treść",
    contentHint: "opcjonalne, pomaga Alfred lepiej analizować",
    submitBtn: "Prześlij do NOXEL Forge",
    analyzing: "Analizowanie..."
  },
  pricing: {
    kicker: "Cennik NOXEL Forge",
    title: "Zbuduj swoją",
    titleAccent: "sieć autorytetu",
    subtitle: "Wyświetl odznakę NOXEL na swojej stronie i odblokuj ekskluzywne zniżki na każdym poziomie.",
    monthly: "Miesięcznie",
    annual: "Rocznie",
    badgeToggle: "Wyświetlam odznakę NOXEL, odblokuję zniżkę",
    badgeApplied: "Zniżka za odznakę zastosowana",
    mostPopular: "Najpopularniejszy",
    perMonth: "/mies.",
    getStarted: "Zacznij za darmo",
    badgeInfoTitle: "Jak odblokować zniżki za odznakę",
    badgeInfoDesc: "Wyświetl dowolną odznakę w stopce swojej strony. Alfred skanuje Twoją stopkę przy każdym zgłoszeniu."
  },
  badge: {
    kicker: "Wyświetl na swojej stronie",
    title: "NOXEL Forge",
    titleAccent: "Odznaki",
    subtitle: "Skopiuj i wklej dowolną odznakę w stopce swojej strony.",
    copy: "Kopiuj kod",
    copied: "Skopiowano!",
    infoTitle: "Jak działają zniżki za odznakę",
    infoDesc: "Umieść dowolną odznakę w stopce swojej strony, na wszystkich podstronach. Alfred skanuje Twoją stopkę przy każdym zgłoszeniu. Srebrna 10%, Złota 15%, Platynowa 20%, Diamentowa 25%."
  },
  cta: {
    kicker: "Gotowy do kucia?",
    title: "Dołącz do NOXEL Forge",
    subtitle: "Zacznij budować swoją zweryfikowaną sieć linków zwrotnych już dziś."
  }
};

const ja: ForgeTranslations = {
  nav: {
    submit: "送信",
    dashboard: "ダッシュボード",
    pricing: "料金プラン",
    badges: "バッジ"
  },
  hero: {
    kicker: "NOXEL Forge - バックリンク交換エコシステム",
    title: "あなたの",
    titleAccent: "権威性",
    subtitle: "Alfredによる審査済みサイトとバックリンクを交換しましょう。品質保証、スパム不可。1つ提供して、1つ獲得。",
    ctaSubmit: "サイトを送信する",
    ctaDashboard: "マイダッシュボード"
  },
  stats: {
    forgePoints: "フォージポイント",
    forgePointsDesc: "すべての交換でポイントを獲得",
    giveOne: "1つ提供して、1つ獲得",
    giveOneDesc: "バックリンクを提供すると、バックリンクが返ってきます",
    alfredFilters: "Alfredのフィルタリング",
    alfredFiltersDesc: "スパムゼロ、低品質コンテンツゼロ"
  },
  trust: {
    kicker: "トラストスコアフォージ",
    subtitle: "すべてのサイトは6つの品質シグナルに基づき100点満点でスコアリングされます"
  },
  directory: {
    kicker: "ディレクトリ",
    title: "審査済みフォージサイト",
    empty: "現在ディレクトリは空です",
    emptyDesc: "最初にあなたのサイトを送信しましょう。",
    loading: "ディレクトリを読み込み中...",
    previous: "前へ",
    next: "次へ"
  },
  submit: {
    alfredTitle: "Alfredがすべての申請を審査します",
    alfredDesc: "すべての申請は公開前にAlfredによってスキャン・審査されます。品質保証、スパム不可。",
    urlLabel: "サイトURL",
    urlHint: "HTTPSが必要です。noxelseo.comまたはnoxelforge.comへのリンクを含む必要があります",
    titleLabel: "タイトル",
    nicheLabel: "ニッチ",
    descLabel: "簡単な説明",
    contentLabel: "メインコンテンツ",
    contentHint: "任意。Alfredの分析精度向上に役立ちます",
    submitBtn: "NOXEL Forgeに送信する",
    analyzing: "分析中..."
  },
  pricing: {
    kicker: "NOXEL Forge 料金プラン",
    title: "あなたの",
    titleAccent: "権威ネットワークを構築",
    subtitle: "サイトにNOXELバッジを表示して、すべてのプランで限定割引を解除しましょう。",
    monthly: "月払い",
    annual: "年払い",
    badgeToggle: "NOXELバッジを表示して割引を解除する",
    badgeApplied: "バッジ割引が適用されました",
    mostPopular: "最も人気",
    perMonth: "/月",
    getStarted: "無料で始める",
    badgeInfoTitle: "バッジ割引の解除方法",
    badgeInfoDesc: "サイトのフッターにバッジを表示してください。Alfredは申請のたびにフッターをスキャンします。"
  },
  badge: {
    kicker: "サイトに表示する",
    title: "NOXEL Forge",
    titleAccent: "バッジ",
    subtitle: "任意のバッジをコピーしてサイトのフッターに貼り付けてください。",
    copy: "スニペットをコピー",
    copied: "コピーしました！",
    infoTitle: "バッジ割引の仕組み",
    infoDesc: "サイト全体のフッターにバッジを設置してください。Alfredは申請のたびにフッターをスキャンします。シルバー10%、ゴールド15%、プラチナ20%、ダイヤモンド25%。"
  },
  cta: {
    kicker: "フォージの準備はできましたか？",
    title: "NOXEL Forgeに参加する",
    subtitle: "今すぐ審査済みバックリンクネットワークの構築を始めましょう。"
  }
};

const ga: ForgeTranslations = {
  nav: {
    submit: "Cuir isteach",
    dashboard: "Deais",
    pricing: "Praghsáil",
    badges: "Suaitheantas"
  },
  hero: {
    kicker: "NOXEL Forge - Éiceachóras Malartaithe Nasc Cúil",
    title: "Ceap do",
    titleAccent: "údarás",
    subtitle: "Malartaigh naisc chúil le suíomhanna fíoraithe scagtha ag Alfred. Cáilíocht ráthaithe, spam dodhéanta. Tabhair ceann, faigh ceann.",
    ctaSubmit: "Cuir isteach mo shuíomh",
    ctaDashboard: "Mo Dheais"
  },
  stats: {
    forgePoints: "Pointí Forge",
    forgePointsDesc: "Tuill pointí ar gach malartú",
    giveOne: "Tabhair ceann, faigh ceann",
    giveOneDesc: "Tugann tú nasc cúil, faigheann tú ceann ar ais",
    alfredFilters: "Scagairí Alfred",
    alfredFiltersDesc: "Gan spam, gan ábhar ginearálta"
  },
  trust: {
    kicker: "Scór Muiníne Forge",
    subtitle: "Faigheann gach suíomh scór as 100 bunaithe ar 6 chomhartha cáilíochta"
  },
  directory: {
    kicker: "Eolaire",
    title: "Suíomhanna Forge Fíoraithe",
    empty: "Tá an t-eolaire folamh faoi láthair",
    emptyDesc: "Bí ar an gcéad duine do shuíomh a chur isteach.",
    loading: "Eolaire á lódáil...",
    previous: "Roimhe seo",
    next: "Ar aghaidh"
  },
  submit: {
    alfredTitle: "Déanann Alfred athbhreithniú ar gach aighneacht",
    alfredDesc: "Scanann agus athbhreithnítear gach aighneacht ag Alfred roimh fhoilsiú. Cáilíocht ráthaithe, spam dodhéanta.",
    urlLabel: "URL an tSuíomh",
    urlHint: "Tá HTTPS ag teastáil. Ní mór nasc a bheith ann chuig noxelseo.com nó noxelforge.com",
    titleLabel: "Teideal",
    nicheLabel: "Sainspéis",
    descLabel: "Cur síos gearr",
    contentLabel: "Príomhábhar",
    contentHint: "roghnach, cabhraíonn sé le Alfred anailís níos fearr a dhéanamh",
    submitBtn: "Cuir isteach chuig NOXEL Forge",
    analyzing: "Ag anailísiú..."
  },
  pricing: {
    kicker: "Praghsáil NOXEL Forge",
    title: "Tóg do",
    titleAccent: "líonra údaráis",
    subtitle: "Taispeáin suaitheantas NOXEL ar do shuíomh agus díghlasáil lascainí eisiacha ar gach leibhéal.",
    monthly: "Míosúil",
    annual: "Bliantúil",
    badgeToggle: "Taispeánaim suaitheantas NOXEL, díghlasáil lascaine",
    badgeApplied: "Lascaine suaitheantas curtha i bhfeidhm",
    mostPopular: "Is mó tóir",
    perMonth: "/mí",
    getStarted: "Tosaigh saor in aisce",
    badgeInfoTitle: "Conas lascainí suaitheantas a dhíghlasáil",
    badgeInfoDesc: "Taispeáin aon suaitheantas i gcochall do shuíomh. Scanann Alfred do chochall ar gach aighneacht."
  },
  badge: {
    kicker: "Taispeáin ar do shuíomh",
    title: "NOXEL Forge",
    titleAccent: "Suaitheantas",
    subtitle: "Cóipeáil agus greamaigh aon suaitheantas i gcochall do shuíomh.",
    copy: "Cóipeáil blúire",
    copied: "Cóipeáilte!",
    infoTitle: "Conas a oibríonn lascainí suaitheantas",
    infoDesc: "Cuir aon suaitheantas i gcochall do shuíomh, ar fud an tsuíomh. Scanann Alfred do chochall ar gach aighneacht. Airgid 10%, Óir 15%, Platanam 20%, Diamant 25%."
  },
  cta: {
    kicker: "Réidh le ceap?",
    title: "Glac páirt i NOXEL Forge",
    subtitle: "Tosaigh ag tógáil do líonra nasc cúil fíoraithe inniu."
  }
};

const zh: ForgeTranslations = {
  nav: {
    submit: "提交",
    dashboard: "控制台",
    pricing: "定价",
    badges: "徽章"
  },
  hero: {
    kicker: "NOXEL Forge - 外链交换生态系统",
    title: "锻造你的",
    titleAccent: "权威",
    subtitle: "与经 Alfred 筛选的认证网站交换外链。质量有保障，垃圾信息无处遁形。给一个，得一个。",
    ctaSubmit: "提交我的网站",
    ctaDashboard: "我的控制台"
  },
  stats: {
    forgePoints: "锻造积分",
    forgePointsDesc: "每次交换均可获得积分",
    giveOne: "给一个，得一个",
    giveOneDesc: "你给出一条外链，即可获得一条回链",
    alfredFilters: "Alfred 过滤",
    alfredFiltersDesc: "零垃圾，零泛滥内容"
  },
  trust: {
    kicker: "信任评分锻造",
    subtitle: "每个网站根据6项质量信号获得满分100分的评分"
  },
  directory: {
    kicker: "目录",
    title: "已认证的 Forge 网站",
    empty: "目录暂时为空",
    emptyDesc: "成为第一个提交网站的人。",
    loading: "正在加载目录...",
    previous: "上一页",
    next: "下一页"
  },
  submit: {
    alfredTitle: "Alfred 审核每一条提交",
    alfredDesc: "每条提交在发布前均由 Alfred 扫描审核。质量有保障，垃圾信息无处遁形。",
    urlLabel: "网站网址",
    urlHint: "需要 HTTPS。必须包含指向 noxelseo.com 或 noxelforge.com 的链接",
    titleLabel: "标题",
    nicheLabel: "细分领域",
    descLabel: "简短描述",
    contentLabel: "主要内容",
    contentHint: "可选，有助于 Alfred 更好地分析",
    submitBtn: "提交至 NOXEL Forge",
    analyzing: "分析中..."
  },
  pricing: {
    kicker: "NOXEL Forge 定价",
    title: "构建你的",
    titleAccent: "权威网络",
    subtitle: "在您的网站上展示 NOXEL 徽章，即可解锁每个套餐的专属折扣。",
    monthly: "按月付费",
    annual: "按年付费",
    badgeToggle: "我展示了 NOXEL 徽章，解锁折扣",
    badgeApplied: "徽章折扣已应用",
    mostPopular: "最受欢迎",
    perMonth: "/月",
    getStarted: "免费开始",
    badgeInfoTitle: "如何解锁徽章折扣",
    badgeInfoDesc: "在您网站的页脚展示任意徽章。Alfred 在每次提交时扫描您的页脚。"
  },
  badge: {
    kicker: "展示在您的网站上",
    title: "NOXEL Forge",
    titleAccent: "徽章",
    subtitle: "复制并粘贴任意徽章到您网站的页脚。",
    copy: "复制代码片段",
    copied: "已复制！",
    infoTitle: "徽章折扣如何运作",
    infoDesc: "将任意徽章放置在您网站的全站页脚中。Alfred 在每次提交时扫描您的页脚。白银 10%，黄金 15%，铂金 20%，钻石 25%。"
  },
  cta: {
    kicker: "准备好锻造了吗？",
    title: "加入 NOXEL Forge",
    subtitle: "立即开始构建您的认证外链网络。"
  }
};

const gl: ForgeTranslations = {
  nav: {
    submit: "Enviar",
    dashboard: "Panel de control",
    pricing: "Prezos",
    badges: "Insignias"
  },
  hero: {
    kicker: "NOXEL Forge - Ecosistema de intercambio de backlinks",
    title: "Forxa a túa",
    titleAccent: "autoridade",
    subtitle: "Intercambia backlinks con sitios verificados filtrados por Alfred. Calidade garantida, spam imposible. Dá un, recibe un.",
    ctaSubmit: "Enviar o meu sitio",
    ctaDashboard: "O meu panel"
  },
  stats: {
    forgePoints: "Puntos Forge",
    forgePointsDesc: "Gaña puntos en cada intercambio",
    giveOne: "Dá un, recibe un",
    giveOneDesc: "Dás un backlink, recibes un de volta",
    alfredFilters: "Filtros de Alfred",
    alfredFiltersDesc: "Cero spam, cero contido xenérico"
  },
  trust: {
    kicker: "Puntuación de confianza Forge",
    subtitle: "Cada sitio recibe unha puntuación sobre 100 baseada en 6 sinais de calidade"
  },
  directory: {
    kicker: "Directorio",
    title: "Sitios Forge verificados",
    empty: "O directorio está baleiro por agora",
    emptyDesc: "Sé o primeiro en enviar o teu sitio.",
    loading: "Cargando directorio...",
    previous: "Anterior",
    next: "Seguinte"
  },
  submit: {
    alfredTitle: "Alfred revisa cada envío",
    alfredDesc: "Cada envío é analizado e revisado por Alfred antes da publicación. Calidade garantida, spam imposible.",
    urlLabel: "URL do sitio",
    urlHint: "HTTPS obrigatorio. Debe conter unha ligazón a noxelseo.com ou noxelforge.com",
    titleLabel: "Título",
    nicheLabel: "Nicho",
    descLabel: "Descrición breve",
    contentLabel: "Contido principal",
    contentHint: "opcional, axuda a Alfred a analizar mellor",
    submitBtn: "Enviar a NOXEL Forge",
    analyzing: "Analizando..."
  },
  pricing: {
    kicker: "Prezos de NOXEL Forge",
    title: "Constrúe a túa",
    titleAccent: "rede de autoridade",
    subtitle: "Mostra o distintivo de NOXEL no teu sitio e desbloquea descontos exclusivos en cada nivel.",
    monthly: "Mensual",
    annual: "Anual",
    badgeToggle: "Mostro o distintivo de NOXEL, desbloquear desconto",
    badgeApplied: "Desconto por distintivo aplicado",
    mostPopular: "Máis popular",
    perMonth: "/mes",
    getStarted: "Comeza gratis",
    badgeInfoTitle: "Como desbloquear os descontos por distintivo",
    badgeInfoDesc: "Mostra calquera distintivo no pé de páxina do teu sitio. Alfred escanea o teu pé de páxina en cada envío."
  },
  badge: {
    kicker: "Mostra no teu sitio",
    title: "NOXEL Forge",
    titleAccent: "Insignias",
    subtitle: "Copia e pega calquera insignia no pé de páxina do teu sitio.",
    copy: "Copiar fragmento",
    copied: "Copiado!",
    infoTitle: "Como funcionan os descontos por insignia",
    infoDesc: "Coloca calquera insignia no pé de páxina do teu sitio, en todo o sitio. Alfred escanea o teu pé de páxina en cada envío. Prata 10%, Ouro 15%, Platino 20%, Diamante 25%."
  },
  cta: {
    kicker: "Listo para forxar?",
    title: "Únete a NOXEL Forge",
    subtitle: "Comeza a construír a túa rede de backlinks verificados hoxe."
  }
};

const sn: ForgeTranslations = {
  nav: {
    submit: "Tumira",
    dashboard: "Dhashibhodi",
    pricing: "Mutengo",
    badges: "Zvibhachi"
  },
  hero: {
    kicker: "NOXEL Forge - Nzvimbo yokutsinhana kweBacklink",
    title: "Gadzira",
    titleAccent: "simba rako",
    subtitle: "Tsinhana mabacklink nesaiti dzakaonekwa dzakaongorорwa naAlfred. Mhando yakavimbika, spam haingakwanisi. Ipa imwe, wana imwe.",
    ctaSubmit: "Tumira saiti yangu",
    ctaDashboard: "Dhashibhodi yangu"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Wana mapoinzi patsinhano yega yega",
    giveOne: "Ipa imwe, wana imwe",
    giveOneDesc: "Unoipa backlink imwe, unowana imwe",
    alfredFilters: "Alfred anotsvaira",
    alfredFiltersDesc: "Hapana spam, hapana zvinyorwa zvemhando yakaderera"
  },
  trust: {
    kicker: "Forge ye Chikamu cheTrust",
    subtitle: "Saiti yega yega inowana chikamu kubva pa 100 zvichienderana nezviratidzo zvitanhatu zvemhando"
  },
  directory: {
    kicker: "Ranji",
    title: "Saiti dzeForge Dzakaonekwa",
    empty: "Ranji rakasarika parizvino",
    emptyDesc: "Iva wekutanga kutumira saiti yako.",
    loading: "Kurodha ranji...",
    previous: "Yapfuura",
    next: "Inotevera"
  },
  submit: {
    alfredTitle: "Alfred anoona zvitumiro zvese",
    alfredDesc: "Chitumiro chega chega chinoongororwa naAlfred musati mashandiswa. Mhando yakavimbika, spam haingakwanisi.",
    urlLabel: "URL yeSaiti",
    urlHint: "HTTPS inodiwa. Inofanira kuva nesavadzo kune noxelseo.com kana noxelforge.com",
    titleLabel: "Musoro",
    nicheLabel: "Niche",
    descLabel: "Tsanangudzo pfupi",
    contentLabel: "Zvinyorwa zvikuru",
    contentHint: "zvisadzidzwa, zvinobatsira Alfred kuongorora zviri nani",
    submitBtn: "Tumira kuNOXEL Forge",
    analyzing: "Kuongorora..."
  },
  pricing: {
    kicker: "Mutengo weNOXEL Forge",
    title: "Vaka",
    titleAccent: "netweki yesimba rako",
    subtitle: "Ratidza badge yeNOXEL pasaiti yako uye unzvenga zvikwereti zvakakosha pezvidhinha zvese.",
    monthly: "Pamwedzi",
    annual: "Pagore",
    badgeToggle: "Ndinoratidza badge yeNOXEL, nzvenga dhisikaundi",
    badgeApplied: "Dhisikaundi yebadge yashandiswa",
    mostPopular: "Inodikanwa zvakanyanya",
    perMonth: "/mwedzi",
    getStarted: "Tanga mahara",
    badgeInfoTitle: "Maitiro ekuzarura dhisikaundi dzebadge",
    badgeInfoDesc: "Ratidza badge ipi zvayo mufuta wesaiti yako. Alfred anotsvaira futa rako pane chitumiro chega chega."
  },
  badge: {
    kicker: "Ratidza pasaiti yako",
    title: "NOXEL Forge",
    titleAccent: "Zvibhachi",
    subtitle: "Kopa uye unamidze badge ipi zvayo mufuta wesaiti yako.",
    copy: "Kopa snippet",
    copied: "Yakokopiwa!",
    infoTitle: "Maitiro ekushanda kwedhisikaundi dzebadge",
    infoDesc: "Isa badge ipi zvayo mufuta wesaiti yako, pamusoro pesaiti yose. Alfred anotsvaira futa rako pane chitumiro chega chega. Sirivha 10%, Goridhe 15%, Platinamu 20%, Dhaiyamondhi 25%."
  },
  cta: {
    kicker: "Wagadzirira kuforge?",
    title: "Batana neNOXEL Forge",
    subtitle: "Tanga kuvaka netweki yako yemabacklink akavimbika nhasi."
  }
};

const ar: ForgeTranslations = {
  nav: {
    submit: "إرسال",
    dashboard: "لوحة التحكم",
    pricing: "الأسعار",
    badges: "الشارات"
  },
  hero: {
    kicker: "NOXEL Forge - نظام تبادل الروابط الخلفية",
    title: "اصنع",
    titleAccent: "سلطتك",
    subtitle: "تبادل الروابط الخلفية مع المواقع الموثقة التي يصفيها Alfred. جودة مضمونة، والبريد العشوائي مستحيل. أعطِ واحدة، واحصل على واحدة.",
    ctaSubmit: "أرسل موقعي",
    ctaDashboard: "لوحة التحكم الخاصة بي"
  },
  stats: {
    forgePoints: "نقاط Forge",
    forgePointsDesc: "اكسب نقاطاً في كل تبادل",
    giveOne: "أعطِ واحدة، واحصل على واحدة",
    giveOneDesc: "تمنح رابطاً خلفياً، وتحصل على رابط في المقابل",
    alfredFilters: "فلاتر Alfred",
    alfredFiltersDesc: "لا بريد عشوائي، لا محتوى عام"
  },
  trust: {
    kicker: "مقياس الثقة Forge",
    subtitle: "كل موقع يحصل على نقاط من 100 بناءً على 6 معايير جودة"
  },
  directory: {
    kicker: "الدليل",
    title: "مواقع Forge الموثقة",
    empty: "الدليل فارغ في الوقت الحالي",
    emptyDesc: "كن أول من يرسل موقعه.",
    loading: "جاري تحميل الدليل...",
    previous: "السابق",
    next: "التالي"
  },
  submit: {
    alfredTitle: "Alfred يراجع كل إرسال",
    alfredDesc: "كل إرسال يتم فحصه ومراجعته من قبل Alfred قبل النشر. جودة مضمونة، والبريد العشوائي مستحيل.",
    urlLabel: "رابط الموقع",
    urlHint: "HTTPS مطلوب. يجب أن يحتوي على رابط إلى noxelseo.com أو noxelforge.com",
    titleLabel: "العنوان",
    nicheLabel: "المجال",
    descLabel: "وصف مختصر",
    contentLabel: "المحتوى الرئيسي",
    contentHint: "اختياري، يساعد Alfred على تحليل أفضل",
    submitBtn: "إرسال إلى NOXEL Forge",
    analyzing: "جاري التحليل..."
  },
  pricing: {
    kicker: "أسعار NOXEL Forge",
    title: "ابنِ",
    titleAccent: "شبكة سلطتك",
    subtitle: "اعرض شارة NOXEL على موقعك وافتح خصومات حصرية على كل مستوى.",
    monthly: "شهري",
    annual: "سنوي",
    badgeToggle: "أعرض شارة NOXEL، افتح الخصم",
    badgeApplied: "تم تطبيق خصم الشارة",
    mostPopular: "الأكثر شيوعاً",
    perMonth: "/شهر",
    getStarted: "ابدأ مجاناً",
    badgeInfoTitle: "كيفية فتح خصومات الشارة",
    badgeInfoDesc: "اعرض أي شارة في تذييل موقعك. Alfred يفحص تذييلك عند كل إرسال."
  },
  badge: {
    kicker: "اعرضها على موقعك",
    title: "NOXEL Forge",
    titleAccent: "الشارات",
    subtitle: "انسخ والصق أي شارة في تذييل موقعك.",
    copy: "نسخ الكود",
    copied: "تم النسخ!",
    infoTitle: "كيف تعمل خصومات الشارة",
    infoDesc: "ضع أي شارة في تذييل موقعك على جميع الصفحات. Alfred يفحص تذييلك عند كل إرسال. فضي 10%، ذهبي 15%، بلاتيني 20%، ألماسي 25%."
  },
  cta: {
    kicker: "هل أنت مستعد للصياغة؟",
    title: "انضم إلى NOXEL Forge",
    subtitle: "ابدأ في بناء شبكة الروابط الخلفية الموثقة الخاصة بك اليوم."
  }
};

const ps: ForgeTranslations = {
  nav: {
    submit: "سپارل",
    dashboard: "ډشبورډ",
    pricing: "نرخونه",
    badges: "بیجونه"
  },
  hero: {
    kicker: "NOXEL Forge - د بیک لینک تبادلې ایکوسیستم",
    title: "خپل",
    titleAccent: "واک",
    subtitle: "د Alfred لخوا چک شوو سایټونو سره بیک لینکونه تبادله کړئ. کیفیت ضمانت شوی، سپام ناممکن دی. یو ورکړئ، یو واخلئ.",
    ctaSubmit: "زما سایټ وسپارئ",
    ctaDashboard: "زما ډشبورډ"
  },
  stats: {
    forgePoints: "فورج ټکي",
    forgePointsDesc: "د هر تبادلې پر مهال ټکي ګټل",
    giveOne: "یو ورکړئ، یو واخلئ",
    giveOneDesc: "تاسې یو بیک لینک ورکوئ، یو بیرته ترلاسه کوئ",
    alfredFilters: "د Alfred فلټرونه",
    alfredFiltersDesc: "سپام نشته، عمومي مینځپانګه نشته"
  },
  trust: {
    kicker: "د довې سکور فورج",
    subtitle: "هر سایټ د ۶ کیفیت سیګنالونو پراساس له ۱۰۰ څخه نمره ترلاسه کوي"
  },
  directory: {
    kicker: "لارښود",
    title: "تصدیق شوي فورج سایټونه",
    empty: "لارښود اوس مهال خالي دی",
    emptyDesc: "لومړی اوسئ چې خپل سایټ وسپارئ.",
    loading: "لارښود لوډیږي...",
    previous: "مخکینی",
    next: "بعدي"
  },
  submit: {
    alfredTitle: "Alfred هر سپارنه بیاکتنه کوي",
    alfredDesc: "هره سپارنه د خپریدو دمخه Alfred لخوا سکن او بیاکتنه کیږي. کیفیت ضمانت شوی، سپام ناممکن دی.",
    urlLabel: "د سایټ URL",
    urlHint: "HTTPS اړین دی. باید noxelseo.com یا noxelforge.com ته لینک ولري",
    titleLabel: "سرلیک",
    nicheLabel: "ځانګړې برخه",
    descLabel: "لنډه توضیح",
    contentLabel: "اصلي مینځپانګه",
    contentHint: "اختیاري، Alfred ته د ښه تحلیل کولو کې مرسته کوي",
    submitBtn: "NOXEL Forge ته وسپارئ",
    analyzing: "تحلیلیږي..."
  },
  pricing: {
    kicker: "د NOXEL Forge نرخونه",
    title: "خپل",
    titleAccent: "واک شبکه",
    subtitle: "خپل سایټ کې د NOXEL بیج ښکاره کړئ او د هر درجې پر مهال ځانګړي تخفیفونه خلاص کړئ.",
    monthly: "میاشتنی",
    annual: "کلنی",
    badgeToggle: "زه د NOXEL بیج ښکاره کوم، تخفیف خلاصوم",
    badgeApplied: "د بیج تخفیف پلی شو",
    mostPopular: "خورا مشهور",
    perMonth: "/میاشت",
    getStarted: "وړیا پیل کړئ",
    badgeInfoTitle: "د بیج تخفیفونه څنګه خلاص کړئ",
    badgeInfoDesc: "خپل سایټ فوټر کې هر بیج ښکاره کړئ. Alfred ستاسو فوټر د هرې سپارنې پر مهال سکن کوي."
  },
  badge: {
    kicker: "خپل سایټ کې ښکاره کړئ",
    title: "NOXEL Forge",
    titleAccent: "بیجونه",
    subtitle: "خپل سایټ فوټر کې هر بیج کاپي او پیسټ کړئ.",
    copy: "کوډ کاپي کړئ",
    copied: "کاپي شو!",
    infoTitle: "د بیج تخفیفونه څنګه کار کوي",
    infoDesc: "خپل سایټ فوټر کې، د ټول سایټ لپاره، هر بیج کیږدئ. Alfred ستاسو فوټر د هرې سپارنې پر مهال سکن کوي. سیلور ۱۰٪، ګولډ ۱۵٪، پلاتینم ۲۰٪، ډایمنډ ۲۵٪."
  },
  cta: {
    kicker: "د فورج کولو لپاره چمتو یاست؟",
    title: "NOXEL Forge سره یوځای شئ",
    subtitle: "نن ورځ خپله تصدیق شوې بیک لینک شبکه جوړول پیل کړئ."
  }
};

const ka: ForgeTranslations = {
  nav: {
    submit: "გაგზავნა",
    dashboard: "პანელი",
    pricing: "ფასები",
    badges: "ბეჯები"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink-ების გაცვლის ეკოსისტემა",
    title: "გამოჭედე შენი",
    titleAccent: "ავტორიტეტი",
    subtitle: "გაცვალე backlink-ები Alfred-ის მიერ გაფილტრულ დადასტურებულ საიტებთან. ხარისხი გარანტირებულია, სპამი შეუძლებელია. მიეცი ერთი, მიიღე ერთი.",
    ctaSubmit: "ჩემი საიტის გაგზავნა",
    ctaDashboard: "ჩემი პანელი"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "დააგროვე ქულები ყოველ გაცვლაზე",
    giveOne: "მიეცი ერთი, მიიღე ერთი",
    giveOneDesc: "შენ აძლევ backlink-ს და იღებ უკან ერთს",
    alfredFilters: "Alfred ფილტრავს",
    alfredFiltersDesc: "ნულოვანი სპამი, ნულოვანი გენერიული კონტენტი"
  },
  trust: {
    kicker: "ნდობის ქულის გამოჭედვა",
    subtitle: "თითოეული საიტი იღებს ქულას 100-დან, 6 ხარისხობრივი სიგნალის საფუძველზე"
  },
  directory: {
    kicker: "დირექტორია",
    title: "დადასტურებული Forge საიტები",
    empty: "დირექტორია ამჟამად ცარიელია",
    emptyDesc: "იყავი პირველი, ვინც გაგზავნის საიტს.",
    loading: "დირექტორია იტვირთება...",
    previous: "წინა",
    next: "შემდეგი"
  },
  submit: {
    alfredTitle: "Alfred განიხილავს ყოველ განაცხადს",
    alfredDesc: "ყოველი განაცხადი სკანირდება და განიხილება Alfred-ის მიერ გამოქვეყნებამდე. ხარისხი გარანტირებულია, სპამი შეუძლებელია.",
    urlLabel: "საიტის URL",
    urlHint: "საჭიროა HTTPS. უნდა შეიცავდეს ბმულს noxelseo.com-ზე ან noxelforge.com-ზე",
    titleLabel: "სათაური",
    nicheLabel: "ნიშა",
    descLabel: "მოკლე აღწერა",
    contentLabel: "მთავარი კონტენტი",
    contentHint: "არასავალდებულო, ეხმარება Alfred-ს უკეთ გაანალიზებაში",
    submitBtn: "NOXEL Forge-ში გაგზავნა",
    analyzing: "ანალიზი მიმდინარეობს..."
  },
  pricing: {
    kicker: "NOXEL Forge ფასები",
    title: "ააგე შენი",
    titleAccent: "ავტორიტეტის ქსელი",
    subtitle: "გამოაჩინე NOXEL ბეჯი შენს საიტზე და განბლოკე ექსკლუზიური ფასდაკლებები ყოველ დონეზე.",
    monthly: "ყოველთვიური",
    annual: "წლიური",
    badgeToggle: "ვაჩვენებ NOXEL ბეჯს, ვხსნი ფასდაკლებას",
    badgeApplied: "ბეჯის ფასდაკლება გამოყენებულია",
    mostPopular: "ყველაზე პოპულარული",
    perMonth: "/თვე",
    getStarted: "დაიწყე უფასოდ",
    badgeInfoTitle: "როგორ განბლოკო ბეჯის ფასდაკლებები",
    badgeInfoDesc: "გამოაჩინე ნებისმიერი ბეჯი შენი საიტის footer-ში. Alfred სკანირებს შენს footer-ს ყოველ განაცხადზე."
  },
  badge: {
    kicker: "გამოაჩინე შენს საიტზე",
    title: "NOXEL Forge",
    titleAccent: "ბეჯები",
    subtitle: "დააკოპირე და ჩასვი ნებისმიერი ბეჯი შენი საიტის footer-ში.",
    copy: "კოდის კოპირება",
    copied: "დაკოპირებულია!",
    infoTitle: "როგორ მუშაობს ბეჯის ფასდაკლებები",
    infoDesc: "მოათავსე ნებისმიერი ბეჯი შენი საიტის footer-ში, საიტის მასშტაბით. Alfred სკანირებს შენს footer-ს ყოველ განაცხადზე. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "მზად ხარ გამოსაჭედად?",
    title: "შემოუერთდი NOXEL Forge-ს",
    subtitle: "დაიწყე შენი დადასტურებული backlink ქსელის აგება დღესვე."
  }
};

const na: ForgeTranslations = {
  nav: {
    submit: "Wiawi",
    dashboard: "Daborod",
    pricing: "Irau",
    badges: "Baj"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistem Baklinkuia",
    title: "Wiawi ewi",
    titleAccent: "maron",
    subtitle: "Wiawi baklinkuia me wab iat ibɨwɨ Alfred. Inamaim ibuobuot, spam tsuri. Ania itak, anir itak.",
    ctaSubmit: "Wiawi wab itɨm",
    ctaDashboard: "Daborod Itɨm"
  },
  stats: {
    forgePoints: "Poenten Forge",
    forgePointsDesc: "Kabwir poenten anen wiawi ariri",
    giveOne: "Ania itak, anir itak",
    giveOneDesc: "Eanibi baklinkuia, kabwir itak",
    alfredFilters: "Alfred irɨir",
    alfredFiltersDesc: "Spam tsuri, nɨnɨ tsuri"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Wab ariri kabwir nɨmɨr anen 100 ibukin sɨnɨ 6 ñan inamaim"
  },
  directory: {
    kicker: "Dairekitore",
    title: "Wab Forge Ibɨwɨ",
    empty: "Dairekitore eoran nɨkɨ",
    emptyDesc: "Eirei wɨn wiawi wab itɨm.",
    loading: "Dairekitore ongɨ...",
    previous: "Epen",
    next: "Anaon"
  },
  submit: {
    alfredTitle: "Alfred irɨir wiawi ariri",
    alfredDesc: "Wiawi ariri Alfred irɨir me tabwiria. Inamaim ibuobuot, spam tsuri.",
    urlLabel: "URL Wab",
    urlHint: "HTTPS ibuobuot. Ñan link anen noxelseo.com me noxelforge.com",
    titleLabel: "Iowɨ",
    nicheLabel: "Nij",
    descLabel: "Nɨnɨ maraiwa",
    contentLabel: "Nɨnɨ irɨirɨ",
    contentHint: "tsuri ibuobuot, Alfred irɨir buobuot",
    submitBtn: "Wiawi amen NOXEL Forge",
    analyzing: "Irɨir ongɨ..."
  },
  pricing: {
    kicker: "NOXEL Forge Irau",
    title: "Wiawi ewi",
    titleAccent: "network maron",
    subtitle: "Bikin baj NOXEL amen wab itɨm me kabwir irau buobuot anen tier ariri.",
    monthly: "Maket",
    annual: "Yiyer",
    badgeToggle: "Ibikin baj NOXEL, kabwir irau buobuot",
    badgeApplied: "Irau baj iwiawi",
    mostPopular: "Inaroaro",
    perMonth: "/mak",
    getStarted: "Ongɨ nɨkɨ tsuri",
    badgeInfoTitle: "Anɨ kabwir irau baj buobuot",
    badgeInfoDesc: "Bikin baj ariri amen futer wab itɨm. Alfred irɨir futer itɨm anen wiawi ariri."
  },
  badge: {
    kicker: "Bikin amen wab itɨm",
    title: "NOXEL Forge",
    titleAccent: "Baj",
    subtitle: "Kopi me peis baj ariri amen futer wab itɨm.",
    copy: "Kopi snipet",
    copied: "Ikopi!",
    infoTitle: "Anɨ irau baj ongɨ",
    infoDesc: "Bikin baj ariri amen futer wab itɨm, wab ariri. Alfred irɨir futer itɨm anen wiawi ariri. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Eirei wiawi?",
    title: "Owiir NOXEL Forge",
    subtitle: "Ongɨ wiawi network baklinkuia ibɨwɨ itɨm nɨkɨ."
  }
};

const gn: ForgeTranslations = {
  nav: {
    submit: "Manda",
    dashboard: "Tembiapo renda",
    pricing: "Tepy",
    badges: "Insignia"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Myakãvéva Renda",
    title: "Japo nde",
    titleAccent: "autoridad",
    subtitle: "Jepuru backlink ne rógape ijehecháva Alfred ndive. Calidad oñemboguapyva, spam ndaipóri. Emombe'u peteĩ, erecibe peteĩ.",
    ctaSubmit: "Manda che roga",
    ctaDashboard: "Che Tembiapo renda"
  },
  stats: {
    forgePoints: "Forge Mba'eporu",
    forgePointsDesc: "Ereko mba'eporu oimeraẽva jepurúpe",
    giveOne: "Emombe'u peteĩ, erecibe peteĩ",
    giveOneDesc: "Emombe'u peteĩ backlink, erecibe peteĩ",
    alfredFilters: "Alfred omboguata",
    alfredFiltersDesc: "Spam ndaipóri, contenido genérico ndaipóri"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Oimeraẽva roga orecibe peteĩ puntaje 100 guive ojejapo señal de calidad 6 ndive"
  },
  directory: {
    kicker: "Directorio",
    title: "Forge Roga Ijehecháva",
    empty: "Directorio hína chupe",
    emptyDesc: "Eĩ tenonderã ne roga emandávo.",
    loading: "Oñecarga directorio...",
    previous: "Mboyvegua",
    next: "Upeigua"
  },
  submit: {
    alfredTitle: "Alfred ohecha oimeraẽva manda",
    alfredDesc: "Oimeraẽva manda ojehecha ha Alfred oiporúva publicación mboyve. Calidad oñemboguapyva, spam ndaipóri.",
    urlLabel: "Roga URL",
    urlHint: "HTTPS oñeikotevẽva. Oñeikotevẽ orekóva link noxelseo.com térã noxelforge.com-pe",
    titleLabel: "Título",
    nicheLabel: "Nicho",
    descLabel: "Descripción moĩmbýva",
    contentLabel: "Contenido yvate",
    contentHint: "ndojehechakuaái, Alfred ombojoavy porãvéva",
    submitBtn: "Manda NOXEL Forge-pe",
    analyzing: "Oñehesa'ỹijo..."
  },
  pricing: {
    kicker: "NOXEL Forge Tepy",
    title: "Japo nde",
    titleAccent: "red de autoridad",
    subtitle: "Ehecha NOXEL insignia ne rogápe ha eike descuento exclusivo oimeraẽva nivelpe.",
    monthly: "Arasapy",
    annual: "Aravo",
    badgeToggle: "Ahecha NOXEL insignia, eike descuento",
    badgeApplied: "Insignia descuento oñemboguapy",
    mostPopular: "Iporãvéva",
    perMonth: "/mes",
    getStarted: "Eñepyrũ mbeguekatúpe",
    badgeInfoTitle: "Mba'éicha eike insignia descuento-pe",
    badgeInfoDesc: "Ehecha oimeraẽva insignia ne roga pie-pe. Alfred ohecha ne roga pie oimeraẽva mandápe."
  },
  badge: {
    kicker: "Ehecha ne rogápe",
    title: "NOXEL Forge",
    titleAccent: "Insignia",
    subtitle: "Copea ha pegua oimeraẽva insignia ne roga pie-pe.",
    copy: "Copea fragmento",
    copied: "Oñecopea!",
    infoTitle: "Mba'éicha oiko insignia descuento",
    infoDesc: "Emboja oimeraẽva insignia ne roga pie-pe, roga peguarã. Alfred ohecha ne roga pie oimeraẽva mandápe. Plata 10%, Oro 15%, Platino 20%, Diamante 25%."
  },
  cta: {
    kicker: "Eñerõ jajapo?",
    title: "Eĩ NOXEL Forge-pe",
    subtitle: "Eñepyrũ nde backlink red ijehecháva jajapo ko árape."
  }
};

const tk: ForgeTranslations = {
  nav: {
    submit: "Ibermek",
    dashboard: "Dolandyryş paneli",
    pricing: "Bahalar",
    badges: "Nyşanlar"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Alyş-çalyş Ekosistemi",
    title: "Öz",
    titleAccent: "abraýyňy",
    subtitle: "Alfred tarapyndan süzgüçlenen tassyklanan saýtlar bilen backlink alyşyň. Hil kepillendirildi, spam mümkin däl. Birini ber, birini al.",
    ctaSubmit: "Saýtymy iber",
    ctaDashboard: "Meniň dolandyryş panelim"
  },
  stats: {
    forgePoints: "Forge Nokatlary",
    forgePointsDesc: "Her alyş-çalşykda nokat gazan",
    giveOne: "Birini ber, birini al",
    giveOneDesc: "Sen bir backlink berýärsiň, birini alýarsyň",
    alfredFilters: "Alfred süzgüçleri",
    alfredFiltersDesc: "Hiç spam ýok, hiç umumy mazmun ýok"
  },
  trust: {
    kicker: "Ynam Puany Forge",
    subtitle: "Her saýt 6 hil signalyna esaslanyp 100 bal üstünden baha alýar"
  },
  directory: {
    kicker: "Katalog",
    title: "Tassyklanan Forge Saýtlary",
    empty: "Katalog häzirlikçe boş",
    emptyDesc: "Saýtyňyzy ilkinji bolup iberiň.",
    loading: "Katalog ýüklenýär...",
    previous: "Öňki",
    next: "Indiki"
  },
  submit: {
    alfredTitle: "Alfred her iberileni gözden geçirýär",
    alfredDesc: "Her iberilen neşir edilmezden ozal Alfred tarapyndan skanlanýar we gözden geçirilýär. Hil kepillendirildi, spam mümkin däl.",
    urlLabel: "Saýt URL-i",
    urlHint: "HTTPS gerek. noxelseo.com ýa-da noxelforge.com salgysy bolmalydyr",
    titleLabel: "Başlyk",
    nicheLabel: "Uguр",
    descLabel: "Gysga düşündiriş",
    contentLabel: "Esasy mazmun",
    contentHint: "islege bagly, Alfred-e has gowy derňemäge kömek edýär",
    submitBtn: "NOXEL Forge-a iber",
    analyzing: "Derňelýär..."
  },
  pricing: {
    kicker: "NOXEL Forge Bahalary",
    title: "Öz",
    titleAccent: "ygtyýar toruňy",
    subtitle: "Saýtyňyzda NOXEL nyşanyny görkeziň we her derejedäki ýeňillikleri açyň.",
    monthly: "Aýlyk",
    annual: "Ýyllyk",
    badgeToggle: "Men NOXEL nyşanyny görkezýärin, arzanlygy açýaryn",
    badgeApplied: "Nyşan arzanlygy ulanyldy",
    mostPopular: "Iň meşhur",
    perMonth: "/aý",
    getStarted: "Mugt başlaň",
    badgeInfoTitle: "Nyşan arzanlygyny nädip açmaly",
    badgeInfoDesc: "Saýtyňyzyň aşagyndaky bölümde islendik nyşany görkeziň. Alfred her iberilişde aşagyndaky bölümiňizi skanlaýar."
  },
  badge: {
    kicker: "Saýtyňyzda görkeziň",
    title: "NOXEL Forge",
    titleAccent: "Nyşanlary",
    subtitle: "Islendik nyşany saýtyňyzyň aşagyndaky bölümine göçüriň we goýuň.",
    copy: "Kody göçür",
    copied: "Göçürildi!",
    infoTitle: "Nyşan arzanlygy nädip işleýär",
    infoDesc: "Islendik nyşany saýtyňyzyň aşagyndaky bölümine, sahypa boýunça ýerleşdiriň. Alfred her iberilişde aşagyndaky bölümiňizi skanlaýar. Kümüş 10%, Altyn 15%, Platina 20%, Almaz 25%."
  },
  cta: {
    kicker: "Başlamaga taýynmy?",
    title: "NOXEL Forge-a goşulyň",
    subtitle: "Tassyklanan backlink toruňyzy şu gün gurup başlaň."
  }
};

const zu: ForgeTranslations = {
  nav: {
    submit: "Thumela",
    dashboard: "Ibhodi lokusebenza",
    pricing: "Amanani",
    badges: "Izimpawu"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Exchange Ecosystem",
    title: "Bumba",
    titleAccent: "igunya lakho",
    subtitle: "Shintshana ngezikhonkwane namawebhusayithi aqinisekisiwe ahlunyeleliswa u-Alfred. Ikhwalithi inikelelwe, ucwangco alwenzeki. Nika okukodwa, uthole okukodwa.",
    ctaSubmit: "Thumela isayithi sami",
    ctaDashboard: "Ibhodi lami lokusebenza"
  },
  stats: {
    forgePoints: "Amaphuzu e-Forge",
    forgePointsDesc: "Hola amaphuzu kuyo yonke imishintshwano",
    giveOne: "Nika okukodwa, uthole okukodwa",
    giveOneDesc: "Unika ikhonkwane, uthola elinye",
    alfredFilters: "Izihlungi ze-Alfred",
    alfredFiltersDesc: "Akukho ucwangco, akukho okuqukethwe okujwayelekile"
  },
  trust: {
    kicker: "Isikali Sokholo se-Forge",
    subtitle: "Isayithi ngasinye sithole amanani angama-100 ngokusekelwe kuzimpawu eziyisithupha zekhwalithi"
  },
  directory: {
    kicker: "Uhlu",
    title: "Amawebhusayithi e-Forge Aqinisekisiwe",
    empty: "Uhlu luyize okwamanje",
    emptyDesc: "Yiba owokuqala ukuthumela isayithi sakho.",
    loading: "Iyalayisha uhlu...",
    previous: "Okwangaphambili",
    next: "Okulandelayo"
  },
  submit: {
    alfredTitle: "U-Alfred uyabuyekeza zonke izinto ezethumelwayo",
    alfredDesc: "Yonke into ethumelwayo ihlolwa futhi ibuyekeziwe u-Alfred ngaphambi kokushicilelwa. Ikhwalithi inikelelwe, ucwangco alwenzeki.",
    urlLabel: "I-URL yesayithi",
    urlHint: "I-HTTPS iyadingeka. Kufanele iqukethe ikhonkwane eliya ku-noxelseo.com noma ku-noxelforge.com",
    titleLabel: "Isihloko",
    nicheLabel: "Indawo ethile",
    descLabel: "Incazelo emfushane",
    contentLabel: "Okuqukethwe okuyinhloko",
    contentHint: "akudingeki, kusiza u-Alfred ukuhlaziya kangcono",
    submitBtn: "Thumela ku-NOXEL Forge",
    analyzing: "Iyahlaziya..."
  },
  pricing: {
    kicker: "Amanani e-NOXEL Forge",
    title: "Yakha",
    titleAccent: "inethiwekhi yegunya lakho",
    subtitle: "Bonisa uphawu lwe-NOXEL esayithini lakho uvule izaphulelo ezikhethekile kumazinga wonke.",
    monthly: "Ngenyanga",
    annual: "Ngonyaka",
    badgeToggle: "Ngibonisa uphawu lwe-NOXEL, vula isaphulelo",
    badgeApplied: "Isaphulelo sophawu sisetshenzisiwe",
    mostPopular: "Edumile kakhulu",
    perMonth: "/inyanga",
    getStarted: "Qala mahhala",
    badgeInfoTitle: "Indlela yokuvula izaphulelo zophawu",
    badgeInfoDesc: "Bonisa noma yiluphi uphawu ekhasini elingezansi lesayithi lakho. U-Alfred uhlola ikhasini elingezansi kuyo yonke into ethumelwayo."
  },
  badge: {
    kicker: "Bonisa esayithini lakho",
    title: "NOXEL Forge",
    titleAccent: "Izimpawu",
    subtitle: "Kopisha ufake noma yiluphi uphawu ekhasini elingezansi lesayithi lakho.",
    copy: "Kopisha isiqephu",
    copied: "Kukopishiwe!",
    infoTitle: "Indlela izaphulelo zophawu ezisebenza ngayo",
    infoDesc: "Beka noma yiluphi uphawu ekhasini elingezansi lesayithi lakho, kuwo wonke amakhasi. U-Alfred uhlola ikhasini elingezansi kuyo yonke into ethumelwayo. Isiliva 10%, Igolide 15%, Iplathinamu 20%, Idayimane 25%."
  },
  cta: {
    kicker: "Ulungele ukubumba?",
    title: "Joyina i-NOXEL Forge",
    subtitle: "Qala ukwakha inethiwekhi yakho yezikhonkwane eziqinisekisiwe namuhla."
  }
};

const pt: ForgeTranslations = {
  nav: {
    submit: "Enviar",
    dashboard: "Painel",
    pricing: "Preços",
    badges: "Emblemas"
  },
  hero: {
    kicker: "NOXEL Forge - Ecossistema de Troca de Backlinks",
    title: "Forje sua",
    titleAccent: "autoridade",
    subtitle: "Troque backlinks com sites verificados filtrados pelo Alfred. Qualidade garantida, spam impossível. Dê um, receba um.",
    ctaSubmit: "Enviar meu site",
    ctaDashboard: "Meu Painel"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Ganhe pontos em cada troca",
    giveOne: "Dê um, receba um",
    giveOneDesc: "Você dá um backlink, você recebe um de volta",
    alfredFilters: "Filtros do Alfred",
    alfredFiltersDesc: "Zero spam, zero conteúdo genérico"
  },
  trust: {
    kicker: "Forge de Pontuação de Confiança",
    subtitle: "Cada site recebe uma pontuação de 0 a 100 com base em 6 sinais de qualidade"
  },
  directory: {
    kicker: "Diretório",
    title: "Sites Forge Verificados",
    empty: "O diretório está vazio por enquanto",
    emptyDesc: "Seja o primeiro a enviar seu site.",
    loading: "Carregando diretório...",
    previous: "Anterior",
    next: "Próximo"
  },
  submit: {
    alfredTitle: "Alfred analisa cada envio",
    alfredDesc: "Cada envio é verificado e analisado pelo Alfred antes da publicação. Qualidade garantida, spam impossível.",
    urlLabel: "URL do site",
    urlHint: "HTTPS obrigatório. Deve conter um link para noxelseo.com ou noxelforge.com",
    titleLabel: "Título",
    nicheLabel: "Nicho",
    descLabel: "Descrição curta",
    contentLabel: "Conteúdo principal",
    contentHint: "opcional, ajuda o Alfred a analisar melhor",
    submitBtn: "Enviar para o NOXEL Forge",
    analyzing: "Analisando..."
  },
  pricing: {
    kicker: "Preços do NOXEL Forge",
    title: "Construa sua",
    titleAccent: "rede de autoridade",
    subtitle: "Exiba o emblema NOXEL no seu site e desbloqueie descontos exclusivos em cada plano.",
    monthly: "Mensal",
    annual: "Anual",
    badgeToggle: "Exibo o emblema NOXEL, desbloquear desconto",
    badgeApplied: "Desconto do emblema aplicado",
    mostPopular: "Mais popular",
    perMonth: "/mês",
    getStarted: "Comece gratuitamente",
    badgeInfoTitle: "Como desbloquear descontos do emblema",
    badgeInfoDesc: "Exiba qualquer emblema no rodapé do seu site. Alfred verifica seu rodapé em cada envio."
  },
  badge: {
    kicker: "Exiba no seu site",
    title: "NOXEL Forge",
    titleAccent: "Emblemas",
    subtitle: "Copie e cole qualquer emblema no rodapé do seu site.",
    copy: "Copiar código",
    copied: "Copiado!",
    infoTitle: "Como funcionam os descontos de emblema",
    infoDesc: "Coloque qualquer emblema no rodapé do seu site, em todas as páginas. Alfred verifica seu rodapé em cada envio. Prata 10%, Ouro 15%, Platina 20%, Diamante 25%."
  },
  cta: {
    kicker: "Pronto para forjar?",
    title: "Junte-se ao NOXEL Forge",
    subtitle: "Comece a construir sua rede de backlinks verificados hoje."
  }
};

const nb: ForgeTranslations = {
  nav: {
    submit: "Send inn",
    dashboard: "Kontrollpanel",
    pricing: "Priser",
    badges: "Merker"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink-utvekslingsøkosystem",
    title: "Smi din",
    titleAccent: "autoritet",
    subtitle: "Utveksle backlenker med verifiserte nettsteder filtrert av Alfred. Kvalitet garantert, spam umulig. Gi én, få én.",
    ctaSubmit: "Send inn nettstedet mitt",
    ctaDashboard: "Mitt kontrollpanel"
  },
  stats: {
    forgePoints: "Forge-poeng",
    forgePointsDesc: "Tjen poeng ved hver utveksling",
    giveOne: "Gi én, få én",
    giveOneDesc: "Du gir en backlenke, du får én tilbake",
    alfredFilters: "Alfred filtrerer",
    alfredFiltersDesc: "Null spam, null generisk innhold"
  },
  trust: {
    kicker: "Tillitsscore-smi",
    subtitle: "Hvert nettsted får en score ut av 100 basert på 6 kvalitetssignaler"
  },
  directory: {
    kicker: "Katalog",
    title: "Verifiserte Forge-nettsteder",
    empty: "Katalogen er tom foreløpig",
    emptyDesc: "Vær den første til å sende inn nettstedet ditt.",
    loading: "Laster katalog...",
    previous: "Forrige",
    next: "Neste"
  },
  submit: {
    alfredTitle: "Alfred gjennomgår alle innsendinger",
    alfredDesc: "Alle innsendinger skannes og gjennomgås av Alfred før publisering. Kvalitet garantert, spam umulig.",
    urlLabel: "Nettstedets URL",
    urlHint: "HTTPS kreves. Må inneholde en lenke til noxelseo.com eller noxelforge.com",
    titleLabel: "Tittel",
    nicheLabel: "Nisje",
    descLabel: "Kort beskrivelse",
    contentLabel: "Hovedinnhold",
    contentHint: "valgfritt, hjelper Alfred med å analysere bedre",
    submitBtn: "Send inn til NOXEL Forge",
    analyzing: "Analyserer..."
  },
  pricing: {
    kicker: "NOXEL Forge-priser",
    title: "Bygg ditt",
    titleAccent: "autoritetsnettverk",
    subtitle: "Vis NOXEL-merket på nettstedet ditt og lås opp eksklusive rabatter på hvert nivå.",
    monthly: "Månedlig",
    annual: "Årlig",
    badgeToggle: "Jeg viser NOXEL-merket, lås opp rabatt",
    badgeApplied: "Merkrabatt anvendt",
    mostPopular: "Mest populær",
    perMonth: "/mnd",
    getStarted: "Kom i gang gratis",
    badgeInfoTitle: "Slik låser du opp merkrabatter",
    badgeInfoDesc: "Vis et merke i bunnteksten på nettstedet ditt. Alfred skanner bunnteksten din ved hver innsending."
  },
  badge: {
    kicker: "Vis på nettstedet ditt",
    title: "NOXEL Forge",
    titleAccent: "Merker",
    subtitle: "Kopier og lim inn et merke i bunnteksten på nettstedet ditt.",
    copy: "Kopier kode",
    copied: "Kopiert!",
    infoTitle: "Slik fungerer merkrabatter",
    infoDesc: "Plasser et merke i bunnteksten på nettstedet ditt, nettstedbredt. Alfred skanner bunnteksten din ved hver innsending. Sølv 10 %, Gull 15 %, Platina 20 %, Diamant 25 %."
  },
  cta: {
    kicker: "Klar til å smi?",
    title: "Bli med i NOXEL Forge",
    subtitle: "Begynn å bygge ditt verifiserte backlenkenettverk i dag."
  }
};

const so: ForgeTranslations = {
  nav: {
    submit: "Gudbi",
    dashboard: "Xarunta Xogta",
    pricing: "Qiimaha",
    badges: "Calaamadaha"
  },
  hero: {
    kicker: "NOXEL Forge - Nidaamka Isweydaarsiga Backlink",
    title: "Dhis",
    titleAccent: "awoortaada",
    subtitle: "Isweydaarso backlinks goobaha la xaqiijiyay ee Alfred shaandheeyay. Tayada la dammaanad qaaday, spam ma suurtogasho. Sii mid, hel mid.",
    ctaSubmit: "Gudbi goobteeyda",
    ctaDashboard: "Xarunteyda Xogta"
  },
  stats: {
    forgePoints: "Dhibcaha Forge",
    forgePointsDesc: "Ku kasbi dhibco isweydaarsiga kasta",
    giveOne: "Sii mid, hel mid",
    giveOneDesc: "Waxaad siisaa backlink, waxaadna heshaa mid kale",
    alfredFilters: "Shaandhaynta Alfred",
    alfredFiltersDesc: "Spam ma jiro, waxyaabo guud ah ma jiraan"
  },
  trust: {
    kicker: "Dhibcaha Kalsooni Forge",
    subtitle: "Goob kasta waxay hesheysaa dhibco ka mid ah 100 iyadoo ku saleysan 6 calaamadood oo tayo"
  },
  directory: {
    kicker: "Liiska",
    title: "Goobaha Forge ee La Xaqiijiyay",
    empty: "Liiska wuu madhan yahay hadda",
    emptyDesc: "Noqo kii ugu horreeyay ee goobtiisa gudbiyo.",
    loading: "Liiska waa la soo rarayo...",
    previous: "Hore",
    next: "Xiga"
  },
  submit: {
    alfredTitle: "Alfred wuxuu dib u eegaa gudbinta kasta",
    alfredDesc: "Gudbinta kasta waxaa baadha oo dib u eega Alfred ka hor daabacaadda. Tayada la dammaanad qaaday, spam ma suurtogasho.",
    urlLabel: "URL Goobta",
    urlHint: "HTTPS ayaa loo baahan yahay. Waa inay ka kooban tahay xiriir u socda noxelseo.com ama noxelforge.com",
    titleLabel: "Cinwaan",
    nicheLabel: "Goob gaar ah",
    descLabel: "Sharaxaad gaaban",
    contentLabel: "Waxa ugu weyn",
    contentHint: "ikhtiyaari, Alfred u caawiya falanqayn wanaagsan",
    submitBtn: "Gudbi NOXEL Forge",
    analyzing: "Waa la falanqaynayaa..."
  },
  pricing: {
    kicker: "Qiimaha NOXEL Forge",
    title: "Dhis",
    titleAccent: "shabakaddaada awooda",
    subtitle: "Soo bandhig calaamadda NOXEL goobtagaaga oo fur dhimisyo gaar ah gobol kasta.",
    monthly: "Bishiiba",
    annual: "Sanadlaha",
    badgeToggle: "Waxaan soo bandhigayaa calaamadda NOXEL, fur dhimista",
    badgeApplied: "Dhimista calaamadda la dabaqay",
    mostPopular: "Ugu caansan",
    perMonth: "/bil",
    getStarted: "Bilow bilaash",
    badgeInfoTitle: "Sida loo furo dhimisyada calaamadda",
    badgeInfoDesc: "Soo bandhig calaamad kasta footer goobtagaaga. Alfred wuxuu baadha footerkaaga gudbinta kasta."
  },
  badge: {
    kicker: "Ku soo bandhig goobtagaaga",
    title: "NOXEL Forge",
    titleAccent: "Calaamadaha",
    subtitle: "Koobi oo ku dhejiso calaamad kasta footer goobtagaaga.",
    copy: "Koobi qoraalka",
    copied: "La koobiyay!",
    infoTitle: "Sida dhimisyada calaamadda u shaqeeyaan",
    infoDesc: "Dhig calaamad kasta footer goobtagaaga, goob-dhammaan. Alfred wuxuu baadha footerkaaga gudbinta kasta. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Diyaar baad u tahay in aad dhisato?",
    title: "Ku biir NOXEL Forge",
    subtitle: "Bilow dhisida shabakaddaada backlink ee la xaqiijiyay maanta."
  }
};

const ay: ForgeTranslations = {
  nav: {
    submit: "Apanipxaña",
    dashboard: "Taqi ukar uñakipaña",
    pricing: "Chanipacha",
    badges: "Arkatanakapa"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Aynacha Jakawipacha",
    title: "Lurta",
    titleAccent: "kamachipa",
    subtitle: "Alfred katatañataki sint'ayata sitionakampiw backlink aynacha. Aliccha khuskhusitawa, spam jan utjirakiti. Mayni qu, mayni chuymata.",
    ctaSubmit: "Sitiojaru apanipaña",
    ctaDashboard: "Nayana Dashboard"
  },
  stats: {
    forgePoints: "Forge Puntunaka",
    forgePointsDesc: "Sapa aynacharuw puntu lurata",
    giveOne: "Mayni qu, mayni chuymata",
    giveOneDesc: "Mayni backlink qunsta, mayni kutipata",
    alfredFilters: "Alfred katatañanaka",
    alfredFiltersDesc: "Jan spam, jan irnaqawi katutaki"
  },
  trust: {
    kicker: "Iñnapachana Puntupacha Forge",
    subtitle: "Sapa sitiow 100 ukxaru puntu japxiwa 6 aliccha arst'awimpi"
  },
  directory: {
    kicker: "Directorio",
    title: "Sint'ayata Forge Sitionakapa",
    empty: "Directoriow kunasa janiw utjkiti kunanaktsti",
    emptyDesc: "Nayarakiw nayraqatax sitiomasti apanipaña.",
    loading: "Directorio kargayasiwa...",
    previous: "Nayra",
    next: "Kayuw"
  },
  submit: {
    alfredTitle: "Alfred sapa apaniptawi uñakipaña",
    alfredDesc: "Sapa apaniptawiw Alfred ukaw escaneyasiwa uñakipatarakiwa publicación nayraqatax. Aliccha khuskhusitawa, spam jan utjirakiti.",
    urlLabel: "Sition URL",
    urlHint: "HTTPS munatayna. noxelseo.com utji noxelforge.com ukar enlace jikxataña munatayna",
    titleLabel: "Sutipa",
    nicheLabel: "Nicho",
    descLabel: "Jisk'a utt'ayaña",
    contentLabel: "Nayr amuyupa",
    contentHint: "jan munaspa, Alfred suma uñakipañatakiw yanapxiwa",
    submitBtn: "NOXEL Forge ukaru apanipaña",
    analyzing: "Uñakipayasiwa..."
  },
  pricing: {
    kicker: "NOXEL Forge Chanipacha",
    title: "Lurta",
    titleAccent: "kamachi archimpi",
    subtitle: "NOXEL arkata sitiomastxa churta ukatx sapa nivelana exclusivo descuentonaka jikxatañataki.",
    monthly: "Sapa phaxsi",
    annual: "Sapa mara",
    badgeToggle: "NOXEL arkata churataxa, descuento jarkt'añataki",
    badgeApplied: "Arkata descuento luratayna",
    mostPopular: "Askiw mayt'ata",
    perMonth: "/phaxsi",
    getStarted: "Janiw chaninikiti qalltaña",
    badgeInfoTitle: "Kunjamasti arkata descuentonaka jarkt'aña",
    badgeInfoDesc: "Mayni arkata sitiomastxa footeraru churata. Alfred sapa apaniptawina footer ukar escaneyasiwa."
  },
  badge: {
    kicker: "Sitiomastxa churata",
    title: "NOXEL Forge",
    titleAccent: "Arkatanakapa",
    subtitle: "Mayni arkata copiyata sitiomastxa footeraru pegata.",
    copy: "Snippet copiyaña",
    copied: "Copiyatayna!",
    infoTitle: "Kunjamasti arkata descuentonaka lurasirixa",
    infoDesc: "Mayni arkata sitiomastxa footeraru churata, taqi paginanakana. Alfred sapa apaniptawina footer ukar escaneyasiwa. Plata 10%, Oro 15%, Platino 20%, Diamante 25%."
  },
  cta: {
    kicker: "Lurañataki wakicht'asktaxa?",
    title: "NOXEL Forge ukaru tantachisiña",
    subtitle: "Jichha sint'ayata backlink archimasti lurañataki qalltaña."
  }
};

const tl: ForgeTranslations = {
  nav: {
    submit: "Isumite",
    dashboard: "Dashboard",
    pricing: "Pagpepresyo",
    badges: "Mga Badge"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Exchange Ecosystem",
    title: "Ihubog ang iyong",
    titleAccent: "awtoridad",
    subtitle: "Mag-exchange ng mga backlink sa mga verified na site na sinala ni Alfred. Kalidad na garantisado, imposibleng may spam. Magbigay ng isa, makakuha ng isa.",
    ctaSubmit: "Isumite ang aking site",
    ctaDashboard: "Ang Aking Dashboard"
  },
  stats: {
    forgePoints: "Mga Forge Points",
    forgePointsDesc: "Kumita ng mga puntos sa bawat palitan",
    giveOne: "Magbigay ng isa, makakuha ng isa",
    giveOneDesc: "Magbibigay ka ng backlink, makakakuha ka ng isa pabalik",
    alfredFilters: "Mga filter ni Alfred",
    alfredFiltersDesc: "Zero spam, zero generic na nilalaman"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Ang bawat site ay tumatanggap ng iskor mula 100 batay sa 6 na signal ng kalidad"
  },
  directory: {
    kicker: "Direktoryo",
    title: "Mga Verified na Forge Site",
    empty: "Ang direktoryo ay walang laman sa ngayon",
    emptyDesc: "Maging una sa pagsumite ng iyong site.",
    loading: "Naglo-load ng direktoryo...",
    previous: "Nakaraan",
    next: "Susunod"
  },
  submit: {
    alfredTitle: "Sinusuri ni Alfred ang bawat submission",
    alfredDesc: "Ang bawat submission ay ini-scan at sinusuri ni Alfred bago i-publish. Kalidad na garantisado, imposibleng may spam.",
    urlLabel: "URL ng Site",
    urlHint: "Kailangan ng HTTPS. Dapat may link sa noxelseo.com o noxelforge.com",
    titleLabel: "Pamagat",
    nicheLabel: "Niche",
    descLabel: "Maikling paglalarawan",
    contentLabel: "Pangunahing nilalaman",
    contentHint: "opsyonal, nakakatulong kay Alfred na mas mapabuti ang pagsusuri",
    submitBtn: "Isumite sa NOXEL Forge",
    analyzing: "Sinusuri..."
  },
  pricing: {
    kicker: "NOXEL Forge Pagpepresyo",
    title: "Buuin ang iyong",
    titleAccent: "network ng awtoridad",
    subtitle: "Ipakita ang badge ng NOXEL sa iyong site at i-unlock ang mga eksklusibong diskwento sa bawat antas.",
    monthly: "Buwanan",
    annual: "Taunan",
    badgeToggle: "Ipinapakita ko ang badge ng NOXEL, i-unlock ang diskwento",
    badgeApplied: "Inilapat ang diskwento ng badge",
    mostPopular: "Pinaka-popular",
    perMonth: "/buwan",
    getStarted: "Magsimula nang libre",
    badgeInfoTitle: "Paano i-unlock ang mga diskwento ng badge",
    badgeInfoDesc: "Ipakita ang anumang badge sa footer ng iyong site. Ini-scan ni Alfred ang iyong footer sa bawat submission."
  },
  badge: {
    kicker: "Ipakita sa iyong site",
    title: "NOXEL Forge",
    titleAccent: "Mga Badge",
    subtitle: "Kopyahin at i-paste ang anumang badge sa footer ng iyong site.",
    copy: "Kopyahin ang snippet",
    copied: "Nakopya na!",
    infoTitle: "Paano gumagana ang mga diskwento ng badge",
    infoDesc: "Ilagay ang anumang badge sa footer ng iyong site, sa buong site. Ini-scan ni Alfred ang iyong footer sa bawat submission. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Handa nang mag-forge?",
    title: "Sumali sa NOXEL Forge",
    subtitle: "Simulan ang pagbuo ng iyong verified na backlink network ngayon."
  }
};

const lt: ForgeTranslations = {
  nav: {
    submit: "Pateikti",
    dashboard: "Valdymo skydelis",
    pricing: "Kainos",
    badges: "Ženkleliai"
  },
  hero: {
    kicker: "NOXEL Forge - Nuorodų mainų ekosistema",
    title: "Kurkite savo",
    titleAccent: "autoritetą",
    subtitle: "Keiskitės nuorodomis su Alfred patikrintais svetainėmis. Kokybė garantuota, šiukšlės neįmanomos. Duok vieną, gauk vieną.",
    ctaSubmit: "Pateikti savo svetainę",
    ctaDashboard: "Mano valdymo skydelis"
  },
  stats: {
    forgePoints: "Forge taškai",
    forgePointsDesc: "Uždirbkite taškų už kiekvieną mainus",
    giveOne: "Duok vieną, gauk vieną",
    giveOneDesc: "Jūs duodate nuorodą – gausite nuorodą atgal",
    alfredFilters: "Alfred filtrai",
    alfredFiltersDesc: "Jokio šlamšto, jokio bendrinio turinio"
  },
  trust: {
    kicker: "Pasitikėjimo balo kalykla",
    subtitle: "Kiekviena svetainė gauna balą iš 100, pagrįstą 6 kokybės signalais"
  },
  directory: {
    kicker: "Katalogas",
    title: "Patikrintos Forge svetainės",
    empty: "Katalogas kol kas tuščias",
    emptyDesc: "Būkite pirmasis, pateikęs savo svetainę.",
    loading: "Katalogas kraunamas...",
    previous: "Ankstesnis",
    next: "Kitas"
  },
  submit: {
    alfredTitle: "Alfred peržiūri kiekvieną pateikimą",
    alfredDesc: "Kiekvienas pateikimas yra nuskanuojamas ir peržiūrimas Alfred prieš paskelbimą. Kokybė garantuota, šiukšlės neįmanomos.",
    urlLabel: "Svetainės URL",
    urlHint: "Reikalingas HTTPS. Turi būti nuoroda į noxelseo.com arba noxelforge.com",
    titleLabel: "Pavadinimas",
    nicheLabel: "Niša",
    descLabel: "Trumpas aprašymas",
    contentLabel: "Pagrindinis turinys",
    contentHint: "neprivaloma, padeda Alfred geriau analizuoti",
    submitBtn: "Pateikti į NOXEL Forge",
    analyzing: "Analizuojama..."
  },
  pricing: {
    kicker: "NOXEL Forge kainos",
    title: "Kurkite savo",
    titleAccent: "autoritetų tinklą",
    subtitle: "Rodykite NOXEL ženklelį savo svetainėje ir atrakinkite išskirtines nuolaidas kiekviename plane.",
    monthly: "Mėnesinis",
    annual: "Metinis",
    badgeToggle: "Rodau NOXEL ženklelį, atrakinu nuolaidą",
    badgeApplied: "Ženklelio nuolaida pritaikyta",
    mostPopular: "Populiariausias",
    perMonth: "/mėn",
    getStarted: "Pradėti nemokamai",
    badgeInfoTitle: "Kaip atrakinti ženklelio nuolaidas",
    badgeInfoDesc: "Rodykite bet kurį ženklelį savo svetainės poraštėje. Alfred nuskaito jūsų poraštę kiekvieno pateikimo metu."
  },
  badge: {
    kicker: "Rodykite savo svetainėje",
    title: "NOXEL Forge",
    titleAccent: "ženkleliai",
    subtitle: "Nukopijuokite ir įklijuokite bet kurį ženklelį į savo svetainės poraštę.",
    copy: "Kopijuoti kodą",
    copied: "Nukopijuota!",
    infoTitle: "Kaip veikia ženklelio nuolaidos",
    infoDesc: "Įdėkite bet kurį ženklelį į visos svetainės poraštę. Alfred nuskaito jūsų poraštę kiekvieno pateikimo metu. Sidabras 10%, Auksas 15%, Platina 20%, Deimantas 25%."
  },
  cta: {
    kicker: "Pasiruošę kurti?",
    title: "Prisijunkite prie NOXEL Forge",
    subtitle: "Pradėkite kurti savo patikrintą nuorodų tinklą jau šiandien."
  }
};

const kg: ForgeTranslations = {
  nav: {
    submit: "Tuma",
    dashboard: "Tableau ya bord",
    pricing: "Mitengo",
    badges: "Bibadge"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosisteme ya Kubadilishana Backlink",
    title: "Buka",
    titleAccent: "mamlaka yako",
    subtitle: "Badilishana backlink na masaiti yakinifu yaliyochujwa na Alfred. Ubora wahakikishwa, spam haiwezekani. Pana moja, pata moja.",
    ctaSubmit: "Tuma saiti yangu",
    ctaDashboard: "Tableau yangu ya bord"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Pata pointe kwa kila kubadilishana",
    giveOne: "Pana moja, pata moja",
    giveOneDesc: "Upana backlink moja, unapata moja",
    alfredFilters: "Alfred achuja",
    alfredFiltersDesc: "Spam zero, content ya kawaida zero"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Kila saiti ipata pointe kati ya 100 kulingana na alama 6 za ubora"
  },
  directory: {
    kicker: "Saraka",
    title: "Masaiti Yakinifu ya Forge",
    empty: "Saraka i tupu sasa hivi",
    emptyDesc: "Kuwa wa kwanza kutuma saiti yako.",
    loading: "Kupakia saraka...",
    previous: "Iliyotangulia",
    next: "Inayofuata"
  },
  submit: {
    alfredTitle: "Alfred akagua kila uwasilishaji",
    alfredDesc: "Kila uwasilishaji uchunguzwa na kukaguliwa na Alfred kabla ya kuchapishwa. Ubora wahakikishwa, spam haiwezekani.",
    urlLabel: "URL ya Saiti",
    urlHint: "HTTPS inahitajika. Lazima iwe na kiungo cha noxelseo.com au noxelforge.com",
    titleLabel: "Kichwa",
    nicheLabel: "Niche",
    descLabel: "Maelezo mafupi",
    contentLabel: "Maudhui makuu",
    contentHint: "si lazima, inasaidia Alfred kuchambua vizuri zaidi",
    submitBtn: "Tuma kwa NOXEL Forge",
    analyzing: "Inachambua..."
  },
  pricing: {
    kicker: "Mitengo ya NOXEL Forge",
    title: "Jenga",
    titleAccent: "mtandao wa mamlaka yako",
    subtitle: "Onyesha badge ya NOXEL kwenye saiti yako na fungua punguzo maalum kwa kila ngazi.",
    monthly: "Kila mwezi",
    annual: "Kila mwaka",
    badgeToggle: "Naonyesha badge ya NOXEL, fungua punguzo",
    badgeApplied: "Punguzo la badge limetumika",
    mostPopular: "Maarufu zaidi",
    perMonth: "/mwezi",
    getStarted: "Anza bure",
    badgeInfoTitle: "Jinsi ya kufungua punguzo za badge",
    badgeInfoDesc: "Onyesha badge yoyote kwenye footer ya saiti yako. Alfred achunguza footer yako kwa kila uwasilishaji."
  },
  badge: {
    kicker: "Onyesha kwenye saiti yako",
    title: "NOXEL Forge",
    titleAccent: "Bibadge",
    subtitle: "Nakili na ubandike badge yoyote kwenye footer ya saiti yako.",
    copy: "Nakili kipande",
    copied: "Imenakiliwa!",
    infoTitle: "Jinsi punguzo za badge zinavyofanya kazi",
    infoDesc: "Weka badge yoyote kwenye footer ya saiti yako, kote kwenye saiti. Alfred achunguza footer yako kwa kila uwasilishaji. Fedha 10%, Dhahabu 15%, Platini 20%, Almasi 25%."
  },
  cta: {
    kicker: "Uko tayari kutengeneza?",
    title: "Jiunge na NOXEL Forge",
    subtitle: "Anza kujenga mtandao wako wa backlink yakinifu leo."
  }
};

const gv: ForgeTranslations = {
  nav: {
    submit: "Cur stiagh",
    dashboard: "Daahboard",
    pricing: "Priceil",
    badges: "Badgeyn"
  },
  hero: {
    kicker: "NOXEL Forge - Ecosystem Coonrey Backlink",
    title: "Jeant dty",
    titleAccent: "ughthassys",
    subtitle: "Coonrey backlinkaghyn lesh ynnydyn prowalit er nyn lhiggey liorish Alfred. Caaill garantit, spam neu-phossible. Cur fer, fow fer.",
    ctaSubmit: "Cur stiagh my ynnyd",
    ctaDashboard: "My Daahboard"
  },
  stats: {
    forgePoints: "Pointyn Forge",
    forgePointsDesc: "Cosne pointyn er dy chooilley coonrey",
    giveOne: "Cur fer, fow fer",
    giveOneDesc: "T'ou cur backlink, t'ou geddyn fer erash",
    alfredFilters: "Seetyn Alfred",
    alfredFiltersDesc: "Spam erbee, cummey coontyssagh erbee"
  },
  trust: {
    kicker: "Forge Scor Treishteil",
    subtitle: "Ta dy chooilley ynnyd geddyn scor ass 100 er y steat jeh 6 cowraghyn caaill"
  },
  directory: {
    kicker: "Lioarlann",
    title: "Ynnydyn Forge Prowalit",
    empty: "Ta'n lioarlann follym ec y traa t'ayn",
    emptyDesc: "Bee yn chied fer dy chur stiagh dty ynnyd.",
    loading: "Kiartaghey lioarlann...",
    previous: "Roie",
    next: "Nah"
  },
  submit: {
    alfredTitle: "Alfred scrutaghey dy chooilley chur-stiagh",
    alfredDesc: "Ta dy chooilley chur-stiagh er ny scrutaghey as er ny houghtyn liorish Alfred roish foilshaghey. Caaill garantit, spam neu-phossible.",
    urlLabel: "URL Ynnyd",
    urlHint: "HTTPS ymmyrchagh. Shegin shen goaill link gys noxelseo.com ny noxelforge.com",
    titleLabel: "Heading",
    nicheLabel: "Reih-oayllys",
    descLabel: "Myn-insh giare",
    contentLabel: "Ard-chooid",
    contentHint: "reiht, cooney lesh Alfred jannoo bun-ronsaghey ny share",
    submitBtn: "Cur stiagh gys NOXEL Forge",
    analyzing: "Scrutaghey..."
  },
  pricing: {
    kicker: "Priceil NOXEL Forge",
    title: "Trog dty",
    titleAccent: "lieen ughthassys",
    subtitle: "Soilshee badge NOXEL er dty ynnyd as feddyn lhiasaghyn ry-lhiassaghey er dy chooilley chast.",
    monthly: "Meeagh",
    annual: "Bleeanagh",
    badgeToggle: "Ta mee soilshaghey badge NOXEL, feddyn lhiastey",
    badgeApplied: "Lhiastey badge currit cour",
    mostPopular: "Smoo soit",
    perMonth: "/mee",
    getStarted: "Toshiaght seose nastee",
    badgeInfoTitle: "Kys dy reayll lhiasteyghyn badge",
    badgeInfoDesc: "Soilshee badge erbee ayns bun-choshee dty ynnyd. Ta Alfred scrutaghey dty vun-choshee er dy chooilley chur-stiagh."
  },
  badge: {
    kicker: "Soilshee er dty ynnyd",
    title: "NOXEL Forge",
    titleAccent: "Badgeyn",
    subtitle: "Coip as cur stiagh badge erbee ayns bun-choshee dty ynnyd.",
    copy: "Coip myr-shen",
    copied: "Coopit!",
    infoTitle: "Kys ta lhiasteyghyn badge gobbraghey",
    infoDesc: "Soilshee badge erbee ayns bun-choshee dty ynnyd, er feie yn ynnyd. Ta Alfred scrutaghey dty vun-choshee er dy chooilley chur-stiagh. Argid 10%, Airh 15%, Platinum 20%, Daoimyn 25%."
  },
  cta: {
    kicker: "Aarloo dy jeant?",
    title: "Gow ayrn ayns NOXEL Forge",
    subtitle: "Toshiaght troggal dty lieen backlink prowalit jiu."
  }
};

const qu: ForgeTranslations = {
  nav: {
    submit: "Apaykuy",
    dashboard: "Kamachiy panqa",
    pricing: "Chanin",
    badges: "Señalkuna"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Aynaynin Ecosystem",
    title: "Ruway kikiyki",
    titleAccent: "autoridad",
    subtitle: "Aynaykuy backlinkkunata Alfred llajtachiski sitiokunawan. Kalidad suyasqa, spam mana atikuqchu. Huqta quy, huqta chasqiy.",
    ctaSubmit: "Sitionta apaykuy",
    ctaDashboard: "Ñuqa kamachiy panqay"
  },
  stats: {
    forgePoints: "Forge Puntokuna",
    forgePointsDesc: "Sapa aynaynimpi puntokunayta huñuy",
    giveOne: "Huqta quy, huqta chasqiy",
    giveOneDesc: "Huq backlink qunki, huqtam chasqinki",
    alfredFilters: "Alfred llajtachiski",
    alfredFiltersDesc: "Mana spam, mana sapan contenido"
  },
  trust: {
    kicker: "Siq'i Qillqa Forge",
    subtitle: "Sapa sitio 100 puntomanta qillqata chasqin 6 kallpa señalkunapi"
  },
  directory: {
    kicker: "Directorio",
    title: "Llajtasqa Forge Sitiokuna",
    empty: "Directorio kunanqa ch'usaqmi",
    emptyDesc: "Ñawpaqpi sitionkita apaykuy.",
    loading: "Directorio kargakuchkan...",
    previous: "Ñawpaq",
    next: "Qhepa"
  },
  submit: {
    alfredTitle: "Alfred sapa apaykuyta qhaway",
    alfredDesc: "Sapa apaykuy Alfred nisqanwan llajtasqam publicacionpa ñawpaqin. Kalidad suyasqa, spam mana atikuqchu.",
    urlLabel: "Sitio URL",
    urlHint: "HTTPS munasqa. noxelseo.com utaq noxelforge.com nisqaman watanakuy tiyanampuni",
    titleLabel: "Suti",
    nicheLabel: "Nicho",
    descLabel: "Pichqa willakuy",
    contentLabel: "Hatun contenido",
    contentHint: "mana munasqachu, Alfred aswan allinta qhaway atinampaq yanapan",
    submitBtn: "NOXEL Forge nisqaman apaykuy",
    analyzing: "Lliwmi qhawakuchkan..."
  },
  pricing: {
    kicker: "NOXEL Forge Chanin",
    title: "Ruway kikiyki",
    titleAccent: "autoridad red",
    subtitle: "NOXEL señalta sitionkipi rikuchiy ayllunmi sapa tipopin chanin allichaykukunata paschan.",
    monthly: "Killapi",
    annual: "Watapi",
    badgeToggle: "NOXEL señalta rikuchini, chanin allichayta paschaykuy",
    badgeApplied: "Señal chanin allichay churasqa",
    mostPopular: "Aswan reqsisqa",
    perMonth: "/killa",
    getStarted: "Qallariy mana chaniyuqta",
    badgeInfoTitle: "Imaynatas señal chanin allichayta paschanki",
    badgeInfoDesc: "Mayqen señaltapas sitionkip chawpinpi rikuchiy. Alfred sapa apaykuyllapiñataq chawpikita qhawan."
  },
  badge: {
    kicker: "Sitionkipi rikuchiy",
    title: "NOXEL Forge",
    titleAccent: "Señalkuna",
    subtitle: "Mayqen señaltapas sitionkip chawpinpi copiaykuy churankitaq.",
    copy: "Snippet copiaykuy",
    copied: "Copiastam!",
    infoTitle: "Imaynatan señal chanin allichay llank'an",
    infoDesc: "Mayqen señaltapas sitionkip chawpinpi churay, lliw panqakunapi. Alfred sapa apaykuyllapiñataq chawpikita qhawan. Qullqi 10%, Q'uri 15%, Platino 20%, Diamante 25%."
  },
  cta: {
    kicker: "Ruwanapaqchu?,",
    title: "NOXEL Forge nisqaman yapakuy",
    subtitle: "Kunanmi llajtasqa backlink redniykita ruwayta qallariy."
  }
};

const sq: ForgeTranslations = {
  nav: {
    submit: "Dërgo",
    dashboard: "Paneli",
    pricing: "Çmimet",
    badges: "Distinktivët"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistemi i Shkëmbimit të Backlink-ëve",
    title: "Forgo",
    titleAccent: "autoritetin tënd",
    subtitle: "Shkëmbe backlink-e me faqe të verifikuara të filtruara nga Alfred. Cilësia e garantuar, spam i pamundur. Jep një, merr një.",
    ctaSubmit: "Dërgo faqen time",
    ctaDashboard: "Paneli im"
  },
  stats: {
    forgePoints: "Pikët e Forge",
    forgePointsDesc: "Fito pikë me çdo shkëmbim",
    giveOne: "Jep një, merr një",
    giveOneDesc: "Jep një backlink, merr një mbrapsht",
    alfredFilters: "Filtrat e Alfred",
    alfredFiltersDesc: "Zero spam, zero përmbajtje gjenerike"
  },
  trust: {
    kicker: "Forge i Rezultatit të Besueshmërisë",
    subtitle: "Çdo faqe merr një rezultat nga 100 bazuar në 6 sinjale cilësie"
  },
  directory: {
    kicker: "Drejtoria",
    title: "Faqet e Verifikuara të Forge",
    empty: "Drejtoria është bosh për momentin",
    emptyDesc: "Bëhu i pari që dërgon faqen tënde.",
    loading: "Po ngarkohet drejtoria...",
    previous: "E mëparshme",
    next: "Tjetra"
  },
  submit: {
    alfredTitle: "Alfred shqyrton çdo dërgim",
    alfredDesc: "Çdo dërgim skanohет dhe shqyrtohet nga Alfred para publikimit. Cilësia e garantuar, spam i pamundur.",
    urlLabel: "URL-ja e faqes",
    urlHint: "HTTPS kërkohet. Duhet të përmbajë një lidhje me noxelseo.com ose noxelforge.com",
    titleLabel: "Titulli",
    nicheLabel: "Nisha",
    descLabel: "Përshkrim i shkurtër",
    contentLabel: "Përmbajtja kryesore",
    contentHint: "opsionale, ndihmon Alfred të analizojë më mirë",
    submitBtn: "Dërgo në NOXEL Forge",
    analyzing: "Po analizohet..."
  },
  pricing: {
    kicker: "Çmimet e NOXEL Forge",
    title: "Ndërto",
    titleAccent: "rrjetin tënd të autoritetit",
    subtitle: "Shfaq distinktivun NOXEL në faqen tënde dhe zhblloko zbritje ekskluzive në çdo nivel.",
    monthly: "Mujore",
    annual: "Vjetore",
    badgeToggle: "E shfaq distinktivun NOXEL, zhblloko zbritjen",
    badgeApplied: "Zbritja e distinktivit u aplikua",
    mostPopular: "Më i popullarizuar",
    perMonth: "/muaj",
    getStarted: "Fillo falas",
    badgeInfoTitle: "Si të zhbllokosh zbritjet e distinktivit",
    badgeInfoDesc: "Shfaq çdo distinktiv në fund të faqes tënde. Alfred skanon fundin e faqes tënde me çdo dërgim."
  },
  badge: {
    kicker: "Shfaq në faqen tënde",
    title: "NOXEL Forge",
    titleAccent: "Distinktivët",
    subtitle: "Kopjo dhe ngjit çdo distinktiv në fundin e faqes tënde.",
    copy: "Kopjo fragmentin",
    copied: "U kopjua!",
    infoTitle: "Si funksionojnë zbritjet e distinktivit",
    infoDesc: "Vendos çdo distinktiv në fundin e faqes tënde, në të gjithë faqen. Alfred skanon fundin e faqes tënde me çdo dërgim. Argjend 10%, Ar 15%, Platinë 20%, Diamant 25%."
  },
  cta: {
    kicker: "Gati të forgoing?",
    title: "Bashkohu me NOXEL Forge",
    subtitle: "Fillo të ndërtosh rrjetin tënd të verifikuar të backlink-ëve sot."
  }
};

const az: ForgeTranslations = {
  nav: {
    submit: "Təqdim et",
    dashboard: "İdarə paneli",
    pricing: "Qiymətlər",
    badges: "Nişanlar"
  },
  hero: {
    kicker: "NOXEL Forge - Backlinklərin Mübadiləsi Ekosistemi",
    title: "Avtoritetinizi",
    titleAccent: "formalaşdırın",
    subtitle: "Alfred tərəfindən filtrlənmiş yoxlanılmış saytlarla backlinkləri mübadilə edin. Keyfiyyət təmin edilir, spam mümkün deyil. Birini ver, birini al.",
    ctaSubmit: "Saytımı təqdim et",
    ctaDashboard: "Mənim İdarə panelim"
  },
  stats: {
    forgePoints: "Forge Xalları",
    forgePointsDesc: "Hər mübadilədə xal qazanın",
    giveOne: "Birini ver, birini al",
    giveOneDesc: "Bir backlink verirsiniz, bir backlink alırsınız",
    alfredFilters: "Alfred filtrləri",
    alfredFiltersDesc: "Sıfır spam, sıfır ümumi məzmun"
  },
  trust: {
    kicker: "Etibar Skoru Forması",
    subtitle: "Hər sayt 6 keyfiyyət siqnalına əsasən 100 üzərindən bal alır"
  },
  directory: {
    kicker: "Kataloq",
    title: "Yoxlanılmış Forge Saytları",
    empty: "Kataloq hələlik boşdur",
    emptyDesc: "Saytınızı ilk təqdim edən siz olun.",
    loading: "Kataloq yüklənir...",
    previous: "Əvvəlki",
    next: "Növbəti"
  },
  submit: {
    alfredTitle: "Alfred hər təqdimetməni nəzərdən keçirir",
    alfredDesc: "Hər təqdimetmə nəşrdən əvvəl Alfred tərəfindən skan edilir və nəzərdən keçirilir. Keyfiyyət təmin edilir, spam mümkün deyil.",
    urlLabel: "Sayt URL-i",
    urlHint: "HTTPS tələb olunur. noxelseo.com və ya noxelforge.com-a keçid olmalıdır",
    titleLabel: "Başlıq",
    nicheLabel: "Niş",
    descLabel: "Qısa təsvir",
    contentLabel: "Əsas məzmun",
    contentHint: "isteğe bağlı, Alfred-in daha yaxşı təhlil etməsinə kömək edir",
    submitBtn: "NOXEL Forge-a təqdim et",
    analyzing: "Təhlil edilir..."
  },
  pricing: {
    kicker: "NOXEL Forge Qiymətləri",
    title: "Avtoritet",
    titleAccent: "şəbəkənizi qurun",
    subtitle: "Saytınızda NOXEL nişanını nümayiş etdirin və hər səviyyədə eksklüziv endirimlərin kilidini açın.",
    monthly: "Aylıq",
    annual: "İllik",
    badgeToggle: "NOXEL nişanını nümayiş etdirirəm, endirimi açın",
    badgeApplied: "Nişan endirimi tətbiq edildi",
    mostPopular: "Ən populyar",
    perMonth: "/ay",
    getStarted: "Pulsuz başlayın",
    badgeInfoTitle: "Nişan endiriminin kilidini necə açmaq olar",
    badgeInfoDesc: "Saytınızın altbilgisindəki istənilən nişanı nümayiş etdirin. Alfred hər təqdimetmədə altbilginizi skan edir."
  },
  badge: {
    kicker: "Saytınızda nümayiş etdirin",
    title: "NOXEL Forge",
    titleAccent: "Nişanları",
    subtitle: "İstənilən nişanı saytınızın altbilgisinə kopyalayıb yapışdırın.",
    copy: "Kodu kopyala",
    copied: "Kopyalandı!",
    infoTitle: "Nişan endirimlərinin işləmə prinsipi",
    infoDesc: "İstənilən nişanı saytınızın altbilgisinə, sayt genişliyinə yerləşdirin. Alfred hər təqdimetmədə altbilginizi skan edir. Gümüş 10%, Qızıl 15%, Platin 20%, Almaz 25%."
  },
  cta: {
    kicker: "Formalaşdırmağa hazırsınız?",
    title: "NOXEL Forge-a qoşulun",
    subtitle: "Bu gün yoxlanılmış backlink şəbəkənizi qurmağa başlayın."
  }
};

const nd: ForgeTranslations = {
  nav: {
    submit: "Thumela",
    dashboard: "Ibhodi lokuphatha",
    pricing: "Amanani",
    badges: "Izibaxa"
  },
  hero: {
    kicker: "NOXEL Forge - Indawo yokushintshanisa izikhonkwane",
    title: "Akha",
    titleAccent: "igunya lakho",
    subtitle: "Shintshanisa izikhonkwane nezizinda eziqinisekisiwe ezihlaziywa ngu-Alfred. Ikhwalithi iqinisekisiwe, uSPAM kawukwenzeki. Nika elinye, thola elinye.",
    ctaSubmit: "Thumela isizinda sami",
    ctaDashboard: "Ibhodi lami lokuphatha"
  },
  stats: {
    forgePoints: "Amaphuzu e-Forge",
    forgePointsDesc: "Hola amaphuzu kuyo yonke imishintshi",
    giveOne: "Nika elinye, thola elinye",
    giveOneDesc: "Unika ikhonkwane, uthola elinye",
    alfredFilters: "Izihluzi zika-Alfred",
    alfredFiltersDesc: "Akukho spam, akukho okuqukethwe okuvamileyo"
  },
  trust: {
    kicker: "Isikali sokuThembeka se-Forge",
    subtitle: "Isizinda ngasinye sithola inombolo kusuka ku-100 ngokusekelwe ezimpawini eziyisithupha zekhwalithi"
  },
  directory: {
    kicker: "Uhlu lwezizinda",
    title: "Izizinda ze-Forge eziQinisekisiwe",
    empty: "Uhlu luzithulele okwamanje",
    emptyDesc: "Yiba owokuqala ukuthumela isizinda sakho.",
    loading: "Iyalayisha uhlu lwezizinda...",
    previous: "Okwangaphambili",
    next: "Okulandelayo"
  },
  submit: {
    alfredTitle: "Alfred uhlaziya sonke isithumelo",
    alfredDesc: "Sonke isithumelo sihlolwa futhi sihlaziywe ngu-Alfred ngaphambi kokushicilelwa. Ikhwalithi iqinisekisiwe, uSPAM kawukwenzeki.",
    urlLabel: "I-URL yesizinda",
    urlHint: "I-HTTPS iyadingeka. Kufanele iqukethe ikhonkwane eliya ku-noxelseo.com noma ku-noxelforge.com",
    titleLabel: "Isihloko",
    nicheLabel: "Umkhakha",
    descLabel: "Incazelo emfitshane",
    contentLabel: "Okuqukethwe okuyinhloko",
    contentHint: "akudingangi, kusiza u-Alfred ukuhlaziya kangcono",
    submitBtn: "Thumela ku-NOXEL Forge",
    analyzing: "Iyahlaziya..."
  },
  pricing: {
    kicker: "Amanani e-NOXEL Forge",
    title: "Akha",
    titleAccent: "inethiwekhi yegunya lakho",
    subtitle: "Bonisa ibheji le-NOXEL esizindeni sakho futhi uvule izaphulelo ezikhethekile kumazinga onke.",
    monthly: "Inyanga nenyanga",
    annual: "Ngomnyaka",
    badgeToggle: "Ngibonisa ibheji le-NOXEL, vula isaphulelo",
    badgeApplied: "Isaphulelo sebheji sisetshenzisiwe",
    mostPopular: "Ethandwa kakhulu",
    perMonth: "/inyanga",
    getStarted: "Qala mahala",
    badgeInfoTitle: "Indlela yokuvula izaphulelo zebheji",
    badgeInfoDesc: "Bonisa noma iyiphi ibheji okhoneni wesizinda sakho. U-Alfred uhlola ukhoneni wakho kuyo yonke isithumelo."
  },
  badge: {
    kicker: "Bonisa esizindeni sakho",
    title: "NOXEL Forge",
    titleAccent: "Izibaxa",
    subtitle: "Kopisha bese ubeka noma iyiphi ibheji okhoneni wesizinda sakho.",
    copy: "Kopisha ingxenye yekodi",
    copied: "Ikopishiwe!",
    infoTitle: "Indlela izaphulelo zebheji ezisebenza ngayo",
    infoDesc: "Beka noma iyiphi ibheji okhoneni wesizinda sakho, kuyo yonke ikhasi. U-Alfred uhlola ukhoneni wakho kuyo yonke isithumelo. Isiliva 10%, Igolide 15%, Iplathinamu 20%, Idayimane 25%."
  },
  cta: {
    kicker: "Ulungele ukwakha?",
    title: "Joyina i-NOXEL Forge",
    subtitle: "Qala ukwakha inethiwekhi yakho yezikhonkwane eziQinisekisiwe namuhla."
  }
};

const lu: ForgeTranslations = {
  nav: {
    submit: "Tuma",
    dashboard: "Tableau de bord",
    pricing: "Mitengo",
    badges: "Bilauri"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosisteme ya Kubadilishana Viungo",
    title: "Jenga",
    titleAccent: "mamlaka yako",
    subtitle: "Badilishana viungo na tovuti zilizothibitishwa zilizochujwa na Alfred. Ubora umehakikishwa, taka haiwezekani. Toa kimoja, pata kimoja.",
    ctaSubmit: "Tuma tovuti yangu",
    ctaDashboard: "Dashibodi yangu"
  },
  stats: {
    forgePoints: "Pointe za Forge",
    forgePointsDesc: "Pata pointe kwa kila ubadilishano",
    giveOne: "Toa kimoja, pata kimoja",
    giveOneDesc: "Unatoa kiungo, unapata kimoja kurudi",
    alfredFilters: "Alfred achuja",
    alfredFiltersDesc: "Hapana taka, hapana maudhui ya kawaida"
  },
  trust: {
    kicker: "Alama ya Uaminifu wa Forge",
    subtitle: "Kila tovuti inapata alama kati ya 100 kulingana na ishara 6 za ubora"
  },
  directory: {
    kicker: "Saraka",
    title: "Tovuti za Forge Zilizothibitishwa",
    empty: "Saraka iko tupu kwa sasa",
    emptyDesc: "Kuwa wa kwanza kutuma tovuti yako.",
    loading: "Inapakia saraka...",
    previous: "Iliyotangulia",
    next: "Inayofuata"
  },
  submit: {
    alfredTitle: "Alfred anakagua kila uwasilishaji",
    alfredDesc: "Kila uwasilishaji unaskanishwa na kukaguliwa na Alfred kabla ya kuchapishwa. Ubora umehakikishwa, taka haiwezekani.",
    urlLabel: "URL ya Tovuti",
    urlHint: "HTTPS inahitajika. Lazima iwe na kiungo cha noxelseo.com au noxelforge.com",
    titleLabel: "Kichwa",
    nicheLabel: "Eneo maalum",
    descLabel: "Maelezo mafupi",
    contentLabel: "Maudhui makuu",
    contentHint: "si lazima, inasaidia Alfred kuchambua vizuri zaidi",
    submitBtn: "Tuma kwa NOXEL Forge",
    analyzing: "Inachambua..."
  },
  pricing: {
    kicker: "Bei za NOXEL Forge",
    title: "Jenga",
    titleAccent: "mtandao wako wa mamlaka",
    subtitle: "Onyesha beji ya NOXEL kwenye tovuti yako na ufungue punguzo la kipekee kwa kila ngazi.",
    monthly: "Kila mwezi",
    annual: "Kila mwaka",
    badgeToggle: "Ninaonyesha beji ya NOXEL, fungua punguzo",
    badgeApplied: "Punguzo la beji limetumika",
    mostPopular: "Maarufu zaidi",
    perMonth: "/mwezi",
    getStarted: "Anza bure",
    badgeInfoTitle: "Jinsi ya kufungua punguzo za beji",
    badgeInfoDesc: "Onyesha beji yoyote kwenye kijachini cha tovuti yako. Alfred anaskanisha kijachini chako kwa kila uwasilishaji."
  },
  badge: {
    kicker: "Onyesha kwenye tovuti yako",
    title: "NOXEL Forge",
    titleAccent: "Bilauri",
    subtitle: "Nakili na ubandike beji yoyote kwenye kijachini cha tovuti yako.",
    copy: "Nakili kipande",
    copied: "Imenakiliwa!",
    infoTitle: "Jinsi punguzo za beji zinavyofanya kazi",
    infoDesc: "Weka beji yoyote kwenye kijachini cha tovuti yako, kwa tovuti nzima. Alfred anaskanisha kijachini chako kwa kila uwasilishaji. Fedha 10%, Dhahabu 15%, Platinamu 20%, Almasi 25%."
  },
  cta: {
    kicker: "Uko tayari kuunda?",
    title: "Jiunge na NOXEL Forge",
    subtitle: "Anza kujenga mtandao wako wa viungo vilivyothibitishwa leo."
  }
};

const tn: ForgeTranslations = {
  nav: {
    submit: "Romela",
    dashboard: "Dashboard",
    pricing: "Ditheko",
    badges: "Dibetšo"
  },
  hero: {
    kicker: "NOXEL Forge - Tikologo ya Phetiso ya Backlink",
    title: "Bopa",
    titleAccent: "taolo ya gago",
    subtitle: "Fetisana ka ditshupo tsa backlink le disaete tse ikemetseng tse hlahlobiwa ke Alfred. Boleng bo netefadiwa, spam ga e kake ya nna teng. Naya e nngwe, bona e nngwe.",
    ctaSubmit: "Romela saete ya me",
    ctaDashboard: "Dashboard ya Me"
  },
  stats: {
    forgePoints: "Dipoyente tsa Forge",
    forgePointsDesc: "Huma dipoyente mo phetisong nngwe le nngwe",
    giveOne: "Naya e nngwe, bona e nngwe",
    giveOneDesc: "O naya backlink e nngwe, o bona e nngwe",
    alfredFilters: "Alfred o sisinta",
    alfredFiltersDesc: "Ga go spam, ga go diteng tse tlwaelegileng"
  },
  trust: {
    kicker: "Forge ya Sekao sa Tumelo",
    subtitle: "Saete nngwe le nngwe e amogela sekao se se fetang 100 go ya ka mabaka a a tshelela a boleng"
  },
  directory: {
    kicker: "Tlhagiso",
    title: "Disaete tsa Forge tse Netefaditsweng",
    empty: "Tlhagiso ga e na sepe gone jaanong",
    emptyDesc: "Nna wa ntlha go romela saete ya gago.",
    loading: "E a laola tlhagiso...",
    previous: "E e fetileng",
    next: "E e latelang"
  },
  submit: {
    alfredTitle: "Alfred o hlahloba kopo nngwe le nngwe",
    alfredDesc: "Kopo nngwe le nngwe e sekasekwa le go hlahlobiwa ke Alfred pele ga go phasaladiwa. Boleng bo netefadiwa, spam ga e kake ya nna teng.",
    urlLabel: "URL ya Saete",
    urlHint: "HTTPS e tlhokega. E tshwanetse go nna le kgolagano go noxelseo.com kgotsa noxelforge.com",
    titleLabel: "Tatelano",
    nicheLabel: "Seemo",
    descLabel: "Tlhaloso e khutshwane",
    contentLabel: "Diteng tse dikgolo",
    contentHint: "ga e a tlhokega, e thusa Alfred go sekaseka sentle",
    submitBtn: "Romela go NOXEL Forge",
    analyzing: "E a sekaseka..."
  },
  pricing: {
    kicker: "Ditheko tsa NOXEL Forge",
    title: "Aga",
    titleAccent: "netiweke ya taolo",
    subtitle: "Bontsha letshwao la NOXEL mo saeteng ya gago mme o bule phokotso e e ikgethileng mo segateng sengwe le sengwe.",
    monthly: "Kgwedi le kgwedi",
    annual: "Ngwaga le ngwaga",
    badgeToggle: "Ke bontsha letshwao la NOXEL, bula phokotso",
    badgeApplied: "Phokotso ya letshwao e dirilwe",
    mostPopular: "E ratwa thata",
    perMonth: "/kgwedi",
    getStarted: "Simolola mahala",
    badgeInfoTitle: "Tsela ya go bula diphokotso tsa letshwao",
    badgeInfoDesc: "Bontsha letshwao lefe kapa lefe mo footer ya saete ya gago. Alfred o sekaseka footer ya gago mo kopong nngwe le nngwe."
  },
  badge: {
    kicker: "Bontsha mo saeteng ya gago",
    title: "NOXEL Forge",
    titleAccent: "Dibetšo",
    subtitle: "Kopa le go kena letshwao lefe kapa lefe mo footer ya saete ya gago.",
    copy: "Kopa sengwe",
    copied: "Go kopiilwe!",
    infoTitle: "Diphokotso tsa letshwao di dira jang",
    infoDesc: "Baya letshwao lefe kapa lefe mo footer ya saete ya gago, go ralala saete yotlhe. Alfred o sekaseka footer ya gago mo kopong nngwe le nngwe. Silibera 10%, Gouta 15%, Platinamo 20%, Daemane 25%."
  },
  cta: {
    kicker: "O itokisitse go bopa?",
    title: "Tsena mo NOXEL Forge",
    subtitle: "Simolola go aga netiweke ya gago ya backlink e e netefaditsweng gompieno."
  }
};

const he: ForgeTranslations = {
  nav: {
    submit: "שלח",
    dashboard: "לוח בקרה",
    pricing: "תמחור",
    badges: "תגים"
  },
  hero: {
    kicker: "NOXEL Forge - מערכת אקוסיסטם להחלפת קישורים נכנסים",
    title: "זייף את",
    titleAccent: "הסמכות שלך",
    subtitle: "החלף קישורים נכנסים עם אתרים מאומתים שסוננו על ידי Alfred. איכות מובטחת, ספאם בלתי אפשרי. תן אחד, קבל אחד.",
    ctaSubmit: "שלח את האתר שלי",
    ctaDashboard: "לוח הבקרה שלי"
  },
  stats: {
    forgePoints: "נקודות Forge",
    forgePointsDesc: "צבור נקודות בכל החלפה",
    giveOne: "תן אחד, קבל אחד",
    giveOneDesc: "אתה נותן קישור נכנס, אתה מקבל אחד בחזרה",
    alfredFilters: "פילטרים של Alfred",
    alfredFiltersDesc: "אפס ספאם, אפס תוכן גנרי"
  },
  trust: {
    kicker: "ציון אמון Forge",
    subtitle: "כל אתר מקבל ציון מתוך 100 על בסיס 6 אותות איכות"
  },
  directory: {
    kicker: "ספרייה",
    title: "אתרי Forge מאומתים",
    empty: "הספרייה ריקה כרגע",
    emptyDesc: "היה הראשון לשלוח את האתר שלך.",
    loading: "טוען ספרייה...",
    previous: "הקודם",
    next: "הבא"
  },
  submit: {
    alfredTitle: "Alfred בודק כל הגשה",
    alfredDesc: "כל הגשה נסרקת ונבדקת על ידי Alfred לפני פרסום. איכות מובטחת, ספאם בלתי אפשרי.",
    urlLabel: "כתובת URL של האתר",
    urlHint: "נדרש HTTPS. חייב להכיל קישור ל-noxelseo.com או noxelforge.com",
    titleLabel: "כותרת",
    nicheLabel: "נישה",
    descLabel: "תיאור קצר",
    contentLabel: "תוכן ראשי",
    contentHint: "אופציונלי, עוזר ל-Alfred לנתח טוב יותר",
    submitBtn: "שלח ל-NOXEL Forge",
    analyzing: "מנתח..."
  },
  pricing: {
    kicker: "תמחור NOXEL Forge",
    title: "בנה את",
    titleAccent: "רשת הסמכות שלך",
    subtitle: "הצג את תג NOXEL באתרך ופתח הנחות בלעדיות בכל רמה.",
    monthly: "חודשי",
    annual: "שנתי",
    badgeToggle: "אני מציג את תג NOXEL, פתח הנחה",
    badgeApplied: "הנחת תג הוחלה",
    mostPopular: "הפופולרי ביותר",
    perMonth: "/חודש",
    getStarted: "התחל בחינם",
    badgeInfoTitle: "כיצד לפתוח הנחות תג",
    badgeInfoDesc: "הצג תג כלשהו בתחתית האתר שלך. Alfred סורק את התחתית שלך בכל הגשה."
  },
  badge: {
    kicker: "הצג באתרך",
    title: "NOXEL Forge",
    titleAccent: "תגים",
    subtitle: "העתק והדבק תג כלשהו בתחתית האתר שלך.",
    copy: "העתק קוד",
    copied: "הועתק!",
    infoTitle: "כיצד עובדות הנחות התג",
    infoDesc: "מקם תג כלשהו בתחתית האתר שלך, בכל רחבי האתר. Alfred סורק את התחתית שלך בכל הגשה. כסף 10%, זהב 15%, פלטינום 20%, יהלום 25%."
  },
  cta: {
    kicker: "מוכן לזייף?",
    title: "הצטרף ל-NOXEL Forge",
    subtitle: "התחל לבנות את רשת הקישורים הנכנסים המאומתת שלך היום."
  }
};

const kk: ForgeTranslations = {
  nav: {
    submit: "Жіберу",
    dashboard: "Басқару тақтасы",
    pricing: "Бағалар",
    badges: "Белгілер"
  },
  hero: {
    kicker: "NOXEL Forge - Кері сілтеме алмасу экожүйесі",
    title: "Өз",
    titleAccent: "беделіңізді қалыптастырыңыз",
    subtitle: "Alfred сүзген тексерілген сайттармен кері сілтемелер алмасыңыз. Сапа кепілдендірілген, спам мүмкін емес. Біреуін беріңіз, біреуін алыңыз.",
    ctaSubmit: "Сайтымды жіберу",
    ctaDashboard: "Менің басқару тақтам"
  },
  stats: {
    forgePoints: "Forge ұпайлары",
    forgePointsDesc: "Әр алмасуда ұпай жинаңыз",
    giveOne: "Біреуін беріңіз, біреуін алыңыз",
    giveOneDesc: "Сіз кері сілтеме бересіз, бір кері сілтеме аласыз",
    alfredFilters: "Alfred сүзгілері",
    alfredFiltersDesc: "Нөл спам, нөл жалпы мазмұн"
  },
  trust: {
    kicker: "Сенім ұпайын қалыптастыру",
    subtitle: "Әр сайт 6 сапа сигналы негізінде 100 ұпайдан баға алады"
  },
  directory: {
    kicker: "Каталог",
    title: "Тексерілген Forge сайттары",
    empty: "Каталог әзірше бос",
    emptyDesc: "Сайтыңызды бірінші болып жіберіңіз.",
    loading: "Каталог жүктелуде...",
    previous: "Алдыңғы",
    next: "Келесі"
  },
  submit: {
    alfredTitle: "Alfred әр жіберілімді қарайды",
    alfredDesc: "Әр жіберілім жарияланбас бұрын Alfred тарапынан сканерленіп тексеріледі. Сапа кепілдендірілген, спам мүмкін емес.",
    urlLabel: "Сайт URL мекенжайы",
    urlHint: "HTTPS қажет. noxelseo.com немесе noxelforge.com сілтемесі болуы тиіс",
    titleLabel: "Тақырып",
    nicheLabel: "Тақырыптық бағыт",
    descLabel: "Қысқаша сипаттама",
    contentLabel: "Негізгі мазмұн",
    contentHint: "міндетті емес, Alfred-ке жақсырақ талдауға көмектеседі",
    submitBtn: "NOXEL Forge-ке жіберу",
    analyzing: "Талданып жатыр..."
  },
  pricing: {
    kicker: "NOXEL Forge бағалары",
    title: "Өзіңіздің",
    titleAccent: "беделді желіңізді құрыңыз",
    subtitle: "Сайтыңызда NOXEL белгісін орналастырыңыз және әр деңгейде эксклюзивті жеңілдіктер алыңыз.",
    monthly: "Ай сайын",
    annual: "Жыл сайын",
    badgeToggle: "Мен NOXEL белгісін көрсетемін, жеңілдікті ашамын",
    badgeApplied: "Белгі жеңілдігі қолданылды",
    mostPopular: "Ең танымал",
    perMonth: "/ай",
    getStarted: "Тегін бастау",
    badgeInfoTitle: "Белгі жеңілдіктерін қалай ашуға болады",
    badgeInfoDesc: "Сайтыңыздың төменгі колонтитулында кез келген белгіні орналастырыңыз. Alfred әр жіберілімде төменгі колонтитулыңызды сканерлейді."
  },
  badge: {
    kicker: "Сайтыңызда орналастырыңыз",
    title: "NOXEL Forge",
    titleAccent: "Белгілері",
    subtitle: "Кез келген белгіні сайтыңыздың төменгі колонтитулына көшіріп қойыңыз.",
    copy: "Кодты көшіру",
    copied: "Көшірілді!",
    infoTitle: "Белгі жеңілдіктері қалай жұмыс істейді",
    infoDesc: "Кез келген белгіні сайтыңыздың барлық беттерінің төменгі колонтитулына орналастырыңыз. Alfred әр жіберілімде төменгі колонтитулыңызды сканерлейді. Күміс 10%, Алтын 15%, Платина 20%, Бриллиант 25%."
  },
  cta: {
    kicker: "Қалыптастыруға дайынсыз ба?",
    title: "NOXEL Forge-ке қосылыңыз",
    subtitle: "Бүгін тексерілген кері сілтеме желісін құруды бастаңыз."
  }
};

const sr: ForgeTranslations = {
  nav: {
    submit: "Pošalji",
    dashboard: "Kontrolna tabla",
    pricing: "Cene",
    badges: "Značke"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistem razmene backlinkova",
    title: "Iskujte svoj",
    titleAccent: "autoritet",
    subtitle: "Razmenjujte backlinkove sa verifikovanim sajtovima koje filtrira Alfred. Kvalitet zagarantovan, spam nemoguć. Daj jedan, dobij jedan.",
    ctaSubmit: "Pošalji moj sajt",
    ctaDashboard: "Moja kontrolna tabla"
  },
  stats: {
    forgePoints: "Forge Poeni",
    forgePointsDesc: "Zarađujte poene na svakoj razmeni",
    giveOne: "Daj jedan, dobij jedan",
    giveOneDesc: "Dajete backlink, dobijate jedan nazad",
    alfredFilters: "Alfred filteri",
    alfredFiltersDesc: "Nula spama, nula generičkog sadržaja"
  },
  trust: {
    kicker: "Kovanje ocene poverenja",
    subtitle: "Svaki sajt dobija ocenu od 100 na osnovu 6 signala kvaliteta"
  },
  directory: {
    kicker: "Direktorijum",
    title: "Verifikovani Forge sajtovi",
    empty: "Direktorijum je trenutno prazan",
    emptyDesc: "Budite prvi koji će poslati svoj sajt.",
    loading: "Učitavanje direktorijuma...",
    previous: "Prethodna",
    next: "Sledeća"
  },
  submit: {
    alfredTitle: "Alfred pregleda svaki unos",
    alfredDesc: "Svaki unos Alfred skenira i pregleda pre objavljivanja. Kvalitet zagarantovan, spam nemoguć.",
    urlLabel: "URL sajta",
    urlHint: "HTTPS obavezan. Mora sadržati link ka noxelseo.com ili noxelforge.com",
    titleLabel: "Naslov",
    nicheLabel: "Niša",
    descLabel: "Kratak opis",
    contentLabel: "Glavni sadržaj",
    contentHint: "opciono, pomaže Alfredu da bolje analizira",
    submitBtn: "Pošalji u NOXEL Forge",
    analyzing: "Analiziranje..."
  },
  pricing: {
    kicker: "NOXEL Forge cene",
    title: "Izgradite svoju",
    titleAccent: "mrežu autoriteta",
    subtitle: "Prikažite NOXEL značku na svom sajtu i otključajte ekskluzivne popuste na svakom nivou.",
    monthly: "Mesečno",
    annual: "Godišnje",
    badgeToggle: "Prikazujem NOXEL značku, otključavam popust",
    badgeApplied: "Popust za značku primenjen",
    mostPopular: "Najpopularnije",
    perMonth: "/mes",
    getStarted: "Počnite besplatno",
    badgeInfoTitle: "Kako otključati popuste za značku",
    badgeInfoDesc: "Prikažite bilo koju značku u podnožju svog sajta. Alfred skenira vaše podnožje pri svakom slanju."
  },
  badge: {
    kicker: "Prikažite na svom sajtu",
    title: "NOXEL Forge",
    titleAccent: "Značke",
    subtitle: "Kopirajte i nalepite bilo koju značku u podnožje svog sajta.",
    copy: "Kopiraj kod",
    copied: "Kopirano!",
    infoTitle: "Kako funkcionišu popusti za značke",
    infoDesc: "Postavite bilo koju značku u podnožje svog sajta, na svim stranicama. Alfred skenira vaše podnožje pri svakom slanju. Srebro 10%, Zlato 15%, Platina 20%, Dijamant 25%."
  },
  cta: {
    kicker: "Spremni za kovanje?",
    title: "Pridružite se NOXEL Forge",
    subtitle: "Počnite danas da gradite svoju verifikovanu mrežu backlinkova."
  }
};

const rn: ForgeTranslations = {
  nav: {
    submit: "Ohereza",
    dashboard: "Ikibaho",
    pricing: "Ibiciro",
    badges: "Ibimenyetso"
  },
  hero: {
    kicker: "NOXEL Forge - Uburyo bwo guhana amalink",
    title: "Ubake",
    titleAccent: "ububasha bwawe",
    subtitle: "Hana amalink na za site zemejwe zisuzumwa na Alfred. Ubuziranenge bwishingiwe, spam ntishoboka. Tanga rimwe, ubone rimwe.",
    ctaSubmit: "Ohereza site yanje",
    ctaDashboard: "Ikibaho cyanje"
  },
  stats: {
    forgePoints: "Amanota ya Forge",
    forgePointsDesc: "Ungura amanota ku guhana kuri buri gihe",
    giveOne: "Tanga rimwe, ubone rimwe",
    giveOneDesc: "Utanga link imwe, uhabwa link imwe",
    alfredFilters: "Isuzuma rya Alfred",
    alfredFiltersDesc: "Nta spam, nta bishingiye"
  },
  trust: {
    kicker: "Forge y'Amanota y'Icizere",
    subtitle: "Buri site ihabwa amanota kuri 100 bishingiye ku bimenyetso 6 by'ubuziranenge"
  },
  directory: {
    kicker: "Ububiko",
    title: "Za Site Zemejwe za Forge",
    empty: "Ububiko buracyuzuye none",
    emptyDesc: "Banza wohereze site yawe.",
    loading: "Gushakura ububiko...",
    previous: "Ibanza",
    next: "Ikurikira"
  },
  submit: {
    alfredTitle: "Alfred asuzuma buri gusabwa",
    alfredDesc: "Buri gusabwa gusuzumwa kandi gipimwa na Alfred mbere yo gutangazwa. Ubuziranenge bwishingiwe, spam ntishoboka.",
    urlLabel: "Aderesi ya Site",
    urlHint: "HTTPS irakenewe. Igomba gutunga link ija kuri noxelseo.com cg noxelforge.com",
    titleLabel: "Umutwe",
    nicheLabel: "Icyiciro",
    descLabel: "Ibisobanuro bigufi",
    contentLabel: "Ibiri mu nyandiko",
    contentHint: "si ngombwa, bifasha Alfred gusesengura neza",
    submitBtn: "Ohereza kuri NOXEL Forge",
    analyzing: "Gusesengura..."
  },
  pricing: {
    kicker: "Ibiciro bya NOXEL Forge",
    title: "Ubake",
    titleAccent: "urwego rwawe rw'ububasha",
    subtitle: "Erekana ikimenyetso cya NOXEL ku site yawe ubone amangarike y'umwihariko ku rwego ruri rwose.",
    monthly: "Ukwezi",
    annual: "Umwaka",
    badgeToggle: "Nerekanye ikimenyetso cya NOXEL, fungura amangarike",
    badgeApplied: "Amangarike y'ikimenyetso yakozwe",
    mostPopular: "Ikunda cyane",
    perMonth: "/uk.",
    getStarted: "Tangira ubuntu",
    badgeInfoTitle: "Uburyo bwo fungura amangarike y'ikimenyetso",
    badgeInfoDesc: "Erekana ikimenyetso icyo aricyo cyose mu footer ya site yawe. Alfred asuzuma footer yawe ku gusabwa kuri buri gihe."
  },
  badge: {
    kicker: "Erekana ku site yawe",
    title: "NOXEL Forge",
    titleAccent: "Ibimenyetso",
    subtitle: "Kopi hanyuma wishyire ikimenyetso icyo aricyo cyose mu footer ya site yawe.",
    copy: "Kopi kode",
    copied: "Yakopwe!",
    infoTitle: "Uburyo amangarike y'ibimenyetso akora",
    infoDesc: "Shyira ikimenyetso icyo aricyo cyose mu footer ya site yawe, ku paji zose. Alfred asuzuma footer yawe ku gusabwa kuri buri gihe. Ifeza 10%, Zahabu 15%, Platine 20%, Diamant 25%."
  },
  cta: {
    kicker: "Witeguye kubaka?",
    title: "Injira muri NOXEL Forge",
    subtitle: "Tangira kubaka urwego rwawe rw'amalink yemejwe uyu munsi."
  }
};

const el: ForgeTranslations = {
  nav: {
    submit: "Υποβολή",
    dashboard: "Πίνακας Ελέγχου",
    pricing: "Τιμολόγηση",
    badges: "Σήματα"
  },
  hero: {
    kicker: "NOXEL Forge - Οικοσύστημα Ανταλλαγής Backlink",
    title: "Σφυρηλάτησε την",
    titleAccent: "αυθεντία σου",
    subtitle: "Ανταλλάξτε backlinks με επαληθευμένους ιστότοπους φιλτραρισμένους από τον Alfred. Εγγυημένη ποιότητα, το spam είναι αδύνατο. Δώσε ένα, πάρε ένα.",
    ctaSubmit: "Υποβολή του ιστότοπού μου",
    ctaDashboard: "Ο Πίνακάς μου"
  },
  stats: {
    forgePoints: "Πόντοι Forge",
    forgePointsDesc: "Κερδίστε πόντους σε κάθε ανταλλαγή",
    giveOne: "Δώσε ένα, πάρε ένα",
    giveOneDesc: "Δίνεις ένα backlink, παίρνεις ένα πίσω",
    alfredFilters: "Φίλτρα Alfred",
    alfredFiltersDesc: "Μηδέν spam, μηδέν γενικό περιεχόμενο"
  },
  trust: {
    kicker: "Βαθμολογία Εμπιστοσύνης Forge",
    subtitle: "Κάθε ιστότοπος λαμβάνει βαθμολογία από το 100 βάσει 6 σημάτων ποιότητας"
  },
  directory: {
    kicker: "Κατάλογος",
    title: "Επαληθευμένοι Ιστότοποι Forge",
    empty: "Ο κατάλογος είναι προς το παρόν κενός",
    emptyDesc: "Γίνε ο πρώτος που υποβάλλει τον ιστότοπό του.",
    loading: "Φόρτωση καταλόγου...",
    previous: "Προηγούμενο",
    next: "Επόμενο"
  },
  submit: {
    alfredTitle: "Ο Alfred εξετάζει κάθε υποβολή",
    alfredDesc: "Κάθε υποβολή σαρώνεται και εξετάζεται από τον Alfred πριν τη δημοσίευση. Εγγυημένη ποιότητα, το spam είναι αδύνατο.",
    urlLabel: "URL Ιστότοπου",
    urlHint: "Απαιτείται HTTPS. Πρέπει να περιέχει σύνδεσμο προς noxelseo.com ή noxelforge.com",
    titleLabel: "Τίτλος",
    nicheLabel: "Θεματική Περιοχή",
    descLabel: "Σύντομη περιγραφή",
    contentLabel: "Κύριο περιεχόμενο",
    contentHint: "προαιρετικό, βοηθά τον Alfred να αναλύσει καλύτερα",
    submitBtn: "Υποβολή στο NOXEL Forge",
    analyzing: "Ανάλυση..."
  },
  pricing: {
    kicker: "Τιμολόγηση NOXEL Forge",
    title: "Χτίσε το",
    titleAccent: "δίκτυο αυθεντίας σου",
    subtitle: "Εμφάνισε το σήμα NOXEL στον ιστότοπό σου και ξεκλείδωσε αποκλειστικές εκπτώσεις σε κάθε βαθμίδα.",
    monthly: "Μηνιαία",
    annual: "Ετήσια",
    badgeToggle: "Εμφανίζω το σήμα NOXEL, ξεκλειδώνω έκπτωση",
    badgeApplied: "Εφαρμόστηκε έκπτωση σήματος",
    mostPopular: "Πιο δημοφιλές",
    perMonth: "/μήνα",
    getStarted: "Ξεκινήστε δωρεάν",
    badgeInfoTitle: "Πώς να ξεκλειδώσετε εκπτώσεις σήματος",
    badgeInfoDesc: "Εμφανίστε οποιοδήποτε σήμα στο υποσέλιδο του ιστότοπού σας. Ο Alfred σαρώνει το υποσέλιδό σας σε κάθε υποβολή."
  },
  badge: {
    kicker: "Εμφάνισε στον ιστότοπό σου",
    title: "NOXEL Forge",
    titleAccent: "Σήματα",
    subtitle: "Αντιγράψτε και επικολλήστε οποιοδήποτε σήμα στο υποσέλιδο του ιστότοπού σας.",
    copy: "Αντιγραφή κώδικα",
    copied: "Αντιγράφηκε!",
    infoTitle: "Πώς λειτουργούν οι εκπτώσεις σήματος",
    infoDesc: "Τοποθετήστε οποιοδήποτε σήμα στο υποσέλιδο του ιστότοπού σας, σε όλες τις σελίδες. Ο Alfred σαρώνει το υποσέλιδό σας σε κάθε υποβολή. Ασήμι 10%, Χρυσό 15%, Πλατίνα 20%, Διαμάντι 25%."
  },
  cta: {
    kicker: "Έτοιμος να σφυρηλατήσεις;",
    title: "Γίνε μέλος του NOXEL Forge",
    subtitle: "Ξεκινήστε να χτίζετε το επαληθευμένο δίκτυο backlink σας σήμερα."
  }
};

const lv: ForgeTranslations = {
  nav: {
    submit: "Iesniegt",
    dashboard: "Vadības panelis",
    pricing: "Cenas",
    badges: "Nozīmītes"
  },
  hero: {
    kicker: "NOXEL Forge - Saišu apmaiņas ekosistēma",
    title: "Kaldiniet savu",
    titleAccent: "autoritāti",
    subtitle: "Apmainiet atpakaļsaites ar Alfred pārbaudītām vietnēm. Kvalitāte garantēta, surogātpasts neiespējams. Dod vienu, saņem vienu.",
    ctaSubmit: "Iesniegt manu vietni",
    ctaDashboard: "Mans vadības panelis"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Pelniet punktus par katru apmaiņu",
    giveOne: "Dod vienu, saņem vienu",
    giveOneDesc: "Jūs dodat atpakaļsaiti, jūs saņemat vienu atpakaļ",
    alfredFilters: "Alfred filtri",
    alfredFiltersDesc: "Nulles surogātpasts, nulles vispārīga satura"
  },
  trust: {
    kicker: "Uzticamības rezultātu kalve",
    subtitle: "Katra vietne saņem vērtējumu no 100 punktiem, pamatojoties uz 6 kvalitātes signāliem"
  },
  directory: {
    kicker: "Direktorijs",
    title: "Pārbaudītās Forge vietnes",
    empty: "Direktorijs pagaidām ir tukšs",
    emptyDesc: "Esiet pirmais, kas iesniedz savu vietni.",
    loading: "Ielādē direktoriju...",
    previous: "Iepriekšējais",
    next: "Nākamais"
  },
  submit: {
    alfredTitle: "Alfred pārskata katru iesniegumu",
    alfredDesc: "Katrs iesniegums tiek skenēts un pārskatīts ar Alfred pirms publicēšanas. Kvalitāte garantēta, surogātpasts neiespējams.",
    urlLabel: "Vietnes URL",
    urlHint: "Nepieciešams HTTPS. Jāietver saite uz noxelseo.com vai noxelforge.com",
    titleLabel: "Nosaukums",
    nicheLabel: "Niša",
    descLabel: "Īss apraksts",
    contentLabel: "Galvenais saturs",
    contentHint: "neobligāts, palīdz Alfred labāk analizēt",
    submitBtn: "Iesniegt NOXEL Forge",
    analyzing: "Analizē..."
  },
  pricing: {
    kicker: "NOXEL Forge cenas",
    title: "Veidojiet savu",
    titleAccent: "autoritātes tīklu",
    subtitle: "Rādiet NOXEL nozīmīti savā vietnē un atbloķējiet ekskluzīvas atlaides katrā līmenī.",
    monthly: "Mēneša",
    annual: "Gada",
    badgeToggle: "Es rādu NOXEL nozīmīti, atbloķēju atlaidi",
    badgeApplied: "Nozīmītes atlaide piemērota",
    mostPopular: "Vispopulārākais",
    perMonth: "/mēn.",
    getStarted: "Sākt bez maksas",
    badgeInfoTitle: "Kā atbloķēt nozīmīšu atlaides",
    badgeInfoDesc: "Rādiet jebkuru nozīmīti savas vietnes kājenē. Alfred skenē jūsu kājeni katrā iesniegumā."
  },
  badge: {
    kicker: "Rādiet savā vietnē",
    title: "NOXEL Forge",
    titleAccent: "Nozīmītes",
    subtitle: "Kopējiet un ielīmējiet jebkuru nozīmīti savas vietnes kājenē.",
    copy: "Kopēt fragmentu",
    copied: "Nokopēts!",
    infoTitle: "Kā darbojas nozīmīšu atlaides",
    infoDesc: "Novietojiet jebkuru nozīmīti savas vietnes kājenē visā vietnē. Alfred skenē jūsu kājeni katrā iesniegumā. Sudrabs 10%, Zelts 15%, Platīns 20%, Dimants 25%."
  },
  cta: {
    kicker: "Gatavs kaldināt?",
    title: "Pievienojieties NOXEL Forge",
    subtitle: "Sāciet veidot savu pārbaudīto atpakaļsaišu tīklu jau šodien."
  }
};

const be: ForgeTranslations = {
  nav: {
    submit: "Адправіць",
    dashboard: "Панэль кіравання",
    pricing: "Цэны",
    badges: "Значкі"
  },
  hero: {
    kicker: "NOXEL Forge - Экасістэма абмену бэклінкамі",
    title: "Выкуйце свой",
    titleAccent: "аўтарытэт",
    subtitle: "Абменьвайцеся бэклінкамі з верыфікаванымі сайтамі, адфільтраванымі Alfred. Якасць гарантавана, спам немагчымы. Дайце адзін — атрымайце адзін.",
    ctaSubmit: "Дадаць мой сайт",
    ctaDashboard: "Мая панэль"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Зарабляйце балы за кожны абмен",
    giveOne: "Дайце адзін, атрымайце адзін",
    giveOneDesc: "Вы даяце бэклінк — вы атрымліваеце яго назад",
    alfredFilters: "Фільтры Alfred",
    alfredFiltersDesc: "Ніякага спаму, ніякага шаблоннага кантэнту"
  },
  trust: {
    kicker: "Паказчык даверу",
    subtitle: "Кожны сайт атрымлівае ацэнку з 100 на аснове 6 сігналаў якасці"
  },
  directory: {
    kicker: "Каталог",
    title: "Верыфікаваныя сайты Forge",
    empty: "Каталог пакуль пусты",
    emptyDesc: "Будзьце першым, хто дадасць свой сайт.",
    loading: "Загрузка каталога...",
    previous: "Папярэдняя",
    next: "Наступная"
  },
  submit: {
    alfredTitle: "Alfred правярае кожную заяўку",
    alfredDesc: "Кожная заяўка сканіруецца і правяраецца Alfred перад публікацыяй. Якасць гарантавана, спам немагчымы.",
    urlLabel: "URL сайта",
    urlHint: "Патрабуецца HTTPS. Павінен змяшчаць спасылку на noxelseo.com або noxelforge.com",
    titleLabel: "Назва",
    nicheLabel: "Ніша",
    descLabel: "Кароткае апісанне",
    contentLabel: "Асноўны кантэнт",
    contentHint: "неабавязкова, дапамагае Alfred лепш аналізаваць",
    submitBtn: "Дадаць у NOXEL Forge",
    analyzing: "Аналіз..."
  },
  pricing: {
    kicker: "Цэны NOXEL Forge",
    title: "Пабудуйце сваю",
    titleAccent: "сетку аўтарытэту",
    subtitle: "Разместзіце значок NOXEL на сваім сайце і атрымайце эксклюзіўныя зніжкі на кожным узроўні.",
    monthly: "Штомесячна",
    annual: "Штогадова",
    badgeToggle: "Я размяшчаю значок NOXEL, разблакіраваць зніжку",
    badgeApplied: "Зніжка за значок прыменена",
    mostPopular: "Найбольш папулярны",
    perMonth: "/мес",
    getStarted: "Пачаць бясплатна",
    badgeInfoTitle: "Як разблакіраваць зніжкі за значок",
    badgeInfoDesc: "Разместзіце любы значок у ніжнім калонтытуле свайго сайта. Alfred сканіруе ваш ніжні калонтытул пры кожнай адпраўцы."
  },
  badge: {
    kicker: "Разместзіце на сваім сайце",
    title: "NOXEL Forge",
    titleAccent: "Значкі",
    subtitle: "Скапіруйце і ўстаўце любы значок у ніжні калонтытул вашага сайта.",
    copy: "Скапіраваць код",
    copied: "Скапіравана!",
    infoTitle: "Як працуюць зніжкі за значок",
    infoDesc: "Разместзіце любы значок у ніжнім калонтытуле свайго сайта на ўсіх старонках. Alfred сканіруе ваш ніжні калонтытул пры кожнай адпраўцы. Срэбны 10%, Залаты 15%, Платынавы 20%, Дыяментавы 25%."
  },
  cta: {
    kicker: "Гатовы каваць?",
    title: "Далучайцеся да NOXEL Forge",
    subtitle: "Пачніце будаваць сваю верыфікаваную сетку бэклінкаў сёння."
  }
};

const hi: ForgeTranslations = {
  nav: {
    submit: "सबमिट करें",
    dashboard: "डैशबोर्ड",
    pricing: "मूल्य निर्धारण",
    badges: "बैज"
  },
  hero: {
    kicker: "NOXEL Forge - बैकलिंक एक्सचेंज इकोसिस्टम",
    title: "अपनी",
    titleAccent: "अथॉरिटी",
    subtitle: "Alfred द्वारा फ़िल्टर किए गए सत्यापित साइटों के साथ बैकलिंक एक्सचेंज करें। गुणवत्ता की गारंटी, स्पैम असंभव। एक दें, एक पाएं।",
    ctaSubmit: "मेरी साइट सबमिट करें",
    ctaDashboard: "मेरा डैशबोर्ड"
  },
  stats: {
    forgePoints: "फोर्ज पॉइंट्स",
    forgePointsDesc: "हर एक्सचेंज पर पॉइंट्स अर्जित करें",
    giveOne: "एक दें, एक पाएं",
    giveOneDesc: "आप एक बैकलिंक देते हैं, आपको एक वापस मिलता है",
    alfredFilters: "Alfred फ़िल्टर",
    alfredFiltersDesc: "शून्य स्पैम, शून्य सामान्य सामग्री"
  },
  trust: {
    kicker: "ट्रस्ट स्कोर फोर्ज",
    subtitle: "प्रत्येक साइट को 6 गुणवत्ता संकेतों के आधार पर 100 में से एक स्कोर प्राप्त होता है"
  },
  directory: {
    kicker: "डायरेक्टरी",
    title: "सत्यापित फोर्ज साइटें",
    empty: "डायरेक्टरी अभी खाली है",
    emptyDesc: "अपनी साइट सबमिट करने वाले पहले व्यक्ति बनें।",
    loading: "डायरेक्टरी लोड हो रही है...",
    previous: "पिछला",
    next: "अगला"
  },
  submit: {
    alfredTitle: "Alfred हर सबमिशन की समीक्षा करता है",
    alfredDesc: "प्रकाशन से पहले हर सबमिशन को Alfred द्वारा स्कैन और समीक्षा किया जाता है। गुणवत्ता की गारंटी, स्पैम असंभव।",
    urlLabel: "साइट URL",
    urlHint: "HTTPS आवश्यक है। इसमें noxelseo.com या noxelforge.com का लिंक होना चाहिए",
    titleLabel: "शीर्षक",
    nicheLabel: "निच",
    descLabel: "संक्षिप्त विवरण",
    contentLabel: "मुख्य सामग्री",
    contentHint: "वैकल्पिक, Alfred को बेहतर विश्लेषण करने में मदद करता है",
    submitBtn: "NOXEL Forge में सबमिट करें",
    analyzing: "विश्लेषण हो रहा है..."
  },
  pricing: {
    kicker: "NOXEL Forge मूल्य निर्धारण",
    title: "अपना",
    titleAccent: "अथॉरिटी नेटवर्क बनाएं",
    subtitle: "अपनी साइट पर NOXEL बैज प्रदर्शित करें और हर टियर पर विशेष छूट अनलॉक करें।",
    monthly: "मासिक",
    annual: "वार्षिक",
    badgeToggle: "मैं NOXEL बैज प्रदर्शित करता हूं, छूट अनलॉक करें",
    badgeApplied: "बैज छूट लागू की गई",
    mostPopular: "सबसे लोकप्रिय",
    perMonth: "/माह",
    getStarted: "मुफ़्त में शुरू करें",
    badgeInfoTitle: "बैज छूट कैसे अनलॉक करें",
    badgeInfoDesc: "अपनी साइट के फूटर में कोई भी बैज प्रदर्शित करें। Alfred हर सबमिशन पर आपके फूटर को स्कैन करता है।"
  },
  badge: {
    kicker: "अपनी साइट पर प्रदर्शित करें",
    title: "NOXEL Forge",
    titleAccent: "बैज",
    subtitle: "अपनी साइट के फूटर में कोई भी बैज कॉपी और पेस्ट करें।",
    copy: "स्निपेट कॉपी करें",
    copied: "कॉपी हो गया!",
    infoTitle: "बैज छूट कैसे काम करती है",
    infoDesc: "अपनी साइट के फूटर में साइट-वाइड कोई भी बैज लगाएं। Alfred हर सबमिशन पर आपके फूटर को स्कैन करता है। सिल्वर 10%, गोल्ड 15%, प्लेटिनम 20%, डायमंड 25%।"
  },
  cta: {
    kicker: "फोर्ज करने के लिए तैयार हैं?",
    title: "NOXEL Forge से जुड़ें",
    subtitle: "आज ही अपना सत्यापित बैकलिंक नेटवर्क बनाना शुरू करें।"
  }
};

const ro: ForgeTranslations = {
  nav: {
    submit: "Trimite",
    dashboard: "Panou de control",
    pricing: "Prețuri",
    badges: "Insigne"
  },
  hero: {
    kicker: "NOXEL Forge - Ecosistem de schimb de backlink-uri",
    title: "Forjează-ți",
    titleAccent: "autoritatea",
    subtitle: "Schimbă backlink-uri cu site-uri verificate filtrate de Alfred. Calitate garantată, spam imposibil. Dai unul, primești unul.",
    ctaSubmit: "Trimite site-ul meu",
    ctaDashboard: "Panoul meu de control"
  },
  stats: {
    forgePoints: "Puncte Forge",
    forgePointsDesc: "Câștigă puncte la fiecare schimb",
    giveOne: "Dai unul, primești unul",
    giveOneDesc: "Dai un backlink, primești unul înapoi",
    alfredFilters: "Filtrele Alfred",
    alfredFiltersDesc: "Zero spam, zero conținut generic"
  },
  trust: {
    kicker: "Scorul de încredere Forge",
    subtitle: "Fiecare site primește un scor din 100 bazat pe 6 semnale de calitate"
  },
  directory: {
    kicker: "Director",
    title: "Site-uri Forge verificate",
    empty: "Directorul este momentan gol",
    emptyDesc: "Fii primul care își trimite site-ul.",
    loading: "Se încarcă directorul...",
    previous: "Anterior",
    next: "Următor"
  },
  submit: {
    alfredTitle: "Alfred analizează fiecare trimitere",
    alfredDesc: "Fiecare trimitere este scanată și analizată de Alfred înainte de publicare. Calitate garantată, spam imposibil.",
    urlLabel: "URL site",
    urlHint: "HTTPS obligatoriu. Trebuie să conțină un link către noxelseo.com sau noxelforge.com",
    titleLabel: "Titlu",
    nicheLabel: "Nișă",
    descLabel: "Scurtă descriere",
    contentLabel: "Conținut principal",
    contentHint: "opțional, ajută Alfred să analizeze mai bine",
    submitBtn: "Trimite la NOXEL Forge",
    analyzing: "Se analizează..."
  },
  pricing: {
    kicker: "Prețuri NOXEL Forge",
    title: "Construiește-ți",
    titleAccent: "rețeaua de autoritate",
    subtitle: "Afișează insigna NOXEL pe site-ul tău și deblochează reduceri exclusive pentru fiecare nivel.",
    monthly: "Lunar",
    annual: "Anual",
    badgeToggle: "Afișez insigna NOXEL, deblochez reducerea",
    badgeApplied: "Reducerea pentru insignă aplicată",
    mostPopular: "Cel mai popular",
    perMonth: "/lună",
    getStarted: "Începe gratuit",
    badgeInfoTitle: "Cum să deblochezi reducerile pentru insigne",
    badgeInfoDesc: "Afișează orice insignă în subsolul site-ului tău. Alfred scanează subsolul la fiecare trimitere."
  },
  badge: {
    kicker: "Afișează pe site-ul tău",
    title: "NOXEL Forge",
    titleAccent: "Insigne",
    subtitle: "Copiază și lipește orice insignă în subsolul site-ului tău.",
    copy: "Copiază codul",
    copied: "Copiat!",
    infoTitle: "Cum funcționează reducerile pentru insigne",
    infoDesc: "Plasează orice insignă în subsolul site-ului tău, pe toate paginile. Alfred scanează subsolul la fiecare trimitere. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Gata să forjezi?",
    title: "Alătură-te la NOXEL Forge",
    subtitle: "Începe să îți construiești rețeaua de backlink-uri verificate astăzi."
  }
};

const to: ForgeTranslations = {
  nav: {
    submit: "Tukuange",
    dashboard: "Papa Fakahinohino",
    pricing: "Totongi",
    badges: "Ngaahi Pale"
  },
  hero: {
    kicker: "NOXEL Forge - Ngaahi Fetongi Backlink",
    title: "Taa ho",
    titleAccent: "mafai",
    subtitle: "Fetongi ngaahi backlink mo e ngaahi saiti kuo fakamo'oni'i 'aia 'oku sivi'i 'e Alfred. 'Oku fakapapau'i 'a e lelei, 'oku 'ikai lava 'o hoko 'a e spam. Foaki 'e taha, ma'u 'e taha.",
    ctaSubmit: "Tukuange 'a hoku saiti",
    ctaDashboard: "Hoku Papa Fakahinohino"
  },
  stats: {
    forgePoints: "Ngaahi Poini Forge",
    forgePointsDesc: "Ma'u ngaahi poini 'i he fetongi kotoa",
    giveOne: "Foaki 'e taha, ma'u 'e taha",
    giveOneDesc: "Ko ho'o foaki ha backlink, pea ke ma'u ha taha",
    alfredFilters: "Ngaahi sivi 'a Alfred",
    alfredFiltersDesc: "Noa'ia 'a e spam, noa'ia 'a e ngaahi me'a fakasaiene"
  },
  trust: {
    kicker: "Poini Falala Forge",
    subtitle: "Ko e saiti kotoa 'oku ma'u ha poini mei he 100 'o 'oku 'i ai ha ngaahi faka'ilonga lelei 'e 6"
  },
  directory: {
    kicker: "Lisi",
    title: "Ngaahi Saiti Forge Kuo Fakamo'oni'i",
    empty: "Ko e lisi 'oku ta'ekoloa he taimi ni",
    emptyDesc: "Ko koe 'a e ma'u'anga ki he tukuange ho'o saiti.",
    loading: "Lolotonga hiki 'a e lisi...",
    previous: "Kimu'a",
    next: "Hoko atu"
  },
  submit: {
    alfredTitle: "Ko Alfred 'oku ne sivi 'a e ngaahi tukuange kotoa",
    alfredDesc: "Ko e tukuange kotoa 'oku sivi'i mo 'alunga 'e Alfred kimu'a pea fakamoveleni. 'Oku fakapapau'i 'a e lelei, 'oku 'ikai lava 'o hoko 'a e spam.",
    urlLabel: "URL 'o e Saiti",
    urlHint: "Ko e HTTPS 'oku fiema'u. 'Oku totonu ke 'i ai ha hono fehokotaki ki he noxelseo.com pe noxelforge.com",
    titleLabel: "Hingoa",
    nicheLabel: "Vahenga",
    descLabel: "Fakamatala nounou",
    contentLabel: "Ngaahi me'a lahi",
    contentHint: "fakakatoa, tokoni ki he 'analaiso 'a Alfred",
    submitBtn: "Tukuange ki NOXEL Forge",
    analyzing: "Lolotonga 'analaiso..."
  },
  pricing: {
    kicker: "Totongi NOXEL Forge",
    title: "Langa ho'o",
    titleAccent: "netiweki mafai",
    subtitle: "Fakahaa'i 'a e pale NOXEL 'i ho'o saiti pea hu ki he ngaahi fakato'okosi fakafo'ituitui 'i he ta'u kotoa.",
    monthly: "Māhina",
    annual: "Ta'u",
    badgeToggle: "Ko au 'oku ou fakahaa'i 'a e pale NOXEL, hu ki he fakato'okosi",
    badgeApplied: "Kuo fakahoko 'a e fakato'okosi pale",
    mostPopular: "Toe lahi ange 'a e ngaahi fa'a ngaue",
    perMonth: "/māhina",
    getStarted: "Kamata ta'etotongi",
    badgeInfoTitle: "Ko e founga ke hu ai ki he ngaahi fakato'okosi pale",
    badgeInfoDesc: "Fakahaa'i ha pale 'i he fasi 'o ho'o saiti. Ko Alfred 'oku ne sivi ho'o fasi 'i he tukuange kotoa."
  },
  badge: {
    kicker: "Fakahaa'i 'i ho'o saiti",
    title: "NOXEL Forge",
    titleAccent: "Ngaahi Pale",
    subtitle: "Hiki pea tau ha pale 'i he fasi 'o ho'o saiti.",
    copy: "Kopi 'a e snippet",
    copied: "Kuo kopi!",
    infoTitle: "Ko e founga ngaue 'a e ngaahi fakato'okosi pale",
    infoDesc: "Tuku ha pale 'i he fasi 'o ho'o saiti, 'i he saiti kotoa. Ko Alfred 'oku ne sivi ho'o fasi 'i he tukuange kotoa. Siliva 10%, Koule 15%, Palatiname 20%, Taimane 25%."
  },
  cta: {
    kicker: "Kuo ke 'i ai ke taa?",
    title: "Kau ki NOXEL Forge",
    subtitle: "Kamata langa ho'o netiweki backlink kuo fakamo'oni'i 'i he 'aho ni."
  }
};

const kl: ForgeTranslations = {
  nav: {
    submit: "Inatsit",
    dashboard: "Nalunaarsuiffiit",
    pricing: "Akissorsaat",
    badges: "Nalunaarsorpassuit"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Allanotinneqarsinnaanissarmut Ekosystemi",
    title: "Piumasarivaatit",
    titleAccent: "naliginnaanngitsumik malinnaassineq",
    subtitle: "Backlinkkit allanngorsinnaavat Alfred pillugit nalilersorneqarsinnaasumik sitertitsisoqarsinnaasumik. Kvaliteti nalunngissumik, spam-it naleqqinngilaq. Ataqqinninneqassasoq ataqqinneqassasoq.",
    ctaSubmit: "Nassatarisassaq inatsikkiit",
    ctaDashboard: "Nalunaarsuiffiit"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Points-it amerlaneqassapput allanotinneqarumaarnerani",
    giveOne: "Ataqqinninneqassasoq ataqqinneqassasoq",
    giveOneDesc: "Backlink ataaseq tunnissavatit, ataaseqlu tigummissavarpit",
    alfredFilters: "Alfred nalilersorpaa",
    alfredFiltersDesc: "Spam naleqqinngilaq, nalunngitsumik atugarissaatit naleqqinngillat"
  },
  trust: {
    kicker: "Nalilersorneq Kisitsisit Forge",
    subtitle: "Nassatarisassaq ataatsimiittarfimmut 100-imut naapertoqqissaarneqassasoq kissaatissarsiorfigineqartariaqarpoq 6-nik kvaliteti nalunaarsorpassuinni"
  },
  directory: {
    kicker: "Nalunaarsuiffiit",
    title: "Nalilersorneqarsinnaasumik Forge Sitertitsisoqarsinnaasumit",
    empty: "Nalunaarsuiffiit sumiiffillu sumiiffillu",
    emptyDesc: "Siorniortitsissapput nassatarisassaq inatsikkit.",
    loading: "Nalunaarsuiffiit nalinginnaasumik...",
    previous: "Siorna",
    next: "Kingorna"
  },
  submit: {
    alfredTitle: "Alfred inatsineqarsinnaasumik nalilersorpaa",
    alfredDesc: "Inatsineqarsinnaasumik nalilersorneqassasoq Alfred pillugit nalilersorneqassasoq nangissooq. Kvaliteti nalunngissumik, spam-it naleqqinngilaq.",
    urlLabel: "Nassatarisassaq URL",
    urlHint: "HTTPS pisariaqarpoq. noxelseo.com-imik imaluunniit noxelforge.com-imik nassatarisassaliissitissasoq",
    titleLabel: "Atserineqassasoq",
    nicheLabel: "Sumiiffillu",
    descLabel: "Kissaatigineqartariaqarpoq nalunaarsorneq",
    contentLabel: "Pingaaruteqartumik atugarissaat",
    contentHint: "kissaatissarsiorfigineqarsinnaanngilaq, Alfred kissaatigineqartariaqarpoq nalilersorneqassasoq",
    submitBtn: "NOXEL Forge-mut inatsit",
    analyzing: "Nalilersorneqassasoq..."
  },
  pricing: {
    kicker: "NOXEL Forge Akissorsaat",
    title: "Piumasarivaatit",
    titleAccent: "naliginnaanngitsumik malinnaassineq neqatigiiffigineqassasoq",
    subtitle: "NOXEL nalunaarsorpassuit nassatarisassaminni nalunaarsorpakkit aamma kissaatissarsiorfigineqarsinnaasumik allanngortitsissineqarsinnaapput.",
    monthly: "Qaammatit",
    annual: "Ukioq",
    badgeToggle: "NOXEL nalunaarsorpassuit nalunaarsorpakkit, kissaatissarsiorfigineqarsinnaasumik",
    badgeApplied: "Nalunaarsorpassuit kissaatissarsiorfigineqarsinnaasumik",
    mostPopular: "Kissaatigineqartoq amerlanerusoq",
    perMonth: "/qaam.",
    getStarted: "Sumiiffillu aallartissavarpit",
    badgeInfoTitle: "Nalunaarsorpassuit kissaatissarsiorfigineqarsinnaanissaat pillugit",
    badgeInfoDesc: "Nalunaarsorpassuit nassatarisassaminni kissaatigineqartariaqarpoq. Alfred nassatarisassaminni inatsineqarsinnaasumik nalilersorpaa."
  },
  badge: {
    kicker: "Nassatarisassaminni nalunaarsorpakkit",
    title: "NOXEL Forge",
    titleAccent: "Nalunaarsorpassuit",
    subtitle: "Nalunaarsorpassuit nassatarisassaminni kissaatigineqartariaqarpoq.",
    copy: "Kissaatigineqartariaqarpoq",
    copied: "Kissaatigineqarpoq!",
    infoTitle: "Nalunaarsorpassuit kissaatissarsiorfigineqarsinnaanissaat pillugit",
    infoDesc: "Nalunaarsorpassuit nassatarisassaminni kissaatigineqartariaqarpoq. Alfred nassatarisassaminni inatsineqarsinnaasumik nalilersorpaa. Qilaat 10%, Kuuloortoq 15%, Platina 20%, Diamant 25%."
  },
  cta: {
    kicker: "Piumasarivaatit aallartissavarpit?",
    title: "NOXEL Forge-mut isigassavat",
    subtitle: "Nalilersorneqarsinnaasumik backlink neqatigiiffigineqassasoq ulloriartoortinneqassasoq."
  }
};

const ss: ForgeTranslations = {
  nav: {
    submit: "Tfulatela",
    dashboard: "Ikhasi lekuphatha",
    pricing: "Intengo",
    badges: "Tichibi"
  },
  hero: {
    kicker: "NOXEL Forge - Inhlelo yekushintshanisa Backlink",
    title: "Akha",
    titleAccent: "ligunya lakho",
    subtitle: "Shintshanisa tikhonkhetho ngetisayithi leticondzisiwe letihloliwe ngu Alfred. Ikhwalithi icinisekisiwe, sipaму asinakwenteka. Nipa sinye, utfole sinye.",
    ctaSubmit: "Tfulatela isayithi sami",
    ctaDashboard: "Ikhasi lami lekuphatha"
  },
  stats: {
    forgePoints: "Tintfo ta Forge",
    forgePointsDesc: "Hola ematfuba kuyo yonkhe imphendvulo",
    giveOne: "Nipa sinye, utfole sinye",
    giveOneDesc: "Unika ikhonkhetho, uphindze utfole sinye",
    alfredFilters: "Alfred uhlunga",
    alfredFiltersDesc: "Akukho sipamu, akukho sikhungo lesijwayelekile"
  },
  trust: {
    kicker: "Inombolo yekwetfemba",
    subtitle: "Yonkhe isayithi itfola inombolo yeku 100 kusekelwe etimatini tesigaba lesitfupha sekhwalithi"
  },
  directory: {
    kicker: "Uhlu",
    title: "Tisayithi ta Forge leticondzisiwe",
    empty: "Uhlu luhamba lungenalutfo",
    emptyDesc: "Yiba wekucala kutfulatela isayithi sakho.",
    loading: "Kulayisha uhlu...",
    previous: "Lendlela",
    next: "Lokulandzela"
  },
  submit: {
    alfredTitle: "Alfred uyahlola yonkhe iminikelo",
    alfredDesc: "Yonkhe iminikelo iyahlolwa ngu Alfred ngaphambi kwekushicilelwa. Ikhwalithi icinisekisiwe, sipamu asinakwenteka.",
    urlLabel: "URL yesayithi",
    urlHint: "HTTPS iyadingeka. Kufanele kube nekhonkhetho liya ku noxelseo.com noma noxelforge.com",
    titleLabel: "Sihloko",
    nicheLabel: "Indzawo",
    descLabel: "Incazelo lefishane",
    contentLabel: "Sikhungo lesiyinhloko",
    contentHint: "kungatfukeki, kusita Alfred ukuhlola ngcono",
    submitBtn: "Tfulatela ku NOXEL Forge",
    analyzing: "Kuhlola..."
  },
  pricing: {
    kicker: "Intengo ya NOXEL Forge",
    title: "Akha",
    titleAccent: "inethiwekhi yeligunya",
    subtitle: "Bonisa ichibi la NOXEL esayithini sakho uphinde uvule tisaphulelo letizimaphiko kuyo yonkhe inhlelo.",
    monthly: "Ngenyanga",
    annual: "Ngomnyaka",
    badgeToggle: "Ngibonisa ichibi la NOXEL, vula isaphulelo",
    badgeApplied: "Isaphulelo sechibi sisebentile",
    mostPopular: "Letidume kakhulu",
    perMonth: "/inyanga",
    getStarted: "Cala mahhala",
    badgeInfoTitle: "Indlela yokuvula tisaphulelo tetichibi",
    badgeInfoDesc: "Bonisa noma yiliphi ichibi esineni sesayithi sakho. Alfred uhlola isicini sakho kuyo yonkhe iminikelo."
  },
  badge: {
    kicker: "Bonisa esayithini sakho",
    title: "NOXEL Forge",
    titleAccent: "Tichibi",
    subtitle: "Kopisha uphinde ubeke noma yiliphi ichibi esineni sesayithi sakho.",
    copy: "Kopisha ingcenye",
    copied: "Ikopishiwe!",
    infoTitle: "Indlela tisaphulelo tetichibi letsebentako",
    infoDesc: "Beka noma yiliphi ichibi esineni sesayithi sakho, kuyo yonkhe isayithi. Alfred uhlola isicini sakho kuyo yonkhe iminikelo. Isiliva 10%, Igolide 15%, Iplathinimu 20%, Idayimane 25%."
  },
  cta: {
    kicker: "Ulungele ukwakha?",
    title: "Joyina NOXEL Forge",
    subtitle: "Cala ukwakha inethiwekhi yakho yetikhonkhetho leticondzisiwe lamuhla."
  }
};

const hr: ForgeTranslations = {
  nav: {
    submit: "Pošalji",
    dashboard: "Nadzorna ploča",
    pricing: "Cijene",
    badges: "Značke"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosustav razmjene povratnih veza",
    title: "Izgradi svoj",
    titleAccent: "autoritet",
    subtitle: "Razmjenjujte povratne veze s verificiranim stranicama filtriranim od strane Alfreda. Kvaliteta zajamčena, spam nemoguć. Daj jednu, dobij jednu.",
    ctaSubmit: "Pošalji svoju stranicu",
    ctaDashboard: "Moja nadzorna ploča"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Zarađujte bodove na svakoj razmjeni",
    giveOne: "Daj jednu, dobij jednu",
    giveOneDesc: "Daš povratnu vezu, dobiješ jednu natrag",
    alfredFilters: "Alfredovi filtri",
    alfredFiltersDesc: "Nula spama, nula generičkog sadržaja"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Svaka stranica dobiva ocjenu od 100 na temelju 6 signala kvalitete"
  },
  directory: {
    kicker: "Imenik",
    title: "Verificirane Forge stranice",
    empty: "Imenik je trenutno prazan",
    emptyDesc: "Budite prvi koji će poslati svoju stranicu.",
    loading: "Učitavanje imenika...",
    previous: "Prethodno",
    next: "Sljedeće"
  },
  submit: {
    alfredTitle: "Alfred pregledava svaki zahtjev",
    alfredDesc: "Svaki zahtjev Alfred skenira i pregledava prije objave. Kvaliteta zajamčena, spam nemoguć.",
    urlLabel: "URL stranice",
    urlHint: "Potreban je HTTPS. Mora sadržavati vezu na noxelseo.com ili noxelforge.com",
    titleLabel: "Naslov",
    nicheLabel: "Niša",
    descLabel: "Kratki opis",
    contentLabel: "Glavni sadržaj",
    contentHint: "neobavezno, pomaže Alfredu da bolje analizira",
    submitBtn: "Pošalji na NOXEL Forge",
    analyzing: "Analiziranje..."
  },
  pricing: {
    kicker: "NOXEL Forge cijene",
    title: "Izgradi svoju",
    titleAccent: "mrežu autoriteta",
    subtitle: "Prikaži NOXEL značku na svojoj stranici i otključaj ekskluzivne popuste na svakoj razini.",
    monthly: "Mjesečno",
    annual: "Godišnje",
    badgeToggle: "Prikazujem NOXEL značku, otključaj popust",
    badgeApplied: "Popust za značku primijenjen",
    mostPopular: "Najpopularnije",
    perMonth: "/mj",
    getStarted: "Počni besplatno",
    badgeInfoTitle: "Kako otključati popuste za značke",
    badgeInfoDesc: "Prikaži bilo koju značku u podnožju svoje stranice. Alfred skenira tvoje podnožje pri svakom slanju."
  },
  badge: {
    kicker: "Prikaži na svojoj stranici",
    title: "NOXEL Forge",
    titleAccent: "Značke",
    subtitle: "Kopirajte i zalijepite bilo koju značku u podnožje svoje stranice.",
    copy: "Kopiraj isječak",
    copied: "Kopirano!",
    infoTitle: "Kako funkcioniraju popusti za značke",
    infoDesc: "Postavite bilo koju značku u podnožje svoje stranice, na cijeloj stranici. Alfred skenira vaše podnožje pri svakom slanju. Srebrna 10%, Zlatna 15%, Platinasta 20%, Dijamantna 25%."
  },
  cta: {
    kicker: "Spremi za kovanje?",
    title: "Pridruži se NOXEL Forgeu",
    subtitle: "Počnite graditi svoju verificiranu mrežu povratnih veza danas."
  }
};

const nl: ForgeTranslations = {
  nav: {
    submit: "Indienen",
    dashboard: "Dashboard",
    pricing: "Prijzen",
    badges: "Badges"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Uitwisselingsecosysteem",
    title: "Smeed jouw",
    titleAccent: "autoriteit",
    subtitle: "Wissel backlinks uit met geverifieerde sites gefilterd door Alfred. Kwaliteit gegarandeerd, spam onmogelijk. Geef één, ontvang één.",
    ctaSubmit: "Mijn site indienen",
    ctaDashboard: "Mijn Dashboard"
  },
  stats: {
    forgePoints: "Forge Punten",
    forgePointsDesc: "Verdien punten bij elke uitwisseling",
    giveOne: "Geef één, ontvang één",
    giveOneDesc: "Jij geeft een backlink, jij krijgt er één terug",
    alfredFilters: "Alfred filtert",
    alfredFiltersDesc: "Nul spam, nul generieke inhoud"
  },
  trust: {
    kicker: "Vertrouwensscore Forge",
    subtitle: "Elke site ontvangt een score op 100 op basis van 6 kwaliteitssignalen"
  },
  directory: {
    kicker: "Directory",
    title: "Geverifieerde Forge Sites",
    empty: "De directory is voorlopig leeg",
    emptyDesc: "Wees de eerste om jouw site in te dienen.",
    loading: "Directory laden...",
    previous: "Vorige",
    next: "Volgende"
  },
  submit: {
    alfredTitle: "Alfred beoordeelt elke inzending",
    alfredDesc: "Elke inzending wordt gescand en beoordeeld door Alfred vóór publicatie. Kwaliteit gegarandeerd, spam onmogelijk.",
    urlLabel: "Site-URL",
    urlHint: "HTTPS vereist. Moet een link bevatten naar noxelseo.com of noxelforge.com",
    titleLabel: "Titel",
    nicheLabel: "Niche",
    descLabel: "Korte beschrijving",
    contentLabel: "Hoofdinhoud",
    contentHint: "optioneel, helpt Alfred beter te analyseren",
    submitBtn: "Indienen bij NOXEL Forge",
    analyzing: "Analyseren..."
  },
  pricing: {
    kicker: "NOXEL Forge Prijzen",
    title: "Bouw jouw",
    titleAccent: "autoriteitsnetwerk",
    subtitle: "Toon de NOXEL badge op jouw site en ontgrendel exclusieve kortingen op elk niveau.",
    monthly: "Maandelijks",
    annual: "Jaarlijks",
    badgeToggle: "Ik toon de NOXEL badge, korting ontgrendelen",
    badgeApplied: "Badgekorting toegepast",
    mostPopular: "Meest populair",
    perMonth: "/mnd",
    getStarted: "Gratis aan de slag",
    badgeInfoTitle: "Hoe badgekortingen ontgrendelen",
    badgeInfoDesc: "Toon een badge in de voettekst van jouw site. Alfred scant jouw voettekst bij elke inzending."
  },
  badge: {
    kicker: "Toon op jouw site",
    title: "NOXEL Forge",
    titleAccent: "Badges",
    subtitle: "Kopieer en plak een badge in de voettekst van jouw site.",
    copy: "Fragment kopiëren",
    copied: "Gekopieerd!",
    infoTitle: "Hoe badgekortingen werken",
    infoDesc: "Plaats een badge in de voettekst van jouw site, sitebreed. Alfred scant jouw voettekst bij elke inzending. Zilver 10%, Goud 15%, Platina 20%, Diamant 25%."
  },
  cta: {
    kicker: "Klaar om te smeden?",
    title: "Sluit je aan bij NOXEL Forge",
    subtitle: "Begin vandaag nog met het opbouwen van jouw geverifieerde backlinknetwerk."
  }
};

const bg: ForgeTranslations = {
  nav: {
    submit: "Изпрати",
    dashboard: "Табло",
    pricing: "Цени",
    badges: "Значки"
  },
  hero: {
    kicker: "NOXEL Forge - Екосистема за обмен на обратни връзки",
    title: "Изградете своя",
    titleAccent: "авторитет",
    subtitle: "Обменяйте обратни връзки с верифицирани сайтове, филтрирани от Alfred. Гарантирано качество, спамът е невъзможен. Дай една, получи една.",
    ctaSubmit: "Изпрати моя сайт",
    ctaDashboard: "Моето табло"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Спечелвайте точки при всеки обмен",
    giveOne: "Дай една, получи една",
    giveOneDesc: "Давате обратна връзка, получавате такава в замяна",
    alfredFilters: "Филтрите на Alfred",
    alfredFiltersDesc: "Нула спам, нула общо съдържание"
  },
  trust: {
    kicker: "Оценка на доверие Forge",
    subtitle: "Всеки сайт получава оценка от 100 въз основа на 6 сигнала за качество"
  },
  directory: {
    kicker: "Директория",
    title: "Верифицирани Forge сайтове",
    empty: "Директорията е засега празна",
    emptyDesc: "Бъдете първият, който изпраща своя сайт.",
    loading: "Зареждане на директорията...",
    previous: "Предишна",
    next: "Следваща"
  },
  submit: {
    alfredTitle: "Alfred преглежда всяко подаване",
    alfredDesc: "Всяко подаване се сканира и преглежда от Alfred преди публикуване. Гарантирано качество, спамът е невъзможен.",
    urlLabel: "URL на сайта",
    urlHint: "Изисква се HTTPS. Трябва да съдържа връзка към noxelseo.com или noxelforge.com",
    titleLabel: "Заглавие",
    nicheLabel: "Ниша",
    descLabel: "Кратко описание",
    contentLabel: "Основно съдържание",
    contentHint: "незадължително, помага на Alfred да анализира по-добре",
    submitBtn: "Изпрати в NOXEL Forge",
    analyzing: "Анализиране..."
  },
  pricing: {
    kicker: "Цени на NOXEL Forge",
    title: "Изградете своята",
    titleAccent: "мрежа от авторитет",
    subtitle: "Показвайте значката на NOXEL на своя сайт и отключете ексклузивни отстъпки за всеки план.",
    monthly: "Месечно",
    annual: "Годишно",
    badgeToggle: "Показвам значката на NOXEL, отключвам отстъпка",
    badgeApplied: "Отстъпката за значка е приложена",
    mostPopular: "Най-популярен",
    perMonth: "/мес",
    getStarted: "Започнете безплатно",
    badgeInfoTitle: "Как да отключите отстъпките за значка",
    badgeInfoDesc: "Показвайте произволна значка в долния колонтитул на вашия сайт. Alfred сканира долния колонтитул при всяко подаване."
  },
  badge: {
    kicker: "Покажете на вашия сайт",
    title: "NOXEL Forge",
    titleAccent: "Значки",
    subtitle: "Копирайте и поставете произволна значка в долния колонтитул на вашия сайт.",
    copy: "Копирай кода",
    copied: "Копирано!",
    infoTitle: "Как работят отстъпките за значка",
    infoDesc: "Поставете произволна значка в долния колонтитул на вашия сайт, в целия сайт. Alfred сканира долния колонтитул при всяко подаване. Сребро 10%, Злато 15%, Платина 20%, Диамант 25%."
  },
  cta: {
    kicker: "Готови ли сте да кове?",
    title: "Присъединете се към NOXEL Forge",
    subtitle: "Започнете да изграждате своята верифицирана мрежа от обратни връзки още днес."
  }
};

const ru: ForgeTranslations = {
  nav: {
    submit: "Отправить",
    dashboard: "Панель управления",
    pricing: "Цены",
    badges: "Значки"
  },
  hero: {
    kicker: "NOXEL Forge - Экосистема обмена обратными ссылками",
    title: "Кузница вашего",
    titleAccent: "авторитета",
    subtitle: "Обменивайтесь обратными ссылками с проверенными сайтами, отфильтрованными Alfred. Качество гарантировано, спам невозможен. Дай одну — получи одну.",
    ctaSubmit: "Добавить мой сайт",
    ctaDashboard: "Моя панель управления"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Зарабатывайте очки за каждый обмен",
    giveOne: "Дай одну — получи одну",
    giveOneDesc: "Вы даёте обратную ссылку — получаете одну в ответ",
    alfredFilters: "Фильтры Alfred",
    alfredFiltersDesc: "Никакого спама, никакого шаблонного контента"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Каждый сайт получает оценку из 100 баллов на основе 6 показателей качества"
  },
  directory: {
    kicker: "Каталог",
    title: "Проверенные сайты Forge",
    empty: "Каталог пока пуст",
    emptyDesc: "Будьте первым, кто добавит свой сайт.",
    loading: "Загрузка каталога...",
    previous: "Назад",
    next: "Далее"
  },
  submit: {
    alfredTitle: "Alfred проверяет каждую заявку",
    alfredDesc: "Каждая заявка сканируется и проверяется Alfred перед публикацией. Качество гарантировано, спам невозможен.",
    urlLabel: "URL сайта",
    urlHint: "Требуется HTTPS. Должна содержать ссылку на noxelseo.com или noxelforge.com",
    titleLabel: "Название",
    nicheLabel: "Ниша",
    descLabel: "Краткое описание",
    contentLabel: "Основной контент",
    contentHint: "необязательно, помогает Alfred лучше анализировать",
    submitBtn: "Отправить в NOXEL Forge",
    analyzing: "Анализ..."
  },
  pricing: {
    kicker: "Цены NOXEL Forge",
    title: "Создайте свою",
    titleAccent: "сеть авторитетных сайтов",
    subtitle: "Разместите значок NOXEL на своём сайте и получайте эксклюзивные скидки на каждом тарифе.",
    monthly: "Ежемесячно",
    annual: "Ежегодно",
    badgeToggle: "Я размещаю значок NOXEL — разблокировать скидку",
    badgeApplied: "Скидка за значок применена",
    mostPopular: "Самый популярный",
    perMonth: "/мес",
    getStarted: "Начать бесплатно",
    badgeInfoTitle: "Как разблокировать скидки за значок",
    badgeInfoDesc: "Разместите любой значок в подвале вашего сайта. Alfred сканирует подвал при каждой отправке заявки."
  },
  badge: {
    kicker: "Разместите на своём сайте",
    title: "NOXEL Forge",
    titleAccent: "Значки",
    subtitle: "Скопируйте и вставьте любой значок в подвал вашего сайта.",
    copy: "Скопировать код",
    copied: "Скопировано!",
    infoTitle: "Как работают скидки за значок",
    infoDesc: "Разместите любой значок в подвале вашего сайта на всех страницах. Alfred сканирует подвал при каждой отправке заявки. Серебро 10%, Золото 15%, Платина 20%, Бриллиант 25%."
  },
  cta: {
    kicker: "Готовы ковать?",
    title: "Присоединяйтесь к NOXEL Forge",
    subtitle: "Начните создавать вашу сеть проверенных обратных ссылок уже сегодня."
  }
};

const et: ForgeTranslations = {
  nav: {
    submit: "Esita",
    dashboard: "Töölaud",
    pricing: "Hinnad",
    badges: "Märgid"
  },
  hero: {
    kicker: "NOXEL Forge - Tagasilingi vahetuse ökosüsteem",
    title: "Sepista oma",
    titleAccent: "autoriteet",
    subtitle: "Vaheta tagasilinke Alfred'i poolt kontrollitud saitidega. Kvaliteet garanteeritud, rämpspost võimatu. Anna üks, saa üks.",
    ctaSubmit: "Esita oma sait",
    ctaDashboard: "Minu töölaud"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Teeni punkte iga vahetuse eest",
    giveOne: "Anna üks, saa üks",
    giveOneDesc: "Annad tagasilingi, saad tagasilingi",
    alfredFilters: "Alfred filtreerib",
    alfredFiltersDesc: "Null rämpsposti, null üldist sisu"
  },
  trust: {
    kicker: "Usaldusskoor Forge",
    subtitle: "Iga sait saab 100-pallisel skaalal hinde, mis põhineb 6 kvaliteedisignaalil"
  },
  directory: {
    kicker: "Kataloog",
    title: "Kontrollitud Forge'i saidid",
    empty: "Kataloog on hetkel tühi",
    emptyDesc: "Ole esimene, kes oma saidi esitab.",
    loading: "Laadin kataloogi...",
    previous: "Eelmine",
    next: "Järgmine"
  },
  submit: {
    alfredTitle: "Alfred vaatab kõik esitused üle",
    alfredDesc: "Iga esitus skannitakse ja vaadatakse Alfred'i poolt üle enne avaldamist. Kvaliteet garanteeritud, rämpspost võimatu.",
    urlLabel: "Saidi URL",
    urlHint: "HTTPS on nõutud. Peab sisaldama linki noxelseo.com või noxelforge.com lehele",
    titleLabel: "Pealkiri",
    nicheLabel: "Niš",
    descLabel: "Lühikirjeldus",
    contentLabel: "Põhisisu",
    contentHint: "vabatahtlik, aitab Alfred'il paremini analüüsida",
    submitBtn: "Esita NOXEL Forge'ile",
    analyzing: "Analüüsin..."
  },
  pricing: {
    kicker: "NOXEL Forge hinnad",
    title: "Ehita oma",
    titleAccent: "autoriteedivõrgustik",
    subtitle: "Kuva oma saidil NOXEL märki ja ava eksklusiivsed allahindlused kõigil tasemetel.",
    monthly: "Kuupõhine",
    annual: "Aastapõhine",
    badgeToggle: "Kuvan NOXEL märki, avan allahindluse",
    badgeApplied: "Märgi allahindlus rakendatud",
    mostPopular: "Kõige populaarsem",
    perMonth: "/kuu",
    getStarted: "Alusta tasuta",
    badgeInfoTitle: "Kuidas avada märgi allahindlusi",
    badgeInfoDesc: "Kuva mis tahes märki oma saidi jaluses. Alfred skanib sinu jalust iga esituse korral."
  },
  badge: {
    kicker: "Kuva oma saidil",
    title: "NOXEL Forge",
    titleAccent: "Märgid",
    subtitle: "Kopeeri ja kleebi suvaline märk oma saidi jalusesse.",
    copy: "Kopeeri kood",
    copied: "Kopeeritud!",
    infoTitle: "Kuidas märgi allahindlused toimivad",
    infoDesc: "Aseta suvaline märk oma saidi jalusesse, üle kogu saidi. Alfred skanib sinu jalust iga esituse korral. Hõbe 10%, Kuld 15%, Plaatina 20%, Teemant 25%."
  },
  cta: {
    kicker: "Valmis sepistama?",
    title: "Liitu NOXEL Forge'iga",
    subtitle: "Alusta oma kontrollitud tagasilinkide võrgustiku loomist juba täna."
  }
};

const tr: ForgeTranslations = {
  nav: {
    submit: "Gönder",
    dashboard: "Kontrol Paneli",
    pricing: "Fiyatlandırma",
    badges: "Rozetler"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Değişim Ekosistemi",
    title: "Otoritenizi",
    titleAccent: "güçlendirin",
    subtitle: "Alfred tarafından filtrelenmiş doğrulanmış sitelerle backlink değişimi yapın. Kalite garantili, spam imkansız. Bir verin, bir alın.",
    ctaSubmit: "Sitemi gönder",
    ctaDashboard: "Kontrol Panelim"
  },
  stats: {
    forgePoints: "Forge Puanları",
    forgePointsDesc: "Her değişimde puan kazanın",
    giveOne: "Bir verin, bir alın",
    giveOneDesc: "Bir backlink verirsiniz, bir backlink alırsınız",
    alfredFilters: "Alfred filtreleri",
    alfredFiltersDesc: "Sıfır spam, sıfır genel içerik"
  },
  trust: {
    kicker: "Güven Skoru Forge",
    subtitle: "Her site, 6 kalite sinyaline göre 100 üzerinden bir puan alır"
  },
  directory: {
    kicker: "Dizin",
    title: "Doğrulanmış Forge Siteleri",
    empty: "Dizin şu an boş",
    emptyDesc: "Sitenizi ilk gönderen siz olun.",
    loading: "Dizin yükleniyor...",
    previous: "Önceki",
    next: "Sonraki"
  },
  submit: {
    alfredTitle: "Alfred her başvuruyu inceler",
    alfredDesc: "Her başvuru yayınlanmadan önce Alfred tarafından taranır ve incelenir. Kalite garantili, spam imkansız.",
    urlLabel: "Site URL'si",
    urlHint: "HTTPS zorunludur. noxelseo.com veya noxelforge.com bağlantısı içermelidir",
    titleLabel: "Başlık",
    nicheLabel: "Niş",
    descLabel: "Kısa açıklama",
    contentLabel: "Ana içerik",
    contentHint: "isteğe bağlı, Alfred'in daha iyi analiz etmesine yardımcı olur",
    submitBtn: "NOXEL Forge'a Gönder",
    analyzing: "Analiz ediliyor..."
  },
  pricing: {
    kicker: "NOXEL Forge Fiyatlandırması",
    title: "Otorite",
    titleAccent: "ağınızı kurun",
    subtitle: "Sitenizde NOXEL rozetini gösterin ve her planda özel indirimlerden yararlanın.",
    monthly: "Aylık",
    annual: "Yıllık",
    badgeToggle: "NOXEL rozetini görüntülüyorum, indirimi aç",
    badgeApplied: "Rozet indirimi uygulandı",
    mostPopular: "En popüler",
    perMonth: "/ay",
    getStarted: "Ücretsiz başlayın",
    badgeInfoTitle: "Rozet indirimleri nasıl açılır",
    badgeInfoDesc: "Sitenizin altbilgisine herhangi bir rozet ekleyin. Alfred her başvuruda altbilginizi tarar."
  },
  badge: {
    kicker: "Sitenizde görüntüleyin",
    title: "NOXEL Forge",
    titleAccent: "Rozetleri",
    subtitle: "Herhangi bir rozeti kopyalayıp sitenizin altbilgisine yapıştırın.",
    copy: "Kodu kopyala",
    copied: "Kopyalandı!",
    infoTitle: "Rozet indirimleri nasıl çalışır",
    infoDesc: "Herhangi bir rozeti sitenizin altbilgisine site genelinde yerleştirin. Alfred her başvuruda altbilginizi tarar. Gümüş %10, Altın %15, Platin %20, Elmas %25."
  },
  cta: {
    kicker: "Forge'a hazır mısınız?",
    title: "NOXEL Forge'a Katılın",
    subtitle: "Doğrulanmış backlink ağınızı bugün oluşturmaya başlayın."
  }
};

const mg: ForgeTranslations = {
  nav: {
    submit: "Alefa",
    dashboard: "Tableau de bord",
    pricing: "Vidiny",
    badges: "Famantarana"
  },
  hero: {
    kicker: "NOXEL Forge - Tambajotra fifanakalozana backlink",
    title: "Ataovy mafy ny",
    titleAccent: "fahefanao",
    subtitle: "Fifanakalozana backlink amin'ny tranokala voamarina nefa notsaraina an'i Alfred. Kalitao voatohtohy, spam tsy mety. Omeo iray, azao iray.",
    ctaSubmit: "Alefa ny tranokala",
    ctaDashboard: "Ny Dashboard"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Mahazo vata amin'ny fifanakalozana rehetra",
    giveOne: "Omeo iray, azao iray",
    giveOneDesc: "Omeo backlink iray, azo backlink iray",
    alfredFilters: "Alfred mifehy",
    alfredFiltersDesc: "Tsy misy spam, tsy misy votoatiny tsy izy"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Ny tranokala tsirairay dia mahazo marika amin'ny 100 mifototra amin'ny famantarana kalitao 6"
  },
  directory: {
    kicker: "Lisitr'adiresy",
    title: "Tranokala Forge voamarina",
    empty: "Ny lisitr'adiresy dia foana amin'izao fotoana izao",
    emptyDesc: "Aoka ho izy ianao voalohany handefa ny tranokala.",
    loading: "Enti-miseho ny lisitr'adiresy...",
    previous: "Taloha",
    next: "Manaraka"
  },
  submit: {
    alfredTitle: "Alfred manadihady ny fandefasana rehetra",
    alfredDesc: "Ny fandefasana rehetra dia skanina ary notsaraina an'i Alfred alohan'ny famoahana. Kalitao voatohtohy, spam tsy mety.",
    urlLabel: "URL tranokala",
    urlHint: "HTTPS ilaina. Tsy maintsy misy rohy mankany amin'ny noxelseo.com na noxelforge.com",
    titleLabel: "Lohateny",
    nicheLabel: "Niche",
    descLabel: "Famaritana fohy",
    contentLabel: "Votoatiny lehibe",
    contentHint: "tsy voatery, manampy an'i Alfred hanadihadiana tsara kokoa",
    submitBtn: "Alefa amin'ny NOXEL Forge",
    analyzing: "Eo am-panadihadiana..."
  },
  pricing: {
    kicker: "Vidiny NOXEL Forge",
    title: "Manaova ny",
    titleAccent: "tambajotra fahefana",
    subtitle: "Asehoy ny famantarana NOXEL amin'ny tranokala ary manokatra fihenam-bidy manokana amin'ny ambaratonga rehetra.",
    monthly: "Isam-bolana",
    annual: "Isan-taona",
    badgeToggle: "Asehoko ny famantarana NOXEL, manokatra fihenam-bidy",
    badgeApplied: "Fihenam-bidy famantarana ampiharina",
    mostPopular: "Malaza indrindra",
    perMonth: "/volana",
    getStarted: "Atombohy maimaimpoana",
    badgeInfoTitle: "Ahoana ny fomba hanokafana fihenam-bidy famantarana",
    badgeInfoDesc: "Asehoy famantarana iray amin'ny footer ny tranokala. Alfred mandinika ny footer amin'ny fandefasana rehetra."
  },
  badge: {
    kicker: "Asehoy amin'ny tranokala",
    title: "NOXEL Forge",
    titleAccent: "Famantarana",
    subtitle: "Adikao sy asiana famantarana iray amin'ny footer ny tranokala.",
    copy: "Adikao ny snippet",
    copied: "Voakopy!",
    infoTitle: "Ahoana ny fiasan'ny fihenam-bidy famantarana",
    infoDesc: "Asiana famantarana iray amin'ny footer ny tranokala, amin'ny pejy rehetra. Alfred mandinika ny footer amin'ny fandefasana rehetra. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Vonona hampiasa?",
    title: "Hiditra ao amin'ny NOXEL Forge",
    subtitle: "Atombohy ny fananganana ny tambajotra backlink voamarinao androany."
  }
};

const nn: ForgeTranslations = {
  nav: {
    submit: "Send inn",
    dashboard: "Dashbord",
    pricing: "Prisar",
    badges: "Merke"
  },
  hero: {
    kicker: "NOXEL Forge - Økosystem for lenkeutveksling",
    title: "Smi din",
    titleAccent: "autoritet",
    subtitle: "Byt lenkjer med verifiserte sider filtrerte av Alfred. Kvalitet garantert, spam umogeleg. Gje éi, få éi.",
    ctaSubmit: "Send inn sida mi",
    ctaDashboard: "Mitt dashbord"
  },
  stats: {
    forgePoints: "Forge-poeng",
    forgePointsDesc: "Tjen poeng på kvar utveksling",
    giveOne: "Gje éi, få éi",
    giveOneDesc: "Du gjev ei lenkje, du får ei tilbake",
    alfredFilters: "Alfred filtrerer",
    alfredFiltersDesc: "Null spam, null generisk innhald"
  },
  trust: {
    kicker: "Tillitsskår-smiing",
    subtitle: "Kvar side får ein skår av 100 basert på 6 kvalitetssignal"
  },
  directory: {
    kicker: "Katalog",
    title: "Verifiserte Forge-sider",
    empty: "Katalogen er tom førebels",
    emptyDesc: "Ver den første til å senda inn sida di.",
    loading: "Lastar katalog...",
    previous: "Førre",
    next: "Neste"
  },
  submit: {
    alfredTitle: "Alfred gjennomgår kvar innsending",
    alfredDesc: "Kvar innsending vert skanna og gjennomgått av Alfred før publisering. Kvalitet garantert, spam umogeleg.",
    urlLabel: "Side-URL",
    urlHint: "HTTPS påkravd. Må innehalda ei lenkje til noxelseo.com eller noxelforge.com",
    titleLabel: "Tittel",
    nicheLabel: "Nisje",
    descLabel: "Kort skildring",
    contentLabel: "Hovudinnhald",
    contentHint: "valfritt, hjelper Alfred å analysera betre",
    submitBtn: "Send inn til NOXEL Forge",
    analyzing: "Analyserer..."
  },
  pricing: {
    kicker: "NOXEL Forge prisar",
    title: "Bygg ditt",
    titleAccent: "autoritetsnett",
    subtitle: "Vis NOXEL-merket på sida di og lås opp eksklusive rabattar på kvart nivå.",
    monthly: "Månadsvis",
    annual: "Årsvis",
    badgeToggle: "Eg viser NOXEL-merket, lås opp rabatt",
    badgeApplied: "Merkerabatt nytta",
    mostPopular: "Mest populær",
    perMonth: "/md",
    getStarted: "Kom i gang gratis",
    badgeInfoTitle: "Slik låser du opp merkerabattar",
    badgeInfoDesc: "Vis eit merke i botnteksten på sida di. Alfred skannar botnteksten din ved kvar innsending."
  },
  badge: {
    kicker: "Vis på sida di",
    title: "NOXEL Forge",
    titleAccent: "Merke",
    subtitle: "Kopier og lim inn eit merke i botnteksten på sida di.",
    copy: "Kopier kode",
    copied: "Kopiert!",
    infoTitle: "Slik fungerer merkerabattar",
    infoDesc: "Plasser eit merke i botnteksten på sida di, på heile sida. Alfred skannar botnteksten din ved kvar innsending. Sølv 10%, Gull 15%, Platina 20%, Diamant 25%."
  },
  cta: {
    kicker: "Klar til å smia?",
    title: "Bli med i NOXEL Forge",
    subtitle: "Byrja å byggja ditt verifiserte lenkjenett i dag."
  }
};

const ht: ForgeTranslations = {
  nav: {
    submit: "Soumèt",
    dashboard: "Tablo de bò",
    pricing: "Pri",
    badges: "Badj"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistèm Echanj Backlink",
    title: "Fòje",
    titleAccent: "otorite",
    subtitle: "Echanje backlink ak sit verifye filtre pa Alfred. Kalite garanti, spam enposib. Bay youn, resevwa youn.",
    ctaSubmit: "Soumèt sit mwen",
    ctaDashboard: "Tablo de bò mwen"
  },
  stats: {
    forgePoints: "Pwen Fòj",
    forgePointsDesc: "Ganye pwen sou chak echanj",
    giveOne: "Bay youn, resevwa youn",
    giveOneDesc: "Ou bay yon backlink, ou resevwa youn an retou",
    alfredFilters: "Alfred filtre",
    alfredFiltersDesc: "Zewo spam, zewo kontni jenerik"
  },
  trust: {
    kicker: "Nòt Konfyans Fòj",
    subtitle: "Chak sit resevwa yon nòt sou 100 ki baze sou 6 siy kalite"
  },
  directory: {
    kicker: "Anyè",
    title: "Sit Fòj Verifye",
    empty: "Anyè a vid pou kounye a",
    emptyDesc: "Se ou ki premye pou soumèt sit ou.",
    loading: "Chajman anyè...",
    previous: "Anvan",
    next: "Swivan"
  },
  submit: {
    alfredTitle: "Alfred revize chak soumisyon",
    alfredDesc: "Chak soumisyon eskanye epi revize pa Alfred anvan piblikasyon. Kalite garanti, spam enposib.",
    urlLabel: "URL Sit",
    urlHint: "HTTPS obligatwa. Dwe gen yon lyen ki poin sou noxelseo.com oswa noxelforge.com",
    titleLabel: "Tit",
    nicheLabel: "Nich",
    descLabel: "Deskripsyon kout",
    contentLabel: "Kontni prensipal",
    contentHint: "opsyonèl, ede Alfred analize pi byen",
    submitBtn: "Soumèt nan NOXEL Forge",
    analyzing: "Analiz ap fèt..."
  },
  pricing: {
    kicker: "Pri NOXEL Forge",
    title: "Bati",
    titleAccent: "rezo otorite ou",
    subtitle: "Afiche badj NOXEL sou sit ou epi debloke rabè eksklizif sou chak nivo.",
    monthly: "Mansyèl",
    annual: "Anyèl",
    badgeToggle: "Mwen afiche badj NOXEL, debloke rabè",
    badgeApplied: "Rabè badj aplike",
    mostPopular: "Pi popilè",
    perMonth: "/mwa",
    getStarted: "Kòmanse gratis",
    badgeInfoTitle: "Kijan pou debloke rabè badj",
    badgeInfoDesc: "Afiche nenpòt badj nan pyepaj sit ou. Alfred eskanye pyepaj ou sou chak soumisyon."
  },
  badge: {
    kicker: "Afiche sou sit ou",
    title: "NOXEL Forge",
    titleAccent: "Badj",
    subtitle: "Kopye epi kole nenpòt badj nan pyepaj sit ou.",
    copy: "Kopye kòd",
    copied: "Kopye!",
    infoTitle: "Kijan rabè badj fonksyone",
    infoDesc: "Mete nenpòt badj nan pyepaj sit ou, sou tout sit la. Alfred eskanye pyepaj ou sou chak soumisyon. Ajan 10%, Lò 15%, Platòn 20%, Dyaman 25%."
  },
  cta: {
    kicker: "Prè pou fòje?",
    title: "Rejwenn NOXEL Forge",
    subtitle: "Kòmanse bati rezo backlink verifye ou jodi a."
  }
};

const bi: ForgeTranslations = {
  nav: {
    submit: "Sanem",
    dashboard: "Dashboard",
    pricing: "Praes",
    badges: "Badges"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistem blong Eksaenj Backlink",
    title: "Fojem",
    titleAccent: "otorite blong yu",
    subtitle: "Eksaenj backlink wetem ol saet we Alfred i verifae finis. Kwaliti i garantim, spam i no posibel. Givim wan, kisim wan bak.",
    ctaSubmit: "Sanem saet blong mi",
    ctaDashboard: "Dashboard blong mi"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Ёnem ol poen long evri eksaenj",
    giveOne: "Givim wan, kisim wan bak",
    giveOneDesc: "Yu givim wan backlink, yu kisim wan bak",
    alfredFilters: "Alfred i filta",
    alfredFiltersDesc: "Nating spam, nating jeneral konten"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Evri saet i kasem skoa long 100 we i kamaot long 6 saenal blong kwaliti"
  },
  directory: {
    kicker: "Direktori",
    title: "Ol Saet blong Forge we i Verifae Finis",
    empty: "Direktori i empty nao",
    emptyDesc: "Be nambawan blong sanem saet blong yu.",
    loading: "Loding direktori...",
    previous: "Bifo",
    next: "Nekis"
  },
  submit: {
    alfredTitle: "Alfred i lukluk evri sabmisen",
    alfredDesc: "Evri sabmisen Alfred i skan mo lukluk bifo publikesen. Kwaliti i garantim, spam i no posibel.",
    urlLabel: "URL blong Saet",
    urlHint: "HTTPS i nid. Mas gat link i go long noxelseo.com o noxelforge.com",
    titleLabel: "Taetol",
    nicheLabel: "Nis",
    descLabel: "Sot diskripsen",
    contentLabel: "Konten prinsip",
    contentHint: "opsonal, i helpem Alfred blong analysen blong hem i go betta",
    submitBtn: "Sanem long NOXEL Forge",
    analyzing: "Analysen i stap..."
  },
  pricing: {
    kicker: "Praes blong NOXEL Forge",
    title: "Bildim",
    titleAccent: "netwok blong otorite blong yu",
    subtitle: "Soem NOXEL badge long saet blong yu mo openem ol diskaont eksklisiv long evri tia.",
    monthly: "Manly",
    annual: "Yia",
    badgeToggle: "Mi soem NOXEL badge, openem diskaont",
    badgeApplied: "Diskaont blong badge i applaed finis",
    mostPopular: "I populamost",
    perMonth: "/mo",
    getStarted: "Statem fri",
    badgeInfoTitle: "Hao blong openem ol diskaont blong badge",
    badgeInfoDesc: "Soem eni badge long futa blong saet blong yu. Alfred i skan futa blong yu long evri sabmisen."
  },
  badge: {
    kicker: "Soem long saet blong yu",
    title: "NOXEL Forge",
    titleAccent: "Badges",
    subtitle: "Kopio mo peitem eni badge long futa blong saet blong yu.",
    copy: "Kopio snippet",
    copied: "Kopio finis!",
    infoTitle: "Hao ol diskaont blong badge i wok",
    infoDesc: "Plaesem eni badge long futa blong saet blong yu, long olgeta pej. Alfred i skan futa blong yu long evri sabmisen. Silva 10%, Gol 15%, Platinem 20%, Daemon 25%."
  },
  cta: {
    kicker: "Yu redi blong fojem?",
    title: "Joinim NOXEL Forge",
    subtitle: "Statem bildim netwok blong ol backlink verifae blong yu tede."
  }
};

const st: ForgeTranslations = {
  nav: {
    submit: "Romela",
    dashboard: "Setafolwana sa tsamaiso",
    pricing: "Litheko",
    badges: "Dibetšo"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosisteme ea Phetiso ea Backlink",
    title: "Haha",
    titleAccent: "bolaodi ba hao",
    subtitle: "Fetisana li-backlink le lisaete tse netefatsweng tse hlolwa ke Alfred. Boleng bo netefaliswa, spam ha e khonehe. Fa e le nngwe, fumana e le nngwe.",
    ctaSubmit: "Romela saete ea ka",
    ctaDashboard: "Setafolwana sa Ka"
  },
  stats: {
    forgePoints: "Lintlha tsa Forge",
    forgePointsDesc: "Fumana lintlha ho phetiso e nngwe le e nngwe",
    giveOne: "Fa e le nngwe, fumana e le nngwe",
    giveOneDesc: "O fa backlink e le nngwe, o fumana e le nngwe",
    alfredFilters: "Alfred o hlola",
    alfredFiltersDesc: "Ha ho spam, ha ho litaba tsa kakaretso"
  },
  trust: {
    kicker: "Lintlha tsa Tšepo",
    subtitle: "Saete e nngwe le e nngwe e fumana lintlha ho tloha ho 100 ho ipapisitswe le maemo a 6 a boleng"
  },
  directory: {
    kicker: "Bukana",
    title: "Lisaete tse Netefatsweng tsa Forge",
    empty: "Bukana ha e na letho hona joale",
    emptyDesc: "Ba ea pele ho romela saete ea hao.",
    loading: "E laola bukana...",
    previous: "E fetileng",
    next: "E latelang"
  },
  submit: {
    alfredTitle: "Alfred o hlahloba ho itsetsepela ho romelwang",
    alfredDesc: "Ho itsetsepela ho romelwang ho hlahlojwa ke Alfred pele ho phatlalatswa. Boleng bo netefaliswa, spam ha e khonehe.",
    urlLabel: "URL ea Saete",
    urlHint: "HTTPS e hlokahalang. E tlameha ho ba le sehokelo ho noxelseo.com kapa noxelforge.com",
    titleLabel: "Sehlooho",
    nicheLabel: "Sebaka",
    descLabel: "Tlhaloso e khutšoane",
    contentLabel: "Litaba tsa mantlha",
    contentHint: "ha e hlokahale, e thusa Alfred ho hlahlobo e betere",
    submitBtn: "Romela ho NOXEL Forge",
    analyzing: "E hlahloба..."
  },
  pricing: {
    kicker: "Litheko tsa NOXEL Forge",
    title: "Haha",
    titleAccent: "marang-rang a bolaodi",
    subtitle: "Bonts'a letšoao la NOXEL saeteng ea hao mme u bulele lientlelo tsa ikgethelo ho mochato o mong le o mong.",
    monthly: "Kgwedi le kgwedi",
    annual: "Selemo le selemo",
    badgeToggle: "Ke bonts'a letšoao la NOXEL, bulela phokotso",
    badgeApplied: "Phokotso ea letšoao e sebedisitswe",
    mostPopular: "E tsebahala haholo",
    perMonth: "/kgwedi",
    getStarted: "Qala mahala",
    badgeInfoTitle: "Mokhoa oa ho bulela liphokotso tsa letšoao",
    badgeInfoDesc: "Bonts'a letšoao lefe kapa lefe fateng la saete ea hao. Alfred o hlola fateng la hao ho itsetsepela ho romelwang."
  },
  badge: {
    kicker: "Bonts'a saeteng ea hao",
    title: "NOXEL Forge",
    titleAccent: "Dibetšo",
    subtitle: "Kopa le ho kenya letšoao lefe kapa lefe fateng la saete ea hao.",
    copy: "Kopa sengolwa",
    copied: "E kopirilwe!",
    infoTitle: "Mokhoa oo liphokotso tsa letšoao li sebetsang kateng",
    infoDesc: "Beha letšoao lefe kapa lefe fateng la saete ea hao, ho saete kaofela. Alfred o hlola fateng la hao ho itsetsepela ho romelwang. Silefera 10%, Khauta 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "U lukile ho haha?",
    title: "Kenela NOXEL Forge",
    subtitle: "Qala ho haha marang-rang a hao a li-backlink tse netefatsweng kajeno."
  }
};

const eu: ForgeTranslations = {
  nav: {
    submit: "Bidali",
    dashboard: "Panela",
    pricing: "Prezioak",
    badges: "Txapak"
  },
  hero: {
    kicker: "NOXEL Forge - Esteka-truke Ekosistema",
    title: "Forjatu zure",
    titleAccent: "agintea",
    subtitle: "Trukatu estekak Alfred-ek iragazitako egiaztutako guneekin. Kalitatea bermatuta, spama ezinezkoa. Bat eman, bat jaso.",
    ctaSubmit: "Bidali nire gunea",
    ctaDashboard: "Nire Panela"
  },
  stats: {
    forgePoints: "Forge Puntuak",
    forgePointsDesc: "Irabazi puntuak truke bakoitzean",
    giveOne: "Bat eman, bat jaso",
    giveOneDesc: "Esteka bat ematen duzu, eta bat jasotzen duzu",
    alfredFilters: "Alfred-en iragazkiak",
    alfredFiltersDesc: "Zero spam, zero eduki generiko"
  },
  trust: {
    kicker: "Fidagarritasun Puntuazioa Forge",
    subtitle: "Gune bakoitzak 100etik puntuazio bat jasotzen du 6 kalitate-seinale oinarrituta"
  },
  directory: {
    kicker: "Direktorioa",
    title: "Egiaztutako Forge Guneak",
    empty: "Direktorioa hutsik dago oraingoz",
    emptyDesc: "Izan zaitez lehena zure gunea bidaltzean.",
    loading: "Direktorioa kargatzen...",
    previous: "Aurrekoa",
    next: "Hurrengoa"
  },
  submit: {
    alfredTitle: "Alfred-ek bidalpen guztiak berrikusten ditu",
    alfredDesc: "Bidalpen guztiak Alfred-ek eskaneatzen eta berrikusten ditu argitaratu aurretik. Kalitatea bermatuta, spama ezinezkoa.",
    urlLabel: "Gunearen URLa",
    urlHint: "HTTPS beharrezkoa. noxelseo.com edo noxelforge.com-erako esteka bat eduki behar du",
    titleLabel: "Izenburua",
    nicheLabel: "Nitxoa",
    descLabel: "Deskripzio laburra",
    contentLabel: "Eduki nagusia",
    contentHint: "aukerakoa, Alfred-i hobeto analizatzen laguntzen dio",
    submitBtn: "Bidali NOXEL Forge-ra",
    analyzing: "Analizatzen..."
  },
  pricing: {
    kicker: "NOXEL Forge Prezioak",
    title: "Eraiki zure",
    titleAccent: "aginte sarea",
    subtitle: "Erakutsi NOXEL txapa zure gunean eta desblokeatu deskontu esklusiboak maila guztietan.",
    monthly: "Hilekoa",
    annual: "Urtekoa",
    badgeToggle: "NOXEL txapa erakusten dut, desblokeatu deskontua",
    badgeApplied: "Txapa deskontua aplikatuta",
    mostPopular: "Ezagunena",
    perMonth: "/hil",
    getStarted: "Hasi doan",
    badgeInfoTitle: "Nola desblokeatu txapa-deskontuak",
    badgeInfoDesc: "Erakutsi edozein txapa zure gunearen oinean. Alfred-ek zure oina eskaneatzen du bidalpen bakoitzean."
  },
  badge: {
    kicker: "Erakutsi zure gunean",
    title: "NOXEL Forge",
    titleAccent: "Txapak",
    subtitle: "Kopiatu eta itsatsi edozein txapa zure gunearen oinean.",
    copy: "Kopiatu zatia",
    copied: "Kopiatuta!",
    infoTitle: "Nola funtzionatzen duten txapa-deskontuek",
    infoDesc: "Jarri edozein txapa zure gunearen oinean, gune osoan. Alfred-ek zure oina eskaneatzen du bidalpen bakoitzean. Zilarra %10, Urrea %15, Platinoa %20, Diamantea %25."
  },
  cta: {
    kicker: "Prest forjatzeko?",
    title: "Sartu NOXEL Forge-n",
    subtitle: "Hasi zure egiaztutako esteka-sarea eraikitzen gaur."
  }
};

const rw: ForgeTranslations = {
  nav: {
    submit: "Ohereza",
    dashboard: "Ikibaho",
    pricing: "Ibiciro",
    badges: "Impeti"
  },
  hero: {
    kicker: "NOXEL Forge - Uburyo bwo Guhana Backlink",
    title: "Fora",
    titleAccent: "ubuhamya bwawe",
    subtitle: "Hana backlink n'imbuga zemejwe zisuzumwa na Alfred. Ubuziranenge bugizwe intangarugero, spam ntishoboka. Tanga imwe, ubone imwe.",
    ctaSubmit: "Ohereza urubuga rwanjye",
    ctaDashboard: "Ikibaho cyanjye"
  },
  stats: {
    forgePoints: "Amanota ya Forge",
    forgePointsDesc: "Unguke amanota buri gihe uhana",
    giveOne: "Tanga imwe, ubone imwe",
    giveOneDesc: "Utanga backlink imwe, unabone imwe",
    alfredFilters: "Alfred asuzuma",
    alfredFiltersDesc: "Nta spam, nta ibintu bisanzwe"
  },
  trust: {
    kicker: "Forge y'Amanota y'Icyizere",
    subtitle: "Buri rubuga ruhabwa amanota kuri 100 hashingiwe ku byitegererezo 6 by'ubuziranenge"
  },
  directory: {
    kicker: "Ububiko",
    title: "Imbuga za Forge Zemejwe",
    empty: "Ububiko nta na kimwe kirimo ubu",
    emptyDesc: "Banza wohereze urubuga rwawe.",
    loading: "Gutegura ububiko...",
    previous: "Ibanza",
    next: "Ikurikira"
  },
  submit: {
    alfredTitle: "Alfred asuzuma buri nteguza",
    alfredDesc: "Buri nteguza isuzumwa kandi isuzumirwa na Alfred mbere yo gutangazwa. Ubuziranenge bugizwe intangarugero, spam ntishoboka.",
    urlLabel: "Aderesi y'Urubuga",
    urlHint: "HTTPS irakenewe. Igomba kuba irimo uhuzanye na noxelseo.com cyangwa noxelforge.com",
    titleLabel: "Umutwe",
    nicheLabel: "Inzego",
    descLabel: "Ibugufi ry'ibisobanuro",
    contentLabel: "Ibiri mu rubuga",
    contentHint: "si ngombwa, bifasha Alfred gusuzuma neza",
    submitBtn: "Ohereza kuri NOXEL Forge",
    analyzing: "Gusuzuma..."
  },
  pricing: {
    kicker: "Ibiciro bya NOXEL Forge",
    title: "Ubaka",
    titleAccent: "iyongereza ry'ubuhamya bwawe",
    subtitle: "Erekana ikimenyetso cya NOXEL ku rubuga rwawe kandi ubone amanusura yihariye kuri buri rwego.",
    monthly: "Buri kwezi",
    annual: "Buri mwaka",
    badgeToggle: "Nerekana ikimenyetso cya NOXEL, fungura amanusura",
    badgeApplied: "Amanusura y'ikimenyetso yakozwe",
    mostPopular: "Ikunda cyane",
    perMonth: "/kwezi",
    getStarted: "Tangira ubuntu",
    badgeInfoTitle: "Uburyo bwo fungura amanusura y'impeti",
    badgeInfoDesc: "Erekana ikimenyetso icyo aricyo cyose mu maguru y'urubuga rwawe. Alfred asuzuma amaguru yawe buri gihe wohereza."
  },
  badge: {
    kicker: "Erekana ku rubuga rwawe",
    title: "NOXEL Forge",
    titleAccent: "Impeti",
    subtitle: "Kopi ushyire ikimenyetso icyo aricyo cyose mu maguru y'urubuga rwawe.",
    copy: "Kopi agace",
    copied: "Yakopiwemo!",
    infoTitle: "Uburyo amanusura y'impeti akora",
    infoDesc: "Shyira ikimenyetso icyo aricyo cyose mu maguru y'urubuga rwawe, ku rubuga rwose. Alfred asuzuma amaguru yawe buri gihe wohereza. Ifeza 10%, Zahabu 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Witeguye gutera imbere?",
    title: "Injira kuri NOXEL Forge",
    subtitle: "Tangira kubaka iyongereza ry'backlink zemejwe uyu munsi."
  }
};

const mh: ForgeTranslations = {
  nav: {
    submit: "Jibwe",
    dashboard: "Dashboard",
    pricing: "Wōnāān",
    badges: "Badges"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Exchange Ecosystem",
    title: "Forge am",
    titleAccent: "māntin",
    subtitle: "Kallib backlinks ippān site korej verified eo Alfred ear filter. Qualiti guaranteed, spam ejjeļọk. Leļọk juon, bōk juon.",
    ctaSubmit: "Jibwe au site",
    ctaDashboard: "Au Dashboard"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Bōk points ilo exchange ninja",
    giveOne: "Leļọk juon, bōk juon",
    giveOneDesc: "Kwō leļọk juon backlink, kwō bōk juon",
    alfredFilters: "Alfred filters",
    alfredFiltersDesc: "Ejjeļọk spam, ejjeļọk content ko rejjab ṃōṇōṇō"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Site eo im eo rej bōk score jen 100 ilo iaan 6 signal ko rej kwaliti"
  },
  directory: {
    kicker: "Directory",
    title: "Site ko Verified Forge",
    empty: "Directory en ejjeļọk men ilo jinoin",
    emptyDesc: "Kwō naaj kar jijet im jibwe am site ippān ro jet.",
    loading: "Ṃōkaj directory...",
    previous: "Āntikin",
    next: "Ānbōlen"
  },
  submit: {
    alfredTitle: "Alfred riview submission nina",
    alfredDesc: "Submission eo im eo Alfred ear scan im riview ṃokta jen publication. Qualiti guaranteed, spam ejjeļọk.",
    urlLabel: "Site URL",
    urlHint: "HTTPS ejjelọk bwe en jako. En aikuij link ñan noxelseo.com ak noxelforge.com",
    titleLabel: "Title",
    nicheLabel: "Niche",
    descLabel: "Kọọt description",
    contentLabel: "Content pein",
    contentHint: "ejjelọk aikuij, kōjparok Alfred bwe en analyze wōt āinwōt ej ṃōkaj",
    submitBtn: "Jibwe ñan NOXEL Forge",
    analyzing: "Ej analyze..."
  },
  pricing: {
    kicker: "NOXEL Forge Wōnāān",
    title: "Kōṃṃan am",
    titleAccent: "authority network",
    subtitle: "Kwaḷọk NOXEL badge ilo am site im bōk discounts ko rej exclusive ilo tier ninja.",
    monthly: "Jiṃonin",
    annual: "Iiō",
    badgeToggle: "Ikaṃool NOXEL badge, bōk discount",
    badgeApplied: "Badge discount ear jibaddek",
    mostPopular: "Ej popular tata",
    perMonth: "/jiṃon",
    getStarted: "Jinoin wōt ejjeļọk wōnāān",
    badgeInfoTitle: "Ewi iien bwe en bōk badge discounts",
    badgeInfoDesc: "Kwaḷọk badge eo ilo footer am site. Alfred ej scan am footer ilo submission ninja."
  },
  badge: {
    kicker: "Kwaḷọk ilo am site",
    title: "NOXEL Forge",
    titleAccent: "Badges",
    subtitle: "Copy im paste badge eo kwō kōnan ilo footer am site.",
    copy: "Copy snippet",
    copied: "Ear copy!",
    infoTitle: "Ewi iien badge discounts rej ṃōkaj",
    infoDesc: "Ettōr badge eo ilo footer am site, site-wide. Alfred ej scan am footer ilo submission ninja. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Kwō kōṃṃan bwe en forge?",
    title: "Itok ñan NOXEL Forge",
    subtitle: "Jinoin kōṃṃan am verified backlink network rainin."
  }
};

const no: ForgeTranslations = {
  nav: {
    submit: "Send inn",
    dashboard: "Oversikt",
    pricing: "Priser",
    badges: "Merker"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink-utvekslingsøkosystem",
    title: "Smidd din",
    titleAccent: "autoritet",
    subtitle: "Utveksle backlenker med verifiserte nettsteder filtrert av Alfred. Kvalitet garantert, søppelpost umulig. Gi én, få én.",
    ctaSubmit: "Send inn nettstedet mitt",
    ctaDashboard: "Min oversikt"
  },
  stats: {
    forgePoints: "Forge-poeng",
    forgePointsDesc: "Tjen poeng ved hver utveksling",
    giveOne: "Gi én, få én",
    giveOneDesc: "Du gir en backlenkk, du får én tilbake",
    alfredFilters: "Alfred filtrerer",
    alfredFiltersDesc: "Null søppelpost, null generisk innhold"
  },
  trust: {
    kicker: "Tillitsscore-smiing",
    subtitle: "Hvert nettsted får en score av 100 basert på 6 kvalitetssignaler"
  },
  directory: {
    kicker: "Katalog",
    title: "Verifiserte Forge-nettsteder",
    empty: "Katalogen er tom foreløpig",
    emptyDesc: "Vær den første til å sende inn nettstedet ditt.",
    loading: "Laster katalog...",
    previous: "Forrige",
    next: "Neste"
  },
  submit: {
    alfredTitle: "Alfred gjennomgår alle innsendinger",
    alfredDesc: "Alle innsendinger skannes og gjennomgås av Alfred før publisering. Kvalitet garantert, søppelpost umulig.",
    urlLabel: "Nettstedets URL",
    urlHint: "HTTPS kreves. Må inneholde en lenke til noxelseo.com eller noxelforge.com",
    titleLabel: "Tittel",
    nicheLabel: "Nisje",
    descLabel: "Kort beskrivelse",
    contentLabel: "Hovedinnhold",
    contentHint: "valgfritt, hjelper Alfred å analysere bedre",
    submitBtn: "Send inn til NOXEL Forge",
    analyzing: "Analyserer..."
  },
  pricing: {
    kicker: "NOXEL Forge-priser",
    title: "Bygg ditt",
    titleAccent: "autoritetsnettverk",
    subtitle: "Vis NOXEL-merket på nettstedet ditt og lås opp eksklusive rabatter på alle nivåer.",
    monthly: "Månedlig",
    annual: "Årlig",
    badgeToggle: "Jeg viser NOXEL-merket, lås opp rabatt",
    badgeApplied: "Merkrabatt aktivert",
    mostPopular: "Mest populær",
    perMonth: "/mnd",
    getStarted: "Kom i gang gratis",
    badgeInfoTitle: "Slik låser du opp merkrabatter",
    badgeInfoDesc: "Vis et merke i bunnteksten på nettstedet ditt. Alfred skanner bunnteksten din ved hver innsending."
  },
  badge: {
    kicker: "Vis på nettstedet ditt",
    title: "NOXEL Forge",
    titleAccent: "Merker",
    subtitle: "Kopier og lim inn et merke i bunnteksten på nettstedet ditt.",
    copy: "Kopier kode",
    copied: "Kopiert!",
    infoTitle: "Slik fungerer merkrabatter",
    infoDesc: "Plasser et merke i bunnteksten på nettstedet ditt, nettstedsomfattende. Alfred skanner bunnteksten din ved hver innsending. Sølv 10 %, Gull 15 %, Platina 20 %, Diamant 25 %."
  },
  cta: {
    kicker: "Klar til å smi?",
    title: "Bli med i NOXEL Forge",
    subtitle: "Begynn å bygge ditt verifiserte backlenknettverk i dag."
  }
};

const ts: ForgeTranslations = {
  nav: {
    submit: "Nyikela",
    dashboard: "Sesheni ya Vuhlanganisi",
    pricing: "Mitengo",
    badges: "Tibheji"
  },
  hero: {
    kicker: "NOXEL Forge - Xifumo xa Ku Hlanganisa Tikhonekelo",
    title: "Aka",
    titleAccent: "vululami bya wena",
    subtitle: "Hlanganisa tikhonekelo na matsalwa lawa ya pfuxiwa hi Alfred. Ndlelo wa ntiyiso, spam a yi koteki. Nyika yin'we, amukela yin'we.",
    ctaSubmit: "Nyikela saiti ya mina",
    ctaDashboard: "Sesheni ya Mina"
  },
  stats: {
    forgePoints: "Tintlawa ta Forge",
    forgePointsDesc: "Hola tintlawa eka ku hlanganisa kun'wana ni kun'wana",
    giveOne: "Nyika yin'we, amukela yin'we",
    giveOneDesc: "U nyika khonekelo, u amukela yin'we ku tlhelela",
    alfredFilters: "Alfred u sefa",
    alfredFiltersDesc: "Ku hava spam, ku hava ndhawu ya mahungu ya ntolovelo"
  },
  trust: {
    kicker: "Xintlawa xa Ku Tshembeka",
    subtitle: "Saiti yin'wana ni yin'wana yi amukela xintlawa xa ku ya eka 100 hi ku ya hi tinhlanganiso ta ntiyiso ta 6"
  },
  directory: {
    kicker: "Tatelani",
    title: "Matsalwa ya Forge lawa ya Pfuxiweke",
    empty: "Tatelani a yi na nchumu sweswi",
    emptyDesc: "Va wa u rhanga ku nyikela saiti ya wena.",
    loading: "Ku rhwala tatelani...",
    previous: "Ya Sweswi",
    next: "Ya Eku Xanukaneni"
  },
  submit: {
    alfredTitle: "Alfred u hlayisa ku nyikelwa kun'wana ni kun'wana",
    alfredDesc: "Ku nyikelwa kun'wana ni kun'wana ku siviswa na ku hlayisiwa hi Alfred antes ka ku humesiwa. Ndlelo wa ntiyiso, spam a yi koteki.",
    urlLabel: "URL ya Saiti",
    urlHint: "HTTPS yi laveka. Yi fanele yi va na khonekelo eka noxelseo.com kumbe noxelforge.com",
    titleLabel: "Xiviko",
    nicheLabel: "Xifaniso xa Ntirho",
    descLabel: "Vunweti lebyi fupfhi",
    contentLabel: "Ndhawu ya Ntlawa",
    contentHint: "a yi laveki, yi pfuna Alfred ku xopaxopa kahle",
    submitBtn: "Nyikela eka NOXEL Forge",
    analyzing: "Ku xopaxopa..."
  },
  pricing: {
    kicker: "Mitengo ya NOXEL Forge",
    title: "Aka",
    titleAccent: "xifumo xa vululami",
    subtitle: "Kombisa bheji ya NOXEL eka saiti ya wena naswona u pfula tikhombo ta nkoka eka nhlayo yin'wana ni yin'wana.",
    monthly: "Hi N'hweti",
    annual: "Hi Lembe",
    badgeToggle: "Ndzi kombisa bheji ya NOXEL, pfula khombo",
    badgeApplied: "Khombo ya bheji yi engeriwe",
    mostPopular: "Leyi thandekaka kunene",
    perMonth: "/n'hweti",
    getStarted: "Sungula mahala",
    badgeInfoTitle: "Ndlela yo pfula tikhombo ta bheji",
    badgeInfoDesc: "Kombisa bheji yin'wana na yin'wana eka nhlayo ya saiti ya wena. Alfred u sefa nhlayo ya wena eka ku nyikelwa kun'wana ni kun'wana."
  },
  badge: {
    kicker: "Kombisa eka saiti ya wena",
    title: "NOXEL Forge",
    titleAccent: "Tibheji",
    subtitle: "Kopela naswona u khomela bheji yin'wana na yin'wana eka nhlayo ya saiti ya wena.",
    copy: "Kopela xichopetelo",
    copied: "Yi kopiwile!",
    infoTitle: "Ndlela tikhombo ta bheji ti tirha ha yona",
    infoDesc: "Veka bheji yin'wana eka nhlayo ya saiti ya wena, eka saiti yintsena. Alfred u sefa nhlayo ya wena eka ku nyikelwa kun'wana ni kun'wana. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "U lunghile ku aka?",
    title: "Nghena eka NOXEL Forge",
    subtitle: "Sungula ku aka xifumo xa tikhonekelo leti pfuxiweke namuntlha."
  }
};

const sv: ForgeTranslations = {
  nav: {
    submit: "Skicka in",
    dashboard: "Instrumentpanel",
    pricing: "Priser",
    badges: "Märken"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosystem för länkutbyte",
    title: "Smid din",
    titleAccent: "auktoritet",
    subtitle: "Utbyt bakåtlänkar med verifierade sajter filtrerade av Alfred. Kvalitet garanterad, spam omöjligt. Ge en, få en.",
    ctaSubmit: "Skicka in min sajt",
    ctaDashboard: "Min instrumentpanel"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Tjäna poäng på varje utbyte",
    giveOne: "Ge en, få en",
    giveOneDesc: "Du ger en bakåtlänk, du får en tillbaka",
    alfredFilters: "Alfred filtrerar",
    alfredFiltersDesc: "Noll spam, noll generiskt innehåll"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Varje sajt får ett poäng av 100 baserat på 6 kvalitetssignaler"
  },
  directory: {
    kicker: "Katalog",
    title: "Verifierade Forge-sajter",
    empty: "Katalogen är tom för tillfället",
    emptyDesc: "Bli den första att skicka in din sajt.",
    loading: "Laddar katalog...",
    previous: "Föregående",
    next: "Nästa"
  },
  submit: {
    alfredTitle: "Alfred granskar varje inskickning",
    alfredDesc: "Varje inskickning skannas och granskas av Alfred innan publicering. Kvalitet garanterad, spam omöjligt.",
    urlLabel: "Sajt-URL",
    urlHint: "HTTPS krävs. Måste innehålla en länk till noxelseo.com eller noxelforge.com",
    titleLabel: "Titel",
    nicheLabel: "Nisch",
    descLabel: "Kort beskrivning",
    contentLabel: "Huvudinnehåll",
    contentHint: "valfritt, hjälper Alfred att analysera bättre",
    submitBtn: "Skicka in till NOXEL Forge",
    analyzing: "Analyserar..."
  },
  pricing: {
    kicker: "NOXEL Forge Priser",
    title: "Bygg ditt",
    titleAccent: "auktoritetsnätverk",
    subtitle: "Visa NOXEL-märket på din sajt och lås upp exklusiva rabatter på varje nivå.",
    monthly: "Månadsvis",
    annual: "Årsvis",
    badgeToggle: "Jag visar NOXEL-märket, lås upp rabatt",
    badgeApplied: "Märkesrabatt tillämpad",
    mostPopular: "Mest populär",
    perMonth: "/mån",
    getStarted: "Kom igång gratis",
    badgeInfoTitle: "Hur du låser upp märkesrabatter",
    badgeInfoDesc: "Visa valfritt märke i sidfoten på din sajt. Alfred skannar din sidfot vid varje inskickning."
  },
  badge: {
    kicker: "Visa på din sajt",
    title: "NOXEL Forge",
    titleAccent: "Märken",
    subtitle: "Kopiera och klistra in valfritt märke i din sajts sidfot.",
    copy: "Kopiera kodavsnitt",
    copied: "Kopierat!",
    infoTitle: "Hur märkesrabatter fungerar",
    infoDesc: "Placera valfritt märke i sidfoten på din sajt, på hela sajten. Alfred skannar din sidfot vid varje inskickning. Silver 10%, Guld 15%, Platina 20%, Diamant 25%."
  },
  cta: {
    kicker: "Redo att smida?",
    title: "Gå med i NOXEL Forge",
    subtitle: "Börja bygga ditt verifierade bakåtlänksnätverk idag."
  }
};

const hu: ForgeTranslations = {
  nav: {
    submit: "Beküldés",
    dashboard: "Irányítópult",
    pricing: "Árak",
    badges: "Jelvények"
  },
  hero: {
    kicker: "NOXEL Forge - Backlinkcsere-ökoszisztéma",
    title: "Kovácsold meg",
    titleAccent: "tekintélyedet",
    subtitle: "Cserélje backlinkjeit Alfred által szűrt, ellenőrzött oldalakkal. Minőség garantálva, spam lehetetlen. Adj egyet, kapj egyet.",
    ctaSubmit: "Oldalambeküldése",
    ctaDashboard: "Irányítópultom"
  },
  stats: {
    forgePoints: "Forge Pontok",
    forgePointsDesc: "Pontokat szerzel minden cserével",
    giveOne: "Adj egyet, kapj egyet",
    giveOneDesc: "Adsz egy backlinket, kapsz egyet cserébe",
    alfredFilters: "Alfred szűrői",
    alfredFiltersDesc: "Nulla spam, nulla általános tartalom"
  },
  trust: {
    kicker: "Megbízhatósági Pontszám Forge",
    subtitle: "Minden oldal 100-ból kap pontszámot 6 minőségi jelzés alapján"
  },
  directory: {
    kicker: "Könyvtár",
    title: "Ellenőrzött Forge Oldalak",
    empty: "A könyvtár egyelőre üres",
    emptyDesc: "Légy az első, aki beküldi az oldalát.",
    loading: "Könyvtár betöltése...",
    previous: "Előző",
    next: "Következő"
  },
  submit: {
    alfredTitle: "Alfred minden beküldést felülvizsgál",
    alfredDesc: "Minden beküldést Alfred megvizsgál és felülvizsgál közzététel előtt. Minőség garantálva, spam lehetetlen.",
    urlLabel: "Oldal URL-je",
    urlHint: "HTTPS szükséges. Tartalmaznia kell egy hivatkozást a noxelseo.com vagy noxelforge.com oldalra",
    titleLabel: "Cím",
    nicheLabel: "Szakterület",
    descLabel: "Rövid leírás",
    contentLabel: "Fő tartalom",
    contentHint: "opcionális, segít Alfrednek jobb elemzést végezni",
    submitBtn: "Beküldés a NOXEL Forge-ba",
    analyzing: "Elemzés folyamatban..."
  },
  pricing: {
    kicker: "NOXEL Forge Árak",
    title: "Építsd fel",
    titleAccent: "tekintélyhálózatodat",
    subtitle: "Jelenítsd meg a NOXEL jelvényt az oldaladon, és oldd fel az exkluzív kedvezményeket minden szinten.",
    monthly: "Havi",
    annual: "Éves",
    badgeToggle: "Megjelenítem a NOXEL jelvényt, kedvezmény feloldása",
    badgeApplied: "Jelvény kedvezmény alkalmazva",
    mostPopular: "Legnépszerűbb",
    perMonth: "/hó",
    getStarted: "Kezdd el ingyen",
    badgeInfoTitle: "Hogyan oldhatod fel a jelvény kedvezményeket",
    badgeInfoDesc: "Jelenítsd meg bármelyik jelvényt az oldalad láblécében. Alfred minden beküldéskor megvizsgálja a láblécedet."
  },
  badge: {
    kicker: "Jelenítsd meg az oldaladon",
    title: "NOXEL Forge",
    titleAccent: "Jelvények",
    subtitle: "Másold be bármelyik jelvényt az oldalad láblécébe.",
    copy: "Kód másolása",
    copied: "Másolva!",
    infoTitle: "Hogyan működnek a jelvény kedvezmények",
    infoDesc: "Helyezz el bármelyik jelvényt az oldalad láblécében, az egész oldalon. Alfred minden beküldéskor megvizsgálja a láblécedet. Ezüst 10%, Arany 15%, Platina 20%, Gyémánt 25%."
  },
  cta: {
    kicker: "Készen állsz a kovácsolásra?",
    title: "Csatlakozz a NOXEL Forge-hoz",
    subtitle: "Kezdd el építeni az ellenőrzött backlinkjeid hálózatát még ma."
  }
};

const bn: ForgeTranslations = {
  nav: {
    submit: "জমা দিন",
    dashboard: "ড্যাশবোর্ড",
    pricing: "মূল্য নির্ধারণ",
    badges: "ব্যাজ"
  },
  hero: {
    kicker: "NOXEL Forge - ব্যাকলিংক এক্সচেঞ্জ ইকোসিস্টেম",
    title: "আপনার",
    titleAccent: "কর্তৃত্ব",
    subtitle: "Alfred দ্বারা যাচাইকৃত সাইটগুলির সাথে ব্যাকলিংক বিনিময় করুন। গুণমান নিশ্চিত, স্প্যাম অসম্ভব। একটি দিন, একটি পান।",
    ctaSubmit: "আমার সাইট জমা দিন",
    ctaDashboard: "আমার ড্যাশবোর্ড"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "প্রতিটি বিনিময়ে পয়েন্ট অর্জন করুন",
    giveOne: "একটি দিন, একটি পান",
    giveOneDesc: "আপনি একটি ব্যাকলিংক দিন, একটি ফেরত পান",
    alfredFilters: "Alfred ফিল্টার করে",
    alfredFiltersDesc: "শূন্য স্প্যাম, শূন্য সাধারণ কন্টেন্ট"
  },
  trust: {
    kicker: "ট্রাস্ট স্কোর Forge",
    subtitle: "প্রতিটি সাইট ৬টি গুণমান সংকেতের ভিত্তিতে ১০০ এর মধ্যে একটি স্কোর পায়"
  },
  directory: {
    kicker: "ডিরেক্টরি",
    title: "যাচাইকৃত Forge সাইটসমূহ",
    empty: "ডিরেক্টরি এখন খালি",
    emptyDesc: "আপনার সাইট জমা দিতে প্রথম হন।",
    loading: "ডিরেক্টরি লোড হচ্ছে...",
    previous: "আগের",
    next: "পরের"
  },
  submit: {
    alfredTitle: "Alfred প্রতিটি জমা পর্যালোচনা করে",
    alfredDesc: "প্রকাশের আগে Alfred প্রতিটি জমা স্ক্যান ও পর্যালোচনা করে। গুণমান নিশ্চিত, স্প্যাম অসম্ভব।",
    urlLabel: "সাইট URL",
    urlHint: "HTTPS প্রয়োজন। noxelseo.com বা noxelforge.com এর লিংক থাকতে হবে",
    titleLabel: "শিরোনাম",
    nicheLabel: "নিশ",
    descLabel: "সংক্ষিপ্ত বিবরণ",
    contentLabel: "মূল কন্টেন্ট",
    contentHint: "ঐচ্ছিক, Alfred কে আরও ভালো বিশ্লেষণ করতে সাহায্য করে",
    submitBtn: "NOXEL Forge এ জমা দিন",
    analyzing: "বিশ্লেষণ করা হচ্ছে..."
  },
  pricing: {
    kicker: "NOXEL Forge মূল্য নির্ধারণ",
    title: "আপনার",
    titleAccent: "অথরিটি নেটওয়ার্ক",
    subtitle: "আপনার সাইটে NOXEL ব্যাজ প্রদর্শন করুন এবং প্রতিটি স্তরে একচেটিয়া ছাড় আনলক করুন।",
    monthly: "মাসিক",
    annual: "বার্ষিক",
    badgeToggle: "আমি NOXEL ব্যাজ প্রদর্শন করি, ছাড় আনলক করুন",
    badgeApplied: "ব্যাজ ছাড় প্রযোজ্য হয়েছে",
    mostPopular: "সবচেয়ে জনপ্রিয়",
    perMonth: "/মাস",
    getStarted: "বিনামূল্যে শুরু করুন",
    badgeInfoTitle: "ব্যাজ ছাড় আনলক করার উপায়",
    badgeInfoDesc: "আপনার সাইটের ফুটারে যেকোনো ব্যাজ প্রদর্শন করুন। Alfred প্রতিটি জমার সময় আপনার ফুটার স্ক্যান করে।"
  },
  badge: {
    kicker: "আপনার সাইটে প্রদর্শন করুন",
    title: "NOXEL Forge",
    titleAccent: "ব্যাজ",
    subtitle: "যেকোনো ব্যাজ কপি করে আপনার সাইটের ফুটারে পেস্ট করুন।",
    copy: "স্নিপেট কপি করুন",
    copied: "কপি হয়েছে!",
    infoTitle: "ব্যাজ ছাড় কীভাবে কাজ করে",
    infoDesc: "আপনার সাইটের ফুটারে সাইটব্যাপী যেকোনো ব্যাজ রাখুন। Alfred প্রতিটি জমার সময় আপনার ফুটার স্ক্যান করে। সিলভার ১০%, গোল্ড ১৫%, প্লাটিনাম ২০%, ডায়মন্ড ২৫%।"
  },
  cta: {
    kicker: "Forge করতে প্রস্তুত?",
    title: "NOXEL Forge এ যোগ দিন",
    subtitle: "আজই আপনার যাচাইকৃত ব্যাকলিংক নেটওয়ার্ক তৈরি শুরু করুন।"
  }
};

const sg: ForgeTranslations = {
  nav: {
    submit: "Tongana",
    dashboard: "Tableau de bord",
    pricing: "Mbongo",
    badges: "Badges"
  },
  hero: {
    kicker: "NOXEL Forge - Système na Lege ti Backlink",
    title: "Sango ni",
    titleAccent: "atoriti",
    subtitle: "Lege backlinks na sites vérifiés na Alfred. Kalité garantie, spam possible ala. Fa môndô, sô môndô.",
    ctaSubmit: "Tongana site ti mi",
    ctaDashboard: "Tableau de bord ti mi"
  },
  stats: {
    forgePoints: "Points ti Forge",
    forgePointsDesc: "Hinga points na lege niënga niënga",
    giveOne: "Fa môndô, sô môndô",
    giveOneDesc: "Fa backlink môndô, hinga môndô pekô",
    alfredFilters: "Filtres ti Alfred",
    alfredFiltersDesc: "Spam ala, contenu générique ala"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Site niënga niënga hinga score na 100 na signaux ti kalité 6"
  },
  directory: {
    kicker: "Répertoire",
    title: "Sites ti Forge vérifiés",
    empty: "Répertoire nda li ahûnzi sêse",
    emptyDesc: "Wâ mbï tongana site ti mo.",
    loading: "Répertoire li tî na...",
    previous: "Sï ndo",
    next: "Gbîâ"
  },
  submit: {
    alfredTitle: "Alfred tîngbi soumission niënga niënga",
    alfredDesc: "Soumission niënga niënga scanée na tîngbi na Alfred sïo na publication. Kalité garantie, spam possible ala.",
    urlLabel: "URL ti site",
    urlHint: "HTTPS obligatoire. Fâa link na noxelseo.com wala noxelforge.com",
    titleLabel: "Titre",
    nicheLabel: "Niche",
    descLabel: "Description peke",
    contentLabel: "Contenu principal",
    contentHint: "optionnel, d'ûte Alfred analyser nzïânî",
    submitBtn: "Tongana na NOXEL Forge",
    analyzing: "Analyse li tî na..."
  },
  pricing: {
    kicker: "Mbongo ti NOXEL Forge",
    title: "Sango ni",
    titleAccent: "réseau ti atoriti",
    subtitle: "Veke badge ti NOXEL na site ti mo sô réductions exclusives na tier niënga niënga.",
    monthly: "Na nze",
    annual: "Na ngû",
    badgeToggle: "Mi veke badge ti NOXEL, hinga réduction",
    badgeApplied: "Réduction ti badge appliquée",
    mostPopular: "Populaire kolë",
    perMonth: "/nze",
    getStarted: "Dëngbi vîra da",
    badgeInfoTitle: "Tongana réductions ti badge",
    badgeInfoDesc: "Veke badge niënga na footer ti site ti mo. Alfred scane footer ti mo na soumission niënga niënga."
  },
  badge: {
    kicker: "Veke na site ti mo",
    title: "NOXEL Forge",
    titleAccent: "Badges",
    subtitle: "Copie na colle badge niënga na footer ti site ti mo.",
    copy: "Copie snippet",
    copied: "Copié!",
    infoTitle: "Tongana réductions ti badge",
    infoDesc: "Veke badge niënga na footer ti site ti mo, site-wide. Alfred scane footer ti mo na soumission niënga niënga. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Prêt na forger?",
    title: "Kûmbï NOXEL Forge",
    subtitle: "Dëngbi sango ni réseau ti backlinks vérifiés ti mo sêse."
  }
};

const ko: ForgeTranslations = {
  nav: {
    submit: "제출",
    dashboard: "대시보드",
    pricing: "요금제",
    badges: "배지"
  },
  hero: {
    kicker: "NOXEL Forge - 백링크 교환 생태계",
    title: "당신의",
    titleAccent: "권위",
    subtitle: "Alfred가 필터링한 검증된 사이트와 백링크를 교환하세요. 품질 보장, 스팸 불가. 하나 주고, 하나 받기.",
    ctaSubmit: "내 사이트 제출하기",
    ctaDashboard: "내 대시보드"
  },
  stats: {
    forgePoints: "포지 포인트",
    forgePointsDesc: "모든 교환마다 포인트 적립",
    giveOne: "하나 주고, 하나 받기",
    giveOneDesc: "백링크를 제공하면, 백링크를 돌려받습니다",
    alfredFilters: "Alfred 필터",
    alfredFiltersDesc: "스팸 제로, 일반 콘텐츠 제로"
  },
  trust: {
    kicker: "신뢰 점수 포지",
    subtitle: "모든 사이트는 6가지 품질 지표를 기반으로 100점 만점의 점수를 받습니다"
  },
  directory: {
    kicker: "디렉토리",
    title: "검증된 포지 사이트",
    empty: "디렉토리가 현재 비어 있습니다",
    emptyDesc: "가장 먼저 사이트를 제출해 보세요.",
    loading: "디렉토리 로딩 중...",
    previous: "이전",
    next: "다음"
  },
  submit: {
    alfredTitle: "Alfred가 모든 제출을 검토합니다",
    alfredDesc: "모든 제출은 게시 전에 Alfred에 의해 스캔 및 검토됩니다. 품질 보장, 스팸 불가.",
    urlLabel: "사이트 URL",
    urlHint: "HTTPS 필수. noxelseo.com 또는 noxelforge.com으로의 링크가 포함되어야 합니다",
    titleLabel: "제목",
    nicheLabel: "틈새 시장",
    descLabel: "간단한 설명",
    contentLabel: "주요 콘텐츠",
    contentHint: "선택 사항, Alfred의 분석에 도움이 됩니다",
    submitBtn: "NOXEL Forge에 제출하기",
    analyzing: "분석 중..."
  },
  pricing: {
    kicker: "NOXEL Forge 요금제",
    title: "당신의",
    titleAccent: "권위 네트워크 구축",
    subtitle: "사이트에 NOXEL 배지를 표시하고 모든 등급에서 독점 할인을 받으세요.",
    monthly: "월간",
    annual: "연간",
    badgeToggle: "NOXEL 배지를 표시하여 할인 적용",
    badgeApplied: "배지 할인 적용됨",
    mostPopular: "가장 인기 있는",
    perMonth: "/월",
    getStarted: "무료로 시작하기",
    badgeInfoTitle: "배지 할인을 받는 방법",
    badgeInfoDesc: "사이트 푸터에 배지를 표시하세요. Alfred는 모든 제출 시 푸터를 스캔합니다."
  },
  badge: {
    kicker: "사이트에 표시하기",
    title: "NOXEL Forge",
    titleAccent: "배지",
    subtitle: "사이트 푸터에 배지를 복사하여 붙여넣으세요.",
    copy: "코드 복사",
    copied: "복사됨!",
    infoTitle: "배지 할인 작동 방식",
    infoDesc: "사이트 전체 푸터에 배지를 삽입하세요. Alfred는 모든 제출 시 푸터를 스캔합니다. 실버 10%, 골드 15%, 플래티넘 20%, 다이아몬드 25%."
  },
  cta: {
    kicker: "포징할 준비가 되셨나요?",
    title: "NOXEL Forge에 참여하세요",
    subtitle: "오늘부터 검증된 백링크 네트워크를 구축하세요."
  }
};

const fa: ForgeTranslations = {
  nav: {
    submit: "ارسال",
    dashboard: "داشبورد",
    pricing: "قیمت‌گذاری",
    badges: "نشان‌ها"
  },
  hero: {
    kicker: "NOXEL Forge - اکوسیستم تبادل بک‌لینک",
    title: "اعتبار خود را",
    titleAccent: "آهنگری کنید",
    subtitle: "بک‌لینک را با سایت‌های تأییدشده فیلترشده توسط Alfred تبادل کنید. کیفیت تضمین‌شده، اسپم غیرممکن. یکی بده، یکی بگیر.",
    ctaSubmit: "سایتم را ارسال کن",
    ctaDashboard: "داشبورد من"
  },
  stats: {
    forgePoints: "امتیازات Forge",
    forgePointsDesc: "در هر تبادل امتیاز کسب کنید",
    giveOne: "یکی بده، یکی بگیر",
    giveOneDesc: "یک بک‌لینک می‌دهید، یک بک‌لینک دریافت می‌کنید",
    alfredFilters: "فیلترهای Alfred",
    alfredFiltersDesc: "صفر اسپم، صفر محتوای عمومی"
  },
  trust: {
    kicker: "امتیاز اعتماد Forge",
    subtitle: "هر سایت بر اساس ۶ سیگنال کیفیتی امتیازی از ۱۰۰ دریافت می‌کند"
  },
  directory: {
    kicker: "دایرکتوری",
    title: "سایت‌های تأییدشده Forge",
    empty: "دایرکتوری فعلاً خالی است",
    emptyDesc: "اولین نفری باشید که سایتش را ارسال می‌کند.",
    loading: "در حال بارگذاری دایرکتوری...",
    previous: "قبلی",
    next: "بعدی"
  },
  submit: {
    alfredTitle: "Alfred هر ارسال را بررسی می‌کند",
    alfredDesc: "هر ارسال قبل از انتشار توسط Alfred اسکن و بررسی می‌شود. کیفیت تضمین‌شده، اسپم غیرممکن.",
    urlLabel: "آدرس سایت",
    urlHint: "HTTPS الزامی است. باید شامل لینکی به noxelseo.com یا noxelforge.com باشد",
    titleLabel: "عنوان",
    nicheLabel: "حوزه",
    descLabel: "توضیح کوتاه",
    contentLabel: "محتوای اصلی",
    contentHint: "اختیاری، به Alfred کمک می‌کند بهتر تحلیل کند",
    submitBtn: "ارسال به NOXEL Forge",
    analyzing: "در حال تحلیل..."
  },
  pricing: {
    kicker: "قیمت‌گذاری NOXEL Forge",
    title: "شبکه",
    titleAccent: "اعتبار خود را بسازید",
    subtitle: "نشان NOXEL را در سایت خود نمایش دهید و تخفیف‌های انحصاری در هر سطح را باز کنید.",
    monthly: "ماهانه",
    annual: "سالانه",
    badgeToggle: "نشان NOXEL را نمایش می‌دهم، تخفیف را باز کن",
    badgeApplied: "تخفیف نشان اعمال شد",
    mostPopular: "محبوب‌ترین",
    perMonth: "/ماه",
    getStarted: "رایگان شروع کنید",
    badgeInfoTitle: "چگونه تخفیف‌های نشان را باز کنید",
    badgeInfoDesc: "هر نشانی را در فوتر سایت خود نمایش دهید. Alfred در هر ارسال فوتر شما را اسکن می‌کند."
  },
  badge: {
    kicker: "در سایت خود نمایش دهید",
    title: "NOXEL Forge",
    titleAccent: "نشان‌ها",
    subtitle: "هر نشان را کپی کرده و در فوتر سایت خود قرار دهید.",
    copy: "کپی کد",
    copied: "کپی شد!",
    infoTitle: "تخفیف‌های نشان چگونه کار می‌کنند",
    infoDesc: "هر نشانی را در فوتر سایت خود در تمام صفحات قرار دهید. Alfred در هر ارسال فوتر شما را اسکن می‌کند. نقره‌ای ۱۰٪، طلایی ۱۵٪، پلاتینیوم ۲۰٪، الماس ۲۵٪."
  },
  cta: {
    kicker: "آماده آهنگری هستید؟",
    title: "به NOXEL Forge بپیوندید",
    subtitle: "همین امروز شبکه بک‌لینک تأییدشده خود را بسازید."
  }
};

const uk: ForgeTranslations = {
  nav: {
    submit: "Надіслати",
    dashboard: "Панель керування",
    pricing: "Ціни",
    badges: "Бейджі"
  },
  hero: {
    kicker: "NOXEL Forge - Екосистема обміну зворотними посиланнями",
    title: "Куйте свій",
    titleAccent: "авторитет",
    subtitle: "Обмінюйтесь зворотними посиланнями з перевіреними сайтами, відфільтрованими Alfred. Якість гарантована, спам неможливий. Дай одне — отримай одне.",
    ctaSubmit: "Додати мій сайт",
    ctaDashboard: "Моя панель керування"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Заробляйте бали за кожен обмін",
    giveOne: "Дай одне — отримай одне",
    giveOneDesc: "Ви даєте зворотне посилання — отримуєте одне у відповідь",
    alfredFilters: "Фільтри Alfred",
    alfredFiltersDesc: "Нуль спаму, нуль загального контенту"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Кожен сайт отримує оцінку зі 100 на основі 6 сигналів якості"
  },
  directory: {
    kicker: "Каталог",
    title: "Перевірені сайти Forge",
    empty: "Каталог поки що порожній",
    emptyDesc: "Будьте першим, хто додасть свій сайт.",
    loading: "Завантаження каталогу...",
    previous: "Назад",
    next: "Вперед"
  },
  submit: {
    alfredTitle: "Alfred перевіряє кожну заявку",
    alfredDesc: "Кожна заявка сканується та перевіряється Alfred перед публікацією. Якість гарантована, спам неможливий.",
    urlLabel: "URL сайту",
    urlHint: "Потрібен HTTPS. Має містити посилання на noxelseo.com або noxelforge.com",
    titleLabel: "Назва",
    nicheLabel: "Ніша",
    descLabel: "Короткий опис",
    contentLabel: "Основний контент",
    contentHint: "необов'язково, допомагає Alfred краще аналізувати",
    submitBtn: "Надіслати до NOXEL Forge",
    analyzing: "Аналізується..."
  },
  pricing: {
    kicker: "Ціни NOXEL Forge",
    title: "Будуйте свою",
    titleAccent: "мережу авторитету",
    subtitle: "Розмістіть бейдж NOXEL на своєму сайті та отримайтеексклюзивні знижки на кожному рівні.",
    monthly: "Щомісяця",
    annual: "Щорічно",
    badgeToggle: "Я розміщую бейдж NOXEL, розблокувати знижку",
    badgeApplied: "Знижку за бейдж застосовано",
    mostPopular: "Найпопулярніший",
    perMonth: "/міс",
    getStarted: "Почати безкоштовно",
    badgeInfoTitle: "Як розблокувати знижки за бейдж",
    badgeInfoDesc: "Розмістіть будь-який бейдж у футері свого сайту. Alfred сканує ваш футер при кожній заявці."
  },
  badge: {
    kicker: "Розмістіть на своєму сайті",
    title: "NOXEL Forge",
    titleAccent: "Бейджі",
    subtitle: "Скопіюйте та вставте будь-який бейдж у футер свого сайту.",
    copy: "Копіювати код",
    copied: "Скопійовано!",
    infoTitle: "Як працюють знижки за бейдж",
    infoDesc: "Розмістіть будь-який бейдж у футері свого сайту на всіх сторінках. Alfred сканує ваш футер при кожній заявці. Срібний 10%, Золотий 15%, Платиновий 20%, Діамантовий 25%."
  },
  cta: {
    kicker: "Готові кувати?",
    title: "Приєднуйтесь до NOXEL Forge",
    subtitle: "Почніть будувати свою перевірену мережу зворотних посилань вже сьогодні."
  }
};

const mi: ForgeTranslations = {
  nav: {
    submit: "Tuku",
    dashboard: "Papatohu",
    pricing: "Utu",
    badges: "Tohu"
  },
  hero: {
    kicker: "NOXEL Forge - Punaha Whakawhiti Hononga Tūāhononga",
    title: "Hangaia tō",
    titleAccent: "mana",
    subtitle: "Whakawhitia ngā hononga tūāhononga me ngā pae i tirohia e Alfred. Ko te kounga i whakatinanahia, kāore e taea te tūkino. Homai kotahi, whiwhi kotahi.",
    ctaSubmit: "Tukua taku pae",
    ctaDashboard: "Taku Papatohu"
  },
  stats: {
    forgePoints: "Ngā Tohu Forge",
    forgePointsDesc: "Whiwhi tohu i ia whakawhitinga",
    giveOne: "Homai kotahi, whiwhi kotahi",
    giveOneDesc: "Ka homai koe i tētahi hononga, ka whiwhi koe i tētahi anō",
    alfredFilters: "Ngā tātari a Alfred",
    alfredFiltersDesc: "Kore tūkino, kore ihirangi noa"
  },
  trust: {
    kicker: "Tohu Whakapono Forge",
    subtitle: "Ka whiwhi ia pae i tētahi kaute o raro i te 100 i runga i ngā tohu kounga e 6"
  },
  directory: {
    kicker: "Rārangi Ingoa",
    title: "Ngā Pae Forge Kua Tirohia",
    empty: "Kei te kau te rārangi ingoa i tēnei wā",
    emptyDesc: "Ko koe te mea tuatahi ki te tuku i tō pae.",
    loading: "Kei te uta te rārangi ingoa...",
    previous: "Mua",
    next: "Muri"
  },
  submit: {
    alfredTitle: "Ka arotake a Alfred i ia tukuanga",
    alfredDesc: "Ka tirotirohia, ka arotakehia hoki ia tukuanga e Alfred i mua i te whakaputa. Ko te kounga i whakatinanahia, kāore e taea te tūkino.",
    urlLabel: "URL Pae",
    urlHint: "Me hiahia HTTPS. Me whai hononga ki noxelseo.com rānei noxelforge.com",
    titleLabel: "Taitara",
    nicheLabel: "Āpure",
    descLabel: "Whakaahuatanga poto",
    contentLabel: "Ihirangi matua",
    contentHint: "ārahina, āwhina ana ia Alfred ki te tātari pai ake",
    submitBtn: "Tukua ki NOXEL Forge",
    analyzing: "Kei te tātari..."
  },
  pricing: {
    kicker: "Utu NOXEL Forge",
    title: "Hangaia tō",
    titleAccent: "whatunga mana",
    subtitle: "Whakaaturia te tohu NOXEL ki tō pae me te whakatuwhera i ngā whakaheke motuhake ki ia paepae.",
    monthly: "Marama",
    annual: "Tau",
    badgeToggle: "Kei te whakaatu ahau i te tohu NOXEL, whakatuwhera whakaheke",
    badgeApplied: "Kua tāruatia te whakaheke tohu",
    mostPopular: "Tino rongonui",
    perMonth: "/marama",
    getStarted: "Tīmata kore utu",
    badgeInfoTitle: "Me pēhea te whakatuwhera i ngā whakaheke tohu",
    badgeInfoDesc: "Whakaaturia tētahi tohu ki raro o tō pae. Ka tirotiro a Alfred i tō raro i ia tukuanga."
  },
  badge: {
    kicker: "Whakaaturia ki tō pae",
    title: "NOXEL Forge",
    titleAccent: "Ngā Tohu",
    subtitle: "Tāruatia, pēhia hoki tētahi tohu ki raro o tō pae.",
    copy: "Tāruatia te māpura",
    copied: "Kua tāruatia!",
    infoTitle: "Me pēhea e mahi ai ngā whakaheke tohu",
    infoDesc: "Whakauria tētahi tohu ki raro o tō pae, puta noa i te pae. Ka tirotiro a Alfred i tō raro i ia tukuanga. Hiriwa 10%, Koura 15%, Konganuku 20%, Taimana 25%."
  },
  cta: {
    kicker: "Kua rite ki te hanga?",
    title: "Hono ki NOXEL Forge",
    subtitle: "Tīmata te hanga i tō whatunga hononga tūāhononga kua tirohia i tēnei rā."
  }
};

const sw: ForgeTranslations = {
  nav: {
    submit: "Wasilisha",
    dashboard: "Dashibodi",
    pricing: "Bei",
    badges: "Beji"
  },
  hero: {
    kicker: "NOXEL Forge - Mfumo wa Kubadilishana Viungo",
    title: "Jenga",
    titleAccent: "mamlaka yako",
    subtitle: "Badilishana viungo na tovuti zilizothibitishwa zilizochujwa na Alfred. Ubora unahakikishiwa, taka haiwezekani. Toa moja, pata moja.",
    ctaSubmit: "Wasilisha tovuti yangu",
    ctaDashboard: "Dashibodi Yangu"
  },
  stats: {
    forgePoints: "Pointi za Forge",
    forgePointsDesc: "Pata pointi kwa kila ubadilishanaji",
    giveOne: "Toa moja, pata moja",
    giveOneDesc: "Unatoa kiungo, unapata kimoja kurudi",
    alfredFilters: "Alfred anachuja",
    alfredFiltersDesc: "Bila taka, bila maudhui ya kawaida"
  },
  trust: {
    kicker: "Alama ya Uaminifu ya Forge",
    subtitle: "Kila tovuti inapata alama kati ya 100 kulingana na ishara 6 za ubora"
  },
  directory: {
    kicker: "Saraka",
    title: "Tovuti Zilizothibitishwa za Forge",
    empty: "Saraka iko tupu kwa sasa",
    emptyDesc: "Kuwa wa kwanza kuwasilisha tovuti yako.",
    loading: "Inapakia saraka...",
    previous: "Iliyotangulia",
    next: "Inayofuata"
  },
  submit: {
    alfredTitle: "Alfred anakagua kila uwasilishaji",
    alfredDesc: "Kila uwasilishaji unascanniwa na kukaguliwa na Alfred kabla ya kuchapishwa. Ubora unahakikishiwa, taka haiwezekani.",
    urlLabel: "URL ya Tovuti",
    urlHint: "HTTPS inahitajika. Lazima iwe na kiungo cha noxelseo.com au noxelforge.com",
    titleLabel: "Kichwa",
    nicheLabel: "Niche",
    descLabel: "Maelezo mafupi",
    contentLabel: "Maudhui makuu",
    contentHint: "si lazima, husaidia Alfred kuchambua vizuri zaidi",
    submitBtn: "Wasilisha kwa NOXEL Forge",
    analyzing: "Inachambua..."
  },
  pricing: {
    kicker: "Bei za NOXEL Forge",
    title: "Jenga",
    titleAccent: "mtandao wako wa mamlaka",
    subtitle: "Onyesha beji ya NOXEL kwenye tovuti yako na fungua punguzo za kipekee kwa kila ngazi.",
    monthly: "Kila Mwezi",
    annual: "Kila Mwaka",
    badgeToggle: "Ninaonyesha beji ya NOXEL, fungua punguzo",
    badgeApplied: "Punguzo la beji limetumika",
    mostPopular: "Maarufu zaidi",
    perMonth: "/mwezi",
    getStarted: "Anza bila malipo",
    badgeInfoTitle: "Jinsi ya kufungua punguzo za beji",
    badgeInfoDesc: "Onyesha beji yoyote kwenye sehemu ya chini ya tovuti yako. Alfred anascan sehemu ya chini yako kwa kila uwasilishaji."
  },
  badge: {
    kicker: "Onyesha kwenye tovuti yako",
    title: "NOXEL Forge",
    titleAccent: "Beji",
    subtitle: "Nakili na ubandike beji yoyote kwenye sehemu ya chini ya tovuti yako.",
    copy: "Nakili msimbo",
    copied: "Imenakiliwa!",
    infoTitle: "Jinsi punguzo za beji zinavyofanya kazi",
    infoDesc: "Weka beji yoyote kwenye sehemu ya chini ya tovuti yako, kwa kurasa zote. Alfred anascan sehemu ya chini yako kwa kila uwasilishaji. Fedha 10%, Dhahabu 15%, Platinamu 20%, Almasi 25%."
  },
  cta: {
    kicker: "Uko tayari kuunda?",
    title: "Jiunge na NOXEL Forge",
    subtitle: "Anza kujenga mtandao wako wa viungo vilivyothibitishwa leo."
  }
};

const bs: ForgeTranslations = {
  nav: {
    submit: "Pošalji",
    dashboard: "Kontrolna tabla",
    pricing: "Cijene",
    badges: "Značke"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistem razmjene backlinkova",
    title: "Izgradite svoj",
    titleAccent: "autoritet",
    subtitle: "Razmjenjujte backlinkove s verificiranim stranicama filtriranim od strane Alfreda. Kvalitet zagarantovan, spam nemoguć. Daj jedan, dobij jedan.",
    ctaSubmit: "Pošalji moju stranicu",
    ctaDashboard: "Moja kontrolna tabla"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Zarađujte bodove na svakoj razmjeni",
    giveOne: "Daj jedan, dobij jedan",
    giveOneDesc: "Dajete backlink, dobijate jedan nazad",
    alfredFilters: "Alfred filtrira",
    alfredFiltersDesc: "Nula spama, nula generičkog sadržaja"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Svaka stranica dobiva ocjenu od 100 na osnovu 6 signala kvaliteta"
  },
  directory: {
    kicker: "Direktorij",
    title: "Verificirane Forge stranice",
    empty: "Direktorij je za sada prazan",
    emptyDesc: "Budite prvi koji će poslati svoju stranicu.",
    loading: "Učitavanje direktorija...",
    previous: "Prethodna",
    next: "Sljedeća"
  },
  submit: {
    alfredTitle: "Alfred pregledava svaki zahtjev",
    alfredDesc: "Svaki zahtjev Alfred skenira i pregledava prije objave. Kvalitet zagarantovan, spam nemoguć.",
    urlLabel: "URL stranice",
    urlHint: "HTTPS obavezan. Mora sadržavati link na noxelseo.com ili noxelforge.com",
    titleLabel: "Naslov",
    nicheLabel: "Niša",
    descLabel: "Kratki opis",
    contentLabel: "Glavni sadržaj",
    contentHint: "opcionalno, pomaže Alfredu da bolje analizira",
    submitBtn: "Pošalji na NOXEL Forge",
    analyzing: "Analiziranje..."
  },
  pricing: {
    kicker: "NOXEL Forge Cijene",
    title: "Izgradite svoju",
    titleAccent: "mrežu autoriteta",
    subtitle: "Prikažite NOXEL značku na svojoj stranici i otključajte ekskluzivne popuste na svakom nivou.",
    monthly: "Mjesečno",
    annual: "Godišnje",
    badgeToggle: "Prikazujem NOXEL značku, otključavam popust",
    badgeApplied: "Popust za značku primijenjen",
    mostPopular: "Najpopularnije",
    perMonth: "/mj",
    getStarted: "Počnite besplatno",
    badgeInfoTitle: "Kako otključati popuste za značke",
    badgeInfoDesc: "Prikažite bilo koju značku u podnožju svoje stranice. Alfred skenira vaše podnožje pri svakom slanju."
  },
  badge: {
    kicker: "Prikažite na svojoj stranici",
    title: "NOXEL Forge",
    titleAccent: "Značke",
    subtitle: "Kopirajte i zalijepite bilo koju značku u podnožje svoje stranice.",
    copy: "Kopiraj kod",
    copied: "Kopirano!",
    infoTitle: "Kako funkcionišu popusti za značke",
    infoDesc: "Postavite bilo koju značku u podnožje svoje stranice, na cijeloj stranici. Alfred skenira vaše podnožje pri svakom slanju. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Spremni za kovanje?",
    title: "Pridružite se NOXEL Forge",
    subtitle: "Počnite graditi svoju verificiranu mrežu backlinkova danas."
  }
};

const nr: ForgeTranslations = {
  nav: {
    submit: "Thumela",
    dashboard: "Ibhodi lokuphatha",
    pricing: "Amanani",
    badges: "Izibaxa"
  },
  hero: {
    kicker: "NOXEL Forge - Indawo yokushintshana kwezikhonkwane",
    title: "Akha",
    titleAccent: "igunya lakho",
    subtitle: "Shintshanisa izikhonkwane nezizinda eziqinisekisiwe ezihlungwa yi-Alfred. Ikhwalithi iqinisekisiwe, ugcwele ukukhohlisa akukwenzeki. Nika elilodwa, thola elilodwa.",
    ctaSubmit: "Thumela isizinda sami",
    ctaDashboard: "Ibhodi lami lokuphatha"
  },
  stats: {
    forgePoints: "Amaphuzu we-Forge",
    forgePointsDesc: "Hola amaphuzu kukho konke ukushintshana",
    giveOne: "Nika elilodwa, thola elilodwa",
    giveOneDesc: "Unika ikhonkwane, uthola elinye",
    alfredFilters: "Izihlungi ze-Alfred",
    alfredFiltersDesc: "Akukho gcwele ukukhohlisa, akukho okuqukethwe okuvamile"
  },
  trust: {
    kicker: "Amanani wethemba le-Forge",
    subtitle: "Isizinda ngasinye sithola amanani angama-100 ngokusekelwe ezimontweni eziyisithupha zekhwalithi"
  },
  directory: {
    kicker: "Uhlu",
    title: "Izizinda ze-Forge eziQinisekisiwe",
    empty: "Uhlu luyisikhala njengamanje",
    emptyDesc: "Yiba owokuqala ukuthumela isizinda sakho.",
    loading: "Iyalayisha uhlu...",
    previous: "Elidlulile",
    next: "Esilandelayo"
  },
  submit: {
    alfredTitle: "Alfred uyahlola yonke imithombo",
    alfredDesc: "Yonke imithombo iyaskenwa futhi ihlolwe yi-Alfred ngaphambi kokushicilelwa. Ikhwalithi iqinisekisiwe, ugcwele ukukhohlisa akukwenzeki.",
    urlLabel: "I-URL yesizinda",
    urlHint: "I-HTTPS iyadingeka. Kufanele kube nekhonkwane eliya ku-noxelseo.com noma ku-noxelforge.com",
    titleLabel: "Isihloko",
    nicheLabel: "Iniche",
    descLabel: "Incazelo emfushane",
    contentLabel: "Okuqukethwe okukhulu",
    contentHint: "okukhethekile, kusiza i-Alfred ukuhlaziya kangcono",
    submitBtn: "Thumela ku-NOXEL Forge",
    analyzing: "Iyahlaziya..."
  },
  pricing: {
    kicker: "Amanani we-NOXEL Forge",
    title: "Akha",
    titleAccent: "inethiwekhi yakho yegunya",
    subtitle: "Bonisa ibaxa le-NOXEL esizindeni sakho futhi uvule izaphulelo ezikhethekile kumazinga wonke.",
    monthly: "Ngenyanga",
    annual: "Ngonyaka",
    badgeToggle: "Ngibonisa ibaxa le-NOXEL, vula isaphulelo",
    badgeApplied: "Isaphulelo sebaxa sisebenzisiwe",
    mostPopular: "Edumile kakhulu",
    perMonth: "/inyanga",
    getStarted: "Qala mahhala",
    badgeInfoTitle: "Ungavula kanjani izaphulelo zebaxa",
    badgeInfoDesc: "Bonisa noma yiliphi ibaxa ekhasini lemvelo lesizinda sakho. I-Alfred iskenya ikhasini lakho lemvelo kukho konke ukuthunyelwa."
  },
  badge: {
    kicker: "Bonisa esizindeni sakho",
    title: "NOXEL Forge",
    titleAccent: "Izibaxa",
    subtitle: "Kopisha bese ufaka noma yiliphi ibaxa ekhasini lemvelo lesizinda sakho.",
    copy: "Kopisha ucezu",
    copied: "Kukopishiwe!",
    infoTitle: "Izaphulelo zebaxa zisebenza kanjani",
    infoDesc: "Beka noma yiliphi ibaxa ekhasini lemvelo lesizinda sakho, ku-site yonke. I-Alfred iskenya ikhasini lakho lemvelo kukho konke ukuthunyelwa. Isiliva 10%, Igolide 15%, I-Platinum 20%, IDayimane 25%."
  },
  cta: {
    kicker: "Ulungele ukwakha?",
    title: "Joyina i-NOXEL Forge",
    subtitle: "Qala ukwakha inethiwekhi yakho yezikhonkwane eziQinisekisiwe namuhla."
  }
};

const ca: ForgeTranslations = {
  nav: {
    submit: "Enviar",
    dashboard: "Tauler",
    pricing: "Preus",
    badges: "Insígnies"
  },
  hero: {
    kicker: "NOXEL Forge - Ecosistema d'Intercanvi de Backlinks",
    title: "Forja la teva",
    titleAccent: "autoritat",
    subtitle: "Intercanvia backlinks amb llocs verificats filtrats per Alfred. Qualitat garantida, spam impossible. Dona'n un, rep-ne un.",
    ctaSubmit: "Enviar el meu lloc",
    ctaDashboard: "El meu Tauler"
  },
  stats: {
    forgePoints: "Punts Forge",
    forgePointsDesc: "Guanya punts en cada intercanvi",
    giveOne: "Dona'n un, rep-ne un",
    giveOneDesc: "Dones un backlink, en reps un de tornada",
    alfredFilters: "Filtres d'Alfred",
    alfredFiltersDesc: "Zero spam, zero contingut genèric"
  },
  trust: {
    kicker: "Puntuació de Confiança Forge",
    subtitle: "Cada lloc rep una puntuació sobre 100 basada en 6 senyals de qualitat"
  },
  directory: {
    kicker: "Directori",
    title: "Llocs Forge Verificats",
    empty: "El directori és buit de moment",
    emptyDesc: "Sigues el primer a enviar el teu lloc.",
    loading: "Carregant el directori...",
    previous: "Anterior",
    next: "Següent"
  },
  submit: {
    alfredTitle: "Alfred revisa cada enviament",
    alfredDesc: "Cada enviament és escanejat i revisat per Alfred abans de la publicació. Qualitat garantida, spam impossible.",
    urlLabel: "URL del lloc",
    urlHint: "HTTPS obligatori. Ha de contenir un enllaç a noxelseo.com o noxelforge.com",
    titleLabel: "Títol",
    nicheLabel: "Nínxol",
    descLabel: "Descripció breu",
    contentLabel: "Contingut principal",
    contentHint: "opcional, ajuda Alfred a analitzar millor",
    submitBtn: "Enviar a NOXEL Forge",
    analyzing: "Analitzant..."
  },
  pricing: {
    kicker: "Preus de NOXEL Forge",
    title: "Construeix la teva",
    titleAccent: "xarxa d'autoritat",
    subtitle: "Mostra la insígnia NOXEL al teu lloc i desbloqueja descomptes exclusius en cada nivell.",
    monthly: "Mensual",
    annual: "Anual",
    badgeToggle: "Mostro la insígnia NOXEL, desbloqueja el descompte",
    badgeApplied: "Descompte per insígnia aplicat",
    mostPopular: "Més popular",
    perMonth: "/mes",
    getStarted: "Comença gratuïtament",
    badgeInfoTitle: "Com desbloquejar els descomptes per insígnia",
    badgeInfoDesc: "Mostra qualsevol insígnia al peu del teu lloc. Alfred escaneja el teu peu en cada enviament."
  },
  badge: {
    kicker: "Mostra-la al teu lloc",
    title: "NOXEL Forge",
    titleAccent: "Insígnies",
    subtitle: "Copia i enganxa qualsevol insígnia al peu del teu lloc.",
    copy: "Copiar fragment",
    copied: "Copiat!",
    infoTitle: "Com funcionen els descomptes per insígnia",
    infoDesc: "Col·loca qualsevol insígnia al peu del teu lloc, a tot el lloc. Alfred escaneja el teu peu en cada enviament. Plata 10%, Or 15%, Platí 20%, Diamant 25%."
  },
  cta: {
    kicker: "A punt per forjar?",
    title: "Uneix-te a NOXEL Forge",
    subtitle: "Comença a construir la teva xarxa de backlinks verificats avui mateix."
  }
};

const ff: ForgeTranslations = {
  nav: {
    submit: "Natta",
    dashboard: "Deftere",
    pricing: "Njaru",
    badges: "Kawritaaji"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosisteem Cambital Backlink",
    title: "Solf",
    titleAccent: " authority maa",
    subtitle: "Cambitu backlinks e geɗe confirtaaɗe filtiraaɗe Alfred. Liggal moƴƴal garantitiima, spam haɗaama. Haw go'o, heɓ go'o.",
    ctaSubmit: "Natt geɗal am",
    ctaDashboard: "Deftere am"
  },
  stats: {
    forgePoints: "Piiji Forge",
    forgePointsDesc: "Heɓ piiji to cambital kala",
    giveOne: "Haw go'o, heɓ go'o",
    giveOneDesc: "Nattii backlink go'o, heɓaa go'o",
    alfredFilters: "Filtirji Alfred",
    alfredFiltersDesc: "Spam alaa, neeɓndi jaajndi alaa"
  },
  trust: {
    kicker: "Piiji Ɓeyral Trust",
    subtitle: "Geɗal kala heɓa piiji seeɗa 100 rewrude e calminaaji liggal 6"
  },
  directory: {
    kicker: "Limooje",
    title: "Geɗe Forge Confirtaaɗe",
    empty: "Limooje ndee feewnitaako jooni",
    emptyDesc: "Ƴam hiisa nattude geɗal maa.",
    loading: "Limooje ndee lodata...",
    previous: "Yeeso",
    next: "Caggal"
  },
  submit: {
    alfredTitle: "Alfred etee nattugol kala",
    alfredDesc: "Nattugol kala seertinee e eteeɗinee Alfred caggal newnugol. Liggal moƴƴal garantitiima, spam haɗaama.",
    urlLabel: "URL Geɗal",
    urlHint: "HTTPS waɗii. Tiɗtowal e liŋŋ noxelseo.com maa noxelforge.com waɗii",
    titleLabel: "Tiitoonde",
    nicheLabel: "Niche",
    descLabel: "Firoore dogoore",
    contentLabel: "Jaaynde mawnde",
    contentHint: "waɗaani tiɗtunde, wallitotoo Alfred anndude moƴƴo",
    submitBtn: "Natt to NOXEL Forge",
    analyzing: "Etaama..."
  },
  pricing: {
    kicker: "Njaru NOXEL Forge",
    title: "Solf",
    titleAccent: "netwoorku authority maa",
    subtitle: "Hollu kawrital NOXEL to geɗal maa e uddit tiifannooji keeriiɗi to kala keerol.",
    monthly: "Lewru kala",
    annual: "Hitaande kala",
    badgeToggle: "Hollirmi kawrital NOXEL, uddit tiifan",
    badgeApplied: "Tiifan kawrital waɗaama",
    mostPopular: "Moƴƴniiɗo fota",
    perMonth: "/lew",
    getStarted: "Fuɗɗit ko woodi",
    badgeInfoTitle: "Hol to tiifannooji kawrital udditee",
    badgeInfoDesc: "Hollu kawrital kala to bowre geɗal maa. Alfred seertoo bowre maa to nattugol kala."
  },
  badge: {
    kicker: "Hollu to geɗal maa",
    title: "NOXEL Forge",
    titleAccent: "Kawritaaji",
    subtitle: "Natto e kuɓɓitu kawrital kala to bowre geɗal maa.",
    copy: "Natto snippet",
    copied: "Nattaama!",
    infoTitle: "Hol tiifannooji kawrital gollaata",
    infoDesc: "Waa kawrital kala to bowre geɗal maa, geɗal fuu. Alfred seertoo bowre maa to nattugol kala. Arjaan 10%, Wure 15%, Platinum 20%, Deemante 25%."
  },
  cta: {
    kicker: "Aɗa moƴƴi forge?",
    title: "Naatu NOXEL Forge",
    subtitle: "Fuɗɗit solfude netwoorku backlink confirtaangal maa hannde."
  }
};

const mk: ForgeTranslations = {
  nav: {
    submit: "Поднеси",
    dashboard: "Контролна табла",
    pricing: "Цени",
    badges: "Значки"
  },
  hero: {
    kicker: "NOXEL Forge - Екосистем за размена на бекlinks",
    title: "Изгради го својот",
    titleAccent: "авторитет",
    subtitle: "Разменувај бекlinks со верифицирани сајтови филтрирани од Alfred. Квалитетот е загарантиран, спамот е невозможен. Дај еден, добиј еден.",
    ctaSubmit: "Поднеси го мојот сајт",
    ctaDashboard: "Мојата контролна табла"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Заработи поени на секоја размена",
    giveOne: "Дај еден, добиј еден",
    giveOneDesc: "Даваш бекlink, добиваш еден назад",
    alfredFilters: "Alfred филтри",
    alfredFiltersDesc: "Нула спам, нула генеричка содржина"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Секој сајт добива оценка од 100 врз основа на 6 сигнали за квалитет"
  },
  directory: {
    kicker: "Директориум",
    title: "Верифицирани Forge сајтови",
    empty: "Директориумот е засега празен",
    emptyDesc: "Биди прв кој ќе го поднесе својот сајт.",
    loading: "Се вчитува директориумот...",
    previous: "Претходна",
    next: "Следна"
  },
  submit: {
    alfredTitle: "Alfred го прегледува секое поднесување",
    alfredDesc: "Секое поднесување е скенирано и прегледано од Alfred пред објавување. Квалитетот е загарантиран, спамот е невозможен.",
    urlLabel: "URL на сајтот",
    urlHint: "Потребен е HTTPS. Мора да содржи линк до noxelseo.com или noxelforge.com",
    titleLabel: "Наслов",
    nicheLabel: "Ниша",
    descLabel: "Кратко опишување",
    contentLabel: "Главна содржина",
    contentHint: "опционално, помага Alfred да анализира подобро",
    submitBtn: "Поднеси до NOXEL Forge",
    analyzing: "Се анализира..."
  },
  pricing: {
    kicker: "NOXEL Forge Цени",
    title: "Изгради ја својата",
    titleAccent: "мрежа на авторитет",
    subtitle: "Прикажи го NOXEL значката на твојот сајт и отклучи ексклузивни попусти на секое ниво.",
    monthly: "Месечно",
    annual: "Годишно",
    badgeToggle: "Ја прикажувам NOXEL значката, отклучи попуст",
    badgeApplied: "Попустот за значка е применет",
    mostPopular: "Најпопуларно",
    perMonth: "/мес",
    getStarted: "Започни бесплатно",
    badgeInfoTitle: "Како да отклучиш попусти за значка",
    badgeInfoDesc: "Прикажи која било значка во подножјето на твојот сајт. Alfred го скенира твоето подножје на секое поднесување."
  },
  badge: {
    kicker: "Прикажи на твојот сајт",
    title: "NOXEL Forge",
    titleAccent: "Значки",
    subtitle: "Копирај и залепи која било значка во подножјето на твојот сајт.",
    copy: "Копирај код",
    copied: "Копирано!",
    infoTitle: "Како функционираат попустите за значка",
    infoDesc: "Постави која било значка во подножјето на твојот сајт, на целиот сајт. Alfred го скенира твоето подножје на секое поднесување. Сребрена 10%, Златна 15%, Платинска 20%, Дијамантска 25%."
  },
  cta: {
    kicker: "Подготвен да градиш?",
    title: "Придружи се на NOXEL Forge",
    subtitle: "Започни да ја градиш својата верифицирана мрежа на бекlinks денес."
  }
};

const ur: ForgeTranslations = {
  nav: {
    submit: "جمع کروائیں",
    dashboard: "ڈیش بورڈ",
    pricing: "قیمتیں",
    badges: "بیجز"
  },
  hero: {
    kicker: "NOXEL Forge - بیک لنک ایکسچینج ایکو سسٹم",
    title: "اپنی",
    titleAccent: "اتھارٹی",
    subtitle: "Alfred کی طرف سے فلٹر کردہ تصدیق شدہ سائٹس کے ساتھ بیک لنکس کا تبادلہ کریں۔ معیار کی ضمانت، سپیم ناممکن۔ ایک دیں، ایک پائیں۔",
    ctaSubmit: "میری سائٹ جمع کروائیں",
    ctaDashboard: "میرا ڈیش بورڈ"
  },
  stats: {
    forgePoints: "فورج پوائنٹس",
    forgePointsDesc: "ہر تبادلے پر پوائنٹس کمائیں",
    giveOne: "ایک دیں، ایک پائیں",
    giveOneDesc: "آپ ایک بیک لنک دیتے ہیں، آپ کو ایک واپس ملتا ہے",
    alfredFilters: "Alfred کے فلٹرز",
    alfredFiltersDesc: "صفر سپیم، صفر عام مواد"
  },
  trust: {
    kicker: "ٹرسٹ اسکور فورج",
    subtitle: "ہر سائٹ کو 6 معیاری اشاروں کی بنیاد پر 100 میں سے اسکور ملتا ہے"
  },
  directory: {
    kicker: "ڈائریکٹری",
    title: "تصدیق شدہ فورج سائٹس",
    empty: "ڈائریکٹری ابھی خالی ہے",
    emptyDesc: "اپنی سائٹ جمع کروانے والے پہلے بنیں۔",
    loading: "ڈائریکٹری لوڈ ہو رہی ہے...",
    previous: "پچھلا",
    next: "اگلا"
  },
  submit: {
    alfredTitle: "Alfred ہر جمع کروائی گئی چیز کا جائزہ لیتا ہے",
    alfredDesc: "ہر جمع کروائی گئی چیز کو اشاعت سے پہلے Alfred کی طرف سے اسکین اور جائزہ لیا جاتا ہے۔ معیار کی ضمانت، سپیم ناممکن۔",
    urlLabel: "سائٹ URL",
    urlHint: "HTTPS ضروری ہے۔ اس میں noxelseo.com یا noxelforge.com کا لنک ہونا لازمی ہے",
    titleLabel: "عنوان",
    nicheLabel: "شعبہ",
    descLabel: "مختصر تفصیل",
    contentLabel: "مرکزی مواد",
    contentHint: "اختیاری، Alfred کو بہتر تجزیہ کرنے میں مدد کرتا ہے",
    submitBtn: "NOXEL Forge میں جمع کروائیں",
    analyzing: "تجزیہ ہو رہا ہے..."
  },
  pricing: {
    kicker: "NOXEL Forge قیمتیں",
    title: "اپنا",
    titleAccent: "اتھارٹی نیٹ ورک",
    subtitle: "اپنی سائٹ پر NOXEL بیج لگائیں اور ہر درجے پر خصوصی چھوٹ حاصل کریں۔",
    monthly: "ماہانہ",
    annual: "سالانہ",
    badgeToggle: "میں NOXEL بیج لگاتا ہوں، چھوٹ حاصل کریں",
    badgeApplied: "بیج کی چھوٹ لاگو ہو گئی",
    mostPopular: "سب سے مقبول",
    perMonth: "/ماہ",
    getStarted: "مفت شروع کریں",
    badgeInfoTitle: "بیج کی چھوٹ کیسے حاصل کریں",
    badgeInfoDesc: "اپنی سائٹ کے فوٹر میں کوئی بھی بیج لگائیں۔ Alfred ہر جمع کروانے پر آپ کا فوٹر اسکین کرتا ہے۔"
  },
  badge: {
    kicker: "اپنی سائٹ پر دکھائیں",
    title: "NOXEL Forge",
    titleAccent: "بیجز",
    subtitle: "کوئی بھی بیج اپنی سائٹ کے فوٹر میں کاپی اور پیسٹ کریں۔",
    copy: "کوڈ کاپی کریں",
    copied: "کاپی ہو گیا!",
    infoTitle: "بیج کی چھوٹ کیسے کام کرتی ہے",
    infoDesc: "اپنی سائٹ کے فوٹر میں، پوری سائٹ پر کوئی بھی بیج لگائیں۔ Alfred ہر جمع کروانے پر آپ کا فوٹر اسکین کرتا ہے۔ سلور 10%، گولڈ 15%، پلاٹینم 20%، ڈائمنڈ 25%۔"
  },
  cta: {
    kicker: "فورج کرنے کے لیے تیار ہیں؟",
    title: "NOXEL Forge میں شامل ہوں",
    subtitle: "آج ہی اپنا تصدیق شدہ بیک لنک نیٹ ورک بنانا شروع کریں۔"
  }
};

const ku: ForgeTranslations = {
  nav: {
    submit: "ناردن",
    dashboard: "داشبۆرد",
    pricing: "نرخ",
    badges: "نیشانەکان"
  },
  hero: {
    kicker: "NOXEL Forge - ئیکۆسیستەمی گەڕاندنەوەی بەکلینک",
    title: "دەسەڵاتت",
    titleAccent: "بدرووست بکە",
    subtitle: "بەکلینک پێشکەش بکە بە ماڵپەڕە دروستکراوەکان کە لەلایەن Alfred فلتەر کراون. کوالیتی دڵنیابووە، سپام ناکرێت. یەکێک بدە، یەکێک وەربگرە.",
    ctaSubmit: "ماڵپەڕەکەم بنێرم",
    ctaDashboard: "داشبۆردەکەم"
  },
  stats: {
    forgePoints: "خاڵەکانی Forge",
    forgePointsDesc: "لە هەر گەڕاندنەوەیەک خاڵ بەدەست بهێنە",
    giveOne: "یەکێک بدە، یەکێک وەربگرە",
    giveOneDesc: "بەکلینکێک دەدەیت، بەکلینکێکی دیکە وەردەگرێت",
    alfredFilters: "فلتەرەکانی Alfred",
    alfredFiltersDesc: "هیچ سپامێک نییە، هیچ ناوەڕۆکی گشتی نییە"
  },
  trust: {
    kicker: "نمرەی متمانە",
    subtitle: "هەر ماڵپەڕێک نمرەیەک لە ١٠٠ وەردەگرێت بەپێی ٦ ئامێری کوالیتی"
  },
  directory: {
    kicker: "دیرەکتۆری",
    title: "ماڵپەڕە دروستکراوەکانی Forge",
    empty: "دیرەکتۆری ئێستا خاڵییە",
    emptyDesc: "یەکەمین بە کە ماڵپەڕەکەت دەناردەیت.",
    loading: "دیرەکتۆری بارەکەی دەکات...",
    previous: "پێشتر",
    next: "دواتر"
  },
  submit: {
    alfredTitle: "Alfred هەر ناردنێک پێداچوونەوەی دەکات",
    alfredDesc: "هەر ناردنێک لەلایەن Alfred سکان و پێداچوونەوەی دەکرێت پێش بڵاوکردنەوە. کوالیتی دڵنیابووە، سپام ناکرێت.",
    urlLabel: "URL ی ماڵپەڕ",
    urlHint: "HTTPS پێویستە. دەبێت بەستەرێک بۆ noxelseo.com یان noxelforge.com تێدابێت",
    titleLabel: "ناونیشان",
    nicheLabel: "بواری تایبەت",
    descLabel: "پێناسەی کورت",
    contentLabel: "ناوەڕۆکی سەرەکی",
    contentHint: "ئەرەیی نییە، بەلام Alfred ی یارمەتی دەدات باشتر شیکاری بکات",
    submitBtn: "بنێرە بۆ NOXEL Forge",
    analyzing: "شیکاری دەکرێت..."
  },
  pricing: {
    kicker: "نرخەکانی NOXEL Forge",
    title: "تۆڕی",
    titleAccent: "دەسەڵاتەکەت بدرووست بکە",
    subtitle: "نیشانەی NOXEL لە ماڵپەڕەکەت پیشان بدە و داشکاندنی تایبەت لە هەر ئاستێک بکەرەوە.",
    monthly: "مانگانە",
    annual: "ساڵانە",
    badgeToggle: "نیشانەی NOXEL پیشان دەدەم، داشکاندن بکەرەوە",
    badgeApplied: "داشکاندنی نیشانە جێبەجێ کرا",
    mostPopular: "بەناوبانگترین",
    perMonth: "/مانگ",
    getStarted: "بەخۆڕایی دەست پێبکە",
    badgeInfoTitle: "چۆن داشکاندنی نیشانە بکەرەوە",
    badgeInfoDesc: "هەر نیشانەیەک لە فووتەری ماڵپەڕەکەت پیشان بدە. Alfred فووتەرەکەت لە هەر ناردنێک سکان دەکات."
  },
  badge: {
    kicker: "لە ماڵپەڕەکەت پیشان بدە",
    title: "NOXEL Forge",
    titleAccent: "نیشانەکان",
    subtitle: "هەر نیشانەیەک کۆپی بکە و لە فووتەری ماڵپەڕەکەت جێگیر بکە.",
    copy: "کۆپی کردنی کۆد",
    copied: "کۆپی کرا!",
    infoTitle: "داشکاندنی نیشانە چۆن کار دەکات",
    infoDesc: "هەر نیشانەیەک لە فووتەری ماڵپەڕەکەت جێگیر بکە، بۆ هەموو لاپەڕەکان. Alfred فووتەرەکەت لە هەر ناردنێک سکان دەکات. زیو ١٠٪، زێڕ ١٥٪، پلاتینۆم ٢٠٪، دیاموند ٢٥٪."
  },
  cta: {
    kicker: "ئامادەی دروستکردنی؟",
    title: "بەشداری NOXEL Forge بکە",
    subtitle: "ئەمڕۆ دەست بە دروستکردنی تۆڕی بەکلینکە دروستکراوەکەت بکە."
  }
};

const ny: ForgeTranslations = {
  nav: {
    submit: "Tumiza",
    dashboard: "Dashibodi",
    pricing: "Mitengo",
    badges: "Zizindikiro"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistemu ya Kusinthana Malinks",
    title: "Lembera",
    titleAccent: "ulamuliro wako",
    subtitle: "Sinthana malinks ndi masaiti otsimikiziridwa osazingidwa ndi Alfred. Ubwino wotsimikizika, spam nthawi zonse. Pereka imodzi, peza imodzi.",
    ctaSubmit: "Tumiza saiti yanga",
    ctaDashboard: "Dashibodi Yanga"
  },
  stats: {
    forgePoints: "Mapointu a Forge",
    forgePointsDesc: "Peza mapointu pa kusinthana kulikonse",
    giveOne: "Pereka imodzi, peza imodzi",
    giveOneDesc: "Upereka link, umapeza link",
    alfredFilters: "Alfred akazinga",
    alfredFiltersDesc: "Palibe spam, palibe zokopera"
  },
  trust: {
    kicker: "Nambala ya Chikhulupiriro",
    subtitle: "Saiti iliyonse imapeza nambala pa 100 kutengera zizindikiro 6 za ubwino"
  },
  directory: {
    kicker: "Darekitori",
    title: "Masaiti a Forge Otsimikiziridwa",
    empty: "Darekitori ndi yopanda kanthu pa tsopano",
    emptyDesc: "Khala woyamba kutumiza saiti yako.",
    loading: "Kutsitsa darekitori...",
    previous: "Yapitayo",
    next: "Yotsatira"
  },
  submit: {
    alfredTitle: "Alfred amasanthula ndemanga iliyonse",
    alfredDesc: "Ndemanga iliyonse imafufuzidwa ndi Alfred isanasindikizidwe. Ubwino wotsimikizika, spam nthawi zonse.",
    urlLabel: "URL ya Saiti",
    urlHint: "HTTPS ilifunika. Iyenera kukhala ndi link kupita ku noxelseo.com kapena noxelforge.com",
    titleLabel: "Mutu",
    nicheLabel: "Mtundu",
    descLabel: "Mfundo yafupi",
    contentLabel: "Zomwe zili mkati",
    contentHint: "osafunikira, imathandiza Alfred kusanthula bwino",
    submitBtn: "Tumiza ku NOXEL Forge",
    analyzing: "Kukufikira..."
  },
  pricing: {
    kicker: "Mitengo ya NOXEL Forge",
    title: "Manga",
    titleAccent: "netiweki yako ya ulamuliro",
    subtitle: "Onetsa chizindikiro cha NOXEL pa saiti yako ndikutsegula diskawunti zapadera pa mlingo uliwonse.",
    monthly: "Pamwezi",
    annual: "Pachaka",
    badgeToggle: "Ndiwonetsa chizindikiro cha NOXEL, tsegula diskawunti",
    badgeApplied: "Diskawunti ya chizindikiro yagwiritsidwa ntchito",
    mostPopular: "Wokondedwa kwambiri",
    perMonth: "/mwezi",
    getStarted: "Yamba kwaulere",
    badgeInfoTitle: "Momwe mungatsegulire diskawunti ya chizindikiro",
    badgeInfoDesc: "Onetsa chizindikiro chilichonse pa folder ya saiti yako. Alfred amafufuza folder yako pa ndemanga iliyonse."
  },
  badge: {
    kicker: "Onetsa pa saiti yako",
    title: "NOXEL Forge",
    titleAccent: "Zizindikiro",
    subtitle: "Kopira ndikumata chizindikiro chilichonse pa folder ya saiti yako.",
    copy: "Kopira snippet",
    copied: "Yakopidwa!",
    infoTitle: "Momwe diskawunti za zizindikiro zimayendera",
    infoDesc: "Ika chizindikiro chilichonse pa folder ya saiti yako, pa saiti yonse. Alfred amafufuza folder yako pa ndemanga iliyonse. Siliva 10%, Golide 15%, Platinum 20%, Daimondo 25%."
  },
  cta: {
    kicker: "Wakonzeka kufanja?",
    title: "Lowani ku NOXEL Forge",
    subtitle: "Yamba kumanga netiweki yako ya malinks otsimikiziridwa lero."
  }
};

const hy: ForgeTranslations = {
  nav: {
    submit: "Ներկայացնել",
    dashboard: "Վահանակ",
    pricing: "Գնագոյացում",
    badges: "Կրծքանշաններ"
  },
  hero: {
    kicker: "NOXEL Forge - Հետհղումների փոխանակման էկոհամակարգ",
    title: "Կեղեք ձեր",
    titleAccent: "հեղինակությունը",
    subtitle: "Փոխանակեք հետհղումներ Alfred-ի կողմից ստուգված կայքերի հետ։ Որակը երաշխավորված է, սպամն անհնար է։ Տուր մեկ, ստացիր մեկ։",
    ctaSubmit: "Ներկայացնել իմ կայքը",
    ctaDashboard: "Իմ վահանակը"
  },
  stats: {
    forgePoints: "Forge կետեր",
    forgePointsDesc: "Վաստակեք կետեր յուրաքանչյուր փոխանակումից",
    giveOne: "Տուր մեկ, ստացիր մեկ",
    giveOneDesc: "Դուք տալիս եք հետհղում, ստանում եք հետ մեկը",
    alfredFilters: "Alfred-ի ֆիլտրերը",
    alfredFiltersDesc: "Զրո սպամ, զրո ընդհանուր բովանդակություն"
  },
  trust: {
    kicker: "Վստահության գնահատականի դարբնոց",
    subtitle: "Յուրաքանչյուր կայք ստանում է 100-ից գնահատական՝ հիմնված 6 որակի ազդանշանների վրա"
  },
  directory: {
    kicker: "Տեղեկատու",
    title: "Հաստատված Forge կայքեր",
    empty: "Տեղեկատուն առայժм դատարկ է",
    emptyDesc: "Եղեք առաջինը, ով կներկայացնի իր կայքը։",
    loading: "Տեղեկատուն բեռնվում է...",
    previous: "Նախորդ",
    next: "Հաջորդ"
  },
  submit: {
    alfredTitle: "Alfred-ը վերանայում է յուրաքանչյուր ներկայացում",
    alfredDesc: "Յուրաքանչյուր ներկայացում սկանավորվում և վերանայվում է Alfred-ի կողմից հրատարակությունից առաջ։ Որակը երաշխավորված է, սպամն անհնար է։",
    urlLabel: "Կայքի URL",
    urlHint: "Պահանջվում է HTTPS։ Պետք է պարունակի հղում դեպի noxelseo.com կամ noxelforge.com",
    titleLabel: "Վերնագիր",
    nicheLabel: "Խորշ",
    descLabel: "Կարճ նկարագրություն",
    contentLabel: "Հիմնական բովանդակություն",
    contentHint: "կամընտիր, օգնում է Alfred-ին ավելի լավ վերլուծել",
    submitBtn: "Ներկայացնել NOXEL Forge-ին",
    analyzing: "Վերլուծվում է..."
  },
  pricing: {
    kicker: "NOXEL Forge գնագոյացում",
    title: "Կառուցեք ձեր",
    titleAccent: "հեղինակության ցանցը",
    subtitle: "Ցուցադրեք NOXEL կրծքանշանը ձեր կայքում և բացեք բացառիկ զեղչեր յուրաքանչյուր մակարդակում։",
    monthly: "Ամսական",
    annual: "Տարեկան",
    badgeToggle: "Ես ցուցադրում եմ NOXEL կրծքանշանը, բացում եմ զեղչը",
    badgeApplied: "Կրծքանշանի զեղչը կիրառված է",
    mostPopular: "Ամենահայտնի",
    perMonth: "/ամիս",
    getStarted: "Սկսեք անվճար",
    badgeInfoTitle: "Ինչպես բացել կրծքանշանի զեղչերը",
    badgeInfoDesc: "Ցուցադրեք ցանկացած կրծքանշան ձեր կայքի ստորոտում։ Alfred-ը սկանավորում է ձեր ստորոտը յուրաքանչյուր ներկայացման ժամանակ։"
  },
  badge: {
    kicker: "Ցուցադրեք ձեր կայքում",
    title: "NOXEL Forge",
    titleAccent: "Կրծքանշաններ",
    subtitle: "Պատճենեք և տեղադրեք ցանկացած կրծքանշան ձեր կայքի ստորոտում։",
    copy: "Պատճենել հատվածը",
    copied: "Պատճենված է։",
    infoTitle: "Ինչպես են աշխատում կրծքանշանի զեղչերը",
    infoDesc: "Տեղադրեք ցանկացած կրծքանշան ձեր կայքի ստորոտում՝ կայք մաշտաբով։ Alfred-ը սկանավորում է ձեր ստորոտը յուրաքանչյուր ներկայացման ժամանակ։ Արծաթ 10%, Ոսկի 15%, Պլատին 20%, Ադամանդ 25%։"
  },
  cta: {
    kicker: "Պատրա՞ստ եք դարբնել։",
    title: "Միացեք NOXEL Forge-ին",
    subtitle: "Սկսեք կառուցել ձեր հաստատված հետհղումների ցանցը այսօր։"
  }
};

const fi: ForgeTranslations = {
  nav: {
    submit: "Lähetä",
    dashboard: "Hallintapaneeli",
    pricing: "Hinnoittelu",
    badges: "Merkit"
  },
  hero: {
    kicker: "NOXEL Forge - Takalinkkien vaihtoekosysteemi",
    title: "Rakenna",
    titleAccent: "auktoriteettisi",
    subtitle: "Vaihda takalinkkejä Alfреdin suodattamien vahvistettujen sivustojen kanssa. Laatu taattu, roskaposti mahdotonta. Anna yksi, saa yksi.",
    ctaSubmit: "Lähetä sivustoni",
    ctaDashboard: "Oma hallintapaneeli"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Ansaitse pisteitä jokaisesta vaihdosta",
    giveOne: "Anna yksi, saa yksi",
    giveOneDesc: "Annat takalinkin, saat takalinkin takaisin",
    alfredFilters: "Alfred suodattaa",
    alfredFiltersDesc: "Nolla roskapostia, nolla geneeristä sisältöä"
  },
  trust: {
    kicker: "Luottamuspistemäärän takoja",
    subtitle: "Jokainen sivusto saa pisteet 100:sta kuuden laatusignaalin perusteella"
  },
  directory: {
    kicker: "Hakemisto",
    title: "Vahvistetut Forge-sivustot",
    empty: "Hakemisto on toistaiseksi tyhjä",
    emptyDesc: "Ole ensimmäinen, joka lähettää sivustosi.",
    loading: "Ladataan hakemistoa...",
    previous: "Edellinen",
    next: "Seuraava"
  },
  submit: {
    alfredTitle: "Alfred tarkistaa jokaisen lähetyksen",
    alfredDesc: "Alfred skannaa ja tarkistaa jokaisen lähetyksen ennen julkaisua. Laatu taattu, roskaposti mahdotonta.",
    urlLabel: "Sivuston URL",
    urlHint: "HTTPS vaaditaan. Täytyy sisältää linkki osoitteeseen noxelseo.com tai noxelforge.com",
    titleLabel: "Otsikko",
    nicheLabel: "Niche",
    descLabel: "Lyhyt kuvaus",
    contentLabel: "Pääsisältö",
    contentHint: "valinnainen, auttaa Alfredia analysoimaan paremmin",
    submitBtn: "Lähetä NOXEL Forgeen",
    analyzing: "Analysoidaan..."
  },
  pricing: {
    kicker: "NOXEL Forge hinnoittelu",
    title: "Rakenna oma",
    titleAccent: "auktoriteettiverkostosi",
    subtitle: "Näytä NOXEL-merkki sivustollasi ja avaa eksklusiiviset alennukset jokaisella tasolla.",
    monthly: "Kuukausittain",
    annual: "Vuosittain",
    badgeToggle: "Näytän NOXEL-merkkiä, avaa alennus",
    badgeApplied: "Merkkialennus käytössä",
    mostPopular: "Suosituin",
    perMonth: "/kk",
    getStarted: "Aloita ilmaiseksi",
    badgeInfoTitle: "Kuinka avata merkkialennukset",
    badgeInfoDesc: "Näytä mitä tahansa merkkiä sivustosi alatunnisteessa. Alfred skannaa alatunnisteesi jokaisen lähetyksen yhteydessä."
  },
  badge: {
    kicker: "Näytä sivustollasi",
    title: "NOXEL Forge",
    titleAccent: "Merkit",
    subtitle: "Kopioi ja liitä mikä tahansa merkki sivustosi alatunnisteeseen.",
    copy: "Kopioi koodi",
    copied: "Kopioitu!",
    infoTitle: "Kuinka merkkialennukset toimivat",
    infoDesc: "Sijoita mikä tahansa merkki sivustosi alatunnisteeseen sivustolaajuisesti. Alfred skannaa alatunnisteesi jokaisen lähetyksen yhteydessä. Hopea 10%, Kulta 15%, Platina 20%, Timantti 25%."
  },
  cta: {
    kicker: "Valmis takomaan?",
    title: "Liity NOXEL Forgeen",
    subtitle: "Aloita vahvistetun takalinkkiverkostosi rakentaminen tänään."
  }
};

const ch: ForgeTranslations = {
  nav: {
    submit: "Na'tuge'",
    dashboard: "Tableru",
    pricing: "Presiu",
    badges: "Insignia"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistema Tinuka' Backlink",
    title: "Fatma' i",
    titleAccent: "aturidat-mu",
    subtitle: "Tulaika backlinks yan mañe'lu sitiyu ni ma'ma'ok ni Alfred. Kalidat garantisao, spam imposible. Na' un, na'i un.",
    ctaSubmit: "Na'tuge' i sitiyu-hu",
    ctaDashboard: "Tableru-hu"
  },
  stats: {
    forgePoints: "Puntos Forge",
    forgePointsDesc: "Fahan puntos gi kada tulaika",
    giveOne: "Na' un, na'i un",
    giveOneDesc: "Un na' backlink, un na'i unu na backlink trabia",
    alfredFilters: "Filtros Alfred",
    alfredFiltersDesc: "Ånñai spam,ånñai kontenidu henerat"
  },
  trust: {
    kicker: "Puntuasion Konfiansa Forge",
    subtitle: "Kada sitiyu un-na'i puntuasion ginen 100 basao gi 6 na señat kalidat"
  },
  directory: {
    kicker: "Direktorio",
    title: "Mañe'lu Sitiyu Forge ni Ma'ma'ok",
    empty: "Basia i direktorio på'go",
    emptyDesc: "Sigi ya un tuge' i sitiyu-mu anites i todu.",
    loading: "Kargando direktorio...",
    previous: "Manmena",
    next: "Sigiente"
  },
  submit: {
    alfredTitle: "Alfred ripasa kada na'tuge'",
    alfredDesc: "Kada na'tuge' ma eskan yan ma ripasa ni Alfred antes di mapublikasion. Kalidat garantisao, spam imposible.",
    urlLabel: "URL Sitiyu",
    urlHint: "HTTPS kinisesitan. Debe u guaha linki para noxelseo.com pat noxelforge.com",
    titleLabel: "Titulu",
    nicheLabel: "Nicho",
    descLabel: "Discripsiñon Kadada",
    contentLabel: "Kontenidu Prinsipal",
    contentHint: "opsional, ayuda Alfred analisa mas maolek",
    submitBtn: "Na'tuge' para NOXEL Forge",
    analyzing: "Analisando..."
  },
  pricing: {
    kicker: "Presiu NOXEL Forge",
    title: "Fatma' i",
    titleAccent: "reti aturidat-mu",
    subtitle: "Na'lalå'la' i insignia NOXEL gi sitiyu-mu ya un abri diskuentos eksklusibu gi kada tiet.",
    monthly: "Mensuat",
    annual: "Anuåt",
    badgeToggle: "Inanuncian-hu i insignia NOXEL, abri diskuento",
    badgeApplied: "Diskuento insignia ma aplika",
    mostPopular: "Mas popula",
    perMonth: "/mes",
    getStarted: "Tutuhon libre",
    badgeInfoTitle: "Håfa na manera un abri diskuentos insignia",
    badgeInfoDesc: "Na'lalå'la' kuatkiera insignia gi footer i sitiyu-mu. Alfred eskan i footer-mu gi kada na'tuge'."
  },
  badge: {
    kicker: "Na'lalå'la' gi sitiyu-mu",
    title: "NOXEL Forge",
    titleAccent: "Insignia",
    subtitle: "Koppiha ya un pega kuatkiera insignia gi footer i sitiyu-mu.",
    copy: "Koppiha snippet",
    copied: "Ma koppihan!",
    infoTitle: "Håfa na manera diskuentos insignia funas",
    infoDesc: "Poni kuatkiera insignia gi footer i sitiyu-mu, sitiyu-enteru. Alfred eskan i footer-mu gi kada na'tuge'. Plata 10%, Oru 15%, Platinu 20%, Diamente 25%."
  },
  cta: {
    kicker: "Listo para forha?",
    title: "Fatchu NOXEL Forge",
    subtitle: "Tutuhon fatma' i reti backlink ma'ma'ok-mu på'go."
  }
};

const sk: ForgeTranslations = {
  nav: {
    submit: "Odoslať",
    dashboard: "Prehľad",
    pricing: "Cenník",
    badges: "Odznaky"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosystém výmeny spätných odkazov",
    title: "Vybudujte svoju",
    titleAccent: "autoritu",
    subtitle: "Vymieňajte spätné odkazy s overenými stránkami filtrovanými cez Alfred. Kvalita zaručená, spam nemožný. Daj jeden, dostaneš jeden.",
    ctaSubmit: "Odoslať moju stránku",
    ctaDashboard: "Môj prehľad"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Získavajte body za každú výmenu",
    giveOne: "Daj jeden, dostaneš jeden",
    giveOneDesc: "Dáte spätný odkaz, dostanete jeden späť",
    alfredFilters: "Alfred filtruje",
    alfredFiltersDesc: "Nula spamu, nula generického obsahu"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Každá stránka dostane skóre zo 100 bodov na základe 6 signálov kvality"
  },
  directory: {
    kicker: "Adresár",
    title: "Overené Forge stránky",
    empty: "Adresár je zatiaľ prázdny",
    emptyDesc: "Buďte prvý, kto odošle svoju stránku.",
    loading: "Načítavam adresár...",
    previous: "Predchádzajúca",
    next: "Ďalšia"
  },
  submit: {
    alfredTitle: "Alfred kontroluje každé odoslanie",
    alfredDesc: "Každé odoslanie je pred zverejnením naskenované a skontrolované cez Alfred. Kvalita zaručená, spam nemožný.",
    urlLabel: "URL stránky",
    urlHint: "Vyžaduje sa HTTPS. Musí obsahovať odkaz na noxelseo.com alebo noxelforge.com",
    titleLabel: "Názov",
    nicheLabel: "Odvetvie",
    descLabel: "Krátky popis",
    contentLabel: "Hlavný obsah",
    contentHint: "voliteľné, pomáha Alfredovi lepšie analyzovať",
    submitBtn: "Odoslať do NOXEL Forge",
    analyzing: "Analyzujem..."
  },
  pricing: {
    kicker: "Cenník NOXEL Forge",
    title: "Budujte svoju",
    titleAccent: "sieť autority",
    subtitle: "Zobrazte odznak NOXEL na svojej stránke a odomknite exkluzívne zľavy na každej úrovni.",
    monthly: "Mesačne",
    annual: "Ročne",
    badgeToggle: "Zobrazujem odznak NOXEL, odomknúť zľavu",
    badgeApplied: "Zľava za odznak uplatnená",
    mostPopular: "Najpopulárnejší",
    perMonth: "/mes",
    getStarted: "Začať zadarmo",
    badgeInfoTitle: "Ako odomknúť zľavy za odznak",
    badgeInfoDesc: "Zobrazte ľubovoľný odznak v päte svojej stránky. Alfred skenuje vašu pätu pri každom odoslaní."
  },
  badge: {
    kicker: "Zobrazte na svojej stránke",
    title: "NOXEL Forge",
    titleAccent: "Odznaky",
    subtitle: "Skopírujte a vložte ľubovoľný odznak do päty svojej stránky.",
    copy: "Kopírovať kód",
    copied: "Skopírované!",
    infoTitle: "Ako fungujú zľavy za odznak",
    infoDesc: "Umiestnite ľubovoľný odznak do päty svojej stránky na celom webe. Alfred skenuje vašu pätu pri každom odoslaní. Strieborný 10 %, Zlatý 15 %, Platinový 20 %, Diamantový 25 %."
  },
  cta: {
    kicker: "Pripravení kovať?",
    title: "Pridajte sa k NOXEL Forge",
    subtitle: "Začnite budovať svoju overenú sieť spätných odkazov ešte dnes."
  }
};

const uz: ForgeTranslations = {
  nav: {
    submit: "Yuborish",
    dashboard: "Boshqaruv paneli",
    pricing: "Narxlar",
    badges: "Nishonlar"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Almashinuv Ekotizimi",
    title: "O'z",
    titleAccent: "obro'ingizni",
    subtitle: "Alfred tomonidan filtrlangan tasdiqlangan saytlar bilan backlinklar almashing. Sifat kafolatlangan, spam imkonsiz. Birini bering, birini oling.",
    ctaSubmit: "Saytimni yuborish",
    ctaDashboard: "Mening boshqaruv panelim"
  },
  stats: {
    forgePoints: "Forge Ballari",
    forgePointsDesc: "Har bir almashinuvda ball to'plang",
    giveOne: "Birini bering, birini oling",
    giveOneDesc: "Siz backlink berasiz, o'zingiz ham bitta olasiz",
    alfredFilters: "Alfred filtrlari",
    alfredFiltersDesc: "Nol spam, nol umumiy kontent"
  },
  trust: {
    kicker: "Ishonch Ballari Forge",
    subtitle: "Har bir sayt 6 ta sifat ko'rsatkichi asosida 100 ballik tizimda baholanadi"
  },
  directory: {
    kicker: "Katalog",
    title: "Tasdiqlangan Forge Saytlari",
    empty: "Katalog hozircha bo'sh",
    emptyDesc: "Saytingizni birinchi bo'lib yuboring.",
    loading: "Katalog yuklanmoqda...",
    previous: "Oldingi",
    next: "Keyingi"
  },
  submit: {
    alfredTitle: "Alfred har bir yuborishni ko'rib chiqadi",
    alfredDesc: "Har bir yuborish e'lon qilinishidan oldin Alfred tomonidan skanlanadi va ko'rib chiqiladi. Sifat kafolatlangan, spam imkonsiz.",
    urlLabel: "Sayt URL manzili",
    urlHint: "HTTPS talab qilinadi. noxelseo.com yoki noxelforge.com ga havola bo'lishi shart",
    titleLabel: "Sarlavha",
    nicheLabel: "Mavzu sohasi",
    descLabel: "Qisqa tavsif",
    contentLabel: "Asosiy kontent",
    contentHint: "ixtiyoriy, Alfredga yaxshiroq tahlil qilishda yordam beradi",
    submitBtn: "NOXEL Forge ga yuborish",
    analyzing: "Tahlil qilinmoqda..."
  },
  pricing: {
    kicker: "NOXEL Forge Narxlari",
    title: "O'z",
    titleAccent: "obro' tarmog'ingizni",
    subtitle: "Saytingizda NOXEL nishonini ko'rsating va har bir tarifda eksklyuziv chegirmalarni oching.",
    monthly: "Oylik",
    annual: "Yillik",
    badgeToggle: "Men NOXEL nishonini ko'rsataman, chegirmani ochaman",
    badgeApplied: "Nishon chegirmasi qo'llanildi",
    mostPopular: "Eng mashhur",
    perMonth: "/oy",
    getStarted: "Bepul boshlash",
    badgeInfoTitle: "Nishon chegirmalarini qanday ochish mumkin",
    badgeInfoDesc: "Saytingizning pastki qismiga istalgan nishonni joylashtiring. Alfred har bir yuborishda pastki qismingizni skanlab chiqadi."
  },
  badge: {
    kicker: "Saytingizda ko'rsating",
    title: "NOXEL Forge",
    titleAccent: "Nishonlari",
    subtitle: "Istalgan nishon kodini saytingizning pastki qismiga nusxa ko'chiring va joylashtiring.",
    copy: "Kodni nusxalash",
    copied: "Nusxalandi!",
    infoTitle: "Nishon chegirmalari qanday ishlaydi",
    infoDesc: "Istalgan nishonni saytingizning pastki qismiga, sayt bo'ylab joylashtiring. Alfred har bir yuborishda pastki qismingizni skanlab chiqadi. Kumush 10%, Oltin 15%, Platina 20%, Olmos 25%."
  },
  cta: {
    kicker: "Boshlashga tayyormisiz?",
    title: "NOXEL Forge ga qo'shiling",
    subtitle: "Bugun tasdiqlangan backlink tarmog'ingizni qurishni boshlang."
  }
};

const oc: ForgeTranslations = {
  nav: {
    submit: "Soumetre",
    dashboard: "Taulièr de bòrd",
    pricing: "Tarifs",
    badges: "Insignas"
  },
  hero: {
    kicker: "NOXEL Forge - Eicosistèma d'escambi de backlinks",
    title: "Forgatz vòstra",
    titleAccent: "autoritat",
    subtitle: "Escambiètz backlinks amb sites verificats filtrats per Alfred. Qualitat garantida, spam impossible. Donatz un, recebètz un.",
    ctaSubmit: "Soumetre mon site",
    ctaDashboard: "Mon taulièr de bòrd"
  },
  stats: {
    forgePoints: "Ponts de Forge",
    forgePointsDesc: "Ganhar ponts a cada escambi",
    giveOne: "Donatz un, recebètz un",
    giveOneDesc: "Donatz un backlink, recebètz un en retorn",
    alfredFilters: "Filtres d'Alfred",
    alfredFiltersDesc: "Zero spam, zero contengut generic"
  },
  trust: {
    kicker: "Escòr de Confiança Forge",
    subtitle: "Cada site recep un escòr sus 100 basat sus 6 sinhals de qualitat"
  },
  directory: {
    kicker: "Annuari",
    title: "Sites Forge Verificats",
    empty: "L'annuari es per ara vuèg",
    emptyDesc: "Sètz lo primièr a soumetre vòstre site.",
    loading: "Cargament de l'annuari...",
    previous: "Precedent",
    next: "Seguent"
  },
  submit: {
    alfredTitle: "Alfred revisa cada submission",
    alfredDesc: "Cada submission es scannada e revisada per Alfred abans la publicacion. Qualitat garantida, spam impossible.",
    urlLabel: "URL del site",
    urlHint: "HTTPS obligatòri. Deu contenir un liam vers noxelseo.com o noxelforge.com",
    titleLabel: "Títol",
    nicheLabel: "Niche",
    descLabel: "Descripcion curta",
    contentLabel: "Contengut principal",
    contentHint: "facultatiu, ajuda Alfred a analysar melhor",
    submitBtn: "Soumetre a NOXEL Forge",
    analyzing: "Analisi en cors..."
  },
  pricing: {
    kicker: "Tarifs de NOXEL Forge",
    title: "Bastissètz vòstre",
    titleAccent: "ret d'autoritat",
    subtitle: "Affichat l'insigana NOXEL sus vòstre site e desverrolhatz remesas exclusivas sus cada nívèl.",
    monthly: "Mensuèl",
    annual: "Anual",
    badgeToggle: "Afficho l'insigana NOXEL, desverrolhar la remesa",
    badgeApplied: "Remesa d'insigana aplicada",
    mostPopular: "Mai popular",
    perMonth: "/mes",
    getStarted: "Començar gratuitament",
    badgeInfoTitle: "Cossí desverrolhar las remesas d'insigana",
    badgeInfoDesc: "Affichat quina insigana que siá al pèd de pagina de vòstre site. Alfred scanna vòstre pèd de pagina a cada submission."
  },
  badge: {
    kicker: "Affichat sus vòstre site",
    title: "NOXEL Forge",
    titleAccent: "Insignas",
    subtitle: "Copiatz e colatz quina insigana que siá al pèd de pagina de vòstre site.",
    copy: "Copiar l'extrait",
    copied: "Copiat!",
    infoTitle: "Cossí foncionen las remesas d'insigana",
    infoDesc: "Plaçatz quina insigana que siá al pèd de pagina de vòstre site, sus totas las paginas. Alfred scanna vòstre pèd de pagina a cada submission. Argent 10%, Or 15%, Platina 20%, Diamant 25%."
  },
  cta: {
    kicker: "Prest a forjar?",
    title: "Rejonh NOXEL Forge",
    subtitle: "Començatz a bastir vòstre ret de backlinks verificats uèi."
  }
};

const id: ForgeTranslations = {
  nav: {
    submit: "Kirim",
    dashboard: "Dasbor",
    pricing: "Harga",
    badges: "Lencana"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistem Pertukaran Backlink",
    title: "Tempa",
    titleAccent: "otoritasmu",
    subtitle: "Tukar backlink dengan situs terverifikasi yang disaring oleh Alfred. Kualitas terjamin, spam tidak mungkin terjadi. Beri satu, dapatkan satu.",
    ctaSubmit: "Kirim situs saya",
    ctaDashboard: "Dasbor Saya"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Dapatkan poin di setiap pertukaran",
    giveOne: "Beri satu, dapatkan satu",
    giveOneDesc: "Kamu memberi backlink, kamu mendapatkan kembali satu",
    alfredFilters: "Filter Alfred",
    alfredFiltersDesc: "Nol spam, nol konten generik"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Setiap situs mendapatkan skor dari 100 berdasarkan 6 sinyal kualitas"
  },
  directory: {
    kicker: "Direktori",
    title: "Situs Forge Terverifikasi",
    empty: "Direktori masih kosong untuk saat ini",
    emptyDesc: "Jadilah yang pertama mengirimkan situs Anda.",
    loading: "Memuat direktori...",
    previous: "Sebelumnya",
    next: "Berikutnya"
  },
  submit: {
    alfredTitle: "Alfred meninjau setiap kiriman",
    alfredDesc: "Setiap kiriman dipindai dan ditinjau oleh Alfred sebelum dipublikasikan. Kualitas terjamin, spam tidak mungkin terjadi.",
    urlLabel: "URL Situs",
    urlHint: "HTTPS diperlukan. Harus mengandung tautan ke noxelseo.com atau noxelforge.com",
    titleLabel: "Judul",
    nicheLabel: "Niche",
    descLabel: "Deskripsi singkat",
    contentLabel: "Konten utama",
    contentHint: "opsional, membantu Alfred menganalisis lebih baik",
    submitBtn: "Kirim ke NOXEL Forge",
    analyzing: "Menganalisis..."
  },
  pricing: {
    kicker: "Harga NOXEL Forge",
    title: "Bangun",
    titleAccent: "jaringan otoritasmu",
    subtitle: "Tampilkan lencana NOXEL di situs Anda dan buka diskon eksklusif untuk setiap paket.",
    monthly: "Bulanan",
    annual: "Tahunan",
    badgeToggle: "Saya menampilkan lencana NOXEL, buka diskon",
    badgeApplied: "Diskon lencana diterapkan",
    mostPopular: "Paling populer",
    perMonth: "/bln",
    getStarted: "Mulai gratis",
    badgeInfoTitle: "Cara membuka diskon lencana",
    badgeInfoDesc: "Tampilkan lencana apa pun di footer situs Anda. Alfred memindai footer Anda di setiap kiriman."
  },
  badge: {
    kicker: "Tampilkan di situs Anda",
    title: "NOXEL Forge",
    titleAccent: "Lencana",
    subtitle: "Salin dan tempel lencana apa pun di footer situs Anda.",
    copy: "Salin kode",
    copied: "Tersalin!",
    infoTitle: "Cara kerja diskon lencana",
    infoDesc: "Tempatkan lencana apa pun di footer situs Anda, di seluruh situs. Alfred memindai footer Anda di setiap kiriman. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Siap untuk menempa?",
    title: "Bergabung dengan NOXEL Forge",
    subtitle: "Mulai bangun jaringan backlink terverifikasi Anda hari ini."
  }
};

const mn: ForgeTranslations = {
  nav: {
    submit: "Илгээх",
    dashboard: "Хяналтын самбар",
    pricing: "Үнэ",
    badges: "Тэмдэгүүд"
  },
  hero: {
    kicker: "NOXEL Forge - Буцах холбоос солилцооны экосистем",
    title: "Өөрийн",
    titleAccent: "эрх мэдлээ",
    subtitle: "Alfred-ийн шүүлтүүрээр баталгаажсан сайтуудтай буцах холбоос солил. Чанар баталгаатай, спам боломжгүй. Нэг өг, нэг ав.",
    ctaSubmit: "Сайтаа илгээх",
    ctaDashboard: "Миний хяналтын самбар"
  },
  stats: {
    forgePoints: "Forge оноо",
    forgePointsDesc: "Солилцол бүрт оноо цуглуул",
    giveOne: "Нэг өг, нэг ав",
    giveOneDesc: "Та буцах холбоос өгвөл нэгийг буцааж авна",
    alfredFilters: "Alfred шүүлтүүр",
    alfredFiltersDesc: "Спам тэг, ерөнхий контент тэг"
  },
  trust: {
    kicker: "Итгэлцлийн оноо Forge",
    subtitle: "Сайт бүр 6 чанарын үзүүлэлт дээр үндэслэн 100-аас оноо авдаг"
  },
  directory: {
    kicker: "Лавлах",
    title: "Баталгаажсан Forge сайтууд",
    empty: "Лавлах одоохондоо хоосон байна",
    emptyDesc: "Сайтаа хамгийн түрүүнд илгээгч болоорой.",
    loading: "Лавлах ачаалж байна...",
    previous: "Өмнөх",
    next: "Дараах"
  },
  submit: {
    alfredTitle: "Alfred бүх илгээлтийг хянадаг",
    alfredDesc: "Бүх илгээлтийг Alfred нийтлэлийн өмнө сканнердаж хянадаг. Чанар баталгаатай, спам боломжгүй.",
    urlLabel: "Сайтын URL",
    urlHint: "HTTPS шаардлагатай. noxelseo.com эсвэл noxelforge.com руу холбоос агуулсан байх ёстой",
    titleLabel: "Гарчиг",
    nicheLabel: "Чиглэл",
    descLabel: "Товч тайлбар",
    contentLabel: "Үндсэн контент",
    contentHint: "заавал биш, Alfred-д илүү сайн шинжлэхэд тусалдаг",
    submitBtn: "NOXEL Forge-д илгээх",
    analyzing: "Шинжилж байна..."
  },
  pricing: {
    kicker: "NOXEL Forge үнэ",
    title: "Өөрийн",
    titleAccent: "эрх мэдлийн сүлжээгээ",
    subtitle: "Сайтдаа NOXEL тэмдэг харуулж, бүх түвшинд онцгой хөнгөлөлт авна уу.",
    monthly: "Сарын",
    annual: "Жилийн",
    badgeToggle: "Би NOXEL тэмдэг харуулж байна, хөнгөлөлт нээ",
    badgeApplied: "Тэмдгийн хөнгөлөлт хэрэглэгдсэн",
    mostPopular: "Хамгийн их сонгодог",
    perMonth: "/сар",
    getStarted: "Үнэгүй эхлэх",
    badgeInfoTitle: "Тэмдгийн хөнгөлөлтийг хэрхэн нээх вэ",
    badgeInfoDesc: "Сайтынхаа footer-т аль нэг тэмдгийг байрлуул. Alfred илгээлт бүрт таны footer-ийг сканнердана."
  },
  badge: {
    kicker: "Сайтдаа харуул",
    title: "NOXEL Forge",
    titleAccent: "Тэмдгүүд",
    subtitle: "Сайтынхаа footer-т дурын тэмдгийг хуулж буулгана уу.",
    copy: "Кодыг хуулах",
    copied: "Хуулсан!",
    infoTitle: "Тэмдгийн хөнгөлөлт хэрхэн ажилладаг вэ",
    infoDesc: "Аль нэг тэмдгийг сайтынхаа бүх хуудсанд footer-т байрлуул. Alfred илгээлт бүрт таны footer-ийг сканнердана. Мөнгөн 10%, Алтан 15%, Платин 20%, Алмааз 25%."
  },
  cta: {
    kicker: "Forge хийхэд бэлэн үү?",
    title: "NOXEL Forge-д нэгдэх",
    subtitle: "Өнөөдөр баталгаажсан буцах холбоосны сүлжээгээ бүтээж эхлээрэй."
  }
};

const fj: ForgeTranslations = {
  nav: {
    submit: "Solomani",
    dashboard: "Dasibodi",
    pricing: "Isau",
    badges: "Mata ni Cakacaka"
  },
  hero: {
    kicker: "NOXEL Forge - Backlink Exchange Ecosystem",
    title: "Vakatorocaketaka na nomu",
    titleAccent: "mana",
    subtitle: "Veitauri backlink kei na veivakatorocaketaki filtered mai Alfred. Kalougata cecere, spam e sega ni rawa. Solia e dua, rawata e dua.",
    ctaSubmit: "Solomani na nomu saiti",
    ctaDashboard: "Na nomu Dasibodi"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "Rawata na points ena veivolitaki",
    giveOne: "Solia e dua, rawata e dua",
    giveOneDesc: "O solia e dua na backlink, o rawata tale e dua",
    alfredFilters: "Alfred e filter",
    alfredFiltersDesc: "Sega ni spam, sega ni kenacova na inaki"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "Ena saiti ivalivaliti e rawata e dua na isau mai 100 e vakatakila mai na 6 na isiga ni kalougata"
  },
  directory: {
    kicker: "Lisi",
    title: "Na Saiti Forge Vakatorocaki",
    empty: "Na lisi e cava tiko nikua",
    emptyDesc: "Iko na matai ira ena solomani na nomu saiti.",
    loading: "Toso tiko na lisi...",
    previous: "Sa oti",
    next: "E liu"
  },
  submit: {
    alfredTitle: "Alfred e vakadinadinataka na veisolomani",
    alfredDesc: "Na veisolomani kece e scanitaki ka vakadinadinataki mai Alfred ena gauna e liu ni vukacegu. Kalougata cecere, spam e sega ni rawa.",
    urlLabel: "URL ni Saiti",
    urlHint: "HTTPS e gadrevi. E dodonu me tiko kina e dua na isema ki noxelseo.com se noxelforge.com",
    titleLabel: "Ivakatawa",
    nicheLabel: "Niche",
    descLabel: "Isausaumi lailai",
    contentLabel: "Kenacova na inaki",
    contentHint: "sega ni gadrevi, e vukei Alfred me vakacavacavataka vinaka cake",
    submitBtn: "Solomani ki NOXEL Forge",
    analyzing: "Vakacavacavataka..."
  },
  pricing: {
    kicker: "NOXEL Forge Isau",
    title: "Tara na nomu",
    titleAccent: "network ni mana",
    subtitle: "Vakacaqe na mata ni NOXEL ena nomu saiti ka dolava na isau vakavinaka ena tier kece.",
    monthly: "Vakamasumasu",
    annual: "Vakayabaki",
    badgeToggle: "Au vakacaqe na mata ni NOXEL, dolava na isau vakavinaka",
    badgeApplied: "Isau vakavinaka ni mata e vakayagataki",
    mostPopular: "E rauta duadua",
    perMonth: "/masumasu",
    getStarted: "Vakatikina tiko kamunaga",
    badgeInfoTitle: "Kerekere dolava na isau vakavinaka ni mata",
    badgeInfoDesc: "Vakacaqe e dua na mata ena koto ni nomu saiti. Alfred e scan na koto ena veisolomani kece."
  },
  badge: {
    kicker: "Vakacaqe ena nomu saiti",
    title: "NOXEL Forge",
    titleAccent: "Mata ni Cakacaka",
    subtitle: "Kopi ka peisti e dua na mata ena koto ni nomu saiti.",
    copy: "Kopi na snippet",
    copied: "Kopitaki!",
    infoTitle: "Kerekere caka na isau vakavinaka ni mata",
    infoDesc: "Vakacaqe e dua na mata ena koto ni nomu saiti, ena saiti kece. Alfred e scan na koto ena veisolomani kece. Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "Dua na gauna me tara?",
    title: "Vakauqeti NOXEL Forge",
    subtitle: "Vakatikina tiko na tara ni nomu network backlink vakatorocaki nikua."
  }
};

const ky: ForgeTranslations = {
  nav: {
    submit: "Жөнөтүү",
    dashboard: "Башкаруу панели",
    pricing: "Баалар",
    badges: "Белгилер"
  },
  hero: {
    kicker: "NOXEL Forge - Шилтеме алмашуу экосистемасы",
    title: "Өзүңүздүн",
    titleAccent: "авторитетиңизди",
    subtitle: "Alfred тарабынан чыпкаланган текшерилген сайттар менен шилтемелер алмашыңыз. Сапат кепилденген, спам мүмкүн эмес. Бирөөнү бер, бирөөнү ал.",
    ctaSubmit: "Сайтымды жөнөтүү",
    ctaDashboard: "Менин башкаруу панелим"
  },
  stats: {
    forgePoints: "Forge Упайлары",
    forgePointsDesc: "Ар бир алмашуудан упай казаныңыз",
    giveOne: "Бирөөнү бер, бирөөнү ал",
    giveOneDesc: "Сиз шилтеме бересиз, шилтеме аласыз",
    alfredFilters: "Alfred чыпкалары",
    alfredFiltersDesc: "Эч кандай спам жок, эч кандай жалпы мазмун жок"
  },
  trust: {
    kicker: "Ишеним Упайы",
    subtitle: "Ар бир сайт 6 сапат көрсөткүчүнүн негизинде 100дөн упай алат"
  },
  directory: {
    kicker: "Каталог",
    title: "Текшерилген Forge Сайттары",
    empty: "Каталог азырынча бош",
    emptyDesc: "Сайтыңызды биринчи болуп жөнөтүңүз.",
    loading: "Каталог жүктөлүүдө...",
    previous: "Мурунку",
    next: "Кийинки"
  },
  submit: {
    alfredTitle: "Alfred ар бир жөнөтүүнү карап чыгат",
    alfredDesc: "Ар бир жөнөтүү жарыяланганга чейин Alfred тарабынан сканерленет жана каралат. Сапат кепилденген, спам мүмкүн эмес.",
    urlLabel: "Сайттын URL дареги",
    urlHint: "HTTPS талап кылынат. noxelseo.com же noxelforge.com сайтына шилтеме болушу керек",
    titleLabel: "Аталышы",
    nicheLabel: "Ниша",
    descLabel: "Кыскача сүрөттөмө",
    contentLabel: "Негизги мазмун",
    contentHint: "милдеттүү эмес, Alfred үчүн талдоону жакшыртат",
    submitBtn: "NOXEL Forge жөнөтүү",
    analyzing: "Талдоо жүрүүдө..."
  },
  pricing: {
    kicker: "NOXEL Forge Баалары",
    title: "Өзүңүздүн",
    titleAccent: "авторитет тармагыңызды",
    subtitle: "Сайтыңызда NOXEL белгисин көрсөтүп, ар бир деңгээлде өзгөчө арзандатууларды ачыңыз.",
    monthly: "Айлык",
    annual: "Жылдык",
    badgeToggle: "Мен NOXEL белгисин көрсөтөм, арзандатуу ачуу",
    badgeApplied: "Белги арзандатуусу колдонулду",
    mostPopular: "Эң популярдуу",
    perMonth: "/ай",
    getStarted: "Акысыз баштоо",
    badgeInfoTitle: "Белги арзандатууларын кантип ачуу керек",
    badgeInfoDesc: "Сайтыңыздын футерине каалаган белгини орнотуңуз. Alfred ар бир жөнөтүүдө футериңизди сканерлейт."
  },
  badge: {
    kicker: "Сайтыңызда көрсөтүңүз",
    title: "NOXEL Forge",
    titleAccent: "Белгилери",
    subtitle: "Каалаган белгини сайтыңыздын футерине көчүрүп чаптаңыз.",
    copy: "Кодду көчүрүү",
    copied: "Көчүрүлдү!",
    infoTitle: "Белги арзандатуулары кантип иштейт",
    infoDesc: "Каалаган белгини сайтыңыздын футерине, бардык барактарга орнотуңуз. Alfred ар бир жөнөтүүдө футериңизди сканерлейт. Күмүш 10%, Алтын 15%, Платина 20%, Бриллиант 25%."
  },
  cta: {
    kicker: "Баштоого даярсызбы?",
    title: "NOXEL Forge кошулуңуз",
    subtitle: "Бүгүн текшерилген шилтеме тармагыңызды куруп баштаңыз."
  }
};

const tg: ForgeTranslations = {
  nav: {
    submit: "Ирсол кардан",
    dashboard: "Панели идоракунӣ",
    pricing: "Нархгузорӣ",
    badges: "Нишонҳо"
  },
  hero: {
    kicker: "NOXEL Forge - Экосистемаи мубодилаи беклинкҳо",
    title: "Эътибори худро",
    titleAccent: "устувор созед",
    subtitle: "Беклинкҳоро бо сайтҳои тасдиқшудае, ки Alfred филтр кардааст, мубодила кунед. Сифат кафолатдор аст, спам имконнопазир аст. Як медиҳед, як мегиред.",
    ctaSubmit: "Сайти маро ирсол кунед",
    ctaDashboard: "Панели ман"
  },
  stats: {
    forgePoints: "Холҳои Forge",
    forgePointsDesc: "Дар ҳар мубодила хол ба даст оред",
    giveOne: "Як медиҳед, як мегиред",
    giveOneDesc: "Шумо як беклинк медиҳед, як беклинк мегиред",
    alfredFilters: "Филтрҳои Alfred",
    alfredFiltersDesc: "Сифр спам, сифр мундариҷаи умумӣ"
  },
  trust: {
    kicker: "Холи эътимод Forge",
    subtitle: "Ҳар сайт дар асоси 6 нишонаи сифатӣ аз 100 хол мегирад"
  },
  directory: {
    kicker: "Феҳрист",
    title: "Сайтҳои тасдиқшудаи Forge",
    empty: "Феҳрист ҳозир холӣ аст",
    emptyDesc: "Аввалин касе бошед, ки сайти худро ирсол мекунад.",
    loading: "Феҳрист бор карда мешавад...",
    previous: "Қаблӣ",
    next: "Навбатӣ"
  },
  submit: {
    alfredTitle: "Alfred ҳар пешниҳодро баррасӣ мекунад",
    alfredDesc: "Ҳар пешниҳод пеш аз нашр аз ҷониби Alfred скан ва баррасӣ карда мешавад. Сифат кафолатдор аст, спам имконнопазир аст.",
    urlLabel: "URL-и сайт",
    urlHint: "HTTPS талаб карда мешавад. Бояд пайванд ба noxelseo.com ё noxelforge.com дошта бошад",
    titleLabel: "Сарлавҳа",
    nicheLabel: "Ниша",
    descLabel: "Тавсифи кӯтоҳ",
    contentLabel: "Мундариҷаи асосӣ",
    contentHint: "ихтиёрӣ, ба Alfred кӯмак мекунад беҳтар таҳлил кунад",
    submitBtn: "Ба NOXEL Forge ирсол кунед",
    analyzing: "Таҳлил карда мешавад..."
  },
  pricing: {
    kicker: "Нархгузории NOXEL Forge",
    title: "Шабакаи",
    titleAccent: "эътибори худро бисозед",
    subtitle: "Нишони NOXEL-ро дар сайти худ намоиш диҳед ва дар ҳар сатҳ тахфифҳои эксклюзивӣ ба даст оред.",
    monthly: "Моҳона",
    annual: "Солона",
    badgeToggle: "Нишони NOXEL-ро намоиш медиҳам, тахфиф кушода мешавад",
    badgeApplied: "Тахфифи нишон татбиқ карда шуд",
    mostPopular: "Маъмултарин",
    perMonth: "/моҳ",
    getStarted: "Ройгон оғоз кунед",
    badgeInfoTitle: "Чӣ тавр тахфифҳои нишонро кушоед",
    badgeInfoDesc: "Ҳар нишонеро дар поёни сайти худ ҷойгир кунед. Alfred поёни шуморо дар ҳар пешниҳод скан мекунад."
  },
  badge: {
    kicker: "Дар сайти худ намоиш диҳед",
    title: "NOXEL Forge",
    titleAccent: "Нишонҳо",
    subtitle: "Ҳар нишонеро нусхабардорӣ карда дар поёни сайти худ гузоред.",
    copy: "Қисматро нусхабардорӣ кунед",
    copied: "Нусхабардорӣ шуд!",
    infoTitle: "Тахфифҳои нишон чӣ тавр кор мекунанд",
    infoDesc: "Ҳар нишонеро дар поёни сайти худ дар тамоми сайт ҷойгир кунед. Alfred поёни шуморо дар ҳар пешниҳод скан мекунад. Нуқра 10%, Тилло 15%, Платина 20%, Алмос 25%."
  },
  cta: {
    kicker: "Омода ба оғоз ҳастед?",
    title: "Ба NOXEL Forge шомил шавед",
    subtitle: "Имрӯз сохтани шабакаи беклинкҳои тасдиқшудаи худро оғоз кунед."
  }
};

const ms: ForgeTranslations = {
  nav: {
    submit: "Hantar",
    dashboard: "Papan Pemuka",
    pricing: "Harga",
    badges: "Lencana"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosistem Pertukaran Pautan Balik",
    title: "Tempa",
    titleAccent: "autoriti",
    subtitle: "Tukar pautan balik dengan laman yang disahkan dan ditapis oleh Alfred. Kualiti terjamin, spam mustahil. Beri satu, dapat satu.",
    ctaSubmit: "Hantar laman saya",
    ctaDashboard: "Papan Pemuka Saya"
  },
  stats: {
    forgePoints: "Mata Forge",
    forgePointsDesc: "Kumpul mata pada setiap pertukaran",
    giveOne: "Beri satu, dapat satu",
    giveOneDesc: "Anda beri pautan balik, anda dapat satu balik",
    alfredFilters: "Tapisan Alfred",
    alfredFiltersDesc: "Sifar spam, sifar kandungan generik"
  },
  trust: {
    kicker: "Skor Kepercayaan Forge",
    subtitle: "Setiap laman menerima skor daripada 100 berdasarkan 6 isyarat kualiti"
  },
  directory: {
    kicker: "Direktori",
    title: "Laman Forge Yang Disahkan",
    empty: "Direktori masih kosong buat masa ini",
    emptyDesc: "Jadilah yang pertama menghantar laman anda.",
    loading: "Memuatkan direktori...",
    previous: "Sebelumnya",
    next: "Seterusnya"
  },
  submit: {
    alfredTitle: "Alfred menyemak setiap penghantaran",
    alfredDesc: "Setiap penghantaran diimbas dan disemak oleh Alfred sebelum diterbitkan. Kualiti terjamin, spam mustahil.",
    urlLabel: "URL Laman",
    urlHint: "HTTPS diperlukan. Mesti mengandungi pautan ke noxelseo.com atau noxelforge.com",
    titleLabel: "Tajuk",
    nicheLabel: "Niche",
    descLabel: "Penerangan ringkas",
    contentLabel: "Kandungan utama",
    contentHint: "pilihan, membantu Alfred menganalisis dengan lebih baik",
    submitBtn: "Hantar ke NOXEL Forge",
    analyzing: "Menganalisis..."
  },
  pricing: {
    kicker: "Harga NOXEL Forge",
    title: "Bina",
    titleAccent: "rangkaian autoriti anda",
    subtitle: "Paparkan lencana NOXEL di laman anda dan buka kunci diskaun eksklusif pada setiap peringkat.",
    monthly: "Bulanan",
    annual: "Tahunan",
    badgeToggle: "Saya memaparkan lencana NOXEL, buka kunci diskaun",
    badgeApplied: "Diskaun lencana telah digunakan",
    mostPopular: "Paling popular",
    perMonth: "/bln",
    getStarted: "Mulakan secara percuma",
    badgeInfoTitle: "Cara membuka kunci diskaun lencana",
    badgeInfoDesc: "Paparkan mana-mana lencana di bahagian footer laman anda. Alfred mengimbas footer anda pada setiap penghantaran."
  },
  badge: {
    kicker: "Papar di laman anda",
    title: "NOXEL Forge",
    titleAccent: "Lencana",
    subtitle: "Salin dan tampal mana-mana lencana di footer laman anda.",
    copy: "Salin kod",
    copied: "Disalin!",
    infoTitle: "Cara diskaun lencana berfungsi",
    infoDesc: "Letakkan mana-mana lencana di footer laman anda, merentasi seluruh laman. Alfred mengimbas footer anda pada setiap penghantaran. Perak 10%, Emas 15%, Platinum 20%, Berlian 25%."
  },
  cta: {
    kicker: "Bersedia untuk bertempa?",
    title: "Sertai NOXEL Forge",
    subtitle: "Mula membina rangkaian pautan balik yang disahkan anda hari ini."
  }
};

const ve: ForgeTranslations = {
  nav: {
    submit: "Tumiša",
    dashboard: "Dashibodi",
    pricing: "Mitengo",
    badges: "Zwitanda"
  },
  hero: {
    kicker: "NOXEL Forge - Ekosisitema ya Kubvhangana kwa Backlink",
    title: "Bumba",
    titleAccent: "maanda",
    subtitle: "Bvhangana na zwivhanda zwo khwinifhadzwaho nga Alfred. Khwine yo tikedza, spamu a yo koni. Ipa ṱhanu, wana ṱhanu.",
    ctaSubmit: "Tumiša saiti yanga",
    ctaDashboard: "Dashibodi yanga"
  },
  stats: {
    forgePoints: "Poḓo dza Forge",
    forgePointsDesc: "Wana poḓo kha kubvhangana nga kunwe na kunwe",
    giveOne: "Ipa ṱhanu, wana ṱhanu",
    giveOneDesc: "U ipa backlink, u wana yone fhedzi",
    alfredFilters: "Alfred u sedza",
    alfredFiltersDesc: "Spamu isho, zwine a zwi faneli a zwipo"
  },
  trust: {
    kicker: "Poḓo ya Tshifhiwa tsha Vhuambi",
    subtitle: "Saiti nngwe na nngwe i wana poḓo dza 100 zwi tshi ya nga zwitanda zwa vhukhwine zwa 6"
  },
  directory: {
    kicker: "Rejisite",
    title: "Zwivhanda zwa Forge Zwo Khwinifhadzwaho",
    empty: "Rejisite a i na nḓivho zwino",
    emptyDesc: "Vha wo ṱangana u tumiša saiti yavho.",
    loading: "Hu khou lodwa rejisite...",
    previous: "Ya Fhumo",
    next: "Ya Ṱavhanani"
  },
  submit: {
    alfredTitle: "Alfred u sedza tumiša nngwe na nngwe",
    alfredDesc: "Tumiša nngwe na nngwe i sedzeleswa nga Alfred phambi ha kushumisiwa. Khwine yo tikedza, spamu a yo koni.",
    urlLabel: "URL ya Saiti",
    urlHint: "HTTPS i dovha. I fanela ina luambo kha noxelseo.com kana noxelforge.com",
    titleLabel: "Tshitou",
    nicheLabel: "Khwatha",
    descLabel: "Ṱalusedzo pfufhi",
    contentLabel: "Zwine zwa vha tshikolo",
    contentHint: "si ya lazima, zwi thusa Alfred u ṱalutshedzea zwavhuḓi",
    submitBtn: "Tumiša kha NOXEL Forge",
    analyzing: "Hu khou sedzuluswa..."
  },
  pricing: {
    kicker: "Mitengo ya NOXEL Forge",
    title: "Vaka",
    titleAccent: "netweke ya maanda",
    subtitle: "Shumisa tshitanda tsha NOXEL kha saiti yavho u pfuke tsireledzo dzo khetheaho kha nyimele nngwe na nngwe.",
    monthly: "Ya Ṅwedzi",
    annual: "Ya Nwaha",
    badgeToggle: "Ndi shumisa tshitanda tsha NOXEL, pfuka tsireledzo",
    badgeApplied: "Tsireledzo ya tshitanda yo shumiswa",
    mostPopular: "Yo takalelwa nga vhazhinji",
    perMonth: "/ṅwedzi",
    getStarted: "Thoma mahala",
    badgeInfoTitle: "Nḓila ya u pfuka tsireledzo dza tshitanda",
    badgeInfoDesc: "Shumisa tshitanda tshine na tshine kha tsinde ya saiti yavho. Alfred u sedza tsinde yavho kha tumiša nngwe na nngwe."
  },
  badge: {
    kicker: "Shumisa kha saiti yavho",
    title: "NOXEL Forge",
    titleAccent: "Zwitanda",
    subtitle: "Kopa u bvela u isa tshitanda tshine na tshine kha tsinde ya saiti yavho.",
    copy: "Kopa snipit",
    copied: "Yo kopwa!",
    infoTitle: "Tsireledzo dza tshitanda dzi shuma hani",
    infoDesc: "Isa tshitanda tshine na tshine kha tsinde ya saiti yavho, kha saiti yoṱhe. Alfred u sedza tsinde yavho kha tumiša nngwe na nngwe. Siliva 10%, Golude 15%, Platinamu 20%, Daiyamane 25%."
  },
  cta: {
    kicker: "Vho lugela u bumba?",
    title: "Dzhena NOXEL Forge",
    subtitle: "Thoma u vaka netweke yavho ya backlink yo khwinifhadzwaho namusi."
  }
};

const la: ForgeTranslations = {
  nav: {
    submit: "Submitte",
    dashboard: "Tabula gubernatoria",
    pricing: "Pretium",
    badges: "Insignia"
  },
  hero: {
    kicker: "NOXEL Forge - Oecosystema Permutationis Nexuum",
    title: "Fabricare tuam",
    titleAccent: "auctoritatem",
    subtitle: "Permuta nexus cum sitibus verificatis ab Alfred selectis. Qualitas garantita, gravamen impossibile. Da unum, accipe unum.",
    ctaSubmit: "Submitte situm meum",
    ctaDashboard: "Tabula mea gubernatoria"
  },
  stats: {
    forgePoints: "Puncta Fabricationis",
    forgePointsDesc: "Acquire puncta in omni permutatione",
    giveOne: "Da unum, accipe unum",
    giveOneDesc: "Das nexum, accipis nexum",
    alfredFilters: "Alfred filtrat",
    alfredFiltersDesc: "Nullum gravamen, nullus tenor genericus"
  },
  trust: {
    kicker: "Fabricatio Indicis Fidei",
    subtitle: "Omnis situs accipit indicem ex centum secundum sex signa qualitatis"
  },
  directory: {
    kicker: "Index",
    title: "Situs Verificati Fabricationis",
    empty: "Index nunc vacuus est",
    emptyDesc: "Esto primus qui situm tuum submittat.",
    loading: "Index onerans...",
    previous: "Prior",
    next: "Sequens"
  },
  submit: {
    alfredTitle: "Alfred omnem submissionem recenset",
    alfredDesc: "Omnis submissio ab Alfred exploratur et recensetur ante publicationem. Qualitas garantita, gravamen impossibile.",
    urlLabel: "Situs URL",
    urlHint: "HTTPS necessarium. Debet continere nexum ad noxelseo.com vel noxelforge.com",
    titleLabel: "Titulus",
    nicheLabel: "Specialitas",
    descLabel: "Brevis descriptio",
    contentLabel: "Tenor principalis",
    contentHint: "facultativum, adiuvat Alfred melius analysi",
    submitBtn: "Submitte ad NOXEL Forge",
    analyzing: "Analysans..."
  },
  pricing: {
    kicker: "NOXEL Forge Pretium",
    title: "Aedifica tuam",
    titleAccent: "reticulam auctoritatis",
    subtitle: "Ostende insigne NOXEL in situ tuo et reclude concessiones exclusivas in omni gradu.",
    monthly: "Menstruum",
    annual: "Annuum",
    badgeToggle: "Insigne NOXEL ostendo, concessionem recludo",
    badgeApplied: "Concessio insignis applicata",
    mostPopular: "Maxime populare",
    perMonth: "/mens.",
    getStarted: "Incipe gratis",
    badgeInfoTitle: "Quomodo concessiones insignis recludi possunt",
    badgeInfoDesc: "Ostende quodlibet insigne in pede paginae situs tui. Alfred pedem paginae tuum in omni submissione explorat."
  },
  badge: {
    kicker: "Ostende in situ tuo",
    title: "NOXEL Forge",
    titleAccent: "Insignia",
    subtitle: "Copia et insere quodlibet insigne in pede paginae situs tui.",
    copy: "Copia fragmentum",
    copied: "Copiatum!",
    infoTitle: "Quomodo concessiones insignis operantur",
    infoDesc: "Pone quodlibet insigne in pede paginae situs tui, per omnes paginas. Alfred pedem paginae tuum in omni submissione explorat. Argenteum 10%, Aureum 15%, Platineum 20%, Adamantinum 25%."
  },
  cta: {
    kicker: "Paratus es fabricare?",
    title: "Adiunge NOXEL Forge",
    subtitle: "Incipe hodie aedificare reticulam tuam verificatam nexuum."
  }
};

// Add to FORGE_TRANSLATIONS object:
// cs, vi, af, sl, fo, lb, is, th, mt, da, it, de, ln, sm, xh, pl, ja, ga, zh, gl, sn, ar, ps, ka, na, gn, tk, zu, pt, nb, so, ay, tl, lt, kg, gv, qu, sq, az, nd, lu, tn, he, kk, sr, rn, el, lv, be, hi, ro, to, kl, ss, hr, nl, bg, ru, et, tr, mg, nn, ht, bi, st, eu, rw, mh, no, ts, sv, hu, bn, sg, ko, fa, uk, mi, sw, bs, nr, ca, ff, mk, ur, ku, ny, hy, fi, ch, sk, uz, oc, id, mn, fj, ky, tg, ms, ve, la

const am: ForgeTranslations = {
  nav: {
    submit: "አስገባ",
    dashboard: "ዳሽቦርድ",
    pricing: "ዋጋ",
    badges: "ባጆች"
  },
  hero: {
    kicker: "NOXEL Forge - የጀርባ አገናኝ ልውውጥ ስነ-ምህዳር",
    title: "ስልጣንህን",
    titleAccent: "አቅም",
    subtitle: "በ Alfred በተጣሩ የተረጋገጡ ጣቢያዎች ጋር የጀርባ አገናኞችን ተለዋወጥ። ጥራት የተረጋገጠ፣ ስፓም የማይቻል። አንድ ስጥ፣ አንድ ተቀበል።",
    ctaSubmit: "ጣቢያዬን አስገባ",
    ctaDashboard: "የእኔ ዳሽቦርድ"
  },
  stats: {
    forgePoints: "የፎርጅ ነጥቦች",
    forgePointsDesc: "በእያንዳንዱ ልውውጥ ነጥቦችን አግኝ",
    giveOne: "አንድ ስጥ፣ አንድ ተቀበል",
    giveOneDesc: "አንድ የጀርባ አገናኝ ስጥ፣ አንዱን ተቀበል",
    alfredFilters: "Alfred ማጣሪያዎች",
    alfredFiltersDesc: "ምንም ስፓም የለም፣ ምንም አጠቃላይ ይዘት የለም"
  },
  trust: {
    kicker: "የመተማመን ነጥብ ፎርጅ",
    subtitle: "እያንዳንዱ ጣቢያ ከ 100 ውስጥ ነጥብ ይቀበላል በ 6 የጥራት ምልክቶች ላይ ተመስርቶ"
  },
  directory: {
    kicker: "ማውጫ",
    title: "የተረጋገጡ የፎርጅ ጣቢያዎች",
    empty: "ማውጫው አሁን ባዶ ነው",
    emptyDesc: "ጣቢያህን ለማስገባት የመጀመሪያው ሁን።",
    loading: "ማውጫ በመጫን ላይ...",
    previous: "ቀዳሚ",
    next: "ቀጣይ"
  },
  submit: {
    alfredTitle: "Alfred እያንዳንዱን ማስገቢያ ይከልሳል",
    alfredDesc: "እያንዳንዱ ማስገቢያ ከህትመት በፊት በ Alfred ይቃኛል እና ይከለሳል። ጥራት የተረጋገጠ፣ ስፓም የማይቻል።",
    urlLabel: "የጣቢያ URL",
    urlHint: "HTTPS ያስፈልጋል። noxelseo.com ወይም noxelforge.com ወደሚያገናኝ አገናኝ መያዝ አለበት",
    titleLabel: "ርዕስ",
    nicheLabel: "ልዩ ዘርፍ",
    descLabel: "አጭር መግለጫ",
    contentLabel: "ዋና ይዘት",
    contentHint: "አማራጭ ነው፣ Alfred በተሻለ እንዲተነትን ይረዳል",
    submitBtn: "ወደ NOXEL Forge አስገባ",
    analyzing: "በመተንተን ላይ..."
  },
  pricing: {
    kicker: "NOXEL Forge ዋጋ",
    title: "የስልጣን",
    titleAccent: "አውታረ መረብህን ገንባ",
    subtitle: "የ NOXEL ባጅ በጣቢያህ ላይ አሳይ እና በእያንዳንዱ እርከን ልዩ ቅናሾችን ክፈት።",
    monthly: "ወርሃዊ",
    annual: "ዓመታዊ",
    badgeToggle: "የ NOXEL ባጅ አሳያለሁ፣ ቅናሽ ክፈት",
    badgeApplied: "የባጅ ቅናሽ ተተግብሯል",
    mostPopular: "በጣም ታዋቂ",
    perMonth: "/ወር",
    getStarted: "ነፃ ጀምር",
    badgeInfoTitle: "የባጅ ቅናሾችን እንዴት መክፈት እንደሚቻል",
    badgeInfoDesc: "ማንኛውንም ባጅ በጣቢያህ ግርጌ ላይ አሳይ። Alfred በእያንዳንዱ ማስገቢያ ላይ ግርጌህን ይቃኛል።"
  },
  badge: {
    kicker: "በጣቢያህ ላይ አሳይ",
    title: "NOXEL Forge",
    titleAccent: "ባጆች",
    subtitle: "ማንኛውንም ባጅ ወደ ጣቢያህ ግርጌ ቅዳ እና ለጥፍ።",
    copy: "ቅንጥብ ቅዳ",
    copied: "ተቀድቷል!",
    infoTitle: "የባጅ ቅናሾች እንዴት እንደሚሠሩ",
    infoDesc: "ማንኛውንም ባጅ በጣቢያህ ግርጌ ላይ፣ በጠቅላላ ጣቢያው ላይ አስቀምጥ። Alfred በእያንዳንዱ ማስገቢያ ላይ ግርጌህን ይቃኛል። ሲልቨር 10%፣ ጎልድ 15%፣ ፕላቲኒየም 20%፣ ዳያሞንድ 25%።"
  },
  cta: {
    kicker: "ለመቅረጽ ዝግጁ ነህ?",
    title: "NOXEL Forge ይቀላቀሉ",
    subtitle: "ዛሬ የተረጋገጠ የጀርባ አገናኝ አውታረ መረብህን መገንባት ጀምር።"
  }
};

const ti: ForgeTranslations = {
  nav: {
    submit: "ኣቕርብ",
    dashboard: "ዳሽቦርድ",
    pricing: "ዋጋ",
    badges: "ባጅታት"
  },
  hero: {
    kicker: "NOXEL Forge - ናይ ባክሊንክ ምልውዋጥ ኢኮሲስተም",
    title: "ስልጣንካ",
    titleAccent: "ፍጠር",
    subtitle: "ምስ ብ Alfred ዝተረጋገጹ ሳይታት ባክሊንክ ተለዋወጥ። ጥራይነት ዋስትና ዘለዎ፣ ስፓም ዘይከኣል። ሓደ ሃብ፣ ሓደ ውሰድ።",
    ctaSubmit: "ሳይተይ ኣቕርብ",
    ctaDashboard: "ዳሽቦርደይ"
  },
  stats: {
    forgePoints: "ፎርጅ ነጥብታት",
    forgePointsDesc: "ኣብ ነፍሲ ወከፍ ምልውዋጥ ነጥብታት ኣኻብብ",
    giveOne: "ሓደ ሃብ፣ ሓደ ውሰድ",
    giveOneDesc: "ሓደ ባክሊንክ ትህብ፣ ሓደ ትምለሰልካ",
    alfredFilters: "Alfred ፊልተራት",
    alfredFiltersDesc: "ዜሮ ስፓም፣ ዜሮ ሓፈሻዊ ትሕዝቶ"
  },
  trust: {
    kicker: "ትረስት ስኮር ፎርጅ",
    subtitle: "ነፍሲ ወከፍ ሳይት ካብ 100 ዝኾነ ነጥቢ ብመሰረት 6 ናይ ጥራይነት ምልክታት ይቕበል"
  },
  directory: {
    kicker: "ዳይረክቶሪ",
    title: "ዝተረጋገጹ ፎርጅ ሳይታት",
    empty: "ዳይረክቶሪ ሕጂ ባዶ እዩ",
    emptyDesc: "ሳይትካ ንምቕራብ መጀመርታ ኩን።",
    loading: "ዳይረክቶሪ ይጽዓን ኣሎ...",
    previous: "ዝሓለፈ",
    next: "ዝቕጽል"
  },
  submit: {
    alfredTitle: "Alfred ነፍሲ ወከፍ ምቕራብ ይምርምር",
    alfredDesc: "ነፍሲ ወከፍ ምቕራብ ቅድሚ ምሕታሙ ብ Alfred ይስካን ይምርመርን። ጥራይነት ዋስትና ዘለዎ፣ ስፓም ዘይከኣል።",
    urlLabel: "ናይ ሳይት URL",
    urlHint: "HTTPS የድሊ። noxelseo.com ወይ noxelforge.com ናብ ዝወስድ ሊንክ ክህልዎ ኣለዎ",
    titleLabel: "ኣርእስቲ",
    nicheLabel: "ኒሽ",
    descLabel: "ሓጺር መግለጺ",
    contentLabel: "ዋና ትሕዝቶ",
    contentHint: "ወሃቢ፣ Alfred ንምሕጋዝ ዝበለጸ ክምርምር ይሕግዝ",
    submitBtn: "ናብ NOXEL Forge ኣቕርብ",
    analyzing: "ይምርምር ኣሎ..."
  },
  pricing: {
    kicker: "NOXEL Forge ዋጋ",
    title: "ናይ",
    titleAccent: "ስልጣን ኔትወርክካ ስራሕ",
    subtitle: "ኣብ ሳይትካ ናይ NOXEL ባጅ ኣርኢ ናይ ነፍሲ ወከፍ ደረጃ ልሉይ ቅናሽ ኣልቅስ።",
    monthly: "ወርሓዊ",
    annual: "ዓመታዊ",
    badgeToggle: "ናይ NOXEL ባጅ ኣርኢ ኣሎኹ፣ ቅናሽ ኣልቅስ",
    badgeApplied: "ናይ ባጅ ቅናሽ ተተግቢሩ",
    mostPopular: "ዝበዝሐ ዝጥቀሙሉ",
    perMonth: "/ወርሒ",
    getStarted: "ናጻ ጀምር",
    badgeInfoTitle: "ናይ ባጅ ቅናሽ ብኸመይ ኣልቅስ",
    badgeInfoDesc: "ኣብ ፉተር ሳይትካ ዝኾነ ባጅ ኣርኢ። Alfred ኣብ ነፍሲ ወከፍ ምቕራብ ፉተርካ ይስካን።"
  },
  badge: {
    kicker: "ኣብ ሳይትካ ኣርኢ",
    title: "NOXEL Forge",
    titleAccent: "ባጅታት",
    subtitle: "ዝኾነ ባጅ ኣብ ፉተር ሳይትካ ቅዳሕ ለጥፍ።",
    copy: "ስኒፐት ቅዳሕ",
    copied: "ተቐዲሑ!",
    infoTitle: "ናይ ባጅ ቅናሽ ብኸመይ ይሰርሕ",
    infoDesc: "ዝኾነ ባጅ ኣብ ፉተር ሳይትካ ኣብ ምሉእ ሳይት ግበር። Alfred ኣብ ነፍሲ ወከፍ ምቕራብ ፉተርካ ይስካን። ሲልቨር 10%፣ ጎልድ 15%፣ ፕላቲነም 20%፣ ዳያሞንድ 25%።"
  },
  cta: {
    kicker: "ንምፍጣር ድሉው ዲኻ?",
    title: "NOXEL Forge ተጸምበር",
    subtitle: "ሎሚ ዝተረጋገጸ ናይ ባክሊንክ ኔትወርክካ ምህናጽ ጀምር።"
  }
};

const my: ForgeTranslations = {
  nav: {
    submit: "တင်သွင်းရန်",
    dashboard: "ဒက်ရှ်ဘုတ်",
    pricing: "စျေးနှုန်း",
    badges: "ဘတ်ဂျ်များ"
  },
  hero: {
    kicker: "NOXEL Forge - ဘက်လင့်ခ်လဲလှယ်ရေး စနစ်",
    title: "သင်၏",
    titleAccent: "အာဏာသိကျ္ခာ",
    subtitle: "Alfred စစ်ထုတ်ပြီးသော အတည်ပြုထားသောဆိုဒ်များနှင့် ဘက်လင့်ခ်များ လဲလှယ်ပါ။ အရည်အသွေး အာမခံ၊ spam မဖြစ်နိုင်ပါ။ တစ်ခုပေး၊ တစ်ခုရ။",
    ctaSubmit: "ကျွန်ုပ်၏ဆိုဒ်ကို တင်သွင်းရန်",
    ctaDashboard: "ကျွန်ုပ်၏ ဒက်ရှ်ဘုတ်"
  },
  stats: {
    forgePoints: "Forge အမှတ်များ",
    forgePointsDesc: "လဲလှယ်မှုတိုင်းတွင် အမှတ်များ ရရှိပါ",
    giveOne: "တစ်ခုပေး၊ တစ်ခုရ",
    giveOneDesc: "ဘက်လင့်ခ်တစ်ခု ပေးလိုက်သည်နှင့် တစ်ခု ပြန်ရမည်",
    alfredFilters: "Alfred စစ်ထုတ်မှု",
    alfredFiltersDesc: "spam သုညနှင့် အများသုံးအကြောင်းအရာ သုည"
  },
  trust: {
    kicker: "ယုံကြည်မှု ရမှတ် Forge",
    subtitle: "ဆိုဒ်တိုင်းသည် အရည်အသွေး အချက် ၆ ချက်အပေါ်အခြေခံ၍ ၁၀၀ အနက် ရမှတ်တစ်ခု ရရှိသည်"
  },
  directory: {
    kicker: "လမ်းညွှန်",
    title: "အတည်ပြုထားသော Forge ဆိုဒ်များ",
    empty: "လမ်းညွှန်သည် ယခုအခါ ဗလာဖြစ်နေသည်",
    emptyDesc: "သင်၏ဆိုဒ်ကို ပထမဆုံး တင်သွင်းသူ ဖြစ်လိုက်ပါ။",
    loading: "လမ်းညွှန် ဖွင့်နေသည်...",
    previous: "ယခင်",
    next: "နောက်"
  },
  submit: {
    alfredTitle: "Alfred က တင်သွင်းမှုတိုင်းကို သုံးသပ်သည်",
    alfredDesc: "တင်သွင်းမှုတိုင်းကို Alfred က ထုတ်ဝေမတိုင်ခင် စကင်ဖတ်ပြီး သုံးသပ်သည်။ အရည်အသွေး အာမခံ၊ spam မဖြစ်နိုင်ပါ။",
    urlLabel: "ဆိုဒ် URL",
    urlHint: "HTTPS လိုအပ်သည်။ noxelseo.com သို့မဟုတ် noxelforge.com သို့ လင့်ခ်ပါဝင်ရမည်",
    titleLabel: "ခေါင်းစဉ်",
    nicheLabel: "အထူးပြု နယ်ပယ်",
    descLabel: "အကျဉ်းချုပ် ဖော်ပြချက်",
    contentLabel: "အဓိက အကြောင်းအရာ",
    contentHint: "ရွေးချယ်နိုင်သည်၊ Alfred ပိုမိုကောင်းမွန်စွာ ခွဲခြမ်းစိတ်ဖြာနိုင်ရန် ကူညီသည်",
    submitBtn: "NOXEL Forge သို့ တင်သွင်းရန်",
    analyzing: "ခွဲခြမ်းစိတ်ဖြာနေသည်..."
  },
  pricing: {
    kicker: "NOXEL Forge စျေးနှုန်း",
    title: "သင်၏",
    titleAccent: "အာဏာသိကျ္ခာ ကွန်ရက်",
    subtitle: "သင်၏ဆိုဒ်တွင် NOXEL ဘတ်ဂျ် ပြသပြီး အဆင့်တိုင်းတွင် အထူးလျှော့စျေးများ ရယူပါ။",
    monthly: "လစဉ်",
    annual: "နှစ်စဉ်",
    badgeToggle: "ကျွန်ုပ် NOXEL ဘတ်ဂျ် ပြသထားသည်၊ လျှော့စျေး ဖွင့်ပါ",
    badgeApplied: "ဘတ်ဂျ် လျှော့စျေး သက်ရောက်ပြီ",
    mostPopular: "အရေပြားဆုံး",
    perMonth: "/လ",
    getStarted: "အခမဲ့ စတင်ပါ",
    badgeInfoTitle: "ဘတ်ဂျ် လျှော့စျေးများ ဖွင့်နည်း",
    badgeInfoDesc: "သင်၏ဆိုဒ်၏ footer တွင် ဘတ်ဂျ်တစ်ခုခု ပြသပါ။ Alfred က တင်သွင်းမှုတိုင်းတွင် သင်၏ footer ကို စကင်ဖတ်သည်။"
  },
  badge: {
    kicker: "သင်၏ဆိုဒ်တွင် ပြသရန်",
    title: "NOXEL Forge",
    titleAccent: "ဘတ်ဂျ်များ",
    subtitle: "ဘတ်ဂျ်တစ်ခုခုကို သင်၏ဆိုဒ် footer တွင် ကူးယူ၍ ကပ်ထည့်ပါ။",
    copy: "ကုဒ် ကူးယူရန်",
    copied: "ကူးယူပြီး!",
    infoTitle: "ဘတ်ဂျ် လျှော့စျေးများ အလုပ်လုပ်ပုံ",
    infoDesc: "ဆိုဒ်တစ်ခုလုံးတွင် ဘတ်ဂျ်တစ်ခုခုကို သင်၏ဆိုဒ်၏ footer တွင် ထည့်ပါ။ Alfred က တင်သွင်းမှုတိုင်းတွင် သင်၏ footer ကို စကင်ဖတ်သည်။ Silver ၁၀%၊ Gold ၁၅%၊ Platinum ၂၀%၊ Diamond ၂၅%။"
  },
  cta: {
    kicker: "forge လုပ်ရန် အသင့်ဖြစ်ပြီလား?",
    title: "NOXEL Forge တွင် ပါဝင်ပါ",
    subtitle: "ယနေ့ပင် သင်၏ အတည်ပြုထားသော ဘက်လင့်ခ်ကွန်ရက်ကို တည်ဆောက်စတင်ပါ။"
  }
};

const lo: ForgeTranslations = {
  nav: {
    submit: "ສົ່ງ",
    dashboard: "ແດຊບອດ",
    pricing: "ລາຄາ",
    badges: "ແບດຈ໌"
  },
  hero: {
    kicker: "NOXEL Forge - ລະບົບນິເວດການແລກປ່ຽນແບັກລິງ",
    title: "ສ້າງ",
    titleAccent: "ອຳນາດ",
    subtitle: "ແລກປ່ຽນແບັກລິງກັບເວັບໄຊທ໌ທີ່ຜ່ານການກວດສອບໂດຍ Alfred. ຮັບປະກັນຄຸນນະພາບ, ສະແປມເປັນໄປບໍ່ໄດ້. ໃຫ້ໜຶ່ງ, ໄດ້ຮັບໜຶ່ງ.",
    ctaSubmit: "ສົ່ງເວັບໄຊທ໌ຂອງຂ້ອຍ",
    ctaDashboard: "ແດຊບອດຂອງຂ້ອຍ"
  },
  stats: {
    forgePoints: "ຄະແນນ Forge",
    forgePointsDesc: "ສະສົມຄະແນນໃນທຸກການແລກປ່ຽນ",
    giveOne: "ໃຫ້ໜຶ່ງ, ໄດ້ຮັບໜຶ່ງ",
    giveOneDesc: "ທ່ານໃຫ້ແບັກລິງ, ທ່ານໄດ້ຮັບຄືນ",
    alfredFilters: "Alfred ກັ່ນຕອງ",
    alfredFiltersDesc: "ສູນສະແປມ, ສູນເນື້ອຫາທົ່ວໄປ"
  },
  trust: {
    kicker: "ຄະແນນຄວາມໜ້າເຊື່ອຖື Forge",
    subtitle: "ທຸກເວັບໄຊທ໌ໄດ້ຮັບຄະແນນຈາກ 100 ໂດຍອີງໃສ່ 6 ສັນຍານຄຸນນະພາບ"
  },
  directory: {
    kicker: "ໄດເຣັກທໍຣີ",
    title: "ເວັບໄຊທ໌ Forge ທີ່ຜ່ານການກວດສອບ",
    empty: "ໄດເຣັກທໍຣີຍັງຫວ່າງຢູ່ໃນຕອນນີ້",
    emptyDesc: "ເປັນຄົນທຳອິດທີ່ສົ່ງເວັບໄຊທ໌ຂອງທ່ານ.",
    loading: "ກຳລັງໂຫຼດໄດເຣັກທໍຣີ...",
    previous: "ກ່ອນໜ້າ",
    next: "ຕໍ່ໄປ"
  },
  submit: {
    alfredTitle: "Alfred ກວດສອບທຸກການສົ່ງ",
    alfredDesc: "ທຸກການສົ່ງຈະຖືກສະແກນແລະກວດສອບໂດຍ Alfred ກ່ອນການເຜີຍແຜ່. ຮັບປະກັນຄຸນນະພາບ, ສະແປມເປັນໄປບໍ່ໄດ້.",
    urlLabel: "URL ເວັບໄຊທ໌",
    urlHint: "ຕ້ອງການ HTTPS. ຕ້ອງມີລິງຫາ noxelseo.com ຫຼື noxelforge.com",
    titleLabel: "ຫົວຂໍ້",
    nicheLabel: "ກຸ່ມ",
    descLabel: "ຄຳອະທິບາຍສັ້ນ",
    contentLabel: "ເນື້ອຫາຫຼັກ",
    contentHint: "ທາງເລືອກ, ຊ່ວຍໃຫ້ Alfred ວິເຄາະໄດ້ດີຂຶ້ນ",
    submitBtn: "ສົ່ງໃຫ້ NOXEL Forge",
    analyzing: "ກຳລັງວິເຄາະ..."
  },
  pricing: {
    kicker: "ລາຄາ NOXEL Forge",
    title: "ສ້າງ",
    titleAccent: "ເຄືອຂ່າຍອຳນາດ",
    subtitle: "ສະແດງແບດຈ໌ NOXEL ໃນເວັບໄຊທ໌ຂອງທ່ານແລະປົດລັອກສ່ວນຫຼຸດສະເພາະໃນທຸກລະດັບ.",
    monthly: "ລາຍເດືອນ",
    annual: "ລາຍປີ",
    badgeToggle: "ຂ້ອຍສະແດງແບດຈ໌ NOXEL, ປົດລັອກສ່ວນຫຼຸດ",
    badgeApplied: "ສ່ວນຫຼຸດແບດຈ໌ຖືກນຳໃຊ້ແລ້ວ",
    mostPopular: "ນິຍົມທີ່ສຸດ",
    perMonth: "/ເດືອນ",
    getStarted: "ເລີ່ມຕົ້ນຟຣີ",
    badgeInfoTitle: "ວິທີປົດລັອກສ່ວນຫຼຸດແບດຈ໌",
    badgeInfoDesc: "ສະແດງແບດຈ໌ໃດໆໃນສ່ວນທ້າຍຂອງເວັບໄຊທ໌ຂອງທ່ານ. Alfred ສະແກນສ່ວນທ້າຍຂອງທ່ານໃນທຸກການສົ່ງ."
  },
  badge: {
    kicker: "ສະແດງໃນເວັບໄຊທ໌ຂອງທ່ານ",
    title: "NOXEL Forge",
    titleAccent: "ແບດຈ໌",
    subtitle: "ຄັດລອກແລະວາງແບດຈ໌ໃດໆໃນສ່ວນທ້າຍຂອງເວັບໄຊທ໌ຂອງທ່ານ.",
    copy: "ຄັດລອກໂຄດ",
    copied: "ຄັດລອກແລ້ວ!",
    infoTitle: "ວິທີທີ່ສ່ວນຫຼຸດແບດຈ໌ເຮັດວຽກ",
    infoDesc: "ວາງແບດຈ໌ໃດໆໃນສ່ວນທ້າຍຂອງເວັບໄຊທ໌ຂອງທ່ານທົ່ວທັງໄຊທ໌. Alfred ສະແກນສ່ວນທ້າຍຂອງທ່ານໃນທຸກການສົ່ງ. ເງິນ 10%, ທອງ 15%, ແພລທີນຳ 20%, ເພັດ 25%."
  },
  cta: {
    kicker: "ພ້ອມທີ່ຈະສ້າງແລ້ວບໍ?",
    title: "ເຂົ້າຮ່ວມ NOXEL Forge",
    subtitle: "ເລີ່ມສ້າງເຄືອຂ່າຍແບັກລິງທີ່ຜ່ານການກວດສອບຂອງທ່ານໃນມື້ນີ້."
  }
};

const dv: ForgeTranslations = {
  nav: {
    submit: "ހުށަހަޅާ",
    dashboard: "ޑޭޝްބޯޑް",
    pricing: "އަގުތައް",
    badges: "ބެޖްތައް"
  },
  hero: {
    kicker: "NOXEL Forge - ބެކްލިންކް އެކްސްޗޭންޖް އިކޯސިސްޓަމް",
    title: "ތިބާގެ",
    titleAccent: "އޮތޯރިޓީ",
    subtitle: "Alfred ފިލްޓަރ ކޮށްފައިވާ ވެރިފައިޑް ސައިޓްތަކާ އެކު ބެކްލިންކް ބަދަލުކޮށްލާ. ކޮލިޓީ ގެރެންޓީ، ސްޕޭމް ނުވާނެ. އެއް ދީ، އެއް ލިބޭ.",
    ctaSubmit: "އަހަރެންގެ ސައިޓް ހުށަހަޅާ",
    ctaDashboard: "އަހަރެންގެ ޑޭޝްބޯޑް"
  },
  stats: {
    forgePoints: "ފޯޖް ޕޮއިންޓްސް",
    forgePointsDesc: "ކޮންމެ އެކްސްޗޭންޖަކުން ޕޮއިންޓް ހޯދާ",
    giveOne: "އެއް ދީ، އެއް ލިބޭ",
    giveOneDesc: "ތިބާ ބެކްލިންކެއް ދީ، ބެކްލިންކެއް ލިބޭ",
    alfredFilters: "Alfred ފިލްޓަރތައް",
    alfredFiltersDesc: "ސްޕޭމެއް ނެތް، ޖެނެރިކް ކޮންޓެންޓެއް ނެތް"
  },
  trust: {
    kicker: "ޓްރަސްޓް ސްކޯ ފޯޖް",
    subtitle: "ކޮންމެ ސައިޓަކަށް 6 ކޮލިޓީ ސިގްނަލްގެ މައްޗަށް 100 އިން ސްކޯ ދެވޭ"
  },
  directory: {
    kicker: "ޑިރެކްޓަރީ",
    title: "ވެރިފައިޑް ފޯޖް ސައިޓްތައް",
    empty: "ޑިރެކްޓަރީ މިވަގުތު ހުހަށް އެބައޮތް",
    emptyDesc: "ތިބާގެ ސައިޓް ފުރަތަމަ ހުށަހަޅާ.",
    loading: "ޑިރެކްޓަރީ ލޯޑް ކުރަނީ...",
    previous: "ކުރީ",
    next: "ދެން"
  },
  submit: {
    alfredTitle: "Alfred ކޮންމެ ހުށަހެޅުމެއް ރިވިއު ކުރޭ",
    alfredDesc: "ކޮންމެ ހުށަހެޅުމެއް ޝާއިއު ކުރުމުގެ ކުރިން Alfred ސްކޭން ކޮށް ރިވިއު ކުރޭ. ކޮލިޓީ ގެރެންޓީ، ސްޕޭމް ނުވާނެ.",
    urlLabel: "ސައިޓް URL",
    urlHint: "HTTPS ބޭނުންވޭ. noxelseo.com ނުވަތަ noxelforge.com އަށް ލިންކެއް ހިމެނެން ވާނެ",
    titleLabel: "ސުރުހީ",
    nicheLabel: "ނިޝް",
    descLabel: "ކުރު ތަފްސީލު",
    contentLabel: "މައި ކޮންޓެންޓް",
    contentHint: "އިހްތިޔާރީ، Alfred ބަލާ ރަނގަޅުވޭ",
    submitBtn: "NOXEL Forge އަށް ހުށަހަޅާ",
    analyzing: "ވިލަންޓެ ވަނީ..."
  },
  pricing: {
    kicker: "NOXEL Forge އަގުތައް",
    title: "ތިބާގެ",
    titleAccent: "އޮތޯރިޓީ ނެޓްވޯކް",
    subtitle: "ތިބާގެ ސައިޓްގައި NOXEL ބެޖް ދައްކާ، ކޮންމެ ޓިއަރއަކުން އެކްސްކްލޫސިވް ޑިސްކައުންޓް ހޯދާ.",
    monthly: "މަހުން",
    annual: "އަހަރުން",
    badgeToggle: "އަހަރެން NOXEL ބެޖް ދައްކަން، ޑިސްކައުންޓް ހޯދާ",
    badgeApplied: "ބެޖް ޑިސްކައުންޓް ހިމަނިއްޖެ",
    mostPopular: "އެންމެ މަގުބޫލު",
    perMonth: "/މަސް",
    getStarted: "ހިލޭ ފަށާ",
    badgeInfoTitle: "ބެޖް ޑިސްކައުންޓް ހޯދާނެ ގޮތް",
    badgeInfoDesc: "ތިބާގެ ސައިޓްގެ ފޫޓަރގައި ބެޖެއް ދައްކާ. Alfred ކޮންމެ ހުށަހެޅުމަކުން ތިބާގެ ފޫޓަރ ސްކޭން ކުރޭ."
  },
  badge: {
    kicker: "ތިބާގެ ސައިޓްގައި ދައްކާ",
    title: "NOXEL Forge",
    titleAccent: "ބެޖްތައް",
    subtitle: "ތިބާގެ ސައިޓް ފޫޓަރގައި ބެޖެއް ކޮޕީ ކޮށް ޕޭސްޓް ކޮށްލާ.",
    copy: "ސްނިޕެޓް ކޮޕީ ކޮށްލާ",
    copied: "ކޮޕީ ވެއްޖެ!",
    infoTitle: "ބެޖް ޑިސްކައުންޓް މަސައްކަތް ކުރާ ގޮތް",
    infoDesc: "ތިބާގެ ސައިޓްގެ ފޫޓަރގައި، ސައިޓް ފުރިހަމައަށް، ބެޖެއް ބަހައްޓާ. Alfred ކޮންމެ ހުށަހެޅުމަކުން ތިބާގެ ފޫޓަރ ސްކޭން ކުރޭ. ސިލްވަރ %10، ގޯލްޑް %15، ޕްލެޓިނަމް %20، ޑައިމަންޑް %25."
  },
  cta: {
    kicker: "ފޯޖް ކުރަން ތައްޔާރުތަ؟",
    title: "NOXEL Forge އާ ގުޅޭ",
    subtitle: "މިއަދު ތިބާގެ ވެރިފައިޑް ބެކްލިންކް ނެޓްވޯކް ބިނާ ކުުރަން ފަށާ."
  }
};

const ne: ForgeTranslations = {
  nav: {
    submit: "पेश गर्नुहोस्",
    dashboard: "ड्यासबोर्ड",
    pricing: "मूल्य निर्धारण",
    badges: "ब्याजहरू"
  },
  hero: {
    kicker: "NOXEL Forge - ब्याकलिङ्क एक्सचेन्ज इकोसिस्टम",
    title: "आफ्नो",
    titleAccent: "अधिकार",
    subtitle: "Alfred द्वारा फिल्टर गरिएका प्रमाणित साइटहरूसँग ब्याकलिङ्क आदानप्रदान गर्नुहोस्। गुणस्तर ग्यारेन्टी, स्प्याम असम्भव। एउटा दिनुहोस्, एउटा पाउनुहोस्।",
    ctaSubmit: "मेरो साइट पेश गर्नुहोस्",
    ctaDashboard: "मेरो ड्यासबोर्ड"
  },
  stats: {
    forgePoints: "फोर्ज पोइन्टहरू",
    forgePointsDesc: "हरेक आदानप्रदानमा पोइन्ट कमाउनुहोस्",
    giveOne: "एउटा दिनुहोस्, एउटा पाउनुहोस्",
    giveOneDesc: "तपाईंले एउटा ब्याकलिङ्क दिनुहोस्, एउटा फिर्ता पाउनुहोस्",
    alfredFilters: "Alfred फिल्टरहरू",
    alfredFiltersDesc: "शून्य स्प्याम, शून्य सामान्य सामग्री"
  },
  trust: {
    kicker: "ट्रस्ट स्कोर फोर्ज",
    subtitle: "प्रत्येक साइटले ६ गुणस्तर संकेतहरूको आधारमा १०० मध्ये स्कोर प्राप्त गर्छ"
  },
  directory: {
    kicker: "डाइरेक्टरी",
    title: "प्रमाणित फोर्ज साइटहरू",
    empty: "डाइरेक्टरी अहिलेको लागि खाली छ",
    emptyDesc: "आफ्नो साइट पेश गर्ने पहिलो व्यक्ति बन्नुहोस्।",
    loading: "डाइरेक्टरी लोड हुँदैछ...",
    previous: "अघिल्लो",
    next: "अर्को"
  },
  submit: {
    alfredTitle: "Alfred ले प्रत्येक सबमिसन समीक्षा गर्छ",
    alfredDesc: "प्रकाशन अघि प्रत्येक सबमिसन Alfred द्वारा स्क्यान र समीक्षा गरिन्छ। गुणस्तर ग्यारेन्टी, स्प्याम असम्भव।",
    urlLabel: "साइट URL",
    urlHint: "HTTPS आवश्यक छ। noxelseo.com वा noxelforge.com को लिङ्क समावेश हुनुपर्छ",
    titleLabel: "शीर्षक",
    nicheLabel: "निच",
    descLabel: "छोटो विवरण",
    contentLabel: "मुख्य सामग्री",
    contentHint: "वैकल्पिक, Alfred लाई राम्रोसँग विश्लेषण गर्न मद्दत गर्छ",
    submitBtn: "NOXEL Forge मा पेश गर्नुहोस्",
    analyzing: "विश्लेषण हुँदैछ..."
  },
  pricing: {
    kicker: "NOXEL Forge मूल्य निर्धारण",
    title: "आफ्नो",
    titleAccent: "अधिकार नेटवर्क",
    subtitle: "आफ्नो साइटमा NOXEL ब्याज प्रदर्शन गर्नुहोस् र हरेक तहमा विशेष छुट अनलक गर्नुहोस्।",
    monthly: "मासिक",
    annual: "वार्षिक",
    badgeToggle: "म NOXEL ब्याज प्रदर्शन गर्छु, छुट अनलक गर्नुहोस्",
    badgeApplied: "ब्याज छुट लागू गरियो",
    mostPopular: "सबैभन्दा लोकप्रिय",
    perMonth: "/महिना",
    getStarted: "निःशुल्क सुरु गर्नुहोस्",
    badgeInfoTitle: "ब्याज छुट कसरी अनलक गर्ने",
    badgeInfoDesc: "आफ्नो साइटको फुटरमा कुनै पनि ब्याज प्रदर्शन गर्नुहोस्। Alfred ले प्रत्येक सबमिसनमा तपाईंको फुटर स्क्यान गर्छ।"
  },
  badge: {
    kicker: "आफ्नो साइटमा प्रदर्शन गर्नुहोस्",
    title: "NOXEL Forge",
    titleAccent: "ब्याजहरू",
    subtitle: "आफ्नो साइट फुटरमा कुनै पनि ब्याज कपी र पेस्ट गर्नुहोस्।",
    copy: "स्निपेट कपी गर्नुहोस्",
    copied: "कपी गरियो!",
    infoTitle: "ब्याज छुटहरू कसरी काम गर्छन्",
    infoDesc: "आफ्नो साइटको फुटरमा साइटव्यापी रूपमा कुनै पनि ब्याज राख्नुहोस्। Alfred ले प्रत्येक सबमिसनमा तपाईंको फुटर स्क्यान गर्छ। सिल्भर १०%, गोल्ड १५%, प्लाटिनम २०%, डाइमन्ड २५%।"
  },
  cta: {
    kicker: "फोर्ज गर्न तयार हुनुहुन्छ?",
    title: "NOXEL Forge मा सामेल हुनुहोस्",
    subtitle: "आज आफ्नो प्रमाणित ब्याकलिङ्क नेटवर्क निर्माण सुरु गर्नुहोस्।"
  }
};

const km: ForgeTranslations = {
  nav: {
    submit: "ដាក់ស្នើ",
    dashboard: "ផ្ទាំងគ្រប់គ្រង",
    pricing: "តម្លៃ",
    badges: "បាដហ្ស"
  },
  hero: {
    kicker: "NOXEL Forge - ប្រព័ន្ធផ្លាស់ប្តូរ Backlink",
    title: "បង្កើត",
    titleAccent: "សិទ្ធិអំណាច",
    subtitle: "ផ្លាស់ប្តូរ backlink ជាមួយគេហទំព័រដែលបានផ្ទៀងផ្ទាត់ដោយ Alfred ។ ធានាគុណភាព មិនអាចមានសារឥតបានការ។ ផ្តល់មួយ ទទួលមួយ។",
    ctaSubmit: "ដាក់ស្នើគេហទំព័ររបស់ខ្ញុំ",
    ctaDashboard: "ផ្ទាំងគ្រប់គ្រងរបស់ខ្ញុំ"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "រកពិន្ទុលើការផ្លាស់ប្តូររាល់លើក",
    giveOne: "ផ្តល់មួយ ទទួលមួយ",
    giveOneDesc: "អ្នកផ្តល់ backlink មួយ អ្នកទទួលបានមួយវិញ",
    alfredFilters: "តម្រង Alfred",
    alfredFiltersDesc: "គ្មានសារឥតបានការ គ្មានខ្លឹមសារទូទៅ"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "គេហទំព័រគ្រប់ទីទទួលបានពិន្ទុចេញពី 100 ដោយផ្អែកលើសញ្ញាណគុណភាព 6"
  },
  directory: {
    kicker: "ឯកសារបញ្ជី",
    title: "គេហទំព័រ Forge ដែលបានផ្ទៀងផ្ទាត់",
    empty: "ឯកសារបញ្ជីនៅទទេនៅឡើយ",
    emptyDesc: "សូមក្លាយជាអ្នកដំបូងដាក់ស្នើគេហទំព័ររបស់អ្នក។",
    loading: "កំពុងផ្ទុកឯកសារបញ្ជី...",
    previous: "មុន",
    next: "បន្ទាប់"
  },
  submit: {
    alfredTitle: "Alfred ពិនិត្យការដាក់ស្នើរាល់លើក",
    alfredDesc: "ការដាក់ស្នើរាល់លើកត្រូវបានស្កេន និងពិនិត្យដោយ Alfred មុនការផ្សព្វផ្សាយ។ ធានាគុណភាព មិនអាចមានសារឥតបានការ។",
    urlLabel: "URL គេហទំព័រ",
    urlHint: "ត្រូវការ HTTPS ។ ត្រូវតែមានតំណភ្ជាប់ទៅ noxelseo.com ឬ noxelforge.com",
    titleLabel: "ចំណងជើង",
    nicheLabel: "ជំនាញ",
    descLabel: "ការពិពណ៌នាខ្លី",
    contentLabel: "ខ្លឹមសារចម្បង",
    contentHint: "ស្រេចចិត្ត ជួយ Alfred វិភាគបានល្អជាងមុន",
    submitBtn: "ដាក់ស្នើទៅ NOXEL Forge",
    analyzing: "កំពុងវិភាគ..."
  },
  pricing: {
    kicker: "តម្លៃ NOXEL Forge",
    title: "បង្កើត",
    titleAccent: "បណ្តាញសិទ្ធិអំណាច",
    subtitle: "បង្ហាញបាដហ្ស NOXEL នៅលើគេហទំព័ររបស់អ្នក និងដោះសោការបញ្ចុះតម្លៃផ្តាច់មុខលើគ្រប់កម្រិត។",
    monthly: "ប្រចាំខែ",
    annual: "ប្រចាំឆ្នាំ",
    badgeToggle: "ខ្ញុំបង្ហាញបាដហ្ស NOXEL ដោះសោការបញ្ចុះតម្លៃ",
    badgeApplied: "ការបញ្ចុះតម្លៃបាដហ្សត្រូវបានអនុវត្ត",
    mostPopular: "ពេញនិយមបំផុត",
    perMonth: "/ខែ",
    getStarted: "ចាប់ផ្តើមដោយឥតគិតថ្លៃ",
    badgeInfoTitle: "របៀបដោះសោការបញ្ចុះតម្លៃបាដហ្ស",
    badgeInfoDesc: "បង្ហាញបាដហ្សណាមួយនៅក្នុង footer គេហទំព័ររបស់អ្នក។ Alfred ស្កេន footer របស់អ្នកនៅការដាក់ស្នើរាល់លើក។"
  },
  badge: {
    kicker: "បង្ហាញនៅលើគេហទំព័ររបស់អ្នក",
    title: "NOXEL Forge",
    titleAccent: "បាដហ្ស",
    subtitle: "ចម្លង និងបិទភ្ជាប់បាដហ្សណាមួយនៅក្នុង footer គេហទំព័ររបស់អ្នក។",
    copy: "ចម្លង snippet",
    copied: "បានចម្លង!",
    infoTitle: "របៀបដែលការបញ្ចុះតម្លៃបាដហ្សដំណើរការ",
    infoDesc: "ដាក់បាដហ្សណាមួយនៅក្នុង footer គេហទំព័ររបស់អ្នក ទូទាំងគេហទំព័រ។ Alfred ស្កេន footer របស់អ្នកនៅការដាក់ស្នើរាល់លើក។ Silver 10%, Gold 15%, Platinum 20%, Diamond 25%."
  },
  cta: {
    kicker: "រួចរាល់ក្នុងការបង្កើតហើយឬ?",
    title: "ចូលរួម NOXEL Forge",
    subtitle: "ចាប់ផ្តើមបង្កើតបណ្តាញ backlink ដែលបានផ្ទៀងផ្ទាត់របស់អ្នកថ្ងៃនេះ។"
  }
};

const si: ForgeTranslations = {
  nav: {
    submit: "ඉදිරිපත් කරන්න",
    dashboard: "උපකරණ පුවරුව",
    pricing: "මිල නির්ණය",
    badges: "බැජ්"
  },
  hero: {
    kicker: "NOXEL Forge - බැක්ලිංක් හුවමාරු පරිසර පද්ධතිය",
    title: "ඔබේ",
    titleAccent: "අධිකාරිය",
    subtitle: "Alfred විසින් පෙරන ලද සත්යාපිත අඩවි සමඟ බැක්ලිංක් හුවමාරු කරන්න. ගුණත්වය සහතිකයි, ස්පෑම් කළ නොහැක. එකක් දෙන්න, එකක් ගන්න.",
    ctaSubmit: "මගේ අඩවිය ඉදිරිපත් කරන්න",
    ctaDashboard: "මගේ උපකරණ පුවරුව"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "සෑම හුවමාරුවකින්ම ලකුණු උපයන්න",
    giveOne: "එකක් දෙන්න, එකක් ගන්න",
    giveOneDesc: "ඔබ බැක්ලිංකයක් දෙන්න, ඔබට එකක් ලැබේ",
    alfredFilters: "Alfred පෙරහන්",
    alfredFiltersDesc: "ස්පෑම් නැත, සාමාන්ය අන්තර්ගතය නැත"
  },
  trust: {
    kicker: "විශ්වාස ලකුණු Forge",
    subtitle: "සෑම අඩවියක්ම ගුණාත්මක සංඥා 6ක් මත පදනම්ව 100න් ලකුණු ලබා ගනී"
  },
  directory: {
    kicker: "නාමාවලිය",
    title: "සත්යාපිත Forge අඩවි",
    empty: "නාමාවලිය දැනට හිස්ය",
    emptyDesc: "ඔබේ අඩවිය ඉදිරිපත් කළ පළමු අය වන්න.",
    loading: "නාමාවලිය පූරණය වෙමින් පවතී...",
    previous: "පෙර",
    next: "ඊළඟ"
  },
  submit: {
    alfredTitle: "Alfred සෑම ඉදිරිපත් කිරීමක්ම සමාලෝචනය කරයි",
    alfredDesc: "සෑම ඉදිරිපත් කිරීමක්ම ප්රකාශනයට පෙර Alfred විසින් පරිලෝකනය කර සමාලෝචනය කෙරේ. ගුණත්වය සහතිකයි, ස්පෑම් කළ නොහැක.",
    urlLabel: "අඩවි URL",
    urlHint: "HTTPS අවශ්යය. noxelseo.com හෝ noxelforge.com වෙත සබැඳියක් අඩංගු විය යුතුය",
    titleLabel: "මාතෘකාව",
    nicheLabel: "කොටස",
    descLabel: "කෙටි විස්තරය",
    contentLabel: "ප්රධාන අන්තර්ගතය",
    contentHint: "විකල්පය, Alfred ට වඩා හොඳින් විශ්ලේෂණය කිරීමට උපකාරී වේ",
    submitBtn: "NOXEL Forge වෙත ඉදිරිපත් කරන්න",
    analyzing: "විශ්ලේෂණය වෙමින්..."
  },
  pricing: {
    kicker: "NOXEL Forge මිල නිර්ණය",
    title: "ඔබේ",
    titleAccent: "අධිකාරි ජාලය",
    subtitle: "ඔබේ අඩවියේ NOXEL බැජ් දර්ශනය කර සෑම මට්ටමකම සුවිශේෂ වට්ටම් අගුළු අරින්න.",
    monthly: "මාසික",
    annual: "වාර්ෂික",
    badgeToggle: "මම NOXEL බැජ් දර්ශනය කරමි, වට්ටම් අගුළු අරින්න",
    badgeApplied: "බැජ් වට්ටම් යෙදී ඇත",
    mostPopular: "වඩාත් ජනප්රිය",
    perMonth: "/මා",
    getStarted: "නොමිලේ ආරම්භ කරන්න",
    badgeInfoTitle: "බැජ් වට්ටම් අගුළු අරිනේ කෙසේද",
    badgeInfoDesc: "ඔබේ අඩවියේ පාදකයේ ඕනෑම බැජ් එකක් දර්ශනය කරන්න. Alfred සෑම ඉදිරිපත් කිරීමකදීම ඔබේ පාදකය පරිලෝකනය කරයි."
  },
  badge: {
    kicker: "ඔබේ අඩවියේ දර්ශනය කරන්න",
    title: "NOXEL Forge",
    titleAccent: "බැජ්",
    subtitle: "ඔබේ අඩවි පාදකයේ ඕනෑම බැජ් එකක් පිටපත් කර අලවන්න.",
    copy: "කේතය පිටපත් කරන්න",
    copied: "පිටපත් කෙරිණි!",
    infoTitle: "බැජ් වට්ටම් ක්රියා කරන ආකාරය",
    infoDesc: "ඔබේ අඩවියේ පාදකයේ, අඩවිය පුරා, ඕනෑම බැජ් එකක් තබන්න. Alfred සෑම ඉදිරිපත් කිරීමකදීම ඔබේ පාදකය පරිලෝකනය කරයි. රිදී 10%, රන් 15%, ප්ලැටිනම් 20%, දියමන්ති 25%."
  },
  cta: {
    kicker: "Forge කිරීමට සූදානම්ද?",
    title: "NOXEL Forge හා එක් වන්න",
    subtitle: "අද ඔබේ සත්යාපිත බැක්ලිංක් ජාලය ගොඩනැගීම ආරම්භ කරන්න."
  }
};

const ta: ForgeTranslations = {
  nav: {
    submit: "சமர்ப்பி",
    dashboard: "டாஷ்போர்டு",
    pricing: "விலை நிர்ணயம்",
    badges: "பதக்கங்கள்"
  },
  hero: {
    kicker: "NOXEL Forge - பின்னிணைப்பு பரிமாற்ற சுற்றுச்சூழல்",
    title: "உங்கள்",
    titleAccent: "அதிகாரத்தை உருவாக்குங்கள்",
    subtitle: "Alfred வடிகட்டிய சரிபார்க்கப்பட்ட தளங்களுடன் பின்னிணைப்புகளை பரிமாறிக்கொள்ளுங்கள். தரம் உறுதி, ஸ்பேம் இல்லை. ஒன்று கொடு, ஒன்று பெறு.",
    ctaSubmit: "என் தளத்தை சமர்ப்பி",
    ctaDashboard: "என் டாஷ்போர்டு"
  },
  stats: {
    forgePoints: "Forge Points",
    forgePointsDesc: "ஒவ்வொரு பரிமாற்றத்திலும் புள்ளிகள் சம்பாதியுங்கள்",
    giveOne: "ஒன்று கொடு, ஒன்று பெறு",
    giveOneDesc: "நீங்கள் ஒரு பின்னிணைப்பு கொடுக்கிறீர்கள், ஒன்று திரும்பப் பெறுகிறீர்கள்",
    alfredFilters: "Alfred வடிகட்டிகள்",
    alfredFiltersDesc: "பூஜ்ஜிய ஸ்பேம், பூஜ்ஜிய பொதுவான உள்ளடக்கம்"
  },
  trust: {
    kicker: "Trust Score Forge",
    subtitle: "ஒவ்வொரு தளமும் 6 தர சமிக்ஞைகளின் அடிப்படையில் 100 இல் மதிப்பெண் பெறுகிறது"
  },
  directory: {
    kicker: "அடைவு",
    title: "சரிபார்க்கப்பட்ட Forge தளங்கள்",
    empty: "அடைவு இப்போது காலியாக உள்ளது",
    emptyDesc: "உங்கள் தளத்தை முதலில் சமர்ப்பிக்கவும்.",
    loading: "அடைவு ஏற்றுகிறது...",
    previous: "முந்தையது",
    next: "அடுத்தது"
  },
  submit: {
    alfredTitle: "Alfred ஒவ்வொரு சமர்ப்பிப்பையும் மதிப்பாய்வு செய்கிறார்",
    alfredDesc: "ஒவ்வொரு சமர்ப்பிப்பும் வெளியீட்டிற்கு முன் Alfred ஆல் ஸ்கேன் செய்யப்பட்டு மதிப்பாய்வு செய்யப்படுகிறது. தரம் உறுதி, ஸ்பேம் இல்லை.",
    urlLabel: "தள URL",
    urlHint: "HTTPS தேவை. noxelseo.com அல்லது noxelforge.com க்கு இணைப்பு இருக்க வேண்டும்",
    titleLabel: "தலைப்பு",
    nicheLabel: "துறை",
    descLabel: "சுருக்கமான விளக்கம்",
    contentLabel: "முக்கிய உள்ளடக்கம்",
    contentHint: "விருப்பமானது, Alfred சிறப்பாக பகுப்பாய்வு செய்ய உதவுகிறது",
    submitBtn: "NOXEL Forge க்கு சமர்ப்பி",
    analyzing: "பகுப்பாய்வு செய்கிறது..."
  },
  pricing: {
    kicker: "NOXEL Forge விலை நிர்ணயம்",
    title: "உங்கள்",
    titleAccent: "அதிகார நெட்வொர்க்கை உருவாக்குங்கள்",
    subtitle: "உங்கள் தளத்தில் NOXEL பதக்கத்தை காட்டி ஒவ்வொரு நிலையிலும் பிரத்யேக தள்ளுபடிகளை அணைக்கலாம்.",
    monthly: "மாதாந்திரம்",
    annual: "வருடாந்திரம்",
    badgeToggle: "நான் NOXEL பதக்கத்தை காட்டுகிறேன், தள்ளுபடியை அணைக்கவும்",
    badgeApplied: "பதக்க தள்ளுபடி பயன்படுத்தப்பட்டது",
    mostPopular: "மிகவும் பிரபலமானது",
    perMonth: "/மாதம்",
    getStarted: "இலவசமாக தொடங்குங்கள்",
    badgeInfoTitle: "பதக்க தள்ளுபடிகளை எப்படி அணைப்பது",
    badgeInfoDesc: "உங்கள் தளத்தின் அடிக்குறிப்பில் எந்த பதக்கத்தையும் காட்டுங்கள். Alfred ஒவ்வொரு சமர்ப்பிப்பிலும் உங்கள் அடிக்குறிப்பை ஸ்கேன் செய்கிறார்."
  },
  badge: {
    kicker: "உங்கள் தளத்தில் காட்டுங்கள்",
    title: "NOXEL Forge",
    titleAccent: "பதக்கங்கள்",
    subtitle: "உங்கள் தள அடிக்குறிப்பில் எந்த பதக்கத்தையும் நகலெடுத்து ஒட்டுங்கள்.",
    copy: "குறியீட்டை நகலெடு",
    copied: "நகலெடுக்கப்பட்டது!",
    infoTitle: "பதக்க தள்ளுபடிகள் எப்படி செயல்படுகின்றன",
    infoDesc: "உங்கள் தளத்தின் அடிக்குறிப்பில் எந்த பதக்கத்தையும் தள அளவில் வையுங்கள். Alfred ஒவ்வொரு சமர்ப்பிப்பிலும் உங்கள் அடிக்குறிப்பை ஸ்கேன் செய்கிறார். வெள்ளி 10%, தங்கம் 15%, பிளாட்டினம் 20%, வைரம் 25%."
  },
  cta: {
    kicker: "உருவாக்க தயாரா?",
    title: "NOXEL Forge இல் சேருங்கள்",
    subtitle: "இன்றே உங்கள் சரிபார்க்கப்பட்ட பின்னிணைப்பு நெட்வொர்க்கை உருவாக்கத் தொடங்குங்கள்."
  }
};


export const FORGE_TRANSLATIONS: Record<string, ForgeTranslations> = { en, fr, es, cs, vi, af, sl, fo, lb, is, th, mt, da, it, de, ln, sm, xh, pl, ja, ga, zh, gl, sn, ar, ps, ka, na, gn, tk, zu, pt, nb, so, ay, tl, lt, kg, gv, qu, sq, az, nd, lu, tn, he, kk, sr, rn, el, lv, be, hi, ro, to, kl, ss, hr, nl, bg, ru, et, tr, mg, nn, ht, bi, st, eu, rw, mh, no, ts, sv, hu, bn, sg, ko, fa, uk, mi, sw, bs, nr, ca, ff, mk, ur, ku, ny, hy, fi, ch, sk, uz, oc, id, mn, fj, ky, tg, ms, ve, la, am, ti, my, lo, dv, ne, km, si, ta };
export function getForgeT(lang: string): ForgeTranslations { return FORGE_TRANSLATIONS[lang] ?? FORGE_TRANSLATIONS['en']; }
export { LANGUAGES_115 };
