import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Recommendations from "../components/Recommendations";
import { fetchFromAPI } from "../api/youtube";
import styles from "./Watch.module.css";

function Watch() {
  const { id } = useParams();
  const [videoTitle, setVideoTitle] = useState("");

  useEffect(() => {
    if (!id) return;

    fetchFromAPI(`videos?part=snippet&id=${id}`)
      .then((data) => {
        if (data?.items?.length) {
          setVideoTitle(data.items[0].snippet.title);
        } else {
          setVideoTitle("Video not found");
        }
      })
      .catch(() => setVideoTitle("Error fetching video"));
  }, [id]);

  if (!id) return null;

  return (
    <div className={styles.watchPage}>
      
      <div className={styles.playerSection}>
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={videoTitle}
            allowFullScreen
          />
        </div>

        <h2 className={styles.title}>{videoTitle}</h2>
      </div>

      <div className={styles.recommendations}>
        <Recommendations videoId={id} />
      </div>

    </div>
  );
}

export default Watch;
