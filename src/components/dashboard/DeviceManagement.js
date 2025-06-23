import React, { useEffect, useState } from "react";
import { Card, Button, List, Typography, Drawer, Form, Input, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { handleGetDevice, handleCreateDevice } from "services/Device";
import { useNotification } from "context/NotificationContext";

const { Paragraph } = Typography;

export const DeviceManagement = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showNotification = useNotification();

  const fetchDevices = () => {
    handleGetDevice()
      .then((response) => {
        if(response.success){
          setData(response.devices);
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
    try {
      await handleCreateDevice(values);
      showNotification('success', 'Device Added Successfully', `${values.DeviceName} has been successfully added.`);
      form.resetFields();
      setOpen(false);
      fetchDevices();
    } catch (error) {
      showNotification('error', 'Device Add Failed', error.message);
    }
  };

  const cardContent = (text) => (
    <Paragraph
      ellipsis={{
        rows: 3,
        expandable: true,
        symbol: 'More',
      }}
      style={{
        margin: 0,
        minHeight: 72,
        overflow: 'hidden',
      }}
    >
      {text}
    </Paragraph>
  );

  return (
    <div style={{ padding: '0 24px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: 20
      }}>
        <Button 
          type='primary' 
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add Device
        </Button>
      </div>

      <List
        pagination={{
          pageSize: 4,
          position: 'bottom',
          align: 'center',
        }}
        grid={{
          gutter: 16,
          column: 2,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              title={item.DeviceName}
              extra={
                <span style={{ 
                  color: '#666',
                  fontSize: 12,
                  fontWeight: 400
                }}>
                  ID: {item.DeviceID}
                </span>
              }
              style={{
                minHeight: 100,
                height: '100%',
              }}
            >
              {cardContent(item.Description)}
            </Card>
          </List.Item>
        )}
      />

      <Drawer
        title="Add New Device"
        width={600}
        open={open}
        onClose={() => {
          form.resetFields();
          setOpen(false);
        }}
        maskClosable={false}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button 
              type="primary" 
              onClick={() => form.submit()}
              loading={form.isSubmitting}
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="deviceName"
            label="Device Name"
            rules={[
              { required: true, message: 'Device name is required.' },
              { max: 20, message: 'Device name up to 20 characters.' }
            ]}
          >
            <Input placeholder="Please enter device name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { max: 256, message: 'Description up to 256 characters.' }
            ]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Please enter description"
              showCount 
              maxLength={250}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};