import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/PhotoFeed.css";

function PhotoFeed() {
  const [photos, setPhotos] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotos();
  }, [isLoggedIn]);

  const fetchPhotos = async () => {
    try {
      const response = await fetch("/photos", {
        credentials: "include"
      });
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Failed to fetch photos", error);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) return;

    try {
      const response = await fetch(`/search?keyword=${searchKeyword}`, {
        credentials: "include"
      });
      const data = await response.json();
      if (response.ok) {
        setPhotos(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Failed to search photos", error);
    }
  };

  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="photo-feed-container">
      <h1>Photo Feed</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search by keyword"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <button className="upload-button" onClick={() => navigate("/upload")}>Upload Photo</button>
      <div className="photo-feed">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item" onClick={() => navigate(`/photos/${photo.id}`)}>
            <img src={photo.url} alt={photo.description} />
            <p>{photo.description}</p>
            <div className="photo-keywords">
              {photo.keywords.map((keyword, index) => (
                <span  key={index}>{keyword}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoFeed;
