import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "../../api/axiosInstance";

const { Option } = Select;

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form] = Form.useForm();

  const buttonPrimaryStyle = {
    background: "linear-gradient(135deg,#d4af37,#a67c00)",
    border: "none",
    fontWeight: "bold",
    color: "#000",
  };
  
  const buttonOutlineStyle = {
    background: "transparent",
    border: "2px solid #d4af37",
    color: "#d4af37",
    fontWeight: "bold",
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/user/read");
      setUsers(Array.isArray(data) ? data : data.users || []);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (values) => {
    try {
      if (editingUser && !values.password) {
        delete values.password;
      }

      if (editingUser) {
        await api.put(`/user/update/${editingUser._id}`, values);
        message.success("User updated successfully");
      } else {
        await api.post("/user/create", values);
        message.success("User created successfully");
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      message.error(error.response?.data?.message || "Error saving user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/delete/${id}`);
      message.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleStatusChange = async (id) => {
    try {
      await api.post(`/user/change-status/${id}`);
      message.success("User status updated");
      fetchUsers();
    } catch (error) {
      message.error("Failed to change status");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Button
          type={record.status === "Active" ? "primary" : "default"}
          size="small"
          style={
            record.status === "Active" ? buttonPrimaryStyle : buttonOutlineStyle
          }
          onClick={() => handleStatusChange(record._id)}
        >
          {record.status}
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space orientation="horizontal">
          <Button
            icon={<EditOutlined />}
            style={buttonOutlineStyle}
            onClick={() => openModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              style={{ fontWeight: "bold" }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: "#fff", padding: 24, minHeight: "100vh" }}>
      <Space style={{ marginBottom: 16 }} orientation="horizontal">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={buttonPrimaryStyle}
          onClick={() => openModal()}
        >
          Add User
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={users}
        rowKey={(record) => record._id}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        closable={false}
        centered
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
            {editingUser ? "Edit User" : "Add User"}
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#ccc",
              marginBottom: 30,
            }}
          >
            {editingUser
              ? "Update user information"
              : "Fill in the details to add a new user"}
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={{ role: "Guest" }}
          >
            <Form.Item
              label={<span style={labelStyle}>Name</span>}
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Phone</span>}
              name="phone"
              rules={[{ required: true, message: "Please enter phone" }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            {/* {!editingUser && ( */}
            <Form.Item
              label={<span style={labelStyle}>Password</span>}
              name="password"
              rules={
                editingUser
                  ? [] // No rules on edit, optional
                  : [{ required: true, message: "Please enter password" }] // Required only on add
              }
            >
              <Input.Password
                placeholder={
                  editingUser
                    ? "Leave blank to keep current password"
                    : "Enter password"
                }
              />
            </Form.Item>
            {/* )} */}

            <Form.Item label={<span style={labelStyle}>Role</span>} name="role">
              <Select>
                <Option value="Admin">Admin</Option>
                <Option value="Staff">Staff</Option>
                <Option value="Guest">Guest</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space style={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={closeModal} style={buttonOutlineStyle}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={buttonPrimaryStyle}
                >
                  {editingUser ? "Update" : "Add"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

const labelStyle = {
  color: "#d4af37",
  fontWeight: 600,
};
