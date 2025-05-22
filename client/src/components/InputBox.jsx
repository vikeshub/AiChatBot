// components/InputBox.jsx
import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const InputBox = ({ onSend }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { isDark } = useTheme();

  const handleSend = async () => {
    if (!text.trim()) return;
    
    setIsTyping(true);
    await onSend(text);
    setText("");
    setIsTyping(false);
  };

  return (
    <div className={`p-4 border-t transition-colors duration-300 ${
      isDark ? 'bg-gray-900/80 border-gray-700' : 'bg-white/70 border-gray-200'
    } backdrop-blur-md`}>
      <div className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <div className="absolute inset-0 rounded-2xl pointer-events-none z-0 animate-gradient-x bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-60 blur-sm" />
          <input
            type="text"
            className={`relative z-10 w-full border-2 rounded-2xl px-4 py-3 pr-12 outline-none transition-all duration-300 focus:ring-2 resize-none shadow-lg bg-white/70 dark:bg-gray-800/80 backdrop-blur-md ${
              isDark 
                ? 'border-purple-500 text-gray-100 placeholder-purple-300 focus:ring-purple-400 focus:border-purple-400' 
                : 'border-emerald-400 text-gray-800 placeholder-emerald-400 focus:ring-emerald-400 focus:border-emerald-400'
            }`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            disabled={isTyping}
            style={{
              boxShadow: '0 2px 16px 0 rgba(139,92,246,0.10), 0 1.5px 8px 0 rgba(16,185,129,0.10)'
            }}
          />
          {text && (
            <button
              onClick={() => setText("")}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors z-20 ${
                isDark ? 'text-purple-300 hover:text-white' : 'text-emerald-400 hover:text-emerald-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <button
          onClick={handleSend}
          disabled={!text.trim() || isTyping}
          className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border-2 border-transparent ${
            text.trim() && !isTyping
              ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-pink-200/40 hover:shadow-purple-400/60 animate-gradient-x'
              : isDark
                ? 'bg-gray-800 text-purple-300 border-purple-700'
                : 'bg-gray-100 text-emerald-400 border-emerald-200'
          }`}
          style={{
            boxShadow: text.trim() && !isTyping
              ? '0 0 16px 2px rgba(168,85,247,0.25)'
              : undefined
          }}
        >
          {isTyping ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputBox;