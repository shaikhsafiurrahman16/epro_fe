import React, { useState, useEffect } from "react";
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
  Divider,
  Space,
  message,
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
  const [displayRooms, setDisplayRooms] = useState([]);
  const [guests, setGuests] = useState("");
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/room/read");
        const data = await res.json();

        setAllRooms(data); // 🔴 master copy
        setAvailableRooms(data);
        setDisplayRooms(data);
      } catch (err) {
        message.error("Failed to fetch rooms.");
      }
    };
    fetchAllRooms();
  }, []);

  const fetchRoomsByType = async (type) => {
    if (!type) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/room/available/by-type?room_type=${encodeURIComponent(
          type,
        )}`,
      );
      const data = await res.json();

      setAvailableRooms(data);
      setDisplayRooms(data);
    } catch (err) {
      message.error("Failed to fetch rooms.");
    }
  };

  useEffect(() => {
    if (roomNo) {
      const filtered = availableRooms.filter(
        (room) => room.room_number === roomNo,
      );
      setDisplayRooms(filtered);
    } else {
      setDisplayRooms(availableRooms);
    }
  }, [roomNo, availableRooms]);

  const resetBookingFields = () => {
    setRoomType("");
    setRoomNo("");
    setGuests("");

    setAvailableRooms(allRooms);
    setDisplayRooms(allRooms);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: 70,
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

      <Content style={{ padding: "120px 40px 60px", background: "#fffaf3" }}>
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
            backgroundColor: "#000000b2",
          }}
        >
          <Row gutter={[20, 20]}>
            <Col xs={24} md={6}>
              <Select
                size="large"
                placeholder="Room Type"
                style={{ width: "100%" }}
                value={roomType || undefined}
                onChange={(value) => {
                  setRoomType(value);
                  fetchRoomsByType(value);
                }}
              >
                <Option value="Single Bed">Single Bed</Option>
                <Option value="Double Bed">Double Bed</Option>
              </Select>
            </Col>

            <Col xs={24} md={6}>
              <Select
                size="large"
                placeholder="Room No"
                value={roomNo || undefined}
                disabled={availableRooms.length === 0}
                style={{ width: "100%" }}
                onChange={(value) => setRoomNo(value)}
                showSearch
                optionFilterProp="label"
                options={availableRooms.map((room) => ({
                  label: room.room_number,
                  value: room.room_number,
                }))}
              />
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

        <Divider style={{ marginTop: 50, marginBottom: 20 }} />

        <Row gutter={[20, 20]}>
          {displayRooms.length === 0 && (
            <Col span={24} style={{ textAlign: "center" }}>
              <Typography.Text>No rooms available</Typography.Text>
            </Col>
          )}

          {displayRooms.map((room) => (
            <Col key={room._id} xs={24} sm={12} md={8} lg={4}>
              <Card
                hoverable
                style={{ borderRadius: 12 }}
                cover={
                  <img
                    alt={room.room_type}
                    style={{
                      borderRadius: "12px 12px 0 0",
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                    }}
                    src={
                      room.room_type === "Single Bed"
                        ? "https://plus.unsplash.com/premium_photo-1675615667752-2ccda7042e7e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        : "https://plus.unsplash.com/premium_photo-1733353323840-cefa39cced34?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                  />
                }
              >
                <Space direction="vertical" size={6}>
                  <Typography.Title level={5}>
                    Room {room.room_number}
                  </Typography.Title>
                  <Typography.Text>Price: $ {room.room_price}</Typography.Text>
                  <Button
                    style={{
                      fontSize: 15,
                      background: "linear-gradient(135deg,#d4af37,#a67c00)",
                      border: "none",
                    }}
                    onClick={() => {
                      setRoomType(room.room_type);
                      fetchRoomsByType(room.room_type);
                      setRoomNo(room.room_number);
                    }}
                  >
                    Select
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Button
            size="large"
            type="primary"
            disabled={!roomNo} // disable if no room selected
            style={{
              padding: "12px 80px",
              fontSize: 18,
              background: "linear-gradient(135deg,#d4af37,#a67c00)",
              border: "none",
            }}
            onClick={() => {
              resetBookingFields();
              setRegisterOpen(true);
            }}
          >
            Book Now
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Booking;
