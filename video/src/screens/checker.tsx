// AI Plagiarism & Paraphrasing Checker — sample text and sources only.
import React from "react";
import { Avatar, Badge, Bar, Brand, Btn, Card, Icon, ink, Logo, Screen, Toggle } from "./kit";
import { CodeEditor } from "./code";

export const pc: Brand = { name: "Plagiarism Checker", color: "#7c3aed", soft: "#f3effe", dark: "#6d28d9", icon: "shield" };

const sources = [
  { n: 1, title: "Study habits in online courses", where: "example-journal.org", pct: 11, color: "#f59e0b", bg: "#fef3c7" },
  { n: 2, title: "Class submissions · Section B", where: "Internal repository", pct: 7, color: "#ec4899", bg: "#fce7f3" },
  { n: 3, title: "Blended learning", where: "sample-encyclopedia.org", pct: 5, color: "#3b82f6", bg: "#dbeafe" },
];

const essay: { s: string; src?: number }[] = [
  { s: "Online learning has changed how many students attend school." },
  { s: "Lessons moved to video calls and learning management systems, and teachers had to redesign activities for smaller screens." },
  { s: "Students who keep a fixed daily study schedule tend to perform better in online courses than students who study only when assignments are due.", src: 1 },
  { s: "Access is still uneven." },
  { s: "Learners without a stable internet connection often miss live sessions and depend on recorded lectures to keep up.", src: 2 },
  { s: "Teachers also say it is harder to notice when a student is struggling, because many students keep their cameras off." },
  { s: "Blended learning, which combines face-to-face classes with online activities, allows schools to keep the flexibility of remote instruction while protecting the routines that help students stay on track.", src: 3 },
  { s: "For this reason, many schools plan to keep some online components even after classrooms reopen fully." },
  { s: "Regular feedback from teachers is one of the strongest predictors of student engagement in online settings.", src: 1 },
  { s: "This paper looks at how schools adjusted their programs and which practices students found most helpful." },
];

const more = [
  "The schools in this study used three common approaches. Some kept all classes online and invested in better video tools. Others returned to full face-to-face classes as soon as they could. Most chose a blended schedule, with two or three days on campus each week.",
  "Students were asked which practices helped them most. The most common answers were recorded lessons they could replay, clear weekly checklists, and quick replies from teachers through the learning management system.",
];

const TopNav: React.FC<{ active: string }> = ({ active }) => (
  <div style={{ height: 70, display: "flex", alignItems: "center", gap: 36, padding: "0 48px", background: "#fff", borderBottom: `1px solid ${ink.border}` }}>
    <Logo brand={pc} size={32} />
    <div style={{ display: "flex", gap: 6, marginLeft: 20 }}>
      {["Check", "Paraphrase", "History"].map((l) => (
        <span key={l} style={{ padding: "8px 14px", borderRadius: 9, fontSize: 15, fontWeight: l === active ? 650 : 500, color: l === active ? pc.dark : ink.muted, background: l === active ? pc.soft : "transparent" }}>
          {l}
        </span>
      ))}
    </div>
    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
      <Badge tone="violet">Teacher plan</Badge>
      <Avatar name="Grace Villanueva" size={36} color="#7c3aed" />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
export const PcCheck: React.FC = () => (
  <Screen>
    <TopNav active="Check" />
    <div style={{ padding: "34px 48px", display: "grid", gridTemplateColumns: "1fr 400px", gap: 28 }}>
      <div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.8 }}>Check a document</div>
        <div style={{ fontSize: 16, color: ink.muted, marginTop: 4 }}>Upload a file or paste text. Results take a few seconds.</div>
        <Card pad={0} style={{ marginTop: 22, overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: `1px solid ${ink.border}` }}>
            {[
              ["text", "Paste text"],
              ["upload", "Upload file"],
            ].map(([ic, l], i) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 22px", fontSize: 15, fontWeight: i === 0 ? 650 : 500, color: i === 0 ? pc.dark : ink.muted, boxShadow: i === 0 ? `inset 0 -2px 0 ${pc.color}` : "none" }}>
                <Icon name={ic} size={17} /> {l}
              </div>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, paddingRight: 20, fontSize: 13.5, color: ink.muted }}>
              <Icon name="file" size={15} /> essay_final.docx
            </div>
          </div>
          <div style={{ padding: "22px 26px", height: 470, overflow: "hidden", fontSize: 16, lineHeight: 1.75, color: ink.body, position: "relative" }}>
            <p style={{ margin: 0 }}>{essay.map((e) => e.s).join(" ")}</p>
            <p style={{ margin: "14px 0 0" }}>{more[0]}</p>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 90, background: "linear-gradient(transparent, #fff)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 26px", borderTop: `1px solid ${ink.border}`, background: "#fcfcfe" }}>
            <span style={{ fontSize: 14, color: ink.muted }}>412 words · 2,519 characters</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, color: ink.body }}>
              <Toggle on={false} color={pc.color} /> Paraphrase before checking
            </span>
            <Btn color={pc.color} icon="search">Check similarity</Btn>
          </div>
        </Card>
        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          {["Web sources", "Class submissions", "Journal database"].map((t) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: "#fff", border: `1px solid ${ink.border}`, fontSize: 14, color: ink.body }}>
              <Icon name="check" size={15} color={pc.color} stroke={3} /> {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gap: 20, alignContent: "start", paddingTop: 6 }}>
        <Card title="Recent checks" action={<span style={{ fontSize: 14, fontWeight: 650, color: pc.color }}>History</span>}>
          {[
            ["research_intro.docx", "Today, 9:12 AM", 12, "green"],
            ["group3_report.pdf", "Yesterday", 34, "red"],
            ["reflection_paper.docx", "Mar 8", 6, "green"],
            ["case_study_draft.docx", "Mar 7", 19, "amber"],
          ].map(([f, t, pct, tone]) => (
            <div key={f as string} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: `1px solid ${ink.line}` }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: pc.soft, display: "grid", placeItems: "center", color: pc.color }}>
                <Icon name="file" size={18} />
              </div>
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>{f}</div>
                <div style={{ fontSize: 12.5, color: ink.muted }}>{t}</div>
              </div>
              <Badge tone={tone as "green" | "red" | "amber"} style={{ marginLeft: "auto" }}>
                {pct}%
              </Badge>
            </div>
          ))}
        </Card>
        <Card title="This month">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              ["128", "Checked"],
              ["14%", "Avg. similarity"],
              ["9", "Flagged"],
            ].map(([v, l]) => (
              <div key={l} style={{ padding: "12px 12px", borderRadius: 12, background: ink.bg }}>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>{v}</div>
                <div style={{ fontSize: 12.5, color: ink.muted }}>{l}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ background: `linear-gradient(140deg, ${pc.color}, #4c1d95)`, border: 0, color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 16 }}>
            <Icon name="sparkle" size={20} color="#fff" /> Paraphrasing assistant
          </div>
          <div style={{ fontSize: 14.5, opacity: 0.9, marginTop: 8, lineHeight: 1.55 }}>Rewrite flagged sentences in your own style, then check again to compare the score.</div>
        </Card>
      </div>
    </div>
  </Screen>
);

/* ------------------------------------------------------------------ */
const Gauge: React.FC<{ pct: number; size?: number }> = ({ pct, size = 250 }) => {
  const sw = 16;
  const r = size / 2 - sw;
  const c = Math.PI * r;
  const cy = size / 2;
  const arc = `M ${sw} ${cy} A ${r} ${r} 0 0 1 ${size - sw} ${cy}`;
  return (
    <div style={{ position: "relative", width: size, height: cy + sw }}>
      <svg width={size} height={cy + sw}>
        <path d={arc} fill="none" stroke={ink.line} strokeWidth={sw} strokeLinecap="round" />
        <path d={arc} fill="none" stroke="#f59e0b" strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${(pct / 100) * c} ${c}`} />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 4, textAlign: "center", lineHeight: 1 }}>
        <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: -1.5 }}>{pct}%</div>
      </div>
    </div>
  );
};

export const PcResult: React.FC = () => (
  <Screen>
    <TopNav active="Check" />
    <div style={{ padding: "26px 48px 0", display: "flex", alignItems: "center", gap: 14 }}>
      <div>
        <div style={{ fontSize: 13.5, color: ink.muted }}>Results</div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.6 }}>essay_final.docx</div>
      </div>
      <Badge tone="amber" style={{ marginLeft: 8 }}>
        Moderate similarity
      </Badge>
      <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
        <Btn variant="outline" icon="download">Download report</Btn>
        <Btn color={pc.color} icon="sparkle">Paraphrase flagged sentences</Btn>
      </div>
    </div>
    <div style={{ padding: "22px 48px", display: "grid", gridTemplateColumns: "1fr 420px", gap: 26 }}>
      <Card pad={34} style={{ height: 790, overflow: "hidden", position: "relative" }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: ink.subtle, marginBottom: 14 }}>Online learning after the pandemic</div>
        <div style={{ fontSize: 17, lineHeight: 1.95, color: ink.body }}>
          {essay.map((e, i) => {
            const src = e.src ? sources[e.src - 1] : null;
            return (
              <React.Fragment key={i}>
                {src ? (
                  <span style={{ background: src.bg, boxShadow: `inset 0 -2px 0 ${src.color}`, borderRadius: 3, padding: "1px 0" }}>
                    {e.s}
                    <sup style={{ marginLeft: 3, padding: "0 5px", borderRadius: 4, background: src.color, color: "#fff", fontSize: 11, fontWeight: 700 }}>{src.n}</sup>
                  </span>
                ) : (
                  e.s
                )}{" "}
                {i === 4 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </React.Fragment>
            );
          })}
          {more.map((p) => (
            <p key={p} style={{ margin: "22px 0 0" }}>
              {p}
            </p>
          ))}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 80, background: "linear-gradient(transparent, #fff)" }} />
      </Card>
      <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Gauge pct={23} />
            <div style={{ fontSize: 15, color: ink.muted, marginTop: 2 }}>Overall similarity</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
            {[
              ["Matched sentences", "4 of 26"],
              ["Sources found", "3"],
              ["Words checked", "412"],
              ["Time", "3.8 s"],
            ].map(([l, v]) => (
              <div key={l} style={{ padding: "12px 14px", borderRadius: 12, background: ink.bg }}>
                <div style={{ fontSize: 12.5, color: ink.muted }}>{l}</div>
                <div style={{ fontSize: 19, fontWeight: 750, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Matched sources">
          {sources.map((s) => (
            <div key={s.n} style={{ padding: "12px 0", borderTop: `1px solid ${ink.line}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 26, height: 26, borderRadius: 7, background: s.color, color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13 }}>{s.n}</span>
                <div style={{ lineHeight: 1.3, minWidth: 0 }}>
                  <div style={{ fontWeight: 650, fontSize: 14.5 }}>{s.title}</div>
                  <div style={{ fontSize: 12.5, color: ink.muted }}>{s.where}</div>
                </div>
                <b style={{ marginLeft: "auto", fontSize: 16 }}>{s.pct}%</b>
              </div>
              <div style={{ marginTop: 10, paddingLeft: 38 }}>
                <Bar value={s.pct * 4} color={s.color} h={6} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  </Screen>
);

/* ------------------------------------------------------------------ */
const pairs: { before: string; after: React.ReactNode; src: number }[] = [
  {
    src: 1,
    before: essay[2].s,
    after: (
      <>
        Students who <Chg>follow a set study routine every day</Chg> <Chg>usually do better</Chg> in online classes than <Chg>those who only study when a deadline is near</Chg>.
      </>
    ),
  },
  {
    src: 2,
    before: essay[4].s,
    after: (
      <>
        <Chg>Without a reliable internet connection</Chg>, many learners miss live classes and <Chg>have to catch up using recorded lessons</Chg>.
      </>
    ),
  },
  {
    src: 3,
    before: essay[6].s,
    after: (
      <>
        Blended learning <Chg>mixes in-person classes with online work</Chg>, so schools <Chg>can stay flexible</Chg> while keeping the routines that <Chg>help students stay focused</Chg>.
      </>
    ),
  },
  {
    src: 1,
    before: essay[8].s,
    after: (
      <>
        <Chg>Students tend to stay more engaged online</Chg> when teachers <Chg>give them feedback often</Chg>.
      </>
    ),
  },
];

function Chg({ children }: { children: React.ReactNode }) {
  return <span style={{ background: "#dcfce7", boxShadow: "inset 0 -2px 0 #22c55e", borderRadius: 3 }}>{children}</span>;
}

export const PcParaphrase: React.FC = () => (
  <Screen>
    <TopNav active="Paraphrase" />
    <div style={{ padding: "26px 48px 0", display: "flex", alignItems: "center", gap: 18 }}>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.6 }}>Paraphrase flagged sentences</div>
        <div style={{ fontSize: 15, color: ink.muted }}>4 sentences from essay_final.docx</div>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: 4, borderRadius: 12, background: "#fff", border: `1px solid ${ink.border}` }}>
        {["Standard", "Formal", "Simple"].map((m, i) => (
          <span key={m} style={{ padding: "7px 14px", borderRadius: 9, fontSize: 14, fontWeight: i === 1 ? 650 : 500, background: i === 1 ? pc.color : "transparent", color: i === 1 ? "#fff" : ink.muted }}>
            {m}
          </span>
        ))}
      </div>
      <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, color: ink.body }}>
        <Toggle on color={pc.color} /> Keep citations
      </span>
    </div>
    <div style={{ padding: "22px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
      {["Original", "Paraphrased"].map((side, k) => (
        <div key={side} style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: k ? ink.green : ink.muted, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name={k ? "sparkle" : "file"} size={15} /> {side}
        </div>
      ))}
      {pairs.map((p, i) => (
        <React.Fragment key={i}>
          <Card pad={22} style={{ display: "flex", gap: 14 }}>
            <span style={{ width: 24, height: 24, flex: "none", borderRadius: 7, background: sources[p.src - 1].color, color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 12.5, marginTop: 3 }}>{p.src}</span>
            <div style={{ fontSize: 16, lineHeight: 1.75, color: ink.body }}>{p.before}</div>
          </Card>
          <Card pad={22} style={{ borderColor: "#bbf7d0", display: "flex", gap: 14 }}>
            <span style={{ width: 24, height: 24, flex: "none", borderRadius: 7, background: ink.greenSoft, color: ink.green, display: "grid", placeItems: "center", marginTop: 3 }}>
              <Icon name="check" size={15} stroke={3} />
            </span>
            <div style={{ fontSize: 16, lineHeight: 1.75, color: ink.text }}>{p.after}</div>
          </Card>
        </React.Fragment>
      ))}
    </div>
    <div style={{ margin: "0 48px", display: "flex", alignItems: "center", gap: 28, padding: "20px 26px", borderRadius: 16, background: "#fff", border: `1px solid ${ink.border}` }}>
      <div>
        <div style={{ fontSize: 13, color: ink.muted }}>Similarity before</div>
        <div style={{ fontSize: 30, fontWeight: 800, color: "#d97706" }}>23%</div>
      </div>
      <Icon name="arrow" size={26} color={ink.subtle} />
      <div>
        <div style={{ fontSize: 13, color: ink.muted }}>Estimated after</div>
        <div style={{ fontSize: 30, fontWeight: 800, color: ink.green }}>7%</div>
      </div>
      <div style={{ flex: 1, marginLeft: 12 }}>
        <div style={{ display: "flex", fontSize: 13, color: ink.muted, marginBottom: 8 }}>
          <span>Meaning kept</span>
          <b style={{ marginLeft: "auto", color: ink.text }}>High</b>
        </div>
        <Bar value={88} color={ink.green} h={8} />
      </div>
      <Btn variant="outline" icon="copy">Copy text</Btn>
      <Btn color={pc.color} icon="refresh">Apply & check again</Btn>
    </div>
  </Screen>
);

/* ------------------------------------------------------------------ */
const PY = `from flask import Blueprint, jsonify, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .sources import load_sources
from .text import clean, read_upload, split_sentences

bp = Blueprint("check", __name__)
THRESHOLD = 0.75  # a sentence counts as a match above this score


@bp.post("/api/check")
def check():
    text = clean(request.form.get("text") or read_upload(request.files["file"]))
    sentences = split_sentences(text)
    sources = load_sources()

    vectorizer = TfidfVectorizer(ngram_range=(1, 3), stop_words="english")
    matrix = vectorizer.fit_transform(sentences + [s.text for s in sources])
    scores = cosine_similarity(matrix[: len(sentences)], matrix[len(sentences):])

    matches = []
    for sentence, row in zip(sentences, scores):
        best = row.argmax()
        if row[best] >= THRESHOLD:
            matches.append({"sentence": sentence, "source": sources[best].title,
                            "score": round(float(row[best]), 2)})

    similarity = round(100 * len(matches) / max(len(sentences), 1))
    return jsonify(similarity=similarity, matches=matches)
`;

export const PcCode: React.FC = () => (
  <CodeEditor
    project="plagiarism-checker"
    file="check.py"
    path={["plagiarism-checker", "app", "check.py"]}
    lang="python"
    code={PY}
    highlightLine={19}
    tabs={["check.py", "paraphrase.py", "text.py"]}
    tree={[
      { name: "plagiarism-checker", depth: 0, folder: true, open: true },
      { name: "app", depth: 1, folder: true, open: true },
      { name: "__init__.py", depth: 2 },
      { name: "check.py", depth: 2, active: true, modified: true },
      { name: "paraphrase.py", depth: 2 },
      { name: "sources.py", depth: 2 },
      { name: "text.py", depth: 2 },
      { name: "templates", depth: 1, folder: true },
      { name: "static", depth: 1, folder: true },
      { name: "tests", depth: 1, folder: true, open: true },
      { name: "test_check.py", depth: 2 },
      { name: "test_paraphrase.py", depth: 2 },
      { name: "requirements.txt", depth: 1 },
      { name: "README.md", depth: 1 },
    ]}
    terminal={[
      { t: "$ pytest -q", c: "#e2e8f0" },
      { t: "...............                                              [100%]", c: "#addb67" },
      { t: "15 passed in 1.42s", c: "#addb67" },
      { t: "$ flask --app app run --debug", c: "#e2e8f0" },
      { t: " * Running on http://127.0.0.1:5000", c: "#c3cede" },
      { t: " * Debugger is active!", c: "#c3cede" },
    ]}
  />
);
