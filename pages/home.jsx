import React, { useState } from "react";
import { Layout, Typography, Button, Space } from "antd";
import LoginModal from "../modal/LoginModal";
import { Link } from "react-router-dom";
import RegisterModal from "../modal/RegisterModal";
import bg from "../src/assets/bkg.jpg";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const NAVBAR_HEIGHT = 70;

const Home = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
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
            <Button
              type="text"
              style={{
                color: "#fff",
                fontWeight: 600,
              }}
            >
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

          <Button
            type="primary"
            onClick={() => setRegisterOpen(true)}
            style={{
              marginLeft: 10,
              background: "linear-gradient(135deg,#d4af37,#a67c00)",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Button>
          <Button
            type="default"
            onClick={() => setLoginOpen(true)}
            style={{
              marginLeft: 10,
              border: "2px solid #d4af37",
              color: "#d4af37",
              background: "transparent",
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        </div>
      </Header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <Content>
        <div
          style={{
            height: "420px",
            width: "100%",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7)), url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              maxWidth: 820,
              background: "linear-gradient(135deg, #000000cc, #1a1200cc)",
              padding: "50px",
              borderRadius: "24px",
              marginTop: "350px",
              textAlign: "center",
              color: "#fff",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            }}
          >
            <Title
              level={1}
              style={{ color: "#d4af37", fontSize: 54, fontWeight: "500" }}
            >
              Welcome to LuxuryStay
            </Title>
            <Paragraph style={{ fontSize: 20, color: "#f5f5f5" }}>
              Where luxury meets comfort & unforgettable hospitality
            </Paragraph>
            <Space size="large">
              <Button
                size="large"
                type="primary"
                style={{
                  background: "linear-gradient(135deg,#d4af37,#a67c00)",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => setRegisterOpen(true)}
              >
                Book Your Stay
              </Button>
            </Space>
          </div>
        </div>

        <div style={{ padding: "80px 60px", background: "#fffaf3" }}>
          <Title level={2} style={{ textAlign: "center", color: "#a67c00" }}>
            Our Luxury Rooms
          </Title>
          <Paragraph style={{ textAlign: "center", marginBottom: 50 }}>
            Elegantly designed rooms crafted for comfort & class
          </Paragraph>

          <div
            style={{
              display: "flex",
              gap: 30,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                name: "Deluxe Room",
                img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
              },
              {
                name: "Executive Room",
                img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
              },
              {
                name: "Family Suite",
                img: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
              },
              {
                name: "Presidential Suite",
                img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
              },
            ].map((room) => (
              <div
                key={room.name}
                style={{
                  width: 270,
                  background: "#fff",
                  borderRadius: 20,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  overflow: "hidden",
                  transition: "transform 0.3s",
                }}
              >
                <div
                  style={{
                    height: 170,
                    backgroundImage: `url(${room.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div style={{ padding: 22 }}>
                  <Title level={4}>{room.name}</Title>
                  <Paragraph>
                    Premium interior • Free WiFi • Breakfast Included
                  </Paragraph>
                  <Button
                    type="primary"
                    block
                    style={{
                      background: "#000",
                      border: "none",
                    }}
                    onClick={() => setRegisterOpen(true)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{ padding: "80px 60px", background: "#111", color: "#fff" }}
        >
          <Title level={2} style={{ textAlign: "center", color: "#d4af37" }}>
            Why Choose LuxuryStay
          </Title>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              marginTop: 50,
              flexWrap: "wrap",
            }}
          >
            {[
              "24/7 Room Service",
              "Prime Location",
              "Luxury Interiors",
              "Complimentary Breakfast",
            ].map((item) => (
              <div
                key={item}
                style={{
                  width: 230,
                  background: "#1c1c1c",
                  padding: 30,
                  borderRadius: 18,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <Title level={4} style={{ color: "#d4af37" }}>
                  {item}
                </Title>
                <Paragraph style={{ color: "#ccc" }}>
                  Designed to deliver unmatched comfort and luxury.
                </Paragraph>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "80px 60px",
            background: "linear-gradient(135deg,#fff,#fff6e5)",
            textAlign: "center",
          }}
        >
          <Title level={2} style={{ color: "#a67c00" }}>
            Hotel Amenities
          </Title>
          <Paragraph>Premium facilities for a world-class experience</Paragraph>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 30,
              marginTop: 40,
            }}
          >
            {[
              "Swimming Pool",
              "Spa & Wellness",
              "Fitness Center",
              "Free Parking",
              "Airport Pickup",
              "High-Speed WiFi",
            ].map((a) => (
              <div
                key={a}
                style={{
                  padding: 35,
                  background: "#fff",
                  borderRadius: 20,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  fontWeight: 600,
                }}
              >
                {a}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "90px 40px",
            background: "linear-gradient(135deg, #000, #1a1200)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Title level={2} style={{ color: "#d4af37" }}>
            Ready to Experience True Luxury?
          </Title>
          <Paragraph style={{ color: "#ddd" }}>
            Reserve your room today and enjoy unforgettable comfort.
          </Paragraph>
          <Button
            size="large"
            type="primary"
            style={{
              background: "linear-gradient(135deg,#d4af37,#a67c00)",
              border: "none",
              fontWeight: "bold",
            }}
            onClick={() => setRegisterOpen(true)}
          >
            Get Started
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
