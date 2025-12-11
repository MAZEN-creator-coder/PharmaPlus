import React from "react";
import { AuthProvider } from "../context/AuthContext.jsx";
import { ProductProvider } from "../context/ProductContext.jsx";
 import{ SearchMedicineProvider } from '../context/SearchMedicineContext';
export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <SearchMedicineProvider>
        {children}
        </SearchMedicineProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
