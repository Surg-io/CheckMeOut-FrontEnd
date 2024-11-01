// src/components/HomeMenu.js
import React from 'react';
import { Menu } from 'antd';
import { Button } from 'antd/es/radio';
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
        display: 'flex',
        alignItems: 'center',
        height: '40px',
        borderBottom: 'none',
      }}
    />
    <Button type="primary">Sign Up</Button>
    <Button type="default">Login</Button>
  </Space>
);


export default HomeMenu;
