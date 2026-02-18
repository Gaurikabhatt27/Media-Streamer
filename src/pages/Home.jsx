import { useEffect, useState } from "react";
import { getTrendingVideos } from "../api/youtube.js";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";
import styles from "./Home.module.css";

function Home() {

  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadInitialVideos();
  }, []);

  const loadInitialVideos = async () => {
    setLoading(true);
    const data = await getTrendingVideos(nextToken, "US");
    setVideos(data.videos);
    setNextToken(data.nextPageToken);
    setLoading(false);
  };

  const loadMoreVideos = async () => {
    if (!nextToken) return;

    setLoadingMore(true);

    const data = await getTrendingVideos(nextToken);

    setVideos(prev => [...prev, ...data.videos]);
    setNextToken(data.nextPageToken);

    setLoadingMore(false);
  };

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

      <div className={styles.grid}>
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
          />
        ))}
      </div>

      {nextToken && (
        <div style={{ textAlign: "center", margin: "30px" }}>
          <button
            onClick={loadMoreVideos}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              background: "#5a66e9",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
