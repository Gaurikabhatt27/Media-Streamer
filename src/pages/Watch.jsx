import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Recommendations from "../components/Recommendations";
import { fetchFromAPI } from "../api/youtube";

function Watch() {
  const { id } = useParams();
  const [videoId, setVideoId] = useState(id);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);

  // Fetch video details and save to state
  useEffect(() => {
    if (!id) return;

    setVideoId(id);

    fetchFromAPI(`videos?part=snippet&id=${id}`)
      .then((data) => {
        if (data?.items?.length) {
          const details = data.items[0];
          setVideoDetails(details);
          setVideoTitle(details.snippet.title);

          // Save to watch history in localStorage
          const stored = JSON.parse(localStorage.getItem("watchHistory")) || [];
          const updated = [
            {
              id: details.id,
              title: details.snippet.title,
              thumbnail: details.snippet.thumbnails.high.url,
              channel: details.snippet.channelTitle,
            },
            ...stored.filter((item) => item.id !== details.id),
          ].slice(0, 20);

          localStorage.setItem("watchHistory", JSON.stringify(updated));
        } else {
          setVideoTitle("Video not found");
        }
      })
      .catch(() => setVideoTitle("Error fetching title"));
  }, [id]);

  if (!videoId)
    return <div style={{ color: "white", padding: "20px" }}>No video selected</div>;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        color: "white",
        backgroundColor: "#0f0f0f",
      }}
    >
      <div style={{ flex: 3 }}>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={videoTitle}
            frameBorder="0"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
          ></iframe>
        </div>
        <h2 style={{ marginTop: "15px", fontSize: "20px", fontWeight: "500" }}>
          {videoTitle}
        </h2>
      </div>

      <div
        style={{
          flex: 1,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Recommendations videoId={videoId} />
      </div>
    </div>
  );
}

export default Watch;
