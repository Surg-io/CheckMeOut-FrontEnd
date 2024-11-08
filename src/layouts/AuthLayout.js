// src/layouts/MainLayout.js
// This layout is for the auth page, it takes a form (either login or sign up form)
// TODO: Make the form appropriate size not stretching too long when width is large
import React from 'react';
import { Flex, Layout, Menu } from 'antd';
import Icon from '../components/Icon';
import Footer from '../components/Footer';
import './AuthLayout.css';

const { Content } = Layout;

{/**Allow switching between login and sign up */}
const labels = ["Login", "Sign Up"];
const items = labels.map((label, index) => ({ 
  key: index + 1,
  label: label,
}));

const LoginLayout = ({children, key }) => (
  <Layout className='layout'>
    <Content>
      <Flex className='container'>
        <Icon size={1.8}/>  {/**Scale the Icon and name */}
        <Menu
          className='login-form'
          mode="horizontal"
          selectedKeys={[key]}
          items={items}
        />
        {children} {/**Render the form passed as children */}
      </Flex>
    </Content>
    <Footer />
  </Layout>
);

export default LoginLayout;
