// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@root/App';
import reportWebVitals from '@root/reportWebVitals';
import '@root/index.css';
import { Buffer } from 'buffer';

const root = ReactDOM.createRoot(document.getElementById('root'));
global.Buffer = Buffer;
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
