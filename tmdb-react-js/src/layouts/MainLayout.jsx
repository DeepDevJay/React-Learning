import { Layout } from "antd";

import AppHeader from "../components/AppHeader";
import AppBreadcrumb from "../components/AppBreadcrumb";

const { Content } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />

      <Content style={{ padding: "24px 40px", background: "#f5f5f5" }}>
        <AppBreadcrumb />
        {children}
      </Content>

    </Layout>
  );
}
