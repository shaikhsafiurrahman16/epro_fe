import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Avatar, Space } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
// import jwt_decode from 'jwt-decode';

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const decoded = jwt_decode(token);
  //       setUser(decoded); 
  //     } catch (err) {
  //       console.log("Invalid token");
  //     }
  //   }
  // }, []);

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/booking", label: "Booking" },
    { path: "/dashboard/settings", label: "Setting" },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: "My Profile",
      onClick: () => navigate("/dashboard/settings"),
    },
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
            width: "90%",
            maxWidth: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #d4af37",
            paddingBottom: 6,
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            {navItems.map((item) => (
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
            ))}
          </div>

          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Space style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} />
              <span style={{ fontWeight: 500 }}>
                {user ? user.name : "User"} {/* user name show */}
              </span>
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
