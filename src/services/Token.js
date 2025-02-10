import { apiClient } from "@root/utils/ApiUtils";

export const handleRefreshToken = async (token) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await apiClient.post("/refreshToken",{refreshToken: refreshToken});
    if (!response?.token) {
      throw new Error("No new token returned by the server");
    }
    return response;
  } catch (error) {
    throw new Error(error.message || "Refresh token failed");
  }
};