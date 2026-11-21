import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scrolls to `#hash` targets (smoothly) after navigation, and to the top on
 * page changes. Moves keyboard focus to the target so screen-reader and
 * keyboard users land in the right place.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

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
      if (el.tabIndex >= -1 && el.hasAttribute("tabindex")) el.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
