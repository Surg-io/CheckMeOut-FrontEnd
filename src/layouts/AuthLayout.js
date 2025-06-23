// src/layouts/MainLayout.js
// This layout is for the auth page, it takes a form (either login or sign up form)
import React from "react";
import { Flex, Layout } from "antd";
import Footer from "components/common/Footer";
import Icon from "components/common/Icon";

import "./AuthLayout.css";

const { Content } = Layout;

const AuthLayout = ({ menuComponent, formComponent }) => (
  <Layout className="auth-layout">
    <Content>
      <Flex className="auth-container">
        <Icon size={1.5} clickable={true} /> {/**Scale the Icon and name */}
        {menuComponent}
        {formComponent} {/**Render the form*/}
      </Flex>
    </Content>
    <Footer />
  </Layout>
);

export default AuthLayout;
