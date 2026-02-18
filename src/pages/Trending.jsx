import { useEffect, useState } from "react";
import { getTrendingVideos } from "../api/youtube";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";
import "./grid.css";

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
    <div className="content">
      <h1 className="pageTitle">Trending</h1>

      <div className="videoGrid">
        {videos.length === 0
          ? Array(12).fill("").map((_, i) => <ShimmerCard key={i} />)
          : videos.map((video) => (
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
              background: "#8086e3",
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
