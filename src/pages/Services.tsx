import { useEffect } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/content";
import { setPageMeta } from "../lib/meta";
import { delay } from "../lib/style";
import CtaBand from "../components/CtaBand";
import Faq from "../components/Faq";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import ProcessSteps from "../components/ProcessSteps";
import SectionHeader from "../components/SectionHeader";

export default function Services() {
  useEffect(
    () =>
      setPageMeta(
        "Services",
        "Custom business systems, websites, integrations and IT support. Based in Metro Manila, working remotely or on-site.",
      ),
    [],
  );

  return (
    <>
      <PageHeader
        crumb="Services"
        eyebrow="Services"
        title="Software development and IT support"
        lead="Custom systems, websites and integrations, plus the IT support to keep them running."
      >
        <nav className="jump-links" aria-label="Jump to a service" data-reveal>
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="jump-link">
              <Icon name={s.icon} size={16} /> {s.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="section section--tight" aria-label="Service details">
        <div className="container service-list">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="service-row"
              tabIndex={-1}
              aria-labelledby={`${s.slug}-title`}
              data-reveal
            >
              <div className="service-row__head">
                <span className="service-row__num" aria-hidden="true" data-num={`0${i + 1}`} />
                <span className="icon-box icon-box--xl" aria-hidden="true">
                  <Icon name={s.icon} size={28} />
                </span>
                <h2 id={`${s.slug}-title`}>{s.title}</h2>
                <p className="service-row__desc">{s.description}</p>
                <p className="service-row__ideal">
                  <strong>Ideal for:</strong> {s.idealFor}
                </p>
                <Link to={`/contact?service=${encodeURIComponent(s.title)}`} className="btn btn--primary btn--sm">
                  Ask about this <Icon name="arrowRight" size={16} />
                </Link>
              </div>
              <div className="service-row__body">
                <h3 className="card__label">What's included</h3>
                <ul className="checklist">
                  {s.includes.map((item, j) => (
                    <li key={item} data-reveal style={delay(80 + j * 60)}>
                      <Icon name="check" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="process-title">
        <div className="container">
          <SectionHeader
            eyebrow="Process"
            title="From first message to launch"
            id="process-title"
            lead="Four steps from the first call to launch. Select a step for details."
            center
          />
          <div data-reveal>
            <ProcessSteps />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions"
            id="faq-title"
            lead="Don't see your question? Send me a message."
          />
          <Faq />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
