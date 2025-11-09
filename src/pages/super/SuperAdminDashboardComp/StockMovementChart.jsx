import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './StockMovementChart.module.css';

const StockMovementChart = () => {
  const data = [
    { name: 'Antibiotics', stock: 500 },
    { name: 'Vitamins', stock: 320 },
    { name: 'Syrups', stock: 680 },
    { name: 'Dressings', stock: 250 },
    { name: 'Painkillers', stock: 400 },
  ];

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Stock Movement</h3>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendColor}></div>
            <span>Stock</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '13px'
            }}
          />
          <Bar dataKey="stock" fill="#e57373" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockMovementChart;
