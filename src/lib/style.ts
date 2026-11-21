import type { CSSProperties } from "react";

/** Stagger delay for `data-reveal` elements, e.g. style={delay(120)}. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
