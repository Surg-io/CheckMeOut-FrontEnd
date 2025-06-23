// src/services/HistoryApi.js
import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleGetHistory = async (values) => {
  return handleApiRequest(() => 
    apiClient.post("/api/history", values, { withCredentials: true })
  )
};

export const handleGetUserReservation = async () => {
  return handleApiRequest(() => 
    apiClient.get("/api/user-reservations", {}, { withCredentials: true })
  )
};

export const handleCancelReservation = async (values) => {
  console.log(values)
  return handleApiRequest(() => 
    apiClient.post("/api/cancel-reservation", values, { withCredentials: true })
  )
};