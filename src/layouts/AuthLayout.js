// src/layouts/MainLayout.js
// This layout is for the auth page, it takes a form (either login or sign up form)
// TODO: Make the form appropriate size not stretching too long when width is large
import React from 'react';
import { Flex, Layout, Menu } from 'antd';
import Icon from '../components/Icon';
import Footer from '../components/Footer';
import './AuthLayout.css';

const { Content } = Layout;

const LoginLayout = ({menu, children}) => (
  <Layout className='layout'>
    <Content>
      <Flex className='container'>
        <Icon size={1.5} clickable={true}/>  {/**Scale the Icon and name */}
        {menu}
        {children} {/**Render the form passed as children */}
      </Flex>
    </Content>
    <Footer />
  </Layout>
);

export default LoginLayout;
