import { TrendingUp, Package, ShoppingCart, Users } from "lucide-react";
import StatCard from "./admin-dashboard-comp/StatCard";
import MonthlySalesChart from "./admin-dashboard-comp/MonthlySalesChart";
import SalesCategoryChart from "./admin-dashboard-comp/SalesCategoryChart";
import RecentOrdersTable from "./admin-dashboard-comp/RecentOrdersTable";
import LowStockAlerts from "./admin-dashboard-comp/LowStockAlerts";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getCustomerAnalytics } from "../../shared/api/adminData";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  let token = null;
  let user = null;
  try {
    const auth = useAuth();
    token = auth?.token;
    user = auth?.user;
  } catch (err) {
    token = null;
    user = null;
  }

  const [stats, setStats] = useState(null);
  
  const [statsLoading, setStatsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [childLoadingCount, setChildLoadingCount] = useState(0);

  const onChildLoadingChange = (isLoading) => {
    setChildLoadingCount((c) => {
      if (isLoading) return c + 1;
      return Math.max(0, c - 1);
    });
  };
  

  useEffect(() => {
    if (!token || !user) return;
    const pharmacyId = user.pharmacyId || user.pharmacy || user._id;
    if (!pharmacyId) return;

    let mounted = true;
    (async () => {
      setStatsLoading(true);
      setError(null);
      try {
        const data = await getCustomerAnalytics(token, pharmacyId);
        if (!mounted) return;
        console.debug('AdminDashboard: fetched customer analytics', data);
        setStats(data || null);
      } catch (err) {
        console.error('AdminDashboard: stats fetch error', err);
        if (mounted) setError(err.message || 'Failed to load stats');
      } finally {
        if (mounted) setStatsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token, user && user.pharmacyId]);

  const anyLoading = statsLoading || childLoadingCount > 0;

  return (
    <div className={styles.container}>
      {anyLoading && (
        <div className={styles.loadingScreen}>
          <div className={styles.loadingBox}>
            <div className={styles.spinner} aria-hidden="true"></div>
            <div style={{ marginLeft: 12 }}>Loading dashboard…</div>
          </div>
        </div>
      )}
      <main className={styles.mainContent} style={{ display: anyLoading ? 'none' : undefined }}>
        <div className={styles.header}>
          <h1 className={styles.title}>Pharmacy Admin Dashboard</h1>
          <p className={styles.subtitle}>Welcome back! Here's what's happening with your pharmacy today.</p>
        </div>

        <div className={styles.statsGrid}>
          <StatCard
            title="Total Revenue"
            value={
              stats && stats.totalSales != null
                ? `$${Number(stats.totalSales).toLocaleString()}`
                : "-"
            }
            icon={TrendingUp}
            iconColor={styles.iconPrimary}
          />
          <StatCard
            title="Total Orders"
            value={stats && stats.totalOrders != null ? String(stats.totalOrders) : "-"}
            icon={ShoppingCart}
            iconColor={styles.iconSuccess}
          />
          <StatCard
            title="Products in Stock"
            value={
              stats && stats.productsInStock != null ? String(stats.productsInStock) : "-"
            }
            icon={Package}
            iconColor={styles.iconWarning}
          />
          <StatCard
            title="Active Customers"
            value={stats && stats.noOfCustomers != null ? String(stats.noOfCustomers) : "-"}
            icon={Users}
            iconColor={styles.iconInfo}
          />
        </div>
        {error && (
          <div style={{ color: 'var(--color-danger)', marginTop: 12 }}>
            Failed to load analytics: {String(error)}
          </div>
        )}
        {!statsLoading && !stats && !error && (
          <div style={{ color: 'var(--muted)', marginTop: 12 }}>
            No analytics available for this pharmacy.
          </div>
        )}


        <div className={styles.chartsGrid}>
          <MonthlySalesChart onLoadingChange={onChildLoadingChange} />
          <SalesCategoryChart onLoadingChange={onChildLoadingChange} />
        </div>

        <div className={styles.tablesGrid}>
          <RecentOrdersTable onLoadingChange={onChildLoadingChange} />
          <LowStockAlerts onLoadingChange={onChildLoadingChange} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
