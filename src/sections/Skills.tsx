import { skills } from "../data/content";
import Icon from "../components/Icon";
import SectionHeader from "../components/SectionHeader";

export default function Skills() {
  return (
    <section
      id="skills"
      className="section section--soft"
      tabIndex={-1}
      aria-labelledby="skills-title"
    >
      <div className="container">
        <SectionHeader
          eyebrow="Skills"
          title="What I work with"
          id="skills-title"
          lead="A mix of hands-on support, networking, and software development."
          center
        />
        <div className="skills-grid">
          {skills.map((group) => (
            <div key={group.title} className="card skill-card">
              <div className="skill-card__head">
                <span className="icon-box" aria-hidden="true">
                  <Icon name={group.icon} />
                </span>
                <h3>{group.title}</h3>
              </div>
              <ul className="chip-list">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
