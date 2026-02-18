import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { searchVideos } from "../api/youtube";
import VideoCard from "../components/VideoCard";
import ShimmerCard from "../components/ShimmerCard";

function Search(){

  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchResults = async () => {
      setLoading(true);
      const data = await searchVideos(query);
      setVideos(data);
      setLoading(false);
    };

    fetchResults();

  }, [query]);

  if(loading){
    return (
      <div className="videoGrid">
        {Array(12).fill("").map((_,i)=>(
          <ShimmerCard key={i}/>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Results for: {query}</h1>

      <div className="videoGrid">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
          />
        ))}
      </div>

    </div>
  );
}

export default Search;
