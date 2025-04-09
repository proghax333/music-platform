import axios from "axios";
import { emitter } from "./events";
import { GRAPHQL_ENDPOINT } from "./graphql";

export const BASE_URL = "http://localhost:3500";

// Create axios instance
export const api = axios.create({
  baseURL: BASE_URL,
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

    const response = await axios.post(`${BASE_URL}${GRAPHQL_ENDPOINT}`, {
      query: `
mutation RefreshToken($input: RefreshTokenMutationInput!) {
  refreshToken(input: $input) {
        success
        message
        errors
        
        accessToken
  }
}
        `,
      variables: {
        input: {
          refreshToken,
        },
      },
    });

    const { accessToken } = response.data?.data?.refreshToken || {};
    if (!accessToken) throw new Error("Failed to refresh access token");

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
    const response = error.response?.data || {};

    if (
      (error.response?.status === 401 ||
        response?.errors?.some((x) => x.message.includes("Invalid token"))) &&
      !originalRequest._retry
    ) {
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
