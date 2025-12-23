import React, { useState } from "react";
import { Button } from "antd";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import bg from "../src/assets/bkg.jpg";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <div style={styles.navbar}>
        <div style={styles.logo}>LuxuryStay</div>

        <div>
          <Button style={{ marginRight: 10 }} onClick={() => setRegisterOpen(true)}>
            Register
          </Button>

          <Button type="primary" onClick={() => setLoginOpen(true)}>
            Login
          </Button>
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    zIndex: 1000,
    // **same background image as home**
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backdropFilter: "blur(6px)", // blur for readability
    backgroundColor: "rgba(0,0,0,0.35)", // semi-transparent overlay
  },
  logo: {
    fontSize: 36,
    fontWeight: 700,
    color: "#fff",
  },
};

export default Navbar;
