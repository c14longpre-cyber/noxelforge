/* ============================================================
   NOXEL Search 1.0 — recherche de la barre du haut (NOXEL Shell 1.3)
   Même champ que NOXEL SEO (« Search app or guides… ») entre le personnage et les pastilles.
   Copié à l'identique dans noxel360, noxelforge et noxelspectra : toute modification se fait
   partout, version incrémentée ici. Aucun appel extérieur : l'index est /search-index.json du site.
   Index : [{ "k": "app" | "guide", "t": "Titre" | { "fr": "…", "en": "…" }, "d"?: même forme, "u": "/adresse",
           "l"?: "fr" | "en" (montré seulement dans cette langue) }]
   Pages statiques : <div class="nx-search" data-nx-search data-lang="fr|en"></div> + <script defer src="/nx-search.js">.
   React : import "…/nx-search.js" puis window.NoxelSearch.mount(élément, { lang, navigate }).
   navigate(url) renvoie true s'il a ouvert la page lui-même (routeur de l'app).
   ============================================================ */
(function () {
  if (typeof window === "undefined" || window.NoxelSearch) return;

  var TEXT = {
    fr: { placeholder: "Rechercher dans l'app ou les guides…", label: "Rechercher", app: "App", guide: "Guide", none: "Aucun résultat" },
    en: { placeholder: "Search app or guides…", label: "Search", app: "App", guide: "Guide", none: "No results" },
  };
  var cache = {};

  function lang() {
    var l = "";
    try { l = localStorage.getItem("noxel-lang") || ""; } catch (e) { /* stockage indisponible */ }
    l = (l || document.documentElement.lang || navigator.language || "en").toLowerCase();
    return l.indexOf("fr") === 0 ? "fr" : "en";
  }
  function pick(v, lg) {
    if (!v) return "";
    if (typeof v === "string") return v;
    return v[lg] || v.en || v.fr || "";
  }
  function norm(s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function load(url) {
    if (!cache[url]) {
      cache[url] = fetch(url).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
    }
    return cache[url];
  }

  function mount(root, opts) {
    if (!root || root.__nxSearch) return root && root.__nxSearch;
    opts = opts || {};
    var indexUrl = opts.index || root.getAttribute("data-index") || "/search-index.json";
    // Langue : opts.lang, sinon data-lang de l'élément (pages statiques), sinon le choix enregistré (noxel-lang)
    var lg = String(opts.lang || root.getAttribute("data-lang") || lang()).toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
    var tx = TEXT[lg];
    var items = [];
    var matches = [];
    var active = -1;
    var listId = "nx-search-list-" + Math.random().toString(36).slice(2, 8);

    root.classList.add("nx-search");
    root.innerHTML = "";
    var field = document.createElement("div");
    field.className = "nx-search__field";
    field.innerHTML = '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
    var input = document.createElement("input");
    input.type = "search";
    input.className = "nx-search__input";
    input.placeholder = tx.placeholder;
    input.setAttribute("aria-label", tx.label);
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-controls", listId);
    input.autocomplete = "off";
    field.appendChild(input);
    var list = document.createElement("div");
    list.className = "nx-search__list";
    list.id = listId;
    list.setAttribute("role", "listbox");
    list.hidden = true;
    root.appendChild(field);
    root.appendChild(list);

    // L'index n'est téléchargé qu'au premier usage du champ (rien de plus au chargement de la page)
    var loaded = false;
    function ensure() {
      if (loaded) return;
      loaded = true;
      load(indexUrl).then(function (data) { items = Array.isArray(data) ? data : []; if (input.value) render(); });
    }

    function close() { list.hidden = true; input.setAttribute("aria-expanded", "false"); active = -1; }
    function go(m) {
      close();
      input.value = "";
      input.blur();
      if (opts.navigate && opts.navigate(m.u) === true) return;
      window.location.assign(m.u);
    }
    function render() {
      var q = norm(input.value.trim());
      if (q.length < 2) { matches = []; close(); return; }
      var words = q.split(/\s+/);
      matches = items.map(function (it) {
        if (it.l && it.l !== lg) return null;
        var t = norm(pick(it.t, lg)), d = norm(pick(it.d, lg));
        var ok = words.every(function (w) { return t.indexOf(w) >= 0 || d.indexOf(w) >= 0; });
        if (!ok) return null;
        var score = (t.indexOf(q) === 0 ? 0 : t.indexOf(q) >= 0 ? 1 : 2) + (it.k === "app" ? 0 : 0.5);
        return { it: it, score: score };
      }).filter(Boolean).sort(function (a, b) { return a.score - b.score; }).slice(0, 8).map(function (x) { return x.it; });
      active = -1;
      list.innerHTML = "";
      if (!matches.length) {
        var empty = document.createElement("div");
        empty.className = "nx-search__empty";
        empty.textContent = tx.none;
        list.appendChild(empty);
      }
      matches.forEach(function (m, i) {
        var a = document.createElement("a");
        a.className = "nx-search__item";
        a.href = m.u;
        a.id = listId + "-" + i;
        a.setAttribute("role", "option");
        var kind = document.createElement("span");
        kind.className = "nx-search__kind";
        kind.textContent = m.k === "app" ? tx.app : tx.guide;
        var title = document.createElement("span");
        title.className = "nx-search__title";
        title.textContent = pick(m.t, lg);
        a.appendChild(kind);
        a.appendChild(title);
        var d = pick(m.d, lg);
        if (d) {
          var desc = document.createElement("span");
          desc.className = "nx-search__desc";
          desc.textContent = d.length > 90 ? d.slice(0, 88) + "…" : d;
          a.appendChild(desc);
        }
        a.addEventListener("click", function (e) {
          if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
          e.preventDefault();
          go(m);
        });
        list.appendChild(a);
      });
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
    }
    function highlight(i) {
      var els = list.querySelectorAll(".nx-search__item");
      if (!els.length) return;
      active = (i + els.length) % els.length;
      els.forEach(function (el, j) { el.setAttribute("aria-selected", j === active ? "true" : "false"); });
      input.setAttribute("aria-activedescendant", els[active].id);
      els[active].scrollIntoView({ block: "nearest" });
    }

    input.addEventListener("input", function () { ensure(); render(); });
    input.addEventListener("focus", function () { ensure(); if (input.value.trim().length >= 2) render(); });
    input.addEventListener("pointerenter", ensure);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (list.hidden) render(); highlight(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); highlight(active - 1); }
      else if (e.key === "Enter") { var m = matches[active >= 0 ? active : 0]; if (m) { e.preventDefault(); go(m); } }
      else if (e.key === "Escape") { close(); }
    });
    function onDown(e) { if (!root.contains(e.target)) close(); }
    document.addEventListener("pointerdown", onDown);

    var api = {
      destroy: function () { document.removeEventListener("pointerdown", onDown); root.innerHTML = ""; root.__nxSearch = null; },
    };
    root.__nxSearch = api;
    return api;
  }

  function auto() {
    document.querySelectorAll("[data-nx-search]").forEach(function (el) { mount(el); });
  }
  window.NoxelSearch = { mount: mount, version: "1.0" };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", auto);
  else auto();
})();
