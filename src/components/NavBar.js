import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/signout", {
        method: "POST",
        credentials: "include"
      });
      const data = await response.json();
      alert(data.message);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed");
    }
  };

  return (
    <div className="Nav" style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#f8f9fa", padding: "10px", textAlign: "center", borderTop: "1px solid #e7e7e7" }}>
      <Link to="/feed" style={{ margin: "0 15px" }}>Photo Feed</Link>
      <Link to="/messages" style={{ margin: "0 15px" }}>Direct Messages</Link>
      <Link to="/profile" style={{ margin: "0 15px" }}>Profile</Link>
      <Link to="/users" style={{ margin: "0 15px" }}>All Users</Link>
      <button onClick={handleLogout} style={{ margin: "0 15px" }}>Log Out</button>
    </div>
  );
}

export default NavBar;
