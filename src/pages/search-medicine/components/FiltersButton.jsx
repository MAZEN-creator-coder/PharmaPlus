import React from 'react';
import styles from './ComponentSearch.module.css';
import { CiFilter } from "react-icons/ci";

const FiltersButton = () => {
  return (
    <button className={styles.filtersButton}>
      <CiFilter className={styles.filterIcon} /> Advanced Filters
    </button>
  );
};

export default FiltersButton;
