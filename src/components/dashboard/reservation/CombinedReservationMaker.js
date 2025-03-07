import React, { useState, useEffect } from "react";
import LimitedDatePicker from "components/dashboard/reservation/LimitedDatePicker";
import ScheduleDisplay from "components/dashboard/reservation/ScheduleDisplay";
import {
  handleFetchSchedule,
  handleSubmitReservation,
} from "services/Reservation";
import dayjs from "dayjs";
import config from "config/config";
import { handleGetDevice } from "services/Device";
import { Radio, Space, Divider, Button, Row, Col, Skeleton } from "antd";
import ReactMarkdown from "react-markdown";
import { useNotification } from "context/NotificationContext";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
const CombinedReservationMaker = () => {
  const showNotification = useNotification();
  const [scheduleData, setScheduleData] = useState(null);
  const [purposeValue, setPurposeValue] = useState(null);
  const [pendingSlots, setPendingSlots] = useState([]);
  const [devices, setDevices] = useState([]);
  const [state, setState] = useState({
    items: [],
    selectedArticle: null,
    articleContent: "",
    loading: false,
    error: null
  });
  const manifestPath = "/manifest.json";
  const contentRoot = "/";
  const category = "reservation";
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const navigate = useNavigate();

  const markdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={materialLight}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    table: ({ node, ...props }) => (
      <div style={{ overflowX: "auto", margin: "16px 0" }}>
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)"
        }} {...props} />
      </div>
    ),
    th: ({ node, ...props }) => (
      <th style={{ 
        padding: "12px",
        backgroundColor: "#fafafa",
        border: "1px solid #e8e8e8",
        fontWeight: 600 
      }} {...props} />
    ),
    td: ({ node, ...props }) => (
      <td style={{ 
        padding: "12px",
        border: "1px solid #e8e8e8"
      }} {...props} />
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
          margin: "16px 0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      />
    )
  };

  useEffect(() => {
    setScheduleLoading(true);

    handleGetDevice()
      .then((response) => {
        if(response.success){
          setDevices(response.devices);
          return handleFetchSchedule(dayjs());
        }
      })
      .then((scheduleResponse) => {
        setScheduleData(scheduleResponse);
        setScheduleLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schedule or devices:", error);
        setScheduleLoading(false);
      });

      const loadData = async () => {
        try {
          setState(prev => ({ ...prev, loading: true }));
          
          const manifestRes = await fetch(manifestPath);
          if (!manifestRes.ok) throw new Error("Manifest load failed");
          
          const manifest = await manifestRes.json();
          const categoryItems = manifest[category] || [];
          
          if (categoryItems.length === 1) {
            const contentRes = await fetch(`${contentRoot}${categoryItems[0].index}`);
            const content = await contentRes.text();
            setState({
              items: categoryItems,
              selectedArticle: categoryItems[0],
              articleContent: content,
              loading: false,
              error: null
            });
          } else {
            setState({
              items: categoryItems,
              selectedArticle: null,
              articleContent: "",
              loading: false,
              error: null
            });
          }
        } catch (err) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: err.message
          }));
        }
      };
  
      loadData();
  }, []);

  useEffect(() => {
    if (!scheduleLoading) {
      const timer = setTimeout(() => setShowSkeleton(false), 200);
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
        if (response.success) {
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
        {state.loading ? (
          <Skeleton active paragraph={{ rows: 9 }} />
        ) : (
          <div style={{ visibility: state.loading ? "hidden" : "visible" }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {state.articleContent}
            </ReactMarkdown>
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
                devices={devices}
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
