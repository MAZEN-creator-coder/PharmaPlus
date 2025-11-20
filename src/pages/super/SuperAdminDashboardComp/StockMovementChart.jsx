import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './StockMovementChart.module.css';

const StockMovementChart = ({ data = null }) => {
  // Expect backend shape: [{ category: '...', count: N }, ...]
  const series = Array.isArray(data) && data.length ? data.map(d => ({ name: d.category || d.categoryName || d._id || 'Unknown', stock: d.count || d.value || d.stock || 0 })) : null;

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
      {series ? (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={series} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
      ) : (
        <div style={{ padding: 12, color: 'var(--muted)' }}>No stock movement data available.</div>
      )}
    </div>
  );
};

export default StockMovementChart;
