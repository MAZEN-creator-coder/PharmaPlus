import React from "react";
import styles from "./MedicineCard.module.css";
import StatusBadge from "./StatusBadge";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MedicineCard({ medicine, onEdit, onDelete }) {
  console.log("Rendering MedicineCard with medicine:", medicine);
    return (
    <article className={styles.card}>
      <img
        src={`http://localhost:3000/${medicine.medicineImage}`}
        alt={medicine.name}
        className={styles.thumb}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <strong>{medicine.name}</strong>
          <StatusBadge stock={medicine.stock} status={medicine.status} />
        </div>
        <div className={styles.meta}>
          {medicine.category} • ${(medicine.price || 0).toFixed(2)}
        </div>
        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={() => onEdit(medicine)}
            title="Edit medicine"
          >
            <FaEdit />
          </button>
          <button
            className={styles.iconBtnDanger}
            onClick={() => onDelete(medicine._id || medicine.id)}
            title="Delete medicine"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
}
