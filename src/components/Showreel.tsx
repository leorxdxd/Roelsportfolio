import { useEffect, useRef, useState, type CSSProperties } from "react";
import { assetUrl } from "../data/projects";
import { showreel, showreelSeconds } from "../data/showreel";
import { site } from "../data/site";
import Icon from "./Icon";
import MediaImage from "./MediaImage";

export const SHOWREEL_ID = "showreel";
const PLAY_EVENT = "play-showreel";

/**
 * Scrolls to the showreel and starts it (used by the hero button and the
 * command palette). Returns false when the showreel isn't on this page.
 */
export function playShowreel(): boolean {
  const el = document.getElementById(SHOWREEL_ID);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  window.dispatchEvent(new Event(PLAY_EVENT));
  return true;
}

const { chapters } = showreel;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/**
 * Click-to-play showreel with chapters. Only the poster loads until the
 * visitor presses play. The chapter buttons jump to a part of the video and
 * double as a progress bar while it plays.
 */
export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startAt = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [time, setTime] = useState(0);

  const play = (at = 0) => {
    setTime(at);
    const v = videoRef.current;
    if (v) {
      v.currentTime = at;
      v.play().catch(() => {});
    } else {
      startAt.current = at;
      setFailed(false);
      setPlaying(true);
    }
  };

  useEffect(() => {
    const onPlay = () => play(0);
    window.addEventListener(PLAY_EVENT, onPlay);
    return () => window.removeEventListener(PLAY_EVENT, onPlay);
    // `play` only uses refs and state setters, so the first render's copy stays valid.
  }, []);

  // Once the video appears, move keyboard focus to it (space = pause, arrows = seek).
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => videoRef.current?.focus({ preventScroll: true }), 60);
    return () => window.clearTimeout(t);
  }, [playing]);

  const live = playing && !failed;
  let active = -1;
  if (live) {
    chapters.forEach((c, i) => {
      if (time >= c.at - 0.3) active = i;
    });
  }

  return (
    <div className="reel">
      <div className="reel__frame">
        <div id={SHOWREEL_ID} tabIndex={-1} className={`player player--reel${live ? " is-playing" : ""}`}>
          {live ? (
            <video
              ref={videoRef}
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={assetUrl(showreel.poster)}
              src={assetUrl(showreel.src)}
              onLoadedMetadata={(e) => {
                if (startAt.current) e.currentTarget.currentTime = startAt.current;
              }}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onError={() => {
                setFailed(true);
                setPlaying(false);
              }}
              aria-label={`${showreel.title}, ${site.name}`}
            >
              Your browser does not support embedded videos.
            </video>
          ) : (
            <div className="player__facade">
              <MediaImage src={assetUrl(showreel.poster)} alt="" width={1600} height={900} />
              <div className="player__shade" aria-hidden="true" />
              <span className="reel__sound" aria-hidden="true">
                <Icon name="volume" size={14} /> Sound on
              </span>
              {failed ? (
                <span className="player__soon">
                  <Icon name="film" size={16} /> Video unavailable right now
                </span>
              ) : (
                <button
                  type="button"
                  className="player__play"
                  onClick={() => play(0)}
                  aria-label={`Play my ${showreel.title.toLowerCase()} (${showreelSeconds} seconds)`}
                >
                  <span className="player__ring" aria-hidden="true" />
                  <Icon name="play" size={30} />
                </button>
              )}
              <div className="player__meta" aria-hidden="true">
                <span className="player__project">{showreel.title}</span>
                <span className="player__title">Web apps, business systems & IT support</span>
              </div>
              <span className="player__duration">{showreel.duration}</span>
            </div>
          )}
        </div>
      </div>

      <ol className="reel-chapters" aria-label="Chapters">
        {chapters.map((c, i) => {
          const end = chapters[i + 1]?.at ?? showreelSeconds;
          const p = i < active ? 1 : i === active ? Math.min(1, Math.max(0, (time - c.at) / (end - c.at))) : 0;
          return (
            <li key={c.at}>
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
