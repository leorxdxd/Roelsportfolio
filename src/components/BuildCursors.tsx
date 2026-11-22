import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { CURSOR_IDS, CURSOR_LABELS, cursors, type CursorId } from "../lib/cursors";
import { usePrefersReducedMotion } from "../lib/hooks";

const COLORS: Record<CursorId, string> = {
  design: "var(--cur-design)",
  front: "var(--cur-front)",
  back: "var(--cur-back)",
  test: "var(--cur-test)",
};

function CursorView({ id }: { id: CursorId }) {
  const root = useRef<HTMLDivElement>(null);
  const carry = useRef<HTMLSpanElement>(null);
  const select = useRef<HTMLDivElement>(null);
  const size = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    cursors.attach(id, { root: root.current!, carry: carry.current!, select: select.current!, size: size.current! });
  }, [id]);

  const style = { "--c": COLORS[id] } as CSSProperties;
  return (
    <>
      <div ref={select} className="cursor-select" style={style}>
        <i />
        <i />
        <i />
        <i />
        <span ref={size} className="cursor-select__size" />
      </div>
      <div ref={root} className="cursor" style={style}>
        <svg className="cursor__arrow" width="22" height="24" viewBox="0 0 22 24">
          <path d="M3 2.5v17.4l4.9-4.6 3.4 7.2 3.1-1.4-3.3-7.1h6.8z" />
        </svg>
        <span className="cursor__label">{CURSOR_LABELS[id]}</span>
        <span ref={carry} className="cursor__carry" />
      </div>
    </>
  );
}

/**
 * The four "live build" cursors (decorative, aria-hidden) and the button that hides them.
 * Rendered into <body> so position: fixed isn't affected by page transitions.
 */
export default function BuildCursors() {
  const reduced = usePrefersReducedMotion();
  const enabled = useSyncExternalStore(
    (fn) => cursors.subscribe(fn),
    () => cursors.enabled,
  );

  useEffect(() => {
    cursors.start();
    return () => cursors.stop();
  }, []);

  if (reduced) return null;

  return createPortal(
    <>
      <div className="cursors" aria-hidden="true">
        {CURSOR_IDS.map((id) => (
          <CursorView key={id} id={id} />
        ))}
      </div>
      <button
        type="button"
        className="cursor-toggle"
        aria-pressed={enabled}
        onClick={() => cursors.setEnabled(!enabled)}
        aria-label="Build cursors"
        title={enabled ? "Hide the build cursors" : "Show the build cursors"}
      >
        <span className="cursor-toggle__dots" aria-hidden="true">
          {CURSOR_IDS.map((id) => (
            <i key={id} style={{ "--c": COLORS[id] } as CSSProperties} />
          ))}
        </span>
        <span className="cursor-toggle__label">Cursors</span>
      </button>
    </>,
    document.body,
  );
}
