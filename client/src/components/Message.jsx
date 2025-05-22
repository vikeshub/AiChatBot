// components/Message.jsx
import React from "react";
import { format } from "date-fns";
import { useTheme } from "../contexts/ThemeContext";
const Message = ({ text, isBot, time }) => {
  const { isDark } = useTheme();

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} animate-fade-in`}>
      <div className={`flex items-end max-w-xs lg:max-w-sm gap-2 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border-2 border-transparent bg-gradient-to-br ${
            isBot
              ? "from-pink-500 via-purple-500 to-indigo-500 border-purple-300"
              : isDark
                ? "from-green-400 via-teal-400 to-cyan-500 border-teal-300"
                : "from-yellow-400 via-green-400 to-emerald-500 border-emerald-300"
          }`}
          style={{
            boxShadow: isBot
              ? "0 0 12px 2px rgba(139,92,246,0.4)"
              : "0 0 12px 2px rgba(16,185,129,0.3)",
          }}
        >
          <span className="text-white font-extrabold text-lg" style={{ fontFamily: "Segoe UI Emoji, Apple Color Emoji" }}>
            {isBot ? "🤖" : "👤"}
          </span>
        </div>

        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-2xl shadow-md text-sm transition-all duration-300 transform hover:scale-105 border-2 ${
              isBot
                ? isDark
                  ? "bg-gradient-to-br from-purple-800/80 via-indigo-800/70 to-blue-900/70 text-gray-100 border-purple-400/40 backdrop-blur-md"
                  : "bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-purple-900 border-purple-300/60 backdrop-blur-md"
                : isDark
                  ? "bg-gradient-to-br from-green-700/80 via-teal-700/70 to-cyan-800/70 text-white border-teal-400/40 backdrop-blur-md"
                  : "bg-gradient-to-br from-yellow-100 via-green-100 to-emerald-100 text-emerald-900 border-emerald-300/60 backdrop-blur-md"
            }`}
            style={{
              background: isBot
                ? isDark
                  ? "linear-gradient(135deg, #6D28D9cc 0%, #6366F1bb 100%)"
                  : "linear-gradient(135deg, #FBCFE8 0%, #C7D2FE 100%)"
                : isDark
                  ? "linear-gradient(135deg, #059669cc 0%, #14B8A6bb 100%)"
                  : "linear-gradient(135deg, #FEF9C3 0%, #BBF7D0 100%)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p className="leading-relaxed">{text}</p>
          </div>

          <span className={`text-xs mt-1 px-2 ${
            isDark ? 'text-purple-300' : 'text-emerald-500'
          } ${isBot ? 'text-left' : 'text-right'}`}>
            {time ? format(new Date(time), "hh:mm a") : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;