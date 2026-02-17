import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e){
    e.preventDefault();
    if(!query.trim()) return;

    navigate(`/search/${query}`);
    setQuery("");
  }

  return (
    <nav className={styles.navbar}>

      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          Streamify
        </Link>
      </div>

      <form className={styles.center} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchBtn}>🔍</button>
      </form>

      <div className={styles.right}>

        <Link to="/upload" className={styles.uploadBtn}>
          Upload
        </Link>

        <Link to="/profile" className={styles.profile}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
            alt="profile"
          />
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;
