import React, { useState, useEffect } from "react";
import LimitedDatePicker from "components/dashboard/reservation/LimitedDatePicker";
import ScheduleDisplay from "components/dashboard/reservation/ScheduleDisplay";
import {
  handleFetchSchedule,
  handleSubmitReservation,
} from "services/Reservation";
import dayjs from "dayjs";
import config from "config/config";
import { Radio, Space, Divider, Button, Row, Col, Skeleton } from "antd";
import ReactMarkdown from "react-markdown";
import { useNotification } from "context/NotificationContext";
import { useNavigate } from "react-router-dom";

const CombinedReservationMaker = () => {
  const showNotification = useNotification();
  const [scheduleData, setScheduleData] = useState(null);
  const [purposeValue, setPurposeValue] = useState(null);
  const [pendingSlots, setPendingSlots] = useState([]);
  const [content, setContent] = useState("");
  const [contentLoading, setContentLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setContentLoading(true);
    setScheduleLoading(true);

    handleFetchSchedule(dayjs())
      .then((scheduleResponse) => {
        setScheduleData(scheduleResponse);
        setScheduleLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
        setScheduleLoading(false);
      });

    fetch("/docs/reservation.md")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch(() => setContent("Failed to load guidelines."))
      .finally(() => setContentLoading(false));
  }, []);

  useEffect(() => {
    if (!scheduleLoading) {
      const timer = setTimeout(() => setShowSkeleton(false), 200); // 延迟 200ms
      return () => clearTimeout(timer);
    }
  }, [scheduleLoading]);

  const onSelectPurpose = (item) => {
    setPurposeValue(item.target.value);
  };

  const handleDatePicked = async (date) => {
    try {
      const response = await handleFetchSchedule(date);
      setScheduleData(response);
      setPendingSlots([]);
    } catch (error) {
      console.error("Error fetching schedule for selected date:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setTimeout(async () => {
        const response = await handleSubmitReservation(pendingSlots);
        if (response.ErrorIndicies?.length === 0) {
          showNotification(
            "success",
            "All reservations were submitted successfully.",
            "Reloading...",
            500,
            () => navigate(0),
          );
        } else {
          showNotification(
            "error",
            "Some reservations failed.",
            "Please try again.",
          );
        }
      }, 50);
    } catch (error) {
      console.error("Error submitting reservation:", error);
      showNotification(
        "error",
        "An unexpected error occurred while submitting reservations.",
      );
    }
  };

  return (
    <>
      <div style={{ position: "relative", minHeight: "200px" }}>
        {contentLoading ? (
          <Skeleton active paragraph={{ rows: 9 }} />
        ) : (
          <div style={{ visibility: contentLoading ? "hidden" : "visible" }}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Row gutter={16} style={{ flex: 1, display: "flex" }}>
          <Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100%",
            }}
          >
            <Divider>Reservation Purpose</Divider>
            <Radio.Group onChange={onSelectPurpose} value={purposeValue}>
              <Space direction="vertical">
                <Radio value={1}>Group Project</Radio>
                <Radio value={2}>Personal Project</Radio>
                <Radio value={3}>Class Assignments</Radio>
                <Radio value={4}>Office Hours</Radio>
                <Radio value={5}>Other</Radio>
              </Space>
            </Radio.Group>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100%",
            }}
          >
            <Divider>Select Date</Divider>
            <LimitedDatePicker onDatePicked={handleDatePicked} />
          </Col>
        </Row>
      </div>
      <div>
        <Divider>Select Time</Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "10px 15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 10px 0px 0px",
            }}
          >
            <div
              style={{
                background: config.reservationStatus.available.color,
                height: "8px",
                width: "8px",
                margin: "0px 5px",
              }}
            />
            <>Available</>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 10px 0px 0px",
            }}
          >
            <div
              style={{
                background: config.reservationStatus.reserved.color,
                height: "8px",
                width: "8px",
                margin: "0px 5px",
              }}
            />
            <>Reserved</>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 10px 0px 0px",
            }}
          >
            <div
              style={{
                background: config.reservationStatus.outOfService.color,
                height: "8px",
                width: "8px",
                margin: "0px 5px",
              }}
            />
            <>Out Of Service</>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0px 10px 0px 0px",
            }}
          >
            <div
              style={{
                background: config.reservationStatus.pending.color,
                height: "8px",
                width: "8px",
                margin: "0px 5px",
              }}
            />
            <>Selected</>
          </div>
        </div>
        <div style={{ position: "relative", minHeight: "200px" }}>
          {showSkeleton ? (
            <Skeleton active paragraph={{ rows: 8 }} />
          ) : (
            <div style={{ visibility: showSkeleton ? "hidden" : "visible" }}>
              <ScheduleDisplay
                response={scheduleData}
                pendingSlots={pendingSlots}
                setPendingSlots={setPendingSlots}
              />
            </div>
          )}
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default CombinedReservationMaker;
