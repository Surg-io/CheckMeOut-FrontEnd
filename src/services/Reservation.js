/**
* src/services/Reservation.js
* Service for handling reservation-related API requests (fetching schedules and submitting reservations).
*/
import { apiClient } from '@root/utils/ApiUtils';
import dayjs from 'dayjs';

/**
* @async
* @function handleFetchSchedule
* @param {dayjs.Dayjs} date
* @returns {Promise<Object>}
* @throws {Error}
*/
const handleFetchSchedule = async (date) => {
try {
    const response = await apiClient.post('/searchdate', {
    fullDate: dayjs(date).toISOString()
    });
    
    return response.data;
} catch (error) {
    console.error('Failed to fetch schedule:', error.message);
    throw new Error(error.message || 'Failed to fetch schedule, please try again later.');
}
};

/**
* @async
* @function handleSubmitReservation
* @param {Array<{ deviceId: string, device: string, time: string }>} pendingSlots
* @returns {Promise<Object>}
* @throws {Error}
*/
const handleSubmitReservation = async (pendingSlots) => {
try {
    const response = await apiClient.post('/reserve', {
    reservations: pendingSlots.map(({ deviceId, device, time }) => ({
        deviceId,
        device,
        time
    }))
    });

    return response.data;
} catch (error) {
    console.error('Failed to submit reservation:', error.message);
    throw new Error(error.message || 'Failed to submit reservation, please try again later.');
}
};

export { handleFetchSchedule, handleSubmitReservation };