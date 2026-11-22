import { memo, useMemo, type Ref } from "react";
import { highlight, type Lang, type Token } from "../lib/highlight";

interface Props {
  code: string;
  lang: Lang;
  /** How many characters are typed so far (Infinity = all). */
  chars: number;
  caretRef?: Ref<HTMLSpanElement>;
  /** Show the blinking caret. */
  caret?: boolean;
  className?: string;
}

const Line = memo(function Line({ tokens, upto, n }: { tokens: Token[]; upto: number; n: number }) {
  let left = upto;
  return (
    <span className="code__line" data-n={n}>
      {tokens.map((tok, i) => {
        if (left <= 0) return null;
        const t = tok.t.slice(0, left);
        left -= tok.t.length;
        return (
          <span key={i} className={`c-${tok.k}`}>
            {t}
          </span>
        );
      })}
    </span>
  );
});

/**
 * Highlighted code that can be "typed": lines after the caret are hidden but keep their space,
 * so the editor never changes size while typing.
 */
export default function CodeView({ code, lang, chars, caretRef, caret = true, className }: Props) {
  const lines = useMemo(() => highlight(code, lang), [code, lang]);
  const lengths = useMemo(() => lines.map((l) => l.reduce((s, t) => s + t.t.length, 0)), [lines]);

  let left = chars;
  let caretLine = -1;
  const rows = lines.map((tokens, i) => {
    const len = lengths[i];
    const upto = Math.max(0, Math.min(len, left));
    const active = caretLine === -1 && left <= len;
    if (active) caretLine = i;
    left -= len + 1; // + newline
    const hidden = upto === 0 && !active;
    return (
      <span key={i} className={`code__row${hidden ? " is-hidden" : ""}${active ? " is-active" : ""}`}>
        <span className="code__num">{i + 1}</span>
        <Line tokens={tokens} upto={upto} n={i} />
        {active && caret && <span ref={caretRef} className="code__caret" />}
      </span>
    );
  });

  return (
    <pre className={`code${className ? ` ${className}` : ""}`}>
      <code>{rows}</code>
    </pre>
  );
}
