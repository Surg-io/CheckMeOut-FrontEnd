// src/components/HomeMenu.js
import React from 'react';
import { Menu, Button } from 'antd';
import { Space } from "antd";

const labels = ["Space", "Equipment", "Contact", "FAQ"];
const items = labels.map((label, index) => ({
  key: index + 1,
  label: label,
}));
{/* TODO:Change the width of nav bar menu items, show all elements */}
const HomeMenu = () => (
  <Space style={{
    flex: 1,
    justifyContent: 'flex-end',
    }}>
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      items={items}
      style={{
        alignItems: 'end',
        height: '40px',
        overflow: 'visible',
        flexGrow: 1,
      }}
    />
    <Space size='middle'>
      <Button type="primary">Sign Up</Button>
      <Button type="default">Login</Button>
    </Space>
  </Space>
);


export default HomeMenu;
