import { about } from "../data/content";
import Icon from "../components/Icon";
import SectionHeader from "../components/SectionHeader";

export default function About() {
  return (
    <section id="about" className="section" tabIndex={-1} aria-labelledby="about-title">
      <div className="container about__grid">
        <div>
          <SectionHeader eyebrow="About" title={about.heading} id="about-title" />
          <div className="prose">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="about__cards">
          <div className="card">
            <h3 className="card__label">Experience</h3>
            <ul className="info-list">
              {about.experience.map((item) => (
                <li key={item.role}>
                  <span className="icon-box" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <p className="info-list__title">{item.role}</p>
                    <p className="info-list__meta">
                      {item.org} · {item.period}
                    </p>
                    <p className="info-list__detail">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3 className="card__label">Education & Training</h3>
            <ul className="info-list">
              {about.education.map((item) => (
                <li key={item.title}>
                  <span className="icon-box" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <p className="info-list__title">{item.title}</p>
                    <p className="info-list__meta">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
