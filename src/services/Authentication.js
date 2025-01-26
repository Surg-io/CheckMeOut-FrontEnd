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
        let response;
        let url;
        if (config.useMockData){
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

/**
 * Request account login
 * @async
 * @function handleLogin
 * @param {Object} value - Form info
 * @returns {Promise<Object>} A promise that resolves to the account ID.
 * @throws {Error} Throws an error if the API request fails or the response is not `ok`.
 */
const handleLogin = async (values) => {
    let url;
    if (config.useMockData) {
        url = `${config.mockURL}`;
    } else {
        url = `${config.apiBaseUrl}`;
    }

    try {
        const response = await fetch(`${url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        // Check if response is ok
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'Failed to parse error response',
            }));
            throw new Error(errorData.message || 'Login failed');
        }

        // Parse response body
        const data = await response.json().catch(() => {
            throw new Error('Failed to parse response');
        });

        // Validate success field in the data
        if (data.success) {
            return data; // Return the success data
        } else {
            throw new Error(data.message || 'Internal error');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        return null; // Return null on any error
    }
};


export { handleRegistration, handleLogin};