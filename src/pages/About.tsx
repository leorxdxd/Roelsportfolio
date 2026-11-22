import { useEffect } from "react";
import { about, skills, values } from "../data/content";
import { assetUrl } from "../data/projects";
import { site } from "../data/site";
import { setPageMeta } from "../lib/meta";
import { delay } from "../lib/style";
import CtaBand from "../components/CtaBand";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import SectionHeader from "../components/SectionHeader";
import Tabs from "../components/Tabs";
import TiltCard from "../components/TiltCard";

export default function About() {
  useEffect(() => setPageMeta("About", about.lead), []);

  return (
    <>
      <PageHeader crumb="About" eyebrow="About me" title={about.heading} lead={about.lead} />

      <section className="section section--tight" aria-label="Introduction">
        <div className="container about-intro">
          <div className="about-intro__photo" data-reveal>
            <TiltCard className="photo-card" max={5}>
              <img
                src={assetUrl("assets/profile.webp")}
                alt={`Portrait of ${site.name}`}
                width={640}
                height={800}
              />
              <div className="photo-card__badge">
                <span className="status-dot" aria-hidden="true" />
                {site.availability}
              </div>
            </TiltCard>
          </div>

          <div data-reveal style={delay(100)}>
            <div className="prose prose--lg">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <dl className="facts">
              {about.facts.map((f) => (
                <div key={f.label} className="fact">
                  <dt>
                    <Icon name={f.icon} size={16} /> {f.label}
                  </dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="values-title">
        <div className="container">
          <SectionHeader eyebrow="Values" title="How I work with clients" id="values-title" center />
          <ul className="values-grid" role="list">
            {values.map((v, i) => (
              <li key={v.title} className="card value-card" data-reveal style={delay(i * 80)}>
                <span className="icon-box" aria-hidden="true">
                  <Icon name={v.icon} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="experience-title">
        <div className="container two-col">
          <div>
            <SectionHeader eyebrow="Experience" title="Where I've worked" id="experience-title" />
            <ol className="timeline">
              {about.experience.map((e, i) => (
                <li key={e.role} className="timeline__item" data-reveal style={delay(i * 100)}>
                  <span className="timeline__dot" aria-hidden="true">
                    <Icon name={e.icon} size={16} />
                  </span>
                  <p className="timeline__period">{e.period}</p>
                  <h3 className="timeline__role">{e.role}</h3>
                  <p className="timeline__org">{e.org}</p>
                  <p className="timeline__detail">{e.detail}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeader eyebrow="Education" title="Training & credentials" />
            <ul className="edu-list">
              {about.education.map((e, i) => (
                <li key={e.title} className="card edu-card" data-reveal style={delay(i * 100)}>
                  <span className="icon-box" aria-hidden="true">
                    <Icon name={e.icon} />
                  </span>
                  <div>
                    <h3>{e.title}</h3>
                    <p>{e.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--soft" aria-labelledby="skills-title">
        <div className="container">
          <SectionHeader
            eyebrow="Skills"
            title="What I work with"
            id="skills-title"
            lead="Languages, frameworks and tools I use, by area."
            center
          />
          <div data-reveal>
            <Tabs
              label="Skill categories"
              className="skills-tabs"
              items={skills.map((g) => ({
                id: g.id,
                label: (
                  <>
                    <Icon name={g.icon} size={18} /> {g.title}
                  </>
                ),
                content: (
                  <div className="skills-panel">
                    <p className="skills-panel__blurb">{g.blurb}</p>
                    <ul className="chip-list chip-list--lg">
                      {g.items.map((item, i) => (
                        <li key={item} className="chip chip--pop" style={delay(i * 35)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
