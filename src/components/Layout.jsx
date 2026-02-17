import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout(){
    return(
        <div className={styles.layout}>

            <Navbar/>

            <div className={styles.body}>
                <Sidebar/>

                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default Layout;
