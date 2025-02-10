// @root/utils/ApiUtils.js
import axios from "axios";
import config from "@root/config/config";
import { jwtDecode } from "jwt-decode";
import { validateToken } from "@root/utils/TokenUtils";

export const getUrl = () => {
  if (config.useMockData) {
    return `${config.mockURL}`;
  } else {
    return `${config.apiBaseUrl}`;
  }
};

export const apiClient = axios.create({
  baseURL: config.useMockData ? config.mockURL : config.apiBaseUrl,
  timeout: 10000,
  //withCredentials: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = "/auth?tab=login";
        return Promise.reject({ message: "Session expired, please login again" });
      }
    }

    return Promise.reject(error);
  },
);
