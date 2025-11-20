import { Calendar, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import MetricCard from './SuperAdminDashboardComp/MetricCard';
import SalesTrendChart from './SuperAdminDashboardComp/SalesTrendChart';
import StockMovementChart from './SuperAdminDashboardComp/StockMovementChart';
import OrderStatusChart from './SuperAdminDashboardComp/OrderStatusChart';
import PharmacyTable from './SuperAdminDashboardComp/PharmacyTable';
import styles from './SuperAdminDashboard.module.css';
import { useAuth } from '../../hooks/useAuth';
import { getSuperDashboard } from '../../shared/api/superData';

const SuperAdminDashboard = () => {
  const { token } = (() => {
    try {
      return useAuth() || {};
    } catch (e) {
      return {};
    }
  })();

  const [metrics, setMetrics] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        console.debug('SuperAdminDashboard: token present?', !!token);
        const data = await getSuperDashboard(token);
        if (!mounted) return;
        console.debug('SuperAdminDashboard: fetched', data);
        // keep the full dashboard payload so child components can use it
        setDashboardData(data || null);
        const summary = data?.platformSummary || null;
        if (summary) {
          const mapped = [
            {
              title: 'Total Sales',
              value: summary.totalRevenue != null ? `$${Number(summary.totalRevenue).toLocaleString()}` : '-',
              change: '',
              period: 'period',
              icon: 'dollar',
            },
            {
              title: 'Active Orders',
              value: summary.activeOrders != null ? String(summary.activeOrders) : '-',
              change: '',
              period: '',
              icon: 'cart',
            },
            {
              title: 'Stock Value',
              value: summary.activeStockValue != null ? `$${Number(summary.activeStockValue).toLocaleString()}` : '-',
              change: '',
              period: '',
              icon: 'box',
            },
            {
              title: 'Prescription Volume',
              // backend does not provide this yet — keep a constant placeholder value
              value: '567',
              change: '',
              period: '',
              icon: 'prescription',
            }
          ];
          setMetrics(mapped);
        } else {
          setMetrics(null);
        }
      } catch (err) {
        console.error('SuperAdminDashboard fetch error', err);
        if (mounted) setError(err?.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div className={styles.dashboard}>
      {loading && (
        <div className={styles.loadingScreen}>
          <div className={styles.loadingBox}>
            <div className={styles.spinner} aria-hidden="true"></div>
            <div style={{ marginLeft: 12 }}>Loading dashboard…</div>
          </div>
        </div>
      )}

      <main className={styles.mainContent} style={{ display: loading ? 'none' : undefined }}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Dashboard</h1>
            <div className={styles.dateRange}>
              <Calendar size={16} />
              <span>Nov 20, 2023 - Nov 27, 2023</span>
            </div>
          </div>
          <button className={styles.exportButton}>
            <Download size={16} />
            Export Data
          </button>
        </div>

        <div className={styles.metricsGrid}>
          {loading && <div style={{ padding: 12 }}>Loading metrics…</div>}
          {error && <div style={{ color: 'var(--color-danger)', padding: 12 }}>Error: {String(error)}</div>}
          {metrics ? (
            metrics.map((metric, index) => <MetricCard key={index} {...metric} />)
          ) : !loading && !error ? (
            <div style={{ padding: 12, color: 'var(--muted)' }}>No dashboard metrics available.</div>
          ) : null}
        </div>
        <div className={styles.chartsRow}>
          <div className={styles.salesTrendSection}>
            <SalesTrendChart series={dashboardData?.dailySalesThisMonth} allowAutoFetch={false} />
          </div>
        </div>

        <div className={styles.chartsRow}>
          <div className={styles.chartHalf}>
            <StockMovementChart data={dashboardData?.stockMovement} />
          </div>
          <div className={styles.chartHalf}>
            <OrderStatusChart data={dashboardData?.orderStatus} />
          </div>
        </div>

        <div className={styles.tableSection}>
          <PharmacyTable pharmacies={dashboardData?.topPharmacies} />
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
