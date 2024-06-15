import React, { useEffect, useState } from "react";
import "../styles/AllUsers.css";

function AllUsers() {
  const [users, setUsers] = useState([]);

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

    
      fetchUsers();
    
  }, []);

  

  return (
    <div>
      <h1>All Users List</h1>
      <ul className="UserList">
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default AllUsers;
