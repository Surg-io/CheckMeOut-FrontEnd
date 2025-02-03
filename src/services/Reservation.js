/**
 * src/services/Reservation.js
 * Service for handling reservation-related API requests (fetching schedules and submitting reservations).
 * Uses utility functions for consistent request handling, timeout, and error management.
 */
import { getUrl, fetchWithAuth, checkResponseStatus, parseJsonResponse } from "@root/utils/ApiUtils";
import dayjs from 'dayjs';

/**
 * Fetches reservation schedule data for a specific date.
 * @async
 * @function handleFetchSchedule
 * @param {Object} value - Date object (e.g., from day.js).
 * @returns {Promise<Object>} A promise that resolves to the fetched schedule data.
 * @throws {Error} Throws an error if the API request fails or the response is not successful.
 */
const handleFetchSchedule = async (value) => {
    const url = getUrl();
    try {
        const response = await fetchWithAuth(`${url}/searchdate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullDate: dayjs(value).toISOString(),
            }),
        });

        // Check if the response status is OK
        checkResponseStatus(response);

        // Parse the JSON response
        const data = await parseJsonResponse(response);
        return data;
    } catch (error) {
        console.error('Failed to fetch schedule:', error.message);
        throw new Error(error.message || 'Failed to fetch schedule. Please try again.');
    }
};

/**
 * Submits selected time slots for reservation.
 * @async
 * @function handleSubmitReservation
 * @param {Array<Object>} pendingSlots - An array of objects representing the selected slots.
 * Each object contains:
 *  - {string} deviceId - The ID of the device.
 *  - {string} device - The name of the device.
 *  - {string} time - The selected time slot in ISO format.
 * @returns {Promise<Object>} A promise that resolves to the reservation submission response.
 * @throws {Error} Throws an error if the API request fails or the response is not successful.
 */
const handleSubmitReservation = async (pendingSlots) => {
    const url = getUrl();
    const payload = {
        reservations: pendingSlots.map(({ deviceId, device, time }) => ({
            deviceId,
            device,
            time,
        })),
    };

    try {
        const response = await fetchWithAuth(`${url}/reserve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        // Check if the response status is OK
        checkResponseStatus(response);

        // Parse the JSON response
        const data = await parseJsonResponse(response);
        return data;
    } catch (error) {
        console.error('Failed to submit reservation:', error.message);
        throw new Error(error.message || 'Failed to submit reservation. Please try again.');
    }
};

export { handleFetchSchedule, handleSubmitReservation };