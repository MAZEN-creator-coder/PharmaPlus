// src/app/App.jsx
import Navbar from "../components/navbar/Navbar.jsx";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/search-medicine" element={<div>Search Medicine</div>} />
        <Route
          path="/upload-prescription"
          element={<div>Upload Prescription</div>}
        />
        <Route path="/blog" element={<div>Blog</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}
