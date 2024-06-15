import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Chat.css"; // CSS 임포트 추가

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const { isLoggedIn, userId, username } = useAuth();
  

  useEffect(() => {
    fetchMessages();
  }, [id, isLoggedIn]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/messages/${id}`, {
        credentials: "include"
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await fetch("/messages", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ receiver_id: id, content, reply_to_id: replyTo ? replyTo.id : null })
      });
      const data = await response.json();
      alert(data.message);
      setContent("");
      setReplyTo(null);
      fetchMessages(); // 메시지를 다시 불러옴
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter((message) => message.id !== messageId)); // 메시지 목록 업데이트
  };

  if (!isLoggedIn) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="chat-container">
      <h1>Chat</h1>
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender_id === userId ? "sent" : "received"}`}>
            <p>
              <strong>{message.sender_id === userId ? username : message.sender_username}</strong>: {message.content}
            </p>
            {message.replyTo && <p className="reply-to">Replying to: {message.replyTo.content}</p>}
            <button onClick={() => setReplyTo(message)}>REPLY</button>
            <button onClick={() => handleDeleteMessage(message.id)}>DELETE</button>
          </div>
        ))}
      </div>
      {replyTo && <p>Replying to: {replyTo.content}</p>}
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSendMessage}>SEND</button>
    </div>
  );
}

export default Chat;
