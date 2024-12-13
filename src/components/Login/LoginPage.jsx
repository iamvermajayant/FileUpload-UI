import React, { useState } from 'react';
import Layout from '../Layout'; // Import your Layout component
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Dummy credentials for login
  const dummyCredentials = {
    email: 'admin@example.com',
    password: '123',
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === dummyCredentials.email && password === dummyCredentials.password) {
      navigate('/two-factor-auth');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-white transition-colors duration-300">
        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Welcome back</h2>
            <p className="mb-6 text-gray-500">
              Start your website in seconds. Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:underline">Sign up.</a>
            </p>
            <form onSubmit={handleLogin}>
              <label className="block mb-2 text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none"
              />
              <label className="block mb-2 text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 bg-white text-gray-900 border border-gray-300 rounded focus:outline-none"
              />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-gray-600">Remember me</label>
                </div>
                <a href="/reset-password" className="text-blue-500 hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
              >
                Sign in to your account
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            <div className="flex flex-col mt-6">
              <button className="flex items-center justify-center w-full mb-2 p-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400">
                <img src="/path/to/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>
              <button className="flex items-center justify-center w-full p-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400">
                <img src="/path/to/apple-icon.png" alt="Apple" className="w-5 h-5 mr-2" />
                Sign in with Apple
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center p-8 bg-gray-200">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg" // Replace with the exact path of your image
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
