import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
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

export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        navigate('/auth'); 
        throw new Error('Token expired');
    }

    const headers = {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'credentials': 'include',
    };

    try {
        const response = await fetch(url, { ...options, headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
};