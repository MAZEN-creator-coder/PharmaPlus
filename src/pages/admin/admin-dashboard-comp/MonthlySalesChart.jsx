import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../../../hooks/useAuth";
import { getCustomerAnalytics } from "../../../shared/api/adminData";
import styles from "./MonthlySalesChart.module.css";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabelFromYYYYMM(yyyymm) {
  if (!yyyymm) return yyyymm;
  const parts = String(yyyymm).split("-");
  if (parts.length < 2) return yyyymm;
  const monthIndex = parseInt(parts[1], 10) - 1;
  return MONTH_NAMES[monthIndex] || yyyymm;
}

const MonthlySalesChart = ({ onLoadingChange }) => {
  const [data, setData] = useState([]);
  const { token, user } = (() => {
    try { return useAuth(); } catch { return { token: null, user: null }; }
  })();

  useEffect(() => {
    if (!token || !user) return;
    const pharmacyId = user.pharmacyId || user.pharmacy || user._id;
    if (!pharmacyId) return;

    let mounted = true;
    (async () => {
      try {
        if (onLoadingChange) onLoadingChange(true);
        const analytics = await getCustomerAnalytics(token, pharmacyId);
        if (!mounted) return;
        // analytics.last7MonthsSales might be an array of { month: 'YYYY-MM', sales: number }
        const months = analytics && analytics.last7MonthsSales ? analytics.last7MonthsSales : [];
        const mapped = months.map((m) => ({ month: monthLabelFromYYYYMM(m.month), sales: Number(m.sales || m.sales === 0 ? m.sales : (m.sales || 0)) }));
        setData(mapped);
      } catch (err) {
        console.error('MonthlySalesChart fetch error', err);
        setData([]);
      } finally {
        if (onLoadingChange) onLoadingChange(false);
      }
    })();

    return () => { mounted = false; };
  }, [token, user && user.pharmacyId]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Monthly Sales</h3>
        <p className={styles.description}>Sales performance over the last 7 months.</p>
      </div>
      <div className={styles.content}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value) => `$${Number(value).toLocaleString()}`}
            />
            <Bar 
              dataKey="sales" 
              fill="#0891b2" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySalesChart;
