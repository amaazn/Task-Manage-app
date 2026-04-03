import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true, // Required to send/receive HTTP-only cookies
});

// Attach Access Token to every request
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Global response interceptor to handle errors (like 401 Unauthorized)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If you implement automatic refresh logic, it would go here
    return Promise.reject(error);
  }
);

export default API;