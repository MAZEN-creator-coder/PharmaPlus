import React from 'react';
import styles from '../SearchMedicine.module.css';

const PharmacyMarker = ({ pharmacy }) => {
  return (
    <div className={styles.pharmacyMarker}>
      <div className={styles.markerIcon}></div>
      <div className={styles.pharmacyInfo}>
        <h4>{pharmacy.name}</h4>
        <p>{pharmacy.distance}</p>
        <p>{pharmacy.address}</p>
      </div>
    </div>
  );
};

export default PharmacyMarker;