import React from "react";
import { Modal, Form, Rate, Input, Button } from "antd";

const { TextArea } = Input;

export default function FeedbackModal({ open, onClose }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Feedback Values:", values);
    form.resetFields();
    onClose();
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
        <p
          style={{
            textAlign: "center",
            color: "#ccc",
            marginBottom: 30,
          }}
        >
          Share your experience with us
        </p>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label={<span style={labelStyle}>Rating</span>}
            name="rating"
            // rules={[{ required: true, message: "Please give a rating" }]}
          >
            <Rate style={{ color: "#d4af37", fontSize: 24 }} allowClear />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>Remarks</span>}
            name="remarks"
          >
            <TextArea rows={4} placeholder="Write your feedback" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              size="large"
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
