// src/layouts/MainLayout.js
import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import Icon from '../components/Icon';
import HomeMenu from '../components/HomeMenu';
import Footer from '../components/Footer';
import './MainLayout.css';

const { Content } = Layout;

const MainLayout = ({ menuItem, url, children }) => (
  <Layout>
    <Header>
      <Icon />
      <HomeMenu items={[menuItem]} /> {/* Pass single menuItem as an array */}
    </Header>
    <Content
      style={{
        padding: '50px',
        minHeight: '80vh',
        backgroundImage: url,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(10px)',
       }}>
      {children} {/* Render the content passed as children */}
    </Content>
    <Footer />
  </Layout>
);

export default MainLayout;
