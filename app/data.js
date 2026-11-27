/* China in Numbers — the figures behind the site.
   Every number in this file is an official statistic, with its source
   and year recorded alongside it in the page that shows it.
   Primary sources: National Bureau of Statistics of China (NBS),
   Statistical Communique on the 2024 National Economic and Social
   Development (28 Feb 2025); China Statistical Yearbook 2024;
   National Health Commission; CNNIC. Mainland China only: the
   national total excludes Hong Kong, Macao and Taiwan. */
"use strict";

var DATA = {
  meta: {
    title: "China in Numbers",
    subtitle: "National Statistics of China",
    year: 2024,
    updated: "28 February 2025",
    coverage: "Mainland China (31 provincial-level regions)",
    /* The 2023 GDP figure below is the revised value (¥129.43tn)
       published after the 5th National Economic Census; the
       pre-revision figure quoted in early 2024 was ¥126.06tn. */
    revisionNote: "GDP revised after the 5th National Economic Census"
  },

  /* GDP at current prices, billion yuan. Revised series after the
     5th National Economic Census. Source: NBS. */
  gdp: [
    { year: 2010, value: 41925.3, growth: 10.6 },
    { year: 2015, value: 70251.2, growth: 6.9 },
    { year: 2020, value: 103486.8, growth: 2.2 },
    { year: 2021, value: 117382.3, growth: 8.6 },
    { year: 2022, value: 123402.9, growth: 3.0 },
    { year: 2023, value: 129427.2, growth: 5.2 },
    { year: 2024, value: 134908.4, growth: 5.0 }
  ],

  /* Value added by sector, 2024. Source: NBS Statistical
     Communique 2024. Billion yuan; share of GDP; real growth. */
  sectors: [
    { name: "Primary", note: "Agriculture, forestry, fishing", value: 9141.4, share: 6.8, growth: 3.5 },
    { name: "Secondary", note: "Industry and construction", value: 49208.7, share: 36.5, growth: 5.3 },
    { name: "Tertiary", note: "Services", value: 76558.3, share: 56.7, growth: 5.0 }
  ],

  /* Year-end population, million. 2010 and 2020 are census counts
     (1 Nov); other years are NBS year-end estimates. */
  population: [
    { year: 2010, total: 1339.72, births: null, deaths: null, urban: 49.68 },
    { year: 2015, total: 1374.62, births: null, deaths: null, urban: 56.10 },
    { year: 2020, total: 1411.78, births: null, deaths: null, urban: 63.89 },
    { year: 2021, total: 1412.60, births: 10.62, deaths: 10.14, urban: 64.72 },
    { year: 2022, total: 1411.75, births: 9.56, deaths: 10.41, urban: 65.22 },
    { year: 2023, total: 1409.67, births: 9.02, deaths: 11.10, urban: 66.16 },
    { year: 2024, total: 1408.28, births: 9.54, deaths: 10.93, urban: 67.00 }
  ],

  /* Vital rates, per 1,000 people. Source: NBS. */
  vital: [
    { year: 2022, birthRate: 6.77, deathRate: 7.18, natural: -0.60 },
    { year: 2023, birthRate: 6.39, deathRate: 7.87, natural: -1.48 },
    { year: 2024, birthRate: 6.77, deathRate: 7.76, natural: -0.99 }
  ],

  /* Age structure, end of 2024. Source: NBS Statistical
     Communique 2024, Table 1. Million people and share. */
  age2024: [
    { label: "Aged 0–15", value: 239.99, share: 17.1 },
    { label: "Aged 16–59", value: 857.98, share: 60.9 },
    { label: "Aged 60 and over", value: 310.31, share: 22.0 }
  ],
  age65plus2024: { label: "of whom aged 65 and over", value: 220.23, share: 15.6 },

  /* Age structure, 7th National Census, 1 Nov 2020. The bands
     differ from 2024 (0–14 here, 0–15 in the 2024 communique). */
  age2020: [
    { label: "Aged 0–14", value: 253.38, share: 17.95 },
    { label: "Aged 15–59", value: 894.38, share: 63.35 },
    { label: "Aged 60 and over", value: 264.02, share: 18.70 }
  ],
  age65plus2020: { label: "of whom aged 65 and over", value: 190.64, share: 13.50 },

  /* Sex composition, end of 2024. Source: NBS. */
  sex: [
    { label: "Male", value: 719.09, share: 51.1 },
    { label: "Female", value: 689.19, share: 48.9 }
  ],
  sexRatio: 104.34,

  /* Goods trade, trillion yuan. Source: General Administration
     of Customs. 2024: total 43.85 (+5.0%), surplus 7.06. */
  trade: [
    { year: 2020, exports: 17.93, imports: 14.22 },
    { year: 2021, exports: 21.73, imports: 17.37 },
    { year: 2022, exports: 23.97, imports: 18.10 },
    { year: 2023, exports: 23.77, imports: 17.99 },
    { year: 2024, exports: 25.45, imports: 18.39 }
  ],

  /* R&D spending as a share of GDP, %. Source: NBS. 2024 spending
     was 3,613.0 billion yuan, up 8.3% on the year. */
  rdShare: [
    { year: 2020, share: 2.40 },
    { year: 2021, share: 2.44 },
    { year: 2022, share: 2.54 },
    { year: 2023, share: 2.65 },
    { year: 2024, share: 2.68 }
  ],

  /* Gross regional product, 2024 preliminary, billion yuan.
     Source: NBS / provincial statistical bulletins, via the
     Wikipedia compilation of NBS figures. Region groups follow
     the NBS four-region split: East, Central, West, Northeast. */
  provinces: [
    { name: "Guangdong", zh: "广东", gdp: 14163.38, share: 10.50, growth: 3.5, region: "East" },
    { name: "Jiangsu", zh: "江苏", gdp: 13700.80, share: 10.16, growth: 5.8, region: "East" },
    { name: "Shandong", zh: "山东", gdp: 9856.58, share: 7.31, growth: 5.7, region: "East" },
    { name: "Zhejiang", zh: "浙江", gdp: 9013.06, share: 6.68, growth: 5.5, region: "East" },
    { name: "Sichuan", zh: "四川", gdp: 6469.70, share: 4.80, growth: 5.7, region: "West" },
    { name: "Henan", zh: "河南", gdp: 6359.00, share: 4.71, growth: 5.1, region: "Central" },
    { name: "Hubei", zh: "湖北", gdp: 6001.30, share: 4.45, growth: 5.8, region: "Central" },
    { name: "Fujian", zh: "福建", gdp: 5776.10, share: 4.28, growth: 5.5, region: "East" },
    { name: "Shanghai", zh: "上海", gdp: 5392.67, share: 4.00, growth: 5.0, region: "East" },
    { name: "Hunan", zh: "湖南", gdp: 5323.10, share: 3.95, growth: 4.8, region: "Central" },
    { name: "Anhui", zh: "安徽", gdp: 5062.52, share: 3.75, growth: 5.8, region: "Central" },
    { name: "Beijing", zh: "北京", gdp: 4984.31, share: 3.69, growth: 5.2, region: "East" },
    { name: "Hebei", zh: "河北", gdp: 4752.69, share: 3.52, growth: 5.4, region: "East" },
    { name: "Shaanxi", zh: "陕西", gdp: 3553.88, share: 2.63, growth: 5.3, region: "West" },
    { name: "Jiangxi", zh: "江西", gdp: 3420.25, share: 2.54, growth: 5.1, region: "Central" },
    { name: "Liaoning", zh: "辽宁", gdp: 3261.27, share: 2.42, growth: 5.1, region: "Northeast" },
    { name: "Chongqing", zh: "重庆", gdp: 3219.32, share: 2.39, growth: 5.7, region: "West" },
    { name: "Yunnan", zh: "云南", gdp: 3153.41, share: 2.34, growth: 3.3, region: "West" },
    { name: "Guangxi", zh: "广西", gdp: 2864.94, share: 2.12, growth: 4.2, region: "West" },
    { name: "Inner Mongolia", zh: "内蒙古", gdp: 2631.46, share: 1.95, growth: 5.8, region: "West" },
    { name: "Shanxi", zh: "山西", gdp: 2549.47, share: 1.89, growth: 2.3, region: "Central" },
    { name: "Guizhou", zh: "贵州", gdp: 2266.71, share: 1.68, growth: 5.3, region: "West" },
    { name: "Xinjiang", zh: "新疆", gdp: 2053.41, share: 1.52, growth: 6.1, region: "West" },
    { name: "Tianjin", zh: "天津", gdp: 1802.43, share: 1.34, growth: 5.1, region: "East" },
    { name: "Heilongjiang", zh: "黑龙江", gdp: 1647.69, share: 1.22, growth: 3.2, region: "Northeast" },
    { name: "Jilin", zh: "吉林", gdp: 1436.12, share: 1.06, growth: 4.3, region: "Northeast" },
    { name: "Gansu", zh: "甘肃", gdp: 1300.29, share: 0.96, growth: 5.8, region: "West" },
    { name: "Hainan", zh: "海南", gdp: 793.57, share: 0.59, growth: 3.7, region: "East" },
    { name: "Ningxia", zh: "宁夏", gdp: 550.28, share: 0.41, growth: 5.4, region: "West" },
    { name: "Qinghai", zh: "青海", gdp: 395.08, share: 0.29, growth: 2.7, region: "West" },
    { name: "Tibet", zh: "西藏", gdp: 276.49, share: 0.20, growth: 6.3, region: "West" }
  ],

  /* Headline indicators, 2024. Each carries its source. */
  kpi: {
    gdp: { value: "¥134.91tn", change: "+5.0% on 2023", source: "NBS, 2024" },
    gdpPerCapita: { value: "¥95,749", change: "+5.1% on 2023", source: "NBS, 2024" },
    population: { value: "1,408.28m", change: "−1.39m on 2023", source: "NBS, end-2024" },
    urbanization: { value: "67.00%", change: "+0.84 pp on 2023", source: "NBS, end-2024" },
    disposableIncome: { value: "¥41,314", change: "+5.3% nominal", source: "NBS, 2024" },
    lifeExpectancy: { value: "79.0 years", change: "+0.4 on 2023", source: "National Health Commission, 2024" },
    retail: { value: "¥48.79tn", change: "+3.5% on 2023", source: "NBS, 2024" },
    investment: { value: "¥51.44tn", change: "+3.2% on 2023", source: "NBS, 2024" },
    tradeSurplus: { value: "¥7.06tn", change: "Exports ¥25.45tn", source: "General Administration of Customs, 2024" },
    rd: { value: "2.68% of GDP", change: "¥3,613.0bn spent", source: "NBS, 2024" },
    graduates: { value: "11.79m", change: "College graduates", source: "Ministry of Education, 2024" },
    internet: { value: "1.108bn", change: "78.6% of people online", source: "CNNIC, Dec 2024" }
  },

  /* Society: health, education, daily life. Sources in the text. */
  society: {
    lifeExpectancy2023: 78.6,
    lifeExpectancy2024: 79.0,
    infantMortality: 4.0,
    maternalMortality: 14.3,
    healthSpending: 9.09,
    healthShareGdp: 6.7,
    hospitals: 38710,
    medicalInstitutions: 1.09,
    higherEdRate: 60.2,
    graduates: 11.79,
    oldAgeInsurance: 1070,
    grain: 706.5,
    nev: 12.89,
    hsrKm: 48000,
    railKm: 162000,
    fxReserves: 3202.4,
    budgetRevenue: 21970.2,
    cpi: 0.2,
    ppi: -2.2,
    unemployment: 5.1,
    employed: 734.39,
    urbanEmployed: 473.45
  }
};
