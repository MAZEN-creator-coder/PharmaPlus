import React from 'react';
import styles from './ComponentSearch.module.css';
import SearchBar from './SearchBar';
import UploadPhoto from './UploadPhoto';
import FiltersButton from './FiltersButton';
import RecentSearches from './RecentSearches';

const SearchSidebar = () => {
  return (
    <aside>
        <h2 className={styles.findtext}>Find Your Medicine</h2>
      <div className={styles.searchControls}>
        <SearchBar />
        <div className={styles.searchActions}>
          <UploadPhoto />
          <FiltersButton />
        </div>
      </div>
      <RecentSearches />
    </aside>
  );
};

export default SearchSidebar;