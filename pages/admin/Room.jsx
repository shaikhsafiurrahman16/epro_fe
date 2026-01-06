import React from "react";
import { Card, Row, Col, Tag, Typography, Button } from "antd";

const { Title, Text } = Typography;

export default function Room() {
  const rooms = [
    {
      id: 1,
      roomNumber: "101",
      type: "Single",
      price: 3000,
      status: "Available",
    },
    {
      id: 2,
      roomNumber: "102",
      type: "Double",
      price: 5000,
      status: "Booked",
    },
    {
      id: 3,
      roomNumber: "201",
      type: "Deluxe",
      price: 8000,
      status: "Available",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Rooms</Title>

      <Row gutter={[16, 16]}>
        {rooms.map((room) => (
          <Col xs={24} sm={12} md={8} key={room.id}>
            <Card
              title={`Room ${room.roomNumber}`}
              bordered
              actions={[
                <Button
                  type="primary"
                  disabled={room.status !== "Available"}
                >
                  Book Now
                </Button>,
              ]}
            >
              <p>
                <Text strong>Type:</Text> {room.type}
              </p>
              <p>
                <Text strong>Price:</Text> Rs {room.price}
              </p>
              <p>
                <Text strong>Status:</Text>{" "}
                {room.status === "Available" ? (
                  <Tag color="green">Available</Tag>
                ) : (
                  <Tag color="red">Booked</Tag>
                )}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
