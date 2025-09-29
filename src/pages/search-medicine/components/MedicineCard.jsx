import React from 'react';
import styles from '../SearchMedicine.module.css';

const MedicineCard = ({ medicine }) => {
  return (
    <div className={styles.medicineCard}>
      <img src={medicine.image} alt={medicine.name} className={styles.medicineImage} />
      <div className={styles.medicineInfo}>
        <h3>{medicine.name}</h3>
        <p className={styles.price}>{medicine.price}</p>
        <span className={styles.status}>{medicine.status}</span>
      </div>
    </div>
  );
};

export default MedicineCard;