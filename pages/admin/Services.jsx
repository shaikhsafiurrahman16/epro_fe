import React from "react";
import { Card, List, Typography } from "antd";

const { Title } = Typography;

export default function Service() {
  const services = [
    "Room Cleaning",
    "Food Service",
    "Laundry Service",
    "Tea & Coffee",
  ];

  return (
    <Card style={{ maxWidth: 500, margin: "20px auto" }}>
      <Title level={3}>Room Services</Title>

      <List
        bordered
        dataSource={services}
        renderItem={(item) => <List.Item>✅ {item}</List.Item>}
      />
    </Card>
  );
}
