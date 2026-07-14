<img src="assets/logo.svg" alt="Punjab Facts — five rivers mark" width="56" align="left">

# Punjab Facts

*Five rivers, drawn as data — Punjab (panj-āb) means "land of five rivers".*

A nonpartisan, government-data-only website about the **state of Punjab, India** —
modelled on [USAFacts](https://usafacts.org/). Every figure links back to its official
source. Built to run at **near-zero cost**: Python ETL + a static site on GitHub Pages.

## How it works

```
Official sources ─► Python ETL (pipelines/) ─► data/processed/*.csv ─► Observable Framework site ─► GitHub Pages
                    (validated, provenance)     (committed, tidy)       (charts + source links)      (free)
```

- **Stage A — ETL (`pipelines/`)**: Python pulls/curates official data and writes a
  canonical tidy table `indicator, geography, year, value, unit, source_id` to
  `data/processed/`. Every row's `source_id` must exist in `data/sources.yml`
  (enforced by `pipelines/common/`).
- **Stage B — Site (`src/`)**: [Observable Framework](https://observablehq.com/framework/)
  reads the committed CSVs via data loaders and renders pages with charts. The
  `sourceLink` component makes every chart cite its source automatically.

## Prerequisites

- Node.js ≥ 18 and npm
- Python ≥ 3.11 (`pip install -r requirements.txt`)

## Common tasks

```bash
# 1. Install site dependencies (once)
npm install

# 2. Regenerate processed data from the pipelines (run from repo root)
python -m pipelines.budget.punjab_budget_2026_27

# 3. Preview the site locally  → http://127.0.0.1:3000
npm run dev

# 4. Build the static site into dist/
npm run build
```

## Deploying (free)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to **GitHub Pages**. In the repo settings, set **Pages → Build and
deployment → Source = GitHub Actions**. The site then serves at
`https://<your-username>.github.io/punjab-facts/`.

## Project layout

| Path | What |
|------|------|
| `pipelines/` | Python ETL; one module per source. `common/` holds schema + provenance validation. |
| `data/sources.yml` | The provenance registry — every source, its URL and license. |
| `data/processed/` | Canonical, committed CSVs consumed by the site. |
| `src/` | The Observable Framework site (pages, components, data loaders). |
| `.github/workflows/` | CI: build + deploy to Pages. |

## Principles

Government sources only · every number links to its source · nonpartisan · non-commercial.
See the site's **About & Sources** page for methodology and licensing (data.gov.in
content is under the Government Open Data License – India).
