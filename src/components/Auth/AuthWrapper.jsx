import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Current time in seconds

          // Check if the token has expired
          if (decodedToken.exp < currentTime) {
            // Token has expired
            localStorage.removeItem('accessToken'); // Remove the invalid token
            navigate('/'); // Redirect to home page
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('accessToken'); // Invalid token
          navigate('/'); // Redirect to home page
        }
      } else {
        // No token found, redirect to home page
        navigate('/');
      }
    };

    checkToken();
  }, [navigate]);

  return <>{children}</>;
};

export default AuthWrapper;
