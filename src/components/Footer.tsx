import { Link } from "react-router-dom";
import { site } from "../data/site";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <Link to="/" className="brand">
            <span className="brand__mark" aria-hidden="true">
              {site.initials}
            </span>
            <span className="brand__name">{site.name}</span>
          </Link>
          <p className="footer__text">
            © {new Date().getFullYear()} {site.name}. IT support, systems & websites.
          </p>
        </div>

        <div className="footer__right">
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
          <a href="#main" className="back-to-top">
            Back to top <Icon name="arrowUp" size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
