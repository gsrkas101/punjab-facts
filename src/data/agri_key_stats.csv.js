import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
process.stdout.write(readFileSync(fileURLToPath(new URL("../../data/processed/agri_key_stats.csv", import.meta.url)), "utf-8"));
