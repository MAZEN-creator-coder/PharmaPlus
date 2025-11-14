
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
export default function PublicNotAdmin({ children }) {
  const { user } = useAuth(); 
  const role = user?.role; 
  if (role === "admin" || role === "superadmin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
