import styles from './PharmacyTable.module.css';

const PharmacyTable = ({ pharmacies = null }) => {
  const rows = Array.isArray(pharmacies) && pharmacies.length
    ? pharmacies.map(p => ({ id: p.id || p._id || p.name, name: p.name, sales: p.sales != null ? `$${Number(p.sales).toLocaleString()}` : (p.totalSales != null ? `$${Number(p.totalSales).toLocaleString()}` : '-'), orders: p.totalOrders || p.orders || p.served || '-', stock: p.stockValue != null ? `$${Number(p.stockValue).toLocaleString()}` : (p.stock || '-') }))
    : null;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h3>Pharmacy Performance</h3>
        <p>Overview of key metrics across pharmacies.</p>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pharmacy Name</th>
              <th>Total Sales</th>
              <th>Orders</th>
              <th>Stock Value</th>
            </tr>
          </thead>
          <tbody>
            {rows ? rows.map((pharmacy) => (
              <tr key={pharmacy.id}>
                <td>{pharmacy.id}</td>
                <td className={styles.pharmacyName}>{pharmacy.name}</td>
                <td>{pharmacy.sales}</td>
                <td>{pharmacy.orders}</td>
                <td>{pharmacy.stock}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{ padding: 18, color: 'var(--muted)' }}>No pharmacy performance data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.tableFooter}>
        Data updated hourly.
      </div>
    </div>
  );
};

export default PharmacyTable;
