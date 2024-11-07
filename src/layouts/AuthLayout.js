// src/layouts/MainLayout.js
import React from 'react';
import { Flex, Layout, Menu } from 'antd';
import Icon from '../components/Icon';
import Footer from '../components/Footer';
import './AuthLayout.css';

const { Content } = Layout;
const labels = ["Login", "Sign Up"];
const items = labels.map((label, index) => ({
  key: index + 1,
  label: label,
}));
const LoginLayout = ({children, key }) => (
  <Layout className='layout'>
    <Content>
      <Flex className='container'>
        <Icon size={1.8}/>
        <Menu
          className='login-form'
          mode="horizontal"
          selectedKeys={[key]}
          items={items}
        />
        {children} {/* Render the content passed as children */}
      </Flex>
    </Content>
    <Footer />
  </Layout>
);

export default LoginLayout;
