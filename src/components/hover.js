// Custom hover layer — replaces Plot's default (boxy) tips with a theme-styled,
// buttery tooltip. Two modes:
//   lineHover(chart, opts) — crosshair snaps to the nearest x; ONE tooltip lists
//                            every series at that x (per the interaction spec).
//   barHover(chart, opts)  — each bar is its own hit target; hovered bar stays
//                            full-strength, the rest dim.
// Tooltips enhance, never gate: every value is also in direct labels/axis.
// All labels are inserted with textContent (never innerHTML).
import { html } from "npm:htl";

function makeTip() {
  return html`<div class="pf-tip" aria-hidden="true"></div>`;
}

// CSS-pixel factor between the svg's viewBox units and its rendered size.
function svgFactor(svg) {
  const rect = svg.getBoundingClientRect();
  const vbw = (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width) || rect.width;
  return { rect, f: rect.width > 0 ? vbw / rect.width : 1 };
}

// Position the tooltip near (x, y) inside wrap, flipping at the edges.
// First placement after being hidden snaps (no glide from a stale position).
function placeTip(wrap, tip, x, y, wasShown) {
  const ww = wrap.clientWidth;
  const tw = tip.offsetWidth, th = tip.offsetHeight;
  let tx = x + 16, ty = y - th - 12;
  if (tx + tw > ww - 6) tx = x - tw - 16;
  if (tx < 6) tx = 6;
  if (ty < 4) ty = y + 20;
  if (!wasShown) {
    tip.style.transition = "none";
    tip.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    void tip.offsetHeight; // flush so the next move transitions smoothly
    tip.style.transition = "";
  } else {
    tip.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }
}

function tipHeader(text) {
  const el = document.createElement("div");
  el.className = "pf-tip-h";
  el.textContent = text;
  return el;
}

function tipRow(color, valueText, labelText) {
  const row = document.createElement("div");
  row.className = "pf-tip-row";
  const key = document.createElement("span");
  key.className = "pf-tip-key";
  key.style.background = color;
  const val = document.createElement("b");
  val.textContent = valueText;
  row.append(key, val);
  if (labelText) {
    const lab = document.createElement("span");
    lab.className = "pf-tip-l";
    lab.textContent = labelText;
    row.append(lab);
  }
  return row;
}

/**
 * Crosshair + all-series tooltip for line/area charts.
 * data rows: {[x], [y], [series]} — x must be numeric.
 */
export function lineHover(chart, {
  data, x = "year", y = "value", series = "indicator",
  colors = {},                       // series name -> hex
  xFormat = String, yFormat = String,
  seriesLabel = (s) => s
} = {}) {
  const wrap = html`<div class="pf-hover"></div>`;
  wrap.append(chart);
  const cross = html`<div class="pf-cross" aria-hidden="true"></div>`;
  const tip = makeTip();
  wrap.append(cross, tip);

  const xs = [...new Set(data.map((d) => +d[x]))].sort((a, b) => a - b);
  let shown = false;

  function onMove(ev) {
    const sx = chart.scale && chart.scale("x");
    const sy = chart.scale && chart.scale("y");
    if (!sx || !sx.apply) return;
    const { rect, f } = svgFactor(chart);
    if (rect.width === 0) return;
    const px = (ev.clientX - rect.left) * f;

    // Snap to the nearest data x (readers aim at a year, not a 2px line).
    let best = xs[0], bd = Infinity;
    for (const v of xs) {
      const d = Math.abs(sx.apply(v) - px);
      if (d < bd) { bd = d; best = v; }
    }

    const rows = data.filter((d) => +d[x] === best).sort((a, b) => b[y] - a[y]);
    if (!rows.length) return;
    tip.replaceChildren(
      tipHeader(xFormat(best)),
      ...rows.map((r) => tipRow(
        colors[r[series]] ?? "var(--pf-teal)",
        yFormat(r[y]),
        rows.length > 1 ? seriesLabel(r[series]) : ""
      ))
    );

    // Crosshair spans the plot area, snapped to the chosen x.
    // (Plot scale objects expose `range` as an array property, not a method.)
    const yr = (sy && Array.isArray(sy.range)) ? sy.range : [rect.height * f, 0];
    const top = Math.min(yr[0], yr[1]) / f;
    const bot = Math.max(yr[0], yr[1]) / f;
    const cx = sx.apply(best) / f;
    const wrect = wrap.getBoundingClientRect();
    const ox = rect.left - wrect.left;
    cross.style.transform = `translate3d(${ox + cx}px, ${top}px, 0)`;
    cross.style.height = `${bot - top}px`;

    placeTip(wrap, tip, ox + cx, ev.clientY - wrect.top, shown);
    if (!shown) { wrap.classList.add("pf-on"); shown = true; }
  }

  wrap.addEventListener("pointermove", onMove);
  wrap.addEventListener("pointerleave", () => { wrap.classList.remove("pf-on"); shown = false; });
  return wrap;
}

/**
 * Per-bar hover for horizontal bar charts.
 * IMPORTANT: pass the SAME array (same order) that the chart was built from —
 * bar i in the DOM maps to data[i]. Pre-sort the data; don't use Plot's sort.
 */
export function barHover(chart, {
  data, label = (d) => d.indicator, value = (d) => d.value,
  valueFormat = String, color = "var(--pf-teal)"
} = {}) {
  const wrap = html`<div class="pf-hover"></div>`;
  wrap.append(chart);
  const tip = makeTip();
  wrap.append(tip);

  const rects = [...chart.querySelectorAll('g[aria-label="bar"] rect')];
  let shown = false;

  rects.forEach((rc, i) => {
    rc.addEventListener("pointerenter", () => {
      const d = data[i];
      if (!d) return;
      rects.forEach((o, j) => { o.style.opacity = j === i ? "1" : "0.35"; });
      tip.replaceChildren(
        tipHeader(label(d)),
        tipRow(color, valueFormat(value(d)))
      );
      wrap.classList.add("pf-on");
    });
    rc.addEventListener("pointermove", (ev) => {
      const wrect = wrap.getBoundingClientRect();
      placeTip(wrap, tip, ev.clientX - wrect.left, ev.clientY - wrect.top, shown);
      shown = true;
    });
  });

  wrap.addEventListener("pointerleave", () => {
    rects.forEach((o) => { o.style.opacity = "1"; });
    wrap.classList.remove("pf-on");
    shown = false;
  });
  return wrap;
}
