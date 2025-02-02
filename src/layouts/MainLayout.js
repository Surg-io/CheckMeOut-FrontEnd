// src/layouts/MainLayout.js
// This layout is a header-content-footer layout for common pages
// It takes a menuitem that is displayed in the right of the header
// It takes a children as content
import React from 'react';
import { Layout } from 'antd';
import { Footer, Header, Icon } from '@root/components';

const { Content } = Layout;

const MainLayout = ({ menuComponent, content}) => (
  <Layout style={{height: '100%'}}>
    <Header>
      <Icon size={1} clickable={true}/>
      {menuComponent} {/* Render the menuitem inside the page header*/}
    </Header>
    <Content>
      {content} {/* Render the content passed as children */}
    </Content>
    <Footer />
  </Layout>
);

export default MainLayout;
