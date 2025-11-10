import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './SalesTrendChart.module.css';

const SalesTrendChart = () => {
  const data = [
    { date: '1', current: 2100, previous: 2000 },
    { date: '2', current: 2100, previous: 2000 },
    { date: '3', current: 2100, previous: 2000 },
    { date: '4', current: 2100, previous: 2000 },
    { date: '5', current: 2100, previous: 2000 },
    { date: '6', current: 2100, previous: 2000 },
    { date: '7', current: 2100, previous: 2000 },
    { date: '8', current: 2100, previous: 2000 },
    { date: '19', current: 2100, previous: 2000 },
    { date: '20', current: 2100, previous: 2000 },
    { date: '21', current: 2400, previous: 2200 },
    { date: '22', current: 2200, previous: 2300 },
    { date: '23', current: 2800, previous: 2400 },
    { date: '24', current: 2600, previous: 2500 },
    { date: '25', current: 3200, previous: 2800 },
    { date: '26', current: 3600, previous: 3000 },
    { date: '27', current: 4000, previous: 3200 },
  ];

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Sales Trend</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
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
          <Legend 
            wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="#1a1a1a" 
            strokeWidth={2}
            name="Current Period"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            stroke="#999" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Previous Period"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrendChart;
