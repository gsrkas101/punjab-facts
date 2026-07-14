// Data loader: pipe the canonical, committed processed dataset into the site.
// The Python ETL (pipelines/) is the single writer of data/processed/*.csv;
// this loader just serves it to the browser at build time.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(
  new URL("../../data/processed/budget_overview.csv", import.meta.url)
);
process.stdout.write(readFileSync(path, "utf-8"));
