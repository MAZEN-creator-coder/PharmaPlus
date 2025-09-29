import React from 'react';
import styles from './SearchMedicine.module.css';
import SearchSidebar from './components/SearchSidebar';
import SearchResults from './components/SearchResults';
import NearbyPharmacies from './components/PharmacyMap';
import { s } from 'framer-motion/client';
import PharmacyMap from './components/PharmacyMap';

const SearchMedicine = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
      <SearchSidebar  />
      </div>
      <main className={styles.main}>
        <SearchResults  />
        <PharmacyMap  />
      </main>
    </div>
  );
};

export default SearchMedicine;
