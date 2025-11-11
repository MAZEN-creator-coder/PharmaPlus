import React from "react";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ stock }) {
  const getStatus = () => {
    if (stock > 20) return { class: styles.instock, text: "InStock" };
    if (stock > 0) return { class: styles.low, text: "LowStock" };
    return { class: styles.out, text: "OutofStock" };
  };

  const status = getStatus();

  return (
    <span className={`${styles.badge} ${status.class}`}>
      {status.text}
    </span>
  );
}