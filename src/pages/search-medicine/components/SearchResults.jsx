import React from 'react';
import styles from './ComponentSearch.module.css';
import MedicineCard from './MedicineCard';
import {data} from  '../../../shared/data';

const SearchResults = () => {

  const medicines= data;
  

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