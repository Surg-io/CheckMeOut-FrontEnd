import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleReportApi = async (values) => {
  return handleApiRequest(() =>
    apiClient.get("/report", values, { withCredentials: true })
  );
};