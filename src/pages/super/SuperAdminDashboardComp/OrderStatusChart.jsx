import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import styles from './OrderStatusChart.module.css';

const OrderStatusChart = () => {
  const data = [
    { name: 'Delivered', value: 64, color: '#0ea5a5' },
    { name: 'Pending', value: 8, color: '#66bb6a' },
    { name: 'Shipped', value: 18, color: '#7986cb' },
    { name: 'Canceled', value: 10, color: '#e0e0e0' },
  ];

  const renderLabel = (entry) => {
    return `${entry.value}%`;
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Order Status</h3>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={renderLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
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
    </div>
  );
};

export default OrderStatusChart;
