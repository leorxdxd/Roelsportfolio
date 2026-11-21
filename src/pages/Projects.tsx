import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories, projects } from "../data/projects";
import { setPageMeta } from "../lib/meta";
import { delay } from "../lib/style";
import CtaBand from "../components/CtaBand";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  useEffect(
    () => setPageMeta("Projects", "Custom systems and web applications designed and built by Roel Delos Reyes."),
    [],
  );

  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "all";
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = projects.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (!q || `${p.title} ${p.summary} ${p.tech.join(" ")} ${p.category}`.toLowerCase().includes(q)),
  );

  const setCategory = (c: string) =>
    setParams(c === "all" ? {} : { category: c }, { replace: true, preventScrollReset: true });

  return (
    <>
      <PageHeader
        crumb="Projects"
        eyebrow="Portfolio"
        title="Systems & web apps I've built"
        lead="Case studies with features, screenshots, and demo videos. Everything shown uses sample data."
      />

      <section className="section section--tight" aria-labelledby="project-list-title">
        <div className="container">
          <h2 id="project-list-title" className="visually-hidden">
            Project list
          </h2>
          <div className="toolbar" data-reveal>
            <div className="filter-bar" role="group" aria-label="Filter by category">
              {["all", ...categories].map((c) => (
                <button
                  key={c}
                  type="button"
                  className="filter-chip"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c === "all" ? "All" : c}
                  <span className="filter-chip__count">
                    {c === "all" ? projects.length : projects.filter((p) => p.category === c).length}
                  </span>
                </button>
              ))}
            </div>
            <label className="search-field">
              <Icon name="search" size={16} />
              <span className="visually-hidden">Search projects</span>
              <input
                type="search"
                placeholder="Search by name or tech…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>

          <p className="results-count" role="status">
            Showing {shown.length} of {projects.length} project{projects.length === 1 ? "" : "s"}
          </p>

          {shown.length ? (
            <div className="projects-grid" key={`${category}-${q}`}>
              {shown.map((p, i) => (
                <div key={p.slug} className="pop-in" style={delay(i * 70)}>
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="search" size={28} />
              <p>No projects match “{query}”.</p>
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaBand title="Need a system like these?" />
    </>
  );
}
