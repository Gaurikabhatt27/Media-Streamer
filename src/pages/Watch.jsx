import { useParams } from "react-router-dom";

function Watch() {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Watch Page</h2>

      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Watch;
