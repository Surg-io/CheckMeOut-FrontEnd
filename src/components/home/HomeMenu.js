// src/components/HomeMenu.js
// This component is the menu content for homepage, should be contained inside a header
// TODO: Adjust to very small width

import React from 'react';
import { Menu, Button, Row, Col } from 'antd';

const labels = ["Space", "Equipment", "Contact", "FAQ"]; {/**Allow viewing website before auth*/}
const items = labels.map((label, index) => ({
  key: index + 1,
  label: label,
}));

const HomeMenu = ({onLoginClick, onRegisterClick}) => (
  <Row align="middle" style={{ width: '100%', padding: '0 20px 0 20px' }}>   {/**Separates the subpage from auth buttons*/}
    <Col flex="auto">
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          height: '60px',
          alignItems: 'center',
          overflow: 'visible',
          lineHeight: '60px'
        }}
      />
    </Col>
    
    <Col>
      <Row align="middle" style={{ width: '100%'}}>
        <Col style={{margin:'0 10px'}}>
          <Button onClick={onRegisterClick} type="primary">Sign Up</Button>
        </Col>
        <Col style={{margin:'0 10px'}}>
          <Button onClick={onLoginClick} type="default">Login</Button>
        </Col>
      </Row>
    </Col>
  </Row>
);


export default HomeMenu;
