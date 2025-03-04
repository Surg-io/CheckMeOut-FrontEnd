import React from "react";
import MainLayout from "layouts/MainLayout";
import HomeMenu from "components/home/HomeMenu";
import { Articles } from "components/common/ArticleDisplay";

const SupportPage = () => {

  const content = (
    <Articles category="support" renderBackButton={false}/>
  );

  return <MainLayout menuComponent={<HomeMenu defaultKey="3"/>} content={content} />;
};

export default SupportPage;
