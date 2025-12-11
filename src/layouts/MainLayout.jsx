import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../pages/homepage/components/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function MainLayout({ onOpenLogin }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const shouldOpen =
      location && location.state && location.state.forceLoginModal;
    if (shouldOpen && typeof onOpenLogin === "function") {
      onOpenLogin();
      // Clear the navigation state so the modal doesn't reopen on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, onOpenLogin, navigate]);

  return (
    <>
      <Navbar onOpenLogin={onOpenLogin} fixed={true} />
      <div style={{ marginTop: 80 }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
