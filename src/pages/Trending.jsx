import { useEffect, useState } from "react";
import { getTrendingVideos } from "../api/youtube";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";

function Trending() {

  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (pageToken = null) => {
    setLoading(true);

    const data = await getTrendingVideos(pageToken, "IN");

    if (pageToken) {
      setVideos(prev => [...prev, ...data.videos]);
    } else {
      setVideos(data.videos);
    }

    setNextToken(data.nextPageToken);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos(); 
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "white" }}>Trending</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px"
      }}>
        {videos.length === 0
          ? Array(12).fill("").map((_, i) => <ShimmerCard key={i} />)
          : videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
      </div>

      {nextToken && (
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <button
            onClick={() => fetchVideos(nextToken)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              background: "#ff0000",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Load More
          </button>
        </div>
      )}

    </div>
  );
}

export default Trending;
