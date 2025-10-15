import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "../context/ProductContext.jsx";
import { OrderProvider } from "../context/OrderContext.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import EmptyLayout from "../layouts/EmptyLayout.jsx";
import SearchMedicine from "../pages/search-medicine/SearchMedicine.jsx";
import MainPage from "../pages/profile/MainPage.jsx";
import CartPage from "../pages/cart/CartPage.jsx";
import UploadPrescription from "../pages/uploadPrescreption/PrescriptionUpload.jsx";
import Homepage from "../pages/homepage/Homepage.jsx";
import LoginModal from "../pages/homepage/components/LoginModal";

export default function App() {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <ProductProvider>
      <OrderProvider>
        <Routes>
          {/* Pages with Navbar */}
          <Route element={<MainLayout onOpenLogin={() => setShowLogin(true)} />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/search-medicine" element={<SearchMedicine />} />
            <Route path="/upload-prescription" element={<UploadPrescription />} />
            <Route path="/blog" element={<div>Blog</div>} />
            <Route path="/profile" element={<MainPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>

          {/* Pages without Navbar */}
          <Route element={<EmptyLayout />}></Route>

          {/* Error Page */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>

        {/* Login Modal */}
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </OrderProvider>
    </ProductProvider>
  );
}
