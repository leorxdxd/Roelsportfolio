import { useEffect, useRef, useState } from "react";
import { heroSnippet } from "../data/build";
import { getProject, mediaUrl, projects } from "../data/projects";
import { clickOn, cursors, dropOnto, frame, pointOn } from "../lib/cursors";
import CodeView from "./CodeView";
import Icon from "./Icon";
import Portrait3D from "./Portrait3D";

const helpdesk = getProject("it-helpdesk-ticketing-system") ?? projects[0];
const checker = getProject("ai-plagiarism-checker") ?? projects[projects.length - 1];

type Parts = { back: boolean; side: boolean; portrait: boolean; code: boolean; toast: boolean };
const ALL: Parts = { back: true, side: true, portrait: true, code: true, toast: true };
const NONE: Parts = { back: false, side: false, portrait: false, code: false, toast: false };
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function BrowserBar({ url }: { url?: string }) {
  return (
    <span className="browser-bar">
      <i />
      <i />
      <i />
      {url && (
        <span className="browser-bar__url">
          <Icon name="lock" size={10} /> {url}
        </span>
      )}
    </span>
  );
}

/**
 * Hero visual: a small 3D scene (tilts with the mouse) that the cursors put together on load:
 * a project window gets framed, the portrait is dropped in, a function is typed and its tests run.
 */
export default function HeroStage({ start }: { start: boolean }) {
  const motion = cursors.motion;
  const stage = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const code = useRef<HTMLDivElement>(null);
  const runBtn = useRef<HTMLSpanElement>(null);
  const caret = useRef<HTMLSpanElement>(null);
  const [parts, setParts] = useState<Parts>(motion ? NONE : ALL);
  const [chars, setChars] = useState(motion ? 0 : Infinity);

  // The build sequence
  useEffect(() => {
    if (!start || !motion) return;
    let alive = true;
    const show = (k: keyof Parts) => alive && setParts((p) => ({ ...p, [k]: true }));

    void cursors.run("test", async () => {
      await wait(150);
      if (alive && back.current) await frame("test", back.current);
      show("back");
      await wait(250);
      show("side");
    });
    void cursors.run("front", async () => {
      await wait(450);
      if (alive && holder.current) await dropOnto("front", holder.current, "portrait.webp");
      show("portrait");
    });
    void cursors.run("back", async () => {
      await wait(1000);
      if (alive && code.current) await clickOn("back", code.current, 0.18, 0.4);
      show("code");
      cursors.follow("back", { fn: () => pointOn(caret.current, 0, 1, 3, 2) });
      const total = heroSnippet.code.length;
      for (let i = 0; i <= total && alive; i += 2) {
        setChars(i);
        await wait(heroSnippet.code[i] === "\n" ? 90 : 16);
      }
      if (!alive) return;
      setChars(Infinity);
      if (runBtn.current) await clickOn("back", runBtn.current);
      show("toast");
    });

    // never leave the scene half-built
    const fallback = setTimeout(() => {
      if (!alive) return;
      setParts(ALL);
      setChars(Infinity);
    }, 7000);
    return () => {
      alive = false;
      clearTimeout(fallback);
    };
  }, [start, motion]);

  // Tilt with the mouse
  useEffect(() => {
    const el = stage.current;
    if (!el || !motion) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--tx", x.toFixed(3));
      el.style.setProperty("--ty", y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [motion]);

  const on = (k: keyof Parts) => (parts[k] ? " is-in" : "");

  return (
    <div className="stage" ref={stage}>
      <div className="stage__world">
        <figure ref={back} className={`stage__win stage__win--back${on("back")}`} aria-hidden="true">
          <BrowserBar url={helpdesk.showcase?.url} />
          <img src={mediaUrl(helpdesk, "screenshot-1.webp")} alt="" width={1600} height={1000} decoding="async" />
        </figure>

        <figure className={`stage__win stage__win--side${on("side")}`} aria-hidden="true">
          <BrowserBar />
          <img src={mediaUrl(checker, "screenshot-2.webp")} alt="" width={1600} height={1000} loading="lazy" decoding="async" />
        </figure>

        <div ref={holder} className={`stage__frame${on("portrait")}`} aria-hidden="true">
          <span className="stage__frame-label">portrait.webp</span>
        </div>
        <Portrait3D show={parts.portrait} className="stage__portrait" />

        <div ref={code} className={`stage__code${on("code")}`} aria-hidden="true">
          <div className="stage__code-bar">
            <span className="stage__code-file">{heroSnippet.file}</span>
            <span ref={runBtn} className={`stage__run${parts.toast ? " is-done" : ""}`}>
              <Icon name="play" size={10} /> Run tests
            </span>
          </div>
          <CodeView code={heroSnippet.code} lang={heroSnippet.lang} chars={chars} caretRef={caret} caret={parts.code && !parts.toast} />
        </div>

        <div className={`stage__toast${on("toast")}`} aria-hidden="true">
          <span className="stage__toast-icon">
            <Icon name="check" size={14} />
          </span>
          <span>
            <b>4 tests passed</b>
            <small>assign.php · 0.42 s</small>
          </span>
        </div>
      </div>
    </div>
  );
}
