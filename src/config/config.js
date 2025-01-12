// src/config/config.js

const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
    timeRange: { // Available time range
        startTime: "08:00",
        endTime: "19:30",
    },
    useMockData: true,
    mockURL: 'https://bf47d3a5-174c-41fa-99f8-bc4a823cecac.mock.pstmn.io',
    reservationStatus: {
        available: { label: 'available', color: '#52c41a' },
        reserved: { label: 'reserved', color: '#ff4d4f' },
        pending: { label: 'pending', color: '#1770ff' },
        outOfService: { label: 'oos', color: '#ffae17' },
        unknown: {label: 'unknown', color: '#8a8a8a'}
    },
};

export default config;