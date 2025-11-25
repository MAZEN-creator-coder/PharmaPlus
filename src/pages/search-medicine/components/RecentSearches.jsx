import React, { useState } from 'react';
import styles from './ComponentSearch.module.css';
import { useSearchMedicine } from '../../../hooks/useSearchMedicine';

const RecentSearches = () => {
  const { searchQuery } = useSearchMedicine();


  const [recentSearches, setRecentSearches] = useState(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    return storedSearches ? JSON.parse(storedSearches) : [];
  });

  React.useEffect(() => {
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      const updatedSearches = [searchQuery, ...recentSearches].slice(0, 3);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
  }, [searchQuery]);
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