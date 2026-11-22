// Database diagram screenshot (tables, keys and relations). Table and column names only, no data.
import React from "react";
import { Badge, Btn, Icon, ink, mono, Screen } from "./kit";

export type Col = [name: string, type: string, key?: "pk" | "fk"];
export type TableDef = { name: string; x: number; y: number; color: string; cols: Col[]; rls?: boolean };
/** [from table, from column, to table, to column] */
export type Rel = [string, string, string, string];

const HEAD = 46;
const ROW = 32;

export const SchemaDiagram: React.FC<{
  project: string;
  title: string;
  color: string;
  tables: Record<string, TableDef>;
  rels: Rel[];
  width?: number;
  note?: string;
}> = ({ project, title, color, tables, rels, width = 330, note }) => {
  const rowY = (t: TableDef, col: string) => t.y + HEAD + Math.max(0, t.cols.findIndex((c) => c[0] === col)) * ROW + ROW / 2;
  const rlsCount = Object.values(tables).filter((t) => t.rls).length;
  return (
    <Screen bg="#f8fafc">
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#d5dce6 1.2px, transparent 1.2px)", backgroundSize: "22px 22px" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 58, display: "flex", alignItems: "center", gap: 14, padding: "0 24px", background: "#fff", borderBottom: `1px solid ${ink.border}`, zIndex: 2 }}>
        <Icon name="database" size={20} color={color} />
        <b style={{ fontSize: 16 }}>{project}</b>
        <span style={{ color: ink.subtle }}>/</span>
        <span style={{ color: ink.muted }}>{title}</span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: ink.muted, marginRight: 6 }}>
            <span style={{ color: "#d97706", display: "inline-flex" }}>
              <Icon name="key" size={14} />
            </span>
            Primary key
            <span style={{ color: "#2563eb", display: "inline-flex", marginLeft: 10 }}>
              <Icon name="key" size={14} />
            </span>
            Foreign key
          </span>
          <Badge tone="green" dot>
            {Object.keys(tables).length} tables · {rels.length} relations
          </Badge>
          {rlsCount > 0 && <Badge tone="violet">RLS on {rlsCount} tables</Badge>}
          <Btn variant="outline" size="sm" icon="download">
            Export SQL
          </Btn>
        </span>
      </div>
      <svg width={1600} height={1000} style={{ position: "absolute", inset: 0 }}>
        {rels.map(([from, fcol, to, tcol], i) => {
          const a = tables[from];
          const b = tables[to];
          const y1 = rowY(a, fcol);
          const y2 = rowY(b, tcol);
          const sameColumn = Math.abs(a.x - b.x) < 10;
          const leftToRight = a.x > b.x;
          const x1 = sameColumn ? a.x + width : leftToRight ? a.x : a.x + width;
          const x2 = sameColumn ? b.x + width : leftToRight ? b.x + width : b.x;
          const d = sameColumn
            ? `M ${x1} ${y1} C ${x1 + 70} ${y1}, ${x2 + 70} ${y2}, ${x2} ${y2}`
            : `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="#94a3b8" strokeWidth={2} />
              <circle cx={x1} cy={y1} r={4.5} fill="#fff" stroke="#94a3b8" strokeWidth={2} />
              <circle cx={x2} cy={y2} r={4.5} fill="#94a3b8" />
            </g>
          );
        })}
      </svg>
      {Object.values(tables).map((t) => (
        <div
          key={t.name}
          style={{ position: "absolute", left: t.x, top: t.y, width, borderRadius: 12, background: "#fff", border: `1px solid ${ink.border}`, boxShadow: "0 10px 30px -14px rgba(15,23,42,0.25)", overflow: "hidden" }}
        >
          <div style={{ height: HEAD, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", borderTop: `4px solid ${t.color}`, borderBottom: `1px solid ${ink.line}`, fontWeight: 700, fontSize: 15.5 }}>
            <Icon name="table" size={16} color={t.color} />
            {t.name}
            {t.rls && (
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 700, color: "#6d28d9", background: ink.violetSoft, borderRadius: 6, padding: "2px 7px" }}>
                <Icon name="shield" size={12} color="#6d28d9" /> RLS
              </span>
            )}
          </div>
          {t.cols.map(([n, type, key]) => (
            <div key={n} style={{ height: ROW, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", fontFamily: mono, fontSize: 13.5, borderBottom: `1px solid ${ink.line}` }}>
              <span style={{ width: 16, display: "inline-flex", color: key === "pk" ? "#d97706" : key === "fk" ? "#2563eb" : "transparent" }}>
                <Icon name="key" size={14} />
              </span>
              <span style={{ fontWeight: key === "pk" ? 700 : 500, color: ink.text }}>{n}</span>
              <span style={{ marginLeft: "auto", color: ink.subtle }}>{type}</span>
            </div>
          ))}
        </div>
      ))}
      {note && (
        <div style={{ position: "absolute", left: 24, bottom: 22, display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 10, background: "#fff", border: `1px solid ${ink.border}`, fontSize: 13.5, color: ink.muted }}>
          <Icon name="shield" size={15} color="#6d28d9" /> {note}
        </div>
      )}
    </Screen>
  );
};
