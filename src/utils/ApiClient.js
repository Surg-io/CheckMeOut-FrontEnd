import axios from "axios";
import config from "config/config";
import { getToken, logout } from "utils/TokenUtils";
import { showNotification } from "utils/NotificationUtils";

const URL = process.env.NODE_ENV === "production" 
  ? config.apiBaseUrl 
  : (config.useMockData ? config.mockURL : config.apiBaseUrl);

export const apiClient = axios.create({
  baseURL: URL,
  timeout: 10000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
const handleUnauthorized = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    showNotification(
      "error",
      "Session Expired",
      "Please log in again.",
      1500,
      ()=>{
        logout();
        window.location.href = "/auth?tab=login"; 
      }
    );
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("Network error:", error);
      return Promise.reject(new Error("Network error"));
    }

    const { status, data } = error.response;

    if (status === 401) {
      console.warn("Unauthorized error:", data);
      handleUnauthorized();
      return Promise.reject(new Error("Login expired."));
    }

    if (status === 403) {
      console.warn("Forbidden access:", data);
      return Promise.reject(new Error("Permission denied."));
    }

    if (status === 500) {
      console.error("Server error:", data);
      return Promise.reject(new Error("Server error."));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
