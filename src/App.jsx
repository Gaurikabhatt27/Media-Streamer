import {Route, Routes} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout';
import Home from "./pages/Home"
import Watch from "./pages/Watch";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Trending from "./pages/Trending.jsx";

function App() {
  return (
    <Routes>

      <Route element={<Layout/>}>

        <Route path="/" element={<Home/>}/>
        <Route path="watch/:id" element={<Watch/>}/>
        <Route path="upload" element={<Upload/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="search/:query" element={<Search/>}/>
        <Route path="trending" element={<Trending/>}/>

      </Route>

    </Routes>
  )
}

export default App;
