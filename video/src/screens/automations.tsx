// Workflow automations (scheduled jobs, reminders, reports, syncs) — sample data only.
import React from "react";
import { AppShell, Badge, Brand, Btn, Card, Icon, IconTile, ink, mono, peso, Stat, Table, Toggle } from "./kit";
import { CodeEditor } from "./code";

export const au: Brand = { name: "Automations", color: "#7c3aed", soft: "#f3eefe", dark: "#6d28d9", icon: "zap" };

const nav = [
  { icon: "home", label: "Overview" },
  { icon: "workflow", label: "Workflows", badge: 8 },
  { icon: "activity", label: "Runs" },
  { icon: "link", label: "Connections" },
  { icon: "layers", label: "Templates" },
  { icon: "users", label: "Team", section: "Admin" },
  { icon: "key", label: "Secrets" },
  { icon: "settings", label: "Settings" },
];
const admin = { name: "Mark Bautista", role: "Admin", color: "#334155" };

/* ------------------------------------------------------------------ */
type Flow = [icon: string, color: string, soft: string, name: string, desc: string, trigger: string, tIcon: string, last: string, lastTone: "green" | "amber" | "red", next: string];
const flows: Flow[] = [
  ["mail", "#7c3aed", "#f3eefe", "Rent reminders", "Email tenants 3 days before a bill is due", "Daily · 8:00 AM", "clock", "Today 8:00 AM · 18 sent", "green", "Tomorrow 8:00 AM"],
  ["message", "#0d9488", "#e6f6f4", "Appointment reminders", "Text patients the day before their visit", "Daily · 5:00 PM", "clock", "Yesterday · 22 sent", "green", "Today 5:00 PM"],
  ["box", "#16a34a", "#e8f7ee", "Low-stock alerts", "Email the pharmacist when stock is low", "Every hour", "repeat", "Today 9:00 AM · 2 alerts", "green", "Today 10:00 AM"],
  ["chart", "#2563eb", "#e8f0fe", "Weekly sales report", "PDF summary to the owner every Monday", "Mondays · 7:00 AM", "calendar", "Nov 30 · 1 sent", "green", "Dec 7, 7:00 AM"],
  ["globe", "#ea580c", "#fff1e6", "Website inquiries", "Save contact-form messages and notify the team", "Webhook · on submit", "link", "Today 9:12 AM", "green", "On next submit"],
  ["table", "#0891b2", "#e0f6fb", "Spreadsheet import", "Import new rows from a shared sheet", "Every 15 minutes", "repeat", "Retried · 9:15 AM", "amber", "Today 9:30 AM"],
  ["database", "#475569", "#f1f5f9", "Nightly backup", "Export database tables to cloud storage", "Daily · 2:00 AM", "clock", "Today 2:00 AM · 48 MB", "green", "Tomorrow 2:00 AM"],
];

export const AuWorkflows: React.FC = () => (
  <AppShell
    brand={au}
    nav={nav}
    active="Workflows"
    user={admin}
    title="Workflows"
    subtitle="8 active · 1,284 runs this week"
    search="Search workflows…"
    actions={
      <>
        <Btn variant="outline" icon="layers">Templates</Btn>
        <Btn color={au.color} icon="plus">New workflow</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
      <Stat label="Active workflows" value={8} icon="workflow" color={au.color} soft={au.soft} />
      <Stat label="Runs this week" value="1,284" delta="9%" icon="activity" color="#2563eb" soft="#e8f0fe" />
      <Stat label="Success rate" value="99.6%" icon="checkCircle" color="#16a34a" soft="#dcfce7" />
      <Stat label="Time saved per month" value="38 h" delta="6 h" icon="clock" color="#ea580c" soft="#fff1e6" />
    </div>
    <Card pad={18} style={{ marginTop: 20 }}>
      <Table
        rowH={66}
        cols={[
          { label: "Workflow" },
          { label: "Trigger", w: 190 },
          { label: "Last run", w: 210 },
          { label: "Next run", w: 150 },
          { label: "On", w: 50 },
          { label: "", w: 104 },
        ]}
        rows={flows.map(([icon, color, soft, name, desc, trigger, tIcon, last, tone, next], i) => [
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <IconTile icon={icon} color={color} soft={soft} size={38} />
            <div style={{ lineHeight: 1.3, minWidth: 0 }}>
              <div style={{ fontWeight: 650 }}>{name}</div>
              <div style={{ fontSize: 13, color: ink.muted, overflow: "hidden", textOverflow: "ellipsis" }}>{desc}</div>
            </div>
          </div>,
          <span style={{ display: "flex", alignItems: "center", gap: 8, color: ink.body, fontSize: 14 }}>
            <Icon name={tIcon} size={16} color={ink.muted} /> {trigger}
          </span>,
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: tone === "green" ? ink.green : tone === "amber" ? "#d97706" : ink.red }} />
            {last}
          </span>,
          <span style={{ color: ink.muted, fontSize: 14 }}>{next}</span>,
          <Toggle on color={au.color} />,
          i === 0 ? (
            <Btn size="sm" color={au.color} icon="play">
              Run now
            </Btn>
          ) : (
            <Btn size="sm" variant="outline" icon="play">
              Run now
            </Btn>
          ),
        ])}
      />
    </Card>
  </AppShell>
);

/* ------------------------------------------------------------------ */
const NW = 390;
const Node: React.FC<{ x: number; y: number; icon: string; color: string; soft: string; kind: string; title: string; sub: string; selected?: boolean; w?: number }> = ({
  x,
  y,
  icon,
  color,
  soft,
  kind,
  title,
  sub,
  selected,
  w = NW,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: 84,
      borderRadius: 14,
      background: "#fff",
      border: selected ? `2px solid ${au.color}` : `1px solid ${ink.border}`,
      boxShadow: selected ? `0 0 0 5px ${au.color}22, 0 18px 34px -20px rgba(15,23,42,0.45)` : "0 8px 22px -16px rgba(15,23,42,0.35)",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "0 16px",
    }}
  >
    <IconTile icon={icon} color={color} soft={soft} size={44} />
    <div style={{ lineHeight: 1.3, minWidth: 0 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color }}>{kind}</div>
      <div style={{ fontWeight: 700, fontSize: 15.5 }}>{title}</div>
      <div style={{ fontSize: 13, color: ink.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>
    </div>
  </div>
);

const Plus: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <span style={{ position: "absolute", left: x - 11, top: y - 11, width: 22, height: 22, borderRadius: "50%", background: "#fff", border: `1.5px solid ${ink.border}`, display: "grid", placeItems: "center", color: ink.muted }}>
    <Icon name="plus" size={13} />
  </span>
);

export const AuFlow: React.FC = () => {
  const cx = 448;
  const x = cx - NW / 2;
  const ys = [36, 156, 276, 396];
  return (
    <AppShell
      brand={au}
      nav={nav}
      active="Workflows"
      user={admin}
      title="Rent reminders"
      subtitle="Workflows / Rent reminders · Published · runs daily at 8:00 AM"
      search="Search workflows…"
      actions={
        <>
          <Btn variant="outline" icon="play">Test run</Btn>
          <Btn color={au.color} icon="check">Publish</Btn>
        </>
      }
      contentStyle={{ padding: 0 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", height: "100%" }}>
        <div style={{ position: "relative", backgroundImage: "radial-gradient(#d5dce6 1.2px, transparent 1.2px)", backgroundSize: "22px 22px", overflow: "hidden" }}>
          <svg width={896} height={924} style={{ position: "absolute", inset: 0 }}>
            {[0, 1, 2].map((i) => (
              <line key={i} x1={cx} x2={cx} y1={ys[i] + 84} y2={ys[i + 1]} stroke="#94a3b8" strokeWidth={2} />
            ))}
            <path d={`M ${cx} ${ys[3] + 84} V ${ys[3] + 112} H 230 V 560`} fill="none" stroke="#16a34a" strokeWidth={2} />
            <path d={`M ${cx} ${ys[3] + 112} H 666 V 560`} fill="none" stroke="#dc2626" strokeWidth={2} strokeDasharray="6 5" />
          </svg>
          {[0, 1, 2].map((i) => (
            <Plus key={i} x={cx} y={(ys[i] + 84 + ys[i + 1]) / 2} />
          ))}
          <Node x={x} y={ys[0]} icon="clock" color="#7c3aed" soft="#f3eefe" kind="TRIGGER" title="Every day at 8:00 AM" sub="Schedule · Asia/Manila time" />
          <Node x={x} y={ys[1]} icon="database" color="#16a34a" soft="#e8f7ee" kind="SUPABASE · QUERY" title="Find bills due in 3 days" sub="bills where status = 'unpaid'" />
          <Node x={x} y={ys[2]} icon="repeat" color="#2563eb" soft="#e8f0fe" kind="LOOP" title="For each bill" sub="18 items in the last run" />
          <Node x={x} y={ys[3]} icon="mail" color="#7c3aed" soft="#f3eefe" kind="EMAIL" title="Send reminder email" sub="Template: rent-reminder → tenant" selected />
          <span style={{ position: "absolute", left: 250, top: ys[3] + 96, fontSize: 12.5, fontWeight: 700, color: "#15803d", background: "#dcfce7", padding: "2px 8px", borderRadius: 6 }}>sent</span>
          <span style={{ position: "absolute", left: 590, top: ys[3] + 96, fontSize: 12.5, fontWeight: 700, color: "#b91c1c", background: "#fee2e2", padding: "2px 8px", borderRadius: 6 }}>failed</span>
          <Node x={40} y={560} w={380} icon="table" color="#0891b2" soft="#e0f6fb" kind="SUPABASE · INSERT" title="Log to automation_logs" sub="job, bill_id, sent_at" />
          <Node x={476} y={560} w={380} icon="alertTriangle" color="#dc2626" soft="#fee2e2" kind="ON FAILURE" title="Retry 3 times, then alert" sub="Notify the admin by email" />
          <div style={{ position: "absolute", left: 24, bottom: 24, display: "flex", gap: 8, padding: 6, borderRadius: 12, background: "#fff", border: `1px solid ${ink.border}` }}>
            {["plus", "minus", "grid"].map((i) => (
              <span key={i} style={{ width: 34, height: 34, borderRadius: 8, display: "grid", placeItems: "center", color: ink.muted }}>
                <Icon name={i} size={17} />
              </span>
            ))}
          </div>
          <div style={{ position: "absolute", right: 24, bottom: 24, display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 10, background: "#fff", border: `1px solid ${ink.border}`, fontSize: 13.5, color: ink.muted }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: ink.green }} /> Last run today 8:00 AM · 18 sent · 3.8 s
          </div>
        </div>

        <div style={{ background: "#fff", borderLeft: `1px solid ${ink.border}`, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <IconTile icon="mail" color={au.color} soft={au.soft} size={40} />
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontWeight: 750, fontSize: 17 }}>Send reminder email</div>
              <div style={{ fontSize: 13, color: ink.muted }}>Step 4 of 6</div>
            </div>
          </div>
          {[
            ["Connection", "Email (SMTP) · billing office"],
            ["To", <span style={{ fontFamily: mono, fontSize: 13.5, color: au.dark }}>{"{{bill.tenant.email}}"}</span>],
            ["Subject", <span>Rent reminder: ₱<span style={{ fontFamily: mono, fontSize: 13.5, color: au.dark }}>{"{{bill.total}}"}</span> due <span style={{ fontFamily: mono, fontSize: 13.5, color: au.dark }}>{"{{bill.due_date}}"}</span></span>],
            ["Template", "rent-reminder"],
          ].map(([l, v]) => (
            <div key={l as string}>
              <div style={{ fontSize: 13, fontWeight: 650, color: ink.body, marginBottom: 6 }}>{l}</div>
              <div style={{ minHeight: 42, borderRadius: 10, border: `1.5px solid ${ink.border}`, display: "flex", alignItems: "center", padding: "6px 12px", fontSize: 14.5 }}>{v}</div>
            </div>
          ))}
          <div style={{ borderRadius: 12, border: `1px solid ${ink.border}`, padding: 14, background: ink.bg, fontSize: 13.5, lineHeight: 1.55, color: ink.body }}>
            Hi <span style={{ fontFamily: mono, color: au.dark }}>{"{{tenant.first_name}}"}</span>, your <span style={{ fontFamily: mono, color: au.dark }}>{"{{bill.month}}"}</span> bill is due in 3 days. Pay online or at the office.
          </div>
          <div style={{ display: "grid", gap: 12, fontSize: 14, color: ink.body }}>
            {[
              ["Attach the bill as a PDF", true],
              ["Send a copy to the office", false],
              ["Skip tenants who already paid", true],
            ].map(([l, on]) => (
              <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Toggle on={on as boolean} color={au.color} /> {l}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", fontSize: 13, color: ink.muted }}>Limit: 10 emails per minute · retries 3×</div>
        </div>
      </div>
    </AppShell>
  );
};

/* ------------------------------------------------------------------ */
type Run = [id: string, flow: string, started: string, took: string, result: "Success" | "Retried" | "Failed", note?: string];
const runs: Run[] = [
  ["#4821", "Rent reminders", "Today 8:00 AM", "3.8 s", "Success", "18 sent"],
  ["#4820", "Spreadsheet import", "Today 7:45 AM", "1.2 s", "Success", "4 rows"],
  ["#4819", "Spreadsheet import", "Today 7:30 AM", "6.1 s", "Retried", "timeout"],
  ["#4818", "Low-stock alerts", "Today 7:00 AM", "0.9 s", "Success", "2 alerts"],
  ["#4817", "Nightly backup", "Today 2:00 AM", "42 s", "Success", "48 MB"],
  ["#4816", "Appointment reminders", "Yesterday 5:00 PM", "4.4 s", "Success", "22 sent"],
  ["#4815", "Website inquiries", "Yesterday 3:18 PM", "0.6 s", "Success", "1 saved"],
  ["#4814", "Rent reminders", "Yesterday 8:00 AM", "3.1 s", "Success", "15 sent"],
  ["#4813", "Spreadsheet import", "Yesterday 7:45 AM", "—", "Failed", "no access"],
];
const resultTone = { Success: "green", Retried: "amber", Failed: "red" } as const;

export const AuRuns: React.FC = () => (
  <AppShell
    brand={au}
    nav={nav}
    active="Runs"
    user={admin}
    title="Run history"
    subtitle="All workflows · last 7 days"
    search="Search runs…"
    actions={
      <>
        <Btn variant="outline" icon="filter">All workflows</Btn>
        <Btn variant="outline" icon="download">Export log</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "1fr 470px", gap: 20 }}>
      <Card pad={18}>
        <Table
          rowH={58}
          highlight={0}
          cols={[
            { label: "Run", w: 64 },
            { label: "Workflow" },
            { label: "Started", w: 150 },
            { label: "Took", w: 56, align: "right" },
            { label: "Result", w: 150 },
          ]}
          rows={runs.map(([id, flow, started, took, result, note]) => [
            <span style={{ fontFamily: mono, fontSize: 13.5, color: ink.muted }}>{id}</span>,
            <b style={{ fontWeight: 600 }}>{flow}</b>,
            <span style={{ color: ink.body, fontSize: 14 }}>{started}</span>,
            <span style={{ fontFamily: mono, fontSize: 13.5 }}>{took}</span>,
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Badge tone={resultTone[result]} dot>
                {result}
              </Badge>
              <span style={{ fontSize: 12.5, color: ink.muted }}>{note}</span>
            </span>,
          ])}
        />
      </Card>

      <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
        <Card title="Run #4821 · Rent reminders" action={<Badge tone="green" dot>Success</Badge>}>
          {[
            ["clock", "Trigger: daily at 8:00 AM", "8:00:00 AM"],
            ["database", "Found 18 bills due on Dec 5", "0.21 s"],
            ["mail", "Sent 18 reminder emails", "3.42 s"],
            ["table", "Logged 18 results", "0.12 s"],
          ].map(([i, t, d], n) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderTop: n ? `1px solid ${ink.line}` : "none" }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", background: ink.greenSoft, display: "grid", placeItems: "center" }}>
                <Icon name="check" size={14} color={ink.green} stroke={3} />
              </span>
              <Icon name={i} size={17} color={ink.muted} />
              <span style={{ fontSize: 14.5 }}>{t}</span>
              <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 13, color: ink.muted }}>{d}</span>
            </div>
          ))}
        </Card>

        <Card title="Email sent to Maria Santos" action={<span style={{ fontSize: 13, color: ink.muted }}>8:00 AM</span>} pad={20}>
          <div style={{ borderRadius: 12, border: `1px solid ${ink.border}`, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", background: ink.bg, borderBottom: `1px solid ${ink.border}`, fontSize: 13.5, color: ink.muted, lineHeight: 1.6 }}>
              From: <b style={{ color: ink.text }}>Sample Residences · Billing</b>
              <br />
              Subject: <b style={{ color: ink.text }}>Rent reminder: {peso(9350)} due Dec 5</b>
            </div>
            <div style={{ padding: 16, fontSize: 14.5, lineHeight: 1.6, color: ink.body }}>
              Hi Maria,
              <br />
              Your December bill for Unit 204 is due on <b>Friday, Dec 5</b>.
              <div style={{ margin: "10px 0", padding: "10px 12px", borderRadius: 10, background: ink.bg, display: "grid", gap: 3, fontSize: 14 }}>
                {[
                  ["Rent", 8000],
                  ["Water", 420],
                  ["Electricity", 930],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: "flex" }}>
                    <span style={{ color: ink.muted }}>{l}</span>
                    <span style={{ marginLeft: "auto" }}>{peso(v as number)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", fontWeight: 800, color: ink.text, borderTop: `1px solid ${ink.border}`, paddingTop: 4, marginTop: 2 }}>
                  <span>Total</span>
                  <span style={{ marginLeft: "auto" }}>{peso(9350)}</span>
                </div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", height: 38, padding: "0 16px", borderRadius: 10, background: "#0d9488", color: "#fff", fontWeight: 700, fontSize: 14 }}>View and pay your bill</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
export const AU_CODE = `import { createClient } from "npm:@supabase/supabase-js@2";
import { addDays, formatDate, reminderEmail, sendEmail, today } from "../_shared/mail.ts";

// Scheduled with pg_cron: every day at 8:00 AM (Asia/Manila)
Deno.serve(async () => {
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const { data: bills } = await db
    .from("bills")
    .select("id, total, due_date, tenant:profiles(full_name, email)")
    .eq("status", "unpaid")
    .eq("due_date", addDays(today(), 3))
    .throwOnError();

  let sent = 0;
  for (const bill of bills) {
    const ok = await sendEmail({
      to: bill.tenant.email,
      subject: \`Rent reminder: ₱\${bill.total} due \${formatDate(bill.due_date)}\`,
      html: reminderEmail(bill),
    });
    await db.from("automation_logs").insert({ job: "rent-reminders", bill_id: bill.id, ok });
    if (ok) sent++;
  }
  return Response.json({ sent, total: bills.length });
});`;

export const AuCode: React.FC = () => (
  <CodeEditor
    project="automations"
    file="index.ts"
    path={["supabase", "functions", "send-reminders", "index.ts"]}
    lang="ts"
    code={AU_CODE}
    highlightLine={18}
    tabs={["index.ts", "mail.ts", "schedule.sql"]}
    tree={[
      { name: "automations", depth: 0, folder: true, open: true },
      { name: "supabase", depth: 1, folder: true, open: true },
      { name: "functions", depth: 2, folder: true, open: true },
      { name: "_shared", depth: 3, folder: true, open: true },
      { name: "mail.ts", depth: 4 },
      { name: "send-reminders", depth: 3, folder: true, open: true },
      { name: "index.ts", depth: 4, active: true, modified: true },
      { name: "index.test.ts", depth: 4 },
      { name: "low-stock-alerts", depth: 3, folder: true },
      { name: "sheet-import", depth: 3, folder: true },
      { name: "weekly-report", depth: 3, folder: true },
      { name: "migrations", depth: 2, folder: true, open: true },
      { name: "schedule.sql", depth: 3 },
      { name: "deno.json", depth: 1 },
      { name: "README.md", depth: 1 },
    ]}
    terminal={[
      { t: "$ deno test --allow-env --allow-net supabase/functions/send-reminders", c: "#e2e8f0" },
      { t: "running 3 tests from ./supabase/functions/send-reminders/index.test.ts", c: "#c3cede" },
      { t: "only emails bills due in exactly 3 days ... ok (16ms)", c: "#addb67" },
      { t: "logs every email, sent or failed ... ok (8ms)", c: "#addb67" },
      { t: "skips bills that are already paid ... ok (5ms)", c: "#addb67" },
      { t: "ok | 3 passed | 0 failed (97ms)", c: "#addb67" },
    ]}
  />
);
