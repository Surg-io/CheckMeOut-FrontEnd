import { Form, DatePicker, Button, Table, Tag, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { handleCancelReservation, handleGetHistory, handleGetUserReservation } from "services/HistoryApi";
import { useNotification } from "context/NotificationContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Ongoing = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const now = dayjs();
  const showNotification = useNotification();
  const navigate = useNavigate();

  const handleCancelReservationWithNotification = async (values) => {
    const payload = {
      recordId:values.ReservationID
    };
    try {
      const response = await handleCancelReservation(payload);
      if (response.success){
        showNotification(
          "success",
          "You have cancelled your reservation successfully.",
          "Reloading...",
          500,
          () => navigate(0),
        );
      } else {
        showNotification(
          "error",
          "Cancellation failed.",
          "Please try again.",
          0,
          null
        );
      }
    } catch (error) {
      console.log("Reservation cancellation error: " + error);
      throw error;
    }
  };

  const handleFetchReservation = async (values) => {
    if (loading) return;
    setLoading(true);
    try {
      let response = await handleGetUserReservation();
      if(response.success){
        setRecord(response.Reservations);
      }
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    return dayjs(time).format("YYYY-MM-DD HH:mm");
  };
  
  const currentColumns = [
    {
      title: "",
      dataIndex: "Id",
      key: "Id",
      ellipsis: false,
      width: 0,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: "Start",
      dataIndex: "StartTime",
      key: "startTime",
      ellipsis: false,
      width: 180,
      align: 'center',
      render: (time) =>
        (time!="-" ? formatTime(time) : <>-</>),
    },
    {
      title: "End",
      dataIndex: "EndTime",
      key: "endTime",
      ellipsis: false,
      width: 180,
      align: 'center',
      render: (time) =>
        (time!="-" ? formatTime(time) : <>-</>),
    },
    {
      title: "Reservation Device",
      dataIndex: "DeviceName",
      key: "reservationDevice",
      ellipsis: false,
      width: 180,
      align: 'center',
      render: (device) => device || "Not Specified",
    },
    {
      title: "Status",
      dataIndex: "ResStatus",
      key: "status",
      ellipsis: false,
      width: 90,
      align: 'center',
      render: (status) => {
        let color;
        switch (status) {
          case "Confirmed": 
            color="green";
            break;
          case "Pending": 
            color="blue";
            break;
          default: 
            color="red";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      ellipsis: false,
      width: 90,
      align: 'center',
      render: (_, record) => {
        const reservationEndTime = record.EndTime ? dayjs(record.EndTime) : null;
        const isCancelable = reservationEndTime && now.isBefore(reservationEndTime);
  
        return isCancelable ? (
          <Button 
            type="link" 
            danger 
            onClick={() => handleCancelReservationWithNotification(record)}
          >
            Cancel
          </Button>
        ) : (
          <Button 
            type="link" 
            danger
            disabled={true}
            onClick={() => handleCancelReservationWithNotification(record)}
          >
            Cancel
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    handleFetchReservation();
  }, []);

  return (
    <>
      <Table
        columns={currentColumns}
        dataSource={record}
        rowKey="Id"
        scroll={{
          x: "max-content",
          y: "max-content",
        }}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default Ongoing;
