import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppBreadcrumb from "../components/AppBreadcrumb";

const { Content } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Content style={{ padding: "24px 32px", background: "#f5f5f5" }} >
        <AppBreadcrumb />
        <Outlet />
      </Content>
    </Layout>
  );
}
