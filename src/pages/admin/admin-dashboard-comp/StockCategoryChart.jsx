import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import styles from "./StockCategoryChart.module.css";

const data = [
  { name: "Pain Relief", value: 38, color: "#0891b2" },
  { name: "Antibiotics", value: 24, color: "#10b981" },
  { name: "Vitamins", value: 12, color: "#f59e0b" },
  { name: "Chronic Care", value: 16, color: "#6366f1" },
  { name: "Dermatology", value: 10, color: "#ec4899" },
];

const StockCategoryChart = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Stock Category Overview</h3>
        <p className={styles.description}>Distribution of medicines by category.</p>
      </div>
      <div className={styles.content}>
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
              formatter={(value) => `${value}%`}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className={styles.legendText}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockCategoryChart;
