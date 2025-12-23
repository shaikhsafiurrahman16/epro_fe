// import React, { useState } from "react";
// import { Layout, Typography, Button, Form, Input } from "antd";
// import LoginModal from "../modal/LoginModal";
// import RegisterModal from "../modal/RegisterModal";
// import { Link } from "react-router-dom";
// import bg from "../src/assets/bkg.jpg";

// const { Header, Content } = Layout;
// const { Title } = Typography;
// const NAVBAR_HEIGHT = 70;

// const Contact = () => {
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [registerOpen, setRegisterOpen] = useState(false);

//   const onFinish = (values) => {
//     console.log("Contact Form Data:", values);
//   };

//   return (
//     // <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
//     <Layout
//       style={{
//         minHeight: "100vh",
//         background: `url(${bg}) center/cover no-repeat`,
//       }}
//     >
//       <Header
//         style={{
//           height: NAVBAR_HEIGHT,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "0 10px",
//           backgroundColor: "#00000044",
//           zIndex: 1000,
//         }}
//       >
//         <div
//           style={{
//             fontSize: 36,
//             fontWeight: 700,
//             color: "#684b15ff",
//             marginLeft: "40px",
//           }}
//         >
//           LuxuryStay
//         </div>
//         <div>
//           <Link to="/">
//             <Button type="default" style={{ marginRight: 10 }}>
//               Home
//             </Button>
//           </Link>
//           {/* <Link to="/about">
//             <Button type="default" style={{ marginRight: 10 }}>
//               About
//             </Button>
//           </Link> */}
//           <Link to="/contact">
//             <Button type="default" style={{ marginRight: 10 }}>
//               Contact
//             </Button>
//           </Link>

//           <Button
//             type="primary"
//             style={{ marginRight: 10 }}
//             onClick={() => setRegisterOpen(true)}
//           >
//             Register
//           </Button>
//           <Button
//             type="primary"
//             onClick={() => setLoginOpen(true)}
//             style={{ marginRight: "40px" }}
//           >
//             Login
//           </Button>
//         </div>
//       </Header>

//       <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
//       <RegisterModal
//         open={registerOpen}
//         onClose={() => setRegisterOpen(false)}
//       />

//       <Content
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "50px 20px",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: 600,
//             width: "100%",
//             backgroundColor: "#ffffff",
//             padding: "40px",
//             borderRadius: "15px",
//             boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//           }}
//         >
//           <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
//             Contact Us
//           </Title>

//           <Form layout="vertical" onFinish={onFinish} style={{ width: "100%", background:"blur" }}>
//             <Form.Item
//               label="Full Name"
//               name="name"
//               rules={[{ required: true, message: "Please enter your name" }]}
//             >
//               <Input placeholder="John Doe" size="large" />
//             </Form.Item>

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { required: true, message: "Please enter your email" },
//                 { type: "email", message: "Please enter a valid email" },
//               ]}
//             >
//               <Input placeholder="example@email.com" size="large" />
//             </Form.Item>

//             <Form.Item
//               label="Phone Number"
//               name="phone"
//               rules={[
//                 { required: true, message: "Please enter your phone number" },
//               ]}
//             >
//               <Input placeholder="+123 456 7890" size="large" />
//             </Form.Item>

//             <Form.Item
//               label="Message"
//               name="message"
//               rules={[{ required: true, message: "Please write your message" }]}
//             >
//               <Input.TextArea
//                 placeholder="Your message here..."
//                 rows={5}
//                 size="large"
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit" size="large" block>
//                 Send Message
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </Content>
//     </Layout>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import { Layout, Typography, Button, Form, Input, Space } from "antd";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import { Link } from "react-router-dom";
import bg from "../src/assets/bkg.jpg";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const NAVBAR_HEIGHT = 70;

const Contact = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const onFinish = (values) => {
    console.log("Contact Form Data:", values);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: NAVBAR_HEIGHT,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 50px",
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#d4af37",
            letterSpacing: 1,
          }}
        >
          LuxuryStay
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <Link to="/">
            <Button
              type="text"
              style={{
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Home
            </Button>
          </Link>
          {/* <Link to="/about">
                  <Button type="text" style={{ color: "#fff", fontWeight: 600 }}>
                    About
                  </Button>
                </Link> */}
          <Link to="/contact">
            <Button type="text" style={{ color: "#fff", fontWeight: 600 }}>
              Contact
            </Button>
          </Link>

          <Button
            type="primary"
            onClick={() => setRegisterOpen(true)}
            style={{
              marginLeft: 10,
              background: "linear-gradient(135deg,#d4af37,#a67c00)",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Button>
          <Button
            type="default"
            onClick={() => setLoginOpen(true)}
            style={{
              marginLeft: 10,
              border: "2px solid #d4af37",
              color: "#d4af37",
              background: "transparent",
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        </div>
      </Header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />

      <Content>
        <div
          style={{
            height: 360,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
            <Title style={{ color: "#d4af37", fontSize: 50 }}>
              Contact
            </Title>
            <Paragraph style={{ color: "#eee", fontSize: 18 }}>
              We’d love to hear from you
            </Paragraph>
          </div>
        </div>
        <div
          style={{
            padding: "80px 40px",
            background: "linear-gradient(135deg,#fff,#fff6e5)",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 50,
          }}
        >
          <div
            style={{
              width: 420,
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              padding: 40,
              borderRadius: 24,
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <Title level={3} style={{ textAlign: "center", color: "#a67c00" }}>
              Send Us a Message
            </Title>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="John Doe" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input size="large" placeholder="example@email.com" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={4} placeholder="Write your message..." />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  background: "linear-gradient(135deg,#d4af37,#a67c00)",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                Send Message
              </Button>
            </Form>
          </div>

          <div style={{ maxWidth: 420 }}>
            <Title level={3} style={{ color: "#a67c00" }}>
              Get In Touch
            </Title>

            <Space direction="vertical" size="large">
              {[
                { title: "📞 Phone", value: "+92 300 1234567" },
                { title: "📧 Email", value: "info@luxurystay.com" },
                { title: "📍 Location", value: "Islamabad, Pakistan" },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#fff",
                    padding: 24,
                    borderRadius: 18,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  <Title level={5} style={{ color: "#d4af37" }}>
                    {item.title}
                  </Title>
                  <Paragraph>{item.value}</Paragraph>
                </div>
              ))}
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Contact;
