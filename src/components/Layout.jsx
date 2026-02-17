import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

function Layout({children}){
    return(
        <div >
            <Navbar>
                <div>
                    <Sidebar/>
                    <div>
                        {children}
                    </div>
                </div>
            </Navbar>
        </div>
    )
}