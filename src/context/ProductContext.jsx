import { useMemo, useState } from "react";
import { ProductContext } from "./productContext";

export function ProductProvider({ children }) {
  // Products selected from search list (source of truth for what's added to cart)
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Cart items with UI-specific state (quantity, selected)
  const [cartItems, setCartItems] = useState([]);

  // Toggle a product from search results (Add/Remove from cart)
  const toggleProduct = (product) => {
    const exists = selectedProducts.find((p) => p.id === product.id);

    if (exists) {
      // Remove from selected list
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
      // Remove corresponding cart item
      setCartItems((items) => items.filter((item) => item.id !== product.id));
    } else {
      // Add to selected list
      setSelectedProducts((prev) => [...prev, product]);
      // Add to cart with defaults (qty: 1, selected: true)
      setCartItems((items) => [
        ...items,
        {
          ...product,
          id: product.id,
          quantity: 1,
          selected: true,
        },
      ]);
    }
  };

  // Cart operations
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (id) => {
    // Remove from cart and also unselect from search-selected list
    setCartItems((items) => items.filter((item) => item.id !== id));
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleItemSelected = (id) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const setAllSelected = (selected) => {
    setCartItems((items) => items.map((item) => ({ ...item, selected })));
  };

  const deleteSelectedItems = () => {
    const toDeleteIds = new Set(cartItems.filter((i) => i.selected).map((i) => i.id));
    if (toDeleteIds.size === 0) return;
    setCartItems((items) => items.filter((item) => !toDeleteIds.has(item.id)));
    setSelectedProducts((prev) => prev.filter((p) => !toDeleteIds.has(p.id)));
  };

  // Derivations
  const selectedItems = useMemo(() => cartItems.filter((i) => i.selected), [cartItems]);
  const allSelected = useMemo(
    () => cartItems.length > 0 && cartItems.every((i) => i.selected),
    [cartItems]
  );
  const subtotal = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems]
  );
  const discount = useMemo(() => Math.round(subtotal * 0.2), [subtotal]);
  const deliveryFee = 15;
  const total = useMemo(() => subtotal - discount + deliveryFee, [subtotal, discount]);

  const getSelectedCount = () => selectedProducts.length;

  return (
    <ProductContext.Provider
      value={{
        // selection (search <-> cart linkage)
        selectedProducts,
        toggleProduct,
        getSelectedCount,

        // cart state
        cartItems,
        updateQuantity,
        removeFromCart,
        toggleItemSelected,
        setAllSelected,
        deleteSelectedItems,

        // derived
        selectedItems,
        allSelected,
        subtotal,
        discount,
        deliveryFee,
        total,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
