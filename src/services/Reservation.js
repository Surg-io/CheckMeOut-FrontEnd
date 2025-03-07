/**
 * src/services/Reservation.js
 * Service for handling reservation-related API requests (fetching schedules and submitting reservations).
 */
import { apiClient } from "utils/ApiClient";
import { handleApiRequest } from "utils/ApiUtils";
import dayjs from "dayjs";

const handleFetchSchedule = async (date) => {
  const payload = {
    fullDate: dayjs(date).toISOString(),
  };
  return handleApiRequest(() =>
    apiClient.post("/api/search-date", payload, { withCredentials: true })
  );
};

const handleSubmitReservation = async (pendingSlots) => {
  const payload = {
    reservations: pendingSlots.map(({ deviceId, deviceName, time }) => ({
      deviceId,
      deviceName,
      time,
    })),
  };
  return handleApiRequest(() =>
    apiClient.post("/api/reserve", payload, { withCredentials: true })
  );
};

export { handleFetchSchedule, handleSubmitReservation };
