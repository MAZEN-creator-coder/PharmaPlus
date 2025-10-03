import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import EmptyLayout from "../layouts/EmptyLayout.jsx";
import SearchMedicine from "../pages/search-medicine/SearchMedicine.jsx";
import MainPage from "../pages/profile/MainPage.jsx";
import CartPage from "../pages/cart/CartPage.jsx";
import UploadPrescription from "../pages/uploadPrescreption/PrescriptionUpload.jsx"

export default function App() {
  return (
    <Routes>
      {/* With Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/search-medicine" element={<SearchMedicine />} />
        <Route
          path="/upload-prescription"
          element={<UploadPrescription />}
        />
        <Route path="/blog" element={<div>Blog</div>} />
        {/* Show copied profile page under navbar */}
        <Route path="/profile" element={<MainPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>

      {/* Without Navbar */}
      <Route element={<EmptyLayout />}></Route>

      {/* Error Page */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
