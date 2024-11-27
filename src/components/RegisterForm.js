// src/components/RegisterForm.js
// This component is the register form for the autho page (excluding switch menu)
// TODO: Add verification. 
// TODO: Design password rules.
import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import config from '../config/config';

const RegisterForm = ({ onFinish }) => {
  const handleRegister = async (values) => {
    // Form submission logic
    try {
      console.log('Form values:', values);

      // Validate the "Major" field
      if (values.major === 'None') {
        alert('Make sure to choose a Major!');
        return;
      }

      // Send the form data to the backend
      const response = await fetch(`${config.apiBaseUrl}/registeruser`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(values),
      });

      // Handle the server response
      if (response.ok) {
        console.log('Registration successful:', await response.json());
      } else {
        console.error('Registration failed:', await response.json());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Form
      name="Register"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: '50vw',
        width: '50vw',
      }}
      onFinish={handleRegister} // Attach the handler to the onFinish event
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please enter your first name',
              },
            ]}>
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please enter your last name',
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="email"
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
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match!'));
            },
          }),
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
            <Input placeholder="Verification code" />
          </Form.Item>
        </Col>
        <Col span={5}></Col>
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
  );
};

export default RegisterForm;