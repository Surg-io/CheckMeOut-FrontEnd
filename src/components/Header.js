// src/components/HeaderHome.js
import React from 'react';
import { Layout } from 'antd';
import './Header.css'

const { Header: AntHeader } = Layout;

const Header= ({ children }) => (
  <AntHeader className='header'>
    {children}
  </AntHeader>
);

export default Header;
