// src/pages/Auth/Auth.js
import React, { useState, useEffect } from 'react';
import { Menu, notification } from 'antd';
import { AuthLayout } from '@root/layouts';
import { LoginForm, RegisterForm } from '@root/components';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { handleRegistration, handleLogin } from '@root/services/Authentication';
import { useUser } from '@root/context/UserContext';
import './Auth.css';

const Context = React.createContext({ name: 'Default' });

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
  const [searchParams] = useSearchParams();
  const initialForm = searchParams.get('tab') || (location.state?.form === 'login' ? 'login' : 'signup');
  const [isLogin, setIsLogin] = useState(initialForm === 'login');
  const { login } = useUser();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'login' || tab === 'signup') {
      setIsLogin(tab === 'login');
    }
  }, [searchParams]);

  const handleMenuClick = (e) => {
    setIsLogin(e.key === "2");
  };

  const showNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: 'bottomLeft',
    });
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
        login(userData.token);
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
    <RegisterForm onFinish={handleRegistration} />
  );

  return (
    <>
      {contextHolder}
      <div id="auth">
        <AuthLayout menuComponent={menu} formComponent={children} />
      </div>
    </>
  );
};

export default Auth;