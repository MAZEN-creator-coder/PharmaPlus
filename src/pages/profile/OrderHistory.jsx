import { Calendar, DollarSign, Package, ChevronRight } from 'lucide-react';
import styles from './OrderHistory.module.css';

const orders = [
  {
    id: 'MC1001',
    date: '2024-07-20',
    total: '$45.99',
    status: 'Delivered',
    items: [
      'Pain Reliever (500mg) (x2)',
      'Cough Syrup (100ml) (x1)',
      'Vitamin C (1000mg) (x1)'
    ]
  },
  {
    id: 'MC1002',
    date: '2024-07-18',
    total: '$22.50',
    status: 'Processing',
    items: [
      'Allergy Relief (24h) (x1)',
      'Bandages (Assorted) (x1)'
    ]
  },
  {
    id: 'MC1003',
    date: '2024-07-15',
    total: '$78.20',
    status: 'Delivered',
    items: [
      'Antibiotic Cream (15g) (x1)',
      'Fever Reducer (200mg) (x3)',
      'Nasal Decongestant (x1)'
    ]
  },
  {
    id: 'MC1004',
    date: '2024-07-10',
    total: '$15.00',
    status: 'Cancelled',
    items: [
      'Digestive Aid (x1)'
    ]
  },
  {
    id: 'MC1005',
    date: '2024-07-05',
    total: '$30.75',
    status: 'Delivered',
    items: [
      'Multi-Vitamin (60 tabs) (x1)',
      'Nasal Spray (20ml) (x1)'
    ]
  }
];

const OrderHistory = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return styles.statusDelivered;
      case 'Processing':
        return styles.statusProcessing;
      case 'Cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Order History</h1>
        <p className={styles.subtitle}>Track and manage your medical orders</p>
      </div>

      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div className={styles.orderInfo}>
                <div className={styles.radioButton}></div>
                <span className={styles.orderId}>Order #{order.id}</span>
              </div>
              <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className={styles.orderDetails}>
              <div className={styles.detailItem}>
                <Calendar size={16} className={styles.icon} />
                <span className={styles.detailLabel}>Date:</span>
                <span className={styles.detailValue}>{order.date}</span>
              </div>

              <div className={styles.detailItem}>
                <DollarSign size={16} className={styles.icon} />
                <span className={styles.detailLabel}>Total:</span>
                <span className={styles.detailValue}>{order.total}</span>
              </div>

              <div className={styles.detailItem}>
                <Package size={16} className={styles.icon} />
                <span className={styles.detailLabel}>Items:</span>
              </div>

              <ul className={styles.itemsList}>
                {order.items.map((item, index) => (
                  <li key={index} className={styles.itemText}>{item}</li>
                ))}
              </ul>
            </div>

            <button className={styles.viewDetailsButton}>
              View Details
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;


