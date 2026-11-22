import raw from "./projects.json";

export interface Screenshot {
  file: string;
  caption: string;
  /** "code" marks code, database or architecture images (the "Code & design" gallery filter). */
  kind?: "code";
}

export interface ProjectVideo {
  title: string;
  /** A file in the project's media folder ("demo.mp4"), a full .mp4 URL, or a YouTube link. */
  src: string;
  /** Cover image file in the project folder (or a full URL). Optional for YouTube. */
  poster?: string;
  description?: string;
  /** Shown on the player, e.g. "2:45". Leave "" to hide. */
  duration?: string;
}

export interface Project {
  /** URL-safe id; also the media folder name: public/assets/projects/<slug>/ */
  slug: string;
  title: string;
  /** Short name for tabs and filters, e.g. "Helpdesk". */
  short: string;
  category: string;
  summary: string;
  /** Generic audience only, e.g. "A small business". Never a real client name. */
  builtFor: string;
  role: string;
  overview: string[];
  highlights?: { label: string; value: string }[];
  features: string[];
  tech: string[];
  thumbnail: string;
  screenshots: Screenshot[];
  /** Home page hero: two screenshot files (main, second) and the address shown in the browser frame. */
  showcase?: { url: string; images: string[] };
  videos?: ProjectVideo[];
  links?: { live?: string; repo?: string };
}

export interface ResolvedVideo extends ProjectVideo {
  id: string;
  url: string;
  posterUrl: string;
  youtubeId: string | null;
  external: boolean;
  project: Project;
}

export const projects: Project[] = raw as Project[];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

const isUrl = (s: string) => /^https?:\/\//i.test(s);

/** Public URL for a file inside a project's media folder. */
export function mediaUrl(project: Project, file: string): string {
  if (isUrl(file)) return file;
  return `${import.meta.env.BASE_URL}assets/projects/${project.slug}/${file}`;
}

export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export const PLACEHOLDER_IMAGE = assetUrl("assets/placeholder.webp");

export function youtubeId(src: string): string | null {
  const m = src.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i);
  return m ? m[1] : null;
}

export function resolveVideos(project: Project): ResolvedVideo[] {
  return (project.videos ?? []).map((v, i) => {
    const yt = youtubeId(v.src);
    const poster = v.poster
      ? mediaUrl(project, v.poster)
      : yt
        ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`
        : mediaUrl(project, project.thumbnail);
    return {
      ...v,
      id: `${project.slug}-${i + 1}`,
      url: yt ? v.src : mediaUrl(project, v.src),
      posterUrl: poster,
      youtubeId: yt,
      external: isUrl(v.src),
      project,
    };
  });
}

export const allVideos: ResolvedVideo[] = projects.flatMap(resolveVideos);

export const categories: string[] = [...new Set(projects.map((p) => p.category))];

export const allTech: string[] = [...new Set(projects.flatMap((p) => p.tech))];

export interface GalleryItem {
  src: string;
  caption: string;
  code: boolean;
  project: Project;
}

/** Every screenshot, interleaved across projects (1st of each, then 2nd of each, …). */
export const galleryItems: GalleryItem[] = (() => {
  const lists = projects.map((p) =>
    p.screenshots.map((s) => ({ src: mediaUrl(p, s.file), caption: s.caption, code: s.kind === "code", project: p })),
  );
  const out: GalleryItem[] = [];
  for (let i = 0; i < Math.max(...lists.map((l) => l.length)); i++) {
    for (const l of lists) if (l[i]) out.push(l[i]);
  }
  return out;
})();
