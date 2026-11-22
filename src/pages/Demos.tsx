import { useEffect } from "react";
import { allVideos, projects } from "../data/projects";
import { setPageMeta } from "../lib/meta";
import CtaBand from "../components/CtaBand";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import VideoTheater from "../components/VideoTheater";

export default function Demos() {
  useEffect(
    () => setPageMeta("Demo Theater", "Watch walkthrough videos of the systems and web apps I've built."),
    [],
  );

  return (
    <>
      <PageHeader
        crumb="Demos"
        eyebrow="Demo theater"
        title="Watch the systems in action"
        lead={`${allVideos.length} walkthrough videos across ${projects.length} projects. Pick one from the playlist or filter by project.`}
      >
        <p className="privacy-note" data-reveal>
          <Icon name="shield" size={16} /> All demos are recorded with sample data. No real client or
          user information.
        </p>
      </PageHeader>

      <section className="section section--tight" aria-label="Demo videos">
        <div className="container" data-reveal>
          <VideoTheater videos={allVideos} filters syncUrl />
        </div>
      </section>

      <CtaBand title="Want a walkthrough?" lead="I can show you any of these systems on a short call and talk through how it could fit your work." />
    </>
  );
}
