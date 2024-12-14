import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout'; // Import Layout component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons'; // Import Google and Apple icons

  function PasswordResetPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = (e) => {
      e.preventDefault();
      // Simulate a password reset request
      setMessage('A password reset link has been sent to your email.');
      // Redirect to login after 2 seconds
    };

  return (
    <Layout>
      <div className="flex min-h-screen transition-colors duration-300">
        {/* Left Side: Reset Password Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Reset Password</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Enter your email address to receive a password reset link.
            </p>
            <form onSubmit={handlePasswordReset}>
              <label className="block mb-2 text-gray-600 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                Send Reset Link
              </button>
              {message && <p className="text-green-500 mt-4">{message}</p>}
            </form>
           
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center p-8 ">
          <img
            src="https://i.postimg.cc/CLzLSjjB/vecteezy-3d-illustration-of-a-teenage-female-programmer-at-the-35899040.png"
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </Layout>
  );
}

  export default PasswordResetPage;


 


