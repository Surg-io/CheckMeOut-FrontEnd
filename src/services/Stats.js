import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleStats = async (values) => {
  return handleApiRequest(() =>
    apiClient.get("/api/stats", values, { withCredentials: true })
  );
};