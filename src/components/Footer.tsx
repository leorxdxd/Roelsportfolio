import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { pages, site } from "../data/site";
import { openCommandPalette } from "./CommandPalette";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="brand">
              <span className="brand__mark" aria-hidden="true">
                {site.initials}
              </span>
              <span className="brand__name">{site.name}</span>
            </Link>
            <p className="footer__tagline">{site.title}</p>
            <ul className="social-list" aria-label="Social links">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    className="icon-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-pages">
            <h2 className="footer__title" id="footer-pages">
              Pages
            </h2>
            <ul className="footer__links">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-projects">
            <h2 className="footer__title" id="footer-projects">
              Projects
            </h2>
            <ul className="footer__links">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__title">Get in touch</h2>
            <ul className="footer__links">
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>{site.location}</li>
              <li>
                <button type="button" className="footer__kbd" onClick={openCommandPalette}>
                  Press <kbd>Ctrl</kbd> <kbd>K</kbd> to jump anywhere
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. All demos use sample data.
          </p>
          <a href="#main" className="back-to-top">
            Back to top <Icon name="arrowUp" size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
