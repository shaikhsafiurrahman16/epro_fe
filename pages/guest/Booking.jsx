import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  DatePicker,
  Select,
  Card,
  Row,
  Col,
  Input,
  Space,
  message,
} from "antd";

const { Title } = Typography;
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
      setDisplayRooms(
        availableRooms.filter((r) => r.room_number === roomNo)
      );
    } else {
      setDisplayRooms(availableRooms);
    }
  }, [roomNo, availableRooms]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Book Your Stay
      </Title>

      {/* Filters */}
      <Row gutter={16} style={{ marginBottom: 30 }}>
        <Col xs={24} md={5}>
          <Select
            placeholder="Room Type"
            value={roomType || undefined}
            style={{ width: "100%" }}
            onChange={(v) => {
              setRoomType(v);
              fetchRoomsByType(v);
            }}
          >
            <Option value="Single Bed">Single Bed</Option>
            <Option value="Double Bed">Double Bed</Option>
          </Select>
        </Col>

        <Col xs={24} md={5}>
          <Select
            placeholder="Room No"
            value={roomNo || undefined}
            style={{ width: "100%" }}
            onChange={(v) => setRoomNo(v)}
          >
            {availableRooms.map((room) => (
              <Option key={room._id} value={room.room_number}>
                {room.room_number}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={8}>
          <RangePicker style={{ width: "100%" }} />
        </Col>

        <Col xs={24} md={4}>
          <Input
            type="number"
            placeholder="Guests"
            min={1}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </Col>
      </Row>

      {/* Rooms */}
      <Row gutter={16}>
        {displayRooms.map((room) => (
          <Col key={room._id} xs={24} sm={12} md={6}>
            <Card hoverable>
              <Space direction="vertical">
                <b>Room {room.room_number}</b>
                <span>Type: {room.room_type}</span>
                <span>Price: ${room.room_price}</span>
                <Button
                  type="primary"
                  onClick={() => {
                    setRoomType(room.room_type);
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

      {/* Book Button */}
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <Button type="primary" size="large" disabled={!roomNo}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookingForGuest;
