// src/config/config.js

const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
  timeRange: {
    // Available time range
    startDecimal: 8,
    endDecimal: 20,
  },
  useMockData: true,
  mockURL: "https://6ee3a34f-3379-4e24-8bfb-8feb925e01da.mock.pstmn.io",
  reservationStatus: {
    available: { label: "available", color: "#92FFA5" },
    reserved: { label: "reserved", color: "#FF929D" },
    pending: { label: "pending", color: "#92BBFF" },
    outOfService: { label: "oos", color: "#FFD492" },
    expired: { label: "expired", color: "#E1E1E1" },
  },
  maxSlotsPicked: 2,
};

export default config;
