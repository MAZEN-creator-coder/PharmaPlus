import styles from "./StatCard.module.css";

const StatCard = ({ title, value, subtitle, icon: Icon, iconColor }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <p className={styles.title}>{title}</p>
            <h3 className={styles.value}>{value}</h3>
          </div>
          <div className={`${styles.iconContainer} ${iconColor}`}>
            <Icon size={24} />
          </div>
        </div>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

export default StatCard;
