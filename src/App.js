import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { UserProvider } from "context/UserContext";
import { NotificationProvider } from "context/NotificationContext";
import { AclProvider } from "context/AclContext";
import AppRoutes from "routes/AppRoutes";

const customTheme = {
  token: {
    fontFamily: "Montserrat, sans-serif",
    borderRadius: 8,
  },
};

const App = () => {
  return (
    <ConfigProvider theme={customTheme}>
      <UserProvider>
        <AclProvider>
          <BrowserRouter>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </BrowserRouter>
        </AclProvider>
      </UserProvider>
    </ConfigProvider>
  );
};

export default App;
