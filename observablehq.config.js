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

  header:
    `<div class="pf-header">` +
    `<svg class="pf-logo" viewBox="0 0 64 64" aria-hidden="true">` +
    `<g fill="none" stroke="#0d9488" stroke-width="5" stroke-linecap="round">` +
    `<path d="M10 14 C 24 14, 36 11, 54 8"/>` +
    `<path d="M10 23 C 24 23, 36 20, 54 17"/>` +
    `<path d="M10 32 C 24 32, 36 29, 54 26"/>` +
    `<path d="M10 41 C 24 41, 36 38, 54 35"/>` +
    `<path d="M10 50 C 24 50, 36 47, 54 44"/>` +
    `</g></svg>` +
    `<span class="pf-wordmark">Punjab <span class="pf-wm-accent">Facts</span></span>` +
    `<span class="pf-tag">Nonpartisan numbers from official government data</span></div>`,

  head:
    `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%230d9488' stroke-width='6.5' stroke-linecap='round'%3E%3Cpath d='M10 12 C 24 12, 36 9, 54 6'/%3E%3Cpath d='M10 22 C 24 22, 36 19, 54 16'/%3E%3Cpath d='M10 32 C 24 32, 36 29, 54 26'/%3E%3Cpath d='M10 42 C 24 42, 36 39, 54 36'/%3E%3Cpath d='M10 52 C 24 52, 36 49, 54 46'/%3E%3C/g%3E%3C/svg%3E">` +
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
