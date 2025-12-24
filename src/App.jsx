import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import "./index.css";
import Contact from "../pages/Contact";
import Booking from "../pages/Booking";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/guest/dashboard";
import Setting from "../pages/guest/Setting";
import BookingForGuest from "../pages/guest/Booking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/booking"
          element={
            <DashboardLayout>
              <BookingForGuest />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <DashboardLayout>
              <Setting />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
