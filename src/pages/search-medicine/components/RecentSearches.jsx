import React, { useState } from 'react';
import styles from './ComponentSearch.module.css';

const RecentSearches = () => {
  const [recentSearches,setRecentSearches]=useState(['Paracetamol', 'Aspirin', 'Vitamin C']);
  

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