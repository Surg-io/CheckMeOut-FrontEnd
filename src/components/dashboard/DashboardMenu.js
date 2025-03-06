import React, { use, useState } from "react";
import { Badge, Modal, QRCode, Row, Button, Drawer } from "antd";
import {
  NotificationOutlined,
  QrcodeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useUser } from "context/UserContext";
import { useNavigate } from "react-router-dom";
import { handleQrcode } from "services/Qrcode";
import { useNotification } from "context/NotificationContext";
const DashboardMenu = ({ hasNotification }) => {
  const showNotification = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [qrcode, setQrcode] = useState("");
  const { logout } = useUser();
  const navigate = useNavigate();
  const handleFetchQrcode = async () => {
    try {
      const response = await handleQrcode();
      if (response.success) {
        setQrcode(response.qrcode[0].QRCode);
        showModal();
      }
      else {
        throw new Error("Failed to get QRcode, please try again.");
      }
    } catch (error) {
      console.log("Qrcode error: " + error);
      showNotification("error","Failed to get QRcode, please try again.");
      throw error;
    }
  }

  const showSettings = () => {
    setIsSettingOpen(true);
  };

  const closeSettings = () => {
    setIsSettingOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth?tab=login");
    closeSettings();
  };

  return (
    <Row
      justify="end"
      style={{
        width: "100%",
        padding: "0 20px",
      }}
    >
      {/* Wrapper div for fixed gap */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span>
          <SettingOutlined onClick={showSettings} />
        </span>
        <span>
          <Badge dot={hasNotification}>
            <NotificationOutlined />
          </Badge>
        </span>
        <span onClick={handleFetchQrcode} style={{ cursor: "pointer" }}>
          <QrcodeOutlined />
        </span>
        <Modal
          title="QR Code"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          centered
          width="auto"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCode
              size={320}
              value={qrcode || "ERROR"}
              status={!qrcode ? "loading" : "active"}
              errorLevel="Q"
            />
          </div>
        </Modal>
        <Drawer
          title="Settings"
          placement="right"
          onClose={closeSettings}
          open={isSettingOpen}
        >
          <Button
            type="primary"
            danger
            onClick={handleLogout}
            style={{
              width: "100%",
            }}
          >
            Log out
          </Button>
        </Drawer>
      </div>
    </Row>
  );
};

export default DashboardMenu;
