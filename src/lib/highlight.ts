/** Tiny syntax highlighter for the code animations (PHP, Python, JavaScript). */
export type Lang = "php" | "python" | "js";
export type Token = { t: string; k: string };

const KEYWORDS: Record<Lang, Set<string>> = {
  php: new Set(["function", "return", "if", "else", "null", "false", "true", "use", "class", "public", "private", "new", "foreach", "as", "fn", "int", "string", "bool", "array", "require_once", "declare", "throw", "try", "catch"]),
  python: new Set(["from", "import", "def", "return", "if", "else", "elif", "for", "in", "and", "or", "not", "None", "True", "False", "with", "as", "class", "lambda", "try", "except", "raise"]),
  js: new Set(["import", "from", "export", "default", "const", "let", "async", "await", "function", "return", "if", "else", "for", "of", "new", "try", "catch", "throw", "true", "false", "null"]),
};

/** Splits code into lines of classed tokens (k = CSS class suffix: kw, str, com, fn, num, type, var, p, t). */
export function highlight(code: string, lang: Lang): Token[][] {
  const comment = lang === "python" ? "#.*" : "\\/\\/.*";
  const re = new RegExp(
    [
      "\\/\\*[\\s\\S]*?\\*\\/",
      comment,
      '"(?:[^"\\\\]|\\\\.)*"',
      "'(?:[^'\\\\]|\\\\.)*'",
      "`(?:[^`\\\\]|\\\\.)*`",
      "\\$[A-Za-z_]\\w*",
      "@[A-Za-z_][\\w.]*",
      "\\b\\d+(?:\\.\\d+)?\\b",
      "[A-Za-z_]\\w*",
      "\\s+",
      ".",
    ].join("|"),
    "g",
  );
  const raw = code.match(re) ?? [];
  const toks: Token[] = raw.map((t, i) => {
    if (t.startsWith("/*") || t.startsWith("//") || (lang === "python" && t.startsWith("#"))) return { t, k: "com" };
    if (/^["'`]/.test(t)) return { t, k: "str" };
    if (t.startsWith("$")) return { t, k: "var" };
    if (t.startsWith("@")) return { t, k: "fn" };
    if (/^\d/.test(t)) return { t, k: "num" };
    if (/^[A-Za-z_]/.test(t)) {
      if (KEYWORDS[lang].has(t)) return { t, k: "kw" };
      let j = i + 1;
      while (raw[j] !== undefined && /^[ \t]+$/.test(raw[j])) j++;
      if (raw[j] === "(") return { t, k: "fn" };
      if (/^[A-Z]/.test(t)) return { t, k: "type" };
      return { t, k: "t" };
    }
    if (/^\s+$/.test(t)) return { t, k: "t" };
    return { t, k: "p" };
  });

  const lines: Token[][] = [[]];
  for (const tok of toks) {
    tok.t.split("\n").forEach((part, n) => {
      if (n > 0) lines.push([]);
      if (part) lines[lines.length - 1].push({ t: part, k: tok.k });
    });
  }
  return lines;
}
