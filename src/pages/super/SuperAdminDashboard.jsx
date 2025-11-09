import { Calendar, Download } from 'lucide-react';
import MetricCard from './SuperAdminDashboardComp/MetricCard';
import SalesTrendChart from './SuperAdminDashboardComp/SalesTrendChart';
import StockMovementChart from './SuperAdminDashboardComp/StockMovementChart';
import OrderStatusChart from './SuperAdminDashboardComp/OrderStatusChart';
import PharmacyTable from './SuperAdminDashboardComp/PharmacyTable';
import styles from './SuperAdminDashboard.module.css';

const SuperAdminDashboard = () => {
  const metrics = [
    {
      title: 'Total Sales',
      value: '$45,231',
      change: '+12.5%',
      period: 'vs. last month',
      icon: 'dollar',
      positive: true
    },
    {
      title: 'Active Orders',
      value: '1,234',
      change: '+3.2%',
      period: 'vs. last month',
      icon: 'cart',
      positive: true
    },
    {
      title: 'Stock Value',
      value: '$123,456',
      change: '+8.1%',
      period: 'vs. last month',
      icon: 'box',
      positive: true
    },
    {
      title: 'Prescription Volume',
      value: '567',
      change: '+7.3%',
      period: 'vs. last month',
      icon: 'prescription',
      positive: true
    }
  ];

  return (
    <div className={styles.dashboard}>
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
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.salesTrendSection}>
          <SalesTrendChart />
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartHalf}>
          <StockMovementChart />
        </div>
        <div className={styles.chartHalf}>
          <OrderStatusChart />
        </div>
      </div>

      <div className={styles.tableSection}>
        <PharmacyTable />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
