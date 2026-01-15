import {
  Card,
  Row,
  Col,
  Table,
  Tag,
  Typography,
  message,
  Button,
  Modal,
  List,
  InputNumber,
  Space,
} from "antd";
import { BookOutlined, CalendarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { api } from "../../api/axiosInstance";
import Cookies from "js-cookie";
import InvoiceModal from "../../modal/InvoiceModal";

const { Title, Text } = Typography;

const DashboardForGuest = () => {
  const [myBookings, setMyBookings] = useState(0);
  const [upcomingBookings, setUpcomingBookings] = useState(0);
  const [upcomingList, setUpcomingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  console.log(invoiceData);

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
    } catch {
      setMyBookings(0);
      message.error("Failed to fetch My Bookings");
    }
  };

  const fetchUpcomingBookings = async () => {
    try {
      const res = await api.get(`/user/count/upcomingbooking?userId=${userId}`);
      setUpcomingBookings(res.data?.upcomingBookings || 0);
    } catch {
      setUpcomingBookings(0);
      message.error("Failed to fetch Upcoming Bookings");
    }
  };

  const fetchUpcomingList = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/user/count/upcominglist?userId=${userId}`);
      setUpcomingList(res.data?.bookings || []);
    } catch {
      message.error("Failed to fetch Upcoming Stays");
    } finally {
      setLoading(false);
    }
  };

  const openServiceModal = async (booking) => {
    try {
      const res = await api.get("/service/read");
      const activeServices = res.data.filter((s) => s.status !== "Inactive");
      setAvailableServices(activeServices);
      setSelectedServices({});
      setSelectedBooking(booking);
      setServiceModalVisible(true);
    } catch {
      message.error("Failed to fetch services");
    }
  };

  const handleServiceSelect = (serviceId, quantity) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: quantity,
    }));
  };

  const bookSelectedServices = async () => {
    if (!selectedBooking) {
      message.error("No booking selected");
      return;
    }

    // Convert selectedServices object into an array of service objects
    const servicesToBook = Object.entries(selectedServices).map(
      ([service_id, quantity]) => {
        return { service_id, quantity };
      }
    );

    // Keep only services where quantity > 0
    const filteredServices = servicesToBook.filter(
      (service) => service.quantity > 0
    );

    // If no services selected, show warning
    if (filteredServices.length === 0) {
      message.warning("Select at least one service");
      return;
    }

    // Get the room ID from the booking (first room in the array)
    const roomId = selectedBooking.rooms[0];
    if (!roomId) {
      message.error("Room ID is required");
      return;
    }

    // Send API request to book the selected services
    try {
      await api.post("/bookservice/create", {
        booking_id: selectedBooking._id,
        room_id: roomId,
        services: filteredServices,
      });
      message.success("Services booked successfully");
      setServiceModalVisible(false);
    } catch {
      message.error("Failed to book services");
    }
  };

  const handleCheckout = async (bookingId) => {
    try {
      const res = await api.post(`/booking/checkout/${bookingId}`);

      if (res.data.status) {
        setInvoiceData(res.data.invoice);
        setInvoiceModalOpen(true);
        fetchUpcomingList();
        fetchMyBookings();
        fetchUpcomingBookings();
      }
    } catch {
      message.error("Checkout failed");
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
    {
      title: "Services",
      dataIndex: "_id",
      render: (_, record) => (
        <Button type="link" onClick={() => openServiceModal(record)}>
          Get Services
        </Button>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          {record.booking_status === "Checked_In" && (
            <Button
              type="primary"
              danger
              style={{
                backgroundColor: "#d4af37",
              }}
              onClick={() => handleCheckout(record._id)}
            >
              Check Out
            </Button>
          )}

          {record.booking_status === "Checked_Out" && (
            <Tag color="blue">Completed</Tag>
          )}
        </>
      ),
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
      <Card title="Stays" style={{ marginTop: 25, borderRadius: 10 }}>
        <Table
          columns={columns}
          dataSource={upcomingList}
          loading={loading}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 3 }}
        />
      </Card>
      <Modal
        open={serviceModalVisible}
        onCancel={() => setServiceModalVisible(false)}
        onOk={bookSelectedServices}
        okText="Book Services"
        centered
        width={500}
        closable={false}
        footer={null} // We'll make custom footer
      >
        <div
          style={{
            background: "linear-gradient(135deg, #000, #1a1200)",
            borderRadius: 12,
            padding: "30px 25px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            color: "#fff",
            minHeight: 300,
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
            Book Services
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#ccc",
              marginBottom: 20,
              fontSize: 14,
            }}
          >
            Select services and quantity for your stay
          </p>

          <List
            dataSource={availableServices}
            renderItem={(service) => (
              <List.Item
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 8,
                  marginBottom: 10,
                  padding: "10px 15px",
                }}
              >
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Text style={{ color: "#fff", fontWeight: 500 }}>
                    {service.service_name} (Rs {service.service_price})
                  </Text>
                  <InputNumber
                    min={0}
                    value={selectedServices[service._id] || 0}
                    onChange={(value) =>
                      handleServiceSelect(service._id, value)
                    }
                    style={{
                      borderRadius: 6,
                      width: 80,
                      fontWeight: "bold",
                    }}
                  />
                </Space>
              </List.Item>
            )}
          />

          <div style={{ marginTop: 25, textAlign: "center" }}>
            <Button
              onClick={bookSelectedServices}
              style={{
                background: "linear-gradient(135deg,#d4af37,#a67c00)",
                border: "none",
                color: "#000",
                fontWeight: 600,
                padding: "8px 25px",
                borderRadius: 8,
              }}
            >
              Book Services
            </Button>
          </div>
        </div>
      </Modal>
      <InvoiceModal
        open={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        invoice={invoiceData}
        refreshInvoices={() => {
          fetchUpcomingList();
          fetchMyBookings();
          fetchUpcomingBookings();
        }}
      />
      ;
    </div>
  );
};

export default DashboardForGuest;
