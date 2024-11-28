/** 
 * src/services/api.js
 * Modify config file to use mock/actual data
 */
import config from '../config/config';
import { mockFetchScheduleResponse, mockSubmitReservationResponse } from '../mocks/MockResponses';


/**
 * Fetchs reservation data from the backend.
 * @async
 * @function handleFetchSchedule
 * @param {Object} value - Date object, see https://day.js.org/en/.
 * @returns {Promise<Object>} A promise that resolves to the fetched schedule data.
 * @throws {Error} Throws an error if the API request fails or the response is not `ok`.
 */
const handleFetchSchedule = async (value) => {
    const selectedDate = {
        year: value.$y,
        month: value.$M + 1,
        day: value.$D,
        fullDate: value.$d.toISOString() || ""
    };
    try {
        let response;
        if (config.useMockData){ // Send the selected date to the backend
            console.log('Using mock data for handleFetchSchedule')
            response = { ok: true, json: async () => mockFetchScheduleResponse };
        } else {
            response = await fetch(`${config.apiBaseUrl}/searchdate`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(selectedDate),
            });
        }
        if (response.ok) { // Handle the server response
            const data = await response.json();
            return data;
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) { // Log the error and propagate it to the caller
        console.error('An error occurred:', error);
        throw error;
    }
}

/**
 * Submits the pending slots for reservation.
 * @async
 * @function handleSubmitReserve
 * @param {Array<Object>} pendingSlots - An array of objects representing the selected slots.
 * Each object contains:
 *  - {string} deviceId - The ID of the device.
 *  - {string} device - The name of the device.
 *  - {string} time - The selected time slot in ISO format.
 * @returns {Promise<Object>} The API response if successful.
 * @throws {Error} Throws an error if the reservation submission fails.
 */
const handleSubmitReserve = async (pendingSlots) => {
    try {
        // Define the payload for the API
        let response;
        if(config.useMockData){
            console.log('Using mock data for handleSubmitReserve')
            response = { ok: true, json: mockSubmitReservationResponse };
            return response;
        } else {
            const payload = {
                reservations: pendingSlots.map(({ deviceId, device, time }) => ({
                    deviceId,
                    device,
                    time,
                })),
            };
            // Send the reservation data to the API
            response = await fetch(`${config.apiBaseUrl}/reserve`, {
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
                throw new Error(errorText);
            }
        }
    } catch (error) { // Log the error and propagate it to the caller
        console.error('An error occurred:', error);
        throw error; 
    }
};
export { handleFetchSchedule, handleSubmitReserve };