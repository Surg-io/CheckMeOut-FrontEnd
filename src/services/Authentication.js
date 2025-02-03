/**
 * src/services/Authentication.js
 * Service for handling authentication-related API requests (registration and login).
 * Uses utility functions for consistent request handling, timeout, and error management.
 */
import { getUrl, fetchWithAuth, checkResponseStatus, parseJsonResponse } from "@root/utils/ApiUtils";

/**
 * Handles user registration by sending a POST request to the registration endpoint.
 * @async
 * @function handleRegistration
 * @param {Object} value - Form data containing user registration details.
 * @returns {Promise<Object>} A promise that resolves to the registration response data.
 * @throws {Error} Throws an error if the API request fails or the response is not successful.
 */
const handleRegistration = async (value) => {
    const url = getUrl();
    const payload = {
        LN: value.lastName,
        FN: value.firstName,
        Email: value.email,
        Password: value.password,
        Major: value.major,
        DOB: value.birthday,
    };

    try {
        const response = await fetchWithAuth(`${url}/registration`, {
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
        console.error('Registration error:', error.message);
        throw new Error(error.message || 'Registration failed. Please try again.');
    }
};

/**
 * Handles user login by sending a POST request to the login endpoint.
 * @async
 * @function handleLogin
 * @param {Object} values - Form data containing login credentials (username and password).
 * @returns {Promise<Object>} A promise that resolves to the login response data.
 * @throws {Error} Throws an error if the API request fails, the response is not successful, or input is invalid.
 */
const handleLogin = async (values) => {
    if (!values || !values.Email || !values.password) {
        throw new Error('Invalid input: username and password are required.');
    }
    const url = getUrl();
    try {
        const response = await fetchWithAuth(`${url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        // Check if the response status is OK
        checkResponseStatus(response);
        // Parse the JSON response
        const data = await parseJsonResponse(response);
        // Check if the login was successful based on the response data
        if (!data.success) {
            throw new Error(data.message || 'Login failed due to an internal error.');
        }
        
        return data;
    } catch (error) {
        console.error('Login error:', error.message);
        throw new Error(error.message || 'Login failed. Please check your credentials and try again.');
    }
};

export { handleRegistration, handleLogin };