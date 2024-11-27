// src/config/config.js

const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
    timeRange: { // Available time range
        startTime: "08:00",
        endTime: "19:30",
    },
};

export default config;