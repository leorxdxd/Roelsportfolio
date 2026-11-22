import type { Lang } from "../lib/highlight";

/**
 * Code shown in the Home page animations ("write the code, test it, run it").
 * These are short illustrative versions of each project's code, with sample data only.
 * Secrets are read from environment variables, never written in the code.
 */

export const heroSnippet = {
  file: "bills.ts",
  lang: "ts" as Lang,
  code: `async function overdueBills(db: Db) {
  const { data } = await db
    .from("bills")
    .select("id, total, tenants(name)")
    .eq("status", "unpaid")
    .lt("due_date", today());
  return data ?? [];
}`,
  test: { title: "4 tests passed", detail: "bills.test.ts · 0.42 s" },
};

export interface Scene {
  project: string; // project slug
  file: string;
  path: string;
  lang: Lang;
  code: string;
  terminal: { t: string; ok?: boolean }[];
  /** Screenshot shown in the browser, address bar text, where the cursor clicks (0..1), and the toast after it. */
  screen: { file: string; url: string; click: [number, number]; toast: string };
}

export const scenes: Scene[] = [
  {
    project: "apartment-management-system",
    file: "index.ts",
    path: "supabase / functions / generate-bills",
    lang: "ts",
    code: `// Runs on the 1st of every month: one bill per active lease
Deno.serve(async () => {
  const db = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"));
  const period = monthStart(new Date());

  const { data: leases } = await db
    .from("leases")
    .select("id, unit_id, monthly_rent")
    .eq("status", "active")
    .throwOnError();

  const bills = [];
  for (const lease of leases) {
    const { water, power } = await readingsFor(db, lease.unit_id, period);
    bills.push({ lease_id: lease.id, period, rent: lease.monthly_rent,
      water, electricity: power, due_date: addDays(period, 4) });
  }

  // upsert: running it twice never creates duplicate bills
  await db.from("bills").upsert(bills, { onConflict: "lease_id,period" });
  return Response.json({ created: bills.length });
});`,
    terminal: [
      { t: "$ deno test --allow-env" },
      { t: "running 4 tests from ./generate-bills/index.test.ts" },
      { t: "creates one bill per active lease ... ok (21ms)", ok: true },
      { t: "adds water and electricity readings ... ok (9ms)", ok: true },
      { t: "skips vacant units ... ok (6ms)", ok: true },
      { t: "running twice creates no duplicates ... ok (14ms)", ok: true },
      { t: "ok | 4 passed | 0 failed (188ms)", ok: true },
      { t: "$ supabase functions deploy generate-bills" },
    ],
    screen: {
      file: "screenshot-3.webp",
      url: "rentals.sampleresidences.test/billing",
      click: [0.899, 0.037],
      toast: "24 bills created for December",
    },
  },
  {
    project: "electronic-medical-records",
    file: "rls_policies.sql",
    path: "supabase / migrations",
    lang: "sql",
    code: `-- Staff only see patients of their own clinic
alter table patients enable row level security;

create policy "staff read own clinic patients"
  on patients for select to authenticated
  using (clinic_id = (
    select clinic_id from staff where user_id = auth.uid()
  ));

-- Only doctors can sign a consultation
create policy "doctors write consultations"
  on consultations for insert to authenticated
  with check (exists (
    select 1 from staff
    where user_id = auth.uid() and role = 'doctor'
  ));

-- Every change is kept in the audit log
create trigger audit_consultations
  after insert or update or delete on consultations
  for each row execute function audit.log_change();`,
    terminal: [
      { t: "$ supabase db reset" },
      { t: "Applying migration 20261103_rls_policies.sql..." },
      { t: "$ supabase test db" },
      { t: "./supabase/tests/rls_consultations.test.sql .. ok", ok: true },
      { t: "./supabase/tests/rls_patients.test.sql ....... ok", ok: true },
      { t: "All tests successful.", ok: true },
      { t: "Result: PASS", ok: true },
    ],
    screen: {
      file: "screenshot-3.webp",
      url: "emr.sampleclinic.test/consultations/new",
      click: [0.904, 0.037],
      toast: "Consultation signed and added to the audit log",
    },
  },
  {
    project: "medicine-portal",
    file: "reserve.ts",
    path: "medicine-portal / src / lib",
    lang: "ts",
    code: `/** Reserve stock from the batches that expire first (FEFO). */
export async function reserve(orderId: string, medicineId: string, qty: number) {
  const { data: batches } = await supabase
    .from("batches")
    .select("id, quantity, expires_on")
    .eq("medicine_id", medicineId)
    .gt("expires_on", today())
    .order("expires_on")
    .throwOnError();

  let left = qty;
  const picks = batches.flatMap((batch) => {
    const take = Math.min(batch.quantity, left);
    left -= take;
    return take > 0 ? [{ order_id: orderId, batch_id: batch.id, quantity: take }] : [];
  });
  if (left > 0) throw new OutOfStockError(medicineId);

  // one Postgres transaction: save the picks and lower the stock
  await supabase.rpc("reserve_batches", { picks }).throwOnError();
  return picks;
}`,
    terminal: [
      { t: "$ npx vitest run" },
      { t: " ✓ src/lib/reserve.test.ts (4 tests) 41ms", ok: true },
      { t: "   ✓ takes stock from the batch that expires first", ok: true },
      { t: "   ✓ never uses expired batches", ok: true },
      { t: "   ✓ throws when there is not enough stock", ok: true },
      { t: "      Tests  4 passed (4)", ok: true },
      { t: "$ npm run dev" },
      { t: "  ➜  Local:   http://localhost:5173/" },
    ],
    screen: {
      file: "screenshot-1.webp",
      url: "samplepharmacy.test/medicines",
      click: [0.85, 0.704],
      toast: "Reservation #2041 confirmed for 3:00 PM pickup",
    },
  },
  {
    project: "workflow-automations",
    file: "index.ts",
    path: "supabase / functions / send-reminders",
    lang: "ts",
    code: `// Scheduled with pg_cron: every day at 8:00 AM
Deno.serve(async () => {
  const db = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"));

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
});`,
    terminal: [
      { t: "$ deno test --allow-env --allow-net" },
      { t: "running 3 tests from ./send-reminders/index.test.ts" },
      { t: "only emails bills due in exactly 3 days ... ok (16ms)", ok: true },
      { t: "logs every email, sent or failed ... ok (8ms)", ok: true },
      { t: "skips bills that are already paid ... ok (5ms)", ok: true },
      { t: "ok | 3 passed | 0 failed (97ms)", ok: true },
      { t: "$ supabase functions deploy send-reminders" },
    ],
    screen: {
      file: "screenshot-1.webp",
      url: "automations.sample.test/workflows",
      click: [0.927, 0.362],
      toast: "Rent reminders: 18 emails sent",
    },
  },
];
