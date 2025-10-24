import React from "react";
import styles from "./CancelModal.module.css";

export default function CancelModal({ order, onClose, onConfirm }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Cancel Order</h3>
        <p>Are you sure you want to cancel order <strong>{order.id}</strong>?</p>
        <div className={styles.buttons}>
          <button className={styles.confirm} onClick={onConfirm}>Cancel</button>
          <button className={styles.close} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}
