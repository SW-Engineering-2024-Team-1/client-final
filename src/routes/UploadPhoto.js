import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UploadPhoto() {
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [file, setFile] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAddKeyword = () => {
    if (keyword) {
      setKeywords([...keywords, keyword]);
      setKeyword("");
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("keywords", JSON.stringify(keywords));
    formData.append("file", file);

    try {
      const response = await fetch("/photos", {
        method: "POST",
        credentials: "include",
        body: formData
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        navigate("/feed");
      }
    } catch (error) {
      console.error("Failed to upload photo", error);
    }
  };

  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="upload-photo-container">
      <h1>Upload Photo</h1>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Keyword"
        />
        <button onClick={handleAddKeyword}>Add Keyword</button>
      </div>
      <div>
        {keywords.map((kw, index) => (
          <span key={index} style={{ marginRight: "10px" }}>
            {kw}
          </span>
        ))}
      </div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadPhoto;
