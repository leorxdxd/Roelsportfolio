import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { ResolvedVideo } from "../data/projects";
import { useVideoStatus } from "../lib/video";
import Icon from "./Icon";
import MediaImage from "./MediaImage";
import VideoPlayer from "./VideoPlayer";

interface Props {
  videos: ResolvedVideo[];
  /** Show "filter by project" chips (Demos page). */
  filters?: boolean;
  /** Keep the selected video in the URL (?v=...) so it can be shared. */
  syncUrl?: boolean;
  headingLevel?: 2 | 3;
  showProjectLink?: boolean;
}

function SoonBadge({ video }: { video: ResolvedVideo }) {
  const status = useVideoStatus(video);
  if (status !== "missing") return null;
  return <span className="playlist-item__soon">Soon</span>;
}

/** Large player + playlist. */
export default function VideoTheater({
  videos,
  filters = false,
  syncUrl = false,
  headingLevel = 2,
  showProjectLink = true,
}: Props) {
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState("all");
  const [currentId, setCurrentId] = useState(() => {
    const fromUrl = syncUrl ? params.get("v") : null;
    return videos.find((v) => v.id === fromUrl)?.id ?? videos[0]?.id;
  });

  const shown = filter === "all" ? videos : videos.filter((v) => v.project.slug === filter);
  const current = videos.find((v) => v.id === currentId) ?? shown[0];

  useEffect(() => {
    if (shown.length && !shown.some((v) => v.id === currentId)) setCurrentId(shown[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  if (!current) return null;

  const select = (id: string) => {
    setCurrentId(id);
    if (syncUrl) setParams({ v: id }, { replace: true, preventScrollReset: true });
  };

  const projectsWithVideos = [...new Map(videos.map((v) => [v.project.slug, v.project])).values()];
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <div className="theater">
      {filters && projectsWithVideos.length > 1 && (
        <div className="filter-bar" role="group" aria-label="Filter videos by project">
          <button
            type="button"
            className="filter-chip"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All demos <span className="filter-chip__count">{videos.length}</span>
          </button>
          {projectsWithVideos.map((p) => (
            <button
              key={p.slug}
              type="button"
              className="filter-chip"
              aria-pressed={filter === p.slug}
              onClick={() => setFilter(p.slug)}
            >
              {p.title}
              <span className="filter-chip__count">
                {videos.filter((v) => v.project.slug === p.slug).length}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className={`theater__grid${videos.length > 1 ? "" : " theater__grid--single"}`}>
        <div className="theater__main">
          <VideoPlayer video={current} />
          <div className="theater__info">
            <div>
              <p className="theater__project">
                <Icon name="folder" size={14} /> {current.project.title}
              </p>
              <Heading className="theater__title">{current.title}</Heading>
              {current.description && <p className="theater__desc">{current.description}</p>}
            </div>
            {showProjectLink && (
              <Link to={`/projects/${current.project.slug}`} className="btn btn--secondary btn--sm">
                Project details <Icon name="arrowRight" size={16} />
              </Link>
            )}
          </div>
        </div>

        {videos.length > 1 && (
          <div className="theater__list">
            <p className="theater__list-head">
              <Icon name="film" size={14} /> Playlist · {shown.length} video{shown.length === 1 ? "" : "s"}
            </p>
            <ul>
              {shown.map((v, i) => {
                const active = v.id === current.id;
                return (
                  <li key={v.id}>
                    <button
                      type="button"
                      className={`playlist-item${active ? " is-active" : ""}`}
                      aria-current={active ? "true" : undefined}
                      onClick={() => select(v.id)}
                    >
                      <span className="playlist-item__index" aria-hidden="true">
                        {active ? (
                          <span className="eq">
                            <i />
                            <i />
                            <i />
                          </span>
                        ) : (
                          i + 1
                        )}
                      </span>
                      <span className="playlist-item__thumb">
                        <MediaImage src={v.posterUrl} alt="" width={160} height={90} />
                      </span>
                      <span className="playlist-item__text">
                        <span className="playlist-item__title">{v.title}</span>
                        <span className="playlist-item__meta">
                          {v.project.title}
                          {v.duration ? ` · ${v.duration}` : ""}
                        </span>
                      </span>
                      <SoonBadge video={v} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
