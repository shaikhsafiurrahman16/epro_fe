import { Card, Row, Col, Table, Tag, Typography, message } from "antd";
import { BookOutlined, CalendarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

const DashboardForGuest = () => {
  const [myBookings, setMyBookings] = useState(0);
  const [upcomingBookings, setUpcomingBookings] = useState(0);
  const [upcomingList, setUpcomingList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get user from cookie
  const user = JSON.parse(Cookies.get("user") || "{}");
  const userId = user.id;

  useEffect(() => {
    if (!userId) return;
    fetchMyBookings();
    fetchUpcomingBookings();
    fetchUpcomingList();
  }, [userId]);

  const fetchMyBookings = async () => {
    try {
      const res = await api.get(`/user/count/mybooking?userId=${userId}`);
      setMyBookings(res.data?.myBookings || 0);
    } catch (err) {
      setMyBookings(0);
      message.error("Failed to fetch My Bookings");
    }
  };

  const fetchUpcomingBookings = async () => {
    try {
      const res = await api.get(`/user/count/upcomingbooking?userId=${userId}`);
      setUpcomingBookings(res.data?.upcomingBookings || 0);
    } catch (err) {
      setUpcomingBookings(0);
      message.error("Failed to fetch Upcoming Bookings");
    }
  };

  const fetchUpcomingList = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/user/count/upcominglist?userId=${userId}`);
      setUpcomingList(res.data?.bookings || []);
    } catch (err) {
      message.error("Failed to fetch Upcoming Stays");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Booking Type",
      dataIndex: "booking_type",
      render: (type) => (
        <Tag color={type === "Online" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "Check In",
      dataIndex: "datetime_check_in",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Check Out",
      dataIndex: "datetime_check_out",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "booking_status",
      render: (status) => {
        let color = "orange";
        if (status === "Checked_In") color = "green";
        if (status === "Cancelled") color = "red";
        if (status === "Checked_Out") color = "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const stats = [
    {
      title: "My Bookings",
      value: myBookings,
      icon: <BookOutlined style={{ fontSize: 30, color: "#1890ff" }} />,
      color: "#e6f7ff",
    },
    {
      title: "Upcoming Stays",
      value: upcomingBookings,
      icon: <CalendarOutlined style={{ fontSize: 30, color: "#52c41a" }} />,
      color: "#f6ffed",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Row gutter={[16, 16]} style={{ marginTop: 25 }}>
        {stats.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={12}>
            <Card
              hoverable
              style={{
                backgroundColor: item.color,
                borderRadius: 10,
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                padding: "10px 14px",
                minHeight: 95,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {item.icon}
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.title}
                  </Text>
                  <Title level={3} style={{ margin: 0, fontWeight: 700 }}>
                    {item.value}
                  </Title>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="Upcoming Stays" style={{ marginTop: 25, borderRadius: 10 }}>
        <Table
          columns={columns}
          dataSource={upcomingList}
          loading={loading}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default DashboardForGuest;
