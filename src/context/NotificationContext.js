import React, { createContext, useContext } from "react";
import { notification } from "antd";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    const showNotification = (type, message, description) => {
        api[type]({
            message,
            description,
            placement: "bottomLeft",
        });
    };

    return (
        <NotificationContext.Provider value={showNotification}>
            {contextHolder} {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
