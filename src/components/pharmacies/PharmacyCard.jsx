import React from "react";
import styles from "./PharmacyCard.module.css";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";

export default function PharmacyCard({ pharmacy, onEdit, onDelete }) {
  return (
    <article className={styles.card}>
      <img src={pharmacy.img} alt={pharmacy.name} className={styles.thumb} />
      <div className={styles.content}>
        <div className={styles.header}>
          <strong>{pharmacy.name}</strong>
          <span className={`${styles.status} ${pharmacy.status === "Active" ? styles.active : styles.inactive}`}>
            {pharmacy.status}
          </span>
        </div>
        <div className={styles.rating}>
          <FaStar className={styles.starIcon} /> {pharmacy.rating}
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
            onClick={() => onDelete(pharmacy.id)}
            title="Delete pharmacy"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
}