import React, { useEffect, useState, useContext } from "react";
import styles from "./OrderManagement.module.css";
import adminStyles from "../admin/AdminDashboard.module.css";
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
  const [isLoading, setIsLoading] = useState(true);

  const limit = 10;

  const { token,user } = useContext(AuthContext);
  const pharmacyId = user.pharmacyId;
  const totalPages = 5;


  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        return;
      }
      setIsLoading(true);
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
                  const user = userJson?.data?.user;
                  const fullName = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();

                  userData = {
                    name: fullName || "Unknown",
                    email: user?.email || "",
                  };
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
      finally{
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [page, token, pharmacyId]);

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

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
if (isLoading) {
  return (
    <div className={adminStyles.loadingScreen}>
      <div className={adminStyles.loadingBox}>
        <div className={adminStyles.spinner} aria-hidden="true"></div>
        <div style={{ marginLeft: 12 }}>Loading orders…</div>
      </div>
    </div>
  );
}

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          
          <OrdersTable
            orders={orders}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <div className={styles.wrap}>
            <button
              onClick={handlePrevPage}
              disabled={page <= 1 || isLoading}
              className={styles.btn}
            >
              ◀ Previous
            </button>

            <div className={styles.info}>
              Page {page} of {totalPages}
            </div>

            <button
              onClick={handleNextPage}
              disabled={page >= totalPages || isLoading}
              className={styles.btn}
            >
              Next ▶
            </button>
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
      </div>
    </div>
  );
}
