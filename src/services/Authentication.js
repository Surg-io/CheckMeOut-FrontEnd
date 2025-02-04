// src/services/Authentication.js
import { apiClient } from '@root/utils/ApiUtils';

export const handleRegister = async (value) => {
    const payload = {
        LN: value.lastName,
        FN: value.firstName,
        Email: value.email,
        Password: value.password,
        Major: value.major,
        DOB: value.birthday,
    };

    try {
        const data = await apiClient.post('/register', payload);
        return data;
    } catch (error) {
        throw new Error(error.message || 'Registration failed');
    }
};

export const handleLogin = async (values) => {
    if (!values?.Email || !values?.password) {
        throw new Error('Email and password are required');
    }

    try {
        const data = await apiClient.post('/login', values);
        if (!data.success) {
            throw new Error(data.message || 'Login failed');
        }
        return data;
    } catch (error) {
        throw new Error(error.message || 'Login failed');
    }
};
