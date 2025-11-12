import React from "react";
import { AuthProvider } from "../context/AuthContext.jsx";
import { ProductProvider } from "../context/ProductContext.jsx";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        {children}
      </ProductProvider>
    </AuthProvider>
  );
}
