import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
process.stdout.write(readFileSync(fileURLToPath(new URL("../../data/processed/health_nfhs_pct.csv", import.meta.url)), "utf-8"));
