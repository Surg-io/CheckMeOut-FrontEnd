const mockFetchScheduleResponse = {
    selectedDate: "2024-11-28",
    devices: [
    {
        deviceId: "deviceA",
        deviceName: "Device A",
        timeWindows: [
            { startTime: "09:00", endTime: "10:00", status: "reserved" },
            { startTime: "13:00", endTime: "14:30", status: "outOfService" },
            { startTime: "15:00", endTime: "15:30", status: "reserved" }
        ]
    },
    {
        deviceId: "deviceB",
        deviceName: "Device B",
        timeWindows: [
            { startTime: "08:00", endTime: "09:30", status: "reserved"  },
            { startTime: "15:00", endTime: "16:00", status: "pending"  }
        ]
    },
    {
        deviceId: "deviceC",
        deviceName: "Device C",
        timeWindows: []
    }
    ]
};

const mockSubmitReservationResponse = {
    "reservations": [
    {
        "deviceId": 1,
        "device": "Device A",
        "time": "2024-11-28T09:00:00.000Z",
        "status": "success"
    },
    {
        "deviceId": 1,
        "device": "Device A",
        "time": "2024-11-28T13:00:00.000Z",
        "status": "failed",
        "reason": "Time slot already reserved"
    },
    {
        "deviceId": 2,
        "device": "Device B",
        "time": "2024-11-28T15:00:00.000Z",
        "status": "success"
    }
    ],
    "message": "Reservation process completed."
}

export { mockFetchScheduleResponse, mockSubmitReservationResponse}