import { FaBasketShopping } from "react-icons/fa6";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function CartButton({ count = 0, onClick }) {
  return (
    <Link to="/cart" onClick={onClick}>
      <button className={styles.cartIcon} type="button" aria-label="Open cart" onClick={onClick}>
        <FaBasketShopping aria-hidden="true" />
        <span className={styles.cartCount} aria-live="polite">
          {count}
        </span>
      </button>
  </Link>
);
}