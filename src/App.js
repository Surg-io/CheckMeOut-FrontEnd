// This is the main entry point of the application
// TODO: Add conditional branches for authentication
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@root/context/UserContext";
// Pages
import HomePage from "@root/pages/Home/HomePage";
import Auth from "@root/pages/Auth/Auth";
import Dashboard from "@root/pages/Dashboard/Dashboard";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { userId } = useUser(); // Access user authentication state
  return userId ? children : <Navigate to="/auth" replace />;
};

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect logged-in users to the dashboard if they try to access the home page */}
          <Route 
            path="/" 
            element={
              <HomePage />
            } 
          />

          {/* Auth page route */}
          <Route path="/auth" element={<Auth />} />

          {/* Dashboard route, only accessible if authenticated */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
