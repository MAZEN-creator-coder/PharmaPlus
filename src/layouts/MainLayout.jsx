import Navbar from "../components/navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar /> 
      <Outlet />   
    </>
  );
}
