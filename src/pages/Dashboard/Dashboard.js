// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "layouts";
import {
  DashboardSider,
  DashboardMenu,
  CombinedReservationMaker,
  History,
} from "components";
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
        return (
          <div>
            <h1>Summary</h1>
            <Card />
          </div>
        );
      case "reservation":
        return (
          <div>
            <h1>Reservation</h1>
            <CombinedReservationMaker />;
          </div>
        );
      case "history":
        return (
          <div>
            <h1>History</h1>
            <History />
          </div>
        );
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
