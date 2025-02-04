// src/pages/HomePage.js
// This page is the homepage of the website, should only appear when not authed?

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@root/layouts';
import { HomeMenu } from '@root/components';
import { Flex, Button } from 'antd';
import { blue, gold } from '@ant-design/colors';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@root/context/UserContext';
import './HomePage.css'

const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const { token } = useUser();
  const navigate = useNavigate();

  // Update window dimensions on resize
  useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
          setWindowHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      
      // Cleanup listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoginClick = () => {
    navigate('/auth?tab=login', { state: { form: 'login' } });
  };

  const handleRegisterClick = () => {
    navigate('/auth?tab=signup', { state: { form: 'signup' } });
  };

  const handleReserveNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }
    const parsedToken = parseJwt(token);
    if (!parsedToken) {
      localStorage.removeItem('token');
      navigate('/auth');
      return;
    }
    const currentTime = Date.now() / 1000;
    if (parsedToken.exp < currentTime) {
      localStorage.removeItem('token');
      navigate('/auth');
    } else {
      navigate('/dashboard');
    }
  };

  const menuComponent = <HomeMenu onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick}/>;
  const content = (
    <div className="homepage-container"> {/**Separately contain background and main content */}
      <div className="blurred-background"></div>
      <div className='homepage-content'>
        <Flex className='flex' vertical gap='small'>
          {/**Slogan part */}
          <h1 className='Slogan_heading' style={{color:blue[6]}}>Dream,</h1>
          <h1 className='Slogan_heading' style={{color:blue[6]}}>Design,</h1>
          <h1 className='Slogan_heading' style={{color:blue[6]}}>Build.</h1>
          <h1 className='Slogan_heading' style={{color:gold[5]}}>— Your project</h1>
          <h1 className='Slogan_heading' style={{color:gold[5]}}>Starts Here.</h1>
          <Button
            type='primary'
            size='large'
            style={{
              fontFamily: 'Montserrat',
              fontSize: '24px',
              width: '9em',
              height: '70px',
              margin:'50px 0px 0px 0px'
            }}
            onClick={handleReserveNow}
            >
              Reserve Now
          </Button>
        </Flex>
      </div>;
    </div>
  );

  return (
    <MainLayout
      menuComponent={menuComponent}
      content={content}
    />);
};

export default HomePage;

