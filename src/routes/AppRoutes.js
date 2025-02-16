// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "context/UserContext";
import ProtectedRoute from "components/ProtectedRoute";
import HomePage from "pages/Home/HomePage";
import Auth from "pages/Auth/Auth";
import Dashboard from "pages/Dashboard/Dashboard";
import Unauthorized from "pages/Unauthorized";
import { ROLE_USER } from "config/permissions";

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
          <ProtectedRoute children={<Dashboard />} requiredPermission={ROLE_USER}/>
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;