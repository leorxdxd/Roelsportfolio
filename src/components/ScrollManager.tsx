import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scrolls to the top on page changes and to `#hash` targets (smoothly).
 * Moves keyboard focus to the target so keyboard and screen-reader users
 * land in the right place. Query-string changes (filters) don't scroll.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      if (el.hasAttribute("tabindex")) el.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
