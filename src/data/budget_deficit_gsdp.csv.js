// Serve the committed multi-year deficit (% of GSDP) dataset to the site.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
process.stdout.write(
  readFileSync(fileURLToPath(new URL("../../data/processed/budget_deficit_gsdp.csv", import.meta.url)), "utf-8")
);
