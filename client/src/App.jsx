// App.jsx
import { useEffect, useState, useRef } from "react";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";
import Header from "./components/Header";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import "./App.css";

function AppContent() {
  const [messages, setMessages] = useState([
    {
      message: "Hello! I'm DopaBot. How can I help you today?",
      sender: "bot",
      time: new Date(),
    },
  ]);
  const chatEndRef = useRef(null);
  const { isDark } = useTheme();

  // Scroll to bottom when new message comes in
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    // Add user message immediately
    const userMessage = { message: text, sender: "user", time: new Date() };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { message: data.reply, sender: "bot", time: new Date() },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { 
          message: "Sorry, I'm having trouble connecting. Please try again.", 
          sender: "bot", 
          time: new Date() 
        },
      ]);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    } flex items-center justify-center p-4`}>
      <div className={`w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      }`}>
        <Header />
        <div className="flex flex-col h-[75vh]">
          <div className="flex-1 overflow-y-auto p-4">
            <ChatBox messages={messages} />
            <div ref={chatEndRef} />
          </div>
          <InputBox onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;