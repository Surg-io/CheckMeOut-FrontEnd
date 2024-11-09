// src/pages/Auth/Auth.js
// This page is the auth page
// It can switch between login and sign up without redirecting
// It can verify form submission

import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import { useLocation } from 'react-router-dom';
import './Auth.css';

// Switch the order so "Sign Up" is first
const labels = ["Sign Up", "Login"];
const items = labels.map((label, index) => ({ 
  key: index + 1,
  label: label,
}));

const Auth = () => {
  const location = useLocation();

  // Set initial form based on navigation state or default to Sign Up
  const initialForm = location.state?.form === 'login' ? 'login' : 'signup';
  const [isLogin, setIsLogin] = useState(initialForm === 'login');

  const onLogin = (values) => {
    console.log('Received login form: ', values);
  };

  const onRegister = (values) => {
    console.log('Received register form: ', values);
  };

  const handleMenuClick = (e) => {
    setIsLogin(e.key === "2"); // Set isLogin to true if "Login" is selected, false otherwise
  };

  const menu = (
    <Menu
      className="login-form"
      mode="horizontal"
      items={items}
      onClick={handleMenuClick}
      selectedKeys={[isLogin ? "2" : "1"]} // Highlight the active menu item
    />
  );

  const children = isLogin ? <LoginForm onFinish={onLogin} /> : <RegisterForm onFinish={onRegister} />;

  return (
    <div id="auth">
      <AuthLayout menuComponent={menu} formComponent={children} />
    </div>
  );
};

export default Auth;
