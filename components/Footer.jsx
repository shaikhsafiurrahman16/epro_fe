import { Layout } from "antd";

const { Footer } = Layout;

export default function DashboardFooter() {
  return (
    <Footer
      style={{
        background: "#f9fafb",
        color: "#6b7280",
        textAlign: "center",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      © 2025 LuxuryStay — Aptech Eproject
    </Footer>
  );
}
