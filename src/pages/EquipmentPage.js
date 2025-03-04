import React from "react";
import MainLayout from "layouts/MainLayout";
import HomeMenu from "components/home/HomeMenu";
import { Articles } from "components/common/ArticleDisplay";

const EquipmentPage = () => {

  const content = (
    <Articles category={"equipments"}/>
  );

  return <MainLayout menuComponent={<HomeMenu defaultKey="2"/>} content={content} />;
};

export default EquipmentPage;
