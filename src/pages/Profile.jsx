import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import styles from "./Profile.module.css"; 

function Profile() {
  const [user, setUser] = useState({
    name: "Gaurika Bhatt",
    email: "gaurika@example.com",
    avatar: "https://ui-avatars.com/api/?name=Gaurika+Bhatt&background=random",
  });

  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];
    setWatchHistory(storedHistory);
  }, []);

  const stats = {
    videosWatched: watchHistory.length,
    likedVideos: 0, 
  };

  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <img src={user.avatar} alt={user.name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>

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
