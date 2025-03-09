// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "layouts/DashboardLayout";
import DashboardSider from "components/dashboard/DashboardSider";
import DashboardMenu from "components/dashboard/DashboardMenu";
import CombinedReservationMaker from "components/dashboard/reservation/CombinedReservationMaker";
import History from "components/dashboard/History";
import { Management } from "components/dashboard/Management";
import { Card } from "antd";
import { Articles } from "components/common/ArticleDisplay";
import Recent from "components/dashboard/Recent";
import { Report } from "components/dashboard/Report";

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
      case "management":
        return (
          <div>
            <Management />
          </div>
        );
      case "reservation":
        return (
          <div>
            <CombinedReservationMaker />;
          </div>
        );
      case "recent":
        return (
          <div>
            <Recent />
          </div>
        );
      case "history":
        return (
          <div>
            <History />
          </div>
        );
      case "space":
        return (
          <div>
            <Articles category={"spaces"}/>
          </div>
        );
      case "equipment":
        return (
          <div>
            <Articles category={"equipments"}/>
          </div>
        );
      case "guides":
        return <Card />;
      case "courses":
        return <Card />;
      case "report":
        return <Report />;
      case "support":
        return <Articles category={"support"} renderBackButton={false}/>;
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
