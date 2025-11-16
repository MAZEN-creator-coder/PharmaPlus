import React, { createContext, useState, useCallback } from 'react';
import { searchMedicines, getUserLocation } from '../shared/api/medicineApi';

export const SearchMedicineContext = createContext();

export const SearchMedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Get user location
  const fetchUserLocation = useCallback(async () => {
    try {
      setLoading(true);
      const location = await getUserLocation();
      setUserLocation(location);
      setError(null);
      return location;
    } catch (err) {
      setError(err.message);
      console.error('Error getting location:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search for medicines
  const handleSearch = useCallback(async (query, lat, lng, page = 1, pageLimit = 10) => {
    if (!query.trim()) {
      setMedicines([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await searchMedicines(query, lat, lng, pageLimit, page);
      setMedicines(results);
      setSearchQuery(query);
      setCurrentPage(page);
      setLimit(pageLimit);
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search with current location
  const handleSearchWithLocation = useCallback(async (query, page = 1, pageLimit = 10) => {
    if (!userLocation) {
      const location = await fetchUserLocation();
      if (!location) {
        setError('Unable to get your location');
        return;
      }
      await handleSearch(query, location.lat, location.lng, page, pageLimit);
    } else {
      await handleSearch(query, userLocation.lat, userLocation.lng, page, pageLimit);
    }
  }, [userLocation, handleSearch, fetchUserLocation]);

  const value = {
    medicines,
    loading,
    error,
    searchQuery,
    userLocation,
    currentPage,
    limit,
    fetchUserLocation,
    handleSearch,
    handleSearchWithLocation,
    setSearchQuery,
  };

  return (
    <SearchMedicineContext.Provider value={value}>
      {children}
    </SearchMedicineContext.Provider>
  );
};
