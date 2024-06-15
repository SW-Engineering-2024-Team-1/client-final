import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/profile", {
          credentials: "include"
        });
        const data = await response.json();
        setUser(data.user);
        setPhotos(data.photos);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn]);

  const handleDelete = async (photoId) => {
    try {
      const response = await fetch(`/photos/${photoId}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await response.json();
      alert(data.message);
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error("Failed to delete photo", error);
    }
  };

  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-info">Profile</h1>
      <h2 className="profile-info_h2 ">{user.username}'s Photos</h2>
      <div className="photo-feed">
        {photos.map((photo) => (
          <div key={photo.id} onClick={() => navigate(`/photos/${photo.id}`)} style={{ cursor: "pointer" }}>
            <img src={photo.url} alt={photo.description} className="photo-item img"/>
            <p>{photo.description}</p>
            <div className="photo-keywords">
              {photo.keywords.map((keyword, index) => (
                <span key={index} style={{ marginRight: "10px" }}>
                  {keyword}
                </span>
              ))}
            </div>
            <div className="profile-buttons">
            <button onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${photo.id}`);
            }}>EDIT</button>
            <button onClick={(e) => {
              e.stopPropagation();
              handleDelete(photo.id);
            }}>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
