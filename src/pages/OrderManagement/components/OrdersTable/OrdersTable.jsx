import React, { useState } from "react";
import styles from "./OrdersTable.module.css";
import EditModal from "../EditModal/EditModal";
import CancelModal from "../CancelModal/CancelModal";
import OrdersHeader from "../OrdersHeader/OrdersHeader";
import { ordersData } from "../../../../shared/data";

export default function OrdersTable() {
  const [orders, setOrders] = useState(ordersData);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? o.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowEdit(true);
  };

  const handleCancel = (order) => {
    setSelectedOrder(order);
    setShowCancel(true);
  };

  const handleSaveEdit = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
    setShowEdit(false);
  };

  
  const handleConfirmCancel = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setShowCancel(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered": return styles.delivered;
      case "Shipped": return styles.shipped;
      case "Processing": return styles.processing;
      case "Pending": return styles.pending;
      case "Cancelled": return styles.cancelled;
      default: return "";
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
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>
                    <div className={styles.customer}>
                      <strong>{o.name}</strong>
                      <div className={styles.email}>{o.email}</div>
                    </div>
                  </td>
                  <td>{o.date}</td>
                  <td>
                    <span className={`${styles.status} ${getStatusClass(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>{o.total}</td>
                  <td>
                    <button className={styles.editBtn} onClick={() => handleEdit(o)}>Edit</button>
                    <button className={styles.cancelBtn} onClick={() => handleCancel(o)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showEdit && (
        <EditModal
          order={selectedOrder}
          onClose={() => setShowEdit(false)}
          onSave={handleSaveEdit}
        />
      )}

      {showCancel && (
        <CancelModal
          order={selectedOrder}
          onClose={() => setShowCancel(false)}
          onConfirm={() => handleConfirmCancel(selectedOrder.id)}
        />
      )}
    </div>
  );
}
