// Shared formatting helpers.

// Indian digit grouping (lakh/crore), no decimals. 980635 -> "9,80,635".
export function inr(n) {
  if (n == null || isNaN(n)) return "—";
  const s = Math.round(n).toString();
  if (s.length <= 3) return s;
  return s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + s.slice(-3);
}

// "₹9,80,635 cr"
export function inrCrore(n) {
  return `₹${inr(n)} cr`;
}
