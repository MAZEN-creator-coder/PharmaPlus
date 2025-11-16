import React from "react";
import styles from "./MedicineTable.module.css";
import StatusBadge from "./StatusBadge";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MedicineTable({ medicines, onEdit, onDelete }) {
  console.log("Rendering MedicineTable with medicines:", medicines);
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Medicine Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id || medicine.id}>
              <td>
                <img
                  src={`http://localhost:3000/${medicine.medicineImage}`}
                  alt={medicine.name}
                  className={styles.thumb}
                />
              </td>
              <td>{medicine.name}</td>
              <td>{medicine.category}</td>
              <td>{medicine.stock}</td>
              <td>${(medicine.price || 0).toFixed(2)}</td>
              <td>{medicine.description}</td>
              <td>
                <StatusBadge stock={medicine.stock} status={medicine.status} />
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
