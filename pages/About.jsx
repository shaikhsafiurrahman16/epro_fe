import React, { useState } from "react";
import { Layout, Typography, Button, Card, Row, Col } from "antd";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import { Link } from "react-router-dom";
import bg from "../src/assets/bkg.jpg";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const NAVBAR_HEIGHT = 70;

const rooms = [
  {
    title: "Deluxe Room",
    description:
      "Spacious room with sea view, king-size bed, and modern amenities.",
    img: "src/assets/Double-Standard.jpeg",
  },
  {
    title: "Executive Suite",
    description:
      "Luxury suite with separate living area, premium furniture & balcony.",
    img: "src/assets/Double-Delux.jpeg",
  },
  {
    title: "Family Room",
    description:
      "Comfortable family room with two beds, kid-friendly space & cozy design.",
    img: "src/assets/Single-Delux.jpeg",
  },
  {
    title: "Presidential Suite",
    description:
      "Top-tier suite with panoramic views, exclusive services & lavish interiors.",
    img: "src/assets/room-1.jpeg",
  },
];

const About = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        // background: `url(${bg}) center/cover no-repeat`,
      }}
    >
      <Header
        style={{
          height: NAVBAR_HEIGHT,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
          backgroundColor: "#00000044",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#684b15ff",
            marginLeft: "40px",
          }}
        >
          LuxuryStay
        </div>
        <div>
          <Link to="/">
            <Button type="default" style={{ marginRight: 10 }}>
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button type="default" style={{ marginRight: 10 }}>
              About
            </Button>
          </Link>
          <Link to="/contact">
            <Button type="default" style={{ marginRight: 10 }}>
              Contact
            </Button>
          </Link>
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => setRegisterOpen(true)}
          >
            Register
          </Button>
          <Button
            type="primary"
            onClick={() => setLoginOpen(true)}
            style={{ marginRight: "40px" }}
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

      <Content style={{ padding: "100px 50px", }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <Title level={2} style={{
            color: "#684b15ff"
          }}>Welcome to LuxuryStay</Title>
          <Paragraph style={{ fontSize: 18, maxWidth: 700, margin: "0 auto" }}>
            Experience world-class hospitality, unmatched comfort, and
            beautifully designed rooms at our luxury hotel. Choose from a
            variety of rooms tailored to your needs.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {rooms.map((room, index) => (
            <Col xs={24} sm={12} md={12} lg={6} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt={room.title}
                    src={room.img}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
              >
                <Card.Meta
                  title={room.title}
                  description={<Paragraph>{room.description}</Paragraph>}
                />
                <Button
                  type="primary"
                  block
                  style={{ marginTop: 20 }}
                  onClick={() => setRegisterOpen(true)}
                >
                  Book Now
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default About;
