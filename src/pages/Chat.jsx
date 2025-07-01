import "../App.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [message, setMessageList] = useState([]);
  const loggedInUser = localStorage.getItem("user");

  const [user, setUser] = useState(loggedInUser);

  const ChatUser = localStorage.getItem("ChatUser");

  console.log(loggedInUser);
  console.log(ChatUser);

  function addMessage() {
    const newMessage = document.getElementById("inputMessage").value;
    const message = { text: newMessage, user };
    socket.emit("UserMessage", message);
    document.getElementById("inputMessage").value = "";
  }

  useEffect(() => {
    socket.on("UserMessage", (message) => {
      setMessageList((prevMsgs) => [...prevMsgs, message]);
    });

    return () => {
      socket.off("UserMessage");
    };
  }, []);

  function clearMessage() {
    setMessageList([]);
  }

  return (
    <div className="chat-container">
      <div className="message-list">
        {message.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${
              msg.user === loggedInUser ? "own-message" : "other-message"
            }`}
          >
            <p className="message-text">{msg.text}</p>
            <p className="message-user">by {msg.user}</p>
          </div>
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          id="inputMessage"
          placeholder="Type something..."
          className="message-input"
        />
        <button onClick={addMessage} className="chat-button">
          Submit
        </button>
        <button
          onClick={() =>
            setUser(user === loggedInUser ? ChatUser : loggedInUser)
          }
          className="chat-button"
        >
          {user}
        </button>
        <button onClick={clearMessage} className="chat-button">
          New Chat
        </button>
      </div>
    </div>
  );
};

export default Chat;
