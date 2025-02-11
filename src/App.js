// This is the main entry point of the application
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "context/UserContext";
import { ConfigProvider } from "antd";
// Pages
import HomePage from "pages/Home/HomePage";
import Auth from "pages/Auth/Auth";
import Dashboard from "pages/Dashboard/Dashboard";
import { NotificationProvider } from "context/NotificationContext";

import "App.css";

// ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const { token } = useUser();
  if (token === undefined) return null;
  return token ? children : <Navigate to="/auth" replace />;
};

const AppRoutes = () => {
  const { token } = useUser();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/auth"
        element={token ? <Navigate to="/dashboard" replace /> : <Auth />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const customTheme = {
  token: {
    fontFamily: "Montserrat, sans-serif",
    borderRadius: 8
  },
};

const App = () => {
  return (
    <ConfigProvider theme={customTheme}>
      <UserProvider>
        <BrowserRouter>
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>
        </BrowserRouter>
      </UserProvider>
    </ConfigProvider>
  );
};

export default App;
