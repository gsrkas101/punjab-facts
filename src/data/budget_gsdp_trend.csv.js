// Serve the committed multi-year GSDP trend dataset to the site.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
process.stdout.write(
  readFileSync(fileURLToPath(new URL("../../data/processed/budget_gsdp_trend.csv", import.meta.url)), "utf-8")
);
