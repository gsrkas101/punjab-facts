# Agriculture

Punjab is India's granary — and pays for it in water. With about **1.5% of India's
area**, the state supplies nearly half of the public wheat stock, while pumping far
more groundwater than nature puts back.

```js
import {sourceLink} from "../components/sources.js";
import {inr} from "../components/format.js";
import {countUp} from "../components/metric.js";
import {PF, legend} from "../components/charts.js";
import {barHover} from "../components/hover.js";
```

```js
const sources = FileAttachment("../data/sources.json").json();
const wheat = FileAttachment("../data/agri_wheat_procurement.csv").csv({typed: true});
const water = FileAttachment("../data/agri_groundwater.csv").csv({typed: true});
const stats = FileAttachment("../data/agri_key_stats.csv").csv({typed: true});
```

```js
const stat = (name) => stats.find((d) => d.indicator === name)?.value;

// Wheat procurement — Punjab vs the rest of India (RMS 2024-25).
const wheatColors = {"Punjab": PF.teal, "Rest of India": PF.blue};
const wheatChart = Plot.plot({
  marginLeft: 118, marginRight: 96, height: 170,
  style: {fontSize: "13px", color: PF.ink},
  x: {label: "Lakh tonnes →", grid: true, nice: true},
  y: {label: null, padding: 0.45},
  color: {domain: Object.keys(wheatColors), range: Object.values(wheatColors)},
  marks: [
    Plot.barX(wheat, {x: "value", y: "indicator", fill: "indicator", rx: 3}),
    Plot.text(wheat, {x: "value", y: "indicator", text: (d) => d.value.toFixed(2) + " LT", dx: 7, textAnchor: "start", fill: PF.muted, fontSize: 12}),
    Plot.ruleX([0], {stroke: PF.grid})
  ]
});
const wheatHover = barHover(wheatChart, {
  data: wheat,
  color: (d) => wheatColors[d.indicator],
  valueFormat: (v) => v.toFixed(2) + " lakh tonnes"
});

// Groundwater balance (CGWB 2023): what returns vs what's pumped.
const waterColors = {"Annual recharge": PF.teal, "Extractable resource": PF.blue, "Actual extraction": PF.red};
const waterChart = Plot.plot({
  marginLeft: 152, marginRight: 88, height: 210,
  style: {fontSize: "13px", color: PF.ink},
  x: {label: "Billion cubic metres per year →", grid: true, nice: true},
  y: {label: null, padding: 0.42},
  color: {domain: Object.keys(waterColors), range: Object.values(waterColors)},
  marks: [
    Plot.barX(water, {x: "value", y: "indicator", fill: "indicator", rx: 3}),
    Plot.text(water, {x: "value", y: "indicator", text: (d) => d.value.toFixed(2) + " bcm", dx: 7, textAnchor: "start", fill: PF.muted, fontSize: 12}),
    Plot.ruleX([0], {stroke: PF.grid})
  ]
});
const waterHover = barHover(waterChart, {
  data: water,
  color: (d) => waterColors[d.indicator],
  valueFormat: (v) => v.toFixed(2) + " bcm / year"
});
```

<div class="stat-grid">
  <div class="stat-card reveal">
    <div class="stat-label">Share of the economy</div>
    <div class="metric">${countUp(stat("Agriculture & allied share of GSVA"), (v) => String(Math.round(v)))}<span class="unit">%</span></div>
    <div class="stat-sub">of GSVA, 2023-24 — vs ~18% nationally</div>
  </div>
  <div class="stat-card reveal d1">
    <div class="stat-label">Wheat procurement share</div>
    <div class="metric">${countUp(stat("Punjab share of wheat procurement"), (v) => v.toFixed(1))}<span class="unit">%</span></div>
    <div class="stat-sub">of India's pool, RMS 2024-25</div>
  </div>
  <div class="stat-card reveal d2">
    <div class="stat-label">Average holding</div>
    <div class="metric">${countUp(stat("Average operational holding"), (v) => v.toFixed(2))} <span class="unit">ha</span></div>
    <div class="stat-sub">~3× the national average (1.08 ha)</div>
  </div>
  <div class="stat-card reveal d3">
    <div class="stat-label">Groundwater extraction</div>
    <div class="metric">${countUp(stat("Stage of groundwater extraction"), (v) => String(Math.round(v)))}<span class="unit">%</span></div>
    <div class="stat-sub">of annual extractable resource (2023)</div>
  </div>
</div>

## Nearly half of India's wheat pool

In the 2024-25 season, government agencies bought **266 lakh tonnes** of wheat
nationwide — and Punjab alone supplied **${stat("Punjab share of wheat procurement")}%** of it.

<div class="card reveal">
  ${legend([{label: "Punjab", color: PF.teal}, {label: "Rest of India", color: PF.blue}])}
  <div class="chart-note">Wheat procured for the central pool, Rabi Marketing Season 2024-25 (lakh tonnes).</div>
  ${wheatHover}
  ${sourceLink(sources, "fci_wheat_rms_2024_25")}
</div>

## The water beneath the wheat

The cost shows up underground. Punjab pumps **27.8 bcm** of groundwater a year —
against just **18.84 bcm** of natural recharge. That is an extraction rate of
**164%**, with **117 of 153 blocks** classified as over-exploited.

<div class="card reveal">
  ${legend([{label: "Annual recharge", color: PF.teal}, {label: "Extractable resource", color: PF.blue}, {label: "Actual extraction", color: PF.red}])}
  <div class="chart-note">Punjab's annual groundwater balance, CGWB assessment 2023 (billion cubic metres). Red exceeds what nature returns.</div>
  ${waterHover}
  ${sourceLink(sources, "cgwb_dynamic_2023")}
</div>

<div class="pf-note">
<strong>A glimmer of improvement.</strong> More recent assessments suggest the strain is easing
slightly — extraction has edged down and dozens of blocks have recovered as canal irrigation
expands — but Punjab still pumps roughly one and a half times what nature returns each year.
Sources are linked on each chart and listed on <a href="../about">About &amp; Sources</a>.
</div>
