import React, { useState } from "react";
import { Layout, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import bg from "../src/assets/bkg.jpg";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const NAVBAR_HEIGHT = 70;

const NotFound = () => {

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: NAVBAR_HEIGHT,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 50px",
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#d4af37",
            letterSpacing: 1,
          }}
        >
          LuxuryStay
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <Link to="/">
            <Button type="text" style={{ color: "#fff", fontWeight: 600 }}>
              Home
            </Button>
          </Link>
          <Link to="/booking">
            <Button type="text" style={{ color: "#fff", fontWeight: 600 }}>
              Booking
            </Button>
          </Link>
          <Link to="/contact">
            <Button type="text" style={{ color: "#fff", fontWeight: 600 }}>
              Contact
            </Button>
          </Link>
        </div>
      </Header>

      <Content>
        <div
          style={{
            height: "100vh",
            width: "100%",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              background: "linear-gradient(135deg, #000000cc, #1a1200cc)",
              padding: "60px",
              borderRadius: "24px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              maxWidth: 600,
              color: "#fff",
            }}
          >
            <Title level={1} style={{ color: "#d4af37", fontSize: 64 }}>
              404
            </Title>
            <Paragraph style={{ fontSize: 22, color: "#f5f5f5" }}>
              Oops! The page you are looking for does not exist.
            </Paragraph>
            <Link to="/">
              <Button
                size="large"
                type="primary"
                style={{
                  background: "linear-gradient(135deg,#d4af37,#a67c00)",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default NotFound;
