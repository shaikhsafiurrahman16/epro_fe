import { Card, Row, Col, Table, Tag, Button, Typography } from "antd";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const Counts = [
    { title: "My Bookings", value: 5 },
    { title: "Upcoming Stays", value: 2 },
    { title: "Completed Stays", value: 3 },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Row gutter={16} style={{ marginTop: 25 }}>
        {Counts.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card>
              <Text type="secondary">{item.title}</Text>
              <Title level={2}>{item.value}</Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminDashboard;
