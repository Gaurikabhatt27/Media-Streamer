import { useEffect, useState } from "react";
import { getTrendingVideos } from "../api/youtube.js";
import VideoCard from "../components/VideoCard";
import { Link } from "react-router-dom";
import ShimmerCard from "../components/ShimmerCard";
import styles from "./Home.module.css";


function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getTrendingVideos();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  if (videos.length === 0) {
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
        <h1 className={styles.title}>Trending Videos</h1>

        <div className={styles.grid}>
        {videos.map((video) => (
            <Link
            to={`/watch/${video.id}`}
            key={video.id}
            className={styles.cardLink}
            >
            <VideoCard video={video} />
            </Link>
        ))}
        </div>
    </div>
    );
}

export default Home;