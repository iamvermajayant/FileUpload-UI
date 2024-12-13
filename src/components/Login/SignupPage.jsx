import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';  // Import Layout component
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Font Awesome icons for Google and Apple
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log('API Response:', response.data);
      toast.success('Account created successfully!');
      setTimeout(() => navigate('/welcome'), 2000);
    } catch (error) {
      console.error('API Error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="flex min-h-screen transition-colors duration-300">
        {/* Left Side: Registration Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Create your account</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Join us and start your journey. Already have an account?{' '}
              <a href="/login" className="text-blue-500 dark:text-blue-400 hover:underline">Sign in.</a>
            </p>
            <form onSubmit={handleRegister}>
              <label className="block mb-2 text-gray-600 dark:text-gray-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600 dark:text-gray-300">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600 dark:text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600 dark:text-gray-300">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                Create account
              </button>
            </form>
            <div className="flex flex-col mt-6">
              {/* Google Button with Font Awesome icon */}
              <button className="flex items-center justify-center w-full mb-2 p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600">
                <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2" />
                Sign up with Google
              </button>
              {/* Apple Button with Font Awesome icon */}
              <button className="flex items-center justify-center w-full p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600">
                <FontAwesomeIcon icon={faApple} className="w-5 h-5 mr-2" />
                Sign up with Apple
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center p-8 bg-gray-200 dark:bg-gray-900">
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

export default RegisterPage;
