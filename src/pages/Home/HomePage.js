// src/pages/HomePage.js
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import HomeMenu from '../../components/HomeMenu';
import Placeholder from '../../components/Placeholder';

const HomePage = () => {
  const menuItem = <HomeMenu />;
  const children = <
  return (
    <div id="homepage">
      <MainLayout menuItems={[menuItem]} url={'url("/images/people-repairing-computer-chips.jpg")'} children={Placeholder}>
      </MainLayout>
    </div>
  );
};

export default HomePage;

