# China in Numbers — National Statistics of China

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node 22+](https://img.shields.io/badge/Node-22%2B-339933.svg)](https://nodejs.org/)
[![make.fun](https://img.shields.io/badge/make.fun-best--national--statistics--site-blue.svg)](https://make.fun/)

An original, fully offline national statistics site for China, built
for the make.fun "best national statistics site" bounty. Five
hash-routed pages — Overview, Population, Economy, Provinces &
Regions, Society — with hand-rolled SVG charts, sortable and
filterable tables, and working toggles. No framework, no network
requests, no placeholders: every figure is a real official statistic
with its source and year.

## Figures

All figures are official statistics for 2024 (mainland China):

- **National Bureau of Statistics of China**, Statistical
  Communiqué on the 2024 National Economic and Social Development
  (28 February 2025) and China Statistical Yearbook 2024 — GDP
  (¥134.91 trillion, +5.0%), population (1,408.28 million),
  urbanisation (67.00%), sector shares, provincial GDP for all 31
  regions, prices, jobs and income.
- **General Administration of Customs** — goods trade (exports
  ¥25.45 trillion, imports ¥18.39 trillion).
- **National Health Commission** — life expectancy 79.0 years.
- **Ministry of Education** — higher-education enrolment 60.2%.
- **CNNIC** — 1.108 billion internet users.

## Screenshots

Four real renders of the site, in `screenshots/`:

1. `1-overview.jpg` — the Overview dashboard on desktop (cover).
2. `2-provinces.jpg` — the Provinces ranking and sortable table.
3. `3-economy.jpg` — the Economy page with its GDP chart.
4. `4-overview-phone.jpg` — the Overview on a phone (390px wide).

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Open the site in desktop Chrome and at a phone size; use keys
1–5 to jump between pages.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory
and writes `dossier.json` with `buildDossier` from
`vendor/makefun-frontend.ts` (the kit's copy, unchanged).

## Layout

- `app/index.html` — page shell: masthead, tabs, footer.
- `app/style.css` — the whole design system.
- `app/data.js` — every figure, with its source.
- `app/charts.js` — hand-rolled SVG bar, line and donut charts.
- `app/views.js` — the five page renderers.
- `app/main.js` — hash router and control wiring.
- `screenshots/` — four real renders of the site.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.
