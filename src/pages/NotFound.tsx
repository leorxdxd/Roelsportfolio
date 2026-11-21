import { useEffect } from "react";
import { Link } from "react-router-dom";
import { setPageMeta } from "../lib/meta";

export default function NotFound() {
  useEffect(() => setPageMeta("Page not found"), []);

  return (
    <section className="section not-found" aria-labelledby="nf-title">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 id="nf-title" className="section-title">
          Page not found
        </h1>
        <p className="section-lead">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn btn--primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
