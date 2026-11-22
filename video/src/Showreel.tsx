import React from "react";
import { AbsoluteFill, Audio, getStaticFiles, staticFile } from "remotion";
import { TransitionPresentation, TransitionSeries, linearTiming } from "@remotion/transitions";
import { pushCut } from "@remotion/transitions/push-cut";
import { iris } from "@remotion/transitions/iris";
import { cube } from "@remotion/transitions/cube";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { slide } from "@remotion/transitions/slide";
import timeline from "./timeline.json";
import { Sfx } from "./components/ui";
import { S1Notes } from "./scenes/S1Notes";
import { S2Search } from "./scenes/S2Search";
import { S3Story } from "./scenes/S3Story";
import { S4Editor } from "./scenes/S4Editor";
import { S5Helpdesk } from "./scenes/S5Helpdesk";
import { S6Photos } from "./scenes/S6Photos";
import { S7Reels } from "./scenes/S7Reels";
import { S8Outro } from "./scenes/S8Outro";
import { fontFamily } from "./theme";

const W = 1920;
const H = 1080;
const T = timeline.transition;

const scenes: React.FC[] = [S1Notes, S2Search, S3Story, S4Editor, S5Helpdesk, S6Photos, S7Reels, S8Outro];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transitions: TransitionPresentation<any>[] = [
  pushCut({ flashColor: "#ffffff", flashOpacity: 0.8 }),
  iris({ width: W, height: H }),
  cube({ direction: "from-right" }),
  wipe({ direction: "from-bottom-left" }),
  clockWipe({ width: W, height: H }),
  slide({ direction: "from-bottom" }),
  pushCut({ flashColor: "#2563eb", flashOpacity: 0.6 }),
];

/** Durations so that each transition is centred on a beat-aligned cut. */
export function sceneDurations() {
  const starts = [0, ...timeline.cuts.map((c) => c - T / 2)];
  return starts.map((s, i) => (i < timeline.cuts.length ? timeline.cuts[i] + T / 2 - s : timeline.end - s));
}

// Use a downloaded royalty-free track if present (public/music.mp3), else the generated one.
const music = getStaticFiles().some((f) => f.name === "music.mp3") ? "music.mp3" : "music.wav";

export const Showreel: React.FC = () => {
  const durations = sceneDurations();
  return (
    <AbsoluteFill style={{ background: "#000", fontFamily }}>
      <TransitionSeries>
        {scenes.map((Scene, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={durations[i]}>
              <Scene />
            </TransitionSeries.Sequence>
            {i < transitions.length && <TransitionSeries.Transition presentation={transitions[i]} timing={linearTiming({ durationInFrames: T })} />}
          </React.Fragment>
        ))}
      </TransitionSeries>
      <Audio src={staticFile(music)} volume={(f) => Math.min(1, (timeline.end - f) / 15) * 0.68} />
      {timeline.cuts.map((cut) => (
        <Sfx key={cut} at={cut - 9} name="whoosh" volume={0.45} dur={20} />
      ))}
    </AbsoluteFill>
  );
};
