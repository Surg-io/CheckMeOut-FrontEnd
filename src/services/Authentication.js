/** 
 * src/services/Authentication.js
 * Modify config file to use mock/actual data
 */

import config from '@root/config/config';

/**
 * Request account registration
 * @async
 * @function handleRegistration
 * @param {Object} value - Form info
 * @returns {Promise<Object>} A promise that resolves to the account ID.
 * @throws {Error} Throws an error if the API request fails or the response is not `ok`.
 */
const handleRegistration = async (value) => {
    try {
        console.log(value);
        let response;
        let url;
        if (config.useMockData){ // Send the selected date to the backend
            url = `${config.mockURL}`;
        } else {
            url = `${config.apiBaseUrl}`;
        }
        const payload = {
            LN: value.lastName,
            FN: value.firstName,
            Email: value.Email,
            Password: value.password,
            Major: value.major,
            DOB: value.birthday,
        };
        console.log(payload);
        response = await fetch(`${url}/registration`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
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
}

export {handleRegistration};