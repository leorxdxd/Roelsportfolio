import { useCallback, useEffect, useRef, useState } from "react";
import { mediaUrl, type Project } from "../data/projects";
import Icon from "./Icon";
import MediaImage from "./MediaImage";

/** Screenshot grid with an accessible lightbox (native <dialog>). */
export default function ScreenshotGallery({ project }: { project: Project }) {
  const shots = project.screenshots;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const openAt = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  if (shots.length === 0) return null;
  const current = index !== null ? shots[index] : null;

  return (
    <>
      <ul className="gallery" role="list">
        {shots.map((shot, i) => (
          <li key={shot.file}>
            <button
              type="button"
              className="gallery__item"
              onClick={() => openAt(i)}
              aria-label={`Enlarge screenshot: ${shot.caption}`}
            >
              <MediaImage
                src={mediaUrl(project, shot.file)}
                alt={`${project.title}: ${shot.caption}`}
                width={1600}
                height={1000}
              />
              <span className="gallery__caption">{shot.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Screenshot viewer"
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        {current && index !== null && (
          <figure className="lightbox__figure">
            <MediaImage
              src={mediaUrl(project, current.file)}
              alt={`${project.title}: ${current.caption}`}
              loading="eager"
            />
            <figcaption className="lightbox__bar">
              <span>
                {current.caption}
                <span className="lightbox__count">
                  {index + 1} / {shots.length}
                </span>
              </span>
              <span className="lightbox__controls">
                {shots.length > 1 && (
                  <>
                    <button type="button" className="icon-btn icon-btn--dark" onClick={() => step(-1)} aria-label="Previous screenshot">
                      <Icon name="chevronLeft" />
                    </button>
                    <button type="button" className="icon-btn icon-btn--dark" onClick={() => step(1)} aria-label="Next screenshot">
                      <Icon name="chevronRight" />
                    </button>
                  </>
                )}
                <button type="button" className="icon-btn icon-btn--dark" onClick={close} aria-label="Close viewer" autoFocus>
                  <Icon name="close" />
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
