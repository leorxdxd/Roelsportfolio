// MiroMail — Gmail-connected email composer. Sample business and addresses only.
import React from "react";
import { Avatar, Badge, Brand, Btn, Card, Icon, ink, Logo, Overlay, Screen, Toggle } from "./kit";
import { CodeEditor } from "./code";

export const mm: Brand = { name: "MiroMail", color: "#0d9488", soft: "#e6f7f5", dark: "#0f766e", icon: "mail" };

const folders = [
  { icon: "inbox", label: "Inbox", n: 12 },
  { icon: "star", label: "Starred" },
  { icon: "send", label: "Sent" },
  { icon: "file", label: "Drafts", n: 3 },
  { icon: "clock", label: "Scheduled", n: 2 },
  { icon: "trash", label: "Trash" },
];

const Shell: React.FC<{ active: string; children: React.ReactNode; search?: boolean }> = ({ active, children }) => (
  <Screen bg="#f4f7f7">
    <div style={{ display: "flex", height: "100%" }}>
      <aside style={{ width: 256, flex: "none", padding: "22px 16px", display: "flex", flexDirection: "column", background: "#fff", borderRight: `1px solid ${ink.border}` }}>
        <div style={{ padding: "0 8px 22px" }}>
          <Logo brand={mm} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, height: 48, borderRadius: 14, background: mm.color, color: "#fff", fontWeight: 700, fontSize: 15.5, boxShadow: `0 10px 20px -10px ${mm.color}`, marginBottom: 18 }}>
          <Icon name="edit" size={18} color="#fff" /> Compose
        </div>
        {folders.map((f) => {
          const on = f.label === active;
          return (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, fontSize: 15, fontWeight: on ? 650 : 500, color: on ? mm.dark : ink.body, background: on ? mm.soft : "transparent", marginBottom: 2 }}>
              <Icon name={f.icon} size={19} color={on ? mm.color : ink.muted} />
              <span style={{ flex: 1 }}>{f.label}</span>
              {f.n && <span style={{ fontSize: 12.5, fontWeight: 700, color: on ? mm.dark : ink.muted }}>{f.n}</span>}
            </div>
          );
        })}
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: ink.subtle, padding: "22px 12px 8px" }}>Labels</div>
        {[
          ["Orders", "#f59e0b"],
          ["Suppliers", "#6366f1"],
          ["Newsletter", "#ec4899"],
        ].map(([l, col]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", fontSize: 15, color: ink.body }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: col }} /> {l}
          </div>
        ))}
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, border: `1px solid ${ink.border}` }}>
          <Avatar name="Liza Mendoza" size={38} color="#0d9488" />
          <div style={{ lineHeight: 1.25 }}>
            <div style={{ fontWeight: 650, fontSize: 14.5 }}>Liza Mendoza</div>
            <div style={{ fontSize: 12.5, color: ink.muted }}>liza@example.com</div>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>{children}</main>
    </div>
  </Screen>
);

const TopBar: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ height: 72, flex: "none", display: "flex", alignItems: "center", gap: 14, padding: "0 28px", background: "#fff", borderBottom: `1px solid ${ink.border}` }}>
    <div style={{ width: 520, height: 44, borderRadius: 12, background: "#f1f5f5", display: "flex", alignItems: "center", gap: 12, padding: "0 16px", color: ink.subtle, fontSize: 15 }}>
      <Icon name="search" size={18} /> Search mail
      <span style={{ marginLeft: "auto", display: "inline-flex" }}>
        <Icon name="filter" size={17} />
      </span>
    </div>
    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
      {children}
      <Badge tone="green" dot>
        Gmail connected
      </Badge>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
const mails = [
  ["Juan Dela Cruz", "Re: Bulk order for Saturday", "Thanks! We'd like five dozen for the event, pickup around 9 AM if possible.", "10:24 AM", true, "Orders"],
  ["Sample Flour Co.", "Delivery schedule for next month", "Attached is the updated delivery schedule. Please confirm the Tuesday slot.", "9:58 AM", true, "Suppliers"],
  ["Maria Santos", "Question about catering", "Do you also do small catering for around 30 people? We're planning a birthday.", "9:12 AM", true, ""],
  ["Website form", "New message from the contact page", "Name: Pedro Reyes · Message: Are you open on holidays?", "8:47 AM", false, ""],
  ["Ana Cruz", "Can I reserve a cake for Sunday?", "Hi! I'd like to reserve the chocolate cake for Sunday afternoon.", "Yesterday", false, "Orders"],
  ["Carlo Ramos", "Feedback on last week's order", "Everything arrived on time and the bread was still warm. Thank you!", "Yesterday", false, ""],
  ["Grace Villanueva", "Office snacks every Friday", "Could we set up a standing order for our office every Friday morning?", "Mon", false, "Orders"],
  ["Team", "Shift schedule next week", "Here's the draft schedule. Let me know if you need to swap a day.", "Mon", false, ""],
  ["Sample Packaging", "Your quote is ready", "Thanks for your inquiry. Your quote for 1,000 paper bags is attached.", "Sun", false, "Suppliers"],
  ["Jose Garcia", "Thank you for the birthday cake", "The cake was a hit with the kids. We'll order again next month.", "Sat", false, "Orders"],
  ["Ramon Aquino", "Do you deliver to Quezon City?", "We're a small office near the area and would like weekly deliveries.", "Fri", false, ""],
] as const;

const labelColor: Record<string, string> = { Orders: "#f59e0b", Suppliers: "#6366f1" };

export const MmInbox: React.FC = () => (
  <Shell active="Inbox">
    <TopBar />
    <div style={{ padding: "20px 28px", flex: 1 }}>
      <Card pad={0} style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 22px", borderBottom: `1px solid ${ink.border}`, color: ink.muted }}>
          <span style={{ width: 18, height: 18, borderRadius: 5, border: "1.5px solid #cbd5e1" }} />
          <Icon name="refresh" size={17} />
          <Icon name="more" size={18} />
          <div style={{ display: "flex", gap: 4, marginLeft: 12 }}>
            {["Primary", "Orders", "Updates"].map((t, i) => (
              <span key={t} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 14, fontWeight: i === 0 ? 650 : 500, color: i === 0 ? mm.dark : ink.muted, background: i === 0 ? mm.soft : "transparent" }}>
                {t}
              </span>
            ))}
          </div>
          <span style={{ marginLeft: "auto", fontSize: 13.5 }}>1–50 of 1,284</span>
        </div>
        {mails.map(([from, subj, snip, when, unread, label], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, height: 70, padding: "0 22px", borderBottom: `1px solid ${ink.line}`, background: unread ? "#fff" : "#fafbfb" }}>
            <span style={{ width: 18, height: 18, borderRadius: 5, border: "1.5px solid #cbd5e1", flex: "none" }} />
            <span style={{ color: i === 1 ? "#f59e0b" : "#cbd5e1", display: "inline-flex" }}>
              <Icon name="star" size={18} fill={i === 1 ? "#f59e0b" : "none"} />
            </span>
            <Avatar name={from} size={36} />
            <div style={{ width: 190, flex: "none", fontWeight: unread ? 700 : 500, fontSize: 15, color: unread ? ink.text : ink.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{from}</div>
            <div style={{ flex: 1, minWidth: 0, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: 10 }}>
              {label && (
                <span style={{ fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: `${labelColor[label]}22`, color: labelColor[label] }}>{label}</span>
              )}
              <span style={{ fontWeight: unread ? 700 : 500, color: ink.text }}>{subj}</span>
              <span style={{ color: ink.muted }}>— {snip}</span>
            </div>
            <div style={{ width: 90, textAlign: "right", fontSize: 13.5, fontWeight: unread ? 700 : 500, color: unread ? ink.text : ink.muted }}>{when}</div>
          </div>
        ))}
      </Card>
    </div>
  </Shell>
);

/* ------------------------------------------------------------------ */
const Chip: React.FC<{ name: string }> = ({ name }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 10px 4px 4px", borderRadius: 999, background: "#f1f5f5", border: `1px solid ${ink.border}`, fontSize: 14 }}>
    <Avatar name={name} size={24} /> {name}
  </span>
);

const ModeSwitch: React.FC<{ mode: "Text" | "Design" }> = ({ mode }) => (
  <div style={{ display: "flex", padding: 4, borderRadius: 11, background: "#f1f5f5", border: `1px solid ${ink.border}` }}>
    {(["Text", "Design"] as const).map((m) => (
      <span key={m} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 8, fontSize: 14, fontWeight: 650, background: m === mode ? "#fff" : "transparent", color: m === mode ? mm.dark : ink.muted, boxShadow: m === mode ? "0 1px 3px rgba(15,23,42,0.12)" : "none" }}>
        <Icon name={m === "Text" ? "text" : "grid"} size={15} /> {m}
      </span>
    ))}
  </div>
);

const ComposeBody: React.FC = () => (
  <div style={{ padding: "20px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
    <Card pad={0} style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "16px 24px", borderBottom: `1px solid ${ink.border}` }}>
        <div style={{ fontSize: 18, fontWeight: 750 }}>New message</div>
        <span style={{ marginLeft: 14, fontSize: 13.5, color: ink.muted }}>Draft saved 10:31 AM</span>
        <div style={{ marginLeft: "auto" }}>
          <ModeSwitch mode="Text" />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", borderBottom: `1px solid ${ink.line}` }}>
        <span style={{ width: 70, color: ink.muted, fontSize: 15 }}>To</span>
        <Chip name="Maria Santos" />
        <Chip name="Pedro Reyes" />
        <Chip name="Ana Cruz" />
        <span style={{ fontSize: 14, color: ink.muted }}>+ 2 more</span>
        <span style={{ marginLeft: "auto", fontSize: 14, color: ink.muted }}>Cc · Bcc</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px", borderBottom: `1px solid ${ink.line}` }}>
        <span style={{ width: 70, color: ink.muted, fontSize: 15 }}>Subject</span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>New this week: Ube Cheese Pandesal</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "10px 24px", borderBottom: `1px solid ${ink.line}`, color: ink.body, background: "#fbfcfc" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, padding: "4px 10px", borderRadius: 7, border: `1px solid ${ink.border}`, background: "#fff" }}>
          Sans Serif <Icon name="chevronDown" size={14} />
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, padding: "4px 10px", borderRadius: 7, border: `1px solid ${ink.border}`, background: "#fff" }}>
          Normal <Icon name="chevronDown" size={14} />
        </span>
        <span style={{ width: 1, height: 22, background: ink.border }} />
        {["bold", "italic", "underline"].map((n, i) => (
          <span key={n} style={{ display: "inline-flex", padding: 4, borderRadius: 6, background: i === 0 ? mm.soft : "transparent", color: i === 0 ? mm.dark : ink.body }}>
            <Icon name={n} size={18} />
          </span>
        ))}
        <span style={{ width: 1, height: 22, background: ink.border }} />
        {["alignLeft", "list", "link", "image"].map((n) => (
          <Icon key={n} name={n} size={18} />
        ))}
        <span style={{ width: 20, height: 20, borderRadius: 5, background: mm.color }} />
      </div>
      <div style={{ padding: "26px 32px", fontSize: 16.5, lineHeight: 1.75, color: ink.text, flex: 1 }}>
        <p style={{ margin: 0 }}>Hi Maria,</p>
        <p style={{ margin: "14px 0 0" }}>
          We're adding <b>Ube Cheese Pandesal</b> to the menu this week. It's baked fresh every morning from 6 AM, and the first batch usually sells out before 9.
        </p>
        <ul style={{ margin: "12px 0 0", paddingLeft: 24 }}>
          <li>Available Monday to Saturday</li>
          <li>₱18 per piece or ₱200 per dozen</li>
          <li>
            Reply to this email to <span style={{ color: mm.dark, textDecoration: "underline" }}>pre-order for pickup</span>
          </li>
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
          <div style={{ position: "relative", width: 360, height: 170, borderRadius: 12, overflow: "hidden", background: "radial-gradient(circle at 70% 40%, #c4b5fd, #7c3aed 55%, #4c1d95)", outline: `2px solid ${mm.color}`, outlineOffset: 3 }}>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{ position: "absolute", right: 30 + k * 80, top: 34 + (k % 2) * 34, width: 84, height: 64, borderRadius: "46% 46% 40% 40%", background: "radial-gradient(circle at 40% 35%, #ddd6fe, #8b5cf6 70%)", boxShadow: "0 8px 16px rgba(46,16,101,0.35)" }} />
            ))}
          </div>
          <div style={{ fontSize: 13.5, color: ink.muted, lineHeight: 1.6 }}>
            ube-pandesal.jpg
            <br />
            480 × 230 · 84 KB
            <br />
            <span style={{ color: mm.dark, fontWeight: 600 }}>Replace · Alt text</span>
          </div>
        </div>
        <p style={{ margin: "16px 0 0" }}>
          See you soon,
          <br />
          Liza · Sample Bakery
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 24px", borderTop: `1px solid ${ink.border}` }}>
        <div style={{ display: "flex" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 20px", borderRadius: "11px 0 0 11px", background: mm.color, color: "#fff", fontWeight: 700, fontSize: 15 }}>
            <Icon name="send" size={17} color="#fff" /> Send
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 12px", borderRadius: "0 11px 11px 0", background: mm.dark, color: "#fff", borderLeft: "1px solid rgba(255,255,255,0.3)" }}>
            <Icon name="chevronDown" size={17} color="#fff" />
          </span>
        </div>
        {["paperclip", "image", "link"].map((n) => (
          <span key={n} style={{ color: ink.muted, display: "inline-flex" }}>
            <Icon name={n} size={19} />
          </span>
        ))}
        <span style={{ marginLeft: "auto", color: ink.muted, display: "inline-flex" }}>
          <Icon name="trash" size={19} />
        </span>
      </div>
    </Card>
  </div>
);

export const MmCompose: React.FC = () => (
  <Shell active="Drafts">
    <TopBar />
    <ComposeBody />
  </Shell>
);

/* ------------------------------------------------------------------ */
const blocks = [
  ["text", "Heading"],
  ["alignLeft", "Text"],
  ["image", "Image"],
  ["square", "Button"],
  ["minus", "Divider"],
  ["grid", "Columns"],
  ["layers", "Spacer"],
  ["globe", "Social"],
];

export const MmDesign: React.FC = () => (
  <Shell active="Drafts">
    <div style={{ height: 72, flex: "none", display: "flex", alignItems: "center", gap: 14, padding: "0 28px", background: "#fff", borderBottom: `1px solid ${ink.border}` }}>
      <div style={{ fontSize: 18, fontWeight: 750 }}>New this week: Ube Cheese Pandesal</div>
      <div style={{ marginLeft: 18 }}>
        <ModeSwitch mode="Design" />
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, color: ink.muted }}>
        <Icon name="undo" size={18} />
        <Icon name="redo" size={18} />
        <span style={{ width: 1, height: 24, background: ink.border, margin: "0 6px" }} />
        <span style={{ display: "flex", padding: 3, borderRadius: 9, border: `1px solid ${ink.border}` }}>
          <span style={{ padding: "5px 8px", borderRadius: 6, background: mm.soft, color: mm.dark, display: "inline-flex" }}>
            <Icon name="monitor" size={16} />
          </span>
          <span style={{ padding: "5px 8px", display: "inline-flex" }}>
            <Icon name="phone" size={16} />
          </span>
        </span>
        <Btn variant="outline" icon="eye">Preview</Btn>
        <Btn color={mm.color} icon="send">Send</Btn>
      </div>
    </div>
    <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
      <div style={{ width: 230, flex: "none", padding: 20, background: "#fff", borderRight: `1px solid ${ink.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: ink.subtle, marginBottom: 12 }}>Blocks</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {blocks.map(([ic, l], i) => (
            <div key={l} style={{ height: 76, borderRadius: 12, border: `1px solid ${i === 3 ? mm.color : ink.border}`, background: i === 3 ? mm.soft : "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, color: i === 3 ? mm.dark : ink.body }}>
              <Icon name={ic} size={20} color={i === 3 ? mm.color : ink.muted} />
              {l}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: ink.subtle, margin: "24px 0 12px" }}>Saved sections</div>
        {["Header · logo", "Footer · address"].map((s) => (
          <div key={s} style={{ padding: "10px 12px", borderRadius: 10, border: `1px dashed ${ink.border}`, fontSize: 13.5, color: ink.body, marginBottom: 8 }}>
            {s}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0, background: "#eef2f2", display: "flex", justifyContent: "center", paddingTop: 30, overflow: "hidden" }}>
        <div style={{ width: 600, background: "#fff", borderRadius: 6, boxShadow: "0 20px 50px -20px rgba(15,23,42,0.3)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 28px", fontWeight: 800, fontSize: 18, color: "#4c1d95" }}>
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#6d28d9", display: "grid", placeItems: "center" }}>
              <Icon name="star" size={16} color="#fff" fill="#fff" />
            </span>
            Sample Bakery
            <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 500, color: ink.muted }}>Menu · Order · Visit</span>
          </div>
          <div style={{ height: 230, background: "radial-gradient(circle at 70% 40%, #c4b5fd, #7c3aed 55%, #4c1d95)", display: "flex", alignItems: "flex-end", padding: 28, position: "relative" }}>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{ position: "absolute", right: 60 + k * 70, top: 50 + (k % 2) * 40, width: 92, height: 72, borderRadius: "46% 46% 40% 40%", background: "radial-gradient(circle at 40% 35%, #ddd6fe, #8b5cf6 70%)", boxShadow: "0 10px 20px rgba(46,16,101,0.35)" }} />
            ))}
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 30, letterSpacing: -0.5, textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>Ube Cheese Pandesal</div>
          </div>
          <div style={{ padding: "26px 32px 10px" }}>
            <div style={{ fontSize: 23, fontWeight: 800, color: ink.text }}>New this week, baked every morning</div>
            <div style={{ fontSize: 15.5, lineHeight: 1.7, color: ink.body, marginTop: 10 }}>Soft ube bread with a cheese center, out of the oven from 6 AM. The first batch usually sells out before 9, so pre-order for pickup.</div>
          </div>
          <div style={{ padding: "34px 32px 26px" }}>
            <div style={{ display: "inline-block", position: "relative", outline: `2px solid ${mm.color}`, outlineOffset: 6, borderRadius: 10 }}>
              <span style={{ display: "inline-block", padding: "14px 26px", borderRadius: 10, background: "#6d28d9", color: "#fff", fontWeight: 700, fontSize: 16 }}>Order for pickup</span>
              <span style={{ position: "absolute", top: -34, left: -8, padding: "3px 10px", borderRadius: 6, background: mm.color, color: "#fff", fontSize: 12, fontWeight: 700 }}>Button</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: "6px 32px 28px" }}>
            {[
              ["Classic Pandesal", "₱5 each", "#fde68a", "#d97706"],
              ["Ensaymada", "₱35 each", "#fed7aa", "#ea580c"],
            ].map(([name, price, a, b]) => (
              <div key={name} style={{ borderRadius: 10, border: `1px solid ${ink.line}`, overflow: "hidden" }}>
                <div style={{ height: 90, background: `radial-gradient(circle at 60% 40%, ${a}, ${b})` }} />
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5 }}>{name}</div>
                  <div style={{ fontSize: 13, color: ink.muted }}>{price}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "16px 32px 22px", borderTop: `1px solid ${ink.line}`, fontSize: 12.5, color: ink.subtle, lineHeight: 1.6 }}>
            Sample Bakery · 123 Sample Street, Metro Manila
            <br />
            You're receiving this because you ordered from us. Unsubscribe
          </div>
        </div>
      </div>
      <div style={{ width: 300, flex: "none", padding: 22, background: "#fff", borderLeft: `1px solid ${ink.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 750, fontSize: 16 }}>
          <Icon name="square" size={18} color={mm.color} /> Button
        </div>
        {[
          ["Text", "Order for pickup"],
          ["Link", "example.com/order"],
        ].map(([l, v]) => (
          <div key={l} style={{ marginTop: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 650, color: ink.body, marginBottom: 7 }}>{l}</div>
            <div style={{ height: 42, borderRadius: 10, border: `1.5px solid ${ink.border}`, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 14.5 }}>{v}</div>
          </div>
        ))}
        <div style={{ fontSize: 13, fontWeight: 650, color: ink.body, margin: "20px 0 10px" }}>Background</div>
        <div style={{ display: "flex", gap: 10 }}>
          {["#6d28d9", "#0d9488", "#2563eb", "#ea580c", "#0f172a"].map((col, i) => (
            <span key={col} style={{ width: 32, height: 32, borderRadius: 9, background: col, outline: i === 0 ? `2px solid ${col}` : "none", outlineOffset: 3 }} />
          ))}
        </div>
        <div style={{ fontSize: 13, fontWeight: 650, color: ink.body, margin: "20px 0 10px" }}>Corner radius · 10px</div>
        <div style={{ position: "relative", height: 6, borderRadius: 3, background: ink.line }}>
          <div style={{ width: "40%", height: "100%", borderRadius: 3, background: mm.color }} />
          <span style={{ position: "absolute", left: "40%", top: -7, width: 20, height: 20, marginLeft: -10, borderRadius: "50%", background: "#fff", border: `2px solid ${mm.color}` }} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 650, color: ink.body, margin: "24px 0 10px" }}>Alignment</div>
        <div style={{ display: "flex", padding: 3, borderRadius: 10, border: `1px solid ${ink.border}` }}>
          {["Left", "Center", "Right"].map((a, i) => (
            <span key={a} style={{ flex: 1, textAlign: "center", padding: "6px 0", borderRadius: 7, fontSize: 13.5, fontWeight: 600, background: i === 0 ? mm.soft : "transparent", color: i === 0 ? mm.dark : ink.muted }}>
              {a}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 22, fontSize: 14, color: ink.body }}>
          Full width on mobile <span style={{ marginLeft: "auto" }}><Toggle on color={mm.color} /></span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 650, color: ink.body, margin: "24px 0 10px" }}>Padding</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            ["Top", "14"],
            ["Sides", "26"],
          ].map(([l, v]) => (
            <div key={l} style={{ height: 40, borderRadius: 10, border: `1.5px solid ${ink.border}`, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 14 }}>
              <span style={{ color: ink.muted }}>{l}</span>
              <span style={{ marginLeft: "auto", fontWeight: 600 }}>{v}px</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 40, marginTop: 26, borderRadius: 10, border: `1px solid ${ink.redSoft}`, color: ink.red, fontSize: 14, fontWeight: 600 }}>
          <Icon name="trash" size={16} /> Remove block
        </div>
      </div>
    </div>
  </Shell>
);

/* ------------------------------------------------------------------ */
// December 2026 starts on a Tuesday.
const days = Array.from({ length: 35 }, (_, i) => i - 1);

export const MmSchedule: React.FC = () => (
  <Shell active="Drafts">
    <TopBar />
    <ComposeBody />
    <Overlay>
      <div style={{ width: 760, borderRadius: 20, background: "#fff", boxShadow: "0 40px 80px -20px rgba(15,23,42,0.5)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "20px 26px", borderBottom: `1px solid ${ink.border}` }}>
          <Icon name="clock" size={20} color={mm.color} />
          <div style={{ fontSize: 19, fontWeight: 750, marginLeft: 10 }}>Schedule send</div>
          <span style={{ marginLeft: "auto", color: ink.muted, display: "inline-flex" }}>
            <Icon name="x" size={20} />
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 250px", gap: 26, padding: 26 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
              <b style={{ fontSize: 16 }}>December 2026</b>
              <span style={{ marginLeft: "auto", display: "flex", gap: 8, color: ink.muted }}>
                <Icon name="chevronDown" size={18} />
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, textAlign: "center", fontSize: 14 }}>
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} style={{ fontSize: 12, fontWeight: 700, color: ink.subtle, padding: "4px 0" }}>
                  {d}
                </div>
              ))}
              {days.map((d, i) => {
                const valid = d >= 1 && d <= 31;
                const sel = d === 4;
                const past = d >= 1 && d < 2;
                return (
                  <div key={i} style={{ height: 40, display: "grid", placeItems: "center", borderRadius: 10, fontWeight: sel ? 750 : 500, background: sel ? mm.color : "transparent", color: !valid ? "transparent" : sel ? "#fff" : past ? ink.subtle : ink.text }}>
                    {valid ? d : "·"}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: ink.body, marginBottom: 10 }}>Time</div>
            {["6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM"].map((t) => (
              <div key={t} style={{ padding: "10px 14px", borderRadius: 10, marginBottom: 6, fontSize: 15, fontWeight: t === "7:00 AM" ? 700 : 500, border: `1.5px solid ${t === "7:00 AM" ? mm.color : ink.border}`, background: t === "7:00 AM" ? mm.soft : "#fff", color: t === "7:00 AM" ? mm.dark : ink.body }}>
                {t}
              </div>
            ))}
            <div style={{ fontSize: 13, color: ink.muted, marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="globe" size={14} /> Asia/Manila (GMT+8)
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 26px", background: "#f8fafa", borderTop: `1px solid ${ink.border}` }}>
          <span style={{ fontSize: 14.5, color: ink.body }}>
            Sends <b>Friday, Dec 4 at 7:00 AM</b> to 5 recipients
          </span>
          <span style={{ marginLeft: "auto" }} />
          <Btn variant="outline">Cancel</Btn>
          <Btn color={mm.color} icon="clock">Schedule send</Btn>
        </div>
      </div>
    </Overlay>
  </Shell>
);

/* ------------------------------------------------------------------ */
const JS = `import express from "express";
import cron from "node-cron";
import { google } from "googleapis";
import { requireAuth } from "../middleware/auth.js";
import { ScheduledEmail } from "../models/ScheduledEmail.js";
import { oauthClientFor, toRawMime } from "../gmail/client.js";

const router = express.Router();

// Save an email to send later
router.post("/schedule", requireAuth, async (req, res) => {
  const { to, subject, html, sendAt } = req.body;
  if (!to?.length || !subject || new Date(sendAt) <= new Date()) {
    return res.status(400).json({ error: "Add recipients, a subject and a future time." });
  }
  const email = await ScheduledEmail.create({ userId: req.user.id, to, subject, html, sendAt });
  res.status(201).json({ id: email.id, status: "scheduled", sendAt });
});

// Every minute, send whatever is due through the user's Gmail account
cron.schedule("* * * * *", async () => {
  for (const email of await ScheduledEmail.findDue(new Date())) {
    const gmail = google.gmail({ version: "v1", auth: await oauthClientFor(email.userId) });
    await gmail.users.messages.send({ userId: "me", requestBody: { raw: toRawMime(email) } });
    await email.markSent();
  }
});

export default router;
`;

export const MmCode: React.FC = () => (
  <CodeEditor
    project="miromail"
    file="schedule.js"
    path={["miromail", "server", "routes", "schedule.js"]}
    lang="js"
    code={JS}
    highlightLine={16}
    tabs={["schedule.js", "client.js", "Composer.jsx"]}
    tree={[
      { name: "miromail", depth: 0, folder: true, open: true },
      { name: "client", depth: 1, folder: true, open: true },
      { name: "src", depth: 2, folder: true, open: true },
      { name: "Composer.jsx", depth: 3 },
      { name: "DesignMode.jsx", depth: 3 },
      { name: "Inbox.jsx", depth: 3 },
      { name: "server", depth: 1, folder: true, open: true },
      { name: "gmail", depth: 2, folder: true },
      { name: "middleware", depth: 2, folder: true },
      { name: "models", depth: 2, folder: true },
      { name: "routes", depth: 2, folder: true, open: true },
      { name: "auth.js", depth: 3 },
      { name: "schedule.js", depth: 3, active: true, modified: true },
      { name: "package.json", depth: 1 },
      { name: ".env.example", depth: 1 },
    ]}
    terminal={[
      { t: "$ npm test", c: "#e2e8f0" },
      { t: " PASS  tests/schedule.test.js", c: "#addb67" },
      { t: "  ✓ rejects a send time in the past (11 ms)", c: "#addb67" },
      { t: "  ✓ saves a scheduled email (17 ms)", c: "#addb67" },
      { t: "  ✓ sends due emails through Gmail (24 ms)", c: "#addb67" },
      { t: "Tests:       3 passed, 3 total", c: "#c3cede" },
    ]}
  />
);
