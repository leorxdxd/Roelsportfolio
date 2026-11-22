import React from "react";
import { Composition } from "remotion";
import { Showreel } from "./Showreel";
import timeline from "./timeline.json";

export const Root: React.FC = () => (
  <Composition id="Showreel" component={Showreel} durationInFrames={timeline.end} fps={timeline.fps} width={1920} height={1080} />
);
