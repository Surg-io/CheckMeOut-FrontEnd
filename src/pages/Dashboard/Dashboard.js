// src/pages/Dashboard/Dashboard.js
// TODO: hasNotification
import React, { useState, useEffect } from 'react';
import PlaceHolder from "../../components/Placeholder"
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardSider from "../../components/DashboardSider";
import DashboardMenu from "../../components/DashboardMenu";

const Dashboard = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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

    const sider = <DashboardSider/>;
    const dashboardMenu = <DashboardMenu hasNotification={true} screenWidth={windowWidth} screenHeight={windowHeight}/>;
    const dashboardContent = <PlaceHolder/>;
    return <DashboardLayout
        menuComponent = {dashboardMenu}
        siderComponent = {sider}
        content = {dashboardContent}
    />;
};

export default Dashboard;