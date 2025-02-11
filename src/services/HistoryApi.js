// src/services/HistoryApi.js
import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleGetHistory = async (values) => {
  return handleApiRequest(() => 
    apiClient.post("/history", values, { withCredentials: true })
  )
};

export const handleCancelReservation = async (values) => {
  return handleApiRequest(() => 
    apiClient.post("/cancel", values, { withCredentials: true })
  )
};