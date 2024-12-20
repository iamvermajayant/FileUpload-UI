import React, { useContext, useState, useEffect } from 'react';
import Footer from './LandingPage/Footer';
import { ThemeContext } from './ThemeContext';
import Chatbot from './Chatbot/Chatbot';
import '../components/style.css';

function Layout({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    setIsAtBottom(bottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const lightModeBackgroundImage = theme === 'light' ? {
    backgroundImage: 'url("https://i.postimg.cc/tTx1NhH9/beams.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  const backgroundGradient = theme === 'dark'
    ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900'
    : 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200';

  return (
    <div
      className={`min-h-screen flex flex-col ${backgroundGradient} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
      style={lightModeBackgroundImage}
    >
      <main className="flex-grow">{children}</main>
      <Footer />

      {!isAtBottom && (
        <div className="fixed bottom-8 right-8 flex space-x-3">
          <button
            onClick={() => setIsChatbotOpen(!isChatbotOpen)}
            className={`p-3 text-lg rounded-full shadow-lg transition-all ${
              theme === 'dark' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white'
            }`}
            aria-label="Toggle chatbot"
          >
            🤖 
          </button>
          <button
            onClick={toggleTheme}
            className={`p-3 text-lg rounded-full shadow-lg transition-all ${
              theme === 'dark' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white'
            }`}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      )}

      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
    </div>
  );
}

export default Layout;
