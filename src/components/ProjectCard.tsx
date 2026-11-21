import { Link } from "react-router-dom";
import { mediaUrl, type Project } from "../data/projects";
import Icon from "./Icon";
import MediaImage from "./MediaImage";
import TiltCard from "./TiltCard";

export default function ProjectCard({ project }: { project: Project }) {
  const titleId = `project-${project.slug}-title`;
  const videoCount = project.videos?.length ?? 0;

  return (
    <TiltCard className="project-card" max={4}>
      <article aria-labelledby={titleId} className="project-card__inner">
        <div className="project-card__thumb">
          <MediaImage
            src={mediaUrl(project, project.thumbnail)}
            alt={`${project.title} preview`}
            width={1200}
            height={750}
          />
          <span className="project-card__hover" aria-hidden="true">
            View case study <Icon name="arrowRight" size={16} />
          </span>
          {videoCount > 0 && (
            <span className="project-card__badge">
              <Icon name="play" size={12} /> {videoCount} demo{videoCount > 1 ? "s" : ""}
            </span>
          )}
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
            View project<span className="visually-hidden">: {project.title}</span>
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </article>
    </TiltCard>
  );
}
