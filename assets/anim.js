// Punjab Facts — scroll-reveal (progressive enhancement).
// Content is visible without JS; with JS it starts hidden and reveals on scroll.
// A safety timeout guarantees nothing stays hidden even if the observer never fires.
(function () {
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealAll() {
    var els = document.querySelectorAll(".reveal");
    for (var i = 0; i < els.length; i++) els[i].classList.add("in");
  }

  function run() {
    if (reduce || !("IntersectionObserver" in window)) { revealAll(); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    function observe() {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (el) { io.observe(el); });
    }
    observe();
    // Reveal wrappers whose inner cell content renders asynchronously.
    new MutationObserver(observe).observe(document.body, { childList: true, subtree: true });
    // Safety net: never leave content hidden.
    setTimeout(revealAll, 2600);
  }

  if (document.readyState !== "loading") run();
  else document.addEventListener("DOMContentLoaded", run);
})();
