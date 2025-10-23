import React from "react";
import styles from "./MedicineCard.module.css";
import StatusBadge from "./StatusBadge";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MedicineCard({ medicine, onEdit, onDelete }) {
  return (
    <article className={styles.card}>
      <img src={medicine.image} alt={medicine.name} className={styles.thumb} />
      <div className={styles.content}>
        <div className={styles.header}>
          <strong>{medicine.name}</strong>
          <StatusBadge stock={medicine.stock} />
        </div>
        <div className={styles.meta}>
          {medicine.category} • ${medicine.price.toFixed(2)}
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
            onClick={() => onDelete(medicine.id)}
            title="Delete medicine"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
}