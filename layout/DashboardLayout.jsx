import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Avatar, Space } from "antd";
import {
  UserOutlined,
  DownOutlined,
  LogoutOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(Cookies.get("user") || "{}");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    navigate("/home");
  };

  const userMenuItems = [
    {
      key: "userInfo",
      label: (
        <div style={{ padding: "8px 12px" }}>
          <div style={{ fontWeight: 600 }}>{user?.name}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{user?.email}</div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];
  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/booking", label: "Booking" },
    { path: "/dashboard/settings", label: "Setting" },
    { path: "/dashboard/user", label: "User" },
    { path: "/dashboard/room", label: "Room" },
    { path: "/dashboard/service", label: "Service" },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="src/assets/logo.png"
          alt="LuxuryStay"
          style={{ height: 180, width: 180, objectFit: "contain" }}
        />

        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #d4af37",
            paddingBottom: 6,
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            {navItems.map((item) => {
              // teen links sirf Admin ke liye
              const adminOnlyLinks = [
                "/dashboard/user",
                "/dashboard/room",
                "/dashboard/service",
              ];
              if (adminOnlyLinks.includes(item.path) && user.role !== "Admin")
                return null;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 600,
                    color: location.pathname === item.path ? "#d4af37" : "#000",
                    borderBottom:
                      location.pathname === item.path
                        ? "2px solid #d4af37"
                        : "none",
                    padding: "5px 10px",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Space style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} />
              <span style={{ fontWeight: 500 }}>{user?.name || "User"}</span>
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>

        <div style={{ width: "90%", maxWidth: "100%", marginTop: 30 }}>
          {children}
        </div>
      </Content>
    </Layout>
  );
}
