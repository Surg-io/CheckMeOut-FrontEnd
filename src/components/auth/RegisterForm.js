import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select, Steps, DatePicker, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, BookOutlined } from "@ant-design/icons";
import majors from "config/majorList";
import { useNotification } from "context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { handleRegister, handleGetCode } from "services/Authentication";
import { sanitizeName } from "utils/sanitizers";

const { Step } = Steps;
const { Option } = Select;

const RegisterForm = () => {
  const navigate = useNavigate();
  const showNotification = useNotification();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  // Proceed to the next step
  const next = async () => {
    try {
      const values = await form.validateFields();
      setFormData((prev) => {
        const updatedFormData = { ...prev, ...values };
        return updatedFormData;
      });
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      message.error("Please complete all required fields.");
    }
  };

  // Go back to the previous step
  const prev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Submit registration data
  const handleRegisterWithNotification = async () => {
    setLoading(true);
    try {
      const major = form.getFieldValue("major");
      const updatedFormData = { ...formData, major };

      setFormData(updatedFormData);

      const response = await handleRegister(updatedFormData);
      if (response.success) {
        showNotification("success", "Registration Successful", "Redirecting to login page...",500,() => navigate("/auth?tab=login"));
        
      }
    } catch (error) {
      showNotification("error", "Registration Failed", error.message || "Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  

  const handleGetCodeWithVerification = async () => {
    if (cooldown > 0) return;
    
    try {
      const email = form.getFieldValue("email");
      await handleGetCode(email);
      showNotification("success", "Verification Code Sent", "Check your email.", 500, () => setCodeSent(true));
      let timeLeft = 60;
      setCooldown(timeLeft);
      const timer = setInterval(() => {
        timeLeft -= 1;
        setCooldown(timeLeft);
        if (timeLeft === 0) clearInterval(timer);
      }, 1000);
      
    } catch (error) {
      showNotification("error", "Error", "Failed to send verification code: " + (error.message || error));
    }
  };

  const steps = [
    {
      icon: <UserOutlined />,
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="firstName" 
                rules={[
                  { required: true, message: "Please enter your first name" },
                  { pattern: /^[A-Z][a-zA-Z]*$/, message: "First name must start with an uppercase letter" }
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
                  { required: true, message: "Please enter your last name" },
                  { pattern: /^[A-Z][a-zA-Z]*$/, message: "Last name must start with an uppercase letter" }
                ]}
                normalize={(value) => sanitizeName(value)}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>
          {/* Updated DatePicker for birthday input */}
          <Form.Item 
            name="dateOfBirth" 
            rules={[{ required: true, message: "Please select your date of birth" }]}
          >
            <DatePicker 
              style={{ width: "100%" }} 
              format="YYYY-MM-DD"
              placeholder="Select your birth date"
            />
          </Form.Item>
        </>
      ),
    },
    {
      icon: <MailOutlined />,
      content: (
        <>
          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Row gutter={8}>
            <Col span={18}>
              <Form.Item name="code" rules={[{ required: true, message: "Please enter the verification code" }]}>
                <Input placeholder="Verification Code" disabled={!codeSent}/>
              </Form.Item>
            </Col>
            <Col span={6}>
            <Button style={{ width: "100%" }} onClick={handleGetCodeWithVerification} disabled={cooldown > 0}>
              {cooldown > 0 ? `${cooldown}s` : "Get Code"}
            </Button>
            </Col>
          </Row>
        </>
      ),
    },
    {
      icon: <LockOutlined />,
      content: (
        <>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return value === getFieldValue("password")
                    ? Promise.resolve()
                    : Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input type="password" placeholder="Confirm Password" />
          </Form.Item>
        </>
      ),
    },
    {
      icon: <BookOutlined />,
      content: (
        <>
          <Form.Item name="major" rules={[{ required: true, message: "Please select your major" }]}>
            <Select placeholder="Choose a Major">
              {majors.map((major) => (
                <Option key={major.acronym} value={major.acronym}>
                  {major.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', padding: "20px" }}>
      {/* Progress Steps with Icons */}
      <Steps current={currentStep} size="default" style={{ width: '100%' }}>
        {steps.map((step, index) => (
          <Step key={index} icon={step.icon} />
        ))}
      </Steps>

      {/* Form */}
      <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
        {steps[currentStep].content}

        {/* Navigation Buttons */}
        <div style={{ marginTop: 20 }}>
          {currentStep > 0 && (
            <Button style={{ marginRight: 8 }} onClick={prev}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="primary" loading={loading} onClick={handleRegisterWithNotification}>
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
