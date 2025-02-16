// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "context/UserContext";
import { useAcl } from "context/AclContext";

const ProtectedRoute = ({ component: Component, requiredPermission, redirectPath }) => {
  const { token } = useUser();
  const { hasPermission } = useAcl();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const resolvedPermission = 
    typeof requiredPermission === "function"
      ? requiredPermission(searchParams)
      : requiredPermission;

  if (!token) return <Navigate to="/auth" replace />;

  const hasAccess = resolvedPermission ? hasPermission(resolvedPermission) : true;

  if (!hasAccess) {
    navigate(redirectPath || location.pathname, { replace: true });
    return null;
  }

  return <Component />;
};

export default ProtectedRoute;