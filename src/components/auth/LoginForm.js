// src/components/LoginForm.js
// This component is the login form for the autho page (excluding switch menu)
import React, { useState } from 'react';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Flex, Button, Form, Input, Checkbox } from 'antd';
import { sanitizeEmail, sanitizePassword } from '@root/utils/Sanitizers';

const LoginForm = ( {onFinish} ) => {
  const [loading, setLoading] = useState(false);
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
      onFinish={onFinish}
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
        <Button block type="primary" htmlType="submit" loading={loading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;