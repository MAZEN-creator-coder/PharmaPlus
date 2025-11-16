import React from 'react';
import styles from './SearchMedicine.module.css';
import SearchSidebar from './components/SearchSidebar';
import SearchResults from './components/SearchResults';
import PharmacyMap from './components/PharmacyMap';
import { SearchMedicineProvider } from '../../context/SearchMedicineContext';

const SearchMedicine = () => {
  return (
    <SearchMedicineProvider>
      <div className={styles.container}>
        <div className={styles.sidebar}>
        <SearchSidebar  />
        </div>
        <main className={styles.main}>
          <SearchResults  />
          <PharmacyMap  />
        </main>
      </div>
    </SearchMedicineProvider>
  );
};

export default SearchMedicine;
