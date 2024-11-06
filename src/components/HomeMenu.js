// src/components/HomeMenu.js
import React from 'react';
import { Menu, Button, Row, Col } from 'antd';

const labels = ["Space", "Equipment", "Contact", "FAQ"];
const items = labels.map((label, index) => ({
  key: index + 1,
  label: label,
}));
{/* TODO:Change the width of nav bar menu items, show all elements */}
const HomeMenu = () => (
  <Row align="middle" style={{ width: '100%', padding: '0 20px 0 20px' }}>
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
          <Button type="primary">Sign Up</Button>
        </Col>
        <Col style={{margin:'0 10px'}}>
          <Button type="default">Login</Button>
        </Col>
      </Row>
    </Col>
  </Row>
);


export default HomeMenu;
