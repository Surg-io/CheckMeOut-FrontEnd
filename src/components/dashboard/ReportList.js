import React, { useEffect, useState } from "react";
import { List, Typography, Button, Spin, Divider } from "antd";
import { handleGetReport } from "services/ReportApi";
import { useNotification } from "context/NotificationContext";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const ReportList = () => {
  const showNotification = useNotification();
  const [reports, setReports] = useState([]); // State to store reports
  const [loading, setLoading] = useState(false); // Loading state
  const [expandedReports, setExpandedReports] = useState({}); // State to track expanded descriptions

  // Fetch reports from the API
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await handleGetReport(); // Call the API
        console.log(response)
        if (response.success) {
          setReports(response.reports); // Set the reports data
        } else {
          showNotification("error", "Failed to Fetch Reports", response.message);
        }
      } catch (error) {
        showNotification("error", "Error", "An error occurred while fetching reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);


  const toggleDescription = (reportId) => {
    setExpandedReports((prev) => ({
      ...prev,
      [reportId]: !prev[reportId], // Toggle the expanded state
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Spin spinning={loading}>
      <List
        pagination={10}
        bordered={false}
        dataSource={reports}
        renderItem={(report) => (
          <List.Item
            actions={[
              <span
                key="list-loadmore-more"
                onClick={() => toggleDescription(report.ReportID)}
                style={{ cursor: "pointer" }}
              >
                {expandedReports[report.ReportID] ? (
                  <UpOutlined/>
                ) : (
                  <DownOutlined/>
                )}
              </span>,
            ]}
          >
            <div style={{ width: "100%",position: "relative" }}>
              {/* Top-right corner: Time */}
              <Text
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "rgba(0, 0, 0, 0.45)",
                }}
              >
                {new Date(report.Time).toLocaleString()} {/* Format time */}
              </Text>

              {/* Main content: [Type] Date More */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Text strong>
                  {report.Type}
                </Text>
                {report.Description.length > 100 && ( // Show "More" button if description is long
                  <Button
                    type="link"
                    onClick={() => toggleDescription(report.ReportID)}
                    style={{ padding: 0 }}
                  >
                    {expandedReports[report.ReportID] ? "Less" : "More"}
                  </Button>
                )}
              </div>

              {/* Expanded description */}
              {expandedReports[report.ReportID] && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                      Report: {report.ReportID}
                    </Text>
                    <Text>
                      Device: {report.DeviceID}
                    </Text>
                  </div>
                  <div>
                    {report.Description}
                  </div>
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
      </Spin>
    </div>
  );
};