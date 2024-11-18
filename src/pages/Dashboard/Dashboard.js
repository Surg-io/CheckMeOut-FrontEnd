// src/pages/Dashboard/Dashboard.js
// TODO: hasNotification
import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardSider from "../../components/DashboardSider";
import DashboardMenu from "../../components/DashboardMenu";
import { Card, Row, Col } from 'antd';
import Placeholder from "../../components/Placeholder"

const Dashboard = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [selectedKey, setSelectedKey] = useState(null);

    // Update window dimensions on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        
        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sider = <DashboardSider onSelectKey={setSelectedKey}/>;
    const dashboardMenu = <DashboardMenu hasNotification={true} screenWidth={windowWidth} screenHeight={windowHeight}/>;
    
    const renderContent = () => {
        switch (selectedKey) {
        case '1':
            return <Card />;
        case '2':
            return <div>Reservation</div>;
        case '3':
            return <div>History</div>;
        default:
            return <Placeholder/>;
        }
    };

    return <DashboardLayout
        menuComponent = {dashboardMenu}
        siderComponent = {sider}
        content = {renderContent()}
    />;
};

export default Dashboard;