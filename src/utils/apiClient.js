import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
const TOKEN = localStorage.getItem("accessToken");
console.log(TOKEN);

// Create a reusable Axios instance
// const apiClient = axios.create({
//   baseURL: "http://localhost:8000/api", // Replace with your API base URL
//   timeout: 10000, // Request timeout
// });

export const userRequest = axios.create({
  baseURL : BASE_URL,
  headers : {Authorization : `Bearer ${TOKEN}`}
})



export const publicRequest = axios.create({
  baseURL : BASE_URL,
}) 
