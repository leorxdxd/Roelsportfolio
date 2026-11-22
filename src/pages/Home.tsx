import { useEffect, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { services, skills } from "../data/content";
import { allTech, allVideos, assetUrl, projects } from "../data/projects";
import { site } from "../data/site";
import { setPageMeta } from "../lib/meta";
import { delay } from "../lib/style";
import CountUp from "../components/CountUp";
import CtaBand from "../components/CtaBand";
import Icon from "../components/Icon";
import LiveDashboard from "../components/LiveDashboard";
import Marquee from "../components/Marquee";
import ProcessSteps from "../components/ProcessSteps";
import ProjectCard from "../components/ProjectCard";
import SectionHeader from "../components/SectionHeader";
import Showreel, { playShowreel } from "../components/Showreel";
import TypeRotator from "../components/TypeRotator";
import VideoPlayer from "../components/VideoPlayer";
import { showreel, showreelSeconds } from "../data/showreel";

const ROTATING = ["custom systems", "helpdesk tools", "business websites", "dashboards", "IT solutions"];

const techCount = new Set([...allTech, ...skills.flatMap((s) => s.items)]).size;
const years = Math.max(1, new Date().getFullYear() - site.supportSince);

function Hero() {
  const [primary, secondary] = site.title.split("|").map((s) => s.trim());

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
            <img
              src={assetUrl("assets/profile.webp")}
              alt=""
              width={28}
              height={28}
              className="pill__avatar"
            />
            <span className="status-dot" aria-hidden="true" />
            {site.availability}
          </p>

          <h1 className="hero__title" id="hero-title" data-reveal style={delay(60)}>
            {site.name}
          </h1>

          <p className="hero__role" data-reveal style={delay(120)}>
            {primary}
            <span className="hero__sep" aria-hidden="true">
              /
            </span>
            <span className="visually-hidden"> and </span>
            {secondary}
          </p>

          <p className="hero__lead" data-reveal style={delay(180)}>
            <span aria-hidden="true">
              I build <TypeRotator words={ROTATING} />
              <br />
              that keep businesses running.
            </span>
            <span className="visually-hidden">{site.valueStatement}</span>
          </p>

          <div className="hero__actions" data-reveal style={delay(240)}>
            <Link to="/projects" className="btn btn--primary btn--lg">
              View Projects <Icon name="arrowRight" size={18} />
            </Link>
            <Link to="/contact" className="btn btn--secondary btn--lg">
              Contact Me
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

          <ul className="hero__meta" data-reveal style={delay(300)}>
            <li>
              <Icon name="mapPin" size={16} /> {site.location}
            </li>
            <li>
              <Icon name="monitor" size={16} /> Remote & on-site
            </li>
            <li>
              <Icon name="shield" size={16} /> Privacy-first builds
            </li>
          </ul>
        </div>

        <div className="hero__visual" data-reveal style={delay(200)}>
          <LiveDashboard />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: years, suffix: "+", label: "Years in IT support", icon: "headset" as const },
    { value: projects.length, suffix: "", label: "Featured systems built", icon: "dashboard" as const },
    { value: techCount, suffix: "+", label: "Tools & technologies", icon: "layers" as const },
    { value: services.length, suffix: "", label: "Service areas", icon: "lifeBuoy" as const },
  ];
  return (
    <section className="stats" aria-label="At a glance">
      <div className="container">
        <ul className="stats__grid">
          {stats.map((s, i) => (
            <li key={s.label} className="stat" data-reveal style={delay(i * 80)}>
              <span className="stat__icon" aria-hidden="true">
                <Icon name={s.icon} size={18} />
              </span>
              <span className="stat__value">
                <CountUp to={s.value} suffix={s.suffix} />
              </span>
              <span className="stat__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <Marquee items={[...allTech, ...skills[2].items, "Networking", "Help desk"]} label="Technologies I work with" />
    </section>
  );
}

function ShowreelSection() {
  return (
    <section className="section reel-section" aria-labelledby="home-reel-title">
      <div className="reel-section__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          eyebrow="Showreel"
          title={`${showreelSeconds} seconds. Everything I do.`}
          id="home-reel-title"
          lead="A quick, sound-on look at the problems I solve, the systems I build, and how we can work together. Tap a chapter to jump ahead."
          center
        />
        <div data-reveal>
          <Showreel />
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
          title="Everything your office tech needs, from one person"
          id="home-services-title"
          lead="From fixing today's IT problem to building the system your business needs next."
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

function FeaturedProjects() {
  return (
    <section className="section section--soft" aria-labelledby="home-projects-title">
      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="Systems I've designed and built"
          id="home-projects-title"
          lead="Real problems, practical software. Each project has a full case study and demo videos."
          action={
            <Link to="/projects" className="btn btn--secondary">
              All projects <Icon name="arrowRight" size={16} />
            </Link>
          }
        />
        <div className="projects-grid">
          {projects.slice(0, 3).map((p, i) => (
            <div key={p.slug} data-reveal style={delay(i * 100)}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoSpotlight() {
  const video = allVideos[0];
  if (!video) return null;
  return (
    <section className="section demo-band" aria-labelledby="home-demo-title">
      <div className="demo-band__bg" aria-hidden="true" />
      <div className="container demo-band__grid">
        <div data-reveal>
          <p className="eyebrow eyebrow--light">Demo theater</p>
          <h2 className="section-title" id="home-demo-title">
            Don't just read about it. See it work.
          </h2>
          <p className="section-lead">
            Every project comes with recorded walkthroughs using sample data, so you can see exactly
            how the systems behave before we even talk.
          </p>
          <ul className="checklist demo-band__list">
            <li>
              <Icon name="check" size={18} /> Real workflows, start to finish
            </li>
            <li>
              <Icon name="check" size={18} /> Dashboards, reports, and user roles
            </li>
            <li>
              <Icon name="check" size={18} /> {allVideos.length} demo videos across {projects.length} projects
            </li>
          </ul>
          <Link to="/demos" className="btn btn--light">
            <Icon name="film" size={18} /> Open demo theater
          </Link>
        </div>
        <div data-reveal style={delay(120)}>
          <VideoPlayer video={video} />
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section" aria-labelledby="home-process-title">
      <div className="container">
        <SectionHeader
          eyebrow="How I work"
          title="A simple process, no surprises"
          id="home-process-title"
          lead="Click through each step to see what happens and what you get."
          center
        />
        <div data-reveal>
          <ProcessSteps />
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
      <Stats />
      <ShowreelSection />
      <ServicesPreview />
      <FeaturedProjects />
      <DemoSpotlight />
      <Process />
      <CtaBand />
    </>
  );
}
