# About & Sources

**Punjab Facts** presents numbers about the state of Punjab, India, using only official
government data. It is nonpartisan and non-commercial. It is modelled on the approach of
[USAFacts](https://usafacts.org/): government sources only, and every figure links back
to where it came from.

## How it's built

1. **Collect** — Python pipelines pull data from official portals (data.gov.in, RBI,
   Census, UDISE+, NFHS, PRS, Open Budgets India).
2. **Standardise** — every dataset is cleaned into one tidy shape:
   `indicator, geography, year, value, unit, source_id`, and validated automatically.
3. **Attribute** — each dataset references a `source_id` in a central registry, so every
   chart can show its source link.
4. **Publish** — a static site is built with [Observable Framework](https://observablehq.com/framework/)
   and served free on GitHub Pages.

Everything is open: the code and the cleaned data live in the project's public repository.

## Conventions

- **Financial year.** Indian budgets run April–March. FY 2026-27 is labelled as the year **2026**.
- **Units.** Rupee amounts are shown in **crore** (1 crore = 10 million) with Indian digit grouping.

## Every source we use

```js
import {sourceLink} from "./components/sources.js";
const sources = await FileAttachment("./data/sources.json").json();
```

```js
display(html`<ul>${Object.keys(sources).map((id) => html`<li>
  <strong>${sources[id].source_name}</strong> — ${sources[id].publisher}.
  License: ${sources[id].license}. ${sourceLink(sources, id)}
</li>`)}</ul>`);
```

## A note on accuracy

If you spot a number that looks wrong, check it against the linked source first — and if
the site is wrong, it can be corrected at the source of truth (the cleaned dataset) and
rebuilt. Corrections are welcome.
