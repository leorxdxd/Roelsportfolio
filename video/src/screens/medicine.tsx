// Medicine Portal (pharmacy reservations and inventory) — sample medicines, prices and customers only.
import React from "react";
import { AppShell, Avatar, Badge, Bar, Brand, Btn, Card, Field, Icon, IconTile, ink, Logo, peso, Row, Screen, Stat, Table } from "./kit";
import { CodeEditor } from "./code";

export const mp: Brand = { name: "Medicine Portal", color: "#16a34a", soft: "#e8f7ee", dark: "#15803d", icon: "pill" };
const store: Brand = { ...mp, name: "Sample Pharmacy" };

type Product = { name: string; form: string; price: number; icon: string; tint: string; color: string; tag?: "Rx" | "Low stock"; inCart?: number };
const products: Product[] = [
  { name: "Paracetamol 500 mg", form: "Tablet · 10 pcs", price: 25, icon: "pill", tint: "#e8f0fe", color: "#2563eb", inCart: 2 },
  { name: "Ibuprofen 200 mg", form: "Softgel · 10 pcs", price: 70, icon: "pill", tint: "#fff1e6", color: "#ea580c" },
  { name: "Cetirizine 10 mg", form: "Tablet · 10 pcs", price: 60, icon: "pill", tint: "#f3effe", color: "#7c3aed" },
  { name: "Amoxicillin 500 mg", form: "Capsule · 21 pcs", price: 189, icon: "pill", tint: "#fdecee", color: "#e11d48", tag: "Rx", inCart: 1 },
  { name: "Losartan 50 mg", form: "Tablet · 30 pcs", price: 270, icon: "pill", tint: "#e6f6f4", color: "#0d9488", tag: "Rx" },
  { name: "Ascorbic acid 500 mg", form: "Tablet · 30 pcs", price: 95, icon: "pill", tint: "#fff7e0", color: "#d97706", tag: "Low stock", inCart: 1 },
  { name: "Oral rehydration salts", form: "Sachet · 5 pcs", price: 60, icon: "droplet", tint: "#e0f6fb", color: "#0891b2" },
  { name: "Metformin 500 mg", form: "Tablet · 30 pcs", price: 150, icon: "pill", tint: "#eef0ff", color: "#4f46e5", tag: "Rx" },
];

const ProductCard: React.FC<{ p: Product }> = ({ p }) => (
  <div style={{ background: "#fff", border: `1px solid ${ink.border}`, borderRadius: 16, padding: 14, boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}>
    <div style={{ height: 118, borderRadius: 12, background: p.tint, display: "grid", placeItems: "center", position: "relative" }}>
      <div style={{ transform: "rotate(-30deg)" }}>
        <Icon name={p.icon} size={58} color={p.color} stroke={1.6} />
      </div>
      {p.tag && (
        <Badge tone={p.tag === "Rx" ? "violet" : "amber"} style={{ position: "absolute", left: 10, top: 10 }}>
          {p.tag === "Rx" ? "Rx · prescription needed" : p.tag}
        </Badge>
      )}
    </div>
    <div style={{ fontWeight: 700, fontSize: 15.5, marginTop: 12 }}>{p.name}</div>
    <div style={{ fontSize: 13, color: ink.muted }}>{p.form}</div>
    <div style={{ display: "flex", alignItems: "center", marginTop: 12 }}>
      <b style={{ fontSize: 18 }}>{peso(p.price, 2)}</b>
      {p.inCart ? (
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 12px", borderRadius: 9, background: mp.soft, color: mp.dark, fontWeight: 700, fontSize: 13.5 }}>
          <Icon name="check" size={15} color={mp.dark} /> In cart · {p.inCart}
        </span>
      ) : (
        <Btn size="sm" variant="outline" icon="plus" style={{ marginLeft: "auto" }}>
          Add
        </Btn>
      )}
    </div>
  </div>
);

export const MpCatalog: React.FC = () => (
  <Screen bg="#f5f8f6">
    <header style={{ height: 76, flex: "none", display: "flex", alignItems: "center", gap: 28, padding: "0 40px", background: "#fff", borderBottom: `1px solid ${ink.border}` }}>
      <Logo brand={store} />
      <div style={{ flex: 1, maxWidth: 620, height: 46, borderRadius: 12, background: "#f5f8f6", border: `1px solid ${ink.border}`, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", color: ink.subtle, fontSize: 15 }}>
        <Icon name="search" size={18} /> Search medicines by brand or generic name
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 22 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color: ink.body }}>
          <Icon name="clipboard" size={18} color={ink.muted} /> My reservations
        </span>
        <span style={{ position: "relative", width: 42, height: 42, borderRadius: 11, border: `1px solid ${ink.border}`, display: "grid", placeItems: "center", color: ink.body }}>
          <Icon name="cart" size={19} />
          <span style={{ position: "absolute", top: -6, right: -6, minWidth: 20, height: 20, borderRadius: 999, background: mp.color, color: "#fff", fontSize: 12, fontWeight: 800, display: "grid", placeItems: "center", border: "2px solid #fff" }}>3</span>
        </span>
        <Avatar name="Juan Dela Cruz" size={38} />
      </div>
    </header>

    <div style={{ display: "flex", gap: 10, padding: "18px 40px 0" }}>
      {["All", "Pain & fever", "Cough & colds", "Allergy", "Vitamins", "Maintenance", "First aid", "Baby care"].map((c, i) => (
        <span key={c} style={{ padding: "8px 16px", borderRadius: 999, fontSize: 14, fontWeight: 600, background: i === 0 ? ink.text : "#fff", color: i === 0 ? "#fff" : ink.body, border: `1px solid ${i === 0 ? ink.text : ink.border}` }}>
          {c}
        </span>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24, padding: "18px 40px" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 22px", borderRadius: 16, background: `linear-gradient(120deg, ${mp.dark}, ${mp.color})`, color: "#fff" }}>
          <IconTile icon="upload" color="#fff" soft="rgba(255,255,255,0.18)" size={46} />
          <div style={{ lineHeight: 1.35 }}>
            <div style={{ fontWeight: 750, fontSize: 17 }}>Have a prescription?</div>
            <div style={{ fontSize: 14, opacity: 0.88 }}>Upload a photo and the pharmacist will prepare your medicines.</div>
          </div>
          <span style={{ marginLeft: "auto", height: 40, display: "inline-flex", alignItems: "center", padding: "0 16px", borderRadius: 10, background: "#fff", color: mp.dark, fontWeight: 700, fontSize: 14.5 }}>Upload prescription</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", margin: "20px 0 14px" }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4 }}>Popular this week</div>
          <span style={{ marginLeft: "auto", fontSize: 14, color: ink.muted }}>
            Sort: <b style={{ color: ink.text }}>Most reserved</b>
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {products.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </div>

      <Card title="Your reservation" action={<span style={{ fontSize: 13.5, color: ink.muted }}>3 items</span>} pad={22} style={{ alignSelf: "start" }}>
        {products
          .filter((p) => p.inCart)
          .map((p) => (
            <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${ink.line}` }}>
              <IconTile icon={p.icon} color={p.color} soft={p.tint} size={38} />
              <div style={{ lineHeight: 1.3, minWidth: 0 }}>
                <div style={{ fontWeight: 650, fontSize: 14.5 }}>{p.name}</div>
                <div style={{ fontSize: 12.5, color: ink.muted }}>
                  {p.form} × {p.inCart}
                </div>
              </div>
              <b style={{ marginLeft: "auto" }}>{peso(p.price * (p.inCart ?? 0), 2)}</b>
            </div>
          ))}
        <div style={{ marginTop: 14, padding: 14, borderRadius: 12, border: `1.5px dashed #c4b5fd`, background: "#faf8ff" }}>
          <div style={{ fontSize: 13.5, fontWeight: 650, color: "#6d28d9" }}>Prescription for Amoxicillin</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, fontSize: 13.5 }}>
            <Icon name="image" size={18} color={ink.muted} /> prescription-photo.jpg
            <Badge tone="green" style={{ marginLeft: "auto" }}>
              Uploaded
            </Badge>
          </div>
        </div>
        <Field label="Pickup time" style={{ marginTop: 16 }}>
          <Icon name="clock" size={17} color={ink.muted} /> Today, 3:00 – 4:00 PM
          <span style={{ marginLeft: "auto", color: ink.subtle }}>
            <Icon name="chevronDown" size={17} />
          </span>
        </Field>
        <div style={{ marginTop: 10 }}>
          <Row label="Subtotal">{peso(334, 2)}</Row>
          <Row label="Total · pay at pickup" strong last>
            {peso(334, 2)}
          </Row>
        </div>
        <Btn color={mp.color} icon="check" style={{ width: "100%", height: 46, marginTop: 12, fontSize: 15.5 }}>
          Reserve for pickup
        </Btn>
        <div style={{ fontSize: 13, color: ink.muted, textAlign: "center", marginTop: 10 }}>We'll send a text when your order is ready.</div>
      </Card>
    </div>
  </Screen>
);

/* ------------------------------------------------------------------ */
const adminNav = [
  { icon: "home", label: "Dashboard" },
  { icon: "clipboard", label: "Reservations", badge: 6 },
  { icon: "box", label: "Inventory" },
  { icon: "pill", label: "Medicines" },
  { icon: "building", label: "Suppliers" },
  { icon: "chart", label: "Reports", section: "Store" },
  { icon: "users", label: "Users" },
  { icon: "settings", label: "Settings" },
];
const pharmacist = { name: "Joy Navarro", role: "Pharmacist", color: mp.dark };

type Stock = [name: string, kind: string, batch: string, expiry: string, expNote: string | null, qty: number, reorder: number, status: "OK" | "Low stock" | "Expiring" | "Out of stock"];
const stock: Stock[] = [
  ["Paracetamol 500 mg", "Tablet", "PCM-2611A", "Mar 2028", null, 1240, 300, "OK"],
  ["Amoxicillin 500 mg", "Capsule", "AMX-2608C", "Jan 18, 2027", "in 48 days", 168, 200, "Low stock"],
  ["Cetirizine 10 mg", "Tablet", "CTZ-2605B", "Dec 30, 2026", "in 29 days", 420, 150, "Expiring"],
  ["Losartan 50 mg", "Tablet", "LSN-2702A", "Feb 2028", null, 860, 250, "OK"],
  ["Ascorbic acid 500 mg", "Tablet", "ASA-2609D", "Sep 2027", null, 95, 200, "Low stock"],
  ["Metformin 500 mg", "Tablet", "MTF-2610B", "Oct 2027", null, 640, 300, "OK"],
  ["Ibuprofen 200 mg", "Softgel", "IBU-2604A", "Jan 9, 2027", "in 39 days", 310, 150, "Expiring"],
  ["Oral rehydration salts", "Sachet", "ORS-2607A", "Jul 2027", null, 0, 100, "Out of stock"],
];
const stockTone = { OK: "green", "Low stock": "amber", Expiring: "red", "Out of stock": "gray" } as const;

export const MpInventory: React.FC = () => (
  <AppShell
    brand={mp}
    nav={adminNav}
    active="Inventory"
    user={pharmacist}
    title="Inventory"
    subtitle="Sample Pharmacy · 312 medicines · 548 batches"
    search="Search medicines…"
    actions={
      <>
        <Btn variant="outline" icon="download">Export CSV</Btn>
        <Btn color={mp.color} icon="plus">Receive stock</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
      <Stat label="Stock value" value="₱1.28M" delta="4%" icon="box" color={mp.color} soft={mp.soft} />
      <Stat label="Low stock" value={9} icon="trendingUp" color="#b45309" soft="#fef3c7" />
      <Stat label="Expiring in 60 days" value={14} icon="clock" color="#dc2626" soft="#fee2e2" />
      <Stat label="Out of stock" value={2} icon="alertTriangle" color="#475569" soft="#f1f5f9" />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, padding: "13px 18px", borderRadius: 12, background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", fontSize: 14.5 }}>
      <Icon name="alertTriangle" size={18} color="#b45309" />
      <span>
        <b>14 batches expire within 60 days.</b> Reservations take stock from the batch that expires first (FEFO).
      </span>
      <span style={{ marginLeft: "auto", fontWeight: 700 }}>Review batches</span>
    </div>
    <Card pad={18} style={{ marginTop: 20 }}>
      <Table
        rowH={56}
        cols={[
          { label: "Medicine" },
          { label: "Batch", w: 120 },
          { label: "Expiry", w: 130 },
          { label: "Stock", w: 200 },
          { label: "Reorder at", w: 96, align: "right" },
          { label: "Status", w: 124 },
        ]}
        rows={stock.map(([name, kind, batch, exp, note, qty, reorder, status]) => [
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <IconTile icon="pill" color={mp.dark} soft={mp.soft} size={34} />
            <div style={{ lineHeight: 1.25 }}>
              <div style={{ fontWeight: 650 }}>{name}</div>
              <div style={{ fontSize: 12.5, color: ink.muted }}>{kind}</div>
            </div>
          </div>,
          <span style={{ fontFamily: "monospace", fontSize: 13.5, color: ink.body }}>{batch}</span>,
          <div style={{ lineHeight: 1.25 }}>
            <div>{exp}</div>
            {note && <div style={{ fontSize: 12.5, color: ink.red, fontWeight: 650 }}>{note}</div>}
          </div>,
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <b style={{ width: 52 }}>{qty.toLocaleString("en-US")}</b>
            <div style={{ flex: 1 }}>
              <Bar value={Math.min(100, (qty / (reorder * 3)) * 100)} color={qty < reorder ? "#d97706" : mp.color} h={7} />
            </div>
          </div>,
          reorder,
          <Badge tone={stockTone[status]} dot>
            {status}
          </Badge>,
        ])}
      />
    </Card>
  </AppShell>
);

/* ------------------------------------------------------------------ */
type Order = { no: string; name: string; time: string; items: string[]; total: number; rx?: boolean; note?: string; selected?: boolean; action?: string };
const board: { title: string; color: string; orders: Order[] }[] = [
  {
    title: "New",
    color: "#2563eb",
    orders: [
      { no: "#2045", name: "Ramon Cruz", time: "Pickup 4:00 PM", items: ["Cetirizine 10 mg × 10", "Paracetamol 500 mg × 20"], total: 110 },
      { no: "#2044", name: "Grace Tan", time: "Pickup 4:30 PM", items: ["Ascorbic acid 500 mg × 30"], total: 95 },
      { no: "#2043", name: "Arnel Diaz", time: "Pickup 5:00 PM", items: ["Oral rehydration salts × 5"], total: 60 },
    ],
  },
  {
    title: "Check prescription",
    color: "#7c3aed",
    orders: [
      { no: "#2041", name: "Juan Dela Cruz", time: "Pickup 3:00 PM", items: ["Amoxicillin 500 mg × 21", "Paracetamol 500 mg × 20", "Ascorbic acid 500 mg × 30"], total: 334, rx: true, selected: true },
      { no: "#2040", name: "Faith Ocampo", time: "Pickup 3:30 PM", items: ["Losartan 50 mg × 30"], total: 270, rx: true },
    ],
  },
  {
    title: "Preparing",
    color: "#d97706",
    orders: [
      { no: "#2039", name: "Maria Santos", time: "Pickup 2:30 PM", items: ["Metformin 500 mg × 30"], total: 150, note: "From batch MTF-2610B" },
      { no: "#2038", name: "Pedro Reyes", time: "Pickup 2:45 PM", items: ["Ibuprofen 200 mg × 10"], total: 70, note: "From batch IBU-2604A" },
    ],
  },
  {
    title: "Ready for pickup",
    color: "#16a34a",
    orders: [
      { no: "#2036", name: "Carmen Lim", time: "Ready 2:14 PM", items: ["Amoxicillin 500 mg × 21"], total: 189, note: "Text sent", action: "Mark picked up" },
      { no: "#2035", name: "Leo Santiago", time: "Ready 1:50 PM", items: ["Cetirizine 10 mg × 10"], total: 60, note: "Text sent" },
      { no: "#2034", name: "Mia Domingo", time: "Ready 1:32 PM", items: ["Paracetamol 500 mg × 20"], total: 50, note: "Text sent" },
    ],
  },
];

const OrderCard: React.FC<{ o: Order; color: string }> = ({ o, color }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 12,
      padding: 14,
      border: o.selected ? `2px solid ${color}` : `1px solid ${ink.border}`,
      boxShadow: o.selected ? `0 0 0 4px ${color}1f, 0 14px 30px -18px rgba(15,23,42,0.45)` : "0 1px 2px rgba(15,23,42,0.04)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <b style={{ fontSize: 15 }}>{o.no}</b>
      {o.rx && <Badge tone="violet">Rx</Badge>}
      <span style={{ marginLeft: "auto", fontSize: 12.5, color: ink.muted, fontWeight: 600 }}>{o.time}</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
      <Avatar name={o.name} size={26} />
      <span style={{ fontWeight: 600, fontSize: 14 }}>{o.name}</span>
    </div>
    <div style={{ marginTop: 8, display: "grid", gap: 3 }}>
      {o.items.map((it) => (
        <div key={it} style={{ fontSize: 13.5, color: ink.body }}>
          · {it}
        </div>
      ))}
    </div>
    {o.selected && (
      <div style={{ display: "flex", gap: 12, marginTop: 12, padding: 10, borderRadius: 10, background: ink.bg }}>
        <div style={{ width: 64, height: 80, borderRadius: 6, background: "#fff", border: `1px solid ${ink.border}`, padding: "8px 7px", display: "grid", gap: 5, alignContent: "start", transform: "rotate(-3deg)" }}>
          <span style={{ fontFamily: "serif", fontWeight: 700, fontSize: 13, color: "#6d28d9" }}>℞</span>
          {[90, 70, 80, 55].map((w, i) => (
            <span key={i} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: "#cbd5e1" }} />
          ))}
        </div>
        <div style={{ fontSize: 12.5, color: ink.muted, lineHeight: 1.45 }}>
          <b style={{ color: ink.text, fontSize: 13 }}>Prescription photo</b>
          <br />
          Dr. Ana Reyes · Nov 30
          <br />
          Amoxicillin 500 mg, 21 caps
        </div>
      </div>
    )}
    <div style={{ display: "flex", alignItems: "center", marginTop: 12 }}>
      <b style={{ fontSize: 15 }}>{peso(o.total, 2)}</b>
      {o.note && (
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: o.note === "Text sent" ? ink.green : ink.muted, fontWeight: 600 }}>
          {o.note === "Text sent" && <Icon name="check" size={14} />} {o.note}
        </span>
      )}
    </div>
    {o.selected && (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
        <Btn size="sm" color={mp.color} icon="check">
          Approve
        </Btn>
        <Btn size="sm" variant="outline">
          Ask for a new photo
        </Btn>
      </div>
    )}
    {o.action && (
      <Btn size="sm" variant="outline" icon="check" style={{ width: "100%", marginTop: 12 }}>
        {o.action}
      </Btn>
    )}
  </div>
);

export const MpOrders: React.FC = () => (
  <AppShell
    brand={mp}
    nav={adminNav}
    active="Reservations"
    user={pharmacist}
    title="Reservations"
    subtitle="Today · 23 reservations · 6 need action"
    search="Search orders…"
    actions={
      <>
        <Btn variant="outline" icon="printer">Print pick list</Btn>
        <Btn color={mp.color} icon="plus">Walk-in order</Btn>
      </>
    }
  >
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, height: "100%" }}>
      {board.map((col) => (
        <div key={col.title} style={{ background: "#eef2f6", borderRadius: 14, padding: 12, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 4px 2px", fontWeight: 700, fontSize: 14.5 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: col.color }} />
            {col.title}
            <span style={{ marginLeft: "auto", padding: "0 8px", borderRadius: 999, fontSize: 12.5, background: "#fff", color: ink.muted }}>{col.orders.length}</span>
          </div>
          {col.orders.map((o) => (
            <OrderCard key={o.no} o={o} color={col.color} />
          ))}
        </div>
      ))}
    </div>
  </AppShell>
);

/* ------------------------------------------------------------------ */
export const MP_CODE = `import { supabase } from "./supabase";
import { OutOfStockError, today } from "./stock";

/** Reserve stock from the batches that expire first (FEFO). */
export async function reserve(orderId: string, medicineId: string, qty: number) {
  const { data: batches, error } = await supabase
    .from("batches")
    .select("id, quantity, expires_on")
    .eq("medicine_id", medicineId)
    .gt("quantity", 0)
    .gt("expires_on", today())
    .order("expires_on", { ascending: true });
  if (error) throw error;

  const available = batches.reduce((sum, b) => sum + b.quantity, 0);
  if (available < qty) throw new OutOfStockError(medicineId, available);

  let left = qty;
  const picks = batches.flatMap((batch) => {
    const take = Math.min(batch.quantity, left);
    left -= take;
    return take > 0 ? [{ order_id: orderId, batch_id: batch.id, quantity: take }] : [];
  });
  // one transaction in Postgres: save the picks and lower the stock
  await supabase.rpc("reserve_batches", { picks }).throwOnError();
  return picks;
}`;

export const MpCode: React.FC = () => (
  <CodeEditor
    project="medicine-portal"
    file="reserve.ts"
    path={["src", "lib", "reserve.ts"]}
    lang="ts"
    code={MP_CODE}
    highlightLine={12}
    tabs={["reserve.ts", "reserve.test.ts", "Cart.tsx"]}
    tree={[
      { name: "medicine-portal", depth: 0, folder: true, open: true },
      { name: "src", depth: 1, folder: true, open: true },
      { name: "components", depth: 2, folder: true },
      { name: "pages", depth: 2, folder: true, open: true },
      { name: "Catalog.tsx", depth: 3 },
      { name: "Cart.tsx", depth: 3 },
      { name: "Inventory.tsx", depth: 3 },
      { name: "lib", depth: 2, folder: true, open: true },
      { name: "reserve.ts", depth: 3, active: true, modified: true },
      { name: "reserve.test.ts", depth: 3 },
      { name: "stock.ts", depth: 3 },
      { name: "supabase.ts", depth: 3 },
      { name: "supabase", depth: 1, folder: true },
      { name: "index.html", depth: 1 },
      { name: "package.json", depth: 1 },
      { name: "vite.config.ts", depth: 1 },
    ]}
    terminal={[
      { t: "$ npx vitest run src/lib/reserve.test.ts", c: "#e2e8f0" },
      { t: " ✓ src/lib/reserve.test.ts (4 tests) 41ms", c: "#addb67" },
      { t: "   ✓ takes stock from the batch that expires first", c: "#addb67" },
      { t: "   ✓ splits a reservation across two batches", c: "#addb67" },
      { t: "   ✓ never uses expired batches", c: "#addb67" },
      { t: "   ✓ throws when there is not enough stock", c: "#addb67" },
      { t: "      Tests  4 passed (4)", c: "#addb67" },
    ]}
  />
);
