import React from 'react';
import { CalendarOutlined, DashboardOutlined, ExclamationCircleFilled, ExclamationCircleOutlined, FundViewOutlined, HistoryOutlined, PhoneOutlined, QuestionCircleOutlined, ReadOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import './DashboardSider.css'

const subMenuMarginLeft = 16;
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const DashboardSider = ({ onSelectKey }) => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const items = [
    {
      key: '1',
      label: 'Dashboard',
      icon: <DashboardOutlined className='icon'/>,
    },
    {
      key: '2',
      label:  'Reservation',
      icon: <CalendarOutlined className='icon'/>,
    },
    {
      key: '3',
      label:  'History',
      icon: <HistoryOutlined className='icon'/>,
    },
    {
      key: 'sub2',
      label: 'Status',
      icon: <FundViewOutlined className='icon'/>,
      children: [
        {
          key: '4',
          label:  <span style={{ marginLeft: subMenuMarginLeft }}>Space</span>,
        },
        {
          key: '5',
          label:  <span style={{ marginLeft: subMenuMarginLeft }}>Equipment</span>,
        },
      ],
    },
    {
      key: 'sub3',
      label: 'Resources',
      icon: <ReadOutlined className='icon'/>,
      children: [
        {
          key: '6',
          label:  <span style={{ marginLeft: subMenuMarginLeft }}>Guides</span>,
        },
        {
          key: '7',
          label:  <span style={{ marginLeft: subMenuMarginLeft }}>Courses</span>,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: '8',
      label: 'Teams',
      icon: <SmileOutlined className='icon'/>,
    },
    {
      key: '9',
      label: 'Report',
      icon: <ExclamationCircleOutlined className='icon'/>,
    },
    {
      key: '10',
      label: 'Contact',
      icon: <PhoneOutlined className='icon'/>,
    },
  ];

  const levelKeys = getLevelKeys(items);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{
        width: '100%',
        minHeight: '40px'
      }}
      items={items}
      onSelect={({ key }) => { if (onSelectKey) { onSelectKey(key); } }}
    />
  );
};
export default DashboardSider;