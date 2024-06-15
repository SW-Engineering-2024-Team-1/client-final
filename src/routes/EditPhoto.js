import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/EditPhoto.css";

function EditPhoto() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`/photos/${id}`, {
          credentials: "include"
        });
        const data = await response.json();
        setPhoto(data);
        setDescription(data.description);
        setKeywords(data.keywords);
      } catch (error) {
        console.error("Failed to fetch photo", error);
      }
    };

    if (isLoggedIn) {
      fetchPhoto();
    }
  }, [id, isLoggedIn]);

  const handleAddKeyword = () => {
    if (keyword) {
      setKeywords([...keywords, keyword]);
      setKeyword("");
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("keywords", JSON.stringify(keywords));
    if (newImage) {
      formData.append("file", newImage);
    }

    try {
      const response = await fetch(`/photos/${photo.id}`, {
        method: "PUT",
        credentials: "include",
        body: formData
      });
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        navigate(`/photos/${photo.id}`);
      }
    } catch (error) {
      console.error("Failed to update photo", error);
    }
  };

  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="edit-photo-container">
      {photo ? (
        <div className="edit-photo">
          <img src={photo.url} alt={photo.description} className="edit-photo img" />
          <div className="edit-container">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
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
              onChange={(e) => setNewImage(e.target.files[0])}
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => navigate(`/photos/${photo.id}`)}>Cancel</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditPhoto;
