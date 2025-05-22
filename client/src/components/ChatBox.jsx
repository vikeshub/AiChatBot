// components/ChatBox.jsx
import React from "react";
import Message from "./Message";

const ChatBox = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((msg, idx) => (
        <Message key={idx} text={msg.message} isBot={msg.sender === "bot"} time={msg.time} />
      ))}
    </div>
  );
};

export default ChatBox;