import React from 'react';
import styles from './SearchMedicine.module.css';
import SearchSidebar from './components/SearchSidebar';
import SearchResults from './components/SearchResults';
import NearbyPharmacies from './components/NearbyPharmacies';
import { s } from 'framer-motion/client';

const SearchMedicine = () => {
  return (
    <div className={styles.container}>
      <SearchSidebar className={styles.sidebar} />
      <main className={styles.main}>
        <SearchResults  />
        <NearbyPharmacies  />
      </main>
    </div>
  );
};

export default SearchMedicine;
