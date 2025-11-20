import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './SalesTrendChart.module.css';

const pad = (n) => String(n).padStart(2, '0');
const toIsoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const formatDayLabel = (isoDate) => {
  try {
    const d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); // e.g. "Oct 23"
  } catch {
    return isoDate;
  }
};

const addDays = (d, amount) => {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + amount);
  return nd;
};

const SalesTrendChart = ({ days = 30, series = null }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!series) {
        if (mounted) {
          setData([]);
          setLoading(false);
        }
        return;
      }

      if (!Array.isArray(series)) {
        if (mounted) {
          setData([]);
          setLoading(false);
        }
        return;
      }

      if (mounted) setLoading(true);

      const hasIsoDates = series.some((s) => typeof s.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s.date));

      if (hasIsoDates) {
        const map = new Map();
        series.forEach((s) => {
          const key = s.date;
          map.set(key, Number(s.totalSales ?? s.total ?? s.value ?? 0));
        });

        const end = new Date();
        end.setHours(0, 0, 0, 0);
        const start = addDays(end, -Math.max(0, days - 1));
        const filled = [];
        for (let i = 0; i < days; i++) {
          const cur = addDays(start, i);
          const iso = toIsoDate(cur);
          filled.push({ iso, label: formatDayLabel(iso), current: map.get(iso) ?? 0 });
        }
        filled.sort((a, b) => a.iso.localeCompare(b.iso));
        if (mounted) setData(filled);
      } else {
        // fallback for monthly/day-only shapes: align series to the last N days if possible
        const end = new Date();
        end.setHours(0, 0, 0, 0);
        const start = addDays(end, -Math.max(0, days - 1));
        const filled = [];
        for (let i = 0; i < days; i++) {
          const cur = addDays(start, i);
          const iso = toIsoDate(cur);
          const found = series.find((s) => s.day != null && Number(s.day) === cur.getDate());
          let value = null;
          if (found) value = Number(found.totalSales ?? found.total ?? found.value ?? 0);
          else if (series.length >= days) {
            const idx = series.length - days + i;
            if (idx >= 0 && series[idx]) value = Number(series[idx].totalSales ?? series[idx].total ?? series[idx].value ?? 0);
          } else if (series[i]) {
            value = Number(series[i].totalSales ?? series[i].total ?? series[i].value ?? 0);
          }
          filled.push({ iso, label: formatDayLabel(iso), current: value ?? 0 });
        }
        filled.sort((a, b) => a.iso.localeCompare(b.iso));
        if (mounted) setData(filled);
      }

      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, [days, series]);

  // pick evenly spaced ticks so labels increment consistently across the axis
  const tickInterval = Math.max(1, Math.floor(days / 6));
  let ticks = [];
  if (data && data.length) {
    ticks = data.map((d, i) => (i % tickInterval === 0 ? d.iso : null)).filter(Boolean);
    const lastIso = data[data.length - 1].iso;
    if (!ticks.includes(lastIso)) ticks.push(lastIso);
  }

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Sales Trend</h3>
      </div>
      {loading && <div style={{ padding: 12 }}>Loading trend…</div>}
      {!loading && (!data || data.length === 0) && <div style={{ padding: 12, color: 'var(--muted)' }}>No sales data available.</div>}
      {error && <div style={{ color: 'var(--color-danger)', padding: 12 }}>Error: {String(error)}</div>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="iso"
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickFormatter={(iso) => formatDayLabel(iso)}
            ticks={ticks}
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
            labelFormatter={(iso) => formatDayLabel(iso)}
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrendChart;
