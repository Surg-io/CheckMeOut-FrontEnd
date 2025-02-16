// src/contexts/AclContext.js
import React, { createContext, useState, useContext} from "react";
import Cookies from "js-cookie";

export const AclContext = createContext();

export const AclProvider = ({ children }) => {
  const loadPermissionsFromCookie = () => {
    const storedPermissions = Cookies.get("permissions");
    return storedPermissions ? JSON.parse(storedPermissions) : [];
  };

  const [permissions, setPermissions] = useState(loadPermissionsFromCookie());

  const hasPermission = (requiredPermission) => {
    return (permissions & requiredPermission) === requiredPermission;
  };

  const updatePermissions = (newPermissions) => {
    setPermissions(newPermissions);
    Cookies.set("permissions", JSON.stringify(newPermissions), { expires: 7 });
  };

  const clearPermissions = () => {
    setPermissions([]);
    Cookies.remove("permissions");
  };

  return (
    <AclContext.Provider
      value={{ permissions, hasPermission, updatePermissions, clearPermissions }}
    >
      {children}
    </AclContext.Provider>
  );
};

export const useAcl = () => {
  const context = useContext(AclContext);
  if (!context) {
    throw new Error("useAcl must be used within an AclProvider");
  }
  return context;
};