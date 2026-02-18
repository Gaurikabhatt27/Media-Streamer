import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, useRef } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    // Save in history
    setSearchHistory(prev => {
      const updated = [query, ...prev.filter(item => item !== query)].slice(0, 10);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });

    navigate(`/search/${query}`);
    setQuery("");
    setShowSuggestions(false);
  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(stored);
  }, []);

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!query) return searchHistory; // show all when query is empty
    return searchHistory.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searchHistory]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          Streamify
        </Link>
      </div>

      <form className={styles.center} onSubmit={handleSearch}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
          onFocus={() => setShowSuggestions(true)}
        />
        <button type="submit" className={styles.searchBtn}>🔍</button>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul ref={suggestionsRef} className={styles.suggestions}>
            {filteredSuggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setQuery(item);
                  navigate(`/search/${item}`);
                  setShowSuggestions(false);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className={styles.right}>
        <Link to="/upload" className={styles.uploadBtn}>Upload</Link>
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
