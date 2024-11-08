// src/pages/Auth/Auth.js
// This page is the auth page
// It can switch between login and sign up without redirecting
// It can verify form submission

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
