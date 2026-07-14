// Serve the committed multi-year receipts-vs-expenditure dataset to the site.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
process.stdout.write(
  readFileSync(fileURLToPath(new URL("../../data/processed/budget_receipts_expenditure.csv", import.meta.url)), "utf-8")
);
