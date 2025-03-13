// src/pages/HomePage.js
// This page is the homepage of the website, should only appear when not authed?

import React from "react";
import MainLayout from "layouts/MainLayout";
import HomeMenu from "components/home/HomeMenu";
import { Flex, Button } from "antd";
import { blue, red } from "@ant-design/colors";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleReserveNow = () => {
    navigate("/auth?tab=login", { state: { form: "login" } });
  };

  const content = (
    <div className="homepage-container">
      {" "}
      {/**Separately contain background and main content */}
      <div className="blurred-background"></div>
      <div className="homepage-content">
        <Flex className="flex" vertical gap="small">
          {/**Slogan part */}
          <h1 className="Slogan_heading" style={{ color: blue[5] }}>
            Dream,
          </h1>
          <h1 className="Slogan_heading" style={{ color: blue[5] }}>
            Design,
          </h1>
          <h1 className="Slogan_heading" style={{ color: blue[5] }}>
            Build.
          </h1>
          <h1 className="Slogan_heading" style={{ color: red[3] }}>
            — Your project
          </h1>
          <h1 className="Slogan_heading" style={{ color: red[3] }}>
            Starts Here.
          </h1>
          <Button
            type="primary"
            size="large"
            style={{
              fontFamily: "Montserrat",
              fontSize: "24px",
              width: "9em",
              height: "70px",
              margin: "50px 0px 0px 0px",
            }}
            onClick={handleReserveNow}
          >
            Reserve Now
          </Button>
        </Flex>
      </div>
    </div>
  );

  return <MainLayout menuComponent={<HomeMenu/>} content={content} />;
};

export default HomePage;
