// LandingPage.js
import React, { useState } from 'react';
import Navbar from './LandingPage/Navbar';
import Hero from './LandingPage/Hero';
import Example from './LandingPage/Example';
import Layout from './Layout';

function LandingPage() {
  const [theme, setTheme] = useState('light'); // Manage theme state (light/dark)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const handleGetStartedClick = () => {
    // Handle Get Started click
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Layout>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero handleGetStartedClick={handleGetStartedClick} />
      <Example />
      </Layout>
    </div>
  );
}

export default LandingPage;
