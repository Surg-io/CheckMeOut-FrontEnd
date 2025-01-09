// src/layouts/MainLayout.js
// This layout is for the auth page, it takes a form (either login or sign up form)
// TODO: Make the form appropriate size not stretching too long when width is large
import React from 'react';
import { Flex, Layout} from 'antd';
import { Footer, Icon } from '@root/components';

import './AuthLayout.css';

const { Content } = Layout;

const LoginLayout = ({menuComponent, formComponent}) => (
  <Layout className='auth-layout'>
    <Content>
      <Flex className='auth-container'>
        <Icon size={1.5} clickable={true}/>  {/**Scale the Icon and name */}
        {menuComponent}
        {formComponent} {/**Render the form*/}
      </Flex>
    </Content>
    <Footer />
  </Layout>
);

export default LoginLayout;
