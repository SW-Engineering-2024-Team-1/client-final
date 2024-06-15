// src/components/SignupModal.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginModal.css";

function SignupModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleSignup = async () => {
    try {
      const response = await fetch("/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      alert(data.message);
      if (data.message === "Registered successfully") {
        setIsLoggedIn(true);
        onClose();
        navigate("/");
      }
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="Login-container">
      <h2>Sign Up</h2>
      <input
        className="id"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={onClose}>CLOSE</button>
    </div>
  );
}

export default SignupModal;
