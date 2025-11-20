import React from "react";
import styles from "./ProductsLoginGuard.module.css";

export default function ProductsLoginGuard({ onOpenLogin }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className={styles.icon}>
          <circle cx="12" cy="12" r="12" fill="#018994" opacity="0.12" />
          <path d="M12 17a2 2 0 0 1-2-2v-1a2 2 0 0 1 4 0v1a2 2 0 0 1-2 2zm0-8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="#018994" />
        </svg>
        <h2 className={styles.title}>Login Required</h2>
        <p className={styles.desc}>
          You need to login to view products. Please sign in to continue.
        </p>
        <button className={styles.loginBtn} onClick={onOpenLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
