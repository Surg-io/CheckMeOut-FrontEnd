import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { DateOfBirthInput } from '@root/components';
import majors from '@root/config/majorList';
import {
  validatePasswordMatch,
  sanitizeEmail,
  sanitizeMajor,
  sanitizeVerificationCode,
  sanitizeName,
  sanitizePassword
} from '@root/utils/Sanitizers';
const { Option } = Select;


const RegisterForm = ({ onFinish }) => {
  const [dobState, setDobState] = useState({ isValid: true, errorMessage: '' });

  const validateDateOfBirth = (dob) => {
    const { month, day, year } = dob || {};
    if (!month || !day || !year) {
      return { isValid: false, errorMessage: 'Please complete your date of birth.' };
    }

    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const y = parseInt(year, 10);

    if (m < 1 || m > 12 || d < 1 || d > 31) {
      return { isValid: false, errorMessage: 'Invalid date of birth.' };
    }

    if (m === 2) {
      const isLeapYear = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      if (d > 29 || (d === 29 && !isLeapYear(y))) {
        return { isValid: false, errorMessage: 'Invalid date for February.' };
      }
    }

    if (['4', '6', '9', '11'].includes(String(m)) && d > 30) {
      return { isValid: false, errorMessage: 'Invalid date for this month.' };
    }

    return { isValid: true, errorMessage: '' };
  };

  const handleFinish = async (values) => {
    const dobValidation = validateDateOfBirth(values.birthday);
    setDobState(dobValidation);

    if (!dobValidation.isValid) {
      return; // Prevent form submission if DOB is invalid
    }

    // Proceed with form submission
    onFinish(values);
  };

  const handleDobChange = (dob) => {
    const dobValidation = validateDateOfBirth(dob);
    setDobState(dobValidation); // Update the error state dynamically
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
      onFinish={handleFinish}
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
            ]}
            normalize={(value) => sanitizeName(value)}
          >
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
            normalize={(value) => sanitizeName(value)}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="birthday"
        validateStatus={!dobState.isValid ? 'error' : ''}
        help={!dobState.isValid ? dobState.errorMessage : ''}
      >
        <DateOfBirthInput onChange={handleDobChange} />
      </Form.Item>
      <Form.Item
        name='major'
        rules={[{
          required: true,
          message: 'Please select your major'
        }]}
        normalize={(value) => sanitizeMajor(value,majors)}
      >
        <Select
          placeholder="Choose a major"
          allowClear
          showSearch
          optionFilterProp="children"
          
        >
          {majors.map((major, index) => (
            <Option key={index} value={major}>
              {major}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please enter your email',
          },
          {
            type: 'email',
            message: 'Please enter a valid email address',
          },
        ]}
        normalize={(value) => sanitizeEmail(value)}
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
          {
            min: 6,
            message: 'Password must be at least 6 characters',
          },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/,
            message: 'Password must include both letters and numbers',
          },
        ]}
        normalize={(value) => sanitizePassword(value)}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (validatePasswordMatch(
                getFieldValue('confirm'), 
                value
              )) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match!'));
            },
          }),
        ]}
        normalize={(value) => sanitizePassword(value)}
      >
        <Input type="password" placeholder="Confirm password" />
      </Form.Item>
      <Row>
        <Col span={18}>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Please check your email and enter verification code',
              },
            ]}
            normalize={(value) => sanitizeVerificationCode(value)}
          >
            <Input placeholder="Verification code" />
          </Form.Item>
        </Col>
        <Col span={1}></Col>
        <Col span={5}>
          <Button
            type="default"
            style={{
              width: '100%'
            }}
          >
            Get Code
          </Button>
        </Col>
      </Row>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
