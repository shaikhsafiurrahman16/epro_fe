import {
  Modal,
  Divider,
  Table,
  Typography,
  Button,
  Tag,
  Select,
  message,
} from "antd";
import { useState } from "react";
import { api } from "../api/axiosInstance";
import Cookies from "js-cookie";
import FeedbackModal from "./FeedbackModal";

const { Title, Text } = Typography;
const { Option } = Select;

const InvoiceModal = ({ open, onClose, invoice, refreshInvoices }) => {
  const [paymentMethod, setPaymentMethod] = useState(
    invoice?.payment_method || "Cash"
  );
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(Cookies.get("user") || "{}");

  if (!invoice) return null;

  const roomColumns = [
    { title: "Room No", dataIndex: "number" },
    { title: "Type", dataIndex: "type" },
    { title: "Price", dataIndex: "price", render: (v) => `Rs ${v}` },
  ];

  const serviceColumns = [
    { title: "Service", dataIndex: "name" },
    {
      title: "Qty",
      dataIndex: "quantity",
      render: (_, record) => record.quantity || 1,
    },
    { title: "Price", dataIndex: "price", render: (v) => `Rs ${v}` },
  ];

  const handlePaid = async () => {
    if (!invoice) return;
    try {
      setLoading(true);
      await api.post(`/invoice/markPaid/${invoice._id}`, {
        payment_method: paymentMethod,
      });
      message.success("Invoice Clear Successfull");
      setFeedbackOpen(true);
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to Clear Invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={650}
        closable={false}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#000,#1a1200)",
            borderRadius: 10,
            padding: "30px 25px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            color: "#fff",
          }}
        >
          <Title level={6} style={{ color: "#d4af37", marginBottom: 10 }}>
            Invoice
          </Title>
          <Divider style={{ borderColor: "#444" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Title level={4} style={{ color: "#d4af37", margin: 0 }}>
              {user.name}
            </Title>

            <Title level={4} style={{ color: "#fff", margin: 0 }}>
              {user.email}
            </Title>
          </div>

          <Divider style={{ borderColor: "#444" }} />

          <Title level={5} style={{ color: "#d4af37" }}>
            Room Charges
          </Title>
          <Table
            columns={roomColumns}
            dataSource={invoice.room_charges}
            pagination={false}
            rowKey={(r, i) => i}
            size="small"
            style={{ color: "#fff" }}
            bordered={false}
          />

          <Divider style={{ borderColor: "#444" }} />

          <Title level={5} style={{ color: "#d4af37" }}>
            Service Charges
          </Title>
          {invoice.service_charges?.length > 0 ? (
            <Table
              columns={serviceColumns}
              dataSource={invoice.service_charges}
              pagination={false}
              rowKey={(s, i) => i}
              size="small"
              bordered={false}
            />
          ) : (
            <Text>No services used</Text>
          )}

          <Divider style={{ borderColor: "#444" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={4} style={{ color: "#d4af37" }}>
              Total Amount
            </Title>
            <Title level={4} style={{ color: "#fff" }}>
              Rs {invoice.total_amount}
            </Title>
          </div>

          <Divider style={{ borderColor: "#444" }} />

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {invoice.payment_status !== "Paid" && (
              <>
                <Select
                  value={paymentMethod}
                  onChange={(value) => setPaymentMethod(value)}
                  style={{
                    width: 150,
                    background: "#1a1200",
                    color: "#fff",
                    borderColor: "#d4af37",
                  }}
                  Style={{ background: "#000", color: "#fff" }}
                >
                  <Option value="Cash">Cash</Option>
                  <Option value="Credit Card">Credit Card</Option>
                  <Option value="Debit Card">Debit Card</Option>
                  <Option value="Online">Online</Option>
                </Select>

                <Button
                  onClick={handlePaid}
                  loading={loading}
                  style={{
                    background: "linear-gradient(135deg,#d4af37,#a67c00)",
                    color: "#000",
                    fontWeight: "bold",
                    border: "none",
                  }}
                >
                  Paid
                </Button>
              </>
            )}

            <Button
              onClick={onClose}
              style={{
                background: "#333",
                color: "#fff",
                border: "1px solid #d4af37",
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <FeedbackModal
        open={feedbackOpen}
        onClose={() => {
          setFeedbackOpen(false);
          refreshInvoices?.();
          onClose();
        }}
        userId={user.id}
        bookingId={invoice.booking_id}
      />
    </>
  );
};

export default InvoiceModal;
