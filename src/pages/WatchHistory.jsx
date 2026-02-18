import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
          <Link
            key={video.id}
            to={`/watch/${video.id}`}
            className={styles.cardLink}
          >
            <div className={styles.card}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className={styles.thumbnail}
              />
              <div className={styles.info}>
                <p className={styles.videoTitle}>{video.title}</p>
                <p className={styles.channel}>{video.channel}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WatchHistory;
