import { Form, DatePicker, Button, Table, Tag, Segmented } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { handleGetHistory } from "services/HistoryApi";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const History = () => {
  const [scanRecords, setScanRecords] = useState([]);
  const [reservationRecords, setReservationRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataType, setDataType] = useState('reservation');
  const now = dayjs();

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
      const response = await handleGetHistory({
        startdate: startDate.toISOString(),
        enddate: endDate.toISOString(),
      });

      if (response.success) {
        setScanRecords(response.ScanHistory);
        setReservationRecords(response.ReservationHistory);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => dayjs(time).format("YYYY-MM-DD HH:mm");

  const reservationColumns = [
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
      title: "From",
      dataIndex: "StartTime",
      key: "startTime",
      ellipsis: false,
      width: 180,
      align: 'center',
      render: (time) =>
        (time!="-" ? formatTime(time) : <>-</>),
    },
    {
      title: "To",
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
      key: "deviceName",
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
  ]

  const scanColumns = [
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
      title: "From",
      dataIndex: "StartTime",
      key: "startTime",
      ellipsis: false,
      width: 180,
      align: 'center',
      render: (time) =>
        (time!="-" ? formatTime(time) : <>-</>),
    },
    {
      title: "To",
      dataIndex: "EndTime",
      key: "endTime",
      ellipsis: false,
      width: 180,
      align: 'center',
      render: (time) =>
        (time!="-" ? formatTime(time) : <>-</>),
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
        onFinish={handleFetchHistory}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
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
            <Segmented
              options={[
                { label: 'Reservations', value: 'reservation' },
                { label: 'Checkins', value: 'scan' },
              ]}
              value={dataType}
              onChange={setDataType}
              style={{marginBottom:25}}
            />
          </div>
          <Button type="primary">Export CSV</Button>
        </div>
      </Form>

      <Table
        columns={dataType === 'reservation' ? reservationColumns : scanColumns}
        dataSource={dataType === 'reservation' ? reservationRecords : scanRecords}
        rowKey="Id"
        scroll={{ x: 'max-content' }}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default History;