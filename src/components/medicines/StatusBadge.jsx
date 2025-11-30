import React from "react";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ stock, status, threshold }) {
  const getStatus = () => {
    // Prefer stock-based calculation when stock is available
    const numericStock = Number(stock);
    const th = !Number.isNaN(Number(threshold)) ? Number(threshold) : 10;
    if (!Number.isNaN(numericStock)) {
      if (numericStock <= 0) return { class: styles.out, text: "OutofStock" };
      if (numericStock <= th) return { class: styles.low, text: "Low Stock" };
      return { class: styles.instock, text: "In Stock" };
    }

    // Fallback to backend status if stock is not available
    if (status) {
      const s = String(status).toLowerCase();
      if (s.includes("out")) return { class: styles.out, text: "Out of Stock" };
      if (s.includes("low")) return { class: styles.low, text: "Low Stock" };
      if (s.includes("avail") || s.includes("instock"))
        return { class: styles.instock, text: "In Stock" };
    }

    // Default to out if we don't know
    return { class: styles.out, text: "Out of Stock" };
  };

  const statusInfo = getStatus();

  return (
    <span className={`${styles.badge} ${statusInfo.class}`}>
      {statusInfo.text}
    </span>
  );
}
