// components/Header.jsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`px-6 py-4 border-b transition-colors duration-300 backdrop-blur-xl bg-white/60 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700 shadow-md`}>
      <div className="flex items-center justify-between">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 animate-gradient-x blur-sm opacity-80"></div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl relative z-10 border-4 border-white dark:border-gray-900">
              <span className="text-white font-extrabold text-xl" style={{ fontFamily: "Segoe UI Emoji, Apple Color Emoji" }}>🤖</span>
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 border-2 border-white dark:border-gray-900 rounded-full shadow-lg animate-pulse"></span>
            </div>
          </div>
          <div>
            <h1 className={`font-bold text-xl tracking-wide ${isDark ? 'text-white' : 'text-gray-900'} drop-shadow`}>
              DopaBot
            </h1>
            <p className={`text-xs flex items-center gap-1 ${isDark ? 'text-purple-300' : 'text-emerald-500'}`}>
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Online now
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 shadow-lg border-2 border-transparent ${
            isDark
              ? 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-500 text-white hover:scale-110'
              : 'bg-gradient-to-br from-purple-500 via-blue-400 to-emerald-400 text-white hover:scale-110'
          } animate-gradient-x`}
          style={{
            boxShadow: isDark
              ? '0 0 12px 2px rgba(251,191,36,0.25)'
              : '0 0 12px 2px rgba(139,92,246,0.15)'
          }}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;