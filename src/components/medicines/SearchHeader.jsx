import React from "react";
import styles from "./SearchHeader.module.css";
import { FaPlus, FaFileCsv, FaHistory, FaSearch, FaFilter } from "react-icons/fa";

export default function SearchHeader({ onSearch, onAdd }) {
  return (
    <div className={styles.header}>
      <h2>Medicines Management</h2>

      <div className={styles.actions}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input
            placeholder="Search medicines by name or category..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className={styles.filterBtn}>
            <FaFilter /> Filter
          </button>
        </div>
        
        <div className={styles.controls}>
          <button className={styles.primary} onClick={onAdd}>
            <FaPlus /> Add New Medicine
          </button>
          <button className={styles.secondary}>
            <FaFileCsv /> Bulk Import
          </button>
          <button className={styles.secondary}>
            <FaHistory /> Audit Log
          </button>
        </div>
      </div>
    </div>
  );
}