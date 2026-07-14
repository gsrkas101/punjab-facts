# Education

```js
import {sourceNote} from "../components/sources.js";
const sources = FileAttachment("../data/sources.json").json();
```

<div class="pf-note reveal">
<strong>In progress.</strong> This section will cover schools, enrolment, teachers and literacy in
Punjab — built the same way as the budget section, from official government data, with every figure
linked to its source.
</div>

## Planned indicators

<div class="inside-grid">
  <div class="inside-card reveal">
    <div class="ic-title">Enrolment & dropout</div>
    <div class="ic-desc">By level and gender, over time.</div>
  </div>
  <div class="inside-card reveal d1">
    <div class="ic-title">Teacher availability</div>
    <div class="ic-desc">Pupil–teacher ratios and vacancies.</div>
  </div>
  <div class="inside-card reveal d2">
    <div class="ic-title">School infrastructure</div>
    <div class="ic-desc">Electricity, toilets, drinking water, computers.</div>
  </div>
  <div class="inside-card reveal d3">
    <div class="ic-title">Literacy</div>
    <div class="ic-desc">Overall and by district, over time.</div>
  </div>
</div>

## Sources we will use

${sourceNote(sources, ["udise_plus", "niti_sdg_index", "census_2011", "data_gov_in_punjab"])}
