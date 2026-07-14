// Data loader: expose the provenance registry (data/sources.yml) to the site as
// JSON, so any page can render a "Source" link by source_id. Single source of truth.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const path = fileURLToPath(new URL("../../data/sources.yml", import.meta.url));
const doc = parse(readFileSync(path, "utf-8")) ?? {};
process.stdout.write(JSON.stringify(doc.sources ?? {}));
