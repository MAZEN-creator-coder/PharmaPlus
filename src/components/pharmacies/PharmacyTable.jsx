import React from "react";
import styles from "./PharmacyTable.module.css";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";

export default function PharmacyTable({ pharmacies, onEdit, onDelete }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Pharmacy Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.map((pharmacy) => (
            <tr key={pharmacy.id}>
              <td>
                <img src={pharmacy.img} alt={pharmacy.name} className={styles.thumb} />
              </td>
              <td>{pharmacy.name}</td>
              <td>{pharmacy.contact}</td>
              <td>{pharmacy.address}</td>
              <td>
                <div className={styles.rating}>
                  <FaStar className={styles.starIcon} /> {pharmacy.rating}
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${pharmacy.status === "Active" ? styles.active : styles.inactive}`}>
                  {pharmacy.status}
                </span>
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}