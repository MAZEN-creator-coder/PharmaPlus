import { DollarSign, ShoppingCart, Package, FileText } from 'lucide-react';
import styles from './MetricCard.module.css';

const MetricCard = ({ title, value, change, period, icon, positive }) => {
  const getIcon = () => {
    switch (icon) {
      case 'dollar':
        return <DollarSign size={20} />;
      case 'cart':
        return <ShoppingCart size={20} />;
      case 'box':
        return <Package size={20} />;
      case 'prescription':
        return <FileText size={20} />;
      default:
        return <DollarSign size={20} />;
    }
  };

  return (
    <div className={styles.metricCard}>
      <div className={styles.iconWrapper}>
        {getIcon()}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        <div className={styles.change}>
          <span className={positive ? styles.positive : styles.negative}>
            {change}
          </span>
          <span className={styles.period}>{period}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
