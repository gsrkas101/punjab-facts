// Reusable "Source" attribution, the USAFacts signature: every figure links back
// to its official source. Pass the sources registry (from data/sources.json) and
// a source_id; get a small, consistent citation line.
import { html } from "npm:htl";

export function sourceLink(sources, id) {
  const s = sources?.[id];
  if (!s) {
    return html`<div class="source source--missing">⚠ Unknown source: <code>${id}</code></div>`;
  }
  return html`<div class="source">Source:
    <a href=${s.url} target="_blank" rel="noopener noreferrer">${s.source_name}</a>${
    s.retrieved_date ? html` · retrieved ${s.retrieved_date}` : ""
  }</div>`;
}

export function sourceNote(sources, ids) {
  return html`<div class="source-list">${ids.map((id) => sourceLink(sources, id))}</div>`;
}
