import { Card, Form, Input, Button, Switch, Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

export default function Settings() {
  const onFinishProfile = (values) => {
    console.log("Profile", values);
  };

  const onFinishPassword = (values) => {
    console.log("Password", values);
  };

  return (
    <div>
      <Title level={2} style={{ color: "#d4af37" }}>
        Settings
      </Title>
      <Paragraph style={{ color: "#aaa" }}>
        Manage your profile & account preferences
      </Paragraph>

      <Card style={cardStyle}>
        <Title level={4} style={titleStyle}>
          Profile Information
        </Title>

        <Form layout="vertical" onFinish={onFinishProfile}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={primaryBtn}>
            Save Profile
          </Button>
        </Form>
      </Card>

      <Divider style={{ borderColor: "#2a2a2a" }} />

      {/* Password Settings */}
      <Card style={cardStyle}>
        <Title level={4} style={titleStyle}>
          Change Password
        </Title>

        <Form layout="vertical" onFinish={onFinishPassword}>
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={primaryBtn}>
            Update Password
          </Button>
        </Form>
      </Card>
    </div>
  );
}

const cardStyle = {
  background: "#1c1c1c",
  borderRadius: 18,
  border: "1px solid #2a2a2a",
  marginBottom: 30,
};

const titleStyle = {
  color: "#d4af37",
};

const labelStyle = {
  color: "#ccc",
  marginBottom: 8,
};

const primaryBtn = {
  background: "linear-gradient(135deg,#d4af37,#a67c00)",
  border: "none",
  fontWeight: "bold",
};
