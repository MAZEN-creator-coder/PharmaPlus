import React, { useState, useMemo } from 'react';
import styles from './ComponentSearch.module.css';
import MedicineCard from './MedicineCard';
import { useSearchMedicine } from '../../../hooks/useSearchMedicine';

const SearchResults = () => {
  const { medicines, loading, error, searchQuery } = useSearchMedicine();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate pagination
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(medicines.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMedicines = medicines.slice(startIndex, endIndex);
    
    return {
      currentMedicines,
      totalPages,
      startIndex,
      endIndex
    };
  }, [medicines, currentPage]);

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

  return (
    <div className={styles.searchResults}>
      <h2 className={styles.text1}>Search Results ({medicines.length})</h2>
      
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