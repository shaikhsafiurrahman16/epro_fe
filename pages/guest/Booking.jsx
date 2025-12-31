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
const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingForGuest = () => {
  const [roomType, setRoomType] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [displayRooms, setDisplayRooms] = useState([]);
  const [guests, setGuests] = useState("");
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/room/read");
        const data = await res.json();
        setAllRooms(data);
        setAvailableRooms(data);
        setDisplayRooms(data);
      } catch {
        message.error("Failed to fetch rooms");
      }
    };
    fetchRooms();
  }, []);

  const fetchRoomsByType = async (type) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/room/available/by-type?room_type=${type}`
      );
      const data = await res.json();
      setAvailableRooms(data);
      setDisplayRooms(data);
    } catch {
      message.error("Failed to fetch rooms");
    }
  };

  useEffect(() => {
    if (roomNo) {
      setDisplayRooms(availableRooms.filter((r) => r.room_number === roomNo));
    } else {
      setDisplayRooms(availableRooms);
    }
  }, [roomNo, availableRooms]);

  return (
    <Layout>
      <Content style={{ padding: "10px", background: "#fff" }}>
        <Title level={2} style={{ textAlign: "center", color: "#a67c00", marginTop: "20px" }}>
          Book Your Stay
        </Title>
        <Paragraph style={{ textAlign: "center", marginBottom: 40 }}>
          Choose room, dates & guests
        </Paragraph>

        <Card
          style={{
            maxWidth: 1000,
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

export default BookingForGuest;
