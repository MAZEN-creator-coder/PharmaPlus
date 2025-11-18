import { useContext, useState } from "react";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import Toast from "../../components/common/Toast";
import styles from "./ShoppingCart.module.css";
import { ProductContext } from "../../context/productContext";

export default function ShoppingCart({ onGoToCheckout }) {
  const [toast, setToast] = useState(null);

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    toggleItemSelected,
    setAllSelected,
    deleteSelectedItems,
    allSelected,
    subtotal,
    discount,
    deliveryFee,
    total,
  } = useContext(ProductContext);

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    setToast({ message: "Item removed from cart", type: "info" });
  };

  const handleDeleteSelected = () => {
    const count = cartItems.filter((item) => item.selected).length;
    deleteSelectedItems();
    setToast({
      message: `${count} item${count !== 1 ? "s" : ""} removed from cart`,
      type: "info",
    });
  };

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.container}>
        <h1 className={styles.title}>Your cart</h1>

        <div className={styles.content}>
          <CartItems
            items={cartItems}
            onQuantityChange={updateQuantity}
            onRemove={handleRemoveItem}
            onSelectItem={toggleItemSelected}
            onSelectAll={() => setAllSelected(!allSelected)}
            onDeleteSelected={handleDeleteSelected}
            allSelected={allSelected}
          />

          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
            onCheckout={() => onGoToCheckout && onGoToCheckout()}
          />
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
