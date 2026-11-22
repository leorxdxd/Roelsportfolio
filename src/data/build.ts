import type { Lang } from "../lib/highlight";

/**
 * Code shown in the Home page animations ("write the code, test it, run it").
 * These are short illustrative versions of each project's code, with sample data only.
 */

export const heroSnippet = {
  file: "assign.php",
  lang: "php" as Lang,
  code: `function assignTicket(PDO $db, int $id): ?int
{
    $tech = leastBusyTechnician($db, $id);
    if ($tech === null) return null;
    notify($tech, "New ticket #$id");
    return $tech;
}`,
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
    project: "it-helpdesk-ticketing-system",
    file: "assign.php",
    path: "helpdesk / app / tickets",
    lang: "php",
    code: `<?php
// Give a new ticket to the technician with the fewest open tickets
function assignTicket(PDO $db, int $ticketId, string $category): ?int
{
    $stmt = $db->prepare(
        "SELECT u.id FROM users u
           LEFT JOIN tickets t ON t.assigned_to = u.id
                AND t.status IN ('new', 'in_progress')
          WHERE u.role = 'technician'
            AND FIND_IN_SET(:category, u.skills)
          GROUP BY u.id ORDER BY COUNT(t.id) LIMIT 1"
    );
    $stmt->execute(['category' => $category]);
    $techId = $stmt->fetchColumn();
    if ($techId === false) {
        return null; // stays in the queue for an admin
    }
    $db->prepare("UPDATE tickets SET assigned_to = ? WHERE id = ?")
       ->execute([$techId, $ticketId]);
    notifyTechnician((int) $techId, $ticketId);
    return (int) $techId;
}`,
    terminal: [
      { t: "$ ./vendor/bin/phpunit --testdox" },
      { t: "Assign Ticket" },
      { t: " ✔ Assigns to the technician with the fewest open tickets", ok: true },
      { t: " ✔ Only considers technicians with the right skill", ok: true },
      { t: " ✔ Leaves the ticket unassigned when nobody matches", ok: true },
      { t: "OK (3 tests, 9 assertions)", ok: true },
      { t: "$ php -S localhost:8000 -t public" },
      { t: "Listening on http://localhost:8000" },
    ],
    screen: {
      file: "screenshot-2.webp",
      url: "helpdesk.sampleschool.test/tickets",
      click: [0.71, 0.238],
      toast: "Ticket #1042 assigned to Mark Bautista",
    },
  },
  {
    project: "ai-plagiarism-checker",
    file: "check.py",
    path: "plagiarism-checker / app",
    lang: "python",
    code: `@bp.post("/api/check")
def check():
    text = clean(request.form.get("text", ""))
    sentences = split_sentences(text)
    sources = load_sources()

    tfidf = TfidfVectorizer(ngram_range=(1, 3))
    matrix = tfidf.fit_transform(sentences + [s.text for s in sources])
    n = len(sentences)
    scores = cosine_similarity(matrix[:n], matrix[n:])

    matches = []
    for sentence, row in zip(sentences, scores):
        best = row.argmax()
        if row[best] >= THRESHOLD:
            matches.append({"sentence": sentence,
                            "source": sources[best].title})

    similarity = round(100 * len(matches) / max(n, 1))
    return jsonify(similarity=similarity, matches=matches)`,
    terminal: [
      { t: "$ pytest -q" },
      { t: "...............                                   [100%]", ok: true },
      { t: "15 passed in 1.42s", ok: true },
      { t: "$ flask --app app run" },
      { t: " * Running on http://127.0.0.1:5000" },
    ],
    screen: {
      file: "screenshot-2.webp",
      url: "checker.example.edu/results",
      click: [0.884, 0.124],
      toast: "4 flagged sentences sent to the paraphraser",
    },
  },
  {
    project: "miromail",
    file: "schedule.js",
    path: "miromail / server / routes",
    lang: "js",
    code: `// Save an email to send later
router.post("/schedule", requireAuth, async (req, res) => {
  const { to, subject, html, sendAt } = req.body;
  if (!to?.length || new Date(sendAt) <= new Date()) {
    return res.status(400).json({ error: "Pick recipients and a future time." });
  }
  const email = await ScheduledEmail.create({
    userId: req.user.id, to, subject, html, sendAt,
  });
  res.status(201).json({ id: email.id, status: "scheduled" });
});

// Every minute, send whatever is due through Gmail
cron.schedule("* * * * *", async () => {
  for (const email of await ScheduledEmail.findDue(new Date())) {
    await sendWithGmail(email);
    await email.markSent();
  }
});`,
    terminal: [
      { t: "$ npm test" },
      { t: " PASS  tests/schedule.test.js", ok: true },
      { t: "  ✓ rejects a send time in the past (11 ms)", ok: true },
      { t: "  ✓ saves a scheduled email (17 ms)", ok: true },
      { t: "  ✓ sends due emails through Gmail (24 ms)", ok: true },
      { t: "Tests:       3 passed, 3 total", ok: true },
      { t: "$ npm run dev" },
      { t: "  ➜  Local:   http://localhost:5173/" },
    ],
    screen: {
      file: "screenshot-3.webp",
      url: "app.miromail.example/compose",
      click: [0.669, 0.71],
      toast: "Scheduled for Friday, Dec 4 at 7:00 AM",
    },
  },
];
