import React from 'react';
import styles from './ComponentSearch.module.css';
import MedicineCard from './MedicineCard';
import mockData from '../../../shared/data';

const SearchResults = () => {

  const medicines = mockData.medicines || [];
  

  return (
    <div className={styles.searchResults}>
      <h2 className={styles.text1}>Search Results</h2>
      <div className={styles.medicineGrid}>
        {medicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;