// src/pages/HomePage.js
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import HomeMenu from '../../components/HomeMenu';
import { Flex, Button } from 'antd';
import { blue, gold } from '@ant-design/colors';
import './HomePage.css'
{/**TODO: Bcackground img streches as window stretches, weird */}
const HomePage = () => {
  const menuItem = <HomeMenu />;
  const children =
    <div className="background-container">
      <div className="blurred-background"></div>
      <div className='content'>
        <Flex vertical gap='small' style={{
          width: '50%',
          margin: '100px 250px'
        }}>
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
    <div id="homepage">
      <MainLayout menuItems={[menuItem]} url={'url("/images/people-repairing-computer-chips.jpg")'} children={[children]}>
      </MainLayout>
    </div>
  );
};

export default HomePage;

