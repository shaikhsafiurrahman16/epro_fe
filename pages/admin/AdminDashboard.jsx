import { Card, Row, Col, Table, Tag, Button, Typography } from "antd";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const stats = [
    { title: "My Bookings", value: 5 },
    { title: "Upcoming Stays", value: 2 },
    { title: "Completed Stays", value: 3 },
  ];

  const bookings = [
    {
      key: "1",
      room: "Deluxe Room",
      checkIn: "10 Oct 2025",
      checkOut: "12 Oct 2025",
      status: "Confirmed",
    },
    {
      key: "2",
      room: "Luxury Suite",
      checkIn: "20 Oct 2025",
      checkOut: "22 Oct 2025",
      status: "Pending",
    },
  ];

  const columns = [
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Check-in",
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: "Check-out",
      dataIndex: "checkOut",
      key: "checkOut",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Confirmed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Row gutter={16} style={{ marginTop: 25 }}>
        {stats.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card>
              <Text type="secondary">{item.title}</Text>
              <Title level={2}>{item.value}</Title>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: 40 }} title="Recent Bookings">
        <Table columns={columns} dataSource={bookings} pagination={false} />
      </Card>

      <div style={{ marginTop: 30 }}>
        <Button type="primary" style={{ background: "#d4af37" }}>
          + New Booking
        </Button>

        <Button style={{ marginLeft: 10 }}>View All Bookings</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
