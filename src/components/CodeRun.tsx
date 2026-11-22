import { useEffect, useRef, useState, type CSSProperties } from "react";
import { scenes } from "../data/build";
import type { Lang } from "../lib/highlight";
import { getProject, mediaUrl } from "../data/projects";
import { cursors, pointOn, type CursorId } from "../lib/cursors";
import { usePrefersReducedMotion } from "../lib/hooks";
import CodeView from "./CodeView";
import Icon from "./Icon";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

const STEPS = [
  { title: "Write the code", text: "Readable TypeScript and SQL on Supabase, versioned in Git." },
  { title: "Test it", text: "Automated tests check the rules that matter before release." },
  { title: "Run it", text: "Deployed for real users, with support after launch." },
];
const LANG: Record<Lang, string> = { ts: "TypeScript", sql: "SQL", php: "PHP", python: "Python", js: "JavaScript" };

/**
 * "How a feature gets built": a sticky scene driven by scrolling. The code types itself in an
 * editor, the tests run in the terminal, then the app opens and the feature is used. The cursors
 * take part while the scene is on screen. With reduced motion everything is shown at once.
 */
export default function CodeRun() {
  const reduced = usePrefersReducedMotion();
  const section = useRef<HTMLElement>(null);
  const caret = useRef<HTMLSpanElement>(null);
  const termEnd = useRef<HTMLSpanElement>(null);
  const shot = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [p, setP] = useState(1);
  const [active, setActive] = useState(false);

  const scene = scenes[idx];
  const project = getProject(scene.project);

  // Scroll progress through the section (0..1)
  useEffect(() => {
    if (reduced) {
      setP(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = section.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const run = r.height - vh;
      setP(run > 0 ? clamp(-r.top / run) : 1);
      setActive(r.top < vh * 0.4 && r.bottom > vh * 0.6);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const typeP = clamp((p - 0.03) / 0.5);
  const testP = clamp((p - 0.55) / 0.13);
  const runP = clamp((p - 0.7) / 0.1);
  const clicked = p > 0.86;
  const step = p < 0.54 ? 0 : p < 0.7 ? 1 : 2;
  const chars = p >= 1 ? Infinity : Math.floor(typeP * scene.code.length);
  const lines = p >= 1 ? scene.terminal.length : Math.floor(testP * (scene.terminal.length + 0.99));
  const showTerminal = p >= 0.53;

  // Cursors join in while the scene is on screen
  useEffect(() => {
    if (!active || reduced || !cursors.active) return;
    const id: CursorId = step === 0 ? "back" : step === 1 ? "test" : "front";
    const release = cursors.hold(id);
    if (step === 0) cursors.follow(id, { fn: () => pointOn(caret.current, 0, 1, 3, 2) });
    if (step === 1) cursors.follow(id, { fn: () => pointOn(termEnd.current, 1, 0.5, 10, 4) });
    if (step === 2)
      cursors.follow(id, { fn: () => pointOn(shot.current, scene.screen.click[0], scene.screen.click[1], 0, 0) });
    return release;
  }, [active, step, reduced, scene]);

  useEffect(() => {
    if (clicked && active && !reduced) void cursors.click("front");
  }, [clicked, active, reduced]);

  return (
    <section ref={section} className={`coderun${reduced ? " is-static" : ""}`} aria-labelledby="coderun-title">
      <div className="coderun__sticky">
        <div className="container coderun__inner">
          <div className="coderun__side">
            <p className="eyebrow">02 / How I work</p>
            <h2 className="section-title" id="coderun-title">
              How a feature gets built
            </h2>
            <p className="coderun__lead">
              One feature from each project, from code to tests to the running app. Keep scrolling to play it.
              Sample code and data.
            </p>
            <div className="coderun__tabs" role="group" aria-label="Choose a project">
              {scenes.map((s, i) => (
                <button
                  key={s.project}
                  type="button"
                  className="filter-chip"
                  aria-pressed={i === idx}
                  onClick={() => setIdx(i)}
                >
                  {getProject(s.project)?.short ?? s.project}
                </button>
              ))}
            </div>
            <ol className="coderun__steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className={i === step ? "is-on" : i < step ? "is-past" : undefined}>
                  <span className="coderun__num">0{i + 1}</span>
                  <span>
                    <b>{s.title}</b>
                    <span>{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="coderun__stage" aria-hidden="true">
            <div className="ide">
              <div className="ide__title">
                <i />
                <i />
                <i />
                <span>
                  {scene.path} / {scene.file}
                </span>
              </div>
              <div className="ide__body">
                <div className="ide__tree">
                  <span className="ide__tree-head">Explorer</span>
                  {scene.path.split(" / ").map((dir, d) => (
                    <span key={dir} className="ide__node" style={{ paddingLeft: 10 + d * 12 }}>
                      <Icon name="chevronDown" size={11} /> {dir}
                    </span>
                  ))}
                  <span className="ide__node is-active" style={{ paddingLeft: 10 + scene.path.split(" / ").length * 12 }}>
                    {scene.file}
                  </span>
                  <span className="ide__node" style={{ paddingLeft: 10 }}>
                    <Icon name="chevronRight" size={11} /> tests
                  </span>
                </div>
                <div className="ide__main">
                  <div className="ide__tabs">
                    <span className="ide__tab is-active">
                      {scene.file}
                      {chars < scene.code.length && <i className="ide__dot" />}
                    </span>
                  </div>
                  <div className="ide__code">
                    <CodeView code={scene.code} lang={scene.lang} chars={chars} caretRef={caret} caret={step === 0 && p < 1} />
                  </div>
                  <div className={`ide__terminal${showTerminal ? " is-open" : ""}`}>
                    <span className="ide__terminal-head">Terminal</span>
                    {scene.terminal.slice(0, lines).map((l, i) => (
                      <span key={i} className={`ide__term-line${l.ok ? " is-ok" : ""}`}>
                        {l.t}
                        {i === lines - 1 && <span ref={termEnd} className="ide__term-end" />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ide__status">
                <span>main</span>
                <span>{LANG[scene.lang]}</span>
                <span>{lines >= scene.terminal.length ? "Tests passed" : step >= 1 ? "Running tests…" : "Editing"}</span>
              </div>
            </div>

            <div className="coderun__browser" style={{ "--run": runP } as CSSProperties}>
              <span className="browser-bar">
                <i />
                <i />
                <i />
                <span className="browser-bar__url">
                  <Icon name="lock" size={10} /> {scene.screen.url}
                </span>
              </span>
              <div ref={shot} className="coderun__shot">
                {project && <img src={mediaUrl(project, scene.screen.file)} alt="" width={1600} height={1000} loading="lazy" decoding="async" />}
                <span
                  className={`coderun__ping${clicked ? " is-on" : ""}`}
                  style={{ left: `${scene.screen.click[0] * 100}%`, top: `${scene.screen.click[1] * 100}%` }}
                />
                <span className={`coderun__toast${clicked ? " is-on" : ""}`}>
                  <Icon name="check" size={14} /> {scene.screen.toast}
                </span>
              </div>
            </div>
          </div>

          <p className="visually-hidden">
            Animation: the {LANG[scene.lang]} code for one feature of {project?.title} is written in a code editor, its
            automated tests pass in the terminal, then the app opens and the feature is used: {scene.screen.toast}.
          </p>
        </div>
      </div>
    </section>
  );
}
