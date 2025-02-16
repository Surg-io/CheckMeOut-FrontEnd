// src/components/LoginForm.js
// This component is the login form for the autho page (excluding switch menu)
import React, { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Flex, Button, Form, Input, Checkbox } from "antd";
import { sanitizeEmail, sanitizePassword } from "utils/sanitizers";
import { handleLogin } from "services/Authentication";
import { login } from "utils/TokenUtils";
import { useNotification } from "context/NotificationContext";

const LoginForm = () => {
  const showNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const handleLoginWithNotification = async (values) => {
    setLoading(true);
    try {
      const response = await handleLogin(values);
      if (response.success) {
        showNotification(
          "success",
          "You have logged in successfully.",
          "Redirecting...",
          500,
          () => {
            login(response.token);
          },
        );
      } else {
        showNotification(
          "error",
          "Login Failed",
          "Please check your credentials and try again.",
          0,
          null,
        );
      }
    } catch (error) {
      console.log("Login error: " + error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Form
      name="login"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: "50vw",
        width: "50vw",
      }}
      onFinish={handleLoginWithNotification}
    >
      <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: "Please enter your email",
          },
        ]}
        normalize={(value) => sanitizeEmail(value)}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
        ]}
        normalize={(value) => sanitizePassword(value)}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="input password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
