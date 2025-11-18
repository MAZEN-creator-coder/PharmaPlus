import React, { useEffect } from "react";
import styles from "./Toast.module.css";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {type === "success" && "✓ "}
      {type === "error" && "✕ "}
      {type === "info" && "ℹ "}
      {message}
    </div>
  );
}
