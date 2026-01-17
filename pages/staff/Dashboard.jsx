import { Card, Row, Col, Table, Tag, Typography, message } from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

const DashboardForStaff = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [totalServices, setTotalServices] = useState(0);

  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardCounts();
    fetchAllBookings();
  }, []);

  const fetchDashboardCounts = async () => {
    try {
      const [bookingRes, roomRes, serviceRes] = await Promise.all([
        api.get("/count/bookings"),
        api.get("/count/rooms"),
        api.get("/count/services"),
      ]);

      setTotalBookings(bookingRes.data?.totalBookings || 0);
      setTotalRooms(roomRes.data?.data?.totalRooms || 0);
      setAvailableRooms(roomRes.data?.data?.availableRooms || 0);
      setTotalServices(serviceRes.data?.data?.totalServices || 0);
    } catch (error) {
      message.error("Failed to fetch dashboard counts");
    }
  };

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/booking/read");
      setBookingList(res.data?.bookings || []);
    } catch (error) {
      message.error("Failed to fetch bookings");
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
      title: "Total Bookings",
      value: totalBookings,
      icon: <BookOutlined style={{ fontSize: 30, color: "#1890ff" }} />,
      color: "#e6f7ff",
    },
    {
      title: "Total Rooms",
      value: totalRooms,
      icon: <HomeOutlined style={{ fontSize: 30, color: "#722ed1" }} />,
      color: "#f9f0ff",
    },
    {
      title: "Available Rooms",
      value: availableRooms,
      icon: <CalendarOutlined style={{ fontSize: 30, color: "#52c41a" }} />,
      color: "#f6ffed",
    },
    {
      title: "Total Services",
      value: totalServices,
      icon: <AppstoreOutlined style={{ fontSize: 30, color: "#fa8c16" }} />,
      color: "#fff7e6",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Row gutter={[16, 16]} style={{ marginTop: 25 }}>
        {stats.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
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

      <Card title="Stays" style={{ marginTop: 25, borderRadius: 10 }}>
        <Table
          columns={columns}
          dataSource={bookingList}
          loading={loading}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 4 }}
        />
      </Card>
    </div>
  );
};

export default DashboardForStaff;
