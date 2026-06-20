import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import UploadPage from "../pages/UploadPage";
import GalleryPage from "../pages/GalleryPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      <Route
        path="/upload"
        element={<UploadPage />}
      />

      <Route
        path="/admin/login"
        element={<AdminLoginPage />}
      />

      <Route
        path="/admin/dashboard"
        element={<AdminDashboardPage />}
      />

      <Route
        path="/gallery"
        element={<GalleryPage />}
      />
    </Routes>

    
  );
}