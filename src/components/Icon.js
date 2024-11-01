// src/components/Icon.js
import React from 'react';
import { blue, gold } from '@ant-design/colors';
import './Icon.css';

const Icon = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className="logo">
      <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="Logo" className="logo-image" />
    </div>
    <div className="brand-name" style={{ marginLeft: '10px' }}>
      <span className="brand-maker" style={{ color: blue[6] }}>Maker</span>
      <span className="brand-space" style={{ color: gold[5] }}>Space</span>
    </div>
  </div>
);

export default Icon;
