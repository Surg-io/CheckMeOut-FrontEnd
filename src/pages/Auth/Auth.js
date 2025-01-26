// src/pages/Auth/Auth.js
// This page is the auth page
// It can switch between login and sign up without redirecting
// It can verify form submission

import React, { useState, useEffect } from 'react';
import { Menu, notification } from 'antd';
import { AuthLayout } from '@root/layouts';
import { LoginForm, RegisterForm } from '@root/components';
import { useLocation } from 'react-router-dom';
import { handleRegistration, handleLogin } from '@root/services/Authentication'
import { useNavigate } from 'react-router-dom';
import './Auth.css';


const Context = React.createContext({
    name: 'Default',
});

// Switch the order so "Sign Up" is first
const labels = ["Sign Up", "Login"];
const items = labels.map((label, index) => ({ 
  key: index + 1,
  label: label,
}));

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const location = useLocation();
  const initialForm = location.state?.form === 'login' ? 'login' : 'signup';
  const [isLogin, setIsLogin] = useState(initialForm === 'login');

  const handleMenuClick = (e) => {
    setIsLogin(e.key === "2");
  };

  const openNotification = (status, description) => {
    api.info({
      message: `Authentication ${status}`,
      description: `${description}`,
      placement: 'bottomLeft',
    });
  };

  const handleLoginWithNotification = async (values) => {
    setLoading(true);
    const userData = await handleLogin(values);
    if (!userData) {
        openNotification('Failed', 'Please try again.');
    } else {
        openNotification('Success', 'You have logged in successfully. Redirecting...');
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    }
    setLoading(false);
    return userData;
  };

  const menu = (
    <Menu
      className="login-form"
      mode="horizontal"
      items={items}
      onClick={handleMenuClick}
      selectedKeys={[isLogin ? "2" : "1"]}
    />
  );

  const children = isLogin ? (
    <LoginForm onFinish={handleLoginWithNotification} />
  ) : (
    <RegisterForm onFinish={handleRegistration} />
  );

  return (
    <Context.Provider value={null}>
      {contextHolder}
      <div id="auth">
        <AuthLayout menuComponent={menu} formComponent={children} />
      </div>
    </Context.Provider>
  );
};

export default Auth;
