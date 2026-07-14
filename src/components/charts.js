// Shared chart palette (validated, see dataviz palette check) and a plain-HTML legend.
import { html } from "npm:htl";

// Validated categorical palette — teal #0d9488 · deep amber #c26a05 · blue #2a78d6 · red #d64550.
export const PF = {
  teal: "#0d9488",
  amber: "#c26a05",
  blue: "#2a78d6",
  red: "#d64550",
  ink: "#14201f",
  muted: "#5b6b69",
  grid: "rgba(15,40,38,0.10)"
};

// A legend is always present for >= 2 series (identity never by color alone).
// items: [{label, color}]
export function legend(items) {
  return html`<div class="pf-legend">${items.map(
    (it) => html`<span class="key"><span class="swatch" style=${`background:${it.color}`}></span>${it.label}</span>`
  )}</div>`;
}
