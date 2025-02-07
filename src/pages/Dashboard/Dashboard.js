// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@root/layouts";
import {
  DashboardSider,
  DashboardMenu,
  CombinedReservationMaker,
  History,
} from "@root/components";
import { Card } from "antd";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedKey, setSelectedKey] = useState(
    searchParams.get("tab") || "summary",
  );

  useEffect(() => {
    setSearchParams({ tab: selectedKey });
  }, [selectedKey, searchParams]);

  const sider = (
    <DashboardSider onSelectKey={setSelectedKey} selectedKey={selectedKey} />
  );
  const dashboardMenu = <DashboardMenu hasNotification={true} />;

  const renderContent = () => {
    switch (selectedKey) {
      case "summary":
        return <Card />;
      case "reservation":
        return <CombinedReservationMaker />;
      case "history":
        return <History />;
      case "space":
        return <Card />;
      case "equipment":
        return <Card />;
      case "guides":
        return <Card />;
      case "courses":
        return <Card />;
      case "teams":
        return <Card />;
      case "report":
        return <Card />;
      case "contact":
        return <Card />;
      default:
        return <Card />;
    }
  };

  return (
    <div>
      <DashboardLayout
        menuComponent={dashboardMenu}
        siderComponent={sider}
        content={renderContent()}
      />
    </div>
  );
};

export default Dashboard;
