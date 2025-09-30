import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import EmptyLayout from "../layouts/EmptyLayout.jsx";
import SearchMedicine from "../pages/search-medicine/SearchMedicine.jsx";
import Profile from "../pages/profile/Profile.jsx";

export default function App() {
  return (
    <Routes>
      {/* With Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/search-medicine" element={<SearchMedicine />} />
        <Route
          path="/upload-prescription"
          element={<div>Upload Prescription</div>}
        />
        <Route path="/blog" element={<div>Blog</div>} />
      </Route>

      {/* Without Navbar */}
      <Route element={<EmptyLayout />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Error Page */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
