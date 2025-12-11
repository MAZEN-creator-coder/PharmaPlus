import { useMemo, useState, useContext } from "react";
import {
  RiBankCard2Line,
  RiMoneyDollarCircleLine,
  RiUser3Line,
  RiPhoneLine,
  RiMapPin2Line,
  RiBuilding2Line,
  RiNumber1,
  RiCalendar2Line,
  RiLock2Line,
} from "react-icons/ri";
import { ProductContext } from "../../context/productContext.js";
import { createOrder } from "../../shared/api/orderApi.js";
import Toast from "../common/Toast.jsx";
import styles from "./CheckoutDetails.module.css";

export default function CheckoutDetails({ onPlaceOrder, onBack }) {
  const { clearCart, selectedItems } = useContext(ProductContext);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    postal: "",
    additionalDirections: "",
  });
  const [card, setCard] = useState({
    holder: "",
    number: "",
    exp: "",
    cvc: "",
  });
  const [note, setNote] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const trimmed = useMemo(
    () => ({
      address: {
        name: address.name.trim(),
        phone: address.phone.trim(),
        street: address.street.trim(),
        city: address.city.trim(),
        postal: address.postal.trim(),
        additionalDirections: address.additionalDirections.trim(),
      },
      card: {
        holder: card.holder.trim(),
        number: card.number.replace(/\s+/g, "").trim(),
        exp: card.exp.trim(),
        cvc: card.cvc.trim(),
      },
    }),
    [address, card]
  );

  const errors = useMemo(() => {
    const e = {};
    if (!trimmed.address.name) e.name = "Required";
    if (!trimmed.address.phone || trimmed.address.phone.length < 7)
      e.phone = "Invalid phone";
    if (!trimmed.address.street) e.street = "Required";
    if (!trimmed.address.city) e.city = "Required";
    if (!trimmed.address.postal) e.postal = "Required";
    // additionalDirections is optional - no validation needed
    if (paymentMethod === "card") {
      if (!trimmed.card.holder) e.holder = "Required";
      if (!/^\d{12,19}$/.test(trimmed.card.number)) e.number = "Invalid card";
      if (!/^\d{2}\/\d{2}$/.test(trimmed.card.exp)) e.exp = "MM/YY";
      if (!/^\d{3,4}$/.test(trimmed.card.cvc)) e.cvc = "3-4 digits";
    }
    return e;
  }, [trimmed, paymentMethod]);

  const canPlace = useMemo(
    () => Object.keys(errors).length === 0 && selectedItems.length > 0,
    [errors, selectedItems]
  );

  const handlePlaceOrder = async () => {
    if (!canPlace) {
      setShowErrors(true);
      return;
    }

    setLoading(true);
    try {
      // Get user data from localStorage
      const userStr = localStorage.getItem("pharmaplus_user");
      const user = userStr ? JSON.parse(userStr) : null;
      const userId = user?._id || user?.id;
      const token = localStorage.getItem("pharmaplus_token");

      if (!userId) {
        setToast({
          message: "User not found. Please login again.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      // Get the pharmacy from the first selected item
      const firstItem = selectedItems[0];
      const pharmacyId = firstItem?.pharmacyId || firstItem?.pharmacy?._id || firstItem?.pharmacy;

      if (!pharmacyId) {
        setToast({
          message: "Pharmacy information not found. Please add items again.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      // Build order payload with selected items only
      const orderData = {
        userId,
        pharmacyId,
        items: selectedItems.map((item) => ({
          medicine: item._id || item.id,
          quantity: item.quantity || 1,
        })),
        address: trimmed.address,
        paymentMethod,
        total: (
          selectedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ) -
          selectedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ) *
            0.2 +
          15
        ).toFixed(2),
      };

      // Create order via API
      const res = await createOrder(orderData, token);

      // Clear cart after successful order
      clearCart();

      // Prefer backend message when available for better UX
      const successMsg =
        res?.data?.msg || res?.message || "Order placed successfully!";
      setToast({ message: successMsg, type: "success" });

      // Navigate to success page after a short delay
      setTimeout(() => {
        onPlaceOrder && onPlaceOrder();
      }, 1500);
    } catch (error) {
      console.error("Order creation failed:", error);
      const errorMsg =
        error.message || "Failed to place order. Please try again.";
      setToast({ message: errorMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Checkout Details</h2>
      <div className={styles.grid}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Shipping Address</h3>
          <div className={styles.formGrid}>
            <div className={`${styles.inputWrap} ${styles.col6}`}>
              <RiUser3Line className={styles.inputIcon} />
              <input
                className={styles.input}
                placeholder="Full Name"
                value={address.name}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, name: e.target.value }))
                }
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                required
              />
              {(showErrors || touched.name) && errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>
            <div className={`${styles.inputWrap} ${styles.col6}`}>
              <RiPhoneLine className={styles.inputIcon} />
              <input
                className={styles.input}
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, phone: e.target.value }))
                }
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                required
              />
              {(showErrors || touched.phone) && errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
            </div>
            <div className={`${styles.inputWrap} ${styles.col12}`}>
              <RiMapPin2Line className={styles.inputIcon} />
              <input
                className={styles.input}
                placeholder="Street Address"
                value={address.street}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, street: e.target.value }))
                }
                onBlur={() => setTouched((t) => ({ ...t, street: true }))}
                required
              />
              {(showErrors || touched.street) && errors.street && (
                <span className={styles.error}>{errors.street}</span>
              )}
            </div>
            <div className={`${styles.inputWrap} ${styles.col4}`}>
              <RiBuilding2Line className={styles.inputIcon} />
              <input
                className={styles.input}
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, city: e.target.value }))
                }
                onBlur={() => setTouched((t) => ({ ...t, city: true }))}
                required
              />
              {(showErrors || touched.city) && errors.city && (
                <span className={styles.error}>{errors.city}</span>
              )}
            </div>
            <div className={`${styles.inputWrap} ${styles.col4}`}>
              <RiBuilding2Line className={styles.inputIcon} />
              <input
                className={styles.input}
                placeholder="Postal Code"
                value={address.postal}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, postal: e.target.value }))
                }
                onBlur={() => setTouched((t) => ({ ...t, postal: true }))}
                required
              />
              {(showErrors || touched.postal) && errors.postal && (
                <span className={styles.error}>{errors.postal}</span>
              )}
            </div>
            <div className={`${styles.inputWrap} ${styles.col4}`}>
              <RiMapPin2Line className={styles.inputIcon} />
              <input
                className={styles.input}
                placeholder="Additional Directions (optional)"
                value={address.additionalDirections}
                onChange={(e) =>
                  setAddress((a) => ({
                    ...a,
                    additionalDirections: e.target.value,
                  }))
                }
                onBlur={() =>
                  setTouched((t) => ({ ...t, additionalDirections: true }))
                }
              />
              {(showErrors || touched.additionalDirections) &&
                errors.additionalDirections && (
                  <span className={styles.error}>
                    {errors.additionalDirections}
                  </span>
                )}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Payment Method</h3>
          <div className={styles.paymentOptions}>
            <button
              type="button"
              className={`${styles.option} ${
                paymentMethod === "card" ? styles.optionSelected : ""
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <RiBankCard2Line />
              <span>Credit / Debit Card</span>
            </button>
            <button
              type="button"
              className={`${styles.option} ${
                paymentMethod === "cash" ? styles.optionSelected : ""
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              <RiMoneyDollarCircleLine />
              <span>Cash on Delivery</span>
            </button>
          </div>

          {paymentMethod === "card" && (
            <div className={styles.formGrid}>
              <div className={`${styles.inputWrap} ${styles.col6}`}>
                <RiUser3Line className={styles.inputIcon} />
                <input
                  className={styles.input}
                  placeholder="Cardholder Name"
                  value={card.holder}
                  onChange={(e) =>
                    setCard((c) => ({ ...c, holder: e.target.value }))
                  }
                  onBlur={() => setTouched((t) => ({ ...t, holder: true }))}
                />
                {(showErrors || touched.holder) && errors.holder && (
                  <span className={styles.error}>{errors.holder}</span>
                )}
              </div>
              <div className={`${styles.inputWrap} ${styles.col6}`}>
                <RiBankCard2Line className={styles.inputIcon} />
                <input
                  className={styles.input}
                  placeholder="Card Number"
                  value={card.number}
                  onChange={(e) =>
                    setCard((c) => ({ ...c, number: e.target.value }))
                  }
                  onBlur={() => setTouched((t) => ({ ...t, number: true }))}
                />
                {(showErrors || touched.number) && errors.number && (
                  <span className={styles.error}>{errors.number}</span>
                )}
              </div>
              <div className={`${styles.inputWrap} ${styles.col6}`}>
                <RiCalendar2Line className={styles.inputIcon} />
                <input
                  className={styles.input}
                  placeholder="MM/YY"
                  value={card.exp}
                  onChange={(e) =>
                    setCard((c) => ({ ...c, exp: e.target.value }))
                  }
                  onBlur={() => setTouched((t) => ({ ...t, exp: true }))}
                />
                {(showErrors || touched.exp) && errors.exp && (
                  <span className={styles.error}>{errors.exp}</span>
                )}
              </div>
              <div className={`${styles.inputWrap} ${styles.col6}`}>
                <RiLock2Line className={styles.inputIcon} />
                <input
                  className={styles.input}
                  placeholder="CVC"
                  value={card.cvc}
                  onChange={(e) =>
                    setCard((c) => ({ ...c, cvc: e.target.value }))
                  }
                  onBlur={() => setTouched((t) => ({ ...t, cvc: true }))}
                />
                {(showErrors || touched.cvc) && errors.cvc && (
                  <span className={styles.error}>{errors.cvc}</span>
                )}
              </div>
            </div>
          )}

          {paymentMethod === "cash" && (
            <div className={styles.cashBox}>
              <p className={styles.cashNote}>
                Please prepare cash amount. Our rider will collect payment upon
                delivery.
              </p>
              <textarea
                className={styles.textarea}
                placeholder="Notes for the rider (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          )}
        </section>
      </div>

      <div className={styles.actions}>
        <button className={styles.backBtn} onClick={onBack} disabled={loading}>
          Back to Cart
        </button>
        <button
          className={`${styles.placeOrderBtn} ${
            !canPlace || loading ? styles.btnDisabled : ""
          }`}
          onClick={handlePlaceOrder}
          disabled={!canPlace || loading}
          title={!canPlace ? "Complete required fields" : ""}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
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
