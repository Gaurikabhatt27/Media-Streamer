import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import WatchHistory from "../pages/WatchHistory";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.item}>
        <span>🏠</span>
        <p>Home</p>
      </Link>

      <Link to="/trending" className={styles.item}>
        <span>🔥</span>
        <p>Trending</p>
      </Link>

      <Link to="/profile" className={styles.item}>
        <span>👤</span>
        <p>Profile</p>
      </Link>

      <Link to="/watchHistory" className={styles.item}>
        <span>🕘</span>
        <p>WatchHistory</p>
      </Link>
    </aside>
  );
}

export default Sidebar;
