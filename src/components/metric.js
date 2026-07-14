// Animated count-up number. Returns a <span>; animates 0 -> value on render.
// Fallback-safe: the final value is set first, so if requestAnimationFrame never
// runs (e.g. reduced motion, or a background tab), the correct number still shows.
export function countUp(value, format = (x) => String(x), { duration = 1100 } = {}) {
  const el = document.createElement("span");
  el.className = "count-up";
  const finalText = format(value);
  el.textContent = finalText;

  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof value !== "number" || !isFinite(value)) return el;

  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = p < 1 ? format(value * eased) : finalText;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  return el;
}
