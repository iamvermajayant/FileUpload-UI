import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';  // Import Layout component

function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Simulate a password reset request
    setMessage('A password reset link has been sent to your email.');
    setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
  };

  return (
    <Layout>  {/* Wrap the content in Layout */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Reset Password</h2>
          <form onSubmit={handlePasswordReset}>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
              Send Reset Link
            </button>
          </form>
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>
      </div>
    </Layout>
  );
}

export default PasswordResetPage;
