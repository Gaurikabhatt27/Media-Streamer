import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import styles from "./Profile.module.css"; // create this CSS module

function Profile() {
  // User info (frontend-only)
  const [user, setUser] = useState({
    name: "Gaurika Bhatt",
    email: "gaurika@example.com",
    avatar: "https://ui-avatars.com/api/?name=Gaurika+Bhatt&background=random",
  });

  // Load watch history from localStorage
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];
    setWatchHistory(storedHistory);
  }, []);

  // Dummy stats based on localStorage
  const stats = {
    videosWatched: watchHistory.length,
    likedVideos: 0, // can add liked videos later
  };

  return (
    <div className={styles.container}>
      
      {/* PROFILE HEADER */}
      <div className={styles.header}>
        <img src={user.avatar} alt={user.name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      {/* PROFILE STATS */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <h3>{stats.videosWatched}</h3>
          <p>Videos Watched</p>
        </div>
        <div className={styles.stat}>
          <h3>{stats.likedVideos}</h3>
          <p>Liked Videos</p>
        </div>
      </div>

      {/* WATCH HISTORY */}
      <h2 className={styles.sectionTitle}>Watch History</h2>
      {watchHistory.length === 0 ? (
        <p style={{ color: "white" }}>No watch history yet.</p>
      ) : (
        <div className={styles.cardsGrid}>
          {watchHistory.map((video) => (
            <VideoCard key={video.id || video.videoId} video={video} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Profile;
