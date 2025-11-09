import { FaBasketShopping } from "react-icons/fa6";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/productContext";
import { useAuth } from "../../hooks/useAuth";
import React, { useContext } from "react";

export default function CartButton({ onOpenLogin }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getSelectedCount } = useContext(ProductContext);

  // Hide cart for admin and superAdmin roles
  if (user?.role === 'admin' || user?.role === 'superAdmin') {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      onOpenLogin();
    } else {
      navigate('/cart');
    }
  };

  return (
    <button
      className={styles.cartIcon}
      type="button"
      aria-label="Open cart"
      onClick={handleClick}
    >
      <FaBasketShopping aria-hidden="true" />
      <span className={styles.cartCount} aria-live="polite">
        {getSelectedCount()}
      </span>
    </button>
  );
}
