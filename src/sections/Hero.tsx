import { Link } from "react-router-dom";
import { assetUrl } from "../data/projects";
import { site } from "../data/site";
import Icon from "../components/Icon";

export default function Hero() {
  const [primary, secondary] = site.title.split("|").map((s) => s.trim());

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="pill">
            <span className="status-dot" aria-hidden="true" />
            {site.availability}
          </p>
          <h1 className="hero__title" id="hero-title">
            {site.name}
          </h1>
          <p className="hero__role">
            {primary}
            <span className="hero__sep" aria-hidden="true">
              |
            </span>
            <span className="visually-hidden"> and </span>
            {secondary}
          </p>
          <p className="hero__lead">{site.valueStatement}</p>

          <div className="hero__actions">
            <Link to={{ pathname: "/", hash: "#projects" }} className="btn btn--primary">
              View Projects <Icon name="arrowRight" size={18} />
            </Link>
            <Link to={{ pathname: "/", hash: "#contact" }} className="btn btn--secondary">
              Contact Me
            </Link>
          </div>

          <ul className="hero__meta">
            <li>
              <Icon name="mapPin" size={18} /> {site.location}
            </li>
            <li>
              <Icon name="monitor" size={18} /> Remote & on-site support
            </li>
          </ul>
        </div>

        <div className="hero__media">
          <img
            src={assetUrl("assets/profile.webp")}
            alt={`Portrait of ${site.name}`}
            width={640}
            height={800}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
