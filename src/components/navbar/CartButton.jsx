import { FaBasketShopping } from "react-icons/fa6";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext";
import React, { useContext } from "react";
export default function CartButton({ count = 0, onClick }) {
  const { selectedProducts, getSelectedCount } =
    useContext(ProductContext);
  return (
    <Link to="/cart" onClick={onClick}>
      <button
        className={styles.cartIcon}
        type="button"
        aria-label="Open cart"
        onClick={onClick}
      >
        <FaBasketShopping aria-hidden="true" />
        <span className={styles.cartCount} aria-live="polite">
          {getSelectedCount()}
        </span>
      </button>
    </Link>
  );
}
