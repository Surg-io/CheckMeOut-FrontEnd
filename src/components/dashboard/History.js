import { Form, DatePicker, Button, Table, Tag, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { handleCancelReservation, handleGetHistory } from "services/HistoryApi";
import { useNotification } from "context/NotificationContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const History = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const now = dayjs();
  const showNotification = useNotification();
  const navigate = useNavigate();

  const handleCancelReservationWithNotification = async (values) => {
    const payload = {
      recordId:values.recordId
    };
    try {
      if (dayjs(values.reservationEndTime).isBefore(dayjs())) {
        throw new Error("Cannot cancel past reservation.")
      }
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

  const disabledDate = (current) => {
    return current > now.startOf("day") || current < now.subtract(3, "month").endOf("day");
  };

  const handleFetchHistory = async (values) => {
    if (loading) return;
    setLoading(true);
    let startDate = now.subtract(3, "month").startOf("day");
    let endDate = now.endOf("day");

    if (values?.dateRange) {
      const [start, end] = values.dateRange;
      if (start) startDate = start.startOf("day");
      if (end) endDate = end.endOf("day");
    }

    try {
      let data = await handleGetHistory({
        startdate: startDate.toISOString(),
        enddate: endDate.toISOString(),
      });

      const formattedData = data.map((item, index) => ({
        Id: index + 1,
        recordId: item.recordId,
        checkin: formatTime(item.checkin),
        checkout: item.checkout ? formatTime(item.checkout) : "-",
        reservationStartTime: item.reservationStartTime ? formatTime(item.reservationStartTime) : "-",
        reservationEndTime: item.reservationEndTime ? formatTime(item.reservationEndTime) : "-",
        reservationDevice: item.reservationDevice || "Not Specified",
        status: item.status,
      }));
      setRecord(formattedData);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    return dayjs(time).format("YYYY-MM-DD HH:mm");
  };

  const columns = [
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
      title: "Reservation Period",
      ellipsis: false,
      children: 
      [
        {
          title: "Start",
          dataIndex: "reservationStartTime",
          key: "startTime",
          ellipsis: false,
          width: 180,
          align: 'center',
          render: (time) =>
            (time!="-" ? formatTime(time) : <>-</>),
        },
        {
          title: "End",
          dataIndex: "reservationEndTime",
          key: "endTime",
          ellipsis: false,
          width: 180,
          align: 'center',
          render: (time) =>
            (time!="-" ? formatTime(time) : <>-</>),
        }
      ]
    },
    {
      title: "Reservation Device",
      dataIndex: "reservationDevice",
      key: "reservationDevice",
      ellipsis: false,
      width: 180,
      align: 'center',
      render: (device) => device || "Not Specified",
    },
    {
      title: "Check-in Time",
      dataIndex: "checkin",
      key: "checkin",
      ellipsis: false,
      width: 180,
      align: 'center',
      render: (time) =>
        (time!="-" ? formatTime(time) : <>-</>),
    },
    {
      title: "Check-out Time",
      dataIndex: "checkout",
      key: "checkout",
      ellipsis: false,
      width: 180,
      align: 'center',
      render: (time) =>
        (time!="-" ? formatTime(time) : <>-</>),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: false,
      width: 90,
      align: 'center',
      render: (status) => {
        let color;
        switch (status) {
          case "Checked Out": 
            color="blue";
            break;
          case "Not Checked Out": 
            color="red";
            break;
          case "Auto Checkout": 
            color="yellow";
            break;
          default: 
            color="blue";
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
        const reservationEndTime = record.reservationEndTime ? dayjs(record.reservationEndTime) : null;
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
    handleFetchHistory();
  }, []);

  return (
    <>
      <Form
        name="historyForm"
        initialValues={{ dateRange: null }}
        style={{ maxWidth: "100%" }}
        onFinish={handleFetchHistory}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent:"space-between",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent:"flex-start",
              gap: "8px",
            }}
          >
            <Form.Item name="dateRange">
              <RangePicker disabledDate={disabledDate} format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                loading={loading}
              />
            </Form.Item>
          </div>
          <Button
            type='primary'
          >Export as CSV</Button>
        </div>
      </Form>
      
      <Table
        columns={columns}
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

export default History;
