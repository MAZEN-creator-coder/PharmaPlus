import React, { useState } from "react";
import styles from "./EditModal.module.css";

export default function EditModal({ order, onClose, onSave }) {
  const [form, setForm] = useState({ ...order });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Edit Order</h3>
        <label>
          Customer Name:
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </label>
        <label>
          Total:
          <input name="total" value={form.total} onChange={handleChange} />
        </label>
        <div className={styles.buttons}>
          <button className={styles.save} onClick={() => onSave(form)}>Save</button>
          <button className={styles.cancel} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
