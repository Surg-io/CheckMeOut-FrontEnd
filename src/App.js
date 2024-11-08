// This is the main entry point of the application
// TODO: Add conditional branches
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/Home/HomePage";
import Auth from "./pages/Auth/Auth";

// Mock authentication check
const isAuthenticated = true; // Replace with actual authentication logic


const App = () => {
  return (
    <Auth/>
  );
};

export default App;
