import { useEffect, useRef, type ReactNode } from "react";
import Icon from "./Icon";
import MediaImage from "./MediaImage";

export interface LightboxItem {
  src: string;
  alt: string;
  caption: string;
  /** Extra content for the caption bar, e.g. a link to the project. */
  meta?: ReactNode;
}

/**
 * Full-size image viewer built on the native <dialog> (focus trap, Esc to close).
 * Controlled: pass the open index, or null when closed. Arrow keys move between images.
 */
export default function Lightbox({
  items,
  index,
  onChange,
  label = "Image viewer",
}: {
  items: LightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
  label?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = (dir: number) => {
    if (index !== null && items.length) onChange((index + dir + items.length) % items.length);
  };
  const current = index !== null ? items[index] : null;

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={label}
      onClose={() => onChange(null)}
      onClick={(e) => e.target === ref.current && onChange(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      {current && index !== null && (
        <figure className="lightbox__figure">
          <MediaImage src={current.src} alt={current.alt} loading="eager" />
          <figcaption className="lightbox__bar">
            <span className="lightbox__text">
              {current.caption}
              <span className="lightbox__count">
                {index + 1} / {items.length}
              </span>
              {current.meta}
            </span>
            <span className="lightbox__controls">
              {items.length > 1 && (
                <>
                  <button type="button" className="icon-btn icon-btn--dark" onClick={() => step(-1)} aria-label="Previous image">
                    <Icon name="chevronLeft" />
                  </button>
                  <button type="button" className="icon-btn icon-btn--dark" onClick={() => step(1)} aria-label="Next image">
                    <Icon name="chevronRight" />
                  </button>
                </>
              )}
              <button type="button" className="icon-btn icon-btn--dark" onClick={() => onChange(null)} aria-label="Close viewer" autoFocus>
                <Icon name="close" />
              </button>
            </span>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}
