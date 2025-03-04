import React from "react";
import { Menu, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { autoLogin } from "utils/TokenUtils";

const HomeMenu = ({ defaultKey = "1" }) => { // Default to "1" if no defaultKey is provided
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    autoLogin();
  };
  
  const handleRegisterClick = () => {
    navigate("/auth?tab=signup");
  };
  
  const handleSpace = () => {
    navigate("/space");
  };
  
  const handleEquipment = () => {
    navigate("/equipment");
  };
  
  const handleSupport = () => {
    navigate("/support");
  };

  const labels = ["Space", "Equipment", "Support"];

  const items = labels.map((label, index) => ({
    key: (index + 1).toString(), // Ensure key is a string
    label: label,
    onClick: () => {
      // Trigger the corresponding click handler based on the label
      if (label === "Space") {
        handleSpace();
      } else if (label === "Equipment") {
        handleEquipment();
      } else if (label === "Support") {
        handleSupport();
      }
    },
  }));
  
  return (
    <Row align="middle" style={{ width: "100%", padding: "0 20px 0 20px" }}>
      <Col flex="auto">
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[defaultKey]} // Use the defaultKey prop here
          items={items}
          style={{
            height: "60px",
            alignItems: "center",
            overflow: "visible",
            lineHeight: "60px",
          }}
        />
      </Col>
      <Col>
        <Row align="middle" style={{ width: "100%" }}>
          <Col style={{ margin: "0 10px" }}>
            <Button onClick={handleRegisterClick} type="primary">
              Sign Up
            </Button>
          </Col>
          <Col style={{ margin: "0 10px" }}>
            <Button onClick={handleLoginClick} type="default">
              Login
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HomeMenu;
