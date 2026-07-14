# Health

How Punjab's health indicators changed between the last two National Family Health
Surveys — **NFHS-4 (2015-16)** and **NFHS-5 (2019-21)**. The picture is mixed.

```js
import {sourceLink} from "../components/sources.js";
import {countUp} from "../components/metric.js";
import {PF, legend} from "../components/charts.js";
```

```js
const sources = FileAttachment("../data/sources.json").json();
const pct = FileAttachment("../data/health_nfhs_pct.csv").csv({typed: true});
const stats = FileAttachment("../data/health_key_stats.csv").csv({typed: true});
```

```js
const getPct = (name, year) => pct.find((d) => d.indicator === name && d.year === year)?.value;
const getStat = (name, year) => stats.find((d) => d.indicator === name && d.year === year)?.value;
const intFmt = (x) => String(Math.round(x));

const nfhsShort = (y) => (y === 2016 ? "NFHS-4" : "NFHS-5");
const short = {
  "Institutional births": "Institutional births",
  "Children 6-59 months anaemic": "Child anaemia",
  "Children under 5 stunted": "Stunted",
  "Children under 5 wasted": "Wasted"
};
const domain = ["Institutional births", "Children 6-59 months anaemic", "Children under 5 stunted", "Children under 5 wasted"];
const range = [PF.teal, PF.red, PF.amber, PF.blue];

const slope = Plot.plot({
  height: 360, marginLeft: 42, marginRight: 186, marginTop: 22, marginBottom: 34,
  style: {fontSize: "13px", color: PF.ink},
  x: {domain: [2016, 2020], ticks: [2016, 2020], tickFormat: nfhsShort, label: null, inset: 46},
  y: {label: "% of the relevant group", grid: true, nice: true, zero: true},
  color: {domain, range},
  marks: [
    Plot.line(pct, {x: "year", y: "value", stroke: "indicator", strokeWidth: 2.5,
      tip: {format: {x: (d) => nfhsShort(d), y: (d) => d + "%", stroke: true}}}),
    Plot.dot(pct, {x: "year", y: "value", fill: "indicator", r: 4.5, stroke: "white", strokeWidth: 2}),
    Plot.text(pct.filter((d) => d.year === 2020), {x: "year", y: "value",
      text: (d) => short[d.indicator] + " · " + d.value + "%", dx: 10, textAnchor: "start", fill: PF.muted, fontSize: 11.5})
  ]
});
```

<div class="stat-grid">
  <div class="stat-card reveal">
    <div class="stat-label">Institutional births</div>
    <div class="metric">${countUp(getPct("Institutional births", 2020), intFmt)}<span class="unit">%</span></div>
    <div class="stat-sub">▲ up from 91% (NFHS-4)</div>
  </div>
  <div class="stat-card reveal d1">
    <div class="stat-label">Child anaemia (6–59 mo)</div>
    <div class="metric">${countUp(getPct("Children 6-59 months anaemic", 2020), intFmt)}<span class="unit">%</span></div>
    <div class="stat-sub">▲ up from 57% — a sharp rise</div>
  </div>
  <div class="stat-card reveal d2">
    <div class="stat-label">Infant mortality</div>
    <div class="metric">${countUp(getStat("Infant mortality rate", 2020), intFmt)}</div>
    <div class="stat-sub">per 1,000 live births (NFHS-5)</div>
  </div>
  <div class="stat-card reveal d3">
    <div class="stat-label">Sex ratio at birth</div>
    <div class="metric">${countUp(getStat("Sex ratio at birth", 2020), intFmt)}</div>
    <div class="stat-sub">▲ up from 860 — females per 1,000 males</div>
  </div>
</div>

## What got better, what got worse

Between the two surveys, **institutional births** rose and **wasting** fell — but
**child anaemia** jumped sharply, and **stunting** barely moved.

<div class="card reveal">
  ${legend([{label: "Institutional births", color: PF.teal}, {label: "Child anaemia", color: PF.red}, {label: "Stunted", color: PF.amber}, {label: "Wasted", color: PF.blue}])}
  <div class="chart-note">NFHS-4 (2015-16) → NFHS-5 (2019-21). Higher is better for institutional births; lower is better for anaemia, stunting and wasting.</div>
  ${slope}
  ${sourceLink(sources, "nfhs5_punjab")}
</div>

<div class="pf-note">
<strong>Note.</strong> Values are from the Punjab NFHS factsheet, which reports both survey
rounds. A precise NFHS-5 full-immunisation figure is pending direct confirmation from the
factsheet before it's added here.
</div>
