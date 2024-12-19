import axios from "axios";

// Create a reusable Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your API base URL
  timeout: 10000, // Request timeout
});

// Request interceptor to attach Authorization token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
