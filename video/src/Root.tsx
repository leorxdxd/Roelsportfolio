import React from "react";
import { Composition, Folder, Still } from "remotion";
import { Showreel } from "./Showreel";
import { images } from "./screens";
import { SiteTour } from "./tour/SiteTour";
import timeline from "./timeline.json";

export const Root: React.FC = () => (
  <>
    <Composition id="Showreel" component={Showreel} durationInFrames={timeline.end} fps={timeline.fps} width={1920} height={1080} />
    <Composition id="SiteTour" component={SiteTour} durationInFrames={900} fps={30} width={1920} height={1080} />
    <Folder name="Website-images">
      {images.map((im) => (
        <Still key={im.id} id={im.id} component={im.component} width={im.width} height={im.height} />
      ))}
    </Folder>
  </>
);
