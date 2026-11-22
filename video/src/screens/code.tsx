// A dark code-editor screenshot with simple syntax highlighting (illustrative code samples).
import React from "react";
import { Icon, mono, Screen } from "./kit";
import { fontFamily } from "../theme";

export type Lang = "php" | "python" | "js" | "ts" | "sql";

const KEYWORDS: Record<Lang, string[]> = {
  php: ["function", "return", "if", "else", "null", "false", "true", "use", "namespace", "class", "public", "private", "new", "foreach", "as", "fn", "int", "string", "bool", "array", "require_once", "declare", "throw", "try", "catch"],
  python: ["from", "import", "def", "return", "if", "else", "elif", "for", "in", "and", "or", "not", "None", "True", "False", "with", "as", "class", "lambda", "try", "except", "raise"],
  js: ["import", "from", "export", "default", "const", "let", "async", "await", "function", "return", "if", "else", "for", "of", "new", "try", "catch", "throw", "true", "false", "null"],
  ts: ["import", "from", "export", "default", "const", "let", "async", "await", "function", "return", "if", "else", "for", "of", "new", "try", "catch", "throw", "true", "false", "null", "type", "interface", "as", "extends", "break", "continue"],
  sql: ["select", "from", "where", "and", "or", "not", "in", "is", "null", "on", "for", "to", "using", "with", "check", "create", "policy", "alter", "table", "enable", "row", "level", "security", "exists", "insert", "update", "delete", "trigger", "after", "before", "each", "execute", "function", "returns", "language", "as", "begin", "end", "references", "primary", "key", "default", "plan", "cascade", "or", "replace", "into", "values", "then", "if", "true", "false"],
};

const C = {
  bg: "#0f1521",
  side: "#0b1019",
  border: "#1c2433",
  text: "#d6deeb",
  dim: "#5f6b80",
  comment: "#6b7d8f",
  keyword: "#c792ea",
  string: "#addb67",
  fn: "#82aaff",
  num: "#f78c6c",
  type: "#ffcb8b",
  variable: "#7fdbca",
  punct: "#9aa8bd",
};

type Tok = { t: string; c: string; i?: boolean };

function tokenize(code: string, lang: Lang): Tok[][] {
  const comment = lang === "python" ? "#.*" : lang === "sql" ? "--.*" : "\\/\\/.*";
  const re = new RegExp(
    [
      "\\/\\*[\\s\\S]*?\\*\\/",
      '"""[\\s\\S]*?"""',
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
  const toks: Tok[] = raw.map((t, idx) => {
    if (t.startsWith("/*") || t.startsWith("//") || (lang === "sql" && t.startsWith("--")) || (lang === "python" && t.startsWith("#") && !t.startsWith("#{")))
      return { t, c: C.comment, i: true };
    if (t.startsWith('"""')) return { t, c: C.comment, i: true };
    if (/^["'`]/.test(t)) return { t, c: C.string };
    if (t.startsWith("$")) return { t, c: C.variable };
    if (t.startsWith("@")) return { t, c: C.fn };
    if (/^\d/.test(t)) return { t, c: C.num };
    if (/^[A-Za-z_]/.test(t)) {
      if (KEYWORDS[lang].includes(lang === "sql" ? t.toLowerCase() : t)) return { t, c: C.keyword };
      let j = idx + 1;
      while (raw[j] !== undefined && /^\s+$/.test(raw[j]) && !raw[j].includes("\n")) j++;
      if (raw[j] === "(") return { t, c: C.fn };
      if (/^[A-Z]/.test(t)) return { t, c: C.type };
      return { t, c: C.text };
    }
    if (/^\s+$/.test(t)) return { t, c: C.text };
    return { t, c: C.punct };
  });
  // split into lines
  const lines: Tok[][] = [[]];
  for (const tok of toks) {
    const parts = tok.t.split("\n");
    parts.forEach((p, k) => {
      if (k > 0) lines.push([]);
      if (p) lines[lines.length - 1].push({ ...tok, t: p });
    });
  }
  return lines;
}

export type TreeItem = { name: string; depth: number; folder?: boolean; open?: boolean; active?: boolean; modified?: boolean };

export const CodeEditor: React.FC<{
  project: string;
  file: string;
  path: string[];
  lang: Lang;
  code: string;
  tree: TreeItem[];
  tabs: string[];
  terminal: { t: string; c?: string }[];
  highlightLine?: number;
  branch?: string;
}> = ({ project, file, path, lang, code, tree, tabs, terminal, highlightLine, branch = "main" }) => {
  const lines = tokenize(code, lang);
  const langLabel = { php: "PHP", python: "Python", js: "JavaScript", ts: "TypeScript", sql: "SQL" }[lang];
  const fileColor = { php: "#8892bf", python: "#ffd43b", js: "#f7df1e", ts: "#4f9bf0", sql: "#f29111" }[lang];
  return (
    <Screen bg={C.bg} style={{ color: C.text }}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* title bar */}
        <div style={{ height: 40, flex: "none", display: "flex", alignItems: "center", padding: "0 16px", background: C.side, borderBottom: `1px solid ${C.border}`, fontFamily, fontSize: 13.5, color: C.dim }}>
          <div style={{ display: "flex", gap: 8 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((col) => (
              <div key={col} style={{ width: 12, height: 12, borderRadius: "50%", background: col }} />
            ))}
          </div>
          <div style={{ flex: 1, textAlign: "center", marginRight: 56 }}>
            {file} — {project}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
          {/* activity bar */}
          <div style={{ width: 54, flex: "none", background: C.side, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, paddingTop: 16 }}>
            {["copy", "search", "branch", "box", "terminal"].map((n, i) => (
              <span key={n} style={{ color: i === 0 ? "#e2e8f0" : C.dim }}>
                <Icon name={n} size={22} />
              </span>
            ))}
          </div>
          {/* explorer */}
          <div style={{ width: 270, flex: "none", background: C.side, borderRight: `1px solid ${C.border}`, fontFamily, fontSize: 14, paddingTop: 12 }}>
            <div style={{ padding: "0 18px 12px", fontSize: 11.5, fontWeight: 700, letterSpacing: 1, color: C.dim }}>EXPLORER</div>
            {tree.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  height: 28,
                  paddingLeft: 14 + item.depth * 16,
                  color: item.active ? "#fff" : item.folder ? "#c3cede" : "#9fb0c8",
                  background: item.active ? "#1d2940" : "transparent",
                  boxShadow: item.active ? "inset 2px 0 0 #82aaff" : "none",
                }}
              >
                {item.folder ? (
                  <span style={{ color: C.dim, transform: item.open ? "rotate(90deg)" : "none", display: "inline-flex" }}>
                    <Icon name="chevronRight" size={14} />
                  </span>
                ) : (
                  <span style={{ width: 14 }} />
                )}
                <span style={{ color: item.folder ? "#7aa2f7" : fileColor, display: "inline-flex" }}>
                  <Icon name={item.folder ? "folder" : "file"} size={15} />
                </span>
                {item.name}
                {item.modified && <span style={{ marginLeft: "auto", marginRight: 16, color: "#e0af68", fontSize: 12, fontWeight: 700 }}>M</span>}
              </div>
            ))}
          </div>
          {/* editor */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <div style={{ height: 40, flex: "none", display: "flex", background: C.side, borderBottom: `1px solid ${C.border}`, fontFamily, fontSize: 13.5 }}>
              {tabs.map((t, i) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0 18px",
                    background: i === 0 ? C.bg : "transparent",
                    color: i === 0 ? "#e2e8f0" : C.dim,
                    borderRight: `1px solid ${C.border}`,
                    boxShadow: i === 0 ? "inset 0 2px 0 #82aaff" : "none",
                  }}
                >
                  <span style={{ color: fileColor, display: "inline-flex" }}>
                    <Icon name="file" size={14} />
                  </span>
                  {t}
                  {i === 0 && <span style={{ color: C.dim, marginLeft: 4, display: "inline-flex" }}><Icon name="x" size={13} /></span>}
                </div>
              ))}
            </div>
            <div style={{ height: 30, flex: "none", display: "flex", alignItems: "center", gap: 6, padding: "0 20px", fontFamily, fontSize: 13, color: C.dim }}>
              {path.map((p, i) => (
                <React.Fragment key={p + i}>
                  {i > 0 && <Icon name="chevronRight" size={12} />}
                  <span style={{ color: i === path.length - 1 ? "#c3cede" : C.dim }}>{p}</span>
                </React.Fragment>
              ))}
            </div>
            <div style={{ flex: 1, minHeight: 0, overflow: "hidden", fontFamily: mono, fontSize: 14.5, lineHeight: "23.5px", paddingTop: 4 }}>
              {lines.map((line, i) => (
                <div key={i} style={{ display: "flex", background: i + 1 === highlightLine ? "rgba(130,170,255,0.08)" : "transparent" }}>
                  <div style={{ width: 62, flex: "none", textAlign: "right", paddingRight: 22, color: i + 1 === highlightLine ? "#c3cede" : "#3d4a60", userSelect: "none" }}>{i + 1}</div>
                  <div style={{ whiteSpace: "pre" }}>
                    {line.map((tok, k) => (
                      <span key={k} style={{ color: tok.c, fontStyle: tok.i ? "italic" : "normal" }}>
                        {tok.t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* terminal */}
            <div style={{ height: 210, flex: "none", borderTop: `1px solid ${C.border}`, background: C.side, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: 26, padding: "10px 20px 8px", fontFamily, fontSize: 12, fontWeight: 700, letterSpacing: 0.8, color: C.dim }}>
                <span>PROBLEMS</span>
                <span>OUTPUT</span>
                <span style={{ color: "#e2e8f0", borderBottom: "1px solid #e2e8f0", paddingBottom: 4 }}>TERMINAL</span>
              </div>
              <div style={{ padding: "6px 20px", fontFamily: mono, fontSize: 13.5, lineHeight: "22px" }}>
                {terminal.map((l, i) => (
                  <div key={i} style={{ color: l.c ?? "#c3cede", whiteSpace: "pre" }}>
                    {l.t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* status bar */}
        <div style={{ height: 28, flex: "none", display: "flex", alignItems: "center", gap: 20, padding: "0 14px", background: "#1d4ed8", color: "#e8efff", fontFamily, fontSize: 12.5 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="branch" size={14} /> {branch}
          </span>
          <span>0 errors · 0 warnings</span>
          <span style={{ marginLeft: "auto" }}>Ln {highlightLine ?? 1}, Col 5</span>
          <span>Spaces: {lang === "php" || lang === "python" ? 4 : 2}</span>
          <span>UTF-8</span>
          <span>{langLabel}</span>
        </div>
      </div>
    </Screen>
  );
};
