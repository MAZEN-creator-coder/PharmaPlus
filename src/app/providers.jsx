import React from "react";
import { AuthProvider } from "../context/AuthContext.jsx"; // AuthProvider
import { ProductProvider } from "../context/ProductContext.jsx";
import { OrderProvider } from "../context/OrderContext.jsx";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          {children}
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
