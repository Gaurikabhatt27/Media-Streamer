import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Recommendations from "../components/Recommendations";
import { fetchFromAPI } from "../api/youtube";
import styles from "./Watch.module.css";

function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      try {
        const data = await fetchFromAPI(
          `videos?part=snippet,statistics&id=${id}`
        );
        if (data?.items?.length) {
          setVideo(data.items[0]);

          const stored = JSON.parse(localStorage.getItem("watchHistory")) || [];
          const filtered = stored.filter(v => v.id !== data.items[0].id);
          filtered.unshift(data.items[0]);
          localStorage.setItem("watchHistory", JSON.stringify(filtered.slice(0, 50)));
        }
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <p style={{ color: "white", padding: "20px" }}>Loading...</p>;

  return (
    <div className={styles.watchPage}>
      <div className={styles.playerSection}>
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={video.snippet?.title}
            allowFullScreen
          />
        </div>

        <h2 className={styles.title}>{video.snippet?.title}</h2>
      </div>

      <div className={styles.recommendations}>
        <Recommendations videoId={id} />
      </div>
    </div>
  );
}

export default Watch;
