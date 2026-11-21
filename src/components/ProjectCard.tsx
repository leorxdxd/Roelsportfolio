import { Link } from "react-router-dom";
import { mediaUrl, type Project } from "../data/projects";
import Icon from "./Icon";
import MediaImage from "./MediaImage";

export default function ProjectCard({ project }: { project: Project }) {
  const titleId = `project-${project.slug}-title`;
  return (
    <article className="project-card" aria-labelledby={titleId}>
      <div className="project-card__thumb">
        <MediaImage
          src={mediaUrl(project, project.thumbnail)}
          alt={`${project.title} preview`}
          width={1200}
          height={750}
        />
      </div>
      <div className="project-card__body">
        <span className="tag">{project.category}</span>
        <h3 className="project-card__title" id={titleId}>
          {project.title}
        </h3>
        <p className="project-card__summary">{project.summary}</p>
        <ul className="chip-list" aria-label="Technologies used">
          {project.tech.slice(0, 4).map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
          {project.tech.length > 4 && <li className="chip">+{project.tech.length - 4}</li>}
        </ul>
        <Link to={`/projects/${project.slug}`} className="project-card__link">
          View details<span className="visually-hidden"> about {project.title}</span>
          <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </article>
  );
}
