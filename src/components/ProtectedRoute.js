// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "context/UserContext";
import { useAcl } from "context/AclContext";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { token } = useUser();
  const { hasPermission } = useAcl();

  if (token === undefined) return null;

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;