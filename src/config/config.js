// src/config/config.js

const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
    timeRange: { // Available time range
        startTime: "08:00",
        endTime: "19:30",
    },
    useMockData: true,
    mockURL: 'https://6ee3a34f-3379-4e24-8bfb-8feb925e01da.mock.pstmn.io',
    reservationStatus: {
        available: { label: 'available', color: '#52c41a' },
        reserved: { label: 'reserved', color: '#ff4d4f' },
        pending: { label: 'pending', color: '#1770ff' },
        outOfService: { label: 'oos', color: '#ffae17' },
        unknown: {label: 'unknown', color: '#8a8a8a'}
    },
    maxSlotsPicked: 2,
};

export default config;