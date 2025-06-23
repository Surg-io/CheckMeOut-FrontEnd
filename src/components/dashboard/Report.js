import React, { useState, useEffect } from "react";
import { Form, Select, Input, Button, DatePicker, message } from "antd";
import { handleGetDevice } from "services/Device";
import { handleSubmitReport } from "services/ReportApi";
import { useNotification } from "context/NotificationContext";
import { Cascader } from "antd";
import dayjs from "dayjs";
const { Option } = Select;

export const Report = () => {
  const [form] = Form.useForm();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const showNotification = useNotification();
  const fetchDevices = () => {
      handleGetDevice()
        .then((response) => {
          if(response.success){
            setDevices(response.devices);
          } else {
            throw new Error();
          }
        })
        .catch((error) => {
          showNotification('error', 'Failed to Load Device List', error.message);
        });
    };
  
    useEffect(() => {
      fetchDevices();
    }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        type: values.type.join(" - "),
        time: values.time,
        deviceId: values.deviceID,
        deviceName: devices.find((device) => device.DeviceID === values.deviceID)?.DeviceName,
        description: values.description,
      };

      const response = await handleSubmitReport(payload);
      if (response.success) {
        showNotification("success","Success","Report submitted successfully!",1500,null)
        form.resetFields();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      showNotification("error", "Report Submission Failed", error.message || "Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const reportTypes = [
    {
      value: "equipment",
      label: "Equipment Issues",
      children: [
        {
          value: "Damage",
          label: "Equipment Damage or Malfunction",
        },
        {
          value: "Software",
          label: "Software Issues",
        },
        {
          value: "Material Shortage",
          label: "Material Shortages",
        },
      ],
    },
    {
      value: "Cleanliness",
      label: "Cleanliness Issues",
      children: [
        {
          value: "Dirty Equipment",
          label: "Dirty Equipment",
        },
        {
          value: "Dirty Workspace",
          label: "Dirty Workspace",
        },
      ],
    },
    {
      value: "Safety",
      label: "Safety Concerns",
      children: [
        {
          value: "Equipment Hazard",
          label: "Equipment Safety Hazard",
        },
        {
          value: "Workspace Hazard",
          label: "Workspace Safety Hazard",
        },
        {
          value: "User Behavior",
          label: "Unsafe User Behavior",
        },
      ],
    },
    {
      value: "Policy Violations",
      label: "User Policy Violations",
      children: [
        {
          value: "Unauthorized Use",
          label: "Unauthorized Use",
        },
        {
          value: "Safety Gear",
          label: "Failure to Wear Safety Gear",
        },
      ],
    },
    {
      value: "Other",
      label: "Other Issues",
    },
  ];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Report an Issue</h1>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: "Please select a report type" }]}
        >
          <Cascader
            options={reportTypes}
            placeholder="Select a report type"
            showSearch={{
              filter: (inputValue, path) =>
                path.some(
                  (option) =>
                    option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
                ),
            }}
          />
        </Form.Item>

        <Form.Item
          name="deviceID"
          label="Device"
          rules={[{ required: true, message: "Please select a device" }]}
        >
          <Select placeholder="Select a device">
            <Option>-</Option>
            {devices.map((device) => (
              <Option key={device.DeviceID} value={device.DeviceID}>
                {device.DeviceName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true, message: "Please select a time" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={4} placeholder="Describe the issue" maxLength={250}/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};