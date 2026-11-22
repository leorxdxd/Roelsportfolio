import { useEffect, useRef, useState } from "react";
import { cursors, onScreen, type CursorId } from "./cursors";

export type BuildState = "idle" | "building" | "built";
type Run<T> = (el: T, alive: () => boolean) => Promise<void> | void;

/**
 * Builds an element when it scrolls into view: `run` plays the cursor actions (drop a file in,
 * drag a frame, …) and the element counts as built when it finishes, or after `maxWait`, so
 * content never stays hidden. Style it with [data-build="idle" | "building" | "built"].
 * With reduced motion the element starts out built.
 */
export function useBuild<T extends HTMLElement>(run: Run<T>, { margin = "0px 0px -16% 0px", maxWait = 2400 } = {}) {
  const ref = useRef<T>(null);
  const runRef = useRef(run);
  const [state, setState] = useState<BuildState>(() => (cursors.motion ? "idle" : "built"));

  useEffect(() => {
    runRef.current = run;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !cursors.motion) return;
    let finished = false;
    let timer = 0;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      setState("built");
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setState("building");
        timer = window.setTimeout(finish, maxWait);
        Promise.resolve()
          .then(() => runRef.current(el, () => !finished))
          .catch(() => {})
          .finally(finish);
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      finished = true;
    };
  }, [margin, maxWait]);

  return [ref, state] as const;
}

/**
 * A build step done by the least busy of `ids`. If they're all busy, or the element has already
 * scrolled away, the element just appears (no cursor).
 */
export function withCursor<T extends HTMLElement>(ids: CursorId[], action: (id: CursorId, el: T) => Promise<void>): Run<T> {
  return async (el, alive) => {
    if (!cursors.active) return;
    const id = cursors.pick(ids);
    if (cursors.load(id) > 1) return;
    await cursors.run(id, async () => {
      if (alive() && onScreen(el)) await action(id, el);
    });
  };
}
