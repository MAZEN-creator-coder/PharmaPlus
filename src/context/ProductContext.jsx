import { createContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

 
  const toggleProduct = (product) => {
    const exists = selectedProducts.find(p => p.id === product.id);

    if (exists) {
      setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
    } else {

      setSelectedProducts(prev => [...prev, product]);
    }
  };

 
  const getSelectedCount = () => selectedProducts.length;

  return (
    <ProductContext.Provider value={{ selectedProducts, toggleProduct, getSelectedCount }}>
      {children}
    </ProductContext.Provider>
  );
}
