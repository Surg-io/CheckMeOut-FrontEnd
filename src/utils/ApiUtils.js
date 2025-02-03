import config from '@root/config/config';
import { jwtDecode } from 'jwt-decode';

export const parseJwt = (token) => {
    try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
    } catch (e) {
    return null;
    }
};

export const getUrl = () => {
    if (config.useMockData){
        return `${config.mockURL}`;
    } else {
        return `${config.apiBaseUrl}`;
    }
};

export const parseJsonResponse = async (response) => {
    try {
        return await response.json();
    } catch (error) {
        throw new Error('Failed to parse response as JSON');
    }
};


export const checkResponseStatus = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
};

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) return true;

        if (decoded.nbf && decoded.nbf > now) return true;

        return false;
    } catch (error) {
        console.error('Token error:', error);
        return true;
    }
};

export const fetchWithAuth = async (url, options = {}, timeout = 10000) => {
    const token = localStorage.getItem('token');

    if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        throw new Error('Token expired');
    }

    const headers = {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        credentials: 'include',
    };

    try {
        const response = await Promise.race([
            fetch(url, { ...options, headers }),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), timeout)
            ),
        ]);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
};