import React, { useState, useEffect } from "react";
import styles from "./EditModal.module.css";

export default function EditModal({ order, onClose, onSave }) {
  const [status, setStatus] = useState(order?.status || "");

  useEffect(() => {
    setStatus(order?.status || "");
  }, [order]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Edit Order</h3>

        <label>
          Status:
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </label>

        <div className={styles.buttons}>
          <button
            className={styles.save}
            onClick={() => onSave(status)} 
          >
            Save
          </button>
          <button className={styles.cancel} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
