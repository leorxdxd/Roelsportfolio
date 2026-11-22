// IT Helpdesk & Ticketing System — sample data only.
import React from "react";
import { AppShell, Avatar, Badge, Bar, Brand, Btn, Card, Donut, Field, Icon, ink, LineChart, Screen, Stat, Table, Toggle, mono } from "./kit";
import { CodeEditor } from "./code";

export const hd: Brand = { name: "HelpDesk", color: "#2563eb", soft: "#eaf1ff", dark: "#1d4ed8", icon: "ticket" };

const adminNav = [
  { icon: "home", label: "Dashboard" },
  { icon: "ticket", label: "Tickets", badge: 18 },
  { icon: "plus", label: "New ticket" },
  { icon: "chart", label: "Reports" },
  { icon: "users", label: "Users", section: "Admin" },
  { icon: "layers", label: "Categories" },
  { icon: "settings", label: "Settings" },
];
const admin = { name: "Mark Bautista", role: "IT Administrator", color: "#334155" };

const prio = (p: "High" | "Medium" | "Low") => <Badge tone={p === "High" ? "red" : p === "Medium" ? "amber" : "gray"}>{p}</Badge>;
const status = (s: "New" | "In progress" | "Closed") => (
  <Badge tone={s === "New" ? "blue" : s === "In progress" ? "amber" : "green"} dot>
    {s}
  </Badge>
);
const person = (name: string, sub?: string) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <Avatar name={name} size={30} />
    <div style={{ lineHeight: 1.25, minWidth: 0 }}>
      <div style={{ fontWeight: 550 }}>{name}</div>
      {sub && <div style={{ fontSize: 12.5, color: ink.muted }}>{sub}</div>}
    </div>
  </div>
);

const categories = [
  { label: "Network", value: 34, color: "#2563eb" },
  { label: "Computer & AV", value: 24, color: "#7c3aed" },
  { label: "Printer", value: 22, color: "#0d9488" },
  { label: "LMS", value: 12, color: "#ea580c" },
  { label: "Database", value: 8, color: "#94a3b8" },
];

/* ------------------------------------------------------------------ */
export const HdDashboard: React.FC = () => (
  <AppShell
    brand={hd}
    nav={adminNav}
    active="Dashboard"
    user={admin}
    title="Dashboard"
    subtitle="Sample School · IT Office"
    actions={
      <>
        <Btn variant="outline" icon="calendar">This month</Btn>
        <Btn icon="plus">New ticket</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
      <Stat label="Open tickets" value={18} delta="3 this week" good={false} icon="ticket" color="#2563eb" soft="#eaf1ff" />
      <Stat label="In progress" value={7} icon="refresh" color="#b45309" soft="#fef3c7" />
      <Stat label="Closed this month" value={126} delta="12%" icon="checkCircle" color="#16a34a" soft="#dcfce7" />
      <Stat label="Avg. first response" value="14m" delta="4m" up={false} icon="clock" color="#7c3aed" soft="#ede9fe" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 20, marginTop: 20 }}>
      <Card
        title="Tickets this month"
        action={
          <div style={{ display: "flex", gap: 16, fontSize: 13, color: ink.muted }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 3, background: "#2563eb", borderRadius: 2 }} /> Created
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 3, background: "#16a34a", borderRadius: 2 }} /> Closed
            </span>
          </div>
        }
      >
        <LineChart
          w={820}
          h={250}
          max={40}
          labels={["Mar 1", "Mar 4", "Mar 7", "Mar 10", "Mar 13", "Mar 16", "Mar 19", "Mar 22", "Mar 25", "Mar 28"]}
          series={[
            { color: "#2563eb", values: [14, 18, 15, 24, 21, 27, 23, 31, 26, 33], fill: true },
            { color: "#16a34a", values: [10, 15, 16, 19, 22, 23, 25, 27, 28, 30] },
          ]}
        />
      </Card>
      <Card title="By category" action={<span style={{ fontSize: 13, color: ink.muted }}>151 tickets</span>}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Donut size={150} thickness={22} segments={categories}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>151</div>
              <div style={{ fontSize: 12.5, color: ink.muted }}>this month</div>
            </div>
          </Donut>
          <div style={{ display: "grid", gap: 11, flex: 1 }}>
            {categories.map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, whiteSpace: "nowrap" }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: c.color }} />
                <span style={{ color: ink.body }}>{c.label}</span>
                <span style={{ marginLeft: "auto", fontWeight: 650 }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 20, marginTop: 20 }}>
      <Card title="Recent tickets" action={<span style={{ fontSize: 14, fontWeight: 650, color: hd.color }}>View all</span>} pad={18}>
        <Table
          rowH={54}
          cols={[{ label: "ID", w: 70 }, { label: "Subject" }, { label: "Requester", w: 190 }, { label: "Priority", w: 90 }, { label: "Status", w: 130 }]}
          rows={[
            [<b style={{ color: ink.muted }}>#1042</b>, <b>Projector not working in Room 204</b>, person("Juan Dela Cruz"), prio("High"), status("New")],
            [<b style={{ color: ink.muted }}>#1041</b>, "Wi-Fi keeps dropping in the library", person("Maria Santos"), prio("Medium"), status("In progress")],
            [<b style={{ color: ink.muted }}>#1040</b>, "Registrar printer shows paper jam", person("Pedro Reyes"), prio("Low"), status("In progress")],
            [<b style={{ color: ink.muted }}>#1039</b>, "Can't log in to the LMS", person("Ana Cruz"), prio("Medium"), status("New")],
          ]}
        />
      </Card>
      <Card title="Technician workload">
        <div style={{ display: "grid", gap: 16 }}>
          {[
            ["Ana Lim", 6, 75],
            ["Mark Bautista", 4, 50],
            ["Carlo Ramos", 3, 38],
            ["Grace Tan", 2, 25],
          ].map(([n, open, pct]) => (
            <div key={n as string}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Avatar name={n as string} size={28} />
                <span style={{ fontWeight: 550, fontSize: 14 }}>{n}</span>
                <span style={{ marginLeft: "auto", fontSize: 13, color: ink.muted }}>{open} open</span>
              </div>
              <Bar value={pct as number} color={hd.color} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
const ticketRows: [string, string, string, string, "High" | "Medium" | "Low", string, "New" | "In progress" | "Closed", string][] = [
  ["#1042", "Projector not working in Room 204", "Juan Dela Cruz", "Computer & AV", "High", "", "New", "2m ago"],
  ["#1041", "Wi-Fi keeps dropping in the library", "Maria Santos", "Network", "Medium", "Ana Lim", "In progress", "18m ago"],
  ["#1040", "Registrar printer shows paper jam", "Pedro Reyes", "Printer", "Low", "Carlo Ramos", "In progress", "41m ago"],
  ["#1039", "Can't log in to the LMS", "Ana Cruz", "LMS", "Medium", "Mark Bautista", "New", "1h ago"],
  ["#1038", "Lab 3 PC won't boot", "Jose Garcia", "Computer & AV", "High", "Ana Lim", "In progress", "2h ago"],
  ["#1037", "Grade encoding page loads slowly", "Liza Mendoza", "Database", "Medium", "Mark Bautista", "In progress", "3h ago"],
  ["#1036", "New faculty email account", "Grace Villanueva", "Network", "Low", "Carlo Ramos", "Closed", "Yesterday"],
  ["#1035", "Install software in Lab 2", "Ramon Aquino", "Computer & AV", "Low", "Ana Lim", "Closed", "Yesterday"],
  ["#1034", "Accounting shared drive not mapping", "Carmen Lopez", "Network", "Medium", "Mark Bautista", "Closed", "Mar 8"],
  ["#1033", "Update antivirus on admin PCs", "Ramon Aquino", "Computer & AV", "Low", "Carlo Ramos", "Closed", "Mar 8"],
  ["#1032", "Enrollment report export times out", "Liza Mendoza", "Database", "High", "Mark Bautista", "Closed", "Mar 7"],
];

const Check: React.FC<{ on?: boolean }> = ({ on }) => (
  <span style={{ width: 18, height: 18, borderRadius: 5, display: "grid", placeItems: "center", border: `1.5px solid ${on ? hd.color : "#cbd5e1"}`, background: on ? hd.color : "#fff" }}>
    {on && <Icon name="check" size={12} color="#fff" stroke={3.2} />}
  </span>
);

export const HdTickets: React.FC = () => (
  <AppShell
    brand={hd}
    nav={adminNav}
    active="Tickets"
    user={admin}
    title="Tickets"
    subtitle="18 new · 7 in progress · 126 closed this month"
    actions={
      <>
        <Btn variant="outline" icon="download">Export</Btn>
        <Btn icon="plus">New ticket</Btn>
      </>
    }
  >
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
      {[
        ["All", 151],
        ["New", 18],
        ["In progress", 7],
        ["Closed", 126],
        ["Assigned to me", 5],
      ].map(([l, n], i) => (
        <div
          key={l as string}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 10,
            fontSize: 14.5,
            fontWeight: i === 0 ? 650 : 550,
            background: i === 0 ? "#fff" : "transparent",
            border: i === 0 ? `1px solid ${ink.border}` : "1px solid transparent",
            boxShadow: i === 0 ? "0 1px 2px rgba(15,23,42,0.06)" : "none",
            color: i === 0 ? ink.text : ink.muted,
          }}
        >
          {l}
          <span style={{ fontSize: 12, fontWeight: 700, padding: "0 7px", borderRadius: 999, background: i === 0 ? hd.soft : ink.graySoft, color: i === 0 ? hd.dark : ink.muted }}>{n}</span>
        </div>
      ))}
      <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
        {["Category", "Priority", "Assignee"].map((f) => (
          <Btn key={f} variant="outline" size="sm">
            {f} <Icon name="chevronDown" size={14} color={ink.muted} />
          </Btn>
        ))}
        <Btn variant="outline" size="sm" icon="filter">More filters</Btn>
      </div>
    </div>
    <Card pad={10} style={{ position: "relative" }}>
      <Table
        rowH={57}
        highlight={0}
        cols={[
          { label: "", w: 18 },
          { label: "ID", w: 62 },
          { label: "Subject" },
          { label: "Category", w: 170 },
          { label: "Priority", w: 86 },
          { label: "Assignee", w: 170 },
          { label: "Status", w: 126 },
          { label: "Updated", w: 86, align: "right" },
        ]}
        rows={ticketRows.map(([id, subj, who, cat, p, tech, s, when], i) => [
          <Check on={i === 1 || i === 2} />,
          <span style={{ color: ink.muted, fontWeight: 600 }}>{id}</span>,
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>{subj}</div>
            <div style={{ fontSize: 12.5, color: ink.muted }}>{who}</div>
          </div>,
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            {cat}
            {i === 0 && (
              <span title="Suggested automatically" style={{ display: "inline-flex", color: hd.color }}>
                <Icon name="sparkle" size={14} fill={hd.soft} />
              </span>
            )}
          </span>,
          prio(p),
          tech ? person(tech) : <span style={{ color: ink.subtle, border: `1.5px dashed ${ink.border}`, borderRadius: 8, padding: "3px 10px", fontSize: 13 }}>Unassigned</span>,
          status(s),
          <span style={{ color: ink.muted, fontSize: 13.5 }}>{when}</span>,
        ])}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 18,
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "10px 12px 10px 18px",
          borderRadius: 14,
          background: ink.text,
          color: "#fff",
          fontSize: 14,
          boxShadow: "0 20px 40px -12px rgba(15,23,42,0.5)",
        }}
      >
        <b>2 selected</b>
        <span style={{ width: 1, height: 20, background: "#334155" }} />
        {["Assign", "Change status", "Merge"].map((a) => (
          <span key={a} style={{ padding: "6px 12px", borderRadius: 8, background: "#1e293b" }}>
            {a}
          </span>
        ))}
        <span style={{ padding: "6px 12px", borderRadius: 8, background: hd.color, fontWeight: 650 }}>Close tickets</span>
      </div>
    </Card>
    <div style={{ display: "flex", alignItems: "center", marginTop: 14, fontSize: 14, color: ink.muted }}>
      Showing 1–11 of 151
      <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
        {["‹", "1", "2", "3", "…", "14", "›"].map((p, i) => (
          <span key={i} style={{ minWidth: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center", fontWeight: 600, background: p === "1" ? hd.color : "#fff", color: p === "1" ? "#fff" : ink.body, border: p === "1" ? "none" : `1px solid ${ink.border}` }}>
            {p}
          </span>
        ))}
      </span>
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
const Msg: React.FC<{ name: string; role: string; time: string; children: React.ReactNode; note?: boolean; attach?: string }> = ({ name, role, time, children, note, attach }) => (
  <div style={{ display: "flex", gap: 14 }}>
    <Avatar name={name} size={38} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
        <b>{name}</b>
        <span style={{ color: ink.muted }}>{role}</span>
        {note && <Badge tone="amber">Internal note</Badge>}
        <span style={{ marginLeft: "auto", color: ink.subtle, fontSize: 13 }}>{time}</span>
      </div>
      <div
        style={{
          marginTop: 8,
          padding: "14px 16px",
          borderRadius: 12,
          background: note ? "#fffbeb" : "#fff",
          border: `1px solid ${note ? "#fde68a" : ink.border}`,
          fontSize: 15,
          lineHeight: 1.55,
          color: ink.body,
        }}
      >
        {children}
        {attach && (
          <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: 8, marginTop: 12, padding: "8px 12px", borderRadius: 10, background: ink.bg, border: `1px solid ${ink.border}`, fontSize: 13.5, color: ink.text }}>
            <Icon name="image" size={16} color={ink.muted} /> {attach} <span style={{ color: ink.subtle }}>· 1.2 MB</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Prop: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: "flex", alignItems: "center", minHeight: 40, fontSize: 14.5 }}>
    <span style={{ width: 110, color: ink.muted }}>{label}</span>
    <span style={{ flex: 1, minWidth: 0 }}>{children}</span>
  </div>
);

export const HdTicket: React.FC = () => (
  <AppShell
    brand={hd}
    nav={adminNav}
    active="Tickets"
    user={admin}
    title={
      <span>
        <span style={{ color: ink.muted }}>#1042 · </span>Projector not working in Room 204
      </span>
    }
    subtitle="Opened by Juan Dela Cruz (Faculty) · Today, 10:42 AM"
    actions={
      <>
        <Btn variant="outline" icon="check">Close ticket</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
        <Msg name="Juan Dela Cruz" role="Faculty" time="10:42 AM" attach="room204-projector.jpg">
          Good morning. The projector in Room 204 shows “No signal” even when my laptop is connected. I tried another HDMI cable. I have a class there at 1:00 PM.
        </Msg>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 52, fontSize: 13.5, color: ink.muted }}>
          <span style={{ display: "inline-flex", color: hd.color }}>
            <Icon name="sparkle" size={16} fill={hd.soft} />
          </span>
          Category set to <b style={{ color: ink.body }}>Computer & AV</b> and priority to <b style={{ color: ink.body }}>High</b> by automatic triage
          <span style={{ color: ink.subtle }}>· 10:42 AM</span>
        </div>
        <Msg name="Mark Bautista" role="IT Administrator" time="10:47 AM" note>
          Assigned to Ana. Probably the HDMI switcher again; there's a spare in the IT room cabinet.
        </Msg>
        <Msg name="Ana Lim" role="IT Staff" time="11:05 AM">
          Hi Juan, I replaced the HDMI switcher and tested it with a laptop. The projector works now. Please reply here if it happens again before your class.
        </Msg>
        <Msg name="Juan Dela Cruz" role="Faculty" time="11:20 AM">
          It's working now. Thank you for the quick fix!
        </Msg>
        <div style={{ marginTop: "auto", border: `1.5px solid ${hd.color}`, boxShadow: `0 0 0 4px ${hd.color}18`, borderRadius: 14, background: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 16px", borderBottom: `1px solid ${ink.line}`, color: ink.muted }}>
            {["bold", "italic", "list", "link", "paperclip"].map((n) => (
              <Icon key={n} name={n} size={17} />
            ))}
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
              Internal note <Toggle on={false} />
            </span>
          </div>
          <div style={{ padding: "14px 16px", fontSize: 15, color: ink.body, height: 62 }}>
            Glad it's working, Juan. I'll close this after your 1:00 PM class if there are no more issues.<span style={{ borderLeft: `2px solid ${hd.color}`, marginLeft: 1 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "0 12px 12px" }}>
            <Btn variant="outline" size="sm">Use a template</Btn>
            <Btn size="sm" icon="send">Send reply</Btn>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
        <Card title="Details">
          <Prop label="Status">{status("In progress")}</Prop>
          <Prop label="Priority">{prio("High")}</Prop>
          <Prop label="Category">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Computer & AV <Badge tone="blue">Auto</Badge>
            </span>
          </Prop>
          <Prop label="Assignee">{person("Ana Lim")}</Prop>
          <Prop label="Department">Faculty · Room 204</Prop>
          <div style={{ marginTop: 14, padding: 14, borderRadius: 12, background: ink.bg }}>
            <div style={{ display: "flex", fontSize: 13.5, marginBottom: 8 }}>
              <span style={{ color: ink.muted }}>Response target</span>
              <b style={{ marginLeft: "auto", color: ink.green }}>Met · 23 min</b>
            </div>
            <Bar value={38} color={ink.green} />
            <div style={{ display: "flex", fontSize: 13.5, margin: "12px 0 8px" }}>
              <span style={{ color: ink.muted }}>Resolution due</span>
              <b style={{ marginLeft: "auto" }}>in 3h 15m</b>
            </div>
            <Bar value={52} color={hd.color} />
          </div>
        </Card>
        <Card title="Activity">
          {[
            ["10:42", "Ticket created by Juan Dela Cruz"],
            ["10:42", "Categorized as Computer & AV"],
            ["10:47", "Assigned to Ana Lim"],
            ["10:50", "Status changed to In progress"],
            ["11:05", "Reply sent to requester"],
            ["11:20", "Requester replied"],
          ].map(([t, e], i, arr) => (
            <div key={i} style={{ display: "flex", gap: 14, fontSize: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: i === arr.length - 1 ? hd.color : "#cbd5e1", marginTop: 5 }} />
                {i < arr.length - 1 && <span style={{ width: 2, flex: 1, background: ink.line, minHeight: 22 }} />}
              </div>
              <div style={{ paddingBottom: 12 }}>
                <span style={{ color: ink.body }}>{e}</span>
                <div style={{ fontSize: 12.5, color: ink.subtle }}>{t} AM</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
const staffNav = [
  { icon: "home", label: "Home" },
  { icon: "ticket", label: "My tickets", badge: 2 },
  { icon: "plus", label: "New ticket" },
  { icon: "book", label: "Help articles" },
];

export const HdNewTicket: React.FC = () => (
  <AppShell brand={hd} nav={staffNav} active="New ticket" user={{ name: "Juan Dela Cruz", role: "Faculty" }} title="New ticket" subtitle="Tell the IT office what's wrong. You'll get updates by email.">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
      <Card pad={28}>
        <div style={{ display: "grid", gap: 20 }}>
          <Field label="Subject" focus={hd.color}>
            Projector not working in Room 204<span style={{ borderLeft: `2px solid ${hd.color}`, height: 20, marginLeft: -8 }} />
          </Field>
          <Field label="Description" h={132}>
            <span style={{ lineHeight: 1.6, color: ink.body }}>
              The projector shows “No signal” even when my laptop is connected. I tried another HDMI cable. I have a class in Room 204 at 1:00 PM.
            </span>
          </Field>
          <div style={{ display: "flex", gap: 14, padding: "16px 18px", borderRadius: 12, background: hd.soft, border: `1px solid #c7d8fe` }}>
            <span style={{ display: "inline-flex", color: hd.color, marginTop: 2 }}>
              <Icon name="sparkle" size={20} fill="#fff" />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Suggested category: Computer & AV · Priority: High</div>
              <div style={{ fontSize: 13.5, color: ink.body, marginTop: 3 }}>Based on your description and similar tickets. You can change it below.</div>
            </div>
            <Btn size="sm">Use suggestion</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <Field label="Category">
              Computer & AV <span style={{ marginLeft: "auto", color: ink.muted, display: "inline-flex" }}><Icon name="chevronDown" size={16} /></span>
            </Field>
            <Field label="Priority">
              <Badge tone="red">High</Badge> <span style={{ marginLeft: "auto", color: ink.muted, display: "inline-flex" }}><Icon name="chevronDown" size={16} /></span>
            </Field>
            <Field label="Location">Room 204</Field>
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 650, color: ink.body, marginBottom: 8 }}>Who is affected?</div>
            <div style={{ display: "flex", gap: 10 }}>
              {["Just me", "My class or room", "My whole department"].map((o, i) => (
                <span key={o} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 10, fontSize: 14.5, border: `1.5px solid ${i === 1 ? hd.color : ink.border}`, background: i === 1 ? hd.soft : "#fff", color: i === 1 ? hd.dark : ink.body, fontWeight: i === 1 ? 650 : 500 }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${i === 1 ? hd.color : "#cbd5e1"}`, display: "grid", placeItems: "center" }}>
                    {i === 1 && <span style={{ width: 8, height: 8, borderRadius: "50%", background: hd.color }} />}
                  </span>
                  {o}
                </span>
              ))}
            </div>
          </div>
          <Field label="Attachments" h={64}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 8, background: ink.bg, border: `1px solid ${ink.border}`, fontSize: 13.5 }}>
                <Icon name="image" size={15} color={ink.muted} /> room204-projector.jpg
              </span>
              <span style={{ color: ink.muted, fontSize: 14 }}>
                or <b style={{ color: hd.color }}>browse files</b>
              </span>
            </div>
          </Field>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 4 }}>
            <Btn variant="outline">Save draft</Btn>
            <Btn icon="send">Submit ticket</Btn>
          </div>
        </div>
      </Card>
      <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
        <Card title="Your open tickets">
          {[
            ["#1031", "Classroom speaker crackling", "In progress"],
            ["#1018", "Request: second monitor", "New"],
          ].map(([id, t, s]) => (
            <div key={id} style={{ padding: "12px 0", borderTop: `1px solid ${ink.line}` }}>
              <div style={{ fontSize: 13, color: ink.muted }}>{id}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 600, fontSize: 14.5 }}>{t}</span>
                <span style={{ marginLeft: "auto" }}>{status(s as "New" | "In progress")}</span>
              </div>
            </div>
          ))}
        </Card>
        <Card title="Help articles" action={<span style={{ fontSize: 13.5, fontWeight: 650, color: hd.color }}>View all</span>}>
          {[
            ["Projector shows “No signal”", "2 min read"],
            ["Connect to the campus Wi-Fi", "3 min read"],
            ["Reset your LMS password", "1 min read"],
          ].map(([t, m]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: `1px solid ${ink.line}` }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: hd.soft, display: "grid", placeItems: "center", color: hd.color }}>
                <Icon name="book" size={17} />
              </span>
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{t}</div>
                <div style={{ fontSize: 12.5, color: ink.muted }}>{m}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card title="Before you submit">
          {["Restart the device once", "Check cables and power", "Note any error message"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", fontSize: 14.5, color: ink.body }}>
              <Icon name="checkCircle" size={18} color={ink.green} /> {t}
            </div>
          ))}
        </Card>
      </div>
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
type Col = [string, string, ("pk" | "fk")?];
type TableDef = { name: string; x: number; y: number; color: string; cols: Col[] };
const T: Record<string, TableDef> = {
  users: { name: "users", x: 70, y: 150, color: "#2563eb", cols: [["id", "int", "pk"], ["name", "varchar(120)"], ["email", "varchar(160)"], ["role", "enum"], ["department_id", "int", "fk"], ["skills", "set"], ["created_at", "datetime"]] },
  departments: { name: "departments", x: 70, y: 620, color: "#64748b", cols: [["id", "int", "pk"], ["name", "varchar(80)"], ["building", "varchar(80)"]] },
  tickets: { name: "tickets", x: 600, y: 210, color: "#7c3aed", cols: [["id", "int", "pk"], ["subject", "varchar(200)"], ["description", "text"], ["category_id", "int", "fk"], ["priority", "enum"], ["status", "enum"], ["requester_id", "int", "fk"], ["assigned_to", "int", "fk"], ["created_at", "datetime"], ["closed_at", "datetime"]] },
  categories: { name: "categories", x: 1150, y: 110, color: "#0d9488", cols: [["id", "int", "pk"], ["name", "varchar(80)"], ["sla_hours", "int"]] },
  comments: { name: "ticket_comments", x: 1150, y: 370, color: "#ea580c", cols: [["id", "int", "pk"], ["ticket_id", "int", "fk"], ["user_id", "int", "fk"], ["body", "text"], ["is_internal", "boolean"], ["created_at", "datetime"]] },
  notifications: { name: "notifications", x: 1150, y: 690, color: "#0891b2", cols: [["id", "int", "pk"], ["user_id", "int", "fk"], ["ticket_id", "int", "fk"], ["message", "varchar(255)"], ["read_at", "datetime"]] },
  attachments: { name: "attachments", x: 600, y: 700, color: "#db2777", cols: [["id", "int", "pk"], ["ticket_id", "int", "fk"], ["file_path", "varchar(255)"], ["uploaded_by", "int", "fk"]] },
};
const TW = 330;
const rowY = (t: TableDef, col: string) => t.y + 46 + t.cols.findIndex((c) => c[0] === col) * 32 + 16;

const rels: [string, string, string, string][] = [
  ["users", "department_id", "departments", "id"],
  ["tickets", "requester_id", "users", "id"],
  ["tickets", "assigned_to", "users", "id"],
  ["tickets", "category_id", "categories", "id"],
  ["comments", "ticket_id", "tickets", "id"],
  ["attachments", "ticket_id", "tickets", "id"],
  ["notifications", "ticket_id", "tickets", "id"],
];

export const HdSchema: React.FC = () => (
  <Screen bg="#f8fafc">
    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#d5dce6 1.2px, transparent 1.2px)", backgroundSize: "22px 22px" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 58, display: "flex", alignItems: "center", gap: 14, padding: "0 24px", background: "#fff", borderBottom: `1px solid ${ink.border}` }}>
      <Icon name="database" size={20} color={hd.color} />
      <b style={{ fontSize: 16 }}>helpdesk</b>
      <span style={{ color: ink.subtle }}>/</span>
      <span style={{ color: ink.muted }}>Database schema (MySQL)</span>
      <span style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
        <Badge tone="green" dot>
          7 tables · 7 relations
        </Badge>
        <Btn variant="outline" size="sm" icon="download">Export SQL</Btn>
        <span style={{ fontSize: 13.5, color: ink.muted, border: `1px solid ${ink.border}`, borderRadius: 8, padding: "5px 10px" }}>100%</span>
      </span>
    </div>
    <svg width={1600} height={1000} style={{ position: "absolute", inset: 0 }}>
      {rels.map(([from, fcol, to, tcol], i) => {
        const a = T[from];
        const b = T[to];
        const y1 = rowY(a, fcol);
        const y2 = rowY(b, tcol);
        const leftToRight = a.x > b.x;
        const x1 = leftToRight ? a.x : a.x + TW;
        const x2 = leftToRight ? b.x + TW : b.x;
        const sameColumn = a.x === b.x;
        const d = sameColumn
          ? `M ${a.x + TW} ${y1} C ${a.x + TW + 70} ${y1}, ${b.x + TW + 70} ${y2}, ${b.x + TW} ${y2}`
          : `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="#94a3b8" strokeWidth={2} />
            <circle cx={sameColumn ? a.x + TW : x1} cy={y1} r={4.5} fill="#fff" stroke="#94a3b8" strokeWidth={2} />
            <circle cx={sameColumn ? b.x + TW : x2} cy={y2} r={4.5} fill="#94a3b8" />
          </g>
        );
      })}
    </svg>
    {Object.values(T).map((t) => (
      <div key={t.name} style={{ position: "absolute", left: t.x, top: t.y, width: TW, borderRadius: 12, background: "#fff", border: `1px solid ${ink.border}`, boxShadow: "0 10px 30px -14px rgba(15,23,42,0.25)", overflow: "hidden" }}>
        <div style={{ height: 46, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", borderTop: `4px solid ${t.color}`, borderBottom: `1px solid ${ink.line}`, fontWeight: 700, fontSize: 15.5 }}>
          <Icon name="grid" size={16} color={t.color} />
          {t.name}
        </div>
        {t.cols.map(([n, type, key]) => (
          <div key={n} style={{ height: 32, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", fontFamily: mono, fontSize: 13.5, borderBottom: `1px solid ${ink.line}` }}>
            <span style={{ width: 16, display: "inline-flex", color: key === "pk" ? "#d97706" : key === "fk" ? "#2563eb" : "transparent" }}>
              <Icon name="key" size={14} />
            </span>
            <span style={{ fontWeight: key === "pk" ? 700 : 500, color: ink.text }}>{n}</span>
            <span style={{ marginLeft: "auto", color: ink.subtle }}>{type}</span>
          </div>
        ))}
      </div>
    ))}
    <div style={{ position: "absolute", right: 24, bottom: 24, display: "flex", gap: 18, padding: "10px 16px", borderRadius: 10, background: "#fff", border: `1px solid ${ink.border}`, fontSize: 13, color: ink.muted }}>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "#d97706", display: "inline-flex" }}><Icon name="key" size={14} /></span> Primary key
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: "#2563eb", display: "inline-flex" }}><Icon name="key" size={14} /></span> Foreign key
      </span>
    </div>
  </Screen>
);

/* ------------------------------------------------------------------ */
const PHP = `<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/db.php';

/**
 * Give a new ticket to the technician with the fewest open
 * tickets in its category. Returns the technician id or null.
 */
function assignTicket(PDO $db, int $ticketId, string $category): ?int
{
    $stmt = $db->prepare(
        "SELECT u.id, COUNT(t.id) AS open_tickets
           FROM users u
           LEFT JOIN tickets t ON t.assigned_to = u.id
                AND t.status IN ('new', 'in_progress')
          WHERE u.role = 'technician'
            AND FIND_IN_SET(:category, u.skills)
          GROUP BY u.id ORDER BY open_tickets LIMIT 1"
    );
    $stmt->execute(['category' => $category]);
    $techId = $stmt->fetchColumn();

    if ($techId === false) {
        return null; // stays in the queue for an admin
    }

`;

export const HdCode: React.FC = () => (
  <CodeEditor
    project="helpdesk"
    file="assign.php"
    path={["helpdesk", "app", "tickets", "assign.php"]}
    lang="php"
    code={PHP}
    highlightLine={21}
    tabs={["assign.php", "create.php", "db.php"]}
    tree={[
      { name: "helpdesk", depth: 0, folder: true, open: true },
      { name: "app", depth: 1, folder: true, open: true },
      { name: "tickets", depth: 2, folder: true, open: true },
      { name: "assign.php", depth: 3, active: true, modified: true },
      { name: "create.php", depth: 3 },
      { name: "update.php", depth: 3 },
      { name: "reports", depth: 2, folder: true },
      { name: "users", depth: 2, folder: true },
      { name: "lib", depth: 1, folder: true, open: true },
      { name: "auth.php", depth: 2 },
      { name: "db.php", depth: 2 },
      { name: "notify.php", depth: 2 },
      { name: "public", depth: 1, folder: true },
      { name: "tests", depth: 1, folder: true, open: true },
      { name: "AssignTicketTest.php", depth: 2 },
      { name: "composer.json", depth: 1 },
      { name: "README.md", depth: 1 },
    ]}
    terminal={[
      { t: "$ ./vendor/bin/phpunit --testdox tests/AssignTicketTest.php", c: "#e2e8f0" },
      { t: "Assign Ticket", c: "#c3cede" },
      { t: " ✔ Assigns to the technician with the fewest open tickets", c: "#addb67" },
      { t: " ✔ Only considers technicians with the right skill", c: "#addb67" },
      { t: " ✔ Leaves the ticket unassigned when nobody matches", c: "#addb67" },
      { t: " ✔ Notifies the assigned technician", c: "#addb67" },
      { t: "OK (4 tests, 11 assertions)", c: "#addb67" },
    ]}
  />
);
