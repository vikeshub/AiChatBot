import React, { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([
    { sender: "system", text: "You can start the chat now." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/messages", {
        message: input,
      });

      const botReply = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-xl flex flex-col h-[600px]">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-xl text-indigo-600">DopaBot</span>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 space-y-4 p-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end ${
                msg.sender === "user"
                  ? "justify-end"
                  : msg.sender === "bot"
                  ? "justify-start"
                  : "justify-center"
              }`}
            >
              {msg.sender !== "user" && msg.sender !== "system" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 flex items-center justify-center mr-2 shadow">
                  <span className="text-lg">🤖</span>
                </div>
              )}
              {msg.sender === "system" ? (
                <div className="text-center text-gray-500 w-full">{msg.text}</div>
              ) : (
                <div
                  className={`p-3 rounded-lg text-sm max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-indigo-500 text-white ml-auto"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              )}
              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 via-teal-400 to-cyan-400 flex items-center justify-center ml-2 shadow">
                  <span className="text-lg">👤</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <input
            className="flex-1 p-2 border rounded-l-md outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-r-md"
            onClick={sendMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
