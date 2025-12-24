import { Menu } from "antd";
import {
  DashboardOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export default function DashboardSidebar() {
  const location = useLocation();

  const selectedKey =
    location.pathname === "/" || location.pathname === "/dashboard"
      ? "/dashboard"
      : location.pathname;

  return (
    <div
      style={{
        height: "100%",
        background: "#ffffff",
        borderRight: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d4af37",
          fontSize: 28,
          fontWeight: 700,
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        LuxuryStay
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{
          borderRight: "none",
        }}
        items={[
          {
            key: "/dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
          },
          {
            key: "/dashboard/booking",
            icon: <BookOutlined />,
            label: <Link to="/dashboard/booking">Booking</Link>,
          },
          {
            key: "/dashboard/settings",
            icon: <SettingOutlined />,
            label: <Link to="/dashboard/settings">Settings</Link>,
          },
        ]}
      />
    </div>
  );
}
