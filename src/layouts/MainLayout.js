// src/layouts/MainLayout.js
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const MainLayout = () => (
  <Layout>
    <Header></Header>
    <Content style={{ padding: '50px', minHeight: '80vh' }}>
      <Outlet /> {/* Renders child components */}
    </Content>
    <Footer style={{ textAlign: 'center' }}>Footer ©2024</Footer>
  </Layout>
);

export default MainLayout;