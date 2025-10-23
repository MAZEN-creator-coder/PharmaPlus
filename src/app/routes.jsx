import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import EmptyLayout from "../layouts/EmptyLayout.jsx";
import SearchMedicine from "../pages/search-medicine/SearchMedicine.jsx";
import MainPage from "../pages/profile/MainPage.jsx";
import CartPage from "../pages/cart/CartPage.jsx";
import UploadPrescription from "../pages/uploadPrescreption/PrescriptionUpload.jsx";
import Homepage from "../pages/homepage/Homepage.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import SuperAdminDashboard from "../pages/super/SuperAdminDashboard.jsx";
import { RequireAuth, RequireRole } from "../routes/guards.jsx";
import MedicineManagement from "../pages/admin/MedicineManagement.jsx";

export default function RoutesComponent({ onOpenLogin }) {
  return (
    <Routes>
      <Route element={<MainLayout onOpenLogin={onOpenLogin} />}>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/search-medicine" element={<SearchMedicine />} />
        <Route path="/upload-prescription" element={<UploadPrescription />} />
        <Route path="/blog" element={<div>Blog</div>} />
        

        {/* Protected for any logged-in user */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* Admin-only */}
        <Route element={<RequireRole allowed={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/medicine-management" element={<MedicineManagement />} />
          <Route path="/admin/orders" element={<div>Orders</div>} />
          <Route path="/admin/users" element={<div>Manage Users</div>} />
        </Route>

        {/* SuperAdmin-only */}
        <Route element={<RequireRole allowed={['superAdmin']} />}>
          <Route path="/super" element={<SuperAdminDashboard />} />
        </Route>
      </Route>

      {/* Pages without Navbar */}
      <Route element={<EmptyLayout />}>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}
