import React, { useState, useMemo } from 'react';
import styles from './ComponentSearch.module.css';
import MedicineCard from './MedicineCard';
import { useSearchMedicine } from '../../../hooks/useSearchMedicine';

const SearchResults = () => {
  const { medicines, loading, error, searchQuery, filters } = useSearchMedicine();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Apply filters to medicines
  const filteredMedicines = useMemo(() => {
    return medicines.filter(medicine => {
      // Filter by price
      if (filters.maxPrice !== null && medicine.price > filters.maxPrice) {
        return false;
      }
      
      // Filter by distance
      if (filters.maxDistance !== null && medicine.distance > filters.maxDistance) {
        return false;
      }
      
      return true;
    });
  }, [medicines, filters]);

  // Calculate pagination
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMedicines = filteredMedicines.slice(startIndex, endIndex);
    
    return {
      currentMedicines,
      totalPages,
      startIndex,
      endIndex
    };
  }, [filteredMedicines, currentPage]);

  const handleNextPage = () => {
    if (currentPage < paginationData.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className={styles.searchResults}>
        <h2 className={styles.text1}>Searching...</h2>
        <div className={styles.emptyGrid}>
          <div className={styles.emptyGridItem}>
            <p>⏳ Searching for medicines...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.searchResults}>
        <h2 className={styles.text1}>Error</h2>
        <div className={styles.emptyGrid}>
          <div className={styles.emptyGridItem}>
            <p>❌ {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className={styles.searchResults}>
        <h2 className={styles.text1}>Start Searching</h2>
        <div className={styles.emptyGrid}>
          <div className={styles.emptyGridItem}>
            <p>🔍 Search for a medicine to begin</p>
          </div>
        </div>
      </div>
    );
  }

  if (medicines.length === 0) {
    return (
      <div className={styles.searchResults}>
        <h2 className={styles.text1}>Search Results</h2>
        <div className={styles.emptyGrid}>
          <div className={styles.emptyGridItem}>
            <p>No results found for "{searchQuery}"</p>
          </div>
        </div>
      </div>
    );
  }

  if (filteredMedicines.length === 0) {
    return (
      <div className={styles.searchResults}>
        <h2 className={styles.text1}>Search Results</h2>
        <div className={styles.emptyGrid}>
          <div className={styles.emptyGridItem}>
            <p>No medicines match your filters</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.searchResults}>
      <h2 className={styles.text1}>Search Results ({filteredMedicines.length})</h2>
      
      {/* Grid with 4 items */}
      <div className={styles.medicineGrid}>
        {paginationData.currentMedicines.map((medicine) => (
          <MedicineCard key={medicine._id || medicine.id} medicine={medicine} />
        ))}
      </div>

      {/* Pagination Controls */}
      {paginationData.totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={styles.paginationBtn}
          >
            ← Prev
          </button>
          
          <span className={styles.pageInfo}>
            Page {currentPage} of {paginationData.totalPages}
          </span>
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === paginationData.totalPages}
            className={styles.paginationBtn}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;