import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleCreateDevice = async (values) => {
  return handleApiRequest(() =>
    apiClient.post("/createdevice", values, { withCredentials: true })
  );
};

export const handleGetDevice = async () => {
  return handleApiRequest(() =>
    apiClient.get("/getdevice", {}, { withCredentials: true })
  );
};