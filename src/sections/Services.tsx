import { services } from "../data/content";
import Icon from "../components/Icon";
import SectionHeader from "../components/SectionHeader";

export default function Services() {
  return (
    <section
      id="services"
      className="section section--soft"
      tabIndex={-1}
      aria-labelledby="services-title"
    >
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="How I can help"
          id="services-title"
          lead="From fixing today's IT problem to building the system your business needs next."
          center
        />
        <ul className="services-grid" role="list">
          {services.map((s) => (
            <li key={s.title} className="card service-card">
              <span className="icon-box icon-box--lg" aria-hidden="true">
                <Icon name={s.icon} size={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul className="checklist checklist--sm">
                {s.points.map((pt) => (
                  <li key={pt}>
                    <Icon name="check" size={16} />
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
