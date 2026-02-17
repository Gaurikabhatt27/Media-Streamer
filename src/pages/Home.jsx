import { useEffect, useState } from "react";
import { getTrendingVideos } from "../api/youtube.js";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getTrendingVideos();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Trending Videos</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {videos.map((video) => (
          <div key={video.id} style={{ width: "250px" }}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              style={{ width: "100%" }}
            />
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;