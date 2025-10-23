import styles from "./LowStockAlerts.module.css";

const lowStockItems = [
  { name: "Paracetamol 500mg", stock: 15, threshold: 20 },
  { name: "Amoxicillin 250mg", stock: 8, threshold: 10 },
  { name: "Vitamin C Tablets", stock: 22, threshold: 30 },
  { name: "Insulin Pen", stock: 4, threshold: 5 },
];

const LowStockAlerts = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Low Stock Alerts</h3>
        <p className={styles.description}>Items falling below reorder threshold.</p>
      </div>
      <div className={styles.content}>
        <div className={styles.alertList}>
          {lowStockItems.map((item, index) => (
            <div key={index} className={styles.alertItem}>
              <div>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemStock}>
                  Stock: {item.stock} (Threshold: {item.threshold})
                </p>
              </div>
              <span className={styles.badge}>Low Stock</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LowStockAlerts;
