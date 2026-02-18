import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import styles from "./WatchHistory.module.css";

function WatchHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchHistory")) || [];
    setHistory(stored);
  }, []);

  if (!history.length) {
    return <p style={{ color: "white", padding: "20px" }}>No watch history yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Watch History</h1>
      <div className={styles.grid}>
        {history.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default WatchHistory;
