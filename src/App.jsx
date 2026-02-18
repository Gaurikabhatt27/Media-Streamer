import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import WatchHistory from "./pages/WatchHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/history" element={<WatchHistory />} />
          <Route path="/search/:query" element={<Search />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
