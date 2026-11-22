/**
 * Videos in the Home page "Videos" section. The first one is the default and plays from the
 * hero "Watch the tour" button. They are personal videos, not project demos, so they are NOT
 * listed in projects.json or the Demo Theater.
 *
 * Both are made in /video (Remotion) and copied into public/assets/showreel/:
 *   tour      cd video && npm run tour:capture && npm run tour:site   (records this website, renders, compresses)
 *   showreel  cd video && npm run site
 */
export interface Reel {
  id: "tour" | "showreel";
  /** Short name for the picker and the player. */
  title: string;
  /** One line under the title on the cover. */
  subtitle: string;
  src: string;
  poster: string;
  /** Shown on the player, e.g. "0:30". */
  duration: string;
  /** Chapter start times in seconds. */
  chapters: { at: number; label: string }[];
}

export const reels: Reel[] = [
  {
    id: "tour",
    title: "Website tour",
    subtitle: "This site and six projects in 30 seconds",
    src: "assets/showreel/site-tour.mp4",
    poster: "assets/showreel/site-tour.webp",
    duration: "0:30",
    // Keep in sync with the cuts in video/src/tour/timeline.json (frames ÷ 30)
    chapters: [
      { at: 0, label: "Search and open" },
      { at: 4, label: "The page builds itself" },
      { at: 7, label: "3D portrait and tests" },
      { at: 10, label: "Six projects" },
      { at: 15, label: "Code, tests, app" },
      { at: 19, label: "Projects page" },
      { at: 22, label: "Search and dark mode" },
      { at: 26, label: "Let's work together" },
    ],
  },
  {
    id: "showreel",
    title: "Showreel",
    subtitle: "Web apps, business systems & IT support",
    src: "assets/showreel/showreel.mp4",
    poster: "assets/showreel/poster.webp",
    duration: "0:35",
    // Keep in sync with the cuts in video/src/timeline.json
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
  },
];

export const defaultReel = reels[0];

/** Length in seconds, from `duration` ("0:30" → 30). */
export const reelSeconds = (reel: Reel) => reel.duration.split(":").reduce((t, n) => t * 60 + Number(n), 0);
