import axios from "axios";
import config from "config/config";
import { getToken, logout } from "utils/TokenUtils";
const URL = process.env.NODE_ENV === "production" ? config.apiBaseUrl : (config.useMockData ? config.mockURL : config.apiBaseUrl);
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

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      logout();

      window.location.href = '/auth?tab=login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
