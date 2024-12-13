import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 space-y-4 md:space-y-0">
        {/* Left: Privacy, Terms, Contact */}
        <div className="flex space-x-4">
          <a href="#privacy" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
            Privacy
          </a>
          <a href="#terms" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
            Terms
          </a>
          <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
            Contact
          </a>
        </div>

        {/* Center: Copyright */}
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>&copy; 2024 Nextly. All Rights Reserved.</p>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
            aria-label="Facebook"
          >
            {/* Facebook Icon */}
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.464.099 2.794.144v3.24h-1.917c-1.504 0-1.795.714-1.795 1.762v2.31h3.588l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
            aria-label="Twitter"
          >
            {/* Twitter Icon */}
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.933 4.933 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.95 13.95 0 011.671 3.149 4.916 4.916 0 003.149 9.86a4.898 4.898 0 01-2.229-.616v.062a4.913 4.913 0 003.946 4.827 4.922 4.922 0 01-2.224.084 4.917 4.917 0 004.6 3.417A9.864 9.864 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.01-7.514 14.01-14.01 0-.213-.004-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
            aria-label="LinkedIn"
          >
            {/* LinkedIn Icon */}
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.77 24h20.459C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.23 0zM7.119 20.452H3.692V9.035h3.427v11.417zM5.405 7.816c-1.088 0-1.965-.888-1.965-1.984a1.983 1.983 0 011.965-1.983c1.088 0 1.965.888 1.965 1.983 0 1.096-.878 1.984-1.965 1.984zm15.047 12.636h-3.428v-5.951c0-1.419-.028-3.24-1.978-3.24-1.978 0-2.282 1.544-2.282 3.136v6.055h-3.428V9.035h3.291v1.553h.046c.459-.867 1.582-1.778 3.26-1.778 3.486 0 4.129 2.296 4.129 5.279v6.363z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
