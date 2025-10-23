import styles from "./RecentOrdersTable.module.css";
import { useNavigate } from "react-router-dom";

const orders = [
  { id: "MC2024001", customer: "Amr Tamer", total: "$750.00", status: "completed", date: "2024-07-28" },
  { id: "MC2024002", customer: "Mazen Ahmed", total: "$1200.50", status: "processing", date: "2024-07-28" },
  { id: "MC2024003", customer: "Noha Shehab", total: "$300.00", status: "pending", date: "2024-07-27" },
  { id: "MC2024004", customer: "Mariam Riad", total: "$980.25", status: "completed", date: "2024-07-27" },
  { id: "MC2024005", customer: "Tamer EL-Gayar", total: "$520.00", status: "cancelled", date: "2024-07-26" },
];

const RecentOrdersTable = () => {
  const navigate = useNavigate();

  const onViewAll = () => {
    navigate('/admin/orders');
  };
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
