import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Messages() {
  const [users, setUsers] = useState([]);
  const { isLoggedIn } = useAuth();

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
    <div>
      <h1>Messages</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/messages/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;
