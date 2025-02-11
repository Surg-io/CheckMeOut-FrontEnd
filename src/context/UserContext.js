// src/context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { getToken, refreshToken, validateToken, logout } from "utils/TokenUtils";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [isAuthenticated, setIsAuthenticated] = useState(validateToken());

  useEffect(() => {
    if (!token) {
      return;
    }

    if (validateToken()) {
      setIsAuthenticated(true);
    } else {
      refreshToken()
        .then((newToken) => {
          setToken(newToken);
          setIsAuthenticated(true);
        })
        .catch(() => logout());
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, isAuthenticated, logout }}>
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
