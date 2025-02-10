// src/context/UserContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef
} from "react";
import axios from "axios";
import { validateToken } from "@root/utils/TokenUtils";
import { handleRefreshToken } from "@root/services/Token";

const UserContext = createContext();

let isRefreshing = false;
function persistTokenData(newToken, newExpiresAt, newRefreshToken) {
  localStorage.setItem("token", newToken);
  localStorage.setItem("expiresAt", String(newExpiresAt));
  if (newRefreshToken) {
    localStorage.setItem("refreshToken", newRefreshToken);
  }
}

function clearTokenData() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
  localStorage.removeItem("refreshToken");
}

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken"));
  const [expiresAt, setExpiresAt] = useState(
    () => parseInt(localStorage.getItem("expiresAt"), 10) || null,
  );
  const refreshTimerRef = useRef(null);

  const login = useCallback((newToken, expiresIn, refreshToken) => {
    const calculatedExpiresAt = Date.now() + expiresIn * 1000;
    persistTokenData(newToken, calculatedExpiresAt.toString(), refreshToken);
  
    setToken(newToken);
    setExpiresAt(calculatedExpiresAt);
    setRefreshToken(refreshToken);
    scheduleTokenRefresh(calculatedExpiresAt);
  }, []);

  const logout = useCallback(() => {
    clearTokenData();
    setToken(null);
    setExpiresAt(null);
    setRefreshToken(null);
    delete axios.defaults.headers.common.Authorization;
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  const refresh = useCallback(async () => {
    if (isRefreshing) return;
    isRefreshing = true;
  
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) {
        logout();
      }
      const response = await handleRefreshToken();
      if(!response.token) {
        throw new Error("Refresh token failed.")
      }
      login(response.token, response.expiresIn, storedRefreshToken);
      return response.token;
    } catch (error) {
      logout();
      throw error;
    } finally {
      isRefreshing = false;
    }
  }, [login, logout]);
  

  const scheduleTokenRefresh = useCallback( (expirationTime) => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
      const refreshThreshold = 5 * 60 * 1000;
      const delay = expirationTime - Date.now() - refreshThreshold;
      if (delay > 0) {
        refreshTimerRef.current = setTimeout(() => {
          if (validateToken()) {
            refresh();
          } else {
            logout();
          }
        }, delay);
      }
    },
    [refreshToken, logout],
  );

  useEffect(() => {
    if (!token) {
      return;
    }
    if (validateToken(token)) {
      scheduleTokenRefresh(expiresAt);
    } else {
      refresh().catch((err) => {
        console.error("Refresh token failed", err);
      });
    }
  
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const storedRefreshToken = localStorage.getItem("refreshToken");
            if (!storedRefreshToken) {
              logout();
              return Promise.reject(error);
            }
            const newToken = await refresh();
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
  
    return () => {
      axios.interceptors.response.eject(interceptor);
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [token, expiresAt, refresh, logout]);

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