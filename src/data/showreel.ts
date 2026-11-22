/**
 * Portfolio showreel shown on the Home page. It's a personal intro video,
 * not a project demo, so it is NOT listed in projects.json or the Demo Theater.
 *
 * The video is made in /video (Remotion). To update it: `cd video && npm run site`,
 * which re-renders and copies showreel.mp4 + poster.webp into public/assets/showreel/.
 */
export const showreel = {
  title: "Portfolio showreel",
  src: "assets/showreel/showreel.mp4",
  poster: "assets/showreel/poster.webp",
  duration: "0:35",
  /** Chapter start times in seconds. Keep in sync with the cuts in video/src/timeline.json. */
  chapters: [
    { at: 0, label: "The problem" },
    { at: 3.2, label: "AI search" },
    { at: 8.2, label: "Hi, I'm Roel" },
    { at: 12.2, label: "I build systems" },
    { at: 17.2, label: "Helpdesk in action" },
    { at: 23.2, label: "Every detail checked" },
    { at: 27.2, label: "Built to be used" },
    { at: 31.2, label: "Let's build yours" },
  ],
};

/** Total length in seconds, from `duration` ("0:35" → 35). */
export const showreelSeconds = showreel.duration.split(":").reduce((t, n) => t * 60 + Number(n), 0);
