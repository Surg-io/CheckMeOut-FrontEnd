// src/pages/Auth/Auth.js
// This page is the auth page
// It can switch between login and sign up without redirecting
// It can verify form submission

import React, {useState} from 'react';
import { Menu } from 'antd';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';

{/**Allow switching between login and sign up */}
const labels = ["Login", "Sign Up"];
const items = labels.map((label, index) => ({ 
  key: index + 1,
  label: label,
}));

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onLogin = (values) => {
    console.log('Received login form: ', values);
  };
  const onRegister = (values) => {
    console.log('Received register form: ', values);
  };

  const handleMenuClick = (e) => {
    setIsLogin(e.key === "1"); // Set isLogin to true if "Login" is selected, false otherwise
  };

  const menu = <Menu
    className='login-form'
    mode="horizontal"
    items={items}
    onClick={handleMenuClick} // Add onClick to handle form switching
    selectedKeys={[isLogin ? "1" : "2"]} // Highlight selected menu item
  />

  const children = isLogin ? <LoginForm onFinish={onLogin} /> : <RegisterForm onFinish={onRegister} />;

  return (
    <div id="login">
      <AuthLayout menu={menu} children={children}>
      </AuthLayout>
    </div>
  );
};

export default Auth;
