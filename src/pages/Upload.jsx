import { useState } from "react";
import styles from "./Upload.module.css";

function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Please add a title and select a file.");
      return;
    }

    console.log("Uploading video:", { title, description, file });
    alert("Video upload simulated (frontend only)");

    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Upload Video</h1>

        <form className={styles.form} onSubmit={handleUpload}>
          <label>
            Video Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description (optional)"
            />
          </label>

          <label>
            Select Video File
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
