import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic } from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  UnlockOutlined,
  LockOutlined,
  AppstoreOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { api } from "../../api/axiosInstance";

const AdminDashboard = () => {
  // const [bookingStats, setBookingStats] = useState({
  //   totalBookings: 0,
  //   upcomingStays: 0,
  //   completedStays: 0,
  // });

  const [roomStats, setRoomStats] = useState({
    // totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0,
  });

  const [serviceStats, setServiceStats] = useState({ totalServices: 0 });
  const [userStats, setUserStats] = useState({ total: 0, staff: 0, guest: 0 });
  console.log(userStats)

  useEffect(() => {
  //   api
  //     .get("/count/bookings")
  //     .then((res) => {
  //       if (res.data.status && res.data.data) setBookingStats(res.data.data);
  //     })
  //     .catch(() => console.log("Booking stats fetch error"));

    api
      .get("/count/rooms")
      .then((res) => {
        if (res.data.status && res.data.data) setRoomStats(res.data.data);
      })
      .catch(() => console.log("Room stats fetch error"));

    api
      .get("/count/services")
      .then((res) => {
        if (res.data.status && res.data.data) setServiceStats(res.data.data);
      })
      .catch(() => console.log("Service stats fetch error"));

    api
      .get("/count/users")
      .then((res) => {
        setUserStats(res.data);
      })
      .catch(() => console.log("User stats fetch error"));
  }, []);

  const cardStyle = {
    borderRadius: 12,
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
  };

  return (
    <div style={{ padding: 25 }}>
      <Row gutter={[20, 20]}>
        {/* <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="My Bookings"
              value={bookingStats.totalBookings}
              prefix={<BookOutlined style={{ color: "#d4af37" }} />}
              valueStyle={{ color: "#d4af37" }}
            />
          </Card>
        </Col> */}

        {/* <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Upcoming Stays"
              value={bookingStats.upcomingStays}
              prefix={<CalendarOutlined style={{ color: "#1677ff" }} />}
              valueStyle={{ color: "#1677ff" }}
            />
          </Card>
        </Col> */}

        {/* <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Completed Stays"
              value={bookingStats.completedStays}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col> */}

        {/* <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Total Rooms"
              value={roomStats.totalRooms}
              prefix={<HomeOutlined style={{ color: "#722ed1" }} />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col> */}

        <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Available Rooms"
              value={roomStats.availableRooms}
              prefix={<UnlockOutlined style={{ color: "#13c2c2" }} />}
              valueStyle={{ color: "#13c2c2" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Booked Rooms"
              value={roomStats.bookedRooms}
              prefix={<LockOutlined style={{ color: "#f5222d" }} />}
              valueStyle={{ color: "#f5222d" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Total Services"
              value={serviceStats.totalServices}
              prefix={<AppstoreOutlined style={{ color: "#fa8c16" }} />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Total Users"
              value={userStats.total || 9}
              prefix={<TeamOutlined style={{ color: "#2f54eb" }} />}
              valueStyle={{ color: "#2f54eb" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Staff"
              value={userStats.staff}
              prefix={<UserSwitchOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={cardStyle}>
            <Statistic
              title="Guests"
              value={userStats.guest}
              prefix={<UserOutlined style={{ color: "#d46b08" }} />}
              valueStyle={{ color: "#d46b08" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
