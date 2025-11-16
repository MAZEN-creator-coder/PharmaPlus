import React from "react";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ stock, status }) {
  const getStatus = () => {
    // Use backend status if available
    if (status) {
      if (status === "outOfStock")
        return { class: styles.out, text: "Out of Stock" };
      if (status === "lowStock")
        return { class: styles.low, text: "Low Stock" };
      if (status === "Available")
        return { class: styles.instock, text: "In Stock" };
    }

    // Fallback to stock-based calculation
    if (stock > 20) return { class: styles.instock, text: "InStock" };
    if (stock > 0) return { class: styles.low, text: "LowStock" };
    return { class: styles.out, text: "OutofStock" };
  };

  const statusInfo = getStatus();

  return (
    <span className={`${styles.badge} ${statusInfo.class}`}>
      {statusInfo.text}
    </span>
  );
}
