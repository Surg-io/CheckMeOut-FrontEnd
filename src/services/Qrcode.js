// src/services/Qrcode.js
import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleQrcode = async () => {
  return handleApiRequest(() =>
    apiClient.get("/api/qrcode", {}, { withCredentials: true })
  );
};