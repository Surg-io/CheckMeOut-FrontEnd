import React, { useState, useEffect } from 'react';
import { Table, Spin} from "antd";
import config from '@root/config/config';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const parseTimeToDecimal = (timeString) => {  // Converts "HH:mm" to decimal hours
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours + minutes / 60;
};

const ScheduleDisplay = ({ response }) => {
    const { startTime, endTime } = config.timeRange;

    // Parse the start and end times
    const startDecimal = parseTimeToDecimal(startTime);
    const endDecimal = parseTimeToDecimal(endTime);

    const [dataSource, setDataSource] = useState([]); // State variable to store table data

    // Update dataSource whenever response changes
    useEffect(() => {
        if (response?.devices) {
            const initialDataSource = response.devices.map((device) => {
                const row = { key: device.deviceId, device: device.deviceName };

                // Initialize each time slot as 'available'
                for (let timeDecimal = startDecimal; timeDecimal < endDecimal; timeDecimal += 0.5) {
                    const hour = Math.floor(timeDecimal);
                    const dataIndex = `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`;
                    row[dataIndex] = 'available';
                }

                // Update the time slots based on timeWindows
                device.timeWindows.forEach(({ startTime, endTime, status }) => {
                    const start = parseTimeToDecimal(startTime);
                    const end = parseTimeToDecimal(endTime);

                    for (let timeDecimal = start; timeDecimal < end; timeDecimal += 0.5) {
                        const hour = Math.floor(timeDecimal);
                        const dataIndex = `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`;
                        row[dataIndex] = status; // Assign the status directly
                    }
                });

                return row;
            });

            setDataSource(initialDataSource); // Update the state
        }
    }, [response, startDecimal, endDecimal]);

    // Generate columns dynamically based on the half-hour intervals
    const columns = Array.from(
        { length: (endDecimal - startDecimal) * 2 },
        (_, i) => {
            const timeDecimal = startDecimal + i * 0.5;
            const hour = Math.floor(timeDecimal);
            const timeLabel = `${hour.toString().padStart(2, "0")}:${timeDecimal % 1 === 0 ? "00" : "30"}`;
            const dataIndex = `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`;

            return {
                title: timeLabel,
                dataIndex: dataIndex,
                key: dataIndex,
                align: 'center',
                width: '70px',
                onCell: (record) => { // Change cell content
                    const status = record[dataIndex];
                    const statusConfig = config.reservationStatus[status] || {};
                    const bgColor = statusConfig.color || '#ffffff'; // Default white color
                    return {
                        style: {
                            backgroundColor: bgColor,
                            color: '#fff',
                            textAlign: 'center',
                            height: '70px',
                            width: '70px',
                            lineHeight: '70px',
                            borderRadius: '10px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0px',
                            cursor: status === 'available' || status === 'pending' ? 'pointer' : 'not-allowed',
                        },
                        onClick: () => {
                            if (status === 'available') {
                                // Mark as pending
                                const updatedData = dataSource.map((row) => {
                                    if (row.key === record.key) {
                                        return {
                                            ...row,
                                            [dataIndex]: 'pending',
                                        };
                                    }
                                    return row;
                                });
                                setDataSource(updatedData);
                                const clickedTime = dayjs(`${response.selectedDate}T${timeLabel}`);
                            } else if (status === 'pending') {
                                // Cancel selection (mark as available)
                                const updatedData = dataSource.map((row) => {
                                    if (row.key === record.key) {
                                        return {
                                            ...row,
                                            [dataIndex]: 'available',
                                        };
                                    }
                                    return row;
                                });
                                setDataSource(updatedData);
                                const clickedTime = dayjs(`${response.selectedDate}T${timeLabel}`);
                            }
                            // Do nothing for other statuses
                        },
                    };
                },
                render: () => null, // No text in cell
            };
        }
    );

    // Add an extra column for the device names
    columns.unshift({
        title: "Device",
        dataIndex: "device",
        key: "device",
        fixed: 'left',
        width: '120px',
        align: 'center',
    });

    if (!response || !response.devices) {
        return <Spin indicator={<LoadingOutlined spin />} size="large" />;
    }

    return (
        <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{
                x: 'max-content',
                y: '400px',
            }}
        />
    );
};

export default ScheduleDisplay;
