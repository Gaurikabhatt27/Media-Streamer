import { useEffect, useRef, useState, useCallback } from "react";
import { getTrendingVideos } from "../api/youtube.js";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";
import styles from "./Home.module.css";
import "./grid.css";

function HomeScroll() {

  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const observer = useRef();

  useEffect(() => {
    loadInitialVideos();
  }, []);

  const loadInitialVideos = async () => {
    setLoading(true);
    const data = await getTrendingVideos(null, "US");
    setVideos(data.videos);
    setNextToken(data.nextPageToken);
    setLoading(false);
  };

  const loadMoreVideos = async () => {
    if (!nextToken || loadingMore) return;

    setLoadingMore(true);

    const data = await getTrendingVideos(nextToken, "US");

    setVideos(prev => [...prev, ...data.videos]);
    setNextToken(data.nextPageToken);

    setLoadingMore(false);
  };

  const lastVideoRef = useCallback(node => {

    if (loadingMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextToken) {
        loadMoreVideos();
      }
    }, {
      threshold: 1.0
    });

    if (node) observer.current.observe(node);

  }, [loadingMore, nextToken]);

  if (loading) {
    return (
      <div className={styles.grid}>
        {Array(12).fill("").map((_, i) => (
          <ShimmerCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Feed For You</h1>

      <div className="videoGrid">
        {videos.map((video, index) => {

          if (index === videos.length - 1) {
            return (
              <div ref={lastVideoRef} key={video.id}>
                <VideoCard video={video} />
              </div>
            );
          }

          return <VideoCard key={video.id} video={video} />;
        })}
      </div>

      {loadingMore && (
        <div className={styles.grid}>
          {Array(6).fill("").map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScroll;
