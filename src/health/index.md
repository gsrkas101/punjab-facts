# Health

```js
import {sourceNote} from "../components/sources.js";
const sources = FileAttachment("../data/sources.json").json();
```

<div class="pf-note reveal">
<strong>In progress.</strong> This section will cover health outcomes, immunisation and healthcare
facilities in Punjab — built from official government data, with every figure linked to its source.
</div>

## Planned indicators

<div class="inside-grid">
  <div class="inside-card reveal">
    <div class="ic-title">Immunisation</div>
    <div class="ic-desc">Child vaccination coverage.</div>
  </div>
  <div class="inside-card reveal d1">
    <div class="ic-title">Maternal & child health</div>
    <div class="ic-desc">Institutional births, infant mortality.</div>
  </div>
  <div class="inside-card reveal d2">
    <div class="ic-title">Nutrition</div>
    <div class="ic-desc">Anaemia, stunting, wasting.</div>
  </div>
  <div class="inside-card reveal d3">
    <div class="ic-title">Facilities</div>
    <div class="ic-desc">Hospitals, health centres, doctors per capita.</div>
  </div>
</div>

## Sources we will use

${sourceNote(sources, ["nfhs5_punjab", "niti_sdg_index", "data_gov_in_punjab"])}
