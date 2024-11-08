// src/components/RegisterForm.js
// This component is the register form for the autho page (excluding switch menu)
// TODO: Add verification. 
// TODO: Change Sign up button size.
// TODO: Design password rules.
import React from 'react';
import { Flex, Button, Form, Input, Row, Col} from 'antd';


const RegisterForm = ( onFinish ) => (
  <Form
    name="Register"
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
      <Input placeholder="Email" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please enter your password',
        },
      ]}
    >
      <Input type="password" placeholder="Password" />
    </Form.Item>
    <Form.Item
      name="confirmation"
      rules={[
        {
          required: true,
          message: 'Please confirm your password',
        },
      ]}
    >
      <Input type="password" placeholder="Confirm password" />
    </Form.Item>
    <Row>
      <Col span={14}>
        <Form.Item 
          name="code"
          rules={[
            {
              required: true,
              message: 'Please check your email and enter verification code',
            },
          ]}
        >
          <Input type="code" placeholder="Verification code"/>
        </Form.Item>
      </Col>
      <Col span={5}>
      </Col>
      <Col span={5}>
        <Button type="default">Get Code</Button>
      </Col>
    </Row>
    <Form.Item>
      <Button block type="primary" htmlType="submit">
        Sign Up
      </Button>
    </Form.Item>
  </Form>
)
export default RegisterForm;