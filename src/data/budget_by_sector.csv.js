// Data loader: serve the committed budget-by-sector dataset to the site.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(
  new URL("../../data/processed/budget_by_sector.csv", import.meta.url)
);
process.stdout.write(readFileSync(path, "utf-8"));
