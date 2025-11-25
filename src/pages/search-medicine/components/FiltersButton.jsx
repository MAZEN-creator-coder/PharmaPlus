import React, { useState } from 'react';
import styles from './ComponentSearch.module.css';
import { CiFilter } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { useSearchMedicine } from '../../../hooks/useSearchMedicine';

const FiltersButton = () => {
  const { filters, setFilters } = useSearchMedicine();
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleMaxPriceChange = (e) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setLocalFilters(prev => ({
      ...prev,
      maxPrice: value
    }));
  };

  const handleMaxDistanceChange = (e) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setLocalFilters(prev => ({
      ...prev,
      maxDistance: value
    }));
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      maxPrice: null,
      maxDistance: null,
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  return (
    <>
      <button 
        className={styles.filtersButton}
        onClick={() => setShowFilters(!showFilters)}
      >
        <CiFilter className={styles.filterIcon} /> 
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilters && (
        <div className={styles.filterSidebar}>
          <div className={styles.filterSidebarHeader}>
            <h3>Filters</h3>
            <button 
              className={styles.closeFilterBtn}
              onClick={() => setShowFilters(false)}
              aria-label="Close filters"
            >
              <MdClose />
            </button>
          </div>
          
          <div className={styles.filterGroup}>
            <label htmlFor="maxPrice">Max Price (EGP)</label>
            <input
              id="maxPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter max price"
              value={localFilters.maxPrice || ''}
              onChange={handleMaxPriceChange}
              className={styles.filterInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="maxDistance">Max Distance (km)</label>
            <input
              id="maxDistance"
              type="number"
              min="0"
              step="0.1"
              placeholder="Enter max distance"
              value={localFilters.maxDistance || ''}
              onChange={handleMaxDistanceChange}
              className={styles.filterInput}
            />
          </div>

          <div className={styles.filterActions}>
            <button 
              className={styles.applyBtn}
              onClick={handleApplyFilters}
            >
              Apply
            </button>
            <button 
              className={styles.resetBtn}
              onClick={handleResetFilters}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FiltersButton;
