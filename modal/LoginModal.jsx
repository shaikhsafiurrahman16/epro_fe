import { Modal, Form, Input, Button } from "antd";

const LoginModal = ({ open, onClose }) => {
  const onFinish = (values) => {
    console.log("Login Data:", values);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={440}
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
            fontSize: 30,
            marginBottom: 10,
          }}
        >
          Welcome Back
        </h2>
        <p style={{ textAlign: "center", color: "#ccc", marginBottom: 30 }}>
          Login to continue your luxury journey
        </p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span style={labelStyle}>Email</span>}
            name="email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input size="large" placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>Password</span>}
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password size="large" placeholder="••••••••" />
          </Form.Item>

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
            Login
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

const labelStyle = {
  color: "#d4af37",
  fontWeight: 600,
};

export default LoginModal;
