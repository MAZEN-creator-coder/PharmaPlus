import { RiCheckLine, RiTimeLine, RiMapPin2Line, RiBankCard2Line } from 'react-icons/ri';
import styles from './OrderComplete.module.css';

export default function OrderComplete({ onBackToHome }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.badge}><RiCheckLine /></div>
        <h2 className={styles.title}>Order Confirmed</h2>
        <p className={styles.subtitle}>Your order has been placed successfully.</p>
        <div className={styles.details}>
          <div className={styles.row}><span><RiTimeLine /> Estimated Delivery</span><span>30-45 min</span></div>
          <div className={styles.row}><span><RiMapPin2Line /> Delivery Location</span><span>Saved Address</span></div>
          <div className={styles.row}><span><RiBankCard2Line /> Payment</span><span>Card •••• 1234</span></div>
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={onBackToHome}>Back to Cart</button>
        </div>
      </div>
    </div>
  );
}
