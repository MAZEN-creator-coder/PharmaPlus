import styles from './PharmacyTable.module.css';

const PharmacyTable = () => {
  const pharmacies = [
    { id: 'PH001', name: 'MediConnect Downtown', sales: '$15,670', orders: 320, stock: '$50,200' },
    { id: 'PH002', name: 'MediConnect Eastside', sales: '$12,340', orders: 280, stock: '$45,100' },
    { id: 'PH003', name: 'MediConnect North', sales: '$10,950', orders: 250, stock: '$38,900' },
    { id: 'PH004', name: 'MediConnect West', sales: '$9,870', orders: 200, stock: '$32,500' },
    { id: 'PH005', name: 'MediConnect South', sales: '$8,540', orders: 180, stock: '$28,800' },
  ];

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
            {pharmacies.map((pharmacy) => (
              <tr key={pharmacy.id}>
                <td>{pharmacy.id}</td>
                <td className={styles.pharmacyName}>{pharmacy.name}</td>
                <td>{pharmacy.sales}</td>
                <td>{pharmacy.orders}</td>
                <td>{pharmacy.stock}</td>
              </tr>
            ))}
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
