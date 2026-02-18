import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styles from "./Layout.module.css";

function Layout() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className={styles.layout}>
      <Navbar toggleSidebar={toggleSidebar} />

      <div className={styles.container}>
        <Sidebar open={open} />

        <main className={`${styles.main} ${open ? styles.shift : styles.full}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
