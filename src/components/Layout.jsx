import React, { useContext, useState, useEffect } from 'react';
import Footer from './LandingPage/Footer'; // Update the path to match your project structure
import { ThemeContext } from './ThemeContext'; // Import the ThemeContext
import '../components/style.css';
function Layout({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggleTheme from context
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Function to handle scroll position
  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    setIsAtBottom(bottom); // Set state based on whether the user is at the bottom
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Conditional gradient background for light and dark mode
  const backgroundGradient = theme === 'dark'
    ? 'bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900' // Dark mode gradient
    : 'bg-gradient-to-r from-slate-200 via-slate-100 to-salte-200'; // Light mode gradient (blue)

  return (
    <div className={`min-h-screen flex flex-col ${backgroundGradient} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Dark/Light Mode Button */}
      {/* Button visibility changes based on scroll position */}
      {!isAtBottom && (
        <button
          onClick={toggleTheme}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all ${theme === 'dark' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white'}`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      )}
    </div>
  );
}

export default Layout;
