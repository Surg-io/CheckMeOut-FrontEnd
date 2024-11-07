// src/pages/Auth/Auth.js
import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from '../../components/LoginForm';
const Auth = () => {
  const onFinishLogin = (values) => {
    console.log('Received values of form: ', values);
  };
  const children = <LoginForm onFinish = {onFinishLogin}/>;


  return (
    <div id="login">
      <AuthLayout children={children} key='1'>
      </AuthLayout>
    </div>
  );
};

export default Auth;
