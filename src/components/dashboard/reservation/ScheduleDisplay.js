import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import config from "@root/config/config";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const ScheduleDisplay = ({ response, pendingSlots, setPendingSlots }) => {
    const { startTime, endTime } = config.timeRange;

    const parseTimeToDecimal = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(Number);
        return hours + minutes / 60;
    };

    const startDecimal = parseTimeToDecimal(startTime);
    const endDecimal = parseTimeToDecimal(endTime);

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (response?.devices) {
            const initialDataSource = response.devices.map((device) => {
                const row = { key: device.deviceId, device: device.deviceName };

                for (let timeDecimal = startDecimal; timeDecimal < endDecimal; timeDecimal += 0.5) {
                    const hour = Math.floor(timeDecimal);
                    const dataIndex = `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`;
                    row[dataIndex] = "available";
                }

                device.timeWindows.forEach(({ startTime, endTime, status }) => {
                    const start = parseTimeToDecimal(startTime);
                    const end = parseTimeToDecimal(endTime);

                    for (let timeDecimal = start; timeDecimal < end; timeDecimal += 0.5) {
                        const hour = Math.floor(timeDecimal);
                        const dataIndex = `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`;
                        row[dataIndex] = status;
                    }
                });

                return row;
            });

            setDataSource(initialDataSource);
        }
    }, [response, startDecimal, endDecimal]);

    const columns = Array.from({ length: (endDecimal - startDecimal) * 2 }, (_, i) => {
        const timeDecimal = startDecimal + i * 0.5;
        const hour = Math.floor(timeDecimal);
        const timeLabel = `${hour.toString().padStart(2, "0")}:${timeDecimal % 1 === 0 ? "00" : "30"}`;
        const dataIndex = `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`;

        return {
            title: timeLabel,
            dataIndex: dataIndex,
            key: dataIndex,
            align: "center",
            width: "70px",
            onCell: (record) => {
                const status = record[dataIndex];
                const statusConfig = config.reservationStatus[status] || {};
                const bgColor = statusConfig.color || "#ffffff";

                return {
                    style: {
                        backgroundColor: bgColor,
                        color: "#fff",
                        textAlign: "center",
                        height: "70px",
                        width: "70px",
                        lineHeight: "70px",
                        borderRadius: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0px",
                        userSelect: "none",
                        cursor:
                            status === "available" && pendingSlots.length >= config.maxSlotsPicked
                                ? "not-allowed"
                                : status === "available" || status === "pending"
                                ? "pointer"
                                : "not-allowed",
                    },
                    onClick: () => {
                        if (status === "available" && pendingSlots.length < config.maxSlotsPicked) {
                            setDataSource(
                                dataSource.map((row) => {
                                    if (row.key === record.key) {
                                        return {
                                            ...row,
                                            [dataIndex]: "pending",
                                        };
                                    }
                                    return row;
                                })
                            );
                            setPendingSlots((prevSlots) => [
                                ...prevSlots,
                                {
                                    deviceId: record.key,
                                    device: record.device,
                                    time: dayjs(`${response.selectedDate}T${timeLabel}`).toDate(),
                                },
                            ]);
                        } else if (status === "pending") {
                            setDataSource(
                                dataSource.map((row) => {
                                    if (row.key === record.key) {
                                        return {
                                            ...row,
                                            [dataIndex]: "available",
                                        };
                                    }
                                    return row;
                                })
                            );
                            setPendingSlots((prevSlots) =>
                                prevSlots.filter(
                                    (slot) =>
                                        !(
                                            slot.deviceId === record.key &&
                                            slot.time.getTime() ===
                                                dayjs(`${response.selectedDate}T${timeLabel}`).toDate().getTime()
                                        )
                                )
                            );
                        }
                    },
                };
            },
            render: () => null,
        };
    });

    columns.unshift({
        title: "Device",
        dataIndex: "device",
        key: "device",
        fixed: "left",
        width: "120px",
        align: "center",
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
                x: "max-content",
                y: "400px",
            }}
        />
    );
};

export default ScheduleDisplay;
