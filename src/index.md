---
toc: false
---

```js
import {sourceLink} from "./components/sources.js";
import {inr} from "./components/format.js";
import {countUp} from "./components/metric.js";
import {PF} from "./components/charts.js";
import {barHover} from "./components/hover.js";
```

```js
const sources = FileAttachment("./data/sources.json").json();
const overview = FileAttachment("./data/budget_overview.csv").csv({typed: true});
const sectors = FileAttachment("./data/budget_by_sector.csv").csv({typed: true});
```

```js
const get = (name) => overview.find((d) => d.indicator === name)?.value;

// Pre-sorted so DOM bar order matches data order (hover.js relies on it).
const sectorsSorted = sectors.slice().sort((a, b) => b.value - a.value);

const sectorChart = Plot.plot({
  marginLeft: 205, marginRight: 74, height: 430,
  style: {fontSize: "13px", color: PF.ink},
  x: {label: "₹ crore →", grid: true, tickFormat: "~s", nice: true},
  y: {label: null, padding: 0.4},
  marks: [
    Plot.barX(sectorsSorted, {x: "value", y: "indicator", fill: PF.teal, rx: 3}),
    Plot.text(sectorsSorted, {x: "value", y: "indicator", text: (d) => inr(d.value), dx: 7, textAnchor: "start", fill: PF.muted, fontSize: 12}),
    Plot.ruleX([0], {stroke: PF.grid})
  ]
});

const sectorHover = barHover(sectorChart, {
  data: sectorsSorted,
  valueFormat: (v) => "₹" + inr(v) + " cr"
});
```

<div class="hero">
  <div class="hero-eyebrow">Punjab · Public data</div>
  <h1 class="hero-title">The state of Punjab, in numbers</h1>
  <p class="hero-sub">Nonpartisan facts drawn only from official government sources — with every figure linked back to where it came from.</p>
  <div class="hero-figure">₹${countUp(get("GSDP (current prices)"), inr)} <span style="font-size:.42em;font-weight:700;color:var(--pf-muted);letter-spacing:0">crore</span></div>
  <div class="hero-caption">Punjab's economy (GSDP), 2026-27 — at current prices</div>
</div>

## Money at a glance

<div class="stat-grid">
  <div class="stat-card reveal">
    <div class="stat-label">Total spending</div>
    <div class="metric">₹${countUp(get("Total expenditure"), inr)} <span class="unit">cr</span></div>
    <div class="stat-sub">2026-27 budget estimate</div>
  </div>
  <div class="stat-card reveal d1">
    <div class="stat-label">Total receipts</div>
    <div class="metric">₹${countUp(get("Total receipts"), inr)} <span class="unit">cr</span></div>
    <div class="stat-sub">Excluding borrowings</div>
  </div>
  <div class="stat-card reveal d2">
    <div class="stat-label">Fiscal deficit</div>
    <div class="metric">₹${countUp(get("Fiscal deficit"), inr)} <span class="unit">cr</span></div>
    <div class="stat-sub">4.1% of GSDP</div>
  </div>
  <div class="stat-card reveal d3">
    <div class="stat-label">Own tax revenue</div>
    <div class="metric">₹${countUp(get("Own tax revenue"), inr)} <span class="unit">cr</span></div>
    <div class="stat-sub">Raised by the state itself</div>
  </div>
</div>

## Where Punjab budgets its money

<div class="card reveal">
  <div class="chart-note">Budgeted expenditure by major sector, 2026-27 (₹ crore). Education leads.</div>
  ${sectorHover}
  ${sourceLink(sources, "prs_punjab_budget_2026_27")}
</div>

## What's inside

<div class="inside-grid">
  <a class="inside-card reveal" href="./budget/">
    <div class="ic-title">Budget & Finances →</div>
    <div class="ic-desc">Where the money comes from, where it goes, and how the deficit is trending.</div>
  </a>
  <a class="inside-card reveal d1" href="./education/">
    <div class="ic-soon">In progress</div>
    <div class="ic-title">Education →</div>
    <div class="ic-desc">Schools, enrolment, teachers and literacy.</div>
  </a>
  <a class="inside-card reveal d2" href="./health/">
    <div class="ic-soon">In progress</div>
    <div class="ic-title">Health →</div>
    <div class="ic-desc">Outcomes, immunisation and facilities.</div>
  </a>
  <a class="inside-card reveal d3" href="./about">
    <div class="ic-title">About & Sources →</div>
    <div class="ic-desc">How this is built, the methodology, and every source we use.</div>
  </a>
</div>

<div class="pf-note reveal">
Every number here is transcribed or extracted from an official government source and carries a
link back to it, so you can verify it yourself. That is the whole point.
</div>
