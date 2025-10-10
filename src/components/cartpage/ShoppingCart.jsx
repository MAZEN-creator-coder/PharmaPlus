import { useContext } from "react";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import styles from "./ShoppingCart.module.css";
import { ProductContext } from "../../context/productContext";

export default function ShoppingCart({ onGoToCheckout }) {
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

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.container}>
        <h1 className={styles.title}>Your cart</h1>

        <div className={styles.content}>
          <CartItems
            items={cartItems}
            onQuantityChange={updateQuantity}
            onRemove={removeFromCart}
            onSelectItem={toggleItemSelected}
            onSelectAll={() => setAllSelected(!allSelected)}
            onDeleteSelected={deleteSelectedItems}
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
    </div>
  );
}
