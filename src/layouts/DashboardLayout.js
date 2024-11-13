import Sider from "antd/es/layout/Sider";
import MainLayout from "./MainLayout";
import { Layout } from "antd";
import './DashboardLayout.css';

import { Content } from "antd/es/layout/layout";

const DashboardLayout = ({menuComponent, siderComponent, content}) => {
    const wrappedContent = (
        <Layout>
            <Sider className="dashboard-sider" width="25%">
                {siderComponent}
            </Sider>
            <Content className="dashboard-content">
                {content}
            </Content>
        </Layout>
    );
    
    return (
    <MainLayout
        menuComponent={menuComponent}
        content={wrappedContent}
    />);
};
export default DashboardLayout;