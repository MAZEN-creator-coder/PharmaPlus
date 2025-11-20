import React from "react";
import { useAuth } from "../../hooks/useAuth";
import ProductsLoginGuard from "./ProductsLoginGuard";
import PharmaciesPage from "./PharmaciesPage";

export default function ProductsRoute({ onOpenLogin }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <ProductsLoginGuard onOpenLogin={onOpenLogin} />;
  }
  return <PharmaciesPage />;
}
