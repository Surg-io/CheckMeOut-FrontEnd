// src/components/ScheduleDisplay
// This component shows the schedule for the selected day

import React from 'react';
import { Table } from "antd";
import config from '../config/config';


const parseTimeToDecimal = (String) => {  // Converts "HH:mm" to decimal hours
    const [hours, minutes] = String.split(":").map(Number);
    return hours + minutes / 60;
}

const ScheduleDisplay = ({response, onSelect}) => {
    const { startTime, endTime } = config.timeRange;
    // Parse the start and end times
    const startDecimal = parseTimeToDecimal(startTime);
    const endDecimal = parseTimeToDecimal(endTime);

    // Generate columns dynamically based on the half-hour intervals
    const columns = Array.from(
        { length: (endDecimal - startDecimal) * 2 },
        (_, i) => {
            const timeDecimal = startDecimal + i * 0.5;
            const hour = Math.floor(timeDecimal);
            const timeLabel1 = `${hour.toString().padStart(2, "0")}:${timeDecimal % 1 === 0 ? "00" : "30"}`;
            const timeLabel2 = `${hour.toString().padStart(2, "0")}:${timeDecimal % 1 === 0 ? "30" : "00"}`;
            return {
                title: `${timeLabel1}\n-\n${timeLabel2}`,
                dataIndex: `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`,
                key: `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`,
                width: '00px'
            };
        }
    );
    columns.unshift({ // Insert an extra column of device to the head of the array
        title: "Device",
        dataIndex: "device",
        key: "device",
        fixed: 'left',
        width: '100px'
    });
        
    const dataSource = Array.from({ length: 30 }, (_, i) => {
        const row = { key: i };
        columns.forEach((col, j) => {
        row[col.dataIndex] = `R${i + 1}C${j + 1}`;
        });
        return row;
    });
    
    return (
        <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{
                x: 'max-content',
                y: '400px'
            }}
        />
    );
};

export default ScheduleDisplay;