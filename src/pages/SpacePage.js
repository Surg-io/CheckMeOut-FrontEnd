import React from "react";
import MainLayout from "layouts/MainLayout";
import HomeMenu from "components/home/HomeMenu";
import { Articles } from "components/common/ArticleDisplay";

const SpacePage = () => {

  const content = (
    <Articles category={"spaces"}/>
  );

  return <MainLayout menuComponent={<HomeMenu  defaultKey="1"/>} content={content} />;
};

export default SpacePage;
