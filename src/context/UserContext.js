// src/context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState(() => {
        return localStorage.getItem('userId') || null;
    });
    const [userName, setUserName] = useState(() => {
        return localStorage.getItem('userName') || '';
    });
    useEffect(() => {
        if(userId){
            localStorage.setItem('userId', userId);
            localStorage.setItem('userName', userName);
        } else {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
        }
    },[userId,userName]);

    const login = (id, name) => {
        setUserId(id);
        setUserName(name);
    }

    const logout = () => {
        setUserId(null);
        setUserName('');
    }

    return (
        <UserContext.Provider value={{
            userId,
            userName,
            login,
            logout
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