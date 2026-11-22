import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from "react";
import { cursors, type CursorId } from "../lib/cursors";

type Seg = { t: string; mark: boolean };

/** "*word*" marks a word for the lime highlighter, which sweeps in after typing. */
const parse = (text: string): Seg[] =>
  text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((p) => (p.startsWith("*") && p.endsWith("*") ? { t: p.slice(1, -1), mark: true } : { t: p, mark: false }));

interface Props {
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
  /** Start typing (e.g. when its section has been built). */
  start: boolean;
  /** Cursor that clicks into the text and follows the caret while typing. */
  cursor?: CursorId;
  /** Average milliseconds per character. */
  speed?: number;
  /** Start typing right away and let the cursor catch up (instead of waiting for it to click in). */
  eager?: boolean;
  onDone?: () => void;
}

/**
 * Text that types itself in, with a caret. The full text is always in the page for screen
 * readers and search engines; the untyped part keeps its space so nothing jumps around.
 * With reduced motion the text is simply there.
 */
export default function TypeText({ text, as: Tag = "span", id, className, start, cursor, speed = 34, eager, onDone }: Props) {
  const segs = useMemo(() => parse(text), [text]);
  const plain = useMemo(() => segs.map((s) => s.t).join(""), [segs]);
  const total = plain.length;
  const [n, setN] = useState(() => (cursors.motion ? 0 : total));
  const [done, setDone] = useState(() => !cursors.motion);
  const caret = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    if (!start || done) return;
    let cancelled = false;
    let timer = 0;

    const typeAll = () =>
      new Promise<void>((resolve) => {
        let i = 0;
        const step = () => {
          if (cancelled) return resolve();
          i += 1;
          setN(i);
          if (i >= total) return resolve();
          const ch = plain[i - 1];
          const pause = /[.,:;!?]/.test(ch) ? speed * 5 : ch === " " ? speed * 0.5 : 0;
          timer = window.setTimeout(step, speed * (0.55 + Math.random() * 0.9) + pause);
        };
        timer = window.setTimeout(step, 60);
      });

    (async () => {
      const el = caret.current;
      if (cursor && el && cursors.active && cursors.load(cursor) <= 1) {
        await cursors.run(cursor, async () => {
          if (cancelled) return;
          const at = { el, ax: 0, ay: 1, dx: 3, dy: 2 };
          if (!eager) {
            await cursors.moveTo(cursor, at);
            await cursors.click(cursor);
          }
          cursors.follow(cursor, at);
          await typeAll();
        });
      } else {
        await typeAll();
      }
      if (cancelled) return;
      setN(total);
      setDone(true);
      doneRef.current?.();
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // typing runs once per start; text changes aren't expected while typing
  }, [start]);

  let left = n;
  const typed: ReactNode[] = [];
  const ghost: ReactNode[] = [];
  segs.forEach((s, k) => {
    const cut = Math.max(0, Math.min(s.t.length, left));
    left -= s.t.length;
    const cls = s.mark ? "type__mark" : undefined;
    if (cut > 0) typed.push(<span key={`t${k}`} className={cls}>{s.t.slice(0, cut)}</span>);
    if (cut < s.t.length) ghost.push(<span key={`g${k}`} className={cls}>{s.t.slice(cut)}</span>);
  });

  const state = done ? " is-done" : start ? " is-typing" : "";
  return (
    <Tag id={id} className={`type${className ? ` ${className}` : ""}${state}`}>
      <span className="visually-hidden">{plain}</span>
      <span className="type__text" aria-hidden="true">
        {typed}
        <span ref={caret} className="type__caret" />
        {ghost.length > 0 && <span className="type__ghost">{ghost}</span>}
      </span>
    </Tag>
  );
}
