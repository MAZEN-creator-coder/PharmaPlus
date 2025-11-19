import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import styles from "./SalesCategoryChart.module.css";
import { useAuth } from "../../../hooks/useAuth";
import { getSalesByCategory } from "../../../shared/api/adminData";

const COLOR_PALETTE = [
  "#0891b2",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#ef4444",
  "#7c3aed",
  "#06b6d4",
];

const SalesCategoryChart = () => {
  const { token, user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || !user) return;
    const pharmacyId = user.pharmacyId || user.pharmacy || user._id;
    if (!pharmacyId) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const payload = await getSalesByCategory(token, pharmacyId);
        if (!mounted) return;
        // payload.salesByCategory is an object: { categoryName: value }
        const raw = (payload && payload.salesByCategory) || {};
        const entries = Object.entries(raw).map(([name, value], idx) => ({
          name,
          value: Number(value) || 0,
          color: COLOR_PALETTE[idx % COLOR_PALETTE.length],
        }));
        setData(entries);
      } catch (err) {
        console.error('getSalesByCategory fetch error', err);
        setData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [token, user]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Sales Category Overview</h3>
        <p className={styles.description}>Distribution of medicines' sales by category.</p>
      </div>
      <div className={styles.content}>
        {loading && <div className={styles.loading}>Loading...</div>}
        {!loading && data.length === 0 && (
          <div className={styles.empty}>No sales data available.</div>
        )}
        {!loading && data.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value) => `${value}`}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className={styles.legendText}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SalesCategoryChart;
