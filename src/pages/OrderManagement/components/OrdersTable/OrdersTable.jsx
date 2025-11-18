import React, { useState } from "react";
import styles from "./OrdersTable.module.css";
import OrdersHeader from "../OrdersHeader/OrdersHeader";

export default function OrdersTable({ orders, onEdit, onDelete }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredOrders = orders.filter((o) => {
    const customerName = o.userData?.name || "";
    const matchesSearch =
      customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o._id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? o.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return styles.delivered;
      case "Shipped":
        return styles.shipped;
      case "Processing":
        return styles.processing;
      case "Pending":
        return styles.pending;
      case "Cancelled":
        return styles.cancelled;
      default:
        return "";
    }
  };

  return (
    <div className={styles.pageContainer}>
      <OrdersHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        total={orders.length}
      />

      <div className={styles.tableContainer}>
        {filteredOrders.length === 0 ? (
          <p className={styles.noResults}>No orders match your search.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id}</td>
                  <td>
                    <div className={styles.customer}>
                      <strong>{o.userData?.name || "Loading..."}</strong>
                      <div className={styles.email}>{o.userData?.email || ""}</div>
                    </div>
                  </td>

                  <td>
                    {o.date
                      ? new Date(o.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(o.status)}`}>
                      {o.status || "Unknown"}
                    </span>
                  </td>
                  <td>{o.total ? `${o.total} EGP` : "N/A"}</td>
                  <td>
                    <button className={styles.editBtn} onClick={() => onEdit(o)}>
                      Edit
                    </button>
                    <button className={styles.cancelBtn} onClick={() => onDelete(o)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
