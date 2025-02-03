// src/context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();
let isRefreshing = false;

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [expiresAt, setExpiresAt] = useState(() => 
        parseInt(localStorage.getItem('expiresAt'), 10) || null
    );

    const 
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                jwtDecode(storedToken);
                setToken(storedToken);
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <UserContext.Provider value={{
            token,
            login,
            logout,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};