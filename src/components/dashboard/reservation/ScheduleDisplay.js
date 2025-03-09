import React, { useState, useEffect } from "react";
import { Table, Tooltip } from "antd";
import config from "config/config";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const ScheduleDisplay = ({ selectedDate, devices, response, pendingSlots, setPendingSlots }) => {
  
  if (!selectedDate) return <div>Loading...</div>;
  const { startDecimal, endDecimal } = config.timeRange;
  const parseTimeToDecimal = (timeString) => {
    const localTime = dayjs.utc(timeString).local();
    return localTime.hour() + localTime.minute() / 60;
  };

  const [dataSource, setDataSource] = useState([]);
  const fixedColumnWidth = 200;
  const dynamicColumnWidth = 70 * ((endDecimal - startDecimal) * 2);
  
  useEffect(() => {
    if (devices.length > 0 && response) {
      const initialDataSource = devices.map((device) => {
        const row = { key: device.DeviceID, device: device.DeviceName };

        for (
          let timeDecimal = startDecimal;
          timeDecimal < endDecimal;
          timeDecimal += 0.5
        ) {
          const hour = Math.floor(timeDecimal);
          const dataIndex = `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`;
          row[dataIndex] = "available";
        }

        const scheduleDevice = response?.devices?.find((d) => d.deviceId == device.DeviceID);
        if (scheduleDevice) {
          scheduleDevice.timeWindows.forEach(({ startTime, endTime,}) => {
            const start = parseTimeToDecimal(startTime);
            const end = parseTimeToDecimal(endTime);
            for (let timeDecimal = start; timeDecimal < end; timeDecimal += 0.5) {
              const hour = Math.floor(timeDecimal);
              const dataIndex = `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`;
              row[dataIndex] = "reserved";
            }
          });
        }

        return row;
      });

      setDataSource(initialDataSource);
    }
  }, [response, devices]);

  const parseDecimalToTime = (decimal) => {
    return dayjs.utc()
      .startOf('day')
      .add(decimal * 60, 'minute')
      .format('HH:mm');
  };

  const columns = Array.from(
    { length: (endDecimal - startDecimal) * 2 },
    (_, i) => {
      const timeDecimal = startDecimal + i * 0.5;
      const hour = Math.floor(timeDecimal);
      const dataIndex = `time${hour}${timeDecimal % 1 === 0 ? "00" : "30"}`;

      const startTimeStr = parseDecimalToTime(timeDecimal);
      const endTimeStr = parseDecimalToTime(timeDecimal + 0.5);

      return {
        title: (
          <div
            style={{
              fontSize: 12,
              lineHeight: "16px",
              textAlign: "center",
              whiteSpace: "normal",
            }}
          >
            {startTimeStr}
            <br />-<br />
            {endTimeStr}
          </div>
        ),
        dataIndex: dataIndex,
        key: dataIndex,
        align: "center",
        fixed: false,
        width: 70,
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
                status === "available" &&
                pendingSlots.length >= config.maxSlotsPicked
                  ? "not-allowed"
                  : status === "available" || status === "pending"
                    ? "pointer"
                    : "not-allowed",
            },
            onClick: () => {
              if (
                status === "available" &&
                pendingSlots.length < config.maxSlotsPicked
              ) {
                setDataSource(
                  dataSource.map((row) => {
                    if (row.key === record.key) {
                      return {
                        ...row,
                        [dataIndex]: "pending",
                      };
                    }
                    return row;
                  }),
                );
                setPendingSlots((prevSlots) => [
                  ...prevSlots,
                  {
                    deviceId: record.key,
                    deviceName: record.device,
                    time: dayjs(`${selectedDate.format('YYYY-MM-DD')}T${startTimeStr}`).utc().toDate()
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
                  }),
                );
                setPendingSlots((prevSlots) =>
                  prevSlots.filter(
                    (slot) =>
                      !(
                        slot.deviceId === record.key &&
                        slot.time.getTime() ===
                          dayjs(`${selectedDate.format('YYYY-MM-DD')}T${startTimeStr}`).utc().toDate()
                          .getTime()
                      ),
                  ),
                );
                console.log(pendingSlots)
              }
            },
          };
        },
        render: () => null,
      };
    },
  );

  columns.unshift({
    fixed: "left",
    title: (
      <span
        style={{
          fontSize: 12,
          textAlign: "center",
          display: "block",
          width: "100%",
        }}
      >
        Device
      </span>
    ),
    dataIndex: "device",
    key: "device",
    
    width: 200,
    align: "center",
    render: (text) => (
      <Tooltip title={text}>
        <span style={{
          display: "inline-block",
          maxWidth: 150,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>
          {text}
        </span>
      </Tooltip>
    )
  });

  return (
    <Table
      bordered
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{
        x: fixedColumnWidth + dynamicColumnWidth,
        y: 400
      }}
      components={{
        header: {
          cell: (props) => (
            <th
              {...props}
              style={{
                ...props.style,
                padding: "8px 0",
                backgroundColor: "#fafafa"
              }}
            />
          ),
        },
      }}
    />
  );
};

export default ScheduleDisplay;
