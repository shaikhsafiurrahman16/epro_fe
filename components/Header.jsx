import { Layout, Button } from "antd";

const { Header } = Layout;

export default function DashboardHeader() {
  return (
    <Header
      style={{
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #e5e7eb",
        height:"70px"
      }}
    >
      <Button
        style={{
          color: "#374151",
          background: "#fef3c7",
          border: "1px solid #fde68a",
          marginLeft: "auto",
          fontWeight: 500,
        }}
      >
        User Info
      </Button>
    </Header>
  );
}
