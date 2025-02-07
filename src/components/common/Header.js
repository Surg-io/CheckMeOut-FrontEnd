// src/components/HeaderHome.js
// This component is a header that takes a children and contains it

import React from "react";
import { Layout } from "antd";
import "./Header.css";

const { Header: AntHeader } = Layout;

const Header = ({ children }) => (
  <AntHeader className="header">
    {children} {/**Add content into the header */}
  </AntHeader>
);

export default Header;
