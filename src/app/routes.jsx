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
import ChatInterface from "../pages/chat/ChatInterface.jsx";
import OrderManagement from "../pages/OrderManagement/OrderManagement.jsx"
import PharmacyManagement from "../pages/super/pharmacies-management/PharmacyManagement.jsx";
import PharmacyDashboard from "../pages/Super Admin Global Analytics/GlobalPharmacyDashboard.jsx";
import ReportsOverview from "../pages/reportsoverview/reportsoverview.jsx";
export default function RoutesComponent({ onOpenLogin }) {
  return (
    <Routes>
      <Route element={<MainLayout onOpenLogin={onOpenLogin} />}>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/search-medicine" element={<SearchMedicine />} />
        <Route path="/upload-prescription" element={<UploadPrescription />} />
       

        {/* Protected for regular users only */}
        <Route element={<RequireRole allowed={['user']} />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* Protected for any logged-in user */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<MainPage />} />
          <Route path="/chat" element={<ChatInterface />} />
        </Route>

        {/* Admin-only */}
        <Route element={<RequireRole allowed={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/medicine-management" element={<MedicineManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
        </Route>

        {/* SuperAdmin-only */}
        <Route element={<RequireRole allowed={['superAdmin']} />}>
          <Route path="/super" element={<SuperAdminDashboard />} />
          <Route path="/super/pharmacies-management" element={<PharmacyManagement />} />
          <Route path="/super/reports" element={<ReportsOverview />} />
          <Route path="/super/global-analytics" element={<PharmacyDashboard />} />
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
