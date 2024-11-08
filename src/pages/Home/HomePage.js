// src/pages/HomePage.js
// This page is the homepage of the website, should only appear when not authed?
// TODO: Bcackground img streches as window stretches, weird
// TODO: What happens when an authed user access this page?
// TODO: Config is odd and unstable

import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import HomeMenu from '../../components/HomeMenu';
import { Flex, Button } from 'antd';
import { blue, gold } from '@ant-design/colors';
import './HomePage.css'

const HomePage = () => {
  const menuItem = <HomeMenu />;
  const children =
    <div className="container"> {/**Separately contain background and main content */}
      <div className="blurred-background"></div>
      <div className='content'>
        <Flex className='flex' vertical gap='small'>
          {/**Slogan part */}
          <h1 className='Slogan_heading' style={{color:blue[6]}}>Dream,</h1>
          <h1 className='Slogan_heading' style={{color:blue[6]}}>Design,</h1>
          <h1 className='Slogan_heading' style={{color:blue[6]}}>Build.</h1>
          <h1 className='Slogan_heading' style={{color:gold[5]}}>— Your project</h1>
          <h1 className='Slogan_heading' style={{color:gold[5]}}>Starts Here.</h1>
          <Button type='primary' size='large' style={{
            fontFamily: 'Montserrat',
            fontSize: '24px',
            width: '9em',
            height: '70px',
            margin:'50px 0px 0px 0px'
            }}>Reserve Now
          </Button>
        </Flex>
      </div>;
    </div>

  return (
    <MainLayout
      menuItem={menuItem}
      children={[children]}>
    </MainLayout>
  );
};

export default HomePage;

