import React, { useState } from 'react'; // Import React and useState hook
import Navbar from './LandingPage/Navbar'; // Import Navbar component
import Hero from './LandingPage/Hero'; // Import Hero section component
import Example from './LandingPage/Example'; // Import Example section component
import Layout from './Layout'; // Import Layout component that wraps the page content

function LandingPage() {
  // Manage the theme state, initialized as 'light'
  const [theme, setTheme] = useState('light');

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    // Toggle theme state between 'light' and 'dark'
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Toggle the 'dark' class on the document's root element to apply dark mode styles
    document.documentElement.classList.toggle('dark');
  };

  // Handle the 'Get Started' button click event
  const handleGetStartedClick = () => {
    // Placeholder for functionality when 'Get Started' button is clicked
  };

  return (
    // Set the background and text colors based on the current theme (dark or light)
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Layout>
        {/* Navbar component with theme and toggleTheme props */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        {/* Hero section with handleGetStartedClick prop */}
        <Hero handleGetStartedClick={handleGetStartedClick} />
        {/* Example section */}
        <Example />
      </Layout>
    </div>
  );
}

export default LandingPage; // Export the LandingPage component
