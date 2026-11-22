import { useEffect, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { services, stack } from "../data/content";
import { assetUrl, mediaUrl, projects } from "../data/projects";
import { showreel, showreelSeconds } from "../data/showreel";
import { site } from "../data/site";
import { setPageMeta } from "../lib/meta";
import { delay } from "../lib/style";
import CtaBand from "../components/CtaBand";
import HeroShowcase from "../components/HeroShowcase";
import Icon from "../components/Icon";
import MediaImage from "../components/MediaImage";
import SectionHeader from "../components/SectionHeader";
import Showreel, { playShowreel } from "../components/Showreel";
import WorkGallery from "../components/WorkGallery";

function Hero() {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
  };

  return (
    <section className="hero" onPointerMove={onMove} aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="pill" data-reveal>
            <img src={assetUrl("assets/profile.webp")} alt="" width={28} height={28} className="pill__avatar" />
            <span className="status-dot" aria-hidden="true" />
            {site.availability}
          </p>

          <p className="hero__name" data-reveal style={delay(40)}>
            {site.name} <span aria-hidden="true">·</span> {site.role}
          </p>

          <h1 className="hero__title" id="hero-title" data-reveal style={delay(80)}>
            I build web applications and business systems.
          </h1>

          <p className="hero__lead" data-reveal style={delay(140)}>
            I design, code and deploy custom software for schools and small businesses: helpdesks, dashboards, email
            tools and websites. My IT support background means I also know the hardware and networks it runs on.
          </p>

          <div className="hero__actions" data-reveal style={delay(200)}>
            <Link to="/projects" className="btn btn--primary btn--lg">
              View projects <Icon name="arrowRight" size={18} />
            </Link>
            <Link to="/contact" className="btn btn--secondary btn--lg">
              Contact me
            </Link>
            <button type="button" className="reel-link" onClick={() => playShowreel()}>
              <span className="reel-link__icon" aria-hidden="true">
                <Icon name="play" size={14} />
              </span>
              Watch my reel
              <span className="reel-link__time" aria-hidden="true">
                {showreel.duration}
              </span>
              <span className="visually-hidden"> ({showreelSeconds}-second video)</span>
            </button>
          </div>

          <ul className="hero__meta" data-reveal style={delay(260)}>
            <li>
              <Icon name="mapPin" size={16} /> {site.location}
            </li>
            <li>
              <Icon name="monitor" size={16} /> Remote or on-site
            </li>
            <li>
              <Icon name="code" size={16} /> PHP · JavaScript · Python
            </li>
          </ul>
        </div>

        <div className="hero__visual" data-reveal style={delay(160)}>
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="stack" aria-labelledby="stack-title">
      <div className="container">
        <div className="stack__inner" data-reveal>
          <h2 className="stack__title" id="stack-title">
            Tools I build with
          </h2>
          <dl className="stack__groups">
            {stack.map((g) => (
              <div key={g.label} className="stack__group">
                <dt>{g.label}</dt>
                <dd>
                  <ul className="chip-list">
                    {g.items.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="Systems I've designed and built"
          id="work-title"
          lead="Each project has a case study with features, screenshots and the tech used. All screens show sample data."
          action={
            <Link to="/projects" className="btn btn--secondary">
              All projects <Icon name="arrowRight" size={16} />
            </Link>
          }
        />
        <div className="work-list">
          {projects.map((p, i) => (
            <article key={p.slug} className={`work-row${i % 2 ? " work-row--flip" : ""}`} aria-labelledby={`work-${p.slug}`} data-reveal>
              <Link to={`/projects/${p.slug}`} className="work-row__media" tabIndex={-1} aria-hidden="true">
                <MediaImage src={mediaUrl(p, p.thumbnail)} alt="" width={1200} height={750} />
              </Link>
              <div className="work-row__body">
                <p className="work-row__meta">
                  <span className="work-row__num">0{i + 1}</span> {p.category} · {p.builtFor}
                </p>
                <h3 className="work-row__title" id={`work-${p.slug}`}>
                  {p.title}
                </h3>
                <p className="work-row__summary">{p.summary}</p>
                <ul className="checklist work-row__features">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f}>
                      <Icon name="check" size={18} /> {f}
                    </li>
                  ))}
                </ul>
                <ul className="chip-list" aria-label="Tech stack">
                  {p.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <Link to={`/projects/${p.slug}`} className="btn btn--primary work-row__cta">
                  Read the case study <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section section--soft" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeader
          eyebrow="Gallery"
          title="Screens from recent projects"
          id="gallery-title"
          lead="Dashboards, forms, reports, code and database design. Select any screen to view it full size."
        />
        <div data-reveal>
          <WorkGallery />
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="section" aria-labelledby="home-services-title">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="What I do"
          id="home-services-title"
          lead="Custom software is my main work. I also support the computers and networks it runs on."
          action={
            <Link to="/services" className="btn btn--secondary">
              All services <Icon name="arrowRight" size={16} />
            </Link>
          }
        />
        <ul className="svc-grid" role="list">
          {services.map((s, i) => (
            <li key={s.slug} data-reveal style={delay(i * 80)}>
              <Link to={`/services#${s.slug}`} className="svc-card">
                <span className="svc-card__num" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="icon-box icon-box--lg" aria-hidden="true">
                  <Icon name={s.icon} size={24} />
                </span>
                <span className="svc-card__title">{s.title}</span>
                <span className="svc-card__text">{s.description}</span>
                <span className="svc-card__more">
                  Learn more <Icon name="arrowRight" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ShowreelSection() {
  return (
    <section className="section section--soft reel-section" aria-labelledby="home-reel-title">
      <div className="reel-section__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          eyebrow="Showreel"
          title={`My work in ${showreelSeconds} seconds`}
          id="home-reel-title"
          lead="A short overview of the problems I solve and the systems I build. Use the chapters to jump to a part."
          center
        />
        <div data-reveal>
          <Showreel />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => setPageMeta(), []);
  return (
    <>
      <Hero />
      <Stack />
      <SelectedWork />
      <Gallery />
      <ServicesPreview />
      <ShowreelSection />
      <CtaBand />
    </>
  );
}
