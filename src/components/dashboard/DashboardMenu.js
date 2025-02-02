import React, { useState } from 'react';
import { Badge, Modal, QRCode, Row, Button, Drawer } from 'antd';
import { NotificationOutlined, QrcodeOutlined, SettingOutlined } from '@ant-design/icons';
import { useUser} from '@root/context/UserContext'
import { useNavigate } from 'react-router-dom';
const DashboardMenu = ({
    hasNotification,
    screenWidth,
    screenHeight
    }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [qrtext] = useState('This QR code is for testing.');
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const {logout} = useUser();
    const navigate = useNavigate();

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

    const handlleLogout = () => {
        logout();
        navigate('/auth');
        closeSettings();
    }

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
                    <SettingOutlined
                        onClick={showSettings}
                    />
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
                <Drawer
                    title='Settings'
                    placement='right'
                    onClose={closeSettings}
                    open={isSettingOpen}
                >
                    <Button
                        type='primary'
                        danger
                        onClick={handlleLogout}
                        style={{
                            width:'100%'
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
