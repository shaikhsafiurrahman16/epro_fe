import { Modal, Form, Input, Button, message } from "antd";
import { api } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RegisterModal = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await api.post("/auth/signup", values);

      message.success(res.data.message || "Registered Successfully");

      if (res.data.token) localStorage.setItem("token", res.data.token);

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      localStorage.setItem("User", JSON.stringify(decoded));

      form.resetFields();
      onClose();
      navigate("/dashboard");
    } catch (error) {
      message.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
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
            fontSize: 30,
            marginBottom: 10,
          }}
        >
          Create Account
        </h2>

        <p style={{ textAlign: "center", color: "#ccc", marginBottom: 30 }}>
          Join LuxuryStay & experience comfort
        </p>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label={<span style={labelStyle}>Full Name</span>}
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input size="large" placeholder="Enter Your Name" />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>Email</span>}
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email" },
            ]}
          >
            <Input size="large" placeholder="example@email.com" />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>Phone</span>}
            name="phone"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input size="large" placeholder="+92 300 1234567" />
          </Form.Item>

          <Form.Item
            label={<span style={labelStyle}>Password</span>}
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password size="large" placeholder="••••••" />
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
            Register
          </Button>
        </Form>

        <p style={{ marginTop: 20, textAlign: "center", color: "#ccc" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#d4af37", cursor: "pointer", fontWeight: 600 }}
            onClick={() => {
              onClose();
            }}
          >
            Login here
          </span>
        </p>
      </div>
    </Modal>
  );
};

const labelStyle = { color: "#d4af37", fontWeight: 600 };
export default RegisterModal;
