import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginModal.css"; //css 추가 *수정*

function LoginModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch("/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      alert(data.message);
      if (data.message === "Login successful") {
        setIsLoggedIn(true);
        onClose();
        navigate("/feed");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  };

  return (
    <div className="Login-container">
      <h2>Login</h2>
      <input
        type="text"
        className="id"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Log In</button>
      <button onClick={onClose}>CLOSE</button>
    </div>
  );
}

export default LoginModal;
