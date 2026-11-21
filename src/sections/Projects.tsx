import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import SectionHeader from "../components/SectionHeader";

export default function Projects() {
  return (
    <section id="projects" className="section" tabIndex={-1} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          id="projects-title"
          lead="Systems and web apps I've designed and built. Open a project to see features, screenshots, and a demo video."
        />
        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
