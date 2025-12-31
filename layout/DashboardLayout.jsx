import { Layout } from "antd";

import DashboardHeader from "../components/Header";
import DashboardFooter from "../components/Footer";
import DashboardSidebar from "../components/SIdebar";

const { Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={240}>
        <DashboardSidebar/>
      </Sider>

      <Layout>
        <DashboardHeader />

        <Content
          style={{
            // padding: 30,
            background: "#fff",
          }}
        >
          {children}
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  );
}
