import { useEffect, useRef, useState, type CSSProperties } from "react";
import { assetUrl } from "../data/projects";
import { defaultReel, reels, reelSeconds, type Reel } from "../data/showreel";
import { site } from "../data/site";
import Icon from "./Icon";
import MediaImage from "./MediaImage";

export const SHOWREEL_ID = "showreel";
const PLAY_EVENT = "play-reel";

/**
 * Scrolls to the video section and plays a video (used by the hero button and the
 * command palette). Returns false when the section isn't on this page.
 */
export function playReel(id: Reel["id"] = defaultReel.id): boolean {
  const el = document.getElementById(SHOWREEL_ID);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  window.dispatchEvent(new CustomEvent<Reel["id"]>(PLAY_EVENT, { detail: id }));
  return true;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const findReel = (id: Reel["id"]) => reels.find((r) => r.id === id) ?? defaultReel;

/**
 * Click-to-play videos with chapters, and a picker when there is more than one.
 * Only the cover image loads until the visitor presses play. The chapter buttons jump
 * to a part of the video and double as a progress bar while it plays.
 */
export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startAt = useRef(0);
  const [reelId, setReelId] = useState<Reel["id"]>(defaultReel.id);
  const current = useRef(reelId);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [time, setTime] = useState(0);
  const reel = findReel(reelId);
  const seconds = reelSeconds(reel);

  const play = (at = 0, id: Reel["id"] = current.current) => {
    setTime(at);
    const v = videoRef.current;
    if (v && id === current.current) {
      v.currentTime = at;
      v.play().catch(() => {});
      return;
    }
    current.current = id;
    setReelId(id);
    startAt.current = at;
    setFailed(false);
    setPlaying(true);
  };

  const choose = (id: Reel["id"]) => {
    if (id === current.current) return;
    current.current = id;
    setReelId(id);
    setPlaying(false);
    setFailed(false);
    setTime(0);
  };

  useEffect(() => {
    const onPlay = (e: Event) => play(0, (e as CustomEvent<Reel["id"]>).detail ?? current.current);
    window.addEventListener(PLAY_EVENT, onPlay);
    return () => window.removeEventListener(PLAY_EVENT, onPlay);
    // `play` only uses refs and state setters, so the first render's copy stays valid.
  }, []);

  // Once the video appears, move keyboard focus to it (space = pause, arrows = seek).
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => videoRef.current?.focus({ preventScroll: true }), 60);
    return () => window.clearTimeout(t);
  }, [playing, reelId]);

  const live = playing && !failed;
  let active = -1;
  if (live) {
    reel.chapters.forEach((c, i) => {
      if (time >= c.at - 0.3) active = i;
    });
  }

  return (
    <div className="reel">
      {reels.length > 1 && (
        <div className="filter-bar reel__picker" role="group" aria-label="Choose a video">
          {reels.map((r) => (
            <button key={r.id} type="button" className="filter-chip" aria-pressed={r.id === reel.id} onClick={() => choose(r.id)}>
              {r.title}
              <span className="filter-chip__count">{r.duration}</span>
            </button>
          ))}
        </div>
      )}

      <div className="reel__frame">
        <div id={SHOWREEL_ID} tabIndex={-1} className={`player player--reel${live ? " is-playing" : ""}`}>
          {live ? (
            <video
              key={reel.id}
              ref={videoRef}
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={assetUrl(reel.poster)}
              src={assetUrl(reel.src)}
              onLoadedMetadata={(e) => {
                if (startAt.current) e.currentTarget.currentTime = startAt.current;
              }}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onError={() => {
                setFailed(true);
                setPlaying(false);
              }}
              aria-label={`${reel.title}, ${site.name}`}
            >
              Your browser does not support embedded videos.
            </video>
          ) : (
            <div key={reel.id} className="player__facade">
              <MediaImage src={assetUrl(reel.poster)} alt="" width={1600} height={900} />
              <div className="player__shade" aria-hidden="true" />
              <span className="reel__sound" aria-hidden="true">
                <Icon name="volume" size={14} /> Sound on
              </span>
              {failed ? (
                <span className="player__soon">
                  <Icon name="film" size={16} /> Video unavailable right now
                </span>
              ) : (
                <button type="button" className="player__play" onClick={() => play(0)} aria-label={`Play the ${reel.title.toLowerCase()} (${seconds} seconds)`}>
                  <span className="player__ring" aria-hidden="true" />
                  <Icon name="play" size={30} />
                </button>
              )}
              <div className="player__meta" aria-hidden="true">
                <span className="player__project">{reel.title}</span>
                <span className="player__title">{reel.subtitle}</span>
              </div>
              <span className="player__duration">{reel.duration}</span>
            </div>
          )}
        </div>
      </div>

      <ol className="reel-chapters" aria-label={`Chapters: ${reel.title}`}>
        {reel.chapters.map((c, i) => {
          const end = reel.chapters[i + 1]?.at ?? seconds;
          const p = i < active ? 1 : i === active ? Math.min(1, Math.max(0, (time - c.at) / (end - c.at))) : 0;
          return (
            <li key={`${reel.id}-${c.at}`}>
              <button
                type="button"
                className={`reel-chapter${i === active ? " is-active" : ""}`}
                style={{ "--p": p } as CSSProperties}
                onClick={() => play(c.at)}
                aria-current={i === active ? "true" : undefined}
              >
                <span className="visually-hidden">Play from </span>
                <span className="reel-chapter__time">{fmt(c.at)}</span>
                <span className="reel-chapter__label">{c.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
