import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects, resolveVideos } from "../data/projects";
import { setPageMeta } from "../lib/meta";
import { delay } from "../lib/style";
import CtaBand from "../components/CtaBand";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import ScreenshotGallery from "../components/ScreenshotGallery";
import VideoTheater from "../components/VideoTheater";
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
  const videos = resolveVideos(project);
  const { live, repo } = project.links ?? {};

  return (
    <>
      <PageHeader
        crumb={project.title}
        parent={{ label: "Projects", to: "/projects" }}
        eyebrow={project.category}
        title={project.title}
        lead={project.summary}
      >
        <dl className="project-meta" data-reveal style={delay(180)}>
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
        <div className="project-hero__actions" data-reveal style={delay(240)}>
          {videos.length > 0 && (
            <a href="#demo" className="btn btn--primary">
              <Icon name="play" size={16} /> Watch demo
            </a>
          )}
          {live && (
            <a href={live} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              Live demo <Icon name="externalLink" size={16} />
            </a>
          )}
          {repo && (
            <a href={repo} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              Source code <Icon name="github" size={16} />
            </a>
          )}
        </div>
      </PageHeader>

      <div className="container project-page">
        {project.highlights && project.highlights.length > 0 && (
          <ul className="highlights" aria-label="System highlights">
            {project.highlights.map((h, j) => (
              <li key={h.label} className="highlight" data-reveal style={delay(j * 70)}>
                <span className="highlight__value">{h.value}</span>
                <span className="highlight__label">{h.label}</span>
              </li>
            ))}
          </ul>
        )}

        {videos.length > 0 && (
          <section id="demo" className="project-section" tabIndex={-1} aria-labelledby="demo-title" data-reveal>
            <h2 id="demo-title" className="project-section__title">
              <Icon name="film" size={22} /> Demo video{videos.length > 1 ? "s" : ""}
            </h2>
            <VideoTheater videos={videos} headingLevel={3} showProjectLink={false} />
          </section>
        )}

        <div className="project-body">
          <div>
            <section aria-labelledby="overview-title" data-reveal>
              <h2 id="overview-title">Overview</h2>
              <div className="prose">
                {project.overview.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="features-title" className="project-body__block" data-reveal>
              <h2 id="features-title">Key features</h2>
              <ul className="feature-grid">
                {project.features.map((f, j) => (
                  <li key={f} className="feature" data-reveal style={delay(j * 50)}>
                    <span className="feature__icon" aria-hidden="true">
                      <Icon name="check" size={16} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="project-aside" aria-labelledby="tech-title" data-reveal>
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
                <Icon name="shield" size={14} /> Shown with sample data only. No real client or user
                information.
              </p>
            </div>
          </aside>
        </div>

        {project.screenshots.length > 0 && (
          <section className="project-section" aria-labelledby="shots-title" data-reveal>
            <h2 id="shots-title" className="project-section__title">
              Screenshots
            </h2>
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

      <CtaBand title="Want a system like this for your team?" />
    </>
  );
}
