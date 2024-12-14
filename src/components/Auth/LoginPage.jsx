import React, { useState, useEffect } from 'react';
import Layout from '../Layout'; // Import your Layout component
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons'; // Import Google and Apple icons

function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [requires2FA, setRequires2FA] = useState(false);
  const navigate = useNavigate();

  // Handle login form submission
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // Dummy credentials for login
  //   const dummyCredentials = {
  //     email: 'admin@example.com',
  //     password: '123',
  //   };

  //   if (email === dummyCredentials.email && password === dummyCredentials.password) {
  //     navigate('/two-factor-auth');
  //   } else {
  //     setError('Invalid credentials');
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('remember_me', rememberMe);

      const response = await axios.post('http://localhost:8000/api/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = response.data;

      if (data) {
        // Redirect to the 2FA page
        //navigate('/two-factor-auth', { state: { email: data.email } });
        console.log(data);
      } else {
        // Handle successful login
        console.log('Access Token:', data.access_token);
        // Save the token to local storage or a secure place
        localStorage.setItem('accessToken', data.access_token);
        navigate('/dashboard'); // Redirect to the dashboard
      }
    } catch (err) {
      if (err.response) {
        // Display error from server
        setError(err.response.data.detail || 'Login failed');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <Layout>
      <div className="flex min-h-screen transition-colors duration-300">
        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome back</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Start your website in seconds. Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 dark:text-blue-400 hover:underline">Sign up.</a>
            </p>
            <form onSubmit={handleLogin}>
              <label className="block mb-2 text-gray-600 dark:text-gray-300">Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
              />
              <label className="block mb-2 text-gray-600 dark:text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
              />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-gray-600 dark:text-gray-300">Remember me</label>
                </div>
                <a href="/reset-password" className="text-blue-500 dark:text-blue-400 hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                Sign in to your account
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            <div className="flex flex-col mt-6">
              <button className="flex items-center justify-center w-full mb-2 p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600">
                <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>
              <button className="flex items-center justify-center w-full p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600">
                <FontAwesomeIcon icon={faApple} className="w-5 h-5 mr-2" />
                Sign in with Apple
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center p-8 ">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;


