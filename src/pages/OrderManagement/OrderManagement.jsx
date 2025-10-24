import React, { useState } from "react";
import styles from "./OrderManagement.module.css";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import EditModal from "./components/EditModal/EditModal";
import DeleteModal from "./components/CancelModal/CancelModal";
import { ordersData } from "../../shared/data";


export default function OrderManagement() {
  const [orders, setOrders] = useState(ordersData);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);


  const handleEdit = (order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };


  const handleDelete = (order) => {
    setSelectedOrder(order);
    setDeleteModalOpen(true);
  };


  const handleSave = (updatedOrder) => {
// بتعدي على كل الطلبات القديمة.
// لو لقت طلب الـ id بتاعه زي اللي عدلناه → تبدله بالطلب الجديد.
// بعد كده تقفل نافذة التعديل.

    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
    setEditModalOpen(false);
  };


  const handleConfirmDelete = () => {
    setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
    setDeleteModalOpen(false);
  };

  // 🔒 Close Modals
  const handleCloseModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* ✅ Orders Table */}
        <div className={styles.contentWrapper}>
          <OrdersTable
            orders={orders}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {isEditModalOpen && (
        <EditModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
