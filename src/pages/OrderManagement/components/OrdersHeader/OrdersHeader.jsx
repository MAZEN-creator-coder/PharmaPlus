import React from "react";
import styles from "./OrdersHeader.module.css";

export default function OrdersHeader({ searchQuery, onSearchChange, filterStatus, onFilterChange, total }) {
  return (
    <div className={styles.header}>


      <div className={styles.leftSection}>
        <h1 className={styles.title}>Order Management</h1>
        <p className={styles.subtitle}>Total Orders: <span>{total}</span></p>
      </div>

      <div className={styles.rightSection}>
        <input
          type="text"
          placeholder="Search by customer name or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>


      
    </div>
  );
}
