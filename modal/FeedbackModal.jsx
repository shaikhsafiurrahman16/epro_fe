import React, { useState } from "react";
import { Modal, Form, Rate, Input, Button, message } from "antd";
import { api } from "../api/axiosInstance";

const { TextArea } = Input;

export default function FeedbackModal({ open, onClose, userId, bookingId }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    if (!userId || !bookingId) {
      message.error("User or booking information missing");
      return;
    }

    try {
      setLoading(true);
      await api.post("/feedback/create", {
        user_id: userId,
        booking_id: bookingId,
        rating: values.rating || 0,
        remarks: values.remarks || "",
      });

      message.success("Feedback submitted successfully");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={440}
      closable={false}
    >
      <div
        style={{
          background: "linear-gradient(135deg,#000,#1a1200)",
          borderRadius: 10,
          padding: "40px 35px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          color: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#d4af37",
            fontSize: 28,
            marginBottom: 10,
          }}
        >
          Give Feedback
        </h2>
        <p style={{ textAlign: "center", color: "#ccc", marginBottom: 30 }}>
          Share your experience with us
        </p>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label={<span style={labelStyle}>Rating</span>} name="rating">
            <Rate style={{ color: "#d4af37", fontSize: 24 }} allowClear />
          </Form.Item>

          <Form.Item label={<span style={labelStyle}>Remarks</span>} name="remarks">
            <TextArea rows={4} placeholder="Write your feedback" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{
                marginTop: 10,
                background: "linear-gradient(135deg,#d4af37,#a67c00)",
                border: "none",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

const labelStyle = {
  color: "#d4af37",
  fontWeight: 600,
};
