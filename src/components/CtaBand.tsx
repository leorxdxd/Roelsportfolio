import { Link } from "react-router-dom";
import { site } from "../data/site";
import Icon from "./Icon";

interface Props {
  title?: string;
  lead?: string;
}

export default function CtaBand({
  title = "Have a project in mind?",
  lead = "Tell me what your team needs. I'll reply with questions, a rough plan and a quote.",
}: Props) {
  return (
    <section className="section cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band" data-reveal>
          <div className="cta-band__glow" aria-hidden="true" />
          <div className="cta-band__text">
            <h2 id="cta-title">{title}</h2>
            <p>{lead}</p>
          </div>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--light">
              Start a project <Icon name="arrowRight" size={18} />
            </Link>
            <a href={`mailto:${site.email}`} className="btn btn--outline-light">
              <Icon name="mail" size={18} /> Email me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
