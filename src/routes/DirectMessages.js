// src/routes/DirectMessages.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/DirectMessages.css";

function DirectMessages() {
  const [users, setUsers] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/users", {
          credentials: "include"
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="DM-container">
      <h1>Direct Messages</h1>
      <div>
        {users.map((user) => (
          <button className="Enter-button" key={user.id} onClick={() => navigate(`/messages/${user.id}`)}>
            {user.username}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DirectMessages;
