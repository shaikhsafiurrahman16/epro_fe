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
  InputNumber,
  Space,
  Checkbox,
  Input,
  message,
  Modal,
} from "antd";
import { api } from "../../api/axiosInstance";
import Cookies from "js-cookie";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingForGuest = () => {
  const [roomType, setRoomType] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [displayRooms, setDisplayRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [dates, setDates] = useState([]);
  const [guests, setGuests] = useState({ Adult: 1, Kid: 0, Infant: 0 });
  const [phone, setPhone] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const user = JSON.parse(Cookies.get("user") || "{}");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/room/read");
        setAvailableRooms(res.data);
        setDisplayRooms(res.data);
      } catch {
        message.error("Failed to fetch rooms");
      }
    };
    fetchRooms();
  }, []);

  const handleRoomTypeChange = (type) => {
    setRoomType(type);
    if (!type) {
      setDisplayRooms(availableRooms);
      return;
    }
    const filtered = availableRooms.filter((r) => r.room_type === type);
    setDisplayRooms(filtered);
    setSelectedRooms([]);
  };

  const toggleRoomSelect = (room) => {
    const exists = selectedRooms.find((r) => r._id === room._id);
    if (exists) {
      setSelectedRooms(selectedRooms.filter((r) => r._id !== room._id));
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const handleConfirmBooking = async () => {
    if (!dates.length || selectedRooms.length === 0 || !phone) {
      message.error("Please fill phone, dates and rooms!");
      return;
    }

    const guestArray = [];

    if (guests.Adult > 0)
      guestArray.push({ guest_type: "Adult", guest_number: guests.Adult });

    if (guests.Kid > 0)
      guestArray.push({ guest_type: "Kid", guest_number: guests.Kid });

    if (guests.Infant > 0)
      guestArray.push({ guest_type: "Infant", guest_number: guests.Infant });

    try {
      const res = await api.post("/booking/create", {
        user_id: user.id,
        rooms: selectedRooms.map((r) => r._id),
        datetime_check_in: dates[0].toISOString(),
        datetime_check_out: dates[1].toISOString(),
        guests: guestArray,
        booking_type: "Online",
        phone: phone,
      });

      if (res.data.status) {
        message.success("Booking Successful!");
        setOpenModal(false);
        setSelectedRooms([]);
        setDates([]);
        setGuests({ Adult: 1, Kid: 0, Infant: 0 });
        setRoomType("");
        setPhone("");
      } else {
        message.error(res.data.message || "Booking failed!");
      }
    } catch {
      message.error("Server Error. Booking failed!");
    }
  };

  const handleCheckout = async (bookingId) => {
  try {
    const res = await api.put(`/booking/checkout/${bookingId}`);

    if (res.data.status) {
      message.success("Checked out successfully");
      navigate(`/invoice/${bookingId}`);
    }
  } catch (err) {
    message.error("Checkout failed");
  }
};

  return (
    <Layout>
      <Content style={{ padding: 20 }}>
        <Title level={2} style={{ textAlign: "center", color: "#d4af37" }}>
          Book Your Stay
        </Title>
        <Paragraph style={{ textAlign: "center", color: "#110f086c" }}>
          Select luxury rooms for better experience
        </Paragraph>

        <Space style={{ width: "100%", marginBottom: 20 }}>
          <Select
            size="large"
            placeholder="Select Room Type"
            value={roomType || undefined}
            onChange={handleRoomTypeChange}
            style={{ width: 300 }}
            allowClear
          >
            <Option value="Single Bed">Single Bed</Option>
            <Option value="Double Bed">Double Bed</Option>
          </Select>
        </Space>

        <Row gutter={[20, 20]}>
          {displayRooms.length === 0 && (
            <Col span={24} style={{ textAlign: "center" }}>
              <Text>No rooms available</Text>
            </Col>
          )}

          {displayRooms.map((room) => (
            <Col key={room._id} xs={24} sm={12} md={8} lg={4}>
              <Card
                hoverable
                cover={
                  <img
                    alt={room.room_type}
                    src={
                      room.room_type === "Single Bed"
                        ? "https://plus.unsplash.com/premium_photo-1675615667752-2ccda7042e7e"
                        : "https://plus.unsplash.com/premium_photo-1733353323840-cefa39cced34"
                    }
                    style={{ height: 160, objectFit: "cover" }}
                  />
                }
              >
                <Checkbox
                  checked={!!selectedRooms.find((r) => r._id === room._id)}
                  onChange={() => toggleRoomSelect(room)}
                >
                  Select Room
                </Checkbox>

                <Title level={5} style={{ marginTop: 10 }}>
                  Room {room.room_number}
                </Title>

                <Text strong>
                  {room.room_type} — Rs {room.room_price}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Button
            type="primary"
            size="large"
            style={{
              background: "#d4af37", 
              color: "black"
            }}
            disabled={selectedRooms.length === 0}
            onClick={() => setOpenModal(true)}
          >
            Book Now
          </Button>
        </div>

        <Modal
          title={null}
          open={openModal}
          onCancel={() => {
            setOpenModal(false);
            setSelectedRooms([]);
          }}
          footer={null}
          centered
          width={500}
          closable={false}
        >
          <div
            style={{
              background: "linear-gradient(135deg,#000,#1a1200)",
              borderRadius: 10,
              padding: "30px 30px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
              color: "#fff",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#d4af37",
                fontSize: 28,
                marginBottom: 15,
              }}
            >
              Confirm Your Booking
            </h2>

            <h4 style={{ color: "#d4af37", marginBottom: 10 }}>
              Selected Rooms
            </h4>
            {selectedRooms.map((r) => (
              <div key={r._id} style={{ marginBottom: 5 }}>
                {r.room_number} — {r.room_type} — Rs {r.room_price}
              </div>
            ))}

            <h4 style={{ color: "#d4af37", marginTop: 15, marginBottom: 10 }}>
              Dates
            </h4>
            <RangePicker
              style={{ width: "100%" }}
              value={dates}
              onChange={(val) => setDates(val)}
            />

            <h4 style={{ color: "#d4af37", marginTop: 15, marginBottom: 10 }}>
              Guests
            </h4>
            <Space direction="vertical" style={{ width: "100%" }}>
              <InputNumber
                min={0}
                value={guests.Adult}
                onChange={(val) => setGuests({ ...guests, Adult: val })}
                addonBefore="Adults"
                style={{ width: "100%" }}
              />
              <InputNumber
                min={0}
                value={guests.Kid}
                onChange={(val) => setGuests({ ...guests, Kid: val })}
                addonBefore="Kids"
                style={{ width: "100%" }}
              />
              <InputNumber
                min={0}
                value={guests.Infant}
                onChange={(val) => setGuests({ ...guests, Infant: val })}
                addonBefore="Infants"
                style={{ width: "100%" }}
              />
            </Space>

            <h4 style={{ color: "#d4af37", marginTop: 15, marginBottom: 10 }}>
              Phone
            </h4>
            <Input
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", marginBottom: 15 }}
            />

            <Button
              type="default"
              size="large"
              block
              style={{
                marginTop: 15,
                background: "transparent",
                border: "2px solid #d4af37",
                borderRadius: 8,
                fontWeight: "bold",
                color: "#d4af37",
              }}
              onClick={() => {
                setOpenModal(false);
                setSelectedRooms([]); 
              }}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              size="large"
              block
              style={{
                marginTop: 10,
                background: "linear-gradient(135deg,#d4af37,#a67c00)",
                border: "none",
                borderRadius: 8,
                fontWeight: "bold",
                color: "#000",
              }}
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </Button>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default BookingForGuest;
