// @root/utils/ApiUtils.js
import axios from 'axios';
import config from '@root/config/config';
import { jwtDecode } from 'jwt-decode';

export const getUrl = () => {
    if (config.useMockData){
        return `${config.mockURL}`;
    } else {
        return `${config.apiBaseUrl}`;
    }
};

export const apiClient = axios.create({
    baseURL: config.useMockData ? config.mockURL : config.apiBaseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token && isTokenExpired(token)) {
        localStorage.removeItem('token');
        throw new axios.Cancel('Token expired');
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    response => response.data,
    error => {
        if (axios.isCancel(error)) {
        console.error('Request canceled:', error.message);
        return Promise.reject({ message: 'Session expired, please login again' });
        }
        
        const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Request failed';
        return Promise.reject({ message: errorMessage });
    }
);

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        return (decoded.exp < now) || (decoded.nbf > now);
    } catch (error) {
        return true;
    }
};

export const getApiClient = () => apiClient;