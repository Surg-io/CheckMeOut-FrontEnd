// src/components/Icon.js
// This component is the universal icon+website name, it can be scaled
// TODO: Add link to main page, and an attribute to determine if it's clickable

import React from 'react';
import { blue, gold } from '@ant-design/colors';
import './Icon.css';


const Icon = ({ size = 1 }) => (
  <div
    className="icon-container"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // Adjustable width and height
      width: `${size * 160}px`, 
      height: `${size * 60}px`,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        transform: `scale(${size})`,
        transformOrigin: 'center', // Keeps scaling centered
      }}
    >
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="Logo" className="logo-image" />
      </div>
      <div className="brand-name" style={{ marginLeft: '10px' }}>
        {/**Assign different colors*/}
        <span className="brand-maker" style={{ color: blue[6] }}>Maker</span>
        <span className="brand-space" style={{ color: gold[5] }}>Space</span>
      </div>
    </div>
  </div>
);

export default Icon;
