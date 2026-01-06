import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { api } from "../../api/axiosInstance";

export default function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [form] = Form.useForm();

  // === Button Styles (LuxuryStay Theme) ===
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

  // === Fetch Services ===
  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/service/read");
      setServices(data || []);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch services");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // === Open Modal ===
  const openModal = (service = null) => {
    setEditingService(service);
    if (service) {
      form.setFieldsValue({
        service_name: service.service_name,
        service_price: service.service_price,
        description: service.description,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // === Close Modal ===
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  // === Add / Update Service ===
  const handleSave = async (values) => {
    try {
      if (editingService) {
        await api.put(`/service/update/${editingService._id}`, values);
        message.success("Service updated successfully");
      } else {
        await api.post("/service/create", values);
        message.success("Service added successfully");
      }
      fetchServices();
      closeModal();
    } catch (error) {
      message.error(error.response?.data?.message || "Error saving service");
    }
  };

  // === Delete Service ===
  const handleDelete = async (id) => {
    try {
      await api.delete(`/service/delete/${id}`);
      message.success("Service deleted successfully");
      fetchServices();
    } catch (error) {
      message.error("Failed to delete service");
    }
  };

  // === Change Status ===
  const handleStatusChange = async (id) => {
    try {
      await api.patch(`/service/change-status/${id}`);
      message.success("Service status updated");
      fetchServices();
    } catch (error) {
      message.error("Failed to change status");
    }
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Price",
      dataIndex: "service_price",
      key: "service_price",
      render: (price) => `Rs ${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Button
          size="small"
          style={
            record.status === "Active"
              ? buttonPrimaryStyle
              : buttonOutlineStyle
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
        <Space>
          <Button
            icon={<EditOutlined />}
            style={buttonOutlineStyle}
            onClick={() => openModal(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete this service?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: "#fff", padding: 24, minHeight: "100vh" }}>
      <Button
        icon={<PlusOutlined />}
        style={{ ...buttonPrimaryStyle, marginBottom: 16 }}
        onClick={() => openModal()}
      >
        Add Service
      </Button>

      <Table
        columns={columns}
        dataSource={services}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
        centered
        closable={false}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#000,#1a1200)",
            borderRadius: 10,
            padding: "40px 35px",
            color: "#fff",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#d4af37" }}>
            {editingService ? "Edit Service" : "Add Service"}
          </h2>

          <Form form={form} layout="vertical" onFinish={handleSave}>
            <Form.Item
              label={<span style={labelStyle}>Service Name</span>}
              name="service_name"
              rules={[{ required: true, message: "Enter service name" }]}
            >
              <Input placeholder="Enter service name" />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Service Price</span>}
              name="service_price"
              rules={[{ required: true, message: "Enter price" }]}
            >
              <Input type="number" placeholder="Enter price" />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Description</span>}
              name="description"
            >
              <Input.TextArea rows={3} placeholder="Optional description" />
            </Form.Item>

            <Form.Item>
              <Space style={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={closeModal} style={buttonOutlineStyle}>
                  Cancel
                </Button>
                <Button htmlType="submit" style={buttonPrimaryStyle}>
                  {editingService ? "Update" : "Add"}
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
