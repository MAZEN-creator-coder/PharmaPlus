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
            <tr key={pharmacy._id || pharmacy.id}>
              <td>
                {/* Resolve backend media URL for images (fallback to default path) */}
                {(() => {
                  const API_BASE =
                    (typeof import.meta !== "undefined" &&
                      import.meta.env &&
                      import.meta.env.VITE_API_BASE) ||
                    "http://localhost:3000/api";
                  const mediaBase = API_BASE.replace(/\/api\/?$/, "");
                  const imgPath =
                    pharmacy?.img || "uploads/pharmacy-default.jpg";
                  const imgSrc = imgPath.startsWith("http")
                    ? imgPath
                    : `${mediaBase}${
                        imgPath.startsWith("/") ? "" : "/"
                      }${imgPath}`;
                  return (
                    <img
                      src={imgSrc}
                      alt={pharmacy.name}
                      className={styles.thumb}
                    />
                  );
                })()}
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
                  onClick={() => onDelete(pharmacy._id || pharmacy.id)}
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
