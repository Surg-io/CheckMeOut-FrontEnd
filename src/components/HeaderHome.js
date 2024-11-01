// src/components/HeaderHome.js
import React from 'react';
import { Layout } from 'antd';

const { Header: AntHeader } = Layout;

const HeaderHome = ({ children }) => (
  <AntHeader
    style={{
      position: 'sticky',
      top: 0,
      zIndex: 1,
      height: '40px',
      lineHeight: '40px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '0 20px',
      borderBottom: 'none',
      boxShadow: 'none',
    }}
  >
    {children}
  </AntHeader>
);

export default HeaderHome;
