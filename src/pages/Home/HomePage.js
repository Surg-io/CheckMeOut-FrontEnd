import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

//nav bar
const labels = ["Space", "Equipment", "Contact", "FAQ"];
const items = new Array(4).fill(null).map((_, index) => ({
  key: index + 1,
  label: labels[index % labels.length],
}));

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>

    </Layout>
  );
};
export default App;