// src/layouts/MainLayout.js
import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Footer from '../components/Footer';
import './MainLayout.css';

const { Content } = Layout;

const MainLayout = ({ menuItem,children }) => (
  <Layout>
    <Header>
      <Icon size={1}/>
      {menuItem} {/* Pass single menuItem as an array */}
    </Header>
    <Content>
      {children} {/* Render the content passed as children */}
    </Content>
    <Footer />
  </Layout>
);

export default MainLayout;
