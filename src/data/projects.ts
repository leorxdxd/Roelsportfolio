import raw from "./projects.json";

export interface Screenshot {
  file: string;
  caption: string;
}

export interface Project {
  /** URL-safe id; also the media folder name: public/assets/projects/<slug>/ */
  slug: string;
  title: string;
  category: string;
  summary: string;
  /** Generic audience only, e.g. "A small business". Never a real client name. */
  builtFor: string;
  role: string;
  overview: string[];
  features: string[];
  tech: string[];
  thumbnail: string;
  screenshots: Screenshot[];
  video?: { file: string; poster: string };
  links?: { live?: string; repo?: string };
}

export const projects: Project[] = raw;

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Public URL for a file inside a project's media folder. */
export function mediaUrl(project: Project, file: string): string {
  return `${import.meta.env.BASE_URL}assets/projects/${project.slug}/${file}`;
}

export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export const PLACEHOLDER_IMAGE = assetUrl("assets/placeholder.webp");
