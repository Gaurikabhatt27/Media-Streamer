import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar(){
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

      <Link to="/watch/1" className={styles.item}>
        <span>🕘</span>
        <p>Watch</p>
      </Link>

      <Link to="/profile" className={styles.item}>
        <span>👤</span>
        <p>Profile</p>
      </Link>

    </aside>
  );
}

export default Sidebar;
