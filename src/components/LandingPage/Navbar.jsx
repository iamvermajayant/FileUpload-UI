// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleGetStartedClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md">
      
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <img
          src="https://i.postimg.cc/yx6CbNDZ/image-removebg-preview.png" // Replace with the actual path to your logo
          alt="Nextly Logo"
          className="h-8 w-8"
        />
        <span className="text-xl font-bold font-sans text-white dark:text-black">
        CloudXpand
        </span>
      </div>

      <div className="flex space-x-6">
        {/* <a href="#product" className="hover:text-blue-500">Product</a>
        <a href="#features" className="hover:text-blue-500">Features</a>
        <a href="#pricing" className="hover:text-blue-500">Pricing</a>
        <a href="#company" className="hover:text-blue-500">Company</a>
        <a href="#blog" className="hover:text-blue-500">Blog</a> */}
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={handleGetStartedClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Get Started
        </button>
        
      </div>
    </nav>
  );
}

export default Navbar;
