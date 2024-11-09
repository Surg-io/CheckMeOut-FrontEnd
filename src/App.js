// This is the main entry point of the application
// TODO: Add conditional branches for authentication
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/HomePage";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";

// Mock authentication check (replace with real auth logic)
const isAuthenticated = true; // Replace with actual authentication logic

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect logged-in users to the dashboard if they try to access the home page */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />} 
        />

        {/* Auth page route */}
        <Route path="/auth" element={<Auth />} />

        {/* Dashboard route, only accessible if authenticated */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

