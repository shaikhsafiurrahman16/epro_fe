import React from "react";
import { Card, Form, Input, Button } from "antd";

export default function SettingForGuest() {
  return (
      <Card title="Profile Settings" style={{ maxWidth: 500 }}>
        <Form layout="vertical">
          <Form.Item label="Hotel Name">
            <Input placeholder="LuxuryStay Hotel" />
          </Form.Item>

          <Form.Item label="Email">
            <Input placeholder="admin@luxurystay.com" />
          </Form.Item>

          <Form.Item label="Phone">
            <Input placeholder="03xxxxxxxxx" />
          </Form.Item>

          <Button type="primary">Save Changes</Button>
        </Form>
      </Card>
  );
}
