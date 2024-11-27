export const mockReservationResponse = {
    selectedDate: "2024-11-28",
    devices: [
    {
        deviceId: "deviceA",
        deviceName: "Device A",
        reservedTimeWindows: [
        { startTime: "09:00", endTime: "10:00" },
        { startTime: "13:00", endTime: "14:30" }
        ]
    },
    {
        deviceId: "deviceB",
        deviceName: "Device B",
        reservedTimeWindows: [
        { startTime: "08:00", endTime: "09:30" },
        { startTime: "15:00", endTime: "16:00" }
    ]
    },
    {
        deviceId: "deviceC",
        deviceName: "Device C",
        reservedTimeWindows: []
    }
    ]
};