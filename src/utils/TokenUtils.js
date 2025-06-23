// src/utils/TokenUtils.js
import e from "cors";
import Cookies from "js-cookie";
import { valid } from "mockjs";

export const getToken = () => Cookies.get("token");

const parseJwtPayload = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (error) {
    console.error("Failed to parse JWT payload:", error);
    return null;
  }
};

export const validateToken = () => {
  const token = getToken();
  if (!token) return false;

  const payload = parseJwtPayload(token);
  if (!payload || !payload.exp) return false;

  return Date.now() < payload.exp * 1000; 
};

export const getPermissions = () => {
  const token = getToken();
  if (!token) return null;

  const payload = parseJwtPayload(token);
  if (!payload || !payload.permissions) return null;

  return payload.permissions;
};

export const persistTokenData = (token) => {
  const payload = parseJwtPayload(token);
  if (!payload || !payload.exp) {
    console.log("Invalid token: missing expiration time");
  }

  const expiresAt = new Date(payload.exp * 1000);
    Cookies.set("token", token, { expires: expiresAt, path: '/' });

    if (payload.permissions) {
      Cookies.set("permissions", JSON.stringify(payload.permissions), {
        expires: expiresAt,
        path: '/'
      });
    }
};

export const clearTokenData = () => {
  Cookies.remove("token");
  Cookies.remove("permissions");
};

export const login = async (token) => {
  persistTokenData(token);
  window.location.href = "/dashboard?tab=reservation";
};

export const logout = () => {
  clearTokenData();
  window.location.href = "/auth?tab=login";
};

export const autoLogin = () => {
  const token = getToken();
  if (validateToken(token)){
    login(token);
  } else {
    logout();
  }
}