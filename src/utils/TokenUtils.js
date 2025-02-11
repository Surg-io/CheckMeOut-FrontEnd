// src/utils/TokenUtils
import apiClient from "@root/utils/ApiClient";
import { handleRefreshToken } from "@root/services/Authentication";

export const getToken = () => localStorage.getItem("token");

export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const validateToken = () => {
  const expiresAtStr = localStorage.getItem('expiresAt');
  if (!expiresAtStr) return false;
  const expiresAt = parseInt(expiresAtStr, 10);
  return Date.now() < expiresAt;
};

export const persistTokenData = (token, expiresIn, refreshToken) => {
  const expiresAt = Date.now() + expiresIn * 1000;
  localStorage.setItem("token", token);
  localStorage.setItem("expiresAt", String(expiresAt));
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const clearTokenData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expiresAt");
};

export const login = async (token, expiresIn, refreshToken) => {
  const calculatedExpiresAt = Date.now() + expiresIn * 1000;
  persistTokenData(token, calculatedExpiresAt.toString(), refreshToken);
  window.location.href = "/dashboard?tab=summary";
};

export const logout = () => {
  clearTokenData();
  window.location.href = "/auth?tab=login";
};

export const refreshToken = async () => {
  const storedRefreshToken = getRefreshToken();
  if (!storedRefreshToken) throw new Error("No refresh token available");

  try {
    const response = await handleRefreshToken(storedRefreshToken);
    const { token, expiresIn } = response.data;

    if (token) {
      persistTokenData(token, expiresIn, storedRefreshToken);
      return token;
    }
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};
