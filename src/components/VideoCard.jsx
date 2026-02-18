import { Link } from "react-router-dom";
import styles from "./VideoCard.module.css";

function VideoCard({ video }) {
  const videoId = video.id.videoId || video.id;
  const { title, channelTitle, thumbnails } = video.snippet;

  return (
    <Link to={`/watch/${videoId}`} className={styles.link}>
      <div className={styles.card}>
        <img src={thumbnails.medium.url} alt={title} className={styles.thumbnail} />
        <p className={styles.title}>{title}</p>
        <p className={styles.channel}>{channelTitle}</p>
      </div>
    </Link>
  );
}

export default VideoCard;
