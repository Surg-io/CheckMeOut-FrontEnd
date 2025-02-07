import React from "react";
import {
  CalendarOutlined,
  DashboardOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  FundViewOutlined,
  HistoryOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  SearchOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import "./DashboardSider.css";

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

const DashboardSider = ({ onSelectKey, selectedKey }) => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const items = [
    {
      key: "summary",
      label: "Summary",
      icon: <DashboardOutlined className="icon" />,
    },
    {
      key: "reservation",
      label: "Reservation",
      icon: <CalendarOutlined className="icon" />,
    },
    {
      key: "history",
      label: "History",
      icon: <HistoryOutlined className="icon" />,
    },
    {
      key: "status",
      label: "Status",
      icon: <FundViewOutlined className="icon" />,
      children: [
        {
          key: "space",
          label: <span style={{ marginLeft: subMenuMarginLeft }}>Space</span>,
        },
        {
          key: "equipment",
          label: (
            <span style={{ marginLeft: subMenuMarginLeft }}>Equipment</span>
          ),
        },
      ],
    },
    {
      key: "resources",
      label: "Resources",
      icon: <ReadOutlined className="icon" />,
      children: [
        {
          key: "guides",
          label: <span style={{ marginLeft: subMenuMarginLeft }}>Guides</span>,
        },
        {
          key: "courses",
          label: <span style={{ marginLeft: subMenuMarginLeft }}>Courses</span>,
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "teams",
      label: "Teams",
      icon: <SmileOutlined className="icon" />,
    },
    {
      key: "report",
      label: "Report",
      icon: <ExclamationCircleOutlined className="icon" />,
    },
    {
      key: "contact",
      label: "Contact",
      icon: <PhoneOutlined className="icon" />,
    },
  ];

  const levelKeys = getLevelKeys(items);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1,
    );
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
      selectedKeys={[selectedKey]}
      style={{
        width: "100%",
        minHeight: "40px",
        height: "100%",
      }}
      items={items}
      onSelect={({ key }) => {
        if (onSelectKey) {
          onSelectKey(key);
        }
      }}
    />
  );
};
export default DashboardSider;
