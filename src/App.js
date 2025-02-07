// This is the main entry point of the application
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@root/context/UserContext";
import { ConfigProvider } from 'antd';
// Pages
import HomePage from "@root/pages/Home/HomePage";
import Auth from "@root/pages/Auth/Auth";
import Dashboard from "@root/pages/Dashboard/Dashboard";
import { NotificationProvider } from "./context/NotificationContext";

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
      <Route 
        path="/" 
        element={<HomePage />}
      />
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
    fontFamily: 'Montserrat, sans-serif',
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