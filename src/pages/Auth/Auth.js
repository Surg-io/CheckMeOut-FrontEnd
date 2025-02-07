// src/pages/Auth/Auth.js
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { AuthLayout } from '@root/layouts';
import { LoginForm, RegisterForm } from '@root/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleRegister, handleLogin } from '@root/services/Authentication';
import { useUser } from '@root/context/UserContext';
import { useNotification } from '@root/context/NotificationContext';
import './Auth.css';


const labels = ["Sign Up", "Login"];
const items = labels.map((label, index) => ({ 
  key: index + 1,
  label: label,
}));

const Auth = () => {
  const navigate = useNavigate();
  const showNotification = useNotification();

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { login } = useUser();
  const initialForm = searchParams.get('tab') || 'signup'; 
  const [isLogin, setIsLogin] = useState(initialForm === 'login');

  useEffect(() => {
    const tab = searchParams.get('tab');
    setIsLogin(tab === 'login');
  }, [searchParams]);

  const handleMenuClick = (e) => {
    setSearchParams({ tab: e.key === "2" ? 'login' : 'signup' });
  };

  const handleLoginWithNotification = async (values) => {
    setLoading(true);
    try {
      const userData = await handleLogin(values);
      showNotification(
        'success',
        'Login Successful',
        'You have logged in successfully. Redirecting...'
      );
    
      setTimeout(() => {
        login(userData.token, userData.expiresIn);
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      showNotification(
        'error',
        'Login Failed',
        error.message || 'Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterWithNotification = async (values) => {
    setLoading(true);
    try {
      const userData = await handleRegister(values);
      showNotification(
        'success',
        'Registration Successful',
        'You have signed up successfully. Redirecting...'
      );
    
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      showNotification(
        'error',
        'Registration Failed',
        error.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
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
    <LoginForm onFinish={handleLoginWithNotification} loading={loading} />
  ) : (
    <RegisterForm onFinish={handleRegisterWithNotification} />
  );

  return (
      <div id="auth">
        <AuthLayout menuComponent={menu} formComponent={children} />
      </div>
  );
};

export default Auth;