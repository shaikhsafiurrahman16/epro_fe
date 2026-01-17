import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import {
  UnlockOutlined,
  LockOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  UserOutlined,
  StarFilled,
} from "@ant-design/icons";
import { api } from "../../api/axiosInstance";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const [roomStats, setRoomStats] = useState({
    availableRooms: 0,
    bookedRooms: 0,
  });
  const [serviceStats, setServiceStats] = useState({ totalServices: 0 });
  const [userStats, setUserStats] = useState({ total: 0, staff: 0, guest: 0 });
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/count/rooms")
      .then((res) => res.data.status && setRoomStats(res.data.data))
      .catch(() => console.log("Room stats fetch error"));
    api
      .get("/count/services")
      .then((res) => res.data.status && setServiceStats(res.data.data))
      .catch(() => console.log("Service stats fetch error"));
    api
      .get("/count/users")
      .then((res) => setUserStats(res.data))
      .catch(() => console.log("User stats fetch error"));
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/feedback/read");
      if (res.data.status) setFeedbacks(res.data.feedbacks);
    } catch (error) {
      message.error("Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const feedbackColumns = [
    { title: "User", dataIndex: ["user_id", "name"], key: "user" },
    { title: "Email", dataIndex: ["user_id", "email"], key: "email" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <span>
          {Array.from({ length: rating }, (_, i) => (
            <StarFilled
              style={{ color: "#fadb14", marginRight: 2, fontSize: 16 }}
            />
          ))}
        </span>
      ),
    },
    { title: "Remarks", dataIndex: "remarks", key: "remarks" },
  ];

  return (
    <div style={{ padding: 0 }}>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
              background: "#e6f7ff",
            }}
          >
            <Statistic
              title="Available Rooms"
              value={roomStats.availableRooms}
              prefix={<UnlockOutlined style={{ color: "#13c2c2" }} />}
              valueStyle={{ color: "#13c2c2" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
              background: "#fff1f0",
            }}
          >
            <Statistic
              title="Booked Rooms"
              value={roomStats.bookedRooms}
              prefix={<LockOutlined style={{ color: "#f5222d" }} />}
              valueStyle={{ color: "#f5222d" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
              background: "#fff7e6",
            }}
          >
            <Statistic
              title="Total Services"
              value={serviceStats.totalServices}
              prefix={<AppstoreOutlined style={{ color: "#fa8c16" }} />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
              background: "#f0f5ff",
            }}
          >
            <Statistic
              title="Total Users"
              value={userStats.total || 0}
              prefix={<TeamOutlined style={{ color: "#2f54eb" }} />}
              valueStyle={{ color: "#2f54eb" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
              background: "#f6ffed",
            }}
          >
            <Statistic
              title="Staff"
              value={userStats.staff || 0}
              prefix={<UserSwitchOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
              background: "#fffbe6",
            }}
          >
            <Statistic
              title="Guests"
              value={userStats.guest || 0}
              prefix={<UserOutlined style={{ color: "#d46b08" }} />}
              valueStyle={{ color: "#d46b08" }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="User Feedbacks"
        style={{
          marginTop: 40,
          borderRadius: 12,
          boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        }}
      >
        <Table
          columns={feedbackColumns}
          dataSource={feedbacks}
          rowKey={(r) => r._id}
          pagination={{ pageSize: 2 }}
          loading={loading}
          bordered
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;
