// src/layouts/MainLayout.js
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import Icon from '../components/Icon';
import HomeMenu from '../components/HomeMenu';
import Footer from '../components/Footer';
import './MainLayout.css';

const { Content } = Layout;

const MainLayout = () => (
  <Layout>
    <HeaderHome>
      <Icon />
      <HomeMenu />
    </HeaderHome>
    <Content style={{ padding: '50px', minHeight: '80vh' }}>
      <Outlet /> {/* Renders child components */}
    </Content>
    <Footer />
  </Layout>
);

export default MainLayout;