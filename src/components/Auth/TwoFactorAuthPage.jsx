import React, { useState, useEffect } from 'react';
import Layout from '../Layout';  // Import your Layout component
import { useNavigate } from 'react-router-dom';

function TwoFactorAuthPage() {
  const [authCode, setAuthCode] = useState('');  // Store the random authentication code
  const [userCode, setUserCode] = useState(['', '', '', '', '', '']);  // Store the code entered by the user in an array
  const [error, setError] = useState('');  // Store error messages
  const [timer, setTimer] = useState(60);  // Countdown timer for 2FA
  const navigate = useNavigate();

  // Generate a random 6-digit authentication code when the page loads
  useEffect(() => {
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code
    setAuthCode(generatedCode); // Store the generated code

    // Start the timer countdown
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown); // Clear the timer when it reaches 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Clean up on unmount
  }, []);

  // Handle input changes for the 6-digit code
  const handleChange = (index, value) => {
    if (/^\d$/.test(value) || value === '') {
      const newUserCode = [...userCode];
      newUserCode[index] = value;
      setUserCode(newUserCode);

      // Move to next input automatically if the value is valid
      if (value && index < 5) {
        document.getElementById(`num${index + 2}`).focus();
      }
    }
  };

  // Handle 2FA form submission
  const handleAuth = (e) => {
    e.preventDefault();
    const enteredCode = userCode.join(''); // Combine the user's input into a single string
    if (enteredCode === authCode) {
      navigate('/dashboard'); // Redirect to dashboard upon success
    } else {
      setError('Invalid authentication code'); // Show error message if codes don't match
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen transition-colors duration-300">
        {/* Left Side: Two-Factor Authentication Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Two-Factor Authentication</h2>
            <p className="text-xl mb-6 text-gray-500 dark:text-gray-400">
              Please enter the code <b>{authCode}</b>.
            </p>
            <form onSubmit={handleAuth} className="space-y-6">
              <div className="inline-flex items-center gap-5">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`num${index + 1}`}
                    type="text"
                    maxLength="1"
                    value={userCode[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="block w-12 h-12 text-center text-xl border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-500"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                Verify Code
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                Haven't received it?{' '}
                <a
                  href="javascript:void(0)"
                  className="font-medium text-teal-700 underline hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-100"
                >
                  Resend a new one
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center p-8">
          <img
            src="https://i.postimg.cc/5N7Ym4mv/vecteezy-3d-illustration-of-a-teenage-female-programmer-at-the-35899074.png"
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </Layout>
  );
}

export default TwoFactorAuthPage;
