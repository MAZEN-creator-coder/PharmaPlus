import React, { useState } from 'react';
import styles from './ComponentSearch.module.css';
import { useSearchMedicine } from '../../../hooks/useSearchMedicine';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { handleSearchWithLocation, loading } = useSearchMedicine();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      await handleSearchWithLocation(inputValue);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await handleSearch(e);
    }
  };

  return (
    <div className={styles.searchinput}>
      <input 
        type="text" 
        placeholder="Search for medicines..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
      />
      <button 
        onClick={handleSearch}
        disabled={loading}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;