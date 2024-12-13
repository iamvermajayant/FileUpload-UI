// components/TwoFactorAuth/TwoFactorAuthPage.js
import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';

function TwoFactorAuthPage() {
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to generate a random 6-digit code
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit code
  };

  // Set a random 2FA code when the component mounts
  useEffect(() => {
    const code = generateCode();
    setGeneratedCode(code);
    console.log('Generated 2FA Code:', code); // For testing purposes, log the code (in real apps, don't log sensitive info)
  }, []);

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code === generatedCode.toString()) {
      // If the code is correct, navigate to the dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid 2FA code');
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white dark:bg-gray-700 p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Two-Factor Authentication</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            A random 6-digit code has been generated. Please enter it below to proceed.
          </p>
          {/* Show the generated code on the screen */}
          <div className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold text-xl p-4 rounded mb-4">
            <p>Your 2FA Code: <span className="text-xl">{generatedCode}</span></p>
          </div>
          <form onSubmit={handleVerifyCode}>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">Enter 2FA Code:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              maxLength="6"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
              Verify Code
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default TwoFactorAuthPage;
