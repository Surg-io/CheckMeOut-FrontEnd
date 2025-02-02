import Sider from "antd/es/layout/Sider";
import MainLayout from "@root/layouts/MainLayout";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './DashboardLayout.css';

const DashboardLayout = ({ menuComponent, siderComponent, content }) => {
    const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);

    const wrappedContent = (
        <Layout
            style={{
                minHeight: '100%',
                alignItems: 'stretch',
            }}
        >
            <Sider
                className="dashboard-sider"
                collapsed={isSiderCollapsed}
                collapsible
                trigger={null} // Disable default trigger
                onCollapse={(value) => setIsSiderCollapsed(value)}
                style={{
                    background: "#fff", 
                    minHeight: "100%", 
                    display: "flex", 
                    flexDirection: "column"
                }}
            >
                <div >
                    {siderComponent}
                    <div 
                        onClick={() => setIsSiderCollapsed(!isSiderCollapsed)}
                        style={{
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '12px 16px',
                            borderTop: '1px solid #e8e8e8',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            justifyContent: 'center'
                        }}
                    >
                        {isSiderCollapsed ? (
                        <RightOutlined />
                        ) : (
                        <>
                            <LeftOutlined />
                            <span></span>
                        </>
                        )}
                    </div>
                </div>
            </Sider>

            {/* Main content area */}
            <Content className="dashboard-content">
                {content}
            </Content>
        </Layout>
    );

    return (
        <MainLayout
        menuComponent={menuComponent}
        content={wrappedContent}
        />
    );
};

export default DashboardLayout;