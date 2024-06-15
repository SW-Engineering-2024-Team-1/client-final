import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";


function Main() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용


  const handleLoginOpen = () => setShowLogin(true);
  const handleSignupOpen = () => setShowSignup(true);
  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleAllUsers = () => {
    navigate("/users"); // /all-users 경로로 이동
  };

  return (
    <div className="main">
      <h1>Welcome to Photo Diary</h1>
      <button onClick={handleLoginOpen}> Log In  </button>
      <button onClick={handleSignupOpen}>Sign Up</button>
      <button onClick={handleAllUsers}>All Users</button> {/* All Users 버튼 추가 */}
      {showLogin && <LoginModal onClose={handleClose} />}
      {showSignup && <SignupModal onClose={handleClose} />}
    </div>
  );
}

export default Main;
