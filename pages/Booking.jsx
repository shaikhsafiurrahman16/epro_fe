import React, { useState } from "react";
import {
  Layout,
  Typography,
  Button,
  DatePicker,
  Select,
  Card,
  Row,
  Col,
  Input,
} from "antd";
import { Link } from "react-router-dom";
import RegisterModal from "../modal/RegisterModal";
import LoginModal from "../modal/LoginModal";

const { Content, Header } = Layout;
const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Booking = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [guests, setGuests] = useState("");

  const services = [
    { name: "Spa & Wellness", desc: "Relax with premium spa experience" },
    { name: "Airport Pickup", desc: "Comfortable airport transfer" },
    { name: "Room Service", desc: "24/7 luxury dining" },
    { name: "Swimming Pool", desc: "Premium pool access" },
  ];

  const fetchRoomsByType = async (type) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/room/available/by-type?room_type=${type}`
      );
      const data = await res.json();
      setAvailableRooms(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: 70,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: "#d4af37" }}>
          LuxuryStay
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
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

          <Button
            onClick={() => setRegisterOpen(true)}
            style={{
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

      <Content
        style={{
          padding: "120px 40px 60px",
          background: "#fffaf3",
        }}
      >
        <Title level={2} style={{ textAlign: "center", color: "#a67c00" }}>
          Book Your Stay
        </Title>
        <Paragraph style={{ textAlign: "center", marginBottom: 40 }}>
          Choose room, dates & guests
        </Paragraph>

        <Card
          style={{
            maxWidth: 950,
            margin: "0 auto",
            borderRadius: 20,
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          }}
        >
          <Row gutter={[20, 20]}>
            <Col xs={24} md={6}>
              <Select
                size="large"
                placeholder="Room Type"
                style={{ width: "100%" }}
                onChange={(value) => {
                  setRoomType(value);
                  setRoomNo("");
                  fetchRoomsByType(value);
                }}
              >
                <Option value="Single bed">Single Bed</Option>
                <Option value="Double bed">Double Bed</Option>
              </Select>
            </Col>

            <Col xs={24} md={6}>
              <Select
                size="large"
                placeholder="Room No"
                value={roomNo || 0}
                disabled={!roomType}
                style={{ width: "100%" }}
                onChange={(value) => setRoomNo(value)}
              >
                {availableRooms.map((room) => (
                  <Option key={room._id} value={room.room_number}>
                    {room.room_number}
                  </Option>
                ))}
              </Select>
            </Col>

            <Col xs={24} md={8}>
              <RangePicker size="large" style={{ width: "100%" }} />
            </Col>

            <Col xs={24} md={4}>
              <Input
                size="large"
                type="number"
                min={1}
                placeholder="Guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </Col>
          </Row>
        </Card>

        {/* ================= BOOK BUTTON ================= */}
        <div style={{ textAlign: "center", marginTop: 70 }}>
          <Button
            size="large"
            onClick={() => setRegisterOpen(true)}
            style={{
              padding: "0 50px",
              height: 48,
              background: "linear-gradient(135deg,#d4af37,#a67c00)",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Confirm Booking
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Booking;
