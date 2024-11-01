// src/pages/HomePage.js
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import HomeMenu from '../../components/HomeMenu';
import Placeholder from '../../components/Placeholder';

const HomePage = () => {
  const menuItem = <HomeMenu />;

  return (
    <MainLayout menuItems={[menuItem]}>
      <Placeholder />
    </MainLayout>
  );
};

export default HomePage;

