import { useState } from "react";
import { mediaUrl, type Project } from "../data/projects";
import Lightbox from "./Lightbox";
import MediaImage from "./MediaImage";

/** A project's screenshot grid; each image opens in the lightbox. */
export default function ScreenshotGallery({ project }: { project: Project }) {
  const shots = project.screenshots;
  const [index, setIndex] = useState<number | null>(null);
  if (shots.length === 0) return null;

  return (
    <>
      <ul className="gallery" role="list">
        {shots.map((shot, i) => (
          <li key={shot.file}>
            <button type="button" className="gallery__item" onClick={() => setIndex(i)} aria-label={`Enlarge screenshot: ${shot.caption}`}>
              <MediaImage src={mediaUrl(project, shot.file)} alt={`${project.title}: ${shot.caption}`} width={1600} height={1000} />
              <span className="gallery__caption">{shot.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        label="Screenshot viewer"
        index={index}
        onChange={setIndex}
        items={shots.map((s) => ({ src: mediaUrl(project, s.file), alt: `${project.title}: ${s.caption}`, caption: s.caption }))}
      />
    </>
  );
}
