import React from 'react';
import styles from '../SearchMedicine.module.css';

const RecentSearches = () => {
  const recentSearches = ['Paracetamol', 'Aspirin', 'Vitamin C'];

  return (
    <div className={styles.recentSearches}>
      <h3>Recent Searches</h3>
      <div className={styles.searchTags}>
        {recentSearches.map((search, index) => (
          <span key={index} className={styles.searchTag}>
            {search}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;