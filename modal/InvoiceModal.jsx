import {
  Modal,
  Divider,
  Table,
  Typography,
  Button,
  Select,
  message,
} from "antd";
import { useState } from "react";
import { api } from "../api/axiosInstance";
import Cookies from "js-cookie";
import FeedbackModal from "./FeedbackModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const { Title, Text } = Typography;
const { Option } = Select;

const InvoiceModal = ({ open, onClose, invoice, refreshInvoices }) => {
  const [paymentMethod, setPaymentMethod] = useState(
    invoice?.payment_method || "Cash",
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
      const res = await api.post(`/invoice/markPaid/${invoice._id}`, {
        payment_method: paymentMethod,
      });
      message.success(res.data.message || "Invoice cleared successfully");
      setFeedbackOpen(true);

      handleDownloadPDF();
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to clear invoice");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;

    const logoUrl = "src/assets/logo.png";
    const logoWidth = 150;
    const logoHeight = 100;
    const logoY = 20;
    doc.addImage(
      logoUrl,
      "PNG",
      pageWidth / 2 - logoWidth / 2,
      logoY,
      logoWidth,
      logoHeight,
    );

    const titleTopMargin = 30;
    const titleY = logoY + logoHeight + titleTopMargin;
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("LuxuryStay Invoice", pageWidth / 2, titleY, { align: "center" });

    const infoSpacing = 20;
    let infoY = titleY + 30;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const infoTexts = [
      `Date: ${new Date().toLocaleDateString()}`,
      `Invoice ID: ${invoice._id}`,
      `Customer: ${user.name}`,
      `Email: ${user.email}`,
    ];

    infoTexts.forEach((text) => {
      if (infoY > pageHeight - margin) {
        doc.addPage();
        infoY = margin;
      }
      doc.text(text, margin, infoY);
      infoY += infoSpacing;
    });

    const tableMarginTop = 20;
    const roomData = invoice.room_charges.map((r, i) => [
      i + 1,
      r.number,
      r.type,
      `Rs ${r.price}`,
    ]);

    autoTable(doc, {
      head: [["#", "Room No", "Type", "Price"]],
      body: roomData,
      startY: infoY + tableMarginTop,
      theme: "grid",
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: 0,
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: { textColor: 0, halign: "center", fontSize: 12 },
      styles: { cellPadding: 6 },
    });

    if (invoice.service_charges?.length > 0) {
      const serviceData = invoice.service_charges.map((s, i) => [
        i + 1,
        s.name,
        s.quantity || 1,
        `Rs ${s.price}`,
      ]);

      autoTable(doc, {
        head: [["#", "Service", "Qty", "Price"]],
        body: serviceData,
        startY: doc.lastAutoTable.finalY + 20,
        theme: "grid",
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: 0,
          fontStyle: "bold",
          halign: "center",
        },
        bodyStyles: { textColor: 0, halign: "center", fontSize: 12 },
        styles: { cellPadding: 6 },
      });
    }

    let totalY = doc.lastAutoTable.finalY + 30;
    if (totalY > pageHeight - margin) {
      doc.addPage();
      totalY = margin;
    }
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: Rs ${invoice.total_amount}`, pageWidth - margin, totalY, {
      align: "right",
    });

    doc.save(`invoice-${invoice._id}.pdf`);
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={700}
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
          <Title level={4} style={{ color: "#d4af37", marginBottom: 10 }}>
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

          <Title level={4} style={{ color: "#d4af37" }}>
            Room Charges
          </Title>
          <Table
            columns={roomColumns}
            dataSource={invoice.room_charges}
            pagination={false}
            rowKey={(r) => r._id || r.number}
            size="small"
            bordered={false}
          />

          <Divider style={{ borderColor: "#444" }} />

          <Title level={4} style={{ color: "#d4af37" }}>
            Service Charges
          </Title>
          {invoice.service_charges?.length > 0 ? (
            <Table
              columns={serviceColumns}
              dataSource={invoice.service_charges}
              pagination={false}
              rowKey={(s) => s._id || s.name + s.quantity}
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
                  Paid & Download
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
