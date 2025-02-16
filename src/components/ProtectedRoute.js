// src/components/ProtectedRoute.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "context/UserContext";
import { useAcl } from "context/AclContext";
import { Spin } from "antd";

const ProtectedRoute = ({ 
  component: Component, 
  requiredPermission, 
  redirectPath
}) => {
  const { token } = useUser();
  const { hasPermission } = useAcl();
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = React.useState(true);

  useEffect(() => {
    const checkAccess = () => {
      if (token === undefined) return;

      if (!token) {
        navigate("/auth", { replace: true });
        setIsChecking(false);
        return;
      }

      let resolvedPermission = requiredPermission;
      if (typeof requiredPermission === "function") {
        const params = new URLSearchParams(location.search);
        resolvedPermission = requiredPermission(params);
      }

      if (resolvedPermission && !hasPermission(resolvedPermission)) {
        navigate(redirectPath || "/unauthorized", { replace: true });
        setIsChecking(false);
        return;
      }

      setIsChecking(false);
    };

    checkAccess();
  }, [location, token, requiredPermission, redirectPath]);

  if (isChecking) return <Spin />;
  return <Component />;
};

export default ProtectedRoute;