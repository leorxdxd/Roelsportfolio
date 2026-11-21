import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "../data/site";
import Icon from "./Icon";

const NAV_ITEMS = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const isHome = pathname === "/";

  // Shadow under the bar once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (home page only)
  useEffect(() => {
    if (!isHome) {
      setActive(pathname.startsWith("/projects") ? "projects" : "");
      return;
    }
    const ids = [...NAV_ITEMS.map((i) => i.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, pathname]);

  // Close the mobile menu on navigation and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = NAV_ITEMS.map((item) => (
    <Link
      key={item.id}
      to={{ pathname: "/", hash: `#${item.id}` }}
      className={`nav-link${active === item.id ? " is-active" : ""}`}
      aria-current={active === item.id ? "true" : undefined}
      onClick={() => setOpen(false)}
    >
      {item.label}
    </Link>
  ));

  const contactBtn = (
    <Link
      to={{ pathname: "/", hash: "#contact" }}
      className="btn btn--primary btn--sm"
      onClick={() => setOpen(false)}
    >
      Contact Me
    </Link>
  );

  return (
    <header className={`navbar${scrolled || open ? " is-scrolled" : ""}`}>
      <nav className="container navbar__inner" aria-label="Main">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            {site.initials}
          </span>
          <span className="brand__name">{site.name}</span>
        </Link>

        <div className="nav-links">
          {links}
          <span className="nav-cta">{contactBtn}</span>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {links}
          {contactBtn}
        </div>
      )}
    </header>
  );
}
