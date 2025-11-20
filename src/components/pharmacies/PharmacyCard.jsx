import React from "react";
import styles from "./PharmacyCard.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function PharmacyCard({ pharmacy, onEdit, onDelete }) {
  const imgSrc = pharmacy?.img?.startsWith("http")
    ? pharmacy.img
    : `http://localhost:3000/${pharmacy?.img || "uploads/pharmacy-default.jpg"}`;

  return (
    <article className={styles.card}>
      <img src={imgSrc} alt={pharmacy.name} className={styles.thumb} />
      <div className={styles.content}>
        <div className={styles.header}>
          <strong>{pharmacy.name}</strong>
          {(() => {
            const statusNormalized = String(
              pharmacy.status || ""
            ).toLowerCase();
            return (
              <span
                className={`${styles.status} ${
                  statusNormalized === "active"
                    ? styles.active
                    : styles.inactive
                }`}
              >
                {pharmacy.status}
              </span>
            );
          })()}
        </div>
        <div className={styles.meta}>
          {pharmacy.address} • {pharmacy.contact}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={() => onEdit(pharmacy)}
            title="Edit pharmacy"
          >
            <FaEdit />
          </button>
          <button
            className={styles.iconBtnDanger}
            onClick={() => onDelete(pharmacy._id || pharmacy.id)}
            title="Delete pharmacy"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
}
