import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { pages, site } from "../data/site";
import { openCommandPalette } from "./CommandPalette";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";

const NAV = pages.filter((p) => p.to !== "/contact");

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = NAV.map((p) => (
    <NavLink
      key={p.to}
      to={p.to}
      end={p.to === "/"}
      className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
    >
      {p.label}
    </NavLink>
  ));

  return (
    <header className={`navbar${scrolled || open ? " is-scrolled" : ""}`}>
      <nav className="container navbar__inner" aria-label="Main">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            {site.initials}
          </span>
          <span className="brand__name">{site.name}</span>
        </Link>

        <div className="nav-links">{links}</div>

        <div className="nav-actions">
          <button
            type="button"
            className="search-trigger"
            onClick={openCommandPalette}
            title="Quick navigation (Ctrl + K)"
          >
            <Icon name="search" size={16} />
            <span className="search-trigger__label">Search</span>
            <kbd aria-hidden="true">Ctrl K</kbd>
          </button>
          <ThemeToggle />
          <Link to="/contact" className="btn btn--primary btn--sm nav-cta">
            Let's talk
          </Link>
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {links}
          <Link to="/contact" className="btn btn--primary">
            Contact Me <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      )}
    </header>
  );
}
