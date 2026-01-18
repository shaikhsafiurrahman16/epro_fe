import React, { useEffect, useState } from "react";
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

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

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

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/room/readall");
      setRooms(data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch rooms");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const openModal = (room = null) => {
    setEditingRoom(room);
    if (room) {
      form.setFieldsValue({
        room_number: room.room_number,
        room_type: room.room_type,
        room_price: room.room_price,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      if (editingRoom) {
        await api.put(`/room/update/${editingRoom._id}`, values);
        message.success("Room updated successfully");
      } else {
        await api.post("/room/create", values);
        message.success("Room added successfully");
      }
      fetchRooms();
      closeModal();
    } catch (error) {
      message.error(error.response?.data?.message || "Error saving room");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/room/delete/${id}`);
      message.success("Room deleted successfully");
      fetchRooms();
    } catch (error) {
      message.error("Failed to delete room");
    }
  };

  const handleStatusChange = async (id) => {
    try {
      await api.patch(`/room/change-status/${id}`);
      message.success("Room status updated");
      fetchRooms();
    } catch (error) {
      message.error("Failed to change status");
    }
  };

  const columns = [
    {
      title: "Room No",
      dataIndex: "room_number",
      key: "room_number",
    },
    {
      title: "Type",
      dataIndex: "room_type",
      key: "room_type",
    },
    {
      title: "Price",
      dataIndex: "room_price",
      key: "room_price",
      render: (price) => `Rs ${price}`,
    },
    {
      title: "Status",
      dataIndex: "room_status",
      key: "room_status",
      render: (_, record) => (
        <Button
          size="small"
          style={
            record.room_status === "Available"
              ? buttonPrimaryStyle
              : buttonOutlineStyle
          }
          onClick={() => handleStatusChange(record._id)}
        >
          {record.room_status}
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isBooked = record.room_status === "Booked";

        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              disabled={isBooked} 
              onClick={() => !isBooked && openModal(record)} 
            >
              Edit
            </Button>

            {isBooked ? (
              <Button danger icon={<DeleteOutlined />} disabled>
                Delete
              </Button>
            ) : (
              <Popconfirm
                title="Are you sure to delete this room?"
                onConfirm={() => handleDelete(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <Button
        icon={<PlusOutlined />}
        style={buttonPrimaryStyle}
        onClick={() => openModal()}
      >
        Add Room
      </Button>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={rooms}
        rowKey="_id"
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
            color: "#fff",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#d4af37" }}>
            {editingRoom ? "Edit Room" : "Add Room"}
          </h2>

          <Form form={form} layout="vertical" onFinish={handleSave}>
            <Form.Item
              label={<span style={labelStyle}>Room Number</span>}
              name="room_number"
              rules={[{ required: true, message: "Room number required" }]}
            >
              <Input type="number" placeholder="Enter room number" />
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Room Type</span>}
              name="room_type"
              rules={[{ required: true, message: "Select room type" }]}
            >
              <Select placeholder="Select type">
                <Option value="Single Bed">Single Bed</Option>
                <Option value="Double Bed">Double Bed</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<span style={labelStyle}>Room Price</span>}
              name="room_price"
              rules={[{ required: true, message: "Enter price" }]}
            >
              <Input type="number" placeholder="Enter price" />
            </Form.Item>

            <Form.Item>
              <Space style={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={closeModal} style={buttonOutlineStyle}>
                  Cancel
                </Button>
                <Button htmlType="submit" style={buttonPrimaryStyle}>
                  {editingRoom ? "Update" : "Add"}
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
