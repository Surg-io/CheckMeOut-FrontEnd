// src/context/UserContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const UserContext = createContext();

let isRefreshing = false;

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [expiresAt, setExpiresAt] = useState(
    () => parseInt(localStorage.getItem("expiresAt"), 10) || null,
  );

  const validateToken = useCallback(() => {
    if (!token || !expiresAt) return false;
    try {
      jwtDecode(token);
      return Date.now() < expiresAt;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  }, [token, expiresAt]);

  const login = useCallback((newToken, expiresIn) => {
    const calculatedExpiresAt = Date.now() + expiresIn * 1000;

    localStorage.setItem("token", newToken);
    localStorage.setItem("expiresAt", calculatedExpiresAt.toString());

    setToken(newToken);
    setExpiresAt(calculatedExpiresAt);

    scheduleTokenRefresh(calculatedExpiresAt);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    setToken(null);
    setExpiresAt(null);
    delete axios.defaults.headers.common.Authorization;
  }, []);

  const refreshToken = useCallback(async () => {
    if (isRefreshing) return;
    isRefreshing = true;

    try {
      const response = await axios.post("/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
      });

      login(response.data.token, response.data.expiresIn);
      return response.data.token;
    } catch (error) {
      logout();
      throw error;
    } finally {
      isRefreshing = false;
    }
  }, [login, logout]);

  const scheduleTokenRefresh = useCallback(
    (expirationTime) => {
      const refreshThreshold = 5 * 60 * 1000;
      const delay = expirationTime - Date.now() - refreshThreshold;

      if (delay > 0) {
        setTimeout(() => {
          if (validateToken()) {
            refreshToken();
          } else {
            logout();
          }
        }, delay);
      }
    },
    [validateToken, refreshToken, logout],
  );

  useEffect(() => {
    if (!validateToken()) {
      logout();
    }

    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        //TODO: Change refresh conditions
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refreshToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [token, validateToken, logout, refreshToken]);

  return (
    <UserContext.Provider
      value={{
        token,
        expiresAt,
        isAuthenticated: validateToken(),
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
