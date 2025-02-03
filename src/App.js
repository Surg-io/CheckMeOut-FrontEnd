// This is the main entry point of the application
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@root/context/UserContext";
import { ConfigProvider } from 'antd';
// Pages
import HomePage from "@root/pages/Home/HomePage";
import Auth from "@root/pages/Auth/Auth";
import Dashboard from "@root/pages/Dashboard/Dashboard";

// ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const { userId } = useUser();
  return userId ? children : <Navigate to="/auth" replace />;
};


const AppRoutes = () => {
  const { userId } = useUser();

  return (
    <Routes>
      <Route 
        path="/" 
        element={<HomePage />}
      />
      <Route 
        path="/auth"
        element={userId ? <Navigate to="/dashboard" replace /> : <Auth />} 
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
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </ConfigProvider>
  );
};

export default App;