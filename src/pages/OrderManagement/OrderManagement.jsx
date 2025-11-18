import React, { useEffect, useState, useContext } from "react";
import styles from "./OrderManagement.module.css";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import EditModal from "./components/EditModal/EditModal";
import DeleteModal from "./components/CancelModal/CancelModal";
import { AuthContext } from "../../context/AuthContext";


export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { token } = useContext(AuthContext);
  const pharmacyId = "6917a140e7415398de86478b";

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.log("No token found! Please log in.");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3000/api/orders/pharmacy/${pharmacyId}?limit=${limit}&page=${page}`,
          { headers: { Authorization: "Bearer " + token } }
        );

        if (!res.ok) {
          console.log("Failed to fetch orders:", res.status);
          setOrders([]);
          return;
        }

        const data = await res.json();
        const ordersData = data?.data?.orders || [];

        const ordersWithUser = await Promise.all(
          ordersData.map(async (order) => {
            let userData = { name: "Unknown", email: "" };
            if (order.userId) {
              try {
                const userRes = await fetch(
                  `http://localhost:3000/api/users/${order.userId}`,
                  { headers: { Authorization: "Bearer " + token } }
                );
                if (userRes.ok) {
                  const userJson = await userRes.json();
                  userData = userJson?.data?.user || userData;
                }
              } catch (err) {
                console.log("Failed to fetch user:", err);
              }
            }
            return { ...order, userData };
          })
        );

        setOrders(ordersWithUser);
      } catch (err) {
        console.log("Error fetching orders:", err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [page, token, pharmacyId]);

  // ✅ تعريف الدوال اللي محتاجها
  const handleEdit = (order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  const handleSave = async (updatedStatus) => {
    if (!selectedOrder) return;
    try {
      const res = await fetch(
        `http://localhost:3000/api/orders/${selectedOrder._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ status: updatedStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      const updatedOrder = await res.json();
      setOrders((prev) =>
        prev.map((o) =>
          o._id === updatedOrder.data.order._id
            ? { ...updatedOrder.data.order, userData: o.userData }
            : o
        )
      );
      setEditModalOpen(false);
      setSelectedOrder(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
      setDeleteModalOpen(false);
      setSelectedOrder(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedOrder(null);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <OrdersTable orders={orders} onEdit={handleEdit} onDelete={handleDelete} />

          {/* Pagination */}
          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
            <button onClick={handlePrevPage} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={handleNextPage} disabled={orders.length < limit}>
              Next
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditModal order={selectedOrder} onClose={handleCloseModal} onSave={handleSave} />
      )}

      {isDeleteModalOpen && (
        <DeleteModal order={selectedOrder} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
      )}
    </div>
  );
}
