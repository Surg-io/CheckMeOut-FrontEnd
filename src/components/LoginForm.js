//src/components/LoginForm.js
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Flex, Button, Form, Input, Checkbox } from 'antd';

const LoginForm = ( onFinish ) => (
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
    >
      <Input prefix={<UserOutlined />} placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please enter your password!',
        },
      ]}
    >
      <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
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
      or <a href="">Sign Up!</a>
    </Form.Item>
  </Form>
)
export default LoginForm;