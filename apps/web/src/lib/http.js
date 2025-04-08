import axios from "axios";
import { emitter } from "./events";

// Create axios instance
export const api = axios.create({
  baseURL: "http://localhost:3500",
});

// Track refresh token requests
let isRefreshing = false;
let failedQueue = [];
const MAX_RETRIES = 2;

/**
 * Emits logout event and clears local storage.
 */
const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  emitter.emit("logout");
};

/**
 * Function to refresh the access token
 */
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(
      "http://localhost:3500/api/auth/refresh",
      {
        refreshToken,
      }
    );

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    // Retry all failed requests
    failedQueue.forEach((callback) => callback(accessToken));
    failedQueue = [];

    return accessToken;
  } catch (error) {
    failedQueue = [];
    handleLogout();
    throw error;
  }
};

// Request Interceptor (Attach Authorization Header)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.meta = config.meta || { retryCount: 0 };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle Token Expiry & Retry Requests)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.meta.retryCount >= MAX_RETRIES) {
        console.warn("Max retries reached. Logging out...");
        handleLogout();
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;

          // Retry the failed request with the new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve) => {
          failedQueue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);
