import jwt from 'jsonwebtoken';

export const isTokenExpired = (token) => {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) return true;
        return Date.now() >= decoded.exp * 1000;
    } catch (error) {
        return true;
    }
};


export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        window.location.href = '/auth';
        return;
    }

    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return fetch(url, options);
};