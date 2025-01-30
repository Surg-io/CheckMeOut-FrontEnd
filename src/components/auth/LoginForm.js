// src/components/LoginForm.js
// This component is the login form for the autho page (excluding switch menu)
// TODO: Add verification. Change Login in button size.
import React, { useState } from 'react';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Flex, Button, Form, Input, Checkbox } from 'antd';
import { useUser } from '@root/context/UserContext';
import { sanitizeEmail, sanitizePassword } from '@root/utils/Sanitizers';
const LoginForm = ( {onFinish,} ) => {
  const { setUserId, setUserName } = useUser();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  const onFinishLoginSetContext = async (values) => {
    setLoading(true);
    setErrorMessage(null); // Clear any existing error message
    try {
      const userData = await onFinish(values); // Call the login API
      if (userData) {
        setUserId(userData.userId);
        setUserName(userData.userName);
      } else {
        setErrorMessage('Invalid email or password'); // Set error message
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
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
        maxWidth: '50vw',
        width: '50vw'
      }}
      onFinish={onFinishLoginSetContext}
    >
      <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please enter your email',
          },
        ]}
        normalize={(value) => sanitizeEmail(value)}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Email"
          />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your password',
          },
        ]}
        normalize={(value) => sanitizePassword(value)}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="input password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;