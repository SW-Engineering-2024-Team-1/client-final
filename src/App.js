import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./routes/Main";
import PhotoFeed from "./routes/PhotoFeed";
import DirectMessages from "./routes/DirectMessages";
import Chat from "./routes/Chat";
import Profile from "./routes/Profile";
import AllUsers from "./routes/AllUsers";
import UploadPhoto from "./routes/UploadPhoto";
import PhotoDetail from "./routes/PhotoDetail";
import EditPhoto from "./routes/EditPhoto"; // EditPhoto 컴포넌트를 추가합니다
import NavBar from "./components/NavBar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css"; // CSS 임포트 추가 *수정*
import logo from './image/logo.jpg'; // 로고 이미지 경로 *수정*




const AppContent = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/check_session", {
          credentials: "include"
        });
        const data = await response.json();
        setIsLoggedIn(data.logged_in);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [setIsLoggedIn]);

  return (
    <Router>
      <div className="App">
      <img src={logo}  alt="Logo" className="logo" /> 
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/feed" element={<PhotoFeed />} />
        <Route path="/messages" element={<DirectMessages />} />
        <Route path="/messages/:id" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/upload" element={<UploadPhoto />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
        <Route path="/edit/:id" element={<EditPhoto />} /> {/* EditPhoto 라우트를 추가합니다 */}
      </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
