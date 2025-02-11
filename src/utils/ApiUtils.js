// src/utils/ApiUtils.js

export const handleApiRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    
    if (!response || !response.data) {
      throw new Error("Invalid response from server");
    }

    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Request failed";

      if (status === 401) {
        throw new Error("Unauthorized: Please login again");
      } else if (status >= 500) {
        throw new Error("Server error: Please try again later");
      } else {
        throw new Error(message);
      }
    }

    throw new Error(error.message || "Network error: Please check your connection");
  }
};
