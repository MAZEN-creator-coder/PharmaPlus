import { useState } from "react";
import { RiCoupon3Line, RiArrowRightLine } from "react-icons/ri";
import styles from "./OrderSummary.module.css";

export default function OrderSummary({
  subtotal,
  deliveryFee,
  total,
  onCheckout,
}) {
  const [couponCode, setCouponCode] = useState("");
  // Coupon input & apply are not implemented yet — disable UI elements and show discount as 0
  const effectiveDiscount = 0;
  const handleApplyCoupon = () => {
    // Handle coupon application logic
    console.log("Applying coupon:", couponCode);
  };

  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.title}>Order Summary</h3>

      {/* Coupon Code Section */}
      <div className={styles.couponSection}>
        <div className={styles.couponInputContainer}>
          <RiCoupon3Line className={styles.couponIcon} />
          <input
            type="text"
            placeholder="not implemented yet"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className={styles.couponInput}
            disabled
          />
        </div>
        <button
          onClick={handleApplyCoupon}
          className={styles.applyBtn}
          disabled
        >
          Apply
        </button>
      </div>

      {/* Summary Details */}
      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Discount</span>
          <span className={styles.discount}>-${effectiveDiscount}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Delivery Fee</span>
          <span>${deliveryFee}</span>
        </div>

        <hr className={styles.divider} />

        <div className={styles.totalRow}>
          <span>Total</span>
          <span className={styles.totalAmount}>${total}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className={styles.checkoutBtn} onClick={onCheckout}>
        <span>Go to Checkout</span>
        <RiArrowRightLine />
      </button>
    </div>
  );
}
