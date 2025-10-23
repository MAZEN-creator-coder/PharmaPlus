import React from "react";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ stock }) {
  const getStatus = () => {
    if (stock > 20) return { class: styles.instock, text: "In Stock" };
    if (stock > 0) return { class: styles.low, text: "Low Stock" };
    return { class: styles.out, text: "Out of Stock" };
  };

  const status = getStatus();

  return (
    <span className={`${styles.badge} ${status.class}`}>
      {status.text}
    </span>
  );
}