import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import styles from './OrderStatusChart.module.css';

const OrderStatusChart = ({ data = null }) => {
  // backend shape: [{ status: 'Delivered', percent: '64.00' }, ...]
  const statusColorMap = {
    delivered: '#0ea5a5',
    pending: '#f59e0b',
    shipped: '#7986cb',
    cancelled: '#ef4444',
    canceled: '#ef4444'
  };

  const series = Array.isArray(data) && data.length
    ? data.map(d => {
        const name = (d.status || d._id || '').toString();
        const key = name.toLowerCase();
        return {
          name,
          value: Number(d.percent || d.value || 0),
          color: statusColorMap[key] || '#e0e0e0'
        };
      })
    : null;

  const renderLabel = (entry) => `${entry.value}%`;

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Order Status</h3>
      </div>
      {series ? (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={series}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={renderLabel}
              labelLine={false}
            >
              {series.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || ['#0ea5a5','#66bb6a','#7986cb','#e0e0e0'][index % 4]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '13px'
              }}
              formatter={(value) => `${value}%`}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '13px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ padding: 12, color: 'var(--muted)' }}>No order status data available.</div>
      )}
    </div>
  );
};

export default OrderStatusChart;
