import { Link } from "react-router-dom";
import styles from "./VideoCard.module.css";
import { formatViews, timeAgo } from "../utils/format";

function VideoCard({ video }) {
  if (!video) return null;

  const snippet = video.snippet || {};
  const statistics = video.statistics || {};

  const id = video.id || video.videoId || "";
  const thumbnail = snippet.thumbnails?.medium?.url || video.thumbnail || "";
  const title = snippet.title || video.title || "No title";
  const channel = snippet.channelTitle || video.channel || "Unknown channel";
  const views = statistics.viewCount ?? video.views ?? 0;
  const published = snippet.publishedAt || video.publishedAt || new Date().toISOString();

  return (
    <Link to={`/watch/${id}`} className={styles.card}>
      <img src={thumbnail} alt={title} className={styles.thumbnail} />
      <div className={styles.details}>
        <img
          className={styles.channelPic}
          src={`https://ui-avatars.com/api/?name=${channel}&background=random`}
          alt="channel"
        />
        <div className={styles.meta}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.channel}>{channel}</p>
          <p className={styles.stats}>
            {formatViews(views)} • {timeAgo(published)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
