// src/pages/Dashboard/Dashboard.js
// TODO: hasNotification
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from "@root/layouts";
import { DashboardSider, DashboardMenu, CombinedReservationMaker, History } from '@root/components';
import { Card } from 'antd';

const Dashboard = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedKey, setSelectedKey] = useState(searchParams.get('tab') || 'summary');
    
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

    useEffect(() => {
        setSearchParams({tab: selectedKey});
    },[selectedKey,searchParams]);


    const sider = <DashboardSider onSelectKey={setSelectedKey} selectedKey={selectedKey}/>;
    const dashboardMenu = <DashboardMenu hasNotification={true} screenWidth={windowWidth} screenHeight={windowHeight}/>;
    
    const renderContent = () => {
        switch (selectedKey) {
        case 'summary':
            return <Card />;
        case 'reservation':
            return <CombinedReservationMaker />;
        case 'history':
            return <History />;
        case 'space':
            return <Card />;
        case 'equipment':
            return <Card />;
        case 'guides':
            return <Card />;
        case 'courses':
            return <Card />;
        case 'teams':
            return <Card />;
        case 'report':
            return <Card />;
        case 'contact':
            return <Card />;
        default:
            return <Card />;
        }
    };

    return <DashboardLayout
        menuComponent = {dashboardMenu}
        siderComponent = {sider}
        content = {renderContent()}
    />;
};

export default Dashboard;