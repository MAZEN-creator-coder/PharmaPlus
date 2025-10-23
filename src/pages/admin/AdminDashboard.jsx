import { TrendingUp, Package, ShoppingCart, Users } from "lucide-react";
import StatCard from "./admin-dashboard-comp/StatCard";
import MonthlySalesChart from "./admin-dashboard-comp/MonthlySalesChart";
import StockCategoryChart from "./admin-dashboard-comp/StockCategoryChart";
import RecentOrdersTable from "./admin-dashboard-comp/RecentOrdersTable";
import LowStockAlerts from "./admin-dashboard-comp/LowStockAlerts";
import { useState } from "react";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      
      
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Pharmacy Admin Dashboard</h1>
          <p className={styles.subtitle}>Welcome back! Here's what's happening with your pharmacy today.</p>
        </div>

        <div className={styles.statsGrid}>
          <StatCard
            title="Total Revenue"
            value="$247,580"
            subtitle="+12.5% from last month"
            icon={TrendingUp}
            iconColor={styles.iconPrimary}
          />
          <StatCard
            title="Total Orders"
            value="1,245"
            subtitle="+8.3% from last month"
            icon={ShoppingCart}
            iconColor={styles.iconSuccess}
          />
          <StatCard
            title="Products in Stock"
            value="3,428"
            subtitle="147 items low in stock"
            icon={Package}
            iconColor={styles.iconWarning}
          />
          <StatCard
            title="Active Customers"
            value="892"
            subtitle="+5.2% from last month"
            icon={Users}
            iconColor={styles.iconInfo}
          />
        </div>

        <div className={styles.chartsGrid}>
          <MonthlySalesChart />
          <StockCategoryChart />
        </div>

        <div className={styles.tablesGrid}>
          <RecentOrdersTable />
          <LowStockAlerts />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
