import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/Home/HomePage";

// Mock authentication check
const isAuthenticated = true; // Replace with actual authentication logic

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Define TemplatePage as the layout component */}
          <Route path="/" element={<MainLayout />}>
            {/* Use the index route to load HomePage by default */}
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
