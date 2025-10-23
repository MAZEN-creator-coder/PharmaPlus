import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./MonthlySalesChart.module.css";

const data = [
  { month: "Jan", sales: 28000 },
  { month: "Feb", sales: 31000 },
  { month: "Mar", sales: 35000 },
  { month: "Apr", sales: 33000 },
  { month: "May", sales: 39000 },
  { month: "Jun", sales: 42000 },
  { month: "Jul", sales: 47000 },
];

const MonthlySalesChart = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Monthly Sales</h3>
        <p className={styles.description}>Sales performance over the last 6 months.</p>
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
              formatter={(value) => `$${value.toLocaleString()}`}
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
