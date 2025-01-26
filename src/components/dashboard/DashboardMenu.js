import React, { useState } from 'react';
import { Badge, Modal, QRCode, Row, Button } from 'antd';
import { NotificationOutlined, QrcodeOutlined, SettingOutlined } from '@ant-design/icons';

const DashboardMenu = ({ hasNotification, screenWidth, screenHeight }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrtext] = useState('This QR code is for testing.');

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const modalSize = Math.min(screenWidth,screenHeight);
    return (
        <Row
            justify="end"
            style={{
                width: '100%',
                padding: '0 20px',
            }}
        >
            {/* Wrapper div for fixed gap */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span>
                    <SettingOutlined />
                </span>
                <span>
                    <Badge dot={hasNotification}>
                        <NotificationOutlined />
                    </Badge>
                </span>
                <span onClick={showModal} style={{ cursor: 'pointer' }}>
                    <QrcodeOutlined />
                </span>
                <Modal
                    title="QR Code"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="OK" onClick={handleOk}>OK</Button>
                    ]}
                    width={modalSize}
                    height={modalSize}
                >
                    <QRCode
                        value={qrtext}
                        size={modalSize-60}
                        errorLevel='Q'
                    />
                </Modal>
            </div>
        </Row>
    );
};

export default DashboardMenu;
