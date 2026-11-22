import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { services, stack } from "../data/content";
import { mediaUrl, projects, type Project } from "../data/projects";
import { showreel, showreelSeconds } from "../data/showreel";
import { site } from "../data/site";
import { clickOn, dropOnto, frame } from "../lib/cursors";
import { setPageMeta } from "../lib/meta";
import { useBuild, withCursor } from "../lib/useBuild";
import BuildCursors from "../components/BuildCursors";
import CodeRun from "../components/CodeRun";
import HeroStage from "../components/HeroStage";
import Icon from "../components/Icon";
import MediaImage from "../components/MediaImage";
import Showreel, { playShowreel } from "../components/Showreel";
import TypeText from "../components/TypeText";
import WorkGallery from "../components/WorkGallery";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function Hero() {
  const [start, setStart] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStart(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__guides" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">
            <span className="hero__kicker-mark" aria-hidden="true" />
            {site.name} <span aria-hidden="true">/</span> {site.role}
          </p>
          <TypeText
            as="h1"
            id="hero-title"
            className="hero__title"
            text="I build web apps and *business systems.*"
            start={start}
            cursor="design"
            speed={34}
            eager
          />
          <p className="hero__lead">
            I design, code and deploy custom software for clinics, property owners, schools and small businesses:
            records systems, portals, automations and websites. My IT support background means I also know the hardware
            and networks it runs on.
          </p>
          <div className="hero__actions">
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
          <ul className="hero__meta">
            <li>{site.location}</li>
            <li>Remote or on-site</li>
            <li className="hero__available">
              <span className="status-dot" aria-hidden="true" /> {site.availability}
            </li>
          </ul>
        </div>
        <HeroStage start={start} />
      </div>
    </section>
  );
}

function Stack() {
  const [ref, state] = useBuild<HTMLDivElement>(withCursor(["back", "test"], (id, el) => clickOn(id, el, 0.06, 0.5)));
  return (
    <section className="stack" aria-labelledby="stack-title">
      <div className="container">
        <div ref={ref} className="stack__inner" data-build={state}>
          <h2 className="stack__title" id="stack-title">
            Tools I build with
          </h2>
          <dl className="stack__groups">
            {stack.map((g, gi) => (
              <div key={g.label} className="stack__group">
                <dt>{g.label}</dt>
                <dd>
                  <ul className="stack__list">
                    {g.items.map((t, ti) => (
                      <li key={t} style={i(gi * 3 + ti)}>
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

function SectionHead({ num, label, title, id, lead, action }: { num: string; label: string; title: string; id: string; lead?: string; action?: ReactNode }) {
  const [ref, state] = useBuild<HTMLDivElement>(() => undefined);
  return (
    <div ref={ref} className="home-head">
      <div>
        <p className="eyebrow">
          {num} / {label}
        </p>
        <TypeText as="h2" id={id} className="section-title" text={title} start={state !== "idle"} cursor="design" speed={30} />
        {lead && <p className="section-lead">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

function WorkRow({ p, index }: { p: Project; index: number }) {
  const [ref, state] = useBuild<HTMLDivElement>(withCursor(["front", "test"], (id, el) => dropOnto(id, el, p.thumbnail)));
  return (
    <article className={`work-row${index % 2 ? " work-row--flip" : ""}`} aria-labelledby={`work-${p.slug}`}>
      <Link to={`/projects/${p.slug}`} className="work-row__media" tabIndex={-1} aria-hidden="true">
        <div ref={ref} className="work-row__frame" data-build={state}>
          <span className="wire">
            <span className="wire__label">
              {p.thumbnail} · 1200 × 750
            </span>
          </span>
          <MediaImage src={mediaUrl(p, p.thumbnail)} alt="" width={1200} height={750} />
        </div>
      </Link>
      <div className="work-row__body" data-build={state}>
        <p className="work-row__meta">
          <span>0{index + 1}</span> {p.category}
        </p>
        <TypeText as="h3" id={`work-${p.slug}`} className="work-row__title" text={p.title} start={state !== "idle"} cursor="design" speed={24} />
        <p className="work-row__summary">{p.summary}</p>
        <dl className="work-row__facts">
          <div>
            <dt>Built for</dt>
            <dd>{p.builtFor}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{p.tech.join(", ")}</dd>
          </div>
        </dl>
        <Link to={`/projects/${p.slug}`} className="btn btn--secondary work-row__cta">
          Read the case study <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </article>
  );
}

function WorkCard({ p, index }: { p: Project; index: number }) {
  const [ref, state] = useBuild<HTMLDivElement>(withCursor(["front", "test"], (id, el) => dropOnto(id, el, p.thumbnail)));
  return (
    <article className="work-card" aria-labelledby={`work-${p.slug}`}>
      <Link to={`/projects/${p.slug}`} className="work-row__media" tabIndex={-1} aria-hidden="true">
        <div ref={ref} className="work-row__frame" data-build={state}>
          <span className="wire">
            <span className="wire__label">{p.thumbnail} · 1200 × 750</span>
          </span>
          <MediaImage src={mediaUrl(p, p.thumbnail)} alt="" width={1200} height={750} />
        </div>
      </Link>
      <div className="work-row__body" data-build={state}>
        <p className="work-row__meta">
          <span>0{index + 1}</span> {p.category}
        </p>
        <TypeText as="h3" id={`work-${p.slug}`} className="work-card__title" text={p.title} start={state !== "idle"} cursor="design" speed={24} />
        <p className="work-row__summary">{p.summary}</p>
        <Link to={`/projects/${p.slug}`} className="work-row__cta work-card__link">
          View project<span className="visually-hidden">: {p.title}</span> <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </article>
  );
}

/** The first four projects get a full row; the rest are shown as smaller cards. */
const FEATURED = 4;

function SelectedWork() {
  return (
    <section className="section home-work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          num="01"
          label="Selected work"
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
          {projects.slice(0, FEATURED).map((p, n) => (
            <WorkRow key={p.slug} p={p} index={n} />
          ))}
        </div>
        {projects.length > FEATURED && (
          <div className="work-more">
            <p className="work-more__label">More projects</p>
            {projects.slice(FEATURED).map((p, n) => (
              <WorkCard key={p.slug} p={p} index={FEATURED + n} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Gallery() {
  const [ref, state] = useBuild<HTMLDivElement>(
    withCursor(["front", "test"], (id, el) => {
      const first = el.querySelector(".shot");
      return first ? dropOnto(id, first, "screens/*.webp") : Promise.resolve();
    }),
  );
  return (
    <section className="section section--soft" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHead
          num="03"
          label="Gallery"
          title="Screens from recent projects"
          id="gallery-title"
          lead="Dashboards, forms, reports, code and database design. Select any screen to view it full size."
        />
        <div ref={ref} className="gallery-build" data-build={state}>
          <WorkGallery />
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const [ref, state] = useBuild<HTMLUListElement>(withCursor(["design", "test"], (id, el) => frame(id, el)), { maxWait: 3200 });
  return (
    <section className="section" aria-labelledby="home-services-title">
      <div className="container">
        <SectionHead
          num="04"
          label="Services"
          title="What I do"
          id="home-services-title"
          lead="Custom software is my main work. I also support the computers and networks it runs on."
          action={
            <Link to="/services" className="btn btn--secondary">
              All services <Icon name="arrowRight" size={16} />
            </Link>
          }
        />
        <ul ref={ref} className="svc-list" role="list" data-build={state}>
          {services.map((s, n) => (
            <li key={s.slug} style={i(n)}>
              <Link to={`/services#${s.slug}`} className="svc-item">
                <span className="svc-item__num" aria-hidden="true">
                  0{n + 1}
                </span>
                <span className="svc-item__title">{s.title}</span>
                <span className="svc-item__text">{s.description}</span>
                <span className="svc-item__more" aria-hidden="true">
                  <Icon name="arrowRight" size={18} />
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
  const [ref, state] = useBuild<HTMLDivElement>(withCursor(["test", "design"], (id, el) => frame(id, el)), { maxWait: 3200 });
  return (
    <section className="section reel-section" aria-labelledby="home-reel-title">
      <div className="container">
        <SectionHead
          num="05"
          label="Showreel"
          title={`My work in ${showreelSeconds} seconds`}
          id="home-reel-title"
          lead="A short overview of the problems I solve and the systems I build. Use the chapters to jump to a part."
        />
        <div ref={ref} className="reel-build" data-build={state}>
          <Showreel />
        </div>
      </div>
    </section>
  );
}

function HomeCta() {
  const [ref, state] = useBuild<HTMLDivElement>(() => undefined);
  return (
    <section className="section cta-section" aria-labelledby="cta-title">
      <div className="container">
        <div ref={ref} className="cta-band">
          <div className="cta-band__text">
            <TypeText as="h2" id="cta-title" text="Have a project in mind?" start={state !== "idle"} cursor="design" speed={38} />
            <p>Tell me what your team needs. I'll reply with questions, a rough plan and a quote.</p>
          </div>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--light btn--lg">
              Start a project <Icon name="arrowRight" size={18} />
            </Link>
            <a href={`mailto:${site.email}`} className="btn btn--outline-light btn--lg">
              <Icon name="mail" size={18} /> Email me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => setPageMeta(), []);
  return (
    <>
      <BuildCursors />
      <Hero />
      <Stack />
      <SelectedWork />
      <CodeRun />
      <Gallery />
      <ServicesPreview />
      <ShowreelSection />
      <HomeCta />
    </>
  );
}
