import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, mediaUrl, projects } from "../data/projects";
import { setPageMeta } from "../lib/meta";
import DemoVideo from "../components/DemoVideo";
import Icon from "../components/Icon";
import ScreenshotGallery from "../components/ScreenshotGallery";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) setPageMeta(project.title, project.summary);
  }, [project]);

  if (!project) return <NotFound />;

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const { live, repo } = project.links ?? {};

  return (
    <article className="project-page" aria-labelledby="project-title">
      <div className="container">
        <Link to={{ pathname: "/", hash: "#projects" }} className="back-link">
          <Icon name="arrowLeft" size={18} /> All projects
        </Link>

        <header className="project-hero">
          <span className="tag">{project.category}</span>
          <h1 id="project-title">{project.title}</h1>
          <p className="project-hero__lead">{project.summary}</p>

          <dl className="project-meta">
            <div>
              <dt>
                <Icon name="users" size={16} /> Built for
              </dt>
              <dd>{project.builtFor}</dd>
            </div>
            <div>
              <dt>
                <Icon name="briefcase" size={16} /> My role
              </dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>
                <Icon name="layers" size={16} /> Stack
              </dt>
              <dd>{project.tech.slice(0, 3).join(", ")}</dd>
            </div>
          </dl>

          {(live || repo) && (
            <div className="project-hero__actions">
              {live && (
                <a href={live} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                  Live demo <Icon name="externalLink" size={16} />
                </a>
              )}
              {repo && (
                <a href={repo} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">
                  Source code <Icon name="github" size={16} />
                </a>
              )}
            </div>
          )}
        </header>

        {project.video && (
          <section className="project-section" aria-labelledby="demo-title">
            <h2 id="demo-title" className="visually-hidden">
              Demo video
            </h2>
            <DemoVideo
              src={mediaUrl(project, project.video.file)}
              poster={mediaUrl(project, project.video.poster)}
              title={project.title}
            />
          </section>
        )}

        <div className="project-body">
          <div>
            <section aria-labelledby="overview-title">
              <h2 id="overview-title">Overview</h2>
              <div className="prose">
                {project.overview.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="features-title" className="project-body__block">
              <h2 id="features-title">Key features</h2>
              <ul className="checklist">
                {project.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="project-aside" aria-labelledby="tech-title">
            <div className="card">
              <h2 id="tech-title" className="card__label">
                Tech stack
              </h2>
              <ul className="chip-list">
                {project.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="project-aside__note">
                Shown with sample data only. No real client or user information.
              </p>
            </div>
          </aside>
        </div>

        {project.screenshots.length > 0 && (
          <section className="project-section" aria-labelledby="shots-title">
            <h2 id="shots-title">Screenshots</h2>
            <ScreenshotGallery project={project} />
          </section>
        )}

        {projects.length > 1 && (
          <nav className="project-pager" aria-label="More projects">
            <Link to={`/projects/${prev.slug}`} className="project-pager__link">
              <span className="project-pager__dir">
                <Icon name="arrowLeft" size={16} /> Previous
              </span>
              <span className="project-pager__title">{prev.title}</span>
            </Link>
            <Link to={`/projects/${next.slug}`} className="project-pager__link project-pager__link--next">
              <span className="project-pager__dir">
                Next <Icon name="arrowRight" size={16} />
              </span>
              <span className="project-pager__title">{next.title}</span>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
