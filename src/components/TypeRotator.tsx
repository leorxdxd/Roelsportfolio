import { useEffect, useState } from "react";
import { usePageVisible, usePrefersReducedMotion } from "../lib/hooks";

/** Types out each word, pauses, deletes it, then moves to the next. Decorative only. */
export default function TypeRotator({ words }: { words: string[] }) {
  const reduced = usePrefersReducedMotion();
  const visible = usePageVisible();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced || !visible) return;
    const word = words[index];
    let delay = deleting ? 38 : 70;
    if (!deleting && text === word) delay = 1900;
    if (deleting && text === "") delay = 260;

    const t = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, words, reduced, visible]);

  return (
    <span className="type-rotator" aria-hidden="true">
      <span className="type-rotator__text">{reduced ? words[0] : text}</span>
      <span className="type-rotator__caret" />
    </span>
  );
}
