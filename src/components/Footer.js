// src/components/Footer.js
import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;
{/*TODO: Change the footer */}
const Footer = () => (
  <AntFooter style={{ textAlign: 'center' }}>
    MakerSpace ©{new Date().getFullYear()}
  </AntFooter>
);

export default Footer;
