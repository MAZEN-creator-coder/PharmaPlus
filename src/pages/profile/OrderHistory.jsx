import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Calendar, DollarSign, Package, ChevronRight } from 'lucide-react';
import styles from './OrderHistory.module.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  //fetching from backend (GET /api/orders)

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return styles.statusDelivered;
      case 'Processing':
        return styles.statusProcessing;
      case 'Cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Order History</h1>
        <p className={styles.subtitle}>Track and manage your medical orders</p>
      </div>

      {orders.length === 0 ? (
        // Empty state when no orders exist
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Package size={64} />
          </div>
          <h2 className={styles.emptyTitle}>No Orders Yet</h2>
          <p className={styles.emptyMessage}>
            You haven't placed any orders yet. Start shopping to see your order history here.
          </p>
          <button onClick={()=> navigate('/search-medicine')} className={styles.shopNowButton}>
            Start Shopping
          </button>
        </div>
      ) : (
        // Orders grid when orders exist
        <div className={styles.ordersGrid}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <div className={styles.radioButton}></div>
                  <span className={styles.orderId}>Order #{order.id}</span>
                </div>
                <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className={styles.orderDetails}>
                <div className={styles.detailItem}>
                  <Calendar size={16} className={styles.icon} />
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailValue}>{order.date}</span>
                </div>

                <div className={styles.detailItem}>
                  <DollarSign size={16} className={styles.icon} />
                  <span className={styles.detailLabel}>Total:</span>
                  <span className={styles.detailValue}>{order.total}</span>
                </div>

                <div className={styles.detailItem}>
                  <Package size={16} className={styles.icon} />
                  <span className={styles.detailLabel}>Items:</span>
                </div>

                <ul className={styles.itemsList}>
                  {order.items.map((item, index) => (
                    <li key={index} className={styles.itemText}>{item}</li>
                  ))}
                </ul>
              </div>

              <button className={styles.viewDetailsButton}>
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;


