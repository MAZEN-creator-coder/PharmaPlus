import React from 'react';
import styles from './ComponentSearch.module.css';
import MedicineCard from './MedicineCard';

const SearchResults = () => {
  const medicines = []; // Will be populated from API

  return (
    <div className={styles.searchResults}>
      <h2 className={styles.text1}>Search Results</h2>
      <div className={styles.medicineGrid}>
        {medicines.map((medicine, index) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;