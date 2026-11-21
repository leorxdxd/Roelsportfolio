import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setPageMeta } from "../lib/meta";
import { openCommandPalette } from "../components/CommandPalette";
import Icon from "../components/Icon";

export default function NotFound() {
  useEffect(() => setPageMeta("Page not found"), []);

  return (
    <section className="section not-found" aria-labelledby="nf-title">
      <div className="page-header__bg" aria-hidden="true" />
      <div className="container not-found__inner">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1 id="nf-title" className="section-title">
          This page took a coffee break
        </h1>
        <p className="section-lead">The page you're looking for doesn't exist or has moved.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            <Icon name="home" size={18} /> Back to home
          </Link>
          <button type="button" className="btn btn--secondary" onClick={openCommandPalette}>
            <Icon name="search" size={18} /> Search the site
          </button>
        </div>
      </div>
    </section>
  );
}
