import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleGetReport = async () => {
  return handleApiRequest(() =>
    apiClient.get("/api/get-reports", {}, { withCredentials: true })
  );
};

export const handleSubmitReport = async (values) => {
  return handleApiRequest(() =>
    apiClient.post("/api/submit-report", values, { withCredentials: true })
  );
};