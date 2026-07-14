// Punjab Facts — Observable Framework configuration.
// Docs: https://observablehq.com/framework/config
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";

const read = (p) => readFileSync(fileURLToPath(new URL(p, import.meta.url)), "utf-8");
const themeCss = read("./assets/theme.css");
const animJs = read("./assets/anim.js");

export default {
  title: "Punjab Facts",

  // Served from a project GitHub Pages site: username.github.io/punjab-facts/
  base: "/punjab-facts/",

  root: "src",
  theme: "air",        // light, USAFacts-style; our CSS layers on top
  search: true,
  toc: true,

  header: `<div class="pf-header"><span class="pf-wordmark">Punjab Facts</span>` +
          `<span class="pf-tag">Nonpartisan numbers from official government data</span></div>`,

  head:
    `<link rel="preconnect" href="https://fonts.googleapis.com">` +
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` +
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">` +
    `<style>${themeCss}</style>` +
    `<script>${animJs}</script>`,

  pages: [
    {
      name: "Government Budget & Finances",
      pages: [{ name: "Overview", path: "/budget/" }]
    },
    {
      name: "Agriculture",
      pages: [{ name: "Overview", path: "/agriculture/" }]
    },
    {
      name: "Education",
      pages: [{ name: "Overview", path: "/education/" }]
    },
    {
      name: "Health",
      pages: [{ name: "Overview", path: "/health/" }]
    },
    { name: "About & Sources", path: "/about" }
  ],

  footer:
    "Built from official government data sources. Every figure links to its source. " +
    "Nonpartisan and non-commercial. Data licensed per each source (see About & Sources)."
};
