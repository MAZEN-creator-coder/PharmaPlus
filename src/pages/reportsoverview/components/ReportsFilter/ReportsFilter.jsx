import React from "react";
import styles from "./ReportsFilter.module.css";
import { Search } from "lucide-react";

export default function ReportsFilter({ onSearch, onFilterChange, onExport }) {
  return (
    <div className={styles.filterContainer}>
      <select onChange={(e) => onFilterChange(e.target.value)} className={styles.select}>
        <option value="">All Categories</option>
        <option value="Pharmacy Performance">Pharmacy Performance</option>
        <option value="Sales">Sales</option>
        <option value="Compliance">Compliance</option>
      </select>

      <input type="date" className={styles.dateInput} />

      <div className={styles.searchBox}>
        <Search className={styles.icon} />
        <input
          type="text"
          placeholder="Search by report name or pharmacy..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className={styles.buttons}>
        <button className={styles.exportBtn} onClick={onExport}>Export All</button>
      </div>
    </div>
  );
}
