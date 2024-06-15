import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/PhotoDetail.css";

function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [author, setAuthor] = useState(null);
  const { isLoggedIn, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`/photos/${id}`, {
          credentials: "include"
        });
        const data = await response.json();
        setPhoto(data);
        fetchAuthor(data.user_id);
      } catch (error) {
        console.error("Failed to fetch photo", error);
      }
    };

    const fetchAuthor = async (userId) => {
      try {
        const response = await fetch(`/users/${userId}`, {
          credentials: "include"
        });
        const data = await response.json();
        setAuthor(data);
      } catch (error) {
        console.error("Failed to fetch author", error);
      }
    };

    if (isLoggedIn) {
      fetchPhoto();
    }
  }, [id, isLoggedIn]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/photos/${photo.id}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await response.json();
      alert(data.message);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to delete photo", error);
    }
  };

  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="photo-detail-container">
      {photo ? (
        <div className="photo-detail">
          <img src={photo.url} alt={photo.description} className="photo-detail img" />
          <p className="photo-description">{photo.description}</p>
          <div className="photo-keywords">
            {photo.keywords.map((keyword, index) => (
              <span key={index}>#{keyword}</span>
            ))}
          </div>
          
          <button className="DM-button" onClick={() => navigate(`/messages/${author.id}`)}>Direct Message</button>
         
          {author && <p className="photo-author">Posted by: {author.username}</p>}
          {photo.user_id === userId && (
            <div className="photo-actions">
              <button onClick={() => navigate(`/edit/${photo.id}`)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PhotoDetail;
