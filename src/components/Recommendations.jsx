import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getRelatedVideos } from "../api/youtube";

function Recommendations({ videoId }) {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  console.log("Fetching recommendations for videoId:", videoId);
  if (!videoId) return;

  setLoading(true);
  getRelatedVideos(videoId)
    .then((items) => {
      console.log("API returned items:", items); 
      setRecommended(items || []);
    })
    .finally(() => setLoading(false));
}, [videoId]);


  if (loading) return <p style={{ color: "white" }}>Loading recommendations...</p>;
  if (!loading && recommended.length === 0) 
    return <p style={{ color: "white" }}>No recommendations available.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h3 style={{ color: "white", marginBottom: "10px" }}>Recommended</h3>
      {recommended.map((video) => (
        <VideoCard key={video.id.videoId || video.id} video={video} />
      ))}
    </div>
  );
}

export default Recommendations;
