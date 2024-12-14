import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout'; // Import Layout component
import axios from 'axios';

function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // const handleEmailSubmit = (e) => {
  //   e.preventDefault();
  //   setMessage('A password reset link has been sent to your email.');
  //   setTimeout(() => setStep(2), 2000);
  // };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
  
    // API payload
    const payload = {
      email: email, // Sending the entered email
    };
  
    try {
      // Make the API request
      const response = await axios.post('http://localhost:8000/api/forgot_password', payload);
  
      if (response.status === 200) {
        setMessage('A password reset link has been sent to your email.');
        setTimeout(() => setStep(2), 2000); // Move to the next step after 2 seconds
      }
    } catch (error) {
      // Handle errors from the server or network
      if (error.response) {
        // Server responded with a status other than 2xx
        setMessage(`Error: ${error.response.data.message || 'Something went wrong!'}`);
      } else {
        // Network error or other issues
        setMessage('Error: Unable to send reset link. Please try again later.');
      }
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setMessage('Your password has been reset successfully.');
    setTimeout(() => navigate('/login'), 2000);
  };

  const goBack = () => {
    setStep(1);
    setMessage('');
  };

  return (
    <Layout>
      <div className="flex min-h-screen transition-colors duration-300">
        {/* Left Side: Form Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {step === 1 ? 'Reset Password' : 'Set New Password'}
            </h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {step === 1
                ? 'Enter your email address to receive a password reset link.'
                : 'Enter the OTP and your new password below.'}
            </p>

            <div className={`relative w-full ${step === 1 ? 'h-[200px]' : 'h-[300px]'}  overflow-hidden`}>
              <div
                className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out transform ${step === 1 ? 'translate-x-0' : '-translate-x-full'}`}
              >
                <form onSubmit={handleEmailSubmit} className="h-full flex flex-col justify-center">
                  <label className="block mb-2 text-gray-600 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                    required
                  />
                  <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded w-28 hover:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Submit
                    </button>
                  </div>
                  {message && <p className="text-green-500 mt-4">{message}</p>}
                </form>
              </div>

              <div
                className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out transform ${step === 2 ? 'translate-x-0' : 'translate-x-full'}`}
              >
                <form onSubmit={handlePasswordReset} className="h-full flex flex-col justify-center">
                  <label className="block mb-2 text-gray-600 dark:text-gray-300">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                    required
                  />

                  <label className="block mb-2 text-gray-600 dark:text-gray-300">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                    required
                  />

                  <label className="block mb-2 text-gray-600 dark:text-gray-300">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                    required
                  />

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Reset Password
                    </button>
                  </div>
                  {message && <p className="text-green-500 mt-4">{message}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center p-8">
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
