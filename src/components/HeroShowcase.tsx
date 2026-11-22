import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { mediaUrl, projects } from "../data/projects";
import { usePrefersReducedMotion } from "../lib/hooks";
import Icon from "./Icon";

const slides = projects
  .filter((p) => p.showcase && p.showcase.images.length >= 2)
  .map((p) => ({ project: p, url: p.showcase!.url, main: mediaUrl(p, p.showcase!.images[0]), second: mediaUrl(p, p.showcase!.images[1]) }));

/**
 * Hero visual: real screens from each project in layered browser windows.
 * Cycles through projects (pauses on hover/focus, stops when a tab is chosen,
 * never auto-plays with reduced motion). The progress bar's animationend
 * event advances the slide, so pausing the CSS animation pauses the timer.
 */
export default function HeroShowcase() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const auto = playing && !reduced && slides.length > 1;

  if (slides.length === 0) return null;
  const current = slides[index];

  const choose = (i: number, focus = false) => {
    setIndex(i);
    setPlaying(false);
    if (focus) tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[i]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = slides.length - 1;
    const map: Record<string, number> = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last };
    if (e.key in map) {
      e.preventDefault();
      choose(map[e.key], true);
    }
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    e.currentTarget.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = () => {
    stageRef.current?.style.setProperty("--px", "0");
    stageRef.current?.style.setProperty("--py", "0");
  };

  return (
    <div className={`showcase${auto ? " is-auto" : ""}`}>
      <div
        ref={stageRef}
        className="showcase__stage"
        id="showcase-panel"
        role="tabpanel"
        aria-labelledby={`showcase-tab-${index}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="showcase__window showcase__window--main">
          <span className="browser-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="browser-bar__url">
              <Icon name="lock" size={11} /> {current.url}
            </span>
          </span>
          <Link to={`/projects/${current.project.slug}`} className="showcase__screens" aria-label={`Open the ${current.project.title} case study`}>
            {slides.map((s, i) => (
              <img
                key={s.main}
                src={s.main}
                alt=""
                width={1600}
                height={1000}
                className={i === index ? "is-active" : undefined}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
              />
            ))}
          </Link>
        </div>
        <div className="showcase__window showcase__window--second" aria-hidden="true">
          <span className="browser-bar">
            <i />
            <i />
            <i />
          </span>
          <span className="showcase__screens">
            {slides.map((s, i) => (
              <img key={s.second} src={s.second} alt="" width={1600} height={1000} className={i === index ? "is-active" : undefined} loading="lazy" decoding="async" />
            ))}
          </span>
        </div>
      </div>

      <div className="showcase__tabs" ref={tabsRef}>
        <div className="showcase__tablist" role="tablist" aria-label="Featured projects">
          {slides.map((s, i) => (
            <button
              key={s.project.slug}
              id={`showcase-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls="showcase-panel"
              tabIndex={i === index ? 0 : -1}
              className={`showcase-tab${i === index ? " is-active" : ""}`}
              onClick={() => choose(i)}
              onKeyDown={onKey}
            >
              <span className="showcase-tab__name">{s.project.short}</span>
              <span className="showcase-tab__cat">{s.project.category}</span>
              <span className="showcase-tab__bar" aria-hidden="true">
                <span onAnimationEnd={() => setIndex((x) => (x + 1) % slides.length)} />
              </span>
            </button>
          ))}
        </div>
        {!reduced && slides.length > 1 && (
          <button type="button" className="icon-btn showcase__toggle" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
            <Icon name={playing ? "pause" : "play"} size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
