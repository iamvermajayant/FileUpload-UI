import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <div className="flex min-h-screen bg-white transition-colors duration-300">
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Create your account</h2>
            <p className="mb-6 text-gray-500">
              Join us and start your journey. Already have an account?{' '}
              <a href="/login" className="text-blue-500 hover:underline">Sign in.</a>
            </p>
            <form onSubmit={handleRegister}>
              <label className="block mb-2 text-gray-600">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-4 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 mb-4 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 mb-4 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none"
                required
              />
              <label className="block mb-2 text-gray-600">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-4 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
              >
                Create account
              </button>
            </form>
            <div className="flex flex-col mt-6">
              <button className="flex items-center justify-center w-full mb-2 p-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400">
                <img src="/path/to/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
                Sign up with Google
              </button>
              <button className="flex items-center justify-center w-full p-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400">
                <img src="/path/to/apple-icon.png" alt="Apple" className="w-5 h-5 mr-2" />
                Sign up with Apple
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/2 justify-center items-center p-8 bg-gray-200">
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
