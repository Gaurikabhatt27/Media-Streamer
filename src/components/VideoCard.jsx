import { Link } from "react-router-dom";
import styles from "./VideoCard.module.css";

function VideoCard({ video }) {

  const id =
    typeof video.id === "string"
      ? video.id
      : video.id?.videoId;

  if (!id) return null;

  const thumb =
    video.snippet?.thumbnails?.high?.url ||
    video.snippet?.thumbnails?.medium?.url ||
    video.snippet?.thumbnails?.default?.url;


  return (
    <Link to={`/watch/${id}`} className={styles.card}>
      <div className={styles.thumbWrapper}>
        <img src={thumb} alt="thumbnail" className={styles.thumbnail} />
      </div>

      <div className={styles.info}>
        <div className={styles.title}>
          {video.snippet?.title}
        </div>

        <div className={styles.channel}>
          {video.snippet?.channelTitle}
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
