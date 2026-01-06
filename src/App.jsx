import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import "./index.css";
import Contact from "../pages/Contact";
import Booking from "../pages/Booking";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layout/DashboardLayout";
import BookingForGuest from "../pages/guest/Booking";
import SettingForGuest from "../pages/guest/Setting";
import DashboardForGuest from "../pages/guest/dashboard";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./PublicRoute";
import Room from "../pages/admin/Room";
import Service from "../pages/admin/Services";
import User from "../pages/admin/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/booking" element={<PublicRoute><Booking /></PublicRoute>} />
        <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/home" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DashboardForGuest />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/booking"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <BookingForGuest />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <SettingForGuest />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/room"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Room />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/service"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Service />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/user"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <User />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
