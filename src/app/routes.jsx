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
import EmailVerificationPending from "../pages/verify/EmailVerificationPending.jsx";
import VerifyEmailResult from "../pages/verify/VerifyEmailResult.jsx";
import ForgotPassword from "../pages/forgot-password/ForgotPassword.jsx";
import ResetPassword from "../pages/reset-password/ResetPassword.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import SuperAdminDashboard from "../pages/super/SuperAdminDashboard.jsx";
import { RequireAuth, RequireRole } from "../routes/guards.jsx";
import MedicineManagement from "../pages/admin/MedicineManagement.jsx";
import ChatInterface from "../pages/chat/ChatInterface.jsx";
import OrderManagement from "../pages/OrderManagement/OrderManagement.jsx";
import PharmacyManagement from "../pages/super/pharmacies-management/PharmacyManagement.jsx";
import PharmacyDashboard from "../pages/Super Admin Global Analytics/GlobalPharmacyDashboard.jsx";
import ReportsOverview from "../pages/reportsoverview/reportsoverview.jsx";
import PublicNotAdmin from "./PublicNotAdmin.jsx";
import ProductsRoute from "../pages/pharmacies/ProductsRoute.jsx";
export default function RoutesComponent({ onOpenLogin }) {
  return (
    <Routes>
      <Route element={<MainLayout onOpenLogin={onOpenLogin} />}>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route
          path="/search-medicine"
          element={
            <PublicNotAdmin>
              {" "}
              <SearchMedicine />{" "}
            </PublicNotAdmin>
          }
        />
        <Route
          path="/upload-prescription"
          element={
            <PublicNotAdmin>
              {" "}
              <UploadPrescription />{" "}
            </PublicNotAdmin>
          }
        />
        <Route
          path="/products"
          element={<ProductsRoute onOpenLogin={onOpenLogin} />}
        />

        {/* Protected for regular users only */}
        <Route element={<RequireRole allowed={["user"]} />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* Protected for any logged-in user */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<MainPage />} />
          <Route path="/chat" element={<ChatInterface />} />
        </Route>

        {/* Admin-only */}
        <Route element={<RequireRole allowed={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/medicine-management"
            element={<MedicineManagement />}
          />
          <Route path="/admin/orders" element={<OrderManagement />} />
        </Route>

        {/* SuperAdmin-only */}
        <Route element={<RequireRole allowed={["superadmin"]} />}>
          <Route path="/super" element={<SuperAdminDashboard />} />
          <Route
            path="/super/pharmacies-management"
            element={<PharmacyManagement />}
          />
          <Route path="/super/reports" element={<ReportsOverview />} />
          <Route
            path="/super/global-analytics"
            element={<PharmacyDashboard />}
          />
        </Route>
      </Route>

      {/* Pages without Navbar */}
      <Route element={<EmptyLayout />}>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/verify-email" element={<EmailVerificationPending />} />
        <Route path="/verify-email/:token" element={<VerifyEmailResult />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  );
}
