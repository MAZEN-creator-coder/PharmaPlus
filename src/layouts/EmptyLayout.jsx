import { Outlet } from "react-router-dom";
import Footer from "../pages/homepage/components/Footer";

export default function EmptyLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );  // without Navbar
}
