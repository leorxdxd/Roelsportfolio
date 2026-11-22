import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { galleryItems, projects } from "../data/projects";
import Icon from "./Icon";
import Lightbox from "./Lightbox";
import MediaImage from "./MediaImage";

const LIMIT = 9;
const filters = [
  { id: "all", label: "All" },
  ...projects.map((p) => ({ id: p.slug, label: p.short })),
  { id: "code", label: "Code & database" },
];

/** Screens from every project: filter by project, open any image full size. */
export default function WorkGallery() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const list = galleryItems.filter((it) => filter === "all" || (filter === "code" ? it.code : it.project.slug === filter));
  const shown = expanded ? list : list.slice(0, LIMIT);

  return (
    <div className="work-gallery">
      <div className="filter-bar work-gallery__filters" role="group" aria-label="Filter screens">
        {filters.map((f) => {
          const count = galleryItems.filter((it) => f.id === "all" || (f.id === "code" ? it.code : it.project.slug === f.id)).length;
          return (
            <button key={f.id} type="button" className="filter-chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
              <span className="filter-chip__count">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="shots" role="list">
        {shown.map((it, i) => (
          <li key={it.src} className={i === 0 ? "shots__item shots__item--featured" : "shots__item"} style={{ "--i": i } as CSSProperties}>
            <button type="button" className="shot" onClick={() => setOpen(i)}>
              <MediaImage src={it.src} alt="" width={1600} height={1000} />
              <span className="shot__caption">
                <span className="shot__project">{it.project.short}</span>
                <span className="shot__title">{it.caption}</span>
              </span>
              <span className="shot__zoom" aria-hidden="true">
                <Icon name="search" size={16} />
              </span>
              <span className="visually-hidden"> (open full size)</span>
            </button>
          </li>
        ))}
      </ul>

      {list.length > shown.length && (
        <div className="work-gallery__more">
          <button type="button" className="btn btn--secondary" onClick={() => setExpanded(true)}>
            Show all {list.length} screens <Icon name="chevronDown" size={16} />
          </button>
        </div>
      )}

      <Lightbox
        label="Screen viewer"
        index={open}
        onChange={setOpen}
        items={list.map((it) => ({
          src: it.src,
          alt: `${it.project.title}: ${it.caption}`,
          caption: it.caption,
          meta: (
            <Link to={`/projects/${it.project.slug}`} className="lightbox__link">
              {it.project.title} <Icon name="arrowRight" size={14} />
            </Link>
          ),
        }))}
      />
    </div>
  );
}
