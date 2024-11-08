// src/layouts/MainLayout.js
// This layout is a header-content-footer layout for common pages
// It takes a menuitem that is displayed in the right of the header
// It takes a children as content
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
      <Icon size={1} clickable={true}/>
      {menuItem} {/* Render the menuitem inside the page header*/}
    </Header>
    <Content>
      {children} {/* Render the content passed as children */}
    </Content>
    <Footer />
  </Layout>
);

export default MainLayout;
