# Government Budget & Finances

How much money the Government of Punjab raises, where it comes from, and where it goes.
Latest year is **2026-27** (budget estimates); trends run from 2024-25.

```js
import {sourceLink} from "../components/sources.js";
import {inr} from "../components/format.js";
import {countUp} from "../components/metric.js";
import {PF, legend} from "../components/charts.js";
```

```js
const sources = FileAttachment("../data/sources.json").json();
const overview = FileAttachment("../data/budget_overview.csv").csv({typed: true});
const sectors = FileAttachment("../data/budget_by_sector.csv").csv({typed: true});
const reData = FileAttachment("../data/budget_receipts_expenditure.csv").csv({typed: true});
const defData = FileAttachment("../data/budget_deficit_gsdp.csv").csv({typed: true});
const gsdp = FileAttachment("../data/budget_gsdp_trend.csv").csv({typed: true});
```

```js
const get = (name) => overview.find((d) => d.indicator === name)?.value;
const fy = (d) => d + "-" + String(d + 1).slice(2);          // 2024 -> "2024-25"
const years = [2024, 2025, 2026];

const reChart = Plot.plot({
  height: 300, marginLeft: 58, marginRight: 104, marginTop: 16,
  style: {fontSize: "13px", color: PF.ink},
  x: {label: null, ticks: years, tickFormat: fy, inset: 24},
  y: {label: "₹ crore", grid: true, tickFormat: "~s", zero: true, nice: true},
  color: {domain: ["Revenue receipts", "Revenue expenditure"], range: [PF.teal, PF.amber]},
  marks: [
    Plot.ruleY([0], {stroke: PF.grid}),
    Plot.lineY(reData, {x: "year", y: "value", stroke: "indicator", strokeWidth: 2.5}),
    Plot.dot(reData, {x: "year", y: "value", fill: "indicator", r: 4.5, stroke: "white", strokeWidth: 2}),
    Plot.text(reData.filter((d) => d.year === 2026), {x: "year", y: "value", text: (d) => inr(d.value), dx: 10, textAnchor: "start", fill: PF.muted, fontSize: 12})
  ]
});

const defChart = Plot.plot({
  height: 300, marginLeft: 44, marginRight: 96, marginTop: 16,
  style: {fontSize: "13px", color: PF.ink},
  x: {label: null, ticks: years, tickFormat: fy, inset: 24},
  y: {label: "% of GSDP", grid: true, zero: true, nice: true},
  color: {domain: ["Fiscal deficit", "Revenue deficit"], range: [PF.teal, PF.amber]},
  marks: [
    Plot.ruleY([0], {stroke: PF.grid}),
    Plot.lineY(defData, {x: "year", y: "value", stroke: "indicator", strokeWidth: 2.5}),
    Plot.dot(defData, {x: "year", y: "value", fill: "indicator", r: 4.5, stroke: "white", strokeWidth: 2}),
    Plot.text(defData.filter((d) => d.year === 2026), {x: "year", y: "value", text: (d) => d.value + "%", dx: 10, textAnchor: "start", fill: PF.muted, fontSize: 12})
  ]
});

const gsdpChart = Plot.plot({
  height: 260, marginLeft: 58, marginRight: 80, marginTop: 26,
  style: {fontSize: "13px", color: PF.ink},
  x: {label: null, ticks: years, tickFormat: fy, inset: 24},
  y: {label: "₹ crore", grid: true, tickFormat: "~s", zero: true, nice: true},
  marks: [
    Plot.ruleY([0], {stroke: PF.grid}),
    Plot.areaY(gsdp, {x: "year", y: "value", fill: PF.teal, fillOpacity: 0.1}),
    Plot.lineY(gsdp, {x: "year", y: "value", stroke: PF.teal, strokeWidth: 2.5}),
    Plot.dot(gsdp, {x: "year", y: "value", fill: PF.teal, r: 4.5, stroke: "white", strokeWidth: 2}),
    Plot.text(gsdp, {x: "year", y: "value", text: (d) => inr(d.value), dy: -12, fill: PF.muted, fontSize: 12})
  ]
});

const sectorChart = Plot.plot({
  marginLeft: 205, marginRight: 74, height: 430,
  style: {fontSize: "13px", color: PF.ink},
  x: {label: "₹ crore →", grid: true, tickFormat: "~s", nice: true},
  y: {label: null, padding: 0.4},
  marks: [
    Plot.barX(sectors, {x: "value", y: "indicator", sort: {y: "-x"}, fill: PF.teal, rx: 3}),
    Plot.text(sectors, {x: "value", y: "indicator", text: (d) => inr(d.value), dx: 7, textAnchor: "start", fill: PF.muted, fontSize: 12}),
    Plot.ruleX([0], {stroke: PF.grid})
  ]
});
```

<div class="stat-grid">
  <div class="stat-card reveal">
    <div class="stat-label">Total receipts</div>
    <div class="metric">₹${countUp(get("Total receipts"), inr)} <span class="unit">cr</span></div>
    <div class="stat-sub">Excluding borrowings</div>
  </div>
  <div class="stat-card reveal d1">
    <div class="stat-label">Total expenditure</div>
    <div class="metric">₹${countUp(get("Total expenditure"), inr)} <span class="unit">cr</span></div>
    <div class="stat-sub">Excluding debt repayment</div>
  </div>
  <div class="stat-card reveal d2">
    <div class="stat-label">Own tax revenue</div>
    <div class="metric">₹${countUp(get("Own tax revenue"), inr)} <span class="unit">cr</span></div>
    <div class="stat-sub">Raised by the state itself</div>
  </div>
</div>

## The revenue gap

Punjab's day-to-day spending has run ahead of its day-to-day income every year — the gap
between these two lines is the **revenue deficit**, met by borrowing.

<div class="card reveal">
  ${legend([{label: "Revenue receipts", color: PF.teal}, {label: "Revenue expenditure", color: PF.amber}])}
  ${reChart}
  ${sourceLink(sources, "prs_punjab_budget_2026_27")}
</div>

## How the deficit is trending

As a share of the economy (GSDP), both deficits are edging **down** from their 2024-25 levels.

<div class="card reveal">
  ${legend([{label: "Fiscal deficit", color: PF.teal}, {label: "Revenue deficit", color: PF.amber}])}
  ${defChart}
  ${sourceLink(sources, "prs_punjab_budget_2026_27")}
</div>

- **Revenue deficit (2026-27):** ₹${inr(get("Revenue deficit"))} crore — 2.2% of GSDP.
- **Fiscal deficit (2026-27):** ₹${inr(get("Fiscal deficit"))} crore — 4.1% of GSDP.
- **Outstanding liabilities:** about **45.1% of GSDP** — the accumulated debt stock.

## A growing economy

<div class="card reveal">
  <div class="chart-note">Gross State Domestic Product, current prices (₹ crore).</div>
  ${gsdpChart}
  ${sourceLink(sources, "prs_punjab_budget_2026_27")}
</div>

## Spending by sector

<div class="card reveal">
  <div class="chart-note">Budgeted expenditure by major sector, 2026-27 (₹ crore).</div>
  ${sectorChart}
  ${sourceLink(sources, "prs_punjab_budget_2026_27")}
</div>

<div class="pf-note">
<strong>Reading these numbers.</strong> Indian budgets run April–March; we label FY 2026-27 as
2026. Trend points use the best available basis per year — 2024-25 Actuals, 2025-26 Revised
Estimates, 2026-27 Budget Estimates. See <a href="../about">About &amp; Sources</a>.
</div>
