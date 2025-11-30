import React from "react";
import styles from "./DetailsModal.module.css";

export default function DetailsModal({ order, onClose, isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div>Loading order details…</div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const { date, status, paymentMethod, address, items } = order;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Order Details</h3>

        <div className={styles.row}>
          <strong>Date:</strong>
          <span>{date ? new Date(date).toLocaleString() : "N/A"}</span>
        </div>

        <div className={styles.row}>
          <strong>Status:</strong>
          <span>{status || "N/A"}</span>
        </div>

        <div className={styles.row}>
          <strong>Payment Method:</strong>
          <span>{paymentMethod || "N/A"}</span>
        </div>

        <div className={styles.sectionTitle}>Address</div>
        <div className={styles.addressBlock}>
          <div>
            <strong>Street:</strong>
            <div>{address?.street || "N/A"}</div>
          </div>
          <div>
            <strong>City:</strong>
            <div>{address?.city || "N/A"}</div>
          </div>
          <div>
            <strong>Additional Directions:</strong>
            <div>{address?.additionalDirections || "N/A"}</div>
          </div>
          <div>
            <strong>Phone:</strong>
            <div>{address?.phone || "N/A"}</div>
          </div>
        </div>

        <div className={styles.sectionTitle}>Items</div>
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>Medicine ID</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items?.length > 0 ? (
              items.map((it) => (
                <tr key={it._id || it.medicine}>
                  <td>{it.medicine}</td>
                  <td>{it.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No items</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.buttons}>
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
