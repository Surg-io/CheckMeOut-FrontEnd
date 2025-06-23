// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import reportWebVitals from "reportWebVitals";
import { Buffer } from "buffer";

if (process.env.NODE_ENV === 'development'){
  require('mock/mockServer');
  console.log('Mock server is running...');
}


const root = ReactDOM.createRoot(document.getElementById("root"));
global.Buffer = Buffer;
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
