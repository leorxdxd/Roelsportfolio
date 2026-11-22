import React from "react";
import { useCurrentFrame } from "remotion";
import { Backdrop, Camera, Caret, Sfx, Window } from "../components/ui";
import { c } from "../theme";
import { prog, typed } from "../lib";

// Original "lyrics" — the problem the client has.
const LINES = ["♪ wifi's down, printer's jammed", "♪ reports take all week", "♪ we need someone who can", "♪ fix it — and build it"];
const TEXT = LINES.join("\n");
const START = 4;
const CPS = 58;

export const S1Notes: React.FC = () => {
  const f = useCurrentFrame();
  const shown = typed(f, START, CPS, TEXT);
  const lines = shown.split("\n");
  const done = shown.length === TEXT.length;
  const mark = prog(f, 66, 76);

  return (
    <Backdrop>
      <Camera
        keys={[
          { f: 0, x: 900, y: 420, s: 1.25, r: -2 },
          { f: 30, x: 930, y: 470, s: 1.3, r: -1 },
          { f: 62, x: 960, y: 580, s: 1.32, r: 0 },
          { f: 74, x: 980, y: 600, s: 1.2 },
          { f: 96, x: 1140, y: 640, s: 2.6 },
        ]}
      >
        <Window x={360} y={170} w={1200} h={700} title="song.txt — Notes">
          <div style={{ padding: "56px 64px", fontFamily: "Consolas, 'Cascadia Mono', monospace", fontSize: 54, lineHeight: "92px", color: c.text }}>
            {lines.map((line, i) => {
              const last = i === lines.length - 1;
              if (i === 3 && done) {
                return (
                  <div key={i} style={{ fontWeight: 700 }}>
                    {"♪ "}
                    <Marked p={mark}>fix it</Marked>
                    {" — and "}
                    <Marked p={prog(f, 72, 82)}>build it</Marked>
                    <Caret />
                  </div>
                );
              }
              return (
                <div key={i} style={{ fontWeight: i === 3 ? 700 : 400, color: i === 3 ? c.text : "#334155" }}>
                  {line}
                  {last && <Caret />}
                </div>
              );
            })}
          </div>
        </Window>
      </Camera>
      <Sfx at={START} name="typing" volume={0.35} dur={Math.ceil((TEXT.length / CPS) * 30)} />
      <Sfx at={68} name="pop" volume={0.4} />
    </Backdrop>
  );
};

const Marked: React.FC<{ p: number; children: React.ReactNode }> = ({ p, children }) => (
  <span style={{ position: "relative", zIndex: 0, display: "inline-block", color: p > 0.5 ? c.accent : undefined }}>
    <span
      style={{
        position: "absolute",
        left: -6,
        right: -6,
        top: 14,
        bottom: 10,
        background: c.accentSoft,
        borderRadius: 10,
        transformOrigin: "left",
        transform: `scaleX(${p})`,
        zIndex: -1,
      }}
    />
    {children}
  </span>
);
