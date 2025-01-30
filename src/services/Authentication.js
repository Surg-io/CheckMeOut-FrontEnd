/** 
 * src/services/Authentication.js
 * Modify config file to use mock/actual data
 */
import { getUrl } from "@root/utils/GetUrl";
import { fetchWithAuth } from "@root/utils/Token";
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
        const url = getUrl();
        const payload = {
            LN: value.lastName,
            FN: value.firstName,
            Email: value.Email,
            Password: value.password,
            Major: value.major,
            DOB: value.birthday,
        };

        const response = await fetch(`${url}/registration`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Registration failed.')
        } else {
            
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error; //
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
    const url = getUrl();
    try {
        const response = await fetch(`${url}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'Failed to parse error response',
            }));
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Internal error');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
};

export { handleRegistration, handleLogin};