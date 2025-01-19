// src/components/Footer.js
// This component is the universal footer for the website
// TODO: Change the footer, add links
import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => (
  <AntFooter style={{ textAlign: 'center' }}>
    MakerSpace ©{new Date().getFullYear()}
  </AntFooter>
);

export default Footer;
