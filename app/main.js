/* China in Numbers — hash router and controls.
   Five pages on hash routes (#/overview, #/population, #/economy,
   #/provinces, #/society). All controls are wired by delegation on
   #view, so they keep working after every re-render. */
"use strict";

(function () {
  var ROUTES = ["overview", "population", "economy", "provinces", "society"];
  var TITLES = {
    overview: "Overview",
    population: "Population",
    economy: "Economy",
    provinces: "Provinces & Regions",
    society: "Society"
  };

  /* Control state, kept across renders. */
  var state = {
    gdpMode: "value",
    ageYear: 2024,
    provRegion: "All",
    provSort: "gdp",
    provDir: "desc"
  };

  var view = document.getElementById("view");
  var tabs = document.querySelectorAll(".tabs a");

  function currentRoute() {
    var h = window.location.hash.replace(/^#\/?/, "");
    return ROUTES.indexOf(h) === -1 ? "overview" : h;
  }

  function render(keepScroll) {
    var scrollY = keepScroll ? window.scrollY : 0;
    var route = currentRoute();
    view.innerHTML = Views[route](state);
    document.title = "China in Numbers — " + TITLES[route];
    tabs.forEach(function (a) {
      var r = a.getAttribute("href").replace(/^#\/?/, "");
      if (r === route) a.classList.add("active");
      else a.classList.remove("active");
    });
    if (keepScroll) window.scrollTo(0, scrollY);
    else window.scrollTo(0, 0);
  }

  function onControl(action, el) {
    if (action === "gdp-mode") {
      state.gdpMode = el.getAttribute("data-mode") || "value";
      render(true);
    } else if (action === "age-year") {
      state.ageYear = Number(el.getAttribute("data-year")) || 2024;
      render(true);
    } else if (action === "prov-region") {
      state.provRegion = el.getAttribute("data-region") || "All";
      render(true);
    } else if (action === "prov-sort") {
      var key = el.getAttribute("data-key") || "gdp";
      if (state.provSort === key) {
        state.provDir = state.provDir === "desc" ? "asc" : "desc";
      } else {
        state.provSort = key;
        state.provDir = key === "name" ? "asc" : "desc";
      }
      render(true);
    }
  }

  view.addEventListener("click", function (ev) {
    var el = ev.target.closest("[data-action]");
    if (!el) return;
    onControl(el.getAttribute("data-action"), el);
  });

  window.addEventListener("hashchange", function () { render(false); });

  /* Keyboard shortcuts: keys 1–5 jump between the five pages. */
  document.addEventListener("keydown", function (ev) {
    if (ev.target && (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA")) return;
    var n = Number(ev.key);
    if (n >= 1 && n <= ROUTES.length) window.location.hash = "#/" + ROUTES[n - 1];
  });

  render(false);
})();
