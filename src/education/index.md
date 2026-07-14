# Education

Literacy, schools, and enrolment in Punjab — from the Census and UDISE+.

```js
import {sourceLink} from "../components/sources.js";
import {inr} from "../components/format.js";
import {countUp} from "../components/metric.js";
import {PF} from "../components/charts.js";
```

```js
const sources = FileAttachment("../data/sources.json").json();
const literacy = FileAttachment("../data/education_literacy.csv").csv({typed: true});
const schools = FileAttachment("../data/education_schools.csv").csv({typed: true});
const enrolment = FileAttachment("../data/education_enrolment.csv").csv({typed: true});
```

```js
const lit = (name) => literacy.find((d) => d.indicator === name)?.value;
const pct2 = (x) => x.toFixed(2);

const schoolsChart = Plot.plot({
  marginLeft: 150, marginRight: 96, height: 210,
  style: {fontSize: "13px", color: PF.ink},
  x: {label: "Schools →", grid: true, tickFormat: "~s", nice: true},
  y: {label: null, padding: 0.42},
  marks: [
    Plot.barX(schools, {x: "value", y: "indicator", sort: {y: "-x"}, fill: PF.teal, rx: 3,
      tip: {format: {x: (d) => inr(d) + " schools", y: true}}}),
    Plot.text(schools, {x: "value", y: "indicator", text: (d) => inr(d.value), dx: 7, textAnchor: "start", fill: PF.muted, fontSize: 12}),
    Plot.ruleX([0], {stroke: PF.grid})
  ]
});

const enrolmentChart = Plot.plot({
  marginLeft: 178, marginRight: 80, height: 150,
  style: {fontSize: "13px", color: PF.ink},
  x: {label: "Students (lakh) →", grid: true, nice: true},
  y: {label: null, padding: 0.45},
  marks: [
    Plot.barX(enrolment, {x: "value", y: "indicator", sort: {y: "-x"}, fill: PF.teal, rx: 3,
      tip: {format: {x: (d) => d.toFixed(2) + " lakh", y: true}}}),
    Plot.text(enrolment, {x: "value", y: "indicator", text: (d) => d.value.toFixed(2) + " L", dx: 7, textAnchor: "start", fill: PF.muted, fontSize: 12}),
    Plot.ruleX([0], {stroke: PF.grid})
  ]
});
```

<div class="stat-grid">
  <div class="stat-card reveal">
    <div class="stat-label">Literacy — overall</div>
    <div class="metric">${countUp(lit("Overall"), pct2)}<span class="unit">%</span></div>
    <div class="stat-sub">Census 2011</div>
  </div>
  <div class="stat-card reveal d1">
    <div class="stat-label">Male literacy</div>
    <div class="metric">${countUp(lit("Male"), pct2)}<span class="unit">%</span></div>
    <div class="stat-sub">Census 2011</div>
  </div>
  <div class="stat-card reveal d2">
    <div class="stat-label">Female literacy</div>
    <div class="metric">${countUp(lit("Female"), pct2)}<span class="unit">%</span></div>
    <div class="stat-sub">~10 points below men</div>
  </div>
</div>

## Schools by management

Government schools are ~70% of Punjab's recognised schools (UDISE+ 2024-25).

<div class="card reveal">
  ${schoolsChart}
  ${sourceLink(sources, "udise_plus")}
</div>

## A shift toward private schools

Private-unaided schools now enrol **more** students than government schools, despite being far fewer in number.

<div class="card reveal">
  ${enrolmentChart}
  ${sourceLink(sources, "udise_plus")}
</div>

<div class="pf-note">
<strong>Note.</strong> Literacy is Census 2011 (the latest available); schools and enrolment are
UDISE+ 2024-25. Sources are linked on each chart and listed on <a href="../about">About &amp; Sources</a>.
</div>
