import { useEffect, useState } from "react";
import type { ResolvedVideo } from "../data/projects";
import { useInView } from "../lib/hooks";
import { useVideoStatus } from "../lib/video";
import Icon from "./Icon";
import MediaImage from "./MediaImage";

/**
 * Click-to-play video player. Shows only the poster until played, so pages
 * stay fast. Local files use a native <video> (controls, poster,
 * preload="metadata"); YouTube links use a privacy-friendly embed.
 */
export default function VideoPlayer({ video }: { video: ResolvedVideo }) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "300px 0px" });
  const status = useVideoStatus(video, inView);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setPlaying(false);
    setFailed(false);
  }, [video.id]);

  const missing = status === "missing" || failed;
  const label = `${video.title}, ${video.project.title} demo`;

  return (
    <div ref={ref} className={`player${playing && !missing ? " is-playing" : ""}`}>
      {playing && !missing ? (
        video.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            key={video.id}
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster={video.posterUrl}
            src={video.url}
            onError={() => setFailed(true)}
            aria-label={label}
          >
            Your browser does not support embedded videos.
          </video>
        )
      ) : (
        <div className="player__facade">
          <MediaImage src={video.posterUrl} alt="" width={1280} height={720} />
          <div className="player__shade" aria-hidden="true" />

          {missing ? (
            <span className="player__soon">
              <Icon name="film" size={16} /> Demo video coming soon
            </span>
          ) : (
            <button
              type="button"
              className="player__play"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${label}`}
            >
              <span className="player__ring" aria-hidden="true" />
              <Icon name="play" size={30} />
            </button>
          )}

          <div className="player__meta" aria-hidden="true">
            <span className="player__project">{video.project.title}</span>
            <span className="player__title">{video.title}</span>
          </div>
          {video.duration && <span className="player__duration">{video.duration}</span>}
        </div>
      )}
    </div>
  );
}
