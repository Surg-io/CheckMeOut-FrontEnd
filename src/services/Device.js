import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleCreateDevice = async (values) => {
  return handleApiRequest(() =>
    apiClient.post("/api/create-device", values, { withCredentials: true })
  );
};

export const handleGetDevice = async () => {
  return handleApiRequest(() =>
    apiClient.get("/api/get-devices", {}, { withCredentials: true })
  );
};