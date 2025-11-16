import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Calendar, DollarSign, Package, ChevronRight } from 'lucide-react';
import styles from './OrderHistory.module.css';
import { useAuth } from '../../hooks/useAuth';
import { getOrdersByUser } from '../../shared/api/users';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  // call useAuth safely — if the page is rendered outside AuthProvider, avoid throwing
  let token = null;
  let user = null;
  try {
    const auth = useAuth();
    token = auth?.token;
    user = auth?.user;
  } catch (err) {
    // Auth context not available; keep token/user null so load effect is skipped
    token = null;
    user = null;
  }
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!user || !token) return;
      setLoading(true);
      try {
        const data = await getOrdersByUser(token, user._id || user.id, page, limit);
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setOrders(list);

        // If returned items equal the page limit, there MAY be a next page.
        // To be precise (so Next isn't shown when total == limit), check next page availability.
        if (list.length === limit) {
          try {
            const next = await getOrdersByUser(token, user._id || user.id, page + 1, limit);
            if (cancelled) return;
            setHasMore(Array.isArray(next) && next.length > 0);
          } catch (err) {
            // If next page fetch fails, assume no more pages to avoid showing Next button incorrectly
            console.warn('Failed to check next page', err);
            if (!cancelled) setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (err) {
        if (!cancelled) console.error('Failed to load orders', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [user, token, page]);

  const getStatusClass = (status) => {
    const s = (status || '').toString().toLowerCase();
    switch (s) {
      case 'delivered':
        return styles.statusDelivered;
      case 'processing':
        return styles.statusProcessing;
      case 'cancelled':
      case 'canceled':
        return styles.statusCancelled;
      case 'pending':
        return styles.statusPending;
      default:
        return '';
    }
  };

  if (loading) {
    // keep the page layout container so the sidebar and surrounding layout
    // do not collapse while loading — render spinner centered inside container
    return (
      <div className={styles.container}>
        <div className={styles.loadingCenter}>
          <div className={styles.spinner} aria-hidden></div>
        </div>
      </div>
    );
  }

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
            <div key={order._id || order.id} className={styles.orderCard}>
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
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item) => {
                      const key = item._id || (item.medicine && (item.medicine._id || item.medicine)) || Math.random();
                      // Determine medicine display name
                      let medName = '';
                      if (item.medicine) {
                        if (typeof item.medicine === 'string') medName = item.medicine;
                        else if (typeof item.medicine === 'object') medName = item.medicine.name || item.medicine.title || item.medicine._id || JSON.stringify(item.medicine);
                      }
                      const qty = item.quantity != null ? ` x${item.quantity}` : '';
                      return (
                        <li key={key} className={styles.itemText}>{medName || 'Item'}{qty}</li>
                      );
                    })
                  ) : (
                    <li className={styles.itemText}>No items</li>
                  )}
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
      {/* pagination controls */}
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          disabled={page <= 1 || loading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span className={styles.pageInfo}>Page {page}</span>
        <button
          className={styles.pageButton}
          disabled={!hasMore || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;


