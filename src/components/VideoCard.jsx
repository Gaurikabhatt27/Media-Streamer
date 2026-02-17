import styles from "./VideoCard.module.css";

function VideoCard({ video }) {

  const { title, channelTitle, thumbnails } = video.snippet;

  return (
    <div className={styles.card}>

      <img
        src={thumbnails.medium.url}
        alt={title}
        className={styles.thumbnail}
      />

      <p className={styles.title}>{title}</p>
      <p className={styles.channel}>{channelTitle}</p>

    </div>
  );
}

export default VideoCard;
