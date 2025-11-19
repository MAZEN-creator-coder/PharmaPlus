import { useEffect, useState } from "react";
import styles from "./LowStockAlerts.module.css";
import { useAuth } from "../../../hooks/useAuth";
import { getLowStockAlerts } from "../../../shared/api/adminData";
import { useNavigate } from "react-router-dom";

const LowStockAlerts = ({ onLoadingChange }) => {
  const { token, user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) return;
    const pharmacyId = user.pharmacyId || user.pharmacy || user._id;
    if (!pharmacyId) return;

    let mounted = true;
    (async () => {
      setLoading(true);
      if (onLoadingChange) onLoadingChange(true);
      setError(null);
      try {
        const data = await getLowStockAlerts(token, pharmacyId);
        if (!mounted) return;
        if (data && data.lowStockMedicines) {
          setAlerts(data.lowStockMedicines);
        } else {
          setAlerts([]);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError('Failed to load low stock alerts');
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
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>Low Stock Alerts</h3>
          <p className={styles.description}>Items falling below reorder threshold.</p>
        </div>
        <button className={styles.viewAllButton} onClick={() => navigate('/admin/medicine-management')}>View All</button>
      </div>
      <div className={styles.content}>
        {loading && <div className={styles.loading}>Loading...</div>}
        {!loading && error && <div className={styles.error}>{error}</div>}
        {!loading && !error && alerts.length === 0 && (
          <div className={styles.empty}>No low stock items.</div>
        )}
        {!loading && !error && alerts.length > 0 && (
          <div>
            <div className={styles.alertList}>
              {alerts.slice(0, 4).map((item) => (
                <div key={item.medicineId} className={styles.alertItem}>
                  <div>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemStock}>
                      Stock: {item.currentStock} · Threshold: {item.threshold}
                    </p>
                  </div>
                  <span className={styles.badge}>Low Stock · {item.unitsBelow} below</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LowStockAlerts;
