/**
 * src/services/Reservation.js
 * Service for handling reservation-related API requests (fetching schedules and submitting reservations).
 */
import { apiClient } from "@root/utils/ApiClient";
import { handleApiRequest } from "@root/utils/ApiUtils";
import dayjs from "dayjs";

const handleFetchSchedule = async (date) => {
  const payload = {
    fullDate: dayjs(date).toISOString(),
  };
  return handleApiRequest(() =>
    apiClient.post("/searchdate", payload, { withCredentials: false })
  );
};

const handleSubmitReservation = async (pendingSlots) => {
  const payload = {
    reservations: pendingSlots.map(({ deviceId, device, time }) => ({
      deviceId,
      device,
      time,
    })),
  };
  return handleApiRequest(() =>
    apiClient.post("/reserve", payload, { withCredentials: true })
  );
};

export { handleFetchSchedule, handleSubmitReservation };
