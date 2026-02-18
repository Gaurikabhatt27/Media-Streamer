import { Home, Flame, User, History } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar({ open }) {
  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : styles.close}`}>
      
      <Link to="/" className={styles.item}>
        <Home />
        {open && <span>Home</span>}
      </Link>

      <Link to="/trending" className={styles.item}>
        <Flame />
        {open && <span>Trending</span>}
      </Link>

      <Link to="/profile" className={styles.item}>
        <User />
        {open && <span>Profile</span>}
      </Link>

      <Link to="/history" className={styles.item}>
        <History />
        {open && <span>Watch History</span>}
      </Link>

    </aside>
  );
}

export default Sidebar;
