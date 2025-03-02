// src/services/HistoryApi.js
import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";

export const handleGetHistory = async (values) => {
  return handleApiRequest(() => 
    apiClient.post("/scanHistory", values, { withCredentials: true })
  )
};

export const handleGetUserReservation = async (values) => {
  return handleApiRequest(() => 
    apiClient.post("/getuserreservation", values, { withCredentials: true })
  )
};

export const handleCancelReservation = async (values) => {
  console.log(values)
  return handleApiRequest(() => 
    apiClient.post("/cancelReservation", values, { withCredentials: true })
  )
};