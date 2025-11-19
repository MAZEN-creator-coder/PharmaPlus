import styles from "./RecentOrdersTable.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { getOrdersByPharmacy } from "../../../shared/api/adminData";
import apiFetch from "../../../shared/api/apiFetch";

const RecentOrdersTable = ({ onLoadingChange }) => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const onViewAll = () => {
    navigate('/admin/orders');
  };

  useEffect(() => {
    if (!token || !user) return;
    const pharmacyId = user.pharmacyId || user.pharmacy || user._id;
    if (!pharmacyId) return;

    let mounted = true;
    (async () => {
      setLoading(true);
      if (onLoadingChange) onLoadingChange(true);
      try {
        const fetched = await getOrdersByPharmacy(token, pharmacyId, 5);
        if (!mounted) return;

        if (!fetched || fetched.length === 0) {
          setOrders([]);
          return;
        }

        // fetched orders may not include customer name; fetch user names in batch
        const userIds = Array.from(new Set(fetched.map(o => String(o.userId))));
        const userMap = {};
        await Promise.all(userIds.map(async (id) => {
          try {
            const res = await apiFetch(`/users/${id}`, { token }); // returns { data: { user } }
            if (res && res.data && res.data.user) {
              const u = res.data.user;
              userMap[id] = u.fullName || u.firstname || `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.email || id;
            } else {
              userMap[id] = id;
            }
          } catch (e) {
            userMap[id] = id;
          }
        }));

        const mapped = fetched.map(o => ({
          id: o._id || o.id,
          customer: userMap[String(o.userId)] || String(o.userId),
          total: o.total ? (typeof o.total === 'string' ? (o.total.startsWith('$') ? o.total : `$${o.total}`) : `$${Number(o.total).toFixed(2)}`) : '-',
          status: (o.status || 'Pending').toLowerCase(),
          date: o.date || (o.createdAt ? new Date(o.createdAt).toISOString().split('T')[0] : ''),
        }));

        setOrders(mapped);
      } catch (err) {
        console.error('RecentOrdersTable fetch error', err);
        setOrders([]);
      } finally {
        if (onLoadingChange) onLoadingChange(false);
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [token, user]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Orders</h3>
        <button className={styles.viewAllButton} onClick={onViewAll}>View All</button>
      </div>
      <div className={styles.content}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.tableHeader}>Order ID</th>
                <th className={styles.tableHeader}>Customer</th>
                <th className={styles.tableHeader}>Total</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{order.id}</td>
                  <td className={styles.tableCell}>{order.customer}</td>
                  <td className={`${styles.tableCell} ${styles.tableCellBold}`}>{order.total}</td>
                  <td className={`${styles.tableCell} ${styles.statusCell}`}>
                    <span className={`${styles.badge} ${styles[`badge${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellMuted}`}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
