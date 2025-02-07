// src/components/Icon.js
// This component is the universal icon+website name, it can be scaled

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { blue, red } from '@ant-design/colors';
import './Icon.css';

const Icon = ({ size = 1, clickable = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate('/'); // Navigate to homepage if clickable
    }
  };

  return (
    <div
      className={`icon-container ${clickable ? 'clickable' : ''}`}
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: clickable ? 'pointer' : 'default', // Change cursor if clickable
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
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="logo-image" />
        </div>
        <div className="brand-name" style={{ marginLeft: '10px' }}>
          {/**Assign different colors*/}
          <span className="brand-maker" style={{ color: blue[5] }}>MC</span>
          <span className="brand-space" style={{ color: red[3] }}>MakerSpace</span>
        </div>
      </div>
    </div>
  );
};

export default Icon;
