import React from 'react';
import styles from './ComponentSearch.module.css';
import PharmacyMarker from './PharmacyMarker';

const NearbyPharmacies = () => {
  const pharmacies = []; // Will be populated from API

  return (
    <div className={styles.nearbyPharmacies}>
      <h2 className={styles.text2}>Nearby Pharmacies</h2>
      <div className={styles.map}>
        {pharmacies.map((pharmacy, index) => (
          <PharmacyMarker key={index} pharmacy={pharmacy} />
        ))}
      </div>
    </div>
  );
};

export default NearbyPharmacies;