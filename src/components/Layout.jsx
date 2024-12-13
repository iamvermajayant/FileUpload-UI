import React, { useContext } from 'react';
import Footer from './LandingPage/Footer'; // Update the path to match your project structure
import { ThemeContext } from './ThemeContext';// Import the ThemeContext

function Layout({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggleTheme from context

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Dark/Light Mode Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition-all"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

export default Layout;
