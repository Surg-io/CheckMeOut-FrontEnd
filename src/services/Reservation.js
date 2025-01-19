/** 
 * src/services/Reservation.js
 * Modify config file to use mock/actual data
 */

// TODO: Add accountID to reserve
import config from '@root/config/config';
import dayjs from 'dayjs';


/**
 * Fetchs reservation data from the backend.
 * @async
 * @function handleFetchSchedule
 * @param {Object} value - Date object, see https://day.js.org/en/.
 * @returns {Promise<Object>} A promise that resolves to the fetched schedule data.
 * @throws {Error} Throws an error if the API request fails or the response is not `ok`.
 */
const handleFetchSchedule = async (value) => {
    try {
        let response;
        let url;
        if (config.useMockData){ // Send the selected date to the backend
            url = `${config.mockURL}`;
        } else {
            url = `${config.apiBaseUrl}`;
        }
        response = await fetch(`${url}/searchdate`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                fullDate: dayjs(value).toISOString(),
            }),
        });
        if (response.ok) { // Handle the server response
            const data = await response.json();
            return data;
        } else {
            const errorText = await response.text();
        }
    } catch (error) { // Log the error and propagate it to the caller
        console.error('An error occurred:', error);
    }
}

/**
 * Submits the pending slots for reservation.
 * @async
 * @function handleSubmitReservation
 * @param {Array<Object>} pendingSlots - An array of objects representing the selected slots.
 * Each object contains:
 *  - {string} deviceId - The ID of the device.
 *  - {string} device - The name of the device.
 *  - {string} time - The selected time slot in ISO format.
 * @returns {Promise<Object>} The API response if successful.
 * @throws {Error} Throws an error if the reservation submission fails.
 */
const handleSubmitReservation = async (pendingSlots) => {
    try {
        // Define the payload for the API
        let response;
        let url;
        if (config.useMockData){ // Send the selected date to the backend
            url = `${config.mockURL}`;
        } else {
            url = `${config.apiBaseUrl}`;
        }
        const payload = {
            accountID: 1,
            reservations: pendingSlots.map(({ deviceId, device, time }) => ({
                deviceId,
                device,
                time,
            })),
        };
        // Send the reservation data to the API
        response = await fetch(`${url}/reserve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) { // Handle the server response
            const data = await response.json();
            return data;
        } else {
            const errorText = await response.text();
        }
    } catch (error) { // Log the error and propagate it to the caller
        console.error('An error occurred:', error);
    }
};
export { handleFetchSchedule, handleSubmitReservation };