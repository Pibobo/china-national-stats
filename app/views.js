/* China in Numbers — the five pages.
   Each renderer returns an HTML string built from DATA and Charts.
   Every figure shown carries its source and year in the caption
   beneath its chart or card. */
"use strict";

var Views = (function () {
  var D = DATA;
  var C = Charts;
  var E = Charts.esc;

  function kpi(value, label, sub) {
    return '<div class="kpi"><div class="value">' + value + '</div>' +
      '<div class="label">' + label + '</div>' +
      '<div class="sub">' + sub + "</div></div>";
  }

  function pageHead(title, lede) {
    return '<div class="page-head"><h2>' + title + "</h2>" +
      '<p class="lede">' + lede + "</p>" +
      '<p class="updated">Latest complete year: <strong>2024</strong> &middot; ' +
      "Published in the NBS Statistical Communiqu&eacute; on " +
      "28 February 2025 &middot; Mainland China only</p></div>";
  }

  function source(text) {
    return '<p class="source">Source: ' + text + "</p>";
  }

  /* ---------------- Overview ---------------- */
  function overview() {
    var gdp = D.gdp;
    var labels = gdp.map(function (d) { return String(d.year); });
    var values = gdp.map(function (d) { return d.value / 1000; });
    var line = C.lineChart({
      labels: labels, values: values,
      format: function (v) { return "¥" + v.toFixed(0) + "tn"; },
      color: C.colors.red, height: 280, yMin: 0
    });
    var donut = C.donut({
      segments: D.sectors.map(function (s, i) {
        return { label: s.name, value: s.share, color: [C.colors.navy, C.colors.red, C.colors.gold][i] };
      }),
      center: ["56.7%", "services share"]
    });
    var legend = C.donutLegend(D.sectors.map(function (s, i) {
      return { label: s.name + " — ¥" + C.num(s.value) + "bn (+ " + s.growth + "%)", value: s.share, color: [C.colors.navy, C.colors.red, C.colors.gold][i] };
    }));
    var k = D.kpi;
    var h = "";
    h += pageHead("China in Numbers",
      "The essential statistics of the world's second-largest economy, " +
      "drawn from the National Bureau of Statistics of China. Five pages, " +
      "every figure sourced, nothing estimated.");
    h += '<div class="kpis">' +
      kpi(k.gdp.value, "Gross domestic product", k.gdp.change + " · " + k.gdp.source) +
      kpi(k.gdpPerCapita.value, "GDP per capita", k.gdpPerCapita.change + " · " + k.gdpPerCapita.source) +
      kpi(k.population.value, "Population, end of year", k.population.change + " · " + k.population.source) +
      kpi(k.urbanization.value, "Urbanisation rate", k.urbanization.change + " · " + k.urbanization.source) +
      kpi(k.disposableIncome.value, "Disposable income per person", k.disposableIncome.change + " · " + k.disposableIncome.source) +
      kpi(k.lifeExpectancy.value, "Life expectancy at birth", k.lifeExpectancy.change + " · " + k.lifeExpectancy.source) +
      "</div>";
    h += '<div class="card wide"><h3>GDP, 2010–2024</h3>' +
      '<div class="chart-wrap">' + line + "</div>" +
      source("National Bureau of Statistics of China, revised series after the 5th National Economic Census. GDP at current prices.") +
      "</div>";
    h += '<div class="grid-2">';
    h += '<div class="card"><h3>What the economy is made of, 2024</h3>' +
      '<div class="donut-row"><div class="donut-box">' + donut + "</div>" + legend + "</div>" +
      source("NBS Statistical Communiqu&eacute; 2024. Primary ¥9,141.4bn (+3.5%), secondary ¥49,208.7bn (+5.3%), tertiary ¥76,558.3bn (+5.0%).") +
      "</div>";
    h += '<div class="card"><h3>Three numbers that define 2024</h3><ul class="facts">' +
      "<li><strong>Third year of population decline.</strong> The population fell by 1.39 million to 1,408.28 million — births rose to 9.54 million, but deaths, at 10.93 million, were higher still.</li>" +
      "<li><strong>A record trade surplus.</strong> Goods exports reached ¥25.45 trillion against imports of ¥18.39 trillion, a surplus of ¥7.06 trillion.</li>" +
      "<li><strong>Research at 2.68% of GDP.</strong> R&amp;D spending hit ¥3,613.0 billion, up 8.3% on the year, the highest share on record.</li>" +
      "</ul>" + source("NBS Statistical Communiqu&eacute; 2024; General Administration of Customs, 2024.") + "</div>";
    h += "</div>";
    h += '<div class="card wide"><h3>Explore the data</h3><div class="link-cards">' +
      '<a class="link-card" href="#/population"><strong>Population</strong><span>1.41 billion people, falling births, an ageing age structure and a 67% urban majority.</span><br><span class="go">Open &rarr;</span></a>' +
      '<a class="link-card" href="#/economy"><strong>Economy</strong><span>GDP by year and sector, trade, prices, jobs and household income.</span><br><span class="go">Open &rarr;</span></a>' +
      '<a class="link-card" href="#/provinces"><strong>Provinces &amp; Regions</strong><span>All 31 provincial economies ranked, sortable, with Guangdong still first at ¥14.16 trillion.</span><br><span class="go">Open &rarr;</span></a>' +
      '<a class="link-card" href="#/society"><strong>Society</strong><span>Education, health, research, the digital economy and daily life.</span><br><span class="go">Open &rarr;</span></a>' +
      "</div></div>";
    return h;
  }

  /* ---------------- Population ---------------- */
  function population(state) {
    var pop = D.population;
    var labels = pop.map(function (d) { return String(d.year); });
    var totals = pop.map(function (d) { return d.total; });
    var line = C.lineChart({
      labels: labels, values: totals,
      format: function (v) { return v.toFixed(0) + "m"; },
      color: C.colors.navy, height: 270, yMin: 1300
    });
    var recent = D.vital;
    var recentPop = D.population.slice(4);
    var grouped = C.groupedBars({
      labels: recent.map(function (d) { return String(d.year); }),
      series: [
        { name: "Births", values: recentPop.map(function (d) { return d.births; }), color: C.colors.teal },
        { name: "Deaths", values: recentPop.map(function (d) { return d.deaths; }), color: C.colors.red }
      ],
      format: function (v) { return v.toFixed(2) + "m"; }, height: 270
    });
    var age = state.ageYear === 2020 ? D.age2020 : D.age2024;
    var ageNote = state.ageYear === 2020 ? "7th National Census, 1 Nov 2020" : "NBS Statistical Communiqu&eacute; 2024, Table 1";
    var ageCenter = state.ageYear === 2020 ? ["18.7%", "aged 60+ in 2020"] : ["22.0%", "aged 60+ in 2024"];
    var donut = C.donut({
      segments: age.map(function (a, i) {
        return { label: a.label, value: a.share, color: [C.colors.teal, C.colors.navy, C.colors.red][i] };
      }),
      center: ageCenter
    });
    var legend = C.donutLegend(age.map(function (a, i) {
      return { label: a.label + " — " + a.value + "m", value: a.share, color: [C.colors.teal, C.colors.navy, C.colors.red][i] };
    }));
    var urban = C.lineChart({
      labels: labels, values: pop.map(function (d) { return d.urban; }),
      format: function (v) { return v.toFixed(1) + "%"; },
      color: C.colors.gold, height: 240, yMin: 45
    });
    var h = "";
    h += pageHead("Population",
      "China's population peaked in 2021 and has fallen for three " +
      "straight years. The story of 2024 is fewer births than deaths, " +
      "a fast-ageing age structure, and two out of three people now " +
      "living in cities.");
    h += '<div class="kpis">' +
      kpi("1,408.28m", "Total population", "End of 2024, −1.39m on 2023 · NBS") +
      kpi("9.54m", "Births in 2024", "6.77 per 1,000 people · NBS") +
      kpi("10.93m", "Deaths in 2024", "7.76 per 1,000 people · NBS") +
      kpi("−0.99‰", "Natural growth rate", "Third straight year below zero · NBS") +
      kpi("67.00%", "Urbanisation rate", "943.50m urban residents · NBS") +
      kpi("104.34", "Sex ratio", "Males per 100 females · NBS") +
      "</div>";
    h += '<div class="card wide"><h3>Total population, 2010–2024</h3>' +
      '<div class="chart-wrap">' + line + "</div>" +
      source("NBS. 2010 and 2020 are census counts (1 November); other years are year-end estimates. The peak was 1,412.60 million in 2021.") +
      "</div>";
    h += '<div class="grid-2">';
    h += '<div class="card"><h3>Births vs deaths, 2022–2024</h3>' +
      '<div class="chart-wrap">' + grouped + "</div>" +
      source("NBS. Births rose in 2024 (9.54m, up from 9.02m in 2023) but still fell short of deaths for a third year.") +
      "</div>";
    h += '<div class="card"><h3>Age structure</h3>' +
      '<div class="controls">' +
      '<button type="button" class="toggle' + (state.ageYear !== 2020 ? " on" : "") + '" data-action="age-year" data-year="2024">2024</button>' +
      '<button type="button" class="toggle' + (state.ageYear === 2020 ? " on" : "") + '" data-action="age-year" data-year="2020">2020 census</button>' +
      "</div>" +
      '<div class="donut-row"><div class="donut-box">' + donut + "</div>" + legend + "</div>" +
      "<p>" + E("Aged 65 and over: ") + (state.ageYear === 2020 ? "190.64m (13.50%)" : "220.23m (15.60%)") + ".</p>" +
      source(ageNote + ". The 2020 census bands are 0–14 / 15–59 / 60+; the 2024 communique bands are 0–15 / 16–59 / 60+.") +
      "</div>";
    h += "</div>";
    h += '<div class="card wide"><h3>Urbanisation, 2010–2024</h3>' +
      '<div class="chart-wrap">' + urban + "</div>" +
      "<p>At the end of 2024, <strong>943.50 million</strong> people lived in urban areas and <strong>464.78 million</strong> in rural areas. The urban share rose 0.84 percentage points in a single year — the fastest urban shift since 2020.</p>" +
      source("NBS Statistical Communiqu&eacute; 2024. Urbanisation is the share of permanent residents living in urban areas.") +
      "</div>";
    return h;
  }

  /* ---------------- Economy ---------------- */
  function economy(state) {
    var gdp = D.gdp;
    var labels = gdp.map(function (d) { return String(d.year); });
    var mode = state.gdpMode === "growth" ? "growth" : "value";
    var values = mode === "growth" ? gdp.map(function (d) { return d.growth; }) : gdp.map(function (d) { return d.value / 1000; });
    var chart = mode === "growth"
      ? C.barChart({ labels: labels, values: values, format: function (v) { return v.toFixed(1) + "%"; }, color: C.colors.teal, height: 280 })
      : C.barChart({ labels: labels, values: values, format: function (v) { return "¥" + v.toFixed(0) + "tn"; }, color: C.colors.navy, height: 280 });
    var donut = C.donut({
      segments: D.sectors.map(function (s, i) {
        return { label: s.name, value: s.share, color: [C.colors.navy, C.colors.red, C.colors.gold][i] };
      }),
      center: ["¥134.91tn", "GDP 2024"]
    });
    var legend = C.donutLegend(D.sectors.map(function (s, i) {
      return { label: s.name + " — ¥" + C.num(s.value) + "bn (+ " + s.growth + "%)", value: s.share, color: [C.colors.navy, C.colors.red, C.colors.gold][i] };
    }));
    var trade = C.groupedBars({
      labels: D.trade.map(function (d) { return String(d.year); }),
      series: [
        { name: "Exports", values: D.trade.map(function (d) { return d.exports; }), color: C.colors.navy },
        { name: "Imports", values: D.trade.map(function (d) { return d.imports; }), color: C.colors.gold }
      ],
      format: function (v) { return "¥" + v.toFixed(1) + "tn"; }, height: 270
    });
    var h = "";
    h += pageHead("Economy",
      "GDP grew 5.0% in 2024 to ¥134.91 trillion, meeting the year's " +
      "target of around 5%. Services now produce 56.7% of output, " +
      "manufacturing grew 6.1%, and goods trade set a record surplus.");
    h += '<div class="kpis">' +
      kpi("¥134.91tn", "GDP 2024", "+5.0% in real terms · NBS") +
      kpi("¥95,749", "GDP per capita", "+5.1% on 2023 · NBS") +
      kpi("¥48.79tn", "Retail sales", "+3.5% on 2023 · NBS") +
      kpi("¥51.44tn", "Fixed-asset investment", "+3.2% on 2023 · NBS") +
      kpi("¥25.45tn", "Goods exports", "+7.1% on 2023 · Customs") +
      kpi("5.1%", "Surveyed urban jobless rate", "Annual average, 2024 · NBS") +
      "</div>";
    h += '<div class="card wide"><h3>GDP by year</h3>' +
      '<div class="controls">' +
      '<button type="button" class="toggle' + (mode === "value" ? " on" : "") + '" data-action="gdp-mode" data-mode="value">Value (¥ trillion)</button>' +
      '<button type="button" class="toggle' + (mode === "growth" ? " on" : "") + '" data-action="gdp-mode" data-mode="growth">Real growth (%)</button>' +
      "</div>" +
      '<div class="chart-wrap">' + chart + "</div>" +
      source("NBS, revised series after the 5th National Economic Census. 2023 GDP was revised up to ¥129.43 trillion in that revision; growth rates are at constant prices.") +
      "</div>";
    h += '<div class="grid-2">';
    h += '<div class="card"><h3>Three sectors, 2024</h3>' +
      '<div class="donut-row"><div class="donut-box">' + donut + "</div>" + legend + "</div>" +
      "<p>High-tech manufacturing grew <strong>8.9%</strong>; output of new-energy vehicles rose <strong>38.7%</strong>, integrated circuits <strong>22.2%</strong>, industrial robots <strong>14.2%</strong>.</p>" +
      source("NBS Statistical Communiqu&eacute; 2024.") +
      "</div>";
    h += '<div class="card"><h3>Prices and jobs</h3><ul class="facts">' +
      "<li>Consumer prices rose <strong>0.2%</strong> in 2024; producer prices fell <strong>2.2%</strong>.</li>" +
      "<li><strong>734.39 million</strong> people were employed; 473.45 million of them in urban areas (64.5%).</li>" +
      "<li>Per capita disposable income reached <strong>¥41,314</strong>, up 5.3% in nominal terms and 5.1% after inflation.</li>" +
      "<li>Overall labour productivity was <strong>¥173,898</strong> per person, up 4.9%.</li>" +
      "<li>General public budget revenue was <strong>¥21,970.2 billion</strong>, up 1.3%; foreign-exchange reserves ended the year at <strong>$3,202.4 billion</strong>.</li>" +
      "</ul>" + source("NBS Statistical Communiqu&eacute; 2024.") + "</div>";
    h += "</div>";
    h += '<div class="card wide"><h3>Goods trade, 2020–2024</h3>' +
      '<div class="chart-wrap">' + trade + "</div>" +
      "<p>Total goods trade in 2024 was <strong>¥43.85 trillion</strong> (+5.0%), with a surplus of <strong>¥7.06 trillion</strong> — exports ¥25.45 trillion, imports ¥18.39 trillion.</p>" +
      source("General Administration of Customs, 2024.") +
      "</div>";
    return h;
  }

  /* ---------------- Provinces ---------------- */
  function provinces(state) {
    var rows = D.provinces.slice();
    var region = state.provRegion || "All";
    if (region !== "All") rows = rows.filter(function (p) { return p.region === region; });
    var key = state.provSort || "gdp";
    var dir = state.provDir === "asc" ? 1 : -1;
    rows.sort(function (a, b) {
      if (key === "name") return dir * (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      return dir * (a[key] - b[key]);
    });
    var top10 = D.provinces.slice(0, 10);
    var hbar = C.hbarChart({
      labels: top10.map(function (p) { return p.name; }),
      values: top10.map(function (p) { return p.gdp; }),
      format: function (v) { return "¥" + C.num(v) + "bn"; },
      color: C.colors.navy
    });
    function arrow(k) {
      if (key !== k) return "";
      return dir === 1 ? " ▲" : " ▼";
    }
    var h = "";
    h += pageHead("Provinces & Regions",
      "All 31 provincial-level economies, ranked and sortable. " +
      "Guangdong has led for 36 straight years; the top two provinces " +
      "alone produce a fifth of national output.");
    h += '<div class="kpis">' +
      kpi("¥14.16tn", "Guangdong, No. 1", "10.50% of national GDP · NBS, 2024") +
      kpi("11 regions", "Over ¥5 trillion", "Guangdong to Anhui · NBS, 2024") +
      kpi("+6.3%", "Fastest: Tibet", "Xinjiang +6.1% next · NBS, 2024") +
      kpi("20.66%", "Top two combined", "Guangdong + Jiangsu share · NBS, 2024") +
      "</div>";
    h += '<div class="card wide"><h3>The ten largest provincial economies, 2024</h3>' +
      '<div class="chart-wrap">' + hbar + "</div>" +
      source("NBS / provincial statistical bulletins, 2024 preliminary figures at current prices. Jiangsu closed to within ¥462.6 billion of Guangdong, down from ¥741.0 billion in 2023.") +
      "</div>";
    h += '<div class="card wide"><h3>All 31 regions</h3>' +
      '<div class="controls">' +
      ["All", "East", "Central", "West", "Northeast"].map(function (r) {
        return '<button type="button" class="chip' + (region === r ? " on" : "") + '" data-action="prov-region" data-region="' + r + '">' + r + "</button>";
      }).join("") +
      "</div>" +
      '<div class="table-scroll"><table class="data"><thead><tr>' +
      '<th class="sortable" data-action="prov-sort" data-key="name">Region' + arrow("name") + "</th>" +
      '<th class="sortable" data-action="prov-sort" data-key="gdp">GDP (¥bn)' + arrow("gdp") + "</th>" +
      '<th class="sortable" data-action="prov-sort" data-key="share">Share of China' + arrow("share") + "</th>" +
      '<th class="sortable" data-action="prov-sort" data-key="growth">Real growth' + arrow("growth") + "</th>" +
      "<th>Region group</th>" +
      "</tr></thead><tbody>" +
      rows.map(function (p, i) {
        return "<tr><td>" + E(p.name) + " " + E(p.zh) + "</td>" +
          '<td class="num">' + C.num(p.gdp) + "</td>" +
          '<td class="num">' + p.share.toFixed(2) + "%</td>" +
          '<td class="num">+' + p.growth.toFixed(1) + "%</td>" +
          "<td>" + E(p.region) + "</td></tr>";
      }).join("") +
      "</tbody></table></div>" +
      source("NBS / provincial statistical bulletins, 2024 preliminary. Mainland China only — Hong Kong and Macao are not in this table. Click a column heading to sort; use the chips to filter by region group.") +
      "</div>";
    h += '<div class="note"><strong>How to read it.</strong> Guangdong (¥14.16tn) and Jiangsu (¥13.70tn) are each larger than most countries\' economies. The west\'s fastest growers — Tibet (+6.3%) and Xinjiang (+6.1%) — start from the smallest bases: Tibet\'s whole economy is ¥276.5 billion, a fiftieth of Guangdong\'s.</div>';
    return h;
  }

  /* ---------------- Society ---------------- */
  function society() {
    var s = D.society;
    var rd = C.lineChart({
      labels: D.rdShare.map(function (d) { return String(d.year); }),
      values: D.rdShare.map(function (d) { return d.share; }),
      format: function (v) { return v.toFixed(2) + "%"; },
      color: C.colors.teal, height: 240, yMin: 2.2
    });
    var h = "";
    h += pageHead("Society",
      "Longer lives, more schooling, more research and a digital " +
      "daily life: the human side of the 2024 statistics.");
    h += '<div class="kpis">' +
      kpi("79.0 yrs", "Life expectancy", "2024, +0.4 on 2023 · National Health Commission") +
      kpi("60.2%", "Higher-education enrolment", "Gross rate, 2024 · Ministry of Education") +
      kpi("2.68%", "R&D share of GDP", "¥3,613.0bn spent, +8.3% · NBS") +
      kpi("1.108bn", "Internet users", "78.6% penetration · CNNIC, Dec 2024") +
      "</div>";
    h += '<div class="grid-2">';
    h += '<div class="card"><h3>Education</h3><ul class="facts">' +
      "<li><strong>11.79 million</strong> students graduated from college in 2024.</li>" +
      "<li>The gross enrolment rate of higher education reached <strong>60.2%</strong>.</li>" +
      "<li>The newly added labour force averages <strong>over 14 years</strong> of schooling; more than 250 million people have received higher education.</li>" +
      "</ul>" + source("Ministry of Education, 2024; National Health Commission, 2024.") + "</div>";
    h += '<div class="card"><h3>Health</h3><ul class="facts">' +
      "<li>Life expectancy reached <strong>79.0 years</strong> in 2024, up from 78.6 in 2023 and 77.9 in 2020.</li>" +
      "<li>Infant mortality fell to <strong>4.0 per 1,000</strong> live births; maternal mortality to <strong>14.3 per 100,000</strong> — both historic lows.</li>" +
      "<li>Total health spending was <strong>¥9.09 trillion</strong> (6.7% of GDP). There were <strong>1.09 million</strong> medical institutions, including 38,710 hospitals.</li>" +
      "<li>Basic old-age insurance covered <strong>over 1.07 billion</strong> people by the end of 2024.</li>" +
      "</ul>" + source("National Health Commission, Statistical Communiqu&eacute; on China's Health Development 2024; Ministry of Civil Affairs, 2025.") + "</div>";
    h += "</div>";
    h += '<div class="card wide"><h3>Research spending as a share of GDP</h3>' +
      '<div class="chart-wrap">' + rd + "</div>" +
      "<p>R&amp;D spending reached <strong>¥3,613.0 billion</strong> in 2024, up 8.3% on the year. The share has risen every year since 2020.</p>" +
      source("National Bureau of Statistics of China, 2024.") +
      "</div>";
    h += '<div class="card wide"><h3>Daily life in numbers, 2024</h3><ul class="facts">' +
      "<li><strong>706.5 million tonnes</strong> of grain were harvested (+1.6%), the 21st straight bumper year.</li>" +
      "<li><strong>12.89 million</strong> new-energy vehicles rolled off production lines (+34.4%).</li>" +
      "<li>High-speed rail reached <strong>48,000 km</strong> of operating track, within a 162,000 km national railway network.</li>" +
      "<li><strong>406,000</strong> elderly-care institutions and facilities offered 7.99 million beds.</li>" +
      "<li>Internet users passed <strong>1.108 billion</strong>; 156 million of them were aged 60 or over.</li>" +
      "</ul>" + source("NBS Statistical Communiqu&eacute; 2024; China Association of Automobile Manufacturers, 2024; CNNIC, Dec 2024; Ministry of Civil Affairs, 2025.") + "</div>";
    return h;
  }

  return {
    overview: overview,
    population: population,
    economy: economy,
    provinces: provinces,
    society: society
  };
})();
