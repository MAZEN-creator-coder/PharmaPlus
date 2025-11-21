import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

import { useLocation } from "react-router-dom";

export default function MainLayout({ onOpenLogin }) {
  return (
    <>
      <Navbar onOpenLogin={onOpenLogin} fixed={true} />
      <div style={{ marginTop: 80 }}>
        <Outlet />
      </div>
    </>
  );
}
